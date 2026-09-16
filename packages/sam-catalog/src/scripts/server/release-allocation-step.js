;(function executeStep(inputs, outputs) {
    // Devolver licenca e APAGAR a alocacao, nao esvaziar os campos.
    //
    // Esvaziar `assigned_to` e `allocated_to` no mesmo update e impossivel: a
    // business rule OOB `Mandate allocated to or assigned to` (escopo global,
    // before insert+update, condicao
    // `current.allocated_to.nil() && current.assigned_to.nil()`) chama
    // `setAbortAction(true)` e mata a gravacao. O flow entao renderiza
    // "Error occured while updating record: null", onde o `null` e o RESULTADO
    // do update abortado -- nao um data pill de entrada nulo.
    //
    // Apagar e o caminho que a plataforma aceita: `Mandate...` e insert+update
    // apenas, e `Calc Entitlement Allocations Availalable` (after
    // insert+update+DELETE) recalcula o pool. A propria aplicacao ja documenta a
    // equivalencia, na BR `Remove from Entra group when allocation is deleted`.

    var STATE_CLOSED_COMPLETE = '3'
    var STAGE_COMPLETE = 'complete'
    var STATE_CLOSED_INCOMPLETE = '4'
    var STAGE_CLOSED_INCOMPLETE = 'closed_incomplete'

    // NAO filtra por `licensed_by.install_status`, de proposito.
    //
    // A tentacao e restringir a licenca ativa, para nao apagar alocacao presa a
    // licenca aposentada. Nao faca isso aqui: este passo e a ULTIMA das quatro
    // portas do processo, e as outras tres nao filtram. O qualificador da oferta
    // (`software-license-catalog-utils.js`, `getAllocatedModelIds`) e o guard
    // `sf-bb-if-no-allocation` consultam por (usuario, modelo) SEM olhar status.
    //
    // Filtrar so neste ponto produz o pior desfecho possivel: a oferta aparece, a
    // aprovacao humana e consumida, a integracao de grupo remove o acesso real do
    // usuario, e so entao o passo responde 'gone' e fecha o item dizendo que nao
    // havia o que devolver. E pior que o defeito que este conserto elimina,
    // porque termina "com sucesso" em vez de deixar um contexto em ERROR que
    // alguem enxerga. Em instancias com inventario historico, a populacao mora
    // majoritariamente em licencas aposentadas -- o filtro quebraria a devolucao
    // para quase todo mundo.
    //
    // Apagar a alocacao de uma licenca aposentada e, alias, o desfecho correto: o
    // usuario de fato a tinha, e perde o acesso. O pool nao cresce porque licenca
    // aposentada nao tem pool -- isso e qualidade de dado do inventario, nao
    // defeito da devolucao.
    //
    // O risco que o filtro tentava cobrir -- escolher a alocacao errada quando o
    // usuario tem uma na aposentada E outra na ativa do mesmo modelo -- e coberto
    // pela guarda de ambiguidade abaixo, que se recusa a adivinhar.
    //
    // Se algum dia um filtro for mesmo necessario, ele tem de entrar nas QUATRO
    // portas de uma vez, e nao so aqui.

    var context = String(inputs.context_note || '').trim()
    var prefix = context ? context + ' ' : ''

    function finish(status, comments, workNotes, allocation, license) {
        var ok = status === 'deleted'
        outputs.status = status
        outputs.allocation = allocation || ''
        outputs.license = license || ''
        outputs.comments = comments
        outputs.work_notes = prefix + workNotes
        outputs.ritm_state = ok ? STATE_CLOSED_COMPLETE : STATE_CLOSED_INCOMPLETE
        outputs.ritm_stage = ok ? STAGE_COMPLETE : STAGE_CLOSED_INCOMPLETE
        outputs.outcome = ok ? 'fulfilled' : 'not_fulfilled'
    }

    // Um pill de entrada de REFERENCIA nao chega como sys_id. Provado no
    // RITM1160450: o log mostrou `requested_for = "[object GlideRecord]"` (20
    // chars) enquanto `software_model` chegou como sys_id de 32.
    //
    // A assimetria tem causa: o flow chamador monta `software_model` a partir de
    // `.value` da variavel do RITM -- ja e string --, enquanto `requested_for` vem
    // de `request_item.requested_for`, dot-walk para um campo de referencia, que a
    // engine entrega como REGISTRO. `String()` num GlideRecord devolve
    // "[object GlideRecord]" sem erro nenhum, e a consulta volta vazia.
    //
    // Normaliza as duas formas em vez de confiar numa.
    function sysIdOf(v) {
        if (v === null || v === undefined) return ''
        if (typeof v === 'object') {
            if (typeof v.getUniqueValue === 'function') {
                var u = String(v.getUniqueValue() || '').trim()
                if (u) return u
            }
            if (typeof v.getValue === 'function') {
                var g = String(v.getValue('sys_id') || '').trim()
                if (g) return g
            }
            if (v.sys_id !== undefined && v.sys_id !== null) return String(v.sys_id).trim()
        }
        return String(v).trim()
    }

    function ehSysId(s) {
        return /^[0-9a-f]{32}$/i.test(s)
    }

    var user = sysIdOf(inputs.requested_for)
    var model = sysIdOf(inputs.software_model)

    // INSTRUMENTACAO TEMPORARIA -- retirar depois de diagnosticado.
    // RITM1160448 e RITM1160449 fecharam como 'gone' com a alocacao existindo, e
    // isso aconteceu com DUAS estrategias de consulta diferentes (dot-walk e duas
    // consultas encadeadas). Duas falhas iguais por caminhos diferentes apontam
    // para o VALOR que chega, nao para a consulta. Este log responde de uma vez:
    // o pill chega como sys_id ou como display value?
    gs.info(
        '[releaseAllocation] requested_for=' + JSON.stringify(user) +
        ' (len ' + user.length + ') | software_model=' + JSON.stringify(model) +
        ' (len ' + model.length + ')'
    )

    if (!ehSysId(user) || !ehSysId(model)) {
        finish(
            'failed',
            'We could not complete the return automatically and nothing was changed. Please contact License Management to complete it.',
            'Return not executed: the step could not resolve the user or the model to a sys_id. Received: user="' + user + '", model="' + model + '".',
            '',
            ''
        )
        return
    }

    // Resolve em DUAS consultas, sem dot-walk, de proposito.
    //
    // `gr.addQuery('licensed_by.software_model', model)` NAO resolve dentro do
    // passo de flow: no RITM1160448 a consulta voltou VAZIA enquanto a query
    // codificada equivalente (`assigned_to=X^licensed_by.software_model=Y`)
    // devolvia a alocacao, e o registro estava intacto antes e depois. O flow
    // fechou o item dizendo "nao havia o que devolver" com a alocacao existindo.
    //
    // Duas consultas encadeadas nao dependem de dot-walk e sao o mesmo idioma que
    // `software-license-catalog-utils.js` (`getAllocatedModelIds`) ja usa para o
    // qualificador da oferta -- que, alias, e por isso que o qualificador sempre
    // funcionou.
    var licenseIds = []
    var lic = new GlideRecord('alm_license')
    lic.addQuery('software_model', model)
    lic.query()
    while (lic.next()) {
        licenseIds.push(String(lic.getUniqueValue()))
    }

    gs.info('[releaseAllocation] licencas do modelo: ' + licenseIds.length + ' -> ' + licenseIds.join(','))

    var found = []
    var gr = new GlideRecord('alm_entitlement')
    gr.addQuery('assigned_to', user)
    gr.addQuery('licensed_by', 'IN', licenseIds.join(','))
    if (licenseIds.length > 0) gr.query()
    while (licenseIds.length > 0 && gr.next()) {
        found.push({
            sys_id: String(gr.getUniqueValue()),
            license: String(gr.getValue('licensed_by') || ''),
            license_label: String(gr.licensed_by.getDisplayValue() || ''),
        })
    }

    if (found.length === 0) {
        // Fecha como Closed Incomplete, seguindo a convencao ja adotada pelo
        // proprio backbone no guard `sf-bb-worknote-no-allocation`: nao havia o
        // que devolver. O desfecho que o usuario queria e verdade, mas nao foi
        // este flow que o produziu -- e dizer "returned to the pool" seria
        // afirmar uma acao que nao aconteceu, num processo cujo valor inteiro e
        // auditoria de licenciamento.
        finish(
            'gone',
            'We found no allocation of this license for you. Nothing was returned because there was nothing to return.',
            'No allocation for this user and model at release time. Nothing was deleted.',
            '',
            ''
        )
        return
    }

    if (found.length > 1) {
        // Nao adivinha. Duas licencas do mesmo modelo com alocacao para o
        // mesmo usuario e ambiguidade real: apagar "a primeira" devolveria o
        // direito errado ao pool.
        // Lista no maximo 10 sys_ids: `work_notes` tem 1000 de maxLength, e uma
        // lista longa truncaria em silencio, escondendo justamente o dado que a
        // Gestao de Licencas precisa para agir.
        var MAX_IDS = 10
        var ids = []
        for (var i = 0; i < found.length && i < MAX_IDS; i++) {
            ids.push(found[i].sys_id)
        }
        if (found.length > MAX_IDS) {
            ids.push('and ' + (found.length - MAX_IDS) + ' more')
        }
        finish(
            'ambiguous',
            'We found more than one allocation of this license for you, so it could not be completed automatically. Please contact License Management to complete it.',
            'Return not executed: ' +
                found.length +
                ' allocations for the same user and model. None was deleted. Allocations: ' +
                ids.join(', ') +
                '.',
            '',
            ''
        )
        return
    }

    var target = found[0]
    // O rastro vai para a work note ANTES do delete, porque depois o registro
    // deixa de existir. `sys_audit_delete` guarda o payload completo e permite
    // restaurar, mas a retencao e limitada -- a work note fica no RITM sem prazo.
    var trail = 'Allocation ' + target.sys_id + ', license ' + (target.license_label || target.license) + '.'

    var del = new GlideRecord('alm_entitlement')
    if (!del.get(target.sys_id)) {
        finish(
            'gone',
            'We could no longer find the allocation of this license for you. Nothing was returned because there was nothing to return.',
            'Allocation ' + target.sys_id + ' disappeared between the lookup and the release. Nothing was deleted.',
            '',
            target.license
        )
        return
    }

    var deleted = false
    var failure = ''
    try {
        deleted = del.deleteRecord()
    } catch (e) {
        failure = String(e)
    }

    if (!deleted) {
        // `deleteRecord()` devolve false SEM lancar excecao quando uma BR
        // `before delete` chama `setAbortAction(true)` -- e existe uma OOB nessa
        // condicao, `Abort delete if group is filled` (alm_entitlement_user,
        // filtro groupISNOTEMPTY), que dispara em alocacao de grupo. Conferir o
        // RETORNO, e nao so capturar excecao, e o que separa "apagou" de "a
        // plataforma recusou em silencio". Sem isso o RITM fecharia dizendo que
        // devolveu.
        finish(
            'failed',
            'We could not complete the return automatically and nothing was changed. Please contact License Management to complete it.',
            'The platform refused to delete the allocation. ' +
                trail +
                (failure ? ' Error: ' + failure : ' No exception was thrown — likely aborted by a business rule.'),
            '',
            target.license
        )
        return
    }

    finish(
        'deleted',
        'Your license has been returned to the available pool.',
        'Allocation deleted and the right returned to the available pool. ' + trail,
        target.sys_id,
        target.license
    )
})(inputs, outputs)
