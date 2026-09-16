import { CatalogUiPolicy } from '@servicenow/sdk/core'
import { licenseReturn } from '../catalog-items/license-return.now'

export const returnReasonOtherPolicy = CatalogUiPolicy({
    $id: Now.ID['uip-return-reason-other'],
    shortDescription: 'Require a written reason when the return motive is Other',
    catalogItem: licenseReturn,
    catalogCondition: `${licenseReturn.variables.return_reason}=other^EQ`,
    active: true,
    onLoad: true,
    reverseIfFalse: true,
    appliesOnCatalogItemView: true,
    appliesOnRequestedItems: true,
    actions: [
        {
            variableName: licenseReturn.variables.other_reason_details,
            visible: true,
            mandatory: true,
            order: 100,
        },
    ],
})
