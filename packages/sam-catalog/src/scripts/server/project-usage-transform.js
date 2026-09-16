;(function transformProjectRow(source, map, log, target) {
    var upn = (source.getValue('u_user_principal_name') || '').trim().toLowerCase()
    var lastActivity = (source.getValue('u_last_activity_date') || '').trim()
    var messages = []

    function finish(status, message) {
        source.setValue('u_import_status', status)
        source.setValue('u_import_message', message.substring(0, 255))
        source.update()
    }

    // Rodape em branco no fim do export nao e erro de ninguem.
    if (!upn) {
        ignore = true
        return
    }

    var modelId = gs.getProperty('software_license_offerings.project_software_model', '')
    if (!modelId) {
        finish('rejected', 'Property software_license_offerings.project_software_model is not set.')
        log.error('Project usage import: the Project software model property is empty.')
        ignore = true
        return
    }

    // IMPORT SO DE ATUALIZACAO. Diferente do Visio e do Autodesk, este perfil nao
    // cria subscription: se nao existe uma para o par (UPN, modelo), a linha nao
    // entra. O relatorio do Project lista todo mundo do tenant com qualquer
    // atividade, e o export nao tem coluna de licenciamento — criar registro para
    // cada linha encheria samp_sw_subscription de gente que o SAM nunca licenciou.
    //
    // A consulta espelha o coalesce do transform map, que e (user_principal_name,
    // software_model) com coalesceCaseSensitive: false. O UPN ja vem em minusculas
    // da linha 2; a comparacao de string do ServiceNow ignora caixa.
    //
    // Consequencia aceita: consumo de quem o SAM nao conhece fica de fora. Quem
    // procura licenca nao rastreada tem de olhar o relatorio bruto, nao a
    // samp_sw_subscription.
    var existing = new GlideRecord('samp_sw_subscription')
    existing.addQuery('user_principal_name', upn)
    existing.addQuery('software_model', modelId)
    existing.setLimit(1)
    existing.query()
    if (!existing.next()) {
        finish('no_subscription', 'No Project subscription exists for this user, so the usage was not imported.')
        ignore = true
        return
    }

    // Usuario nao encontrado NAO rejeita a linha, igual ao Visio: quem saiu da
    // empresa e continua consumindo licenca e justamente o dado que interessa.
    var userId = ''
    var user = new GlideRecord('sys_user')
    user.addQuery('email', upn)
    user.addQuery('active', true)
    user.setLimit(2)
    user.query()

    if (user.next()) {
        userId = user.getUniqueValue()
        if (user.next()) {
            userId = ''
            messages.push('More than one active user has this email, user left empty.')
        }
    } else {
        messages.push('No active user matches this email.')
    }

    // Data invalida descarta a DATA, nao a linha.
    var normalisedDate = ''
    if (lastActivity) {
        normalisedDate = normaliseDate(lastActivity)
        if (!normalisedDate) {
            messages.push('Last Activity Date "' + lastActivity + '" is not a valid yyyy-MM-dd date and was ignored.')
        }
    }

    target.setValue('user_principal_name', upn)
    target.setValue('software_model', modelId)
    if (userId) {
        target.setValue('user', userId)
    }
    if (normalisedDate) {
        target.setValue('last_activity', normalisedDate)
    }
    target.setValue('active', true)
    target.setValue('user_source', 'integration')
    target.setValue('sourced_from_integration', 'no')
    target.setValue('source', 'Microsoft 365 Project usage report')

    // Todo mundo que aparece no relatorio conta como licenciado. O export do
    // Project nao tem coluna de licenciamento — o do Visio tem "Is Visio
    // Licensed", este nao tem equivalente — e a leitura do cliente e que a
    // Microsoft so lista no relatorio quem tem a licenca atribuida.
    target.setValue('unlicensed_subscription', false)

    if (!target.getValue('subscription_identifier')) {
        target.setValue('subscription_identifier', 'PROJECTCLIENT')
    }

    finish(
        messages.length ? 'processed_with_warning' : 'processed',
        messages.length ? messages.join(' ') : 'Imported from the Project usage report.'
    )

    function normaliseDate(value) {
        var text = value.split(' ')[0]
        var match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text)
        if (!match) {
            return ''
        }
        var year = parseInt(match[1], 10)
        var month = parseInt(match[2], 10)
        var day = parseInt(match[3], 10)
        if (month < 1 || month > 12 || day < 1) {
            return ''
        }
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        var isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
        if (month === 2 && isLeap) {
            daysInMonth[1] = 29
        }
        if (day > daysInMonth[month - 1]) {
            return ''
        }
        return text
    }
})(source, map, log, target)
