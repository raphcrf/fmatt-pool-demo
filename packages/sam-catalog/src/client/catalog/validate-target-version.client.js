function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return

    g_form.hideFieldMsg('target_version', true)

    if (!newValue) return

    var current = g_form.getValue('current_version')
    if (!current) return

    if (current.trim().toLowerCase() === newValue.trim().toLowerCase()) {
        g_form.showFieldMsg(
            'target_version',
            'The requested version must be different from the current version.',
            'error'
        )
    }
}
