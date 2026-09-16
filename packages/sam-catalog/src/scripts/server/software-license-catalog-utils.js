var SoftwareLicenseCatalogUtils = Class.create()

SoftwareLicenseCatalogUtils.prototype = {
    initialize: function () {},

    getAllocatedModelIds: function (userId) {
        if (!userId) {
            return ''
        }

        var entitlement = new GlideRecord('alm_entitlement')

        if (!entitlement.isValid()) {
            gs.warn('SoftwareLicenseCatalogUtils: table alm_entitlement is not available')
            return ''
        }
        if (!entitlement.isValidField('assigned_to') || !entitlement.isValidField('licensed_by')) {
            gs.warn('SoftwareLicenseCatalogUtils: alm_entitlement is missing expected fields')
            return ''
        }

        var licenseIds = []
        entitlement.addQuery('assigned_to', userId)
        entitlement.addNotNullQuery('licensed_by')
        entitlement.query()
        while (entitlement.next()) {
            var licenseId = entitlement.getValue('licensed_by')
            if (licenseId && licenseIds.indexOf(licenseId) === -1) {
                licenseIds.push(licenseId)
            }
        }

        if (licenseIds.length === 0) {
            return ''
        }

        var ids = []
        var license = new GlideRecord('alm_license')
        if (!license.isValid() || !license.isValidField('software_model')) {
            gs.warn('SoftwareLicenseCatalogUtils: alm_license is missing expected fields')
            return ''
        }

        license.addQuery('sys_id', 'IN', licenseIds.join(','))
        license.addNotNullQuery('software_model')
        license.query()
        while (license.next()) {
            var modelId = license.getValue('software_model')
            if (modelId && ids.indexOf(modelId) === -1) {
                ids.push(modelId)
            }
        }

        return ids.join(',')
    },

    getAllocatedModelsQualifier: function () {
        var ids = this.getAllocatedModelIds(gs.getUserID())
        return ids ? 'sys_idIN' + ids : 'sys_idINNONE'
    },

    getAvailableRights: function (modelId) {
        if (!modelId) {
            return -1
        }

        var license = new GlideRecord('alm_license')
        if (!license.isValid()) {
            gs.warn('SoftwareLicenseCatalogUtils: table alm_license is not available')
            return -1
        }
        if (!license.isValidField('software_model') || !license.isValidField('allocations_available')) {
            gs.warn('SoftwareLicenseCatalogUtils: alm_license is missing expected fields')
            return -1
        }

        license.addQuery('software_model', modelId)
        license.query()

        var total = 0
        var found = false
        while (license.next()) {
            found = true

            if (license.getValue('unlimited_license') === 'true') {
                return -1
            }
            var available = parseInt(license.getValue('allocations_available'), 10)
            if (!isNaN(available) && available > 0) {
                total += available
            }
        }

        return found ? total : 0
    },

    type: 'SoftwareLicenseCatalogUtils',
}
