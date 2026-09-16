function onChange(control, oldValue, newValue, isLoading) {

    if (isLoading) return

    g_form.hideFieldMsg('required_by_date', true)

    if (!newValue) return

    var selected = getDateFromFormat(newValue, g_user_date_format)
    if (!selected) return

    var today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selected < today.getTime()) {
        g_form.showFieldMsg('required_by_date', 'The date needed cannot be in the past.', 'error')
        g_form.clearValue('required_by_date')
    }
}
