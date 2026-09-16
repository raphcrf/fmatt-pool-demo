var JUSTIFICATION_MINIMUM = 100

function onChange(control, oldValue, newValue, isLoading) {

    if (isLoading) return

    g_form.hideFieldMsg('request_justification', true)

    var text = (newValue || '').trim()

    if (!text) return

    if (text.length < JUSTIFICATION_MINIMUM) {
        g_form.showFieldMsg(
            'request_justification',
            'Please give more detail: ' +
                text.length +
                ' of ' +
                JUSTIFICATION_MINIMUM +
                ' characters. Explain what you will use the software for.',
            'error'
        )
    }
}
