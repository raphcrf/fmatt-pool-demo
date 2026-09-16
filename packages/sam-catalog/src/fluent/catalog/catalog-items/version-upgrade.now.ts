import {
    CatalogItem,
    ReferenceVariable,
    SingleLineTextVariable,
    SelectBoxVariable,
    MultiLineTextVariable,
    RequestedForVariable,
} from '@servicenow/sdk/core'
import { SERVICE_CATALOG_SYS_ID, CATEGORY, USER_CRITERIA, TABLE } from '../../shared/instance-refs'

export const versionUpgrade = CatalogItem({
    $id: Now.ID['ci-version-upgrade'],
    name: 'Software Version or Edition Upgrade',
    shortDescription: 'Request an upgrade to a newer version or a different edition',
    description:
        'Use this offering to move an already assigned software product to a newer version, a different edition or a different licensing tier.',

    catalogs: [SERVICE_CATALOG_SYS_ID],
    categories: [CATEGORY.software],
    availableFor: [USER_CRITERIA.allEmployees],

    flow: Now.ref('sys_hub_flow', 'flow-version-upgrade'),

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
        current_software_model: ReferenceVariable({
            question: 'Current software',
            referenceTable: TABLE.softwareModel,
            useReferenceQualifier: 'advanced',
            referenceQual: 'javascript:gs.getProperty("software_license_offerings.software_model_qualifier")',
            mandatory: true,
            order: 100,
        }),
        current_version: SingleLineTextVariable({
            question: 'Current version',
            mandatory: true,
            order: 200,
        }),
        current_edition: SingleLineTextVariable({
            question: 'Current edition',
            order: 300,
        }),
        upgrade_type: SelectBoxVariable({
            question: 'Upgrade type',
            mandatory: true,
            order: 400,
            choices: {
                mandatory_update: { label: 'Mandatory update', sequence: 1 },
                version_upgrade: { label: 'Version upgrade', sequence: 2 },
                technology_migration: { label: 'Technology migration', sequence: 3 },
                license_update: { label: 'License update', sequence: 4 },
            },
            includeNone: true,
        }),
        target_version: SingleLineTextVariable({
            question: 'Requested version',
            order: 500,
        }),
        target_edition: SingleLineTextVariable({
            question: 'Requested edition',
            order: 600,
        }),
        upgrade_justification: MultiLineTextVariable({
            question: 'Justification',
            mandatory: true,
            order: 700,
        }),
        expected_impact: SelectBoxVariable({
            question: 'Expected impact',
            mandatory: true,
            order: 800,
            choices: {
                individual: { label: 'Individual', sequence: 1 },
                team: { label: 'Team', sequence: 2 },
                department: { label: 'Department', sequence: 3 },
                corporate: { label: 'Corporate', sequence: 4 },
            },
            includeNone: true,
        }),
    },
})
