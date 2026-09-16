import {
    CatalogItem,
    AttachmentVariable,
    MultiLineTextVariable,
    SelectBoxVariable,
    RequestedForVariable,
} from '@servicenow/sdk/core'
import { SERVICE_CATALOG_SYS_ID, CATEGORY } from '../../shared/instance-refs'
import { licenseManagementCriteria } from '../user-criteria/license-management.now'

export const m365ReportImport = CatalogItem({
    $id: Now.ID['ci-m365-report-import'],
    name: 'Software Usage Report Import',
    shortDescription: 'Internal: load software usage reports into SAM',
    description:
        'Operational offering restricted to the License Management team. Loads a Microsoft 365 Visio or Project usage export, an Autodesk usage report, or a universal usage template, and turns it into software subscriptions and usage.',

    catalogs: [SERVICE_CATALOG_SYS_ID],
    categories: [CATEGORY.software],
    availableFor: [licenseManagementCriteria],

    flow: Now.ref('sys_hub_flow', 'flow-m365-report-import'),

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
            mandatory: true,
            order: 50,
        }),
        report_source: SelectBoxVariable({
            question: 'Report source',
            mandatory: true,
            order: 50,
            choices: {
                visio: { label: 'Microsoft 365 - Visio usage', sequence: 1 },
                project: { label: 'Microsoft 365 - Project usage', sequence: 2 },
                autodesk: { label: 'Autodesk - usage report', sequence: 3 },
                universal: { label: 'Universal template (CSV or XLSX)', sequence: 4 },
            },
            includeNone: true,
        }),
        visio_usage_report: AttachmentVariable({
            question: 'Visio usage report (CSV)',
            hidden: true,
            order: 100,
        }),
        project_usage_report: AttachmentVariable({
            question: 'Project usage report (CSV)',
            hidden: true,
            order: 200,
        }),

        autodesk_usage_report: AttachmentVariable({
            question: 'Autodesk usage report (XLSX or CSV)',
            hidden: true,
            order: 225,
        }),

        universal_template: AttachmentVariable({
            question: 'Universal usage template (CSV or XLSX)',
            hidden: true,
            order: 250,
        }),
        import_notes: MultiLineTextVariable({
            question: 'Notes',
            order: 400,
        }),
    },
})
