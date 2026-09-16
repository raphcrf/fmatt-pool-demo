var SoftwareLicenseAvailability = Class.create()

SoftwareLicenseAvailability.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    getAvailability: function () {
        var modelId = this.getParameter('sysparm_model_id')

        if (!modelId || !/^[0-9a-f]{32}$/.test(modelId)) {
            return JSON.stringify({ available: 0, known: false })
        }

        var available = new SoftwareLicenseCatalogUtils().getAvailableRights(modelId)

        return JSON.stringify({
            available: available < 0 ? 0 : available,
            known: available >= 0,
        })
    },

    type: 'SoftwareLicenseAvailability',
})
