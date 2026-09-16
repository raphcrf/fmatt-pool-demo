function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return

    g_form.hideFieldMsg('software_model', true)
    resetAcknowledgement()

    if (!newValue) return

    var ga = new GlideAjax('SoftwareLicenseAvailability')
    ga.addParam('sysparm_name', 'getAvailability')
    ga.addParam('sysparm_model_id', newValue)

    ga.getXMLAnswer(function (answer) {
        if (!answer) return

        var result
        try {
            result = JSON.parse(answer)
        } catch (e) {
            return
        }

        if (!result.known) return

        if (result.available > 0) {
            g_form.showFieldMsg(
                'software_model',
                result.available + ' license(s) available for this software.',
                'info'
            )
            return
        }

        g_form.showFieldMsg(
            'software_model',
            'No licenses are currently available for this software. If you proceed, your manager will be asked to approve a purchase request and this may incur cost.',
            'error'
        )
        g_form.setDisplay('acknowledge_purchase', true)
        g_form.setMandatory('acknowledge_purchase', true)
    })
}

function resetAcknowledgement() {
    g_form.setValue('acknowledge_purchase', false)
    g_form.setMandatory('acknowledge_purchase', false)
    g_form.setDisplay('acknowledge_purchase', false)
}
