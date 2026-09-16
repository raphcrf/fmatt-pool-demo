import {
    CatalogItem,
    ReferenceVariable,
    SelectBoxVariable,
    MultiLineTextVariable,
    DateVariable,
    RequestedForVariable,
} from '@servicenow/sdk/core'
import { SERVICE_CATALOG_SYS_ID, CATEGORY, USER_CRITERIA, TABLE } from '../../shared/instance-refs'

export const licenseReturn = CatalogItem({
    $id: Now.ID['ci-license-return'],
    name: 'Software License Return',
    shortDescription: 'Return a software license you no longer need',
    description:
        'Use this offering to return a software license currently allocated to you. The license is unassigned, the inventory is updated and the entitlement returns to the available pool.',

    catalogs: [SERVICE_CATALOG_SYS_ID],
    categories: [CATEGORY.software],
    availableFor: [USER_CRITERIA.allEmployees],

    flow: Now.ref('sys_hub_flow', 'flow-license-return'),

    availability: 'both',
    requestMethod: 'submit',
    hideAddToCart: true,

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
            mandatory: true,
            order: 50,
        }),
        software_model: ReferenceVariable({
            question: 'Software to return',
            referenceTable: TABLE.softwareModel,
            useReferenceQualifier: 'advanced',

            referenceQual: 'javascript:new global.SoftwareLicenseCatalogUtils().getAllocatedModelsQualifier()',
            mandatory: true,
            order: 100,
        }),
        return_reason: SelectBoxVariable({
            question: 'Reason for return',
            mandatory: true,
            order: 200,
            choices: {
                no_longer_used: { label: 'No longer used', sequence: 1 },
                role_change: { label: 'Change of role', sequence: 2 },
                responsibility_transfer: { label: 'Transfer of responsibility', sequence: 3 },
                replaced_by_other: { label: 'Replaced by another software', sequence: 4 },
                management_request: { label: 'Requested by management', sequence: 5 },
                other: { label: 'Other', sequence: 6 },
            },
            includeNone: true,
        }),
        other_reason_details: MultiLineTextVariable({
            question: 'Describe the reason',

            order: 300,
        }),
        return_justification: MultiLineTextVariable({
            question: 'Justification',
            mandatory: true,
            order: 400,
        }),
        desired_removal_date: DateVariable({
            question: 'Desired removal date',
            mandatory: true,
            order: 500,
        }),
        additional_notes: MultiLineTextVariable({
            question: 'Additional notes',
            order: 600,
        }),
    },
})
