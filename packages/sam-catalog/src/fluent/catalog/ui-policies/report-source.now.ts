import { CatalogUiPolicy } from '@servicenow/sdk/core'
import { m365ReportImport } from '../catalog-items/m365-report-import.now'

export const visioReportPolicy = CatalogUiPolicy({
    $id: Now.ID['uip-report-source-visio'],
    shortDescription: 'Require the Visio usage report when that is the report source',
    catalogItem: m365ReportImport,
    catalogCondition: `${m365ReportImport.variables.report_source}=visio^EQ`,
    active: true,
    onLoad: true,
    reverseIfFalse: true,
    appliesOnCatalogItemView: true,
    appliesOnRequestedItems: true,
    actions: [
        {
            variableName: m365ReportImport.variables.visio_usage_report,
            visible: true,
            mandatory: true,
            order: 100,
        },
    ],
})

export const projectReportPolicy = CatalogUiPolicy({
    $id: Now.ID['uip-report-source-project'],
    shortDescription: 'Require the Project usage report when that is the report source',
    catalogItem: m365ReportImport,
    catalogCondition: `${m365ReportImport.variables.report_source}=project^EQ`,
    active: true,
    onLoad: true,
    reverseIfFalse: true,
    appliesOnCatalogItemView: true,
    appliesOnRequestedItems: true,
    actions: [
        {
            variableName: m365ReportImport.variables.project_usage_report,
            visible: true,
            mandatory: true,
            order: 100,
        },
    ],
})

export const autodeskReportPolicy = CatalogUiPolicy({
    $id: Now.ID['uip-report-source-autodesk'],
    shortDescription: 'Require the Autodesk usage report when that is the report source',
    catalogItem: m365ReportImport,
    catalogCondition: `${m365ReportImport.variables.report_source}=autodesk^EQ`,
    active: true,
    onLoad: true,
    reverseIfFalse: true,
    appliesOnCatalogItemView: true,
    appliesOnRequestedItems: true,
    actions: [
        {
            variableName: m365ReportImport.variables.autodesk_usage_report,
            visible: true,
            mandatory: true,

            variableMessage:
                'Attach the file exactly as Autodesk exports it. Do not delete the Filtros sheet or reorder the tabs: the user rows are read from the second sheet.',
            variableMessageType: 'info',
            order: 100,
        },
    ],
})

export const universalTemplatePolicy = CatalogUiPolicy({
    $id: Now.ID['uip-report-source-universal'],
    shortDescription: 'Require the universal template when that is the report source',
    catalogItem: m365ReportImport,
    catalogCondition: `${m365ReportImport.variables.report_source}=universal^EQ`,
    active: true,
    onLoad: true,
    reverseIfFalse: true,
    appliesOnCatalogItemView: true,
    appliesOnRequestedItems: true,
    actions: [
        {
            variableName: m365ReportImport.variables.universal_template,
            visible: true,
            mandatory: true,
            variableMessage:
                'Columns: Software Model, User Email, Last Activity. Dates must be yyyy-MM-dd, for example 2026-07-31.',
            variableMessageType: 'info',
            order: 100,
        },
    ],
})
