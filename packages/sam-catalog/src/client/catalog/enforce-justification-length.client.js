function onSubmit() {
    var MINIMUM = 100
    var text = (g_form.getValue('request_justification') || '').trim()

    if (!text) return true

    if (text.length < MINIMUM) {
        g_form.showFieldMsg(
            'request_justification',
            'The justification needs at least ' +
                MINIMUM +
                ' characters. You have ' +
                text.length +
                '. Explain what you will use the software for.',
            'error'
        )
        return false
    }

    return true
}
