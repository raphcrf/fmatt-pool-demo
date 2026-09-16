;(function executeStep(inputs, outputs) {
    // Instante da conferência = agora + minutos da property. Fica aqui, e não no
    // flow, porque `waitForADuration` com duração literal não aceita data pill:
    // o timer espera ATÉ este instante em vez de esperar uma duração fixa.
    function verifyAfter(propertyName, fallbackMinutes) {
        var minutes = parseInt(gs.getProperty(propertyName, ''), 10)
        if (isNaN(minutes) || minutes < 0) {
            minutes = fallbackMinutes
        }
        var when = new GlideDateTime()
        when.addSeconds(minutes * 60)
        return when.getValue()
    }

    var provisioner = new global.EntraGroupProvisioner()
    var operation = String(inputs.operation || '').trim().toLowerCase()

    if (operation === 'verify') {
        var check = provisioner.verifyMembership(inputs.software_model, inputs.requested_for)
        // 'no_group' separa "não é membro" de "não há grupo para consultar". Sem
        // essa distinção, software sem de-para cairia no ramo de "usuário não
        // está no grupo" e geraria uma task pedindo remoção de um grupo que não
        // existe.
        outputs.status = !check.group_id ? 'no_group' : check.confirmed ? 'confirmed' : 'not_confirmed'
        outputs.confirmed = check.confirmed
        outputs.group_id = check.group_id
        outputs.group_name = check.group_name
        outputs.message = check.message
        return
    }

    if (operation === 'remove') {
        var removal = provisioner.removeUserFromGroup(inputs.software_model, inputs.requested_for)
        outputs.status = removal.status
        outputs.confirmed = false
        outputs.group_id = removal.group_id
        outputs.group_name = removal.group_name
        outputs.message = removal.message
        outputs.verify_after = verifyAfter('software_license_offerings.entra_remove_verify_wait_minutes', 60)
        return
    }

    if (operation === 'verify_removal') {
        var gone = provisioner.verifyRemoval(inputs.software_model, inputs.requested_for)
        outputs.status = gone.confirmed ? 'confirmed' : 'not_confirmed'
        outputs.confirmed = gone.confirmed
        outputs.group_id = gone.group_id
        outputs.group_name = gone.group_name
        outputs.message = gone.message
        return
    }

    if (operation !== 'add') {
        outputs.status = 'failed'
        outputs.confirmed = false
        outputs.group_id = ''
        outputs.group_name = ''
        outputs.message =
            'Unknown operation "' + operation + '". Expected add, verify, remove or verify_removal.'
        return
    }

    var run = provisioner.addUserToGroup(inputs.software_model, inputs.requested_for)
    outputs.status = run.status
    outputs.confirmed = false
    outputs.group_id = run.group_id
    outputs.group_name = run.group_name
    outputs.message = run.message
    outputs.verify_after = verifyAfter('software_license_offerings.entra_add_verify_wait_minutes', 120)
})(inputs, outputs)
