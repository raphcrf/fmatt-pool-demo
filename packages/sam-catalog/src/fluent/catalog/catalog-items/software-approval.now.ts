import { CatalogItem, MultiLineTextVariable , RequestedForVariable} from '@servicenow/sdk/core'
import { SERVICE_CATALOG_SYS_ID, CATEGORY, USER_CRITERIA } from '../../shared/instance-refs'
import { softwareInformationSet } from '../variable-sets/software-information.now'
import { businessJustificationSet } from '../variable-sets/business-justification.now'
import { technicalInformationSet } from '../variable-sets/technical-information.now'
import { licensingInformationSet } from '../variable-sets/licensing-information.now'

export const softwareApproval = CatalogItem({
    $id: Now.ID['ci-software-approval'],
    name: 'Software Approval Request',
    shortDescription: 'Submit a new software product for corporate approval',
    description:
        'Use this offering to submit a software product that is not yet approved for corporate use. The request is reviewed in parallel by Information Security, Architecture, Infrastructure, Compliance and License Management.',

    catalogs: [SERVICE_CATALOG_SYS_ID],
    categories: [CATEGORY.software],
    availableFor: [USER_CRITERIA.allEmployees],

    flow: Now.ref('sys_hub_flow', 'flow-software-approval'),

    availability: 'both',
    requestMethod: 'submit',
    hideAddToCart: true,

    variableSets: [
        { variableSet: softwareInformationSet, order: 100 },
        { variableSet: businessJustificationSet, order: 200 },
        { variableSet: technicalInformationSet, order: 300 },
        { variableSet: licensingInformationSet, order: 400 },
    ],

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
        additional_notes: MultiLineTextVariable({
            question: 'Additional notes',
            order: 100,
        }),
    },
})
