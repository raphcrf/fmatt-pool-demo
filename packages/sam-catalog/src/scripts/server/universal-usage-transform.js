(function transformRow(source, map, log, target) {
    var STATUS_FIELD = 'u_import_status'
    var MESSAGE_FIELD = 'u_import_message'

    function reject(message) {
        source.setValue(STATUS_FIELD, 'rejected')
        source.setValue(MESSAGE_FIELD, message.substring(0, 255))
        source.update()
        log.warn('Universal usage import - row rejected: ' + message)
        ignore = true
    }

    function accept(message) {
        source.setValue(STATUS_FIELD, 'processed')
        source.setValue(MESSAGE_FIELD, message.substring(0, 255))
        source.update()
    }

    var modelName = (source.getValue('u_software_model') || '').trim()
    var email = (source.getValue('u_user_email') || '').trim().toLowerCase()
    var lastActivity = (source.getValue('u_last_activity') || '').trim()

    if (!modelName && !email && !lastActivity) {
        ignore = true
        return
    }

    if (!modelName) {
        reject('Software Model is empty.')
        return
    }
    if (!email) {
        reject('User Email is empty.')
        return
    }

    var model = new GlideRecord('cmdb_software_product_model')
    if (!model.isValid()) {
        reject('Table cmdb_software_product_model is not available on this instance.')
        return
    }
    model.addQuery('name', modelName)
    model.setLimit(2)
    model.query()

    if (!model.next()) {
        reject('Software Model not found: "' + modelName + '".')
        return
    }
    var modelId = model.getUniqueValue()
    if (model.next()) {
        reject('Software Model name is ambiguous, more than one match: "' + modelName + '".')
        return
    }

    var user = new GlideRecord('sys_user')
    user.addQuery('email', email)
    user.addQuery('active', true)
    user.setLimit(2)
    user.query()

    if (!user.next()) {
        reject('No active user found with email "' + email + '".')
        return
    }
    var userId = user.getUniqueValue()
    if (user.next()) {
        reject('More than one active user has the email "' + email + '".')
        return
    }

    var normalisedDate = ''
    if (lastActivity) {
        normalisedDate = normaliseDate(lastActivity)
        if (!normalisedDate) {
            reject('Last Activity "' + lastActivity + '" is not a valid date in yyyy-MM-dd format.')
            return
        }
    }

    target.setValue('software_model', modelId)
    target.setValue('user', userId)
    target.setValue('user_principal_name', email)
    target.setValue('last_activity', normalisedDate)
    target.setValue('active', true)
    target.setValue('state', 'ACTIVE')

    target.setValue('sourced_from_integration', 'no')
    target.setValue('user_source', 'manual')
    target.setValue('source', 'Universal usage template')

    accept('Imported from the universal usage template.')

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
