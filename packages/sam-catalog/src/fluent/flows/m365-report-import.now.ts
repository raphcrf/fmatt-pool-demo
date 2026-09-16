import { Flow, wfa, action, trigger } from '@servicenow/sdk/automation'
import { m365ReportImport } from '../catalog/catalog-items/m365-report-import.now'
import { processUniversalTemplate } from '../actions/process-universal-template.now'

const STATE_CLOSED_COMPLETE = '3'
const STAGE_COMPLETE = 'complete'

// Os cinco ramos de falha abriam task e chamavam endFlow sem tocar no estado, e
// o RITM ficava em Open para sempre. A task continua sendo o rastro do que
// precisa ser investigado; o RITM fecha porque a carga, essa, acabou.
//
// Isto deixou de ser caso raro: o importer só devolve ok=true quando alguma
// linha virou subscription, e property de modelo vazia é o estado de fábrica dos
// perfis Visio e Project.
const STATE_CLOSED_INCOMPLETE = '4'
const STAGE_CLOSED_INCOMPLETE = 'closed_incomplete'

export const m365ReportImportFlow = Flow(
    {
        $id: Now.ID['flow-m365-report-import'],
        name: 'Software Usage Report Import - Processing',
        description:
            'Validates the attached usage report, loads the universal template automatically and routes vendor reports to License Management.',
        runAs: 'system',
    },
    wfa.trigger(
        trigger.application.serviceCatalog,
        { $id: Now.ID['trg-m365-report-import'] },
        { run_flow_in: 'background' }
    ),
    params => {

        const licenseGroup = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['fmi-lookup-license-group'], annotation: 'License Management group' },
            {
                table: 'sys_properties',
                conditions: 'name=software_license_offerings.group_license_management',
                dont_fail_flow_on_error: true,
            }
        )

        wfa.action(
            action.core.getCatalogVariables,
            { $id: Now.ID['fmi-get-variables'] },
            {
                requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                template_catalog_item: `${m365ReportImport}`,
                catalog_variables: [
                    m365ReportImport.variables.report_source,
                    m365ReportImport.variables.visio_usage_report,
                    m365ReportImport.variables.project_usage_report,
                    m365ReportImport.variables.universal_template,
                    m365ReportImport.variables.import_notes,
                ],
            }
        )

        const attachments = wfa.action(
            action.core.getAttachmentsOnRecord,
            { $id: Now.ID['fmi-check-attachment'], annotation: 'Count attachments' },
            {
                source_record: `${wfa.dataPill(params.trigger.request_item, 'reference')}`,
            }
        )

        wfa.flowLogic.if(
            {
                $id: Now.ID['fmi-if-invalid'],
                label: 'No attachment',
                condition: `${wfa.dataPill(attachments.parameter1, 'integer')}<1`,
            },
            () => {
                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['fmi-worknote-invalid'] },
                    {
                        table_name: 'sc_req_item',
                        record: wfa.dataPill(params.trigger.request_item, 'reference'),
                        values: TemplateValue({
                            comments:
                                'No file was attached to this request. Attach the report for the selected source and submit again.',
                            work_notes: 'Attachment validation failed: no file on the request item.',
                            state: STATE_CLOSED_INCOMPLETE,
                            stage: STAGE_CLOSED_INCOMPLETE,
                        }),
                    }
                )
                wfa.action(
                    action.core.createCatalogTask,
                    { $id: Now.ID['fmi-correction-task'] },
                    {
                        ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                        ah_short_description: 'Correct and re-attach the software usage report',
                        ah_wait: false,
                        ah_fields: TemplateValue({ assignment_group: wfa.dataPill(licenseGroup.Record.value, 'string') }),
                    }
                )
                wfa.flowLogic.endFlow({ $id: Now.ID['fmi-end-invalid'] })
            }
        )

        const universalCheck = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['fmi-check-universal'], annotation: 'Is this the universal template?' },
            {
                table: 'sc_item_option_mtom',
                conditions: `request_item=${wfa.dataPill(params.trigger.request_item, 'string')}^sc_item_option.item_option_new.name=report_source^sc_item_option.value=universal`,
                dont_fail_flow_on_error: true,
            }
        )

        wfa.flowLogic.if(
            {
                $id: Now.ID['fmi-if-universal'],
                label: 'Universal template',
                condition: `${wfa.dataPill(universalCheck.Record.sys_id, 'string')}ISNOTEMPTY`,
            },
            () => {
                const importRun = wfa.action(
                    processUniversalTemplate,
                    { $id: Now.ID['fmi-run-universal-import'], annotation: 'Load the universal template' },
                    {
                        request_item: wfa.dataPill(params.trigger.request_item, 'string'),
                        profile: 'universal',
                    }
                )

                wfa.action(
                    action.core.log,
                    { $id: Now.ID['fmi-log-universal'] },
                    {
                        log_level: 'info',
                        log_message: `Universal usage import: ${wfa.dataPill(importRun.message, 'string')}`,
                    }
                )

                wfa.flowLogic.if(
                    {
                        $id: Now.ID['fmi-if-import-failed'],
                        label: 'Import failed',
                        condition: `${wfa.dataPill(importRun.ok, 'boolean')}=false`,
                    },
                    () => {
                        wfa.action(
                            action.core.updateRecord,
                            { $id: Now.ID['fmi-worknote-import-failed'] },
                            {
                                table_name: 'sc_req_item',
                                record: wfa.dataPill(params.trigger.request_item, 'reference'),
                                values: TemplateValue({
                                    comments: wfa.dataPill(importRun.message, 'string'),
                                    work_notes: 'Universal usage import failed. See the flow execution log.',
                                    state: STATE_CLOSED_INCOMPLETE,
                                    stage: STAGE_CLOSED_INCOMPLETE,
                                }),
                            }
                        )
                        wfa.action(
                            action.core.createCatalogTask,
                            { $id: Now.ID['fmi-import-failure-task'] },
                            {
                                ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                                ah_short_description: 'Investigate the failed universal usage template import',
                                ah_wait: false,
                                ah_fields: TemplateValue({ assignment_group: wfa.dataPill(licenseGroup.Record.value, 'string') }),
                            }
                        )
                        wfa.flowLogic.endFlow({ $id: Now.ID['fmi-end-import-failed'] })
                    }
                )

                wfa.flowLogic.if(
                    {
                        $id: Now.ID['fmi-if-rows-rejected'],
                        label: 'Some rows rejected',
                        condition: `${wfa.dataPill(importRun.rows_rejected, 'integer')}>0`,
                    },
                    () => {
                        wfa.action(
                            action.core.createCatalogTask,
                            { $id: Now.ID['fmi-rejected-rows-task'] },
                            {
                                ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                                ah_short_description:
                                    'Review rejected rows in the Software Usage Import staging table',
                                ah_wait: false,
                                ah_fields: TemplateValue({ assignment_group: wfa.dataPill(licenseGroup.Record.value, 'string') }),
                            }
                        )
                    }
                )

                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['fmi-worknote-universal-done'] },
                    {
                        table_name: 'sc_req_item',
                        record: wfa.dataPill(params.trigger.request_item, 'reference'),
                        values: TemplateValue({
                            comments: wfa.dataPill(importRun.message, 'string'),
                            work_notes: 'Universal usage template processed into software subscriptions.',
                            state: STATE_CLOSED_COMPLETE,
                            stage: STAGE_COMPLETE,
                        }),
                    }
                )
                wfa.flowLogic.endFlow({ $id: Now.ID['fmi-end-universal'] })
            }
        )

        const visioCheck = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['fmi-check-visio'], annotation: 'Is this the Visio report?' },
            {
                table: 'sc_item_option_mtom',
                conditions: `request_item=${wfa.dataPill(params.trigger.request_item, 'string')}^sc_item_option.item_option_new.name=report_source^sc_item_option.value=visio`,
                dont_fail_flow_on_error: true,
            }
        )

        wfa.flowLogic.if(
            {
                $id: Now.ID['fmi-if-visio'],
                label: 'Visio report',
                condition: `${wfa.dataPill(visioCheck.Record.sys_id, 'string')}ISNOTEMPTY`,
            },
            () => {
                const visioRun = wfa.action(
                    processUniversalTemplate,
                    { $id: Now.ID['fmi-run-visio-import'], annotation: 'Load the Visio usage report' },
                    {
                        request_item: wfa.dataPill(params.trigger.request_item, 'string'),
                        profile: 'visio',
                    }
                )

                wfa.action(
                    action.core.log,
                    { $id: Now.ID['fmi-log-visio'] },
                    {
                        log_level: 'info',
                        log_message: `Visio usage import: ${wfa.dataPill(visioRun.message, 'string')}`,
                    }
                )

                wfa.flowLogic.if(
                    {
                        $id: Now.ID['fmi-if-visio-failed'],
                        label: 'Visio import failed',
                        condition: `${wfa.dataPill(visioRun.ok, 'boolean')}=false`,
                    },
                    () => {
                        wfa.action(
                            action.core.updateRecord,
                            { $id: Now.ID['fmi-worknote-visio-failed'] },
                            {
                                table_name: 'sc_req_item',
                                record: wfa.dataPill(params.trigger.request_item, 'reference'),
                                values: TemplateValue({
                                    comments: wfa.dataPill(visioRun.message, 'string'),
                                    work_notes: 'Visio usage report import failed. See the flow execution log.',
                                    state: STATE_CLOSED_INCOMPLETE,
                                    stage: STAGE_CLOSED_INCOMPLETE,
                                }),
                            }
                        )
                        wfa.action(
                            action.core.createCatalogTask,
                            { $id: Now.ID['fmi-visio-failure-task'] },
                            {
                                ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                                ah_short_description: 'Investigate the failed Visio usage report import',
                                ah_wait: false,
                                ah_fields: TemplateValue({ assignment_group: wfa.dataPill(licenseGroup.Record.value, 'string') }),
                            }
                        )
                        wfa.flowLogic.endFlow({ $id: Now.ID['fmi-end-visio-failed'] })
                    }
                )

                // Era o único dos quatro ramos sem esta conferência.
                //
                // Continua não sendo alcançável, e agora por um motivo melhor: no
                // Visio a rejeição só acontece por falta de configuração — property
                // sem nenhum sys_id válido, ou samp_sw_subscription indisponível —,
                // e as duas valem para o arquivo inteiro. Rejeitou uma, rejeitou
                // todas: aí created+updated+unchanged é zero, ok vem false e o ramo
                // de falha acima encerra antes daqui.
                //
                // Linha que não acha subscription, ou acha duas, NÃO é rejeição: é
                // 'no_subscription' e 'ambiguous', que entram no balde unmatched e
                // aparecem no resumo. Fica no lugar caso o transform ganhe algum dia
                // uma rejeição por linha.
                wfa.flowLogic.if(
                    {
                        $id: Now.ID['fmi-if-visio-rows-rejected'],
                        label: 'Some rows rejected',
                        condition: `${wfa.dataPill(visioRun.rows_rejected, 'integer')}>0`,
                    },
                    () => {
                        wfa.action(
                            action.core.createCatalogTask,
                            { $id: Now.ID['fmi-visio-rejected-rows-task'] },
                            {
                                ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                                ah_short_description:
                                    'Review rejected rows in the Visio Usage Import staging table: the visio_software_model property has no valid software model sys_id',
                                ah_wait: false,
                                ah_fields: TemplateValue({ assignment_group: wfa.dataPill(licenseGroup.Record.value, 'string') }),
                            }
                        )
                    }
                )

                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['fmi-worknote-visio-done'] },
                    {
                        table_name: 'sc_req_item',
                        record: wfa.dataPill(params.trigger.request_item, 'reference'),
                        values: TemplateValue({
                            comments: wfa.dataPill(visioRun.message, 'string'),
                            work_notes:
                                'Visio usage report processed. Usage is attached to the Visio subscription each user already holds, so rows for users with no Visio subscription, or with more than one, are reported and skipped. Rows imported with warnings usually mean the user is no longer active in ServiceNow, which is expected for departed users still holding a licence.',
                            state: STATE_CLOSED_COMPLETE,
                            stage: STAGE_COMPLETE,
                        }),
                    }
                )
                wfa.flowLogic.endFlow({ $id: Now.ID['fmi-end-visio'] })
            }
        )

        const autodeskCheck = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['fmi-check-autodesk'], annotation: 'Is this the Autodesk report?' },
            {
                table: 'sc_item_option_mtom',
                conditions: `request_item=${wfa.dataPill(params.trigger.request_item, 'string')}^sc_item_option.item_option_new.name=report_source^sc_item_option.value=autodesk`,
                dont_fail_flow_on_error: true,
            }
        )

        wfa.flowLogic.if(
            {
                $id: Now.ID['fmi-if-autodesk'],
                label: 'Autodesk report',
                condition: `${wfa.dataPill(autodeskCheck.Record.sys_id, 'string')}ISNOTEMPTY`,
            },
            () => {
                const autodeskRun = wfa.action(
                    processUniversalTemplate,
                    { $id: Now.ID['fmi-run-autodesk-import'], annotation: 'Load the Autodesk usage report' },
                    {
                        request_item: wfa.dataPill(params.trigger.request_item, 'string'),
                        profile: 'autodesk',
                    }
                )

                wfa.action(
                    action.core.log,
                    { $id: Now.ID['fmi-log-autodesk'] },
                    {
                        log_level: 'info',
                        log_message: `Autodesk usage import: ${wfa.dataPill(autodeskRun.message, 'string')}`,
                    }
                )

                wfa.flowLogic.if(
                    {
                        $id: Now.ID['fmi-if-autodesk-failed'],
                        label: 'Autodesk import failed',
                        condition: `${wfa.dataPill(autodeskRun.ok, 'boolean')}=false`,
                    },
                    () => {
                        wfa.action(
                            action.core.updateRecord,
                            { $id: Now.ID['fmi-worknote-autodesk-failed'] },
                            {
                                table_name: 'sc_req_item',
                                record: wfa.dataPill(params.trigger.request_item, 'reference'),
                                values: TemplateValue({
                                    comments: wfa.dataPill(autodeskRun.message, 'string'),
                                    work_notes: 'Autodesk usage report import failed. See the flow execution log.',
                                    state: STATE_CLOSED_INCOMPLETE,
                                    stage: STAGE_CLOSED_INCOMPLETE,
                                }),
                            }
                        )
                        wfa.action(
                            action.core.createCatalogTask,
                            { $id: Now.ID['fmi-autodesk-failure-task'] },
                            {
                                ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                                ah_short_description: 'Investigate the failed Autodesk usage report import',
                                ah_wait: false,
                                ah_fields: TemplateValue({ assignment_group: wfa.dataPill(licenseGroup.Record.value, 'string') }),
                            }
                        )
                        wfa.flowLogic.endFlow({ $id: Now.ID['fmi-end-autodesk-failed'] })
                    }
                )

                wfa.flowLogic.if(
                    {
                        $id: Now.ID['fmi-if-autodesk-rejected'],
                        label: 'Some rows rejected',
                        condition: `${wfa.dataPill(autodeskRun.rows_rejected, 'integer')}>0`,
                    },
                    () => {
                        wfa.action(
                            action.core.createCatalogTask,
                            { $id: Now.ID['fmi-autodesk-rejected-task'] },
                            {
                                ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                                ah_short_description:
                                    'Map the rejected Autodesk offerings in the Software Usage Offering Map',
                                ah_wait: false,
                                ah_fields: TemplateValue({ assignment_group: wfa.dataPill(licenseGroup.Record.value, 'string') }),
                            }
                        )
                    }
                )

                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['fmi-worknote-autodesk-done'] },
                    {
                        table_name: 'sc_req_item',
                        record: wfa.dataPill(params.trigger.request_item, 'reference'),
                        values: TemplateValue({
                            comments: wfa.dataPill(autodeskRun.message, 'string'),
                            work_notes:
                                'Autodesk usage report processed into software subscriptions, including seat assignment. Rejected rows mean the offering has no software model in the Software Usage Offering Map.',
                            state: STATE_CLOSED_COMPLETE,
                            stage: STAGE_COMPLETE,
                        }),
                    }
                )
                wfa.flowLogic.endFlow({ $id: Now.ID['fmi-end-autodesk'] })
            }
        )

        const projectCheck = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['fmi-check-project'], annotation: 'Is this the Project report?' },
            {
                table: 'sc_item_option_mtom',
                conditions: `request_item=${wfa.dataPill(params.trigger.request_item, 'string')}^sc_item_option.item_option_new.name=report_source^sc_item_option.value=project`,
                dont_fail_flow_on_error: true,
            }
        )

        wfa.flowLogic.if(
            {
                $id: Now.ID['fmi-if-project'],
                label: 'Project report',
                condition: `${wfa.dataPill(projectCheck.Record.sys_id, 'string')}ISNOTEMPTY`,
            },
            () => {
                const projectRun = wfa.action(
                    processUniversalTemplate,
                    { $id: Now.ID['fmi-run-project-import'], annotation: 'Load the Project usage report' },
                    {
                        request_item: wfa.dataPill(params.trigger.request_item, 'string'),
                        profile: 'project',
                    }
                )

                wfa.action(
                    action.core.log,
                    { $id: Now.ID['fmi-log-project'] },
                    {
                        log_level: 'info',
                        log_message: `Project usage import: ${wfa.dataPill(projectRun.message, 'string')}`,
                    }
                )

                wfa.flowLogic.if(
                    {
                        $id: Now.ID['fmi-if-project-failed'],
                        label: 'Project import failed',
                        condition: `${wfa.dataPill(projectRun.ok, 'boolean')}=false`,
                    },
                    () => {
                        wfa.action(
                            action.core.updateRecord,
                            { $id: Now.ID['fmi-worknote-project-failed'] },
                            {
                                table_name: 'sc_req_item',
                                record: wfa.dataPill(params.trigger.request_item, 'reference'),
                                values: TemplateValue({
                                    comments: wfa.dataPill(projectRun.message, 'string'),
                                    work_notes: 'Project usage report import failed. See the flow execution log.',
                                    state: STATE_CLOSED_INCOMPLETE,
                                    stage: STAGE_CLOSED_INCOMPLETE,
                                }),
                            }
                        )
                        wfa.action(
                            action.core.createCatalogTask,
                            { $id: Now.ID['fmi-project-failure-task'] },
                            {
                                ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                                ah_short_description: 'Investigate the failed Project usage report import',
                                ah_wait: false,
                                ah_fields: TemplateValue({ assignment_group: wfa.dataPill(licenseGroup.Record.value, 'string') }),
                            }
                        )
                        wfa.flowLogic.endFlow({ $id: Now.ID['fmi-end-project-failed'] })
                    }
                )

                wfa.flowLogic.if(
                    {
                        $id: Now.ID['fmi-if-project-rejected'],
                        label: 'Some rows rejected',
                        condition: `${wfa.dataPill(projectRun.rows_rejected, 'integer')}>0`,
                    },
                    () => {
                        wfa.action(
                            action.core.createCatalogTask,
                            { $id: Now.ID['fmi-project-rejected-task'] },
                            {
                                ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                                // O perfil do Project resolve o modelo pela property
                                // software_license_offerings.project_software_model
                                // (project-usage-transform.js:18), nao pelo de-para.
                                // A task mandava olhar a tabela errada.
                                ah_short_description:
                                    'Review rejected rows in the Project Usage Import staging table and check the project_software_model property',
                                ah_wait: false,
                                ah_fields: TemplateValue({ assignment_group: wfa.dataPill(licenseGroup.Record.value, 'string') }),
                            }
                        )
                    }
                )

                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['fmi-worknote-project-done'] },
                    {
                        table_name: 'sc_req_item',
                        record: wfa.dataPill(params.trigger.request_item, 'reference'),
                        values: TemplateValue({
                            comments: wfa.dataPill(projectRun.message, 'string'),
                            work_notes:
                                'Project usage report processed. This profile only updates existing subscriptions and never creates one, so rows with no matching subscription are reported and skipped. Rejected rows mean the project_software_model property is not set.',
                            state: STATE_CLOSED_COMPLETE,
                            stage: STAGE_COMPLETE,
                        }),
                    }
                )
                wfa.flowLogic.endFlow({ $id: Now.ID['fmi-end-project'] })
            }
        )

        wfa.action(
            action.core.createCatalogTask,
            { $id: Now.ID['fmi-processing-task'] },
            {
                ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                ah_short_description: 'Process the Microsoft 365 Project usage report into software subscriptions',
                ah_wait: true,
                ah_fields: TemplateValue({ assignment_group: wfa.dataPill(licenseGroup.Record.value, 'string') }),
            }
        )

        wfa.action(
            action.core.createCatalogTask,
            { $id: Now.ID['fmi-post-load-task'] },
            {
                ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                ah_short_description:
                    'Validate the load: users processed, licenses found, import errors and indicator refresh',
                ah_wait: true,
                ah_fields: TemplateValue({ assignment_group: wfa.dataPill(licenseGroup.Record.value, 'string') }),
            }
        )

        wfa.action(
            action.core.updateRecord,
            { $id: Now.ID['fmi-worknote-closed'] },
            {
                table_name: 'sc_req_item',
                record: wfa.dataPill(params.trigger.request_item, 'reference'),
                values: TemplateValue({
                    comments: 'The usage report has been processed and validated.',
                    work_notes:
                        'Project usage report import completed. Load date, processed files and record counts are recorded on the fulfillment tasks.',

                    state: STATE_CLOSED_COMPLETE,
                    stage: STAGE_COMPLETE,
                }),
            }
        )
    }
)
