import { CatalogUiPolicy } from '@servicenow/sdk/core'
import { licenseRequest } from '../catalog-items/license-request.now'

export const temporaryEndDatePolicy = CatalogUiPolicy({
    $id: Now.ID['uip-temporary-end-date'],
    shortDescription: 'Show the expected end date only for temporary license needs',
    catalogItem: licenseRequest,
    catalogCondition: `${licenseRequest.variables.usage_duration}=temporary^EQ`,
    active: true,
    onLoad: true,
    reverseIfFalse: true,
    appliesOnCatalogItemView: true,
    appliesOnRequestedItems: true,
    actions: [
        {
            variableName: licenseRequest.variables.usage_end_date,
            visible: true,
            variableMessage: 'Used to flag licenses still in use well past the declared end date.',
            variableMessageType: 'info',
            order: 100,
        },
    ],
})
