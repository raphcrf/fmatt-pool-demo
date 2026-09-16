import {
    CatalogItem,
    ReferenceVariable,
    SingleLineTextVariable,
    MultiLineTextVariable,
    RequestedForVariable,
} from '@servicenow/sdk/core'
import { SERVICE_CATALOG_SYS_ID, CATEGORY, TABLE } from '../../shared/instance-refs'
import { licenseManagementCriteria } from '../user-criteria/license-management.now'

export const softwarePurchaseRequest = CatalogItem({
    $id: Now.ID['ci-software-purchase-request'],
    name: 'Software Purchase Request',
    shortDescription: 'Internal: purchase demand raised when no license rights are available',
    description:
        'Operational offering restricted to the License Management team. Created automatically when a user proceeds with a license request for software that has no available rights.',

    catalogs: [SERVICE_CATALOG_SYS_ID],
    categories: [CATEGORY.software],
    availableFor: [licenseManagementCriteria],

    availability: 'both',
    requestMethod: 'submit',
    hideAddToCart: true,
    hideQuantitySelector: true,
    makeItemNonConversational: true,

    variables: {
        // `request_for`, sem o "ed", NAO e erro de digitacao. Ver a explicacao
        // completa em license-request.now.ts: a business rule global
        // `GS: Variables mapping sc_req_item` roda para TODO RITM da instancia e
        // faz, sem guarda, current.setValue('requested_for',
        // current.variables.request_for). Oferta sem variavel com esse nome
        // recebe a string 'undefined' dentro de sc_req_item.requested_for.
        //
        // O tipo e RequestedForVariable (31) porque e o TIPO que alimenta
        // sc_request.requested_for no REQ; o NOME e o que a business rule le
        // para alimentar o RITM.
        request_for: RequestedForVariable({
            question: 'Requested for',
            referenceQualCondition: 'active=true',
            mandatory: false,
            order: 50,
        }),
        software_model: ReferenceVariable({
            question: 'Software to purchase',
            referenceTable: TABLE.softwareModel,
            mandatory: true,
            order: 100,
        }),

        originating_request_item: ReferenceVariable({
            question: 'Originating request item',
            referenceTable: 'sc_req_item',
            order: 200,
        }),
        requested_quantity: SingleLineTextVariable({
            question: 'Quantity required',
            defaultValue: '1',
            order: 300,
        }),
        purchase_justification: MultiLineTextVariable({
            question: 'Justification',
            order: 400,
        }),
    },
})
