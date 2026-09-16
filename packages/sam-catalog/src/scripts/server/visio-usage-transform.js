;(function transformVisioRow(source, map, log, target) {
    var upn = (source.getValue('u_user_principal_name') || '').trim().toLowerCase()
    var lastActivity = (source.getValue('u_last_activity_date') || '').trim()
    var licensedRaw = (source.getValue('u_is_visio_licensed') || '').trim().toLowerCase()
    var messages = []

    function finish(status, message) {
        source.setValue('u_import_status', status)
        source.setValue('u_import_message', message.substring(0, 255))
        source.update()
    }

    if (!upn) {
        ignore = true
        return
    }

    // O modelo NAO vem mais da property. Vem da subscription que a pessoa ja tem.
    //
    // O ambiente tem mais de um produto Visio, e a property so cabia um -- toda
    // linha ia parar no mesmo modelo, certo ou errado. A premissa do negocio e
    // que cada pessoa tem no maximo uma licenca de Visio por vez: se ela aparece
    // no relatorio, e essa licenca que usou. A property agora define apenas o
    // CONJUNTO do que conta como Visio (lista separada por virgula), para que um
    // relatorio de Visio nunca escreva em subscription de outro software.
    //
    // A mesma resolucao roda no sourceScript do campo de coalesce, em
    // visio-usage-import.now.ts. As duas TEM de concordar: o coalesce decide qual
    // registro e atualizado, e este passo decide se a linha entra.
    var resolved = new global.UniversalUsageImporter().visioModelForUser(upn)

    if (resolved.status !== 'ok') {
        // Configuracao faltando e problema de implantacao e vale rejeicao, com log.
        // Pessoa sem licenca de Visio, ou com duas, e dado: nao entra, mas nao e
        // erro de ninguem e nao polui o log.
        var falhaDeConfig = resolved.status === 'no_models' || resolved.status === 'no_table'
        finish(falhaDeConfig ? 'rejected' : resolved.status, resolved.message)
        if (falhaDeConfig) {
            log.error('Visio usage import: ' + resolved.message)
        }
        ignore = true
        return
    }

    var modelId = resolved.model_id

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

    var normalisedDate = ''
    if (lastActivity) {
        normalisedDate = normaliseDate(lastActivity)
        if (!normalisedDate) {
            messages.push('Last Activity Date "' + lastActivity + '" is not a valid yyyy-MM-dd date and was ignored.')
        }
    }

    var isLicensed = licensedRaw === 'true'

    target.setValue('user_principal_name', upn)
    target.setValue('software_model', modelId)
    if (userId) {
        target.setValue('user', userId)
    }
    if (normalisedDate) {
        target.setValue('last_activity', normalisedDate)
    }
    target.setValue('unlicensed_subscription', !isLicensed)
    target.setValue('active', true)
    target.setValue('user_source', 'integration')
    target.setValue('sourced_from_integration', 'no')
    target.setValue('source', 'Microsoft 365 Visio usage report')

    if (!target.getValue('subscription_identifier')) {
        target.setValue('subscription_identifier', 'VISIOCLIENT')
    }

    finish(messages.length ? 'processed_with_warning' : 'processed',
        messages.length ? messages.join(' ') : 'Imported from the Visio usage report.')

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
