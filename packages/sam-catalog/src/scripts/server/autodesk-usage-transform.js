;(function transformAutodeskRow(source, map, log, target) {
    var VENDOR = 'autodesk'

    var email = (source.getValue('u_email') || '').trim().toLowerCase()
    var offering = (source.getValue('u_offering_name') || '').trim()
    var seat = (source.getValue('u_seat_assignment') || '').trim().toLowerCase()
    var messages = []

    function finish(status, message) {
        source.setValue('u_import_status', status)
        source.setValue('u_import_message', message.substring(0, 255))
        source.update()
    }

    if (!email && !offering) {
        ignore = true
        return
    }

    if (!email) {
        finish('rejected', 'The email column is empty, so the row cannot be attached to a user.')
        ignore = true
        return
    }

    if (!offering) {
        finish('rejected', 'The offering_name column is empty, so there is no software model to attach to.')
        ignore = true
        return
    }

    var modelId = new UniversalUsageImporter().resolveOfferingModel(VENDOR, offering)
    if (!modelId) {
        finish(
            'rejected',
            'Offering "' +
                offering +
                '" has no software model in the Software Usage Offering Map. Add or complete that row and load the file again.'
        )
        log.error('Autodesk usage import: offering "' + offering + '" is not mapped to a software model.')
        ignore = true
        return
    }

    var userId = ''
    var user = new GlideRecord('sys_user')
    user.addQuery('email', email)
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

    var isAssigned = seat === 'assigned'

    var assignedOn = toDateTime(source.getValue('u_assigned_date'))
    var unassignedOn = toDateTime(source.getValue('u_unassigned_date'))

    if (isAssigned && !assignedOn && source.getValue('u_assigned_date')) {
        messages.push('assigned_date "' + source.getValue('u_assigned_date') + '" is not a valid date and was ignored.')
    }

    var lastAccessed = normaliseDate(source.getValue('u_last_accessed'))
    if (!lastAccessed && (source.getValue('u_last_accessed') || '').trim()) {
        messages.push('last_accessed "' + source.getValue('u_last_accessed') + '" is not a valid date and was ignored.')
    }

    target.setValue('user_principal_name', email)
    target.setValue('software_model', modelId)
    if (userId) {
        target.setValue('user', userId)
    }

    var displayName = ((source.getValue('u_first_name') || '') + ' ' + (source.getValue('u_last_name') || '')).trim()
    if (displayName) {
        target.setValue('display_name', displayName)
    }
    if (source.getValue('u_autodesk_id')) {
        target.setValue('external_user_id', source.getValue('u_autodesk_id'))
    }
    if (source.getValue('u_version')) {
        target.setValue('version', source.getValue('u_version'))
    }

    target.setValue('active', isAssigned)
    target.setValue('unlicensed_subscription', !isAssigned)
    target.setValue('u_seat_assignment', seat)
    target.setValue('u_access_option', source.getValue('u_access_option'))
    if (assignedOn) {
        target.setValue('external_created', assignedOn)
    }
    if (unassignedOn) {
        target.setValue('u_unassigned_date', unassignedOn)
    }

    if (lastAccessed) {
        target.setValue('last_activity', lastAccessed)
    }
    setInteger(target, 'inactive_days', source.getValue('u_days_inactive'))
    setInteger(target, 'u_days_used', source.getValue('u_days_used'))
    setDecimal(target, 'u_monthly_average', source.getValue('u_monthly_average'))

    target.setValue('user_source', 'integration')
    target.setValue('sourced_from_integration', 'no')
    target.setValue('source', 'Autodesk usage report')

    if (!target.getValue('subscription_identifier')) {
        target.setValue('subscription_identifier', offering)
    }

    finish(
        messages.length ? 'processed_with_warning' : 'processed',
        messages.length ? messages.join(' ') : 'Imported from the Autodesk usage report.'
    )

    function normaliseDate(value) {
        var text = (value || '').trim().split(' ')[0]
        var match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text)
        if (!match) {
            return ''
        }
        return isRealDate(parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)) ? text : ''
    }

    // ISO 8601 com Z e UTC, e UTC e como glide_date_time e armazenado: isto e
    // reformatacao de string, nao conversao de fuso.
    function toDateTime(value) {
        var text = (value || '').trim()
        if (!text) {
            return ''
        }

        var match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/.exec(text)
        if (!match) {

            var dateOnly = normaliseDate(text)
            return dateOnly ? dateOnly + ' 00:00:00' : ''
        }

        if (!isRealDate(parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10))) {
            return ''
        }

        return match[1] + '-' + match[2] + '-' + match[3] + ' ' + match[4] + ':' + match[5] + ':' + match[6]
    }

    function isRealDate(year, month, day) {
        if (month < 1 || month > 12 || day < 1) {
            return false
        }
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        var isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
        if (month === 2 && isLeap) {
            daysInMonth[1] = 29
        }
        return day <= daysInMonth[month - 1]
    }

    function setInteger(record, field, raw) {
        var text = (raw || '').toString().trim()
        if (!text) {
            return
        }
        var number = parseInt(text, 10)
        if (!isNaN(number)) {
            record.setValue(field, number)
        }
    }

    function setDecimal(record, field, raw) {
        var text = (raw || '').toString().trim()
        if (!text) {
            return
        }
        var number = parseFloat(text)
        if (!isNaN(number)) {
            record.setValue(field, number)
        }
    }
})(source, map, log, target)
