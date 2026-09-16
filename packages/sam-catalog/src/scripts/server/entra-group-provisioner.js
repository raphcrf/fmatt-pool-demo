var EntraGroupProvisioner = Class.create()

EntraGroupProvisioner.prototype = {
    MAPPING_TABLE: 'u_software_entra_group',

    ACTION_ADD: 'sn_azure_ad_spoke.add_user_to_group_v2',
    ACTION_REMOVE: 'sn_azure_ad_spoke.remove_user_from_group_v2',
    ACTION_IS_MEMBER: 'sn_azure_ad_spoke.is_user_in_group_v2',
    ACTION_LOOK_UP_USER: 'sn_azure_ad_spoke.look_up_user',

    initialize: function () {},

    resolveGroup: function (softwareModelId) {
        var result = { status: 'none', group_id: '', group_name: '', message: '' }

        var modelId = this._toSysId(softwareModelId)
        if (!modelId) {
            result.message = 'No software model was provided.'
            return result
        }

        var gr = new GlideRecord(this.MAPPING_TABLE)
        if (!gr.isValid()) {
            result.message = 'Table ' + this.MAPPING_TABLE + ' is not available on this instance.'
            return result
        }
        gr.addQuery('u_software_model', modelId)
        gr.addQuery('u_active', true)
        gr.query()

        var matches = []
        while (gr.next()) {
            var id = String(gr.getValue('u_entra_group_id') || '').trim()
            if (id) {
                matches.push({ id: id, name: String(gr.getValue('u_entra_group_name') || '').trim() })
            }
        }

        if (!matches.length) {
            result.message = 'No Entra group is mapped to this software model.'
            return result
        }
        if (matches.length > 1) {
            result.status = 'ambiguous'
            result.message =
                matches.length + ' active Entra groups are mapped to this software model. Only one can be automatic.'
            return result
        }

        result.status = 'ok'
        result.group_id = matches[0].id
        result.group_name = matches[0].name
        return result
    },

    resolveUserId: function (userSysId) {
        var out = { ok: false, user_id: '', message: '' }

        var sysId = this._toSysId(userSysId)
        var user = new GlideRecord('sys_user')
        if (!sysId || !user.get(sysId)) {
            out.message = 'Requested user not found in ServiceNow.'
            return out
        }

        var guid = String(user.getValue('u_objectguid') || '').trim()
        if (guid) {
            out.ok = true
            out.user_id = guid
            return out
        }

        var upn = String(user.getValue('email') || '').trim()
        if (!upn) {
            out.message = 'User has neither an objectGUID nor an email to look up in Entra.'
            return out
        }

        var lookup = this._runAction(this.ACTION_LOOK_UP_USER, { user_principal_name: upn })
        if (!lookup.ok) {
            out.message = 'Entra lookup failed for "' + upn + '": ' + lookup.message
            return out
        }

        var found = this._readJsonId(lookup.outputs ? lookup.outputs.user : '')
        if (!found) {
            out.message = 'Entra returned no object ID for "' + upn + '".'
            return out
        }

        out.ok = true
        out.user_id = found
        return out
    },

    addUserToGroup: function (softwareModelId, userSysId) {
        var group = this.resolveGroup(softwareModelId)
        if (group.status !== 'ok') {
            return {
                status: group.status,
                group_id: '',
                group_name: '',
                message: group.message,
            }
        }

        var user = this.resolveUserId(userSysId)
        if (!user.ok) {
            return {
                status: 'no_user',
                group_id: group.group_id,
                group_name: group.group_name,
                message: user.message,
            }
        }

        var run = this._runAction(this.ACTION_ADD, { group_id: group.group_id, user_id: user.user_id })
        if (!run.ok) {

            if (/already exist/i.test(run.message)) {
                return {
                    status: 'added',
                    group_id: group.group_id,
                    group_name: group.group_name,
                    message: 'User was already a member of "' + (group.group_name || group.group_id) + '".',
                }
            }

            gs.error('EntraGroupProvisioner: add to group ' + group.group_id + ' failed - ' + run.message)
            return {
                status: 'failed',
                group_id: group.group_id,
                group_name: group.group_name,
                message: 'Entra rejected the request: ' + run.message,
            }
        }

        return {
            status: 'added',
            group_id: group.group_id,
            group_name: group.group_name,
            message: 'User was added to "' + (group.group_name || group.group_id) + '".',
        }
    },

    removeUserFromGroup: function (softwareModelId, userSysId) {
        var group = this.resolveGroup(softwareModelId)
        if (group.status !== 'ok') {
            return { status: group.status, group_id: '', group_name: '', message: group.message }
        }

        var user = this.resolveUserId(userSysId)
        if (!user.ok) {
            return {
                status: 'no_user',
                group_id: group.group_id,
                group_name: group.group_name,
                message: user.message,
            }
        }

        var run = this._runAction(this.ACTION_REMOVE, { group_id: group.group_id, user_id: user.user_id })
        if (!run.ok) {
            // Não ser membro não é falha, pelo mesmo motivo que membro repetido
            // não é falha na inclusão: o estado desejado já é verdade.
            if (/does not exist|not found|resourcenotfound/i.test(run.message)) {
                return {
                    status: 'removed',
                    group_id: group.group_id,
                    group_name: group.group_name,
                    message: 'User was already not a member of "' + (group.group_name || group.group_id) + '".',
                }
            }

            gs.error('EntraGroupProvisioner: remove from group ' + group.group_id + ' failed - ' + run.message)
            return {
                status: 'failed',
                group_id: group.group_id,
                group_name: group.group_name,
                message: 'Entra rejected the removal: ' + run.message,
            }
        }

        return {
            status: 'removed',
            group_id: group.group_id,
            group_name: group.group_name,
            message: 'User was removed from "' + (group.group_name || group.group_id) + '".',
        }
    },

    // Não é `!verifyMembership`. A diferença está no erro: quando a consulta ao
    // Entra falha, negar o resultado daria "remoção confirmada" a partir de uma
    // chamada que nunca respondeu, e o ServiceNow devolveria a licença ao estoque
    // com a pessoa ainda usando. Falha aqui também é `confirmed: false`.
    verifyRemoval: function (softwareModelId, userSysId) {
        var out = { confirmed: false, group_id: '', group_name: '', message: '' }

        var group = this.resolveGroup(softwareModelId)
        if (group.status !== 'ok') {
            out.message = group.message
            return out
        }
        out.group_id = group.group_id
        out.group_name = group.group_name

        var user = this.resolveUserId(userSysId)
        if (!user.ok) {
            out.message = user.message
            return out
        }

        var run = this._runAction(this.ACTION_IS_MEMBER, { group_id: group.group_id, user_id: user.user_id })
        if (!run.ok) {
            out.message = 'Could not confirm the removal: ' + run.message
            return out
        }

        // Resposta ausente NÃO é remoção confirmada. Aqui a conclusão é negativa
        // ("não está mais no grupo"), então um `answer` vazio invertido daria
        // exatamente a afirmação que esta conferência existe para impedir, e a
        // licença voltaria ao estoque sem prova. Diferente do
        // `verifyMembership`, cujo default já é o lado seguro.
        var answer = run.outputs ? run.outputs.answer : undefined
        if (answer === undefined || answer === null || answer === '') {
            out.message = 'Could not confirm the removal: Entra returned no answer.'
            return out
        }

        var stillMember = answer === true || String(answer) === 'true'
        out.confirmed = !stillMember
        out.message = out.confirmed
            ? 'User is confirmed as removed from "' + (group.group_name || group.group_id) + '".'
            : 'User is STILL in "' + (group.group_name || group.group_id) + '" one hour after the removal.'
        return out
    },

    verifyMembership: function (softwareModelId, userSysId) {
        var out = { confirmed: false, group_id: '', group_name: '', message: '' }

        var group = this.resolveGroup(softwareModelId)
        if (group.status !== 'ok') {
            out.message = group.message
            return out
        }
        out.group_id = group.group_id
        out.group_name = group.group_name

        var user = this.resolveUserId(userSysId)
        if (!user.ok) {
            out.message = user.message
            return out
        }

        var run = this._runAction(this.ACTION_IS_MEMBER, { group_id: group.group_id, user_id: user.user_id })
        if (!run.ok) {
            out.message = 'Could not confirm membership: ' + run.message
            return out
        }

        var answer = run.outputs ? run.outputs.answer : false
        out.confirmed = answer === true || String(answer) === 'true'
        out.message = out.confirmed
            ? 'User is confirmed as part of "' + (group.group_name || group.group_id) + '".'
            : 'User is not in "' + (group.group_name || group.group_id) + '" yet.'
        return out
    },

    _runAction: function (actionName, inputs) {
        try {
            var result = sn_fd.FlowAPI.getRunner().action(actionName).inForeground().withInputs(inputs).run()

            var outputs = result.getOutputs()

            var status = String((outputs && outputs.__action_status__) || '').toLowerCase()
            if (status && (status.indexOf('fail') !== -1 || status.indexOf('error') !== -1)) {
                return { ok: false, outputs: outputs, message: 'action reported status "' + status + '"' }
            }

            return { ok: true, outputs: outputs, message: '' }
        } catch (e) {
            return { ok: false, outputs: null, message: e.message || String(e) }
        }
    },

    _readJsonId: function (raw) {
        var text = String(raw || '').trim()
        if (!text) {
            return ''
        }
        try {
            var parsed = JSON.parse(text)
            if (parsed && parsed.id) {
                return String(parsed.id)
            }
            if (parsed && parsed.value && parsed.value.length && parsed.value[0].id) {
                return String(parsed.value[0].id)
            }
        } catch (e) {
            gs.warn('EntraGroupProvisioner: could not parse the Entra user payload - ' + e.message)
        }
        return ''
    },

    _toSysId: function (value) {
        if (!value) {
            return ''
        }
        if (typeof value === 'string') {
            return value.trim()
        }
        if (typeof value.getUniqueValue === 'function') {
            return String(value.getUniqueValue() || '').trim()
        }
        if (value.sys_id) {
            return String(value.sys_id).trim()
        }
        return String(value).trim()
    },

    type: 'EntraGroupProvisioner',
}
