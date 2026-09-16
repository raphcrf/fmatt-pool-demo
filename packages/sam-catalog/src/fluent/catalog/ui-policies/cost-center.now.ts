import { CatalogUiPolicy } from '@servicenow/sdk/core'
import { licenseRequest } from '../catalog-items/license-request.now'

export const costCenterPolicy = CatalogUiPolicy({
    $id: Now.ID['uip-cost-center'],
    shortDescription: 'Ask for an alternate cost center only when a different one is responsible',
    catalogItem: licenseRequest,
    catalogCondition: `${licenseRequest.variables.different_cost_center}=Yes^EQ`,
    active: true,
    onLoad: true,
    reverseIfFalse: true,
    appliesOnCatalogItemView: true,
    appliesOnRequestedItems: true,
    actions: [
        {
            variableName: licenseRequest.variables.alternate_cost_center,
            visible: true,
            mandatory: true,
            variableMessage: 'The charge will be posted to this cost center instead of the requester default.',
            variableMessageType: 'info',
            order: 100,
        },
    ],
})
