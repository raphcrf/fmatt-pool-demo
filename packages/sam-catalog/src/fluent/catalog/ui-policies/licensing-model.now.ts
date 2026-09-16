import { CatalogUiPolicy } from '@servicenow/sdk/core'
import { licensingInformationSet } from '../variable-sets/licensing-information.now'

export const licensingModelPolicy = CatalogUiPolicy({
    $id: Now.ID['uip-licensing-model'],
    shortDescription: 'Show licensing detail fields only for paid software',
    variableSet: licensingInformationSet,
    appliesTo: 'set',
    catalogCondition: `${licensingInformationSet.variables.licensing_model}=licensed^EQ`,
    active: true,
    onLoad: true,
    reverseIfFalse: true,
    appliesOnCatalogItemView: true,
    appliesOnRequestedItems: true,
    actions: [
        {
            variableName: licensingInformationSet.variables.license_type,
            visible: true,
            mandatory: true,
            order: 100,
        },
        {
            variableName: licensingInformationSet.variables.estimated_license_quantity,
            visible: true,
            mandatory: true,
            order: 200,
        },
        {
            variableName: licensingInformationSet.variables.estimated_cost,
            visible: true,
            mandatory: true,
            variableMessage: 'Used by License Management to size the purchase.',
            variableMessageType: 'info',
            order: 300,
        },
    ],
})
