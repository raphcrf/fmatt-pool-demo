import { Flow, wfa, action, trigger } from '@servicenow/sdk/automation'
import { softwareApproval } from '../catalog/catalog-items/software-approval.now'
import { softwareInformationSet } from '../catalog/variable-sets/software-information.now'
import { businessJustificationSet } from '../catalog/variable-sets/business-justification.now'
import { technicalInformationSet } from '../catalog/variable-sets/technical-information.now'
import { licensingInformationSet } from '../catalog/variable-sets/licensing-information.now'

// Item de catálogo dirigido por Flow Designer não fecha o RITM sozinho: sem estes
// dois campos o flow termina COMPLETE e o RITM fica em Open para sempre. Mesmos
// valores usados pelo license-fulfillment-backbone.
//
// A homologação recusada fecha em 4 (Closed Incomplete), não em 3: o pedido foi
// "aprove este software" e a resposta foi não — o solicitante não recebeu o que
// pediu. O stage acompanha o state: 'closed_incomplete' é escolha do dicionário
// de sc_req_item, ao lado de 'complete'.
const STATE_CLOSED_COMPLETE = '3'
const STATE_CLOSED_INCOMPLETE = '4'
const STAGE_COMPLETE = 'complete'
const STAGE_CLOSED_INCOMPLETE = 'closed_incomplete'

export const softwareApprovalFlow = Flow(
    {
        $id: Now.ID['flow-software-approval'],
        name: 'Software Approval Request - Review',
        description:
            'Runs the two parallel software approval reviews, consolidates the outcome and notifies the requester.',
        runAs: 'system',
    },
    wfa.trigger(
        trigger.application.serviceCatalog,
        { $id: Now.ID['trg-software-approval'] },
        { run_flow_in: 'background' }
    ),
    params => {

        const licenseGroup = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['sa-lookup-license-group'], annotation: 'License Management group' },
            {
                table: 'sys_properties',
                conditions: 'name=software_license_offerings.group_license_management',
                dont_fail_flow_on_error: true,
            }
        )

        const securityGroup = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['sa-lookup-security-group'], annotation: 'Information Security group' },
            {
                table: 'sys_properties',
                conditions: 'name=software_license_offerings.group_information_security',
                dont_fail_flow_on_error: true,
            }
        )

        wfa.action(
            action.core.getCatalogVariables,
            { $id: Now.ID['fsa-get-variables'] },
            {
                requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                template_catalog_item: `${softwareApproval}`,
                catalog_variables: [
                    softwareInformationSet.variables.software_name,
                    softwareInformationSet.variables.software_manufacturer,
                    softwareInformationSet.variables.software_version,
                    softwareInformationSet.variables.vendor_website,
                    businessJustificationSet.variables.requesting_area,
                    businessJustificationSet.variables.business_objective,
                    businessJustificationSet.variables.expected_benefits,
                    businessJustificationSet.variables.estimated_user_count,
                    technicalInformationSet.variables.required_operating_system,
                    technicalInformationSet.variables.installation_type,
                    technicalInformationSet.variables.infrastructure_requirements,
                    technicalInformationSet.variables.integration_required,
                    licensingInformationSet.variables.licensing_model,
                    licensingInformationSet.variables.license_type,
                    licensingInformationSet.variables.estimated_license_quantity,
                    licensingInformationSet.variables.estimated_cost,
                    softwareApproval.variables.additional_notes,
                ],
            }
        )

        wfa.flowLogic.doInParallel(
            { $id: Now.ID['fsa-parallel-reviews'], annotation: 'Two parallel reviews' },
            () => {
                wfa.action(
                    action.core.createCatalogTask,
                    { $id: Now.ID['fsa-review-security'] },
                    {
                        ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                        ah_short_description: 'Information Security review of the proposed software',
                        ah_wait: true,
                        ah_fields: TemplateValue({ assignment_group: wfa.dataPill(securityGroup.Record.value, 'string') }),
                    }
                )
            },
            () => {
                wfa.action(
                    action.core.createCatalogTask,
                    { $id: Now.ID['fsa-review-licensing'] },
                    {
                        ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                        ah_short_description: 'License Management review of the proposed software',
                        ah_wait: true,
                        ah_fields: TemplateValue({ assignment_group: wfa.dataPill(licenseGroup.Record.value, 'string') }),
                    }
                )
            }
        )

        wfa.action(
            action.core.createCatalogTask,
            { $id: Now.ID['fsa-consolidation-task'] },
            {
                ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                ah_short_description:
                    'Consolidate the reviews and record the homologation outcome on the request item',
                ah_wait: true,
                ah_fields: TemplateValue({ assignment_group: wfa.dataPill(licenseGroup.Record.value, 'string') }),
            }
        )

        const approvedCheck = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['fsa-check-approved'] },
            {
                table: 'sc_req_item',
                conditions: `sys_id=${wfa.dataPill(params.trigger.request_item, 'string')}^u_homologation_outcome=approved`,
                dont_fail_flow_on_error: true,
            }
        )

        const restrictedCheck = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['fsa-check-restricted'] },
            {
                table: 'sc_req_item',
                conditions: `sys_id=${wfa.dataPill(params.trigger.request_item, 'string')}^u_homologation_outcome=approved_with_restrictions`,
                dont_fail_flow_on_error: true,
            }
        )

        // u_homologation_outcome não tem valor padrão e ninguém o grava pelo flow:
        // quem preenche é a pessoa que fecha a task de consolidação. Se ela fechar
        // sem preencher, o campo fica vazio — e antes esse caso caía no else junto
        // com a recusa, mandando ao solicitante um e-mail dizendo que o software
        // não foi aprovado quando ninguém decidiu nada. A recusa agora é testada
        // explicitamente, e o campo vazio tem saída própria.
        const rejectedCheck = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['fsa-check-rejected'] },
            {
                table: 'sc_req_item',
                conditions: `sys_id=${wfa.dataPill(params.trigger.request_item, 'string')}^u_homologation_outcome=rejected`,
                dont_fail_flow_on_error: true,
            }
        )

        wfa.flowLogic.if(
            {
                $id: Now.ID['fsa-if-approved'],
                label: 'Approved',
                condition: `${wfa.dataPill(approvedCheck.Record.sys_id, 'string')}ISNOTEMPTY`,
            },
            () => {
                wfa.action(
                    action.core.sendEmail,
                    { $id: Now.ID['fsa-email-approved'] },
                    {
                        ah_to: `${wfa.dataPill(params.trigger.request_item.requested_for.email, 'string')}`,
                        ah_subject: `Software approved: ${wfa.dataPill(params.trigger.request_item.number, 'string')}`,
                        ah_body:
                            'Your software approval request has been approved. The product is now cleared for corporate use and can be requested through the Software License Request offering.',
                        record: wfa.dataPill(params.trigger.request_item, 'reference'),
                        table_name: 'sc_req_item',
                    }
                )
                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['fsa-close-approved'] },
                    {
                        table_name: 'sc_req_item',
                        record: wfa.dataPill(params.trigger.request_item, 'reference'),
                        values: TemplateValue({
                            work_notes: 'Homologation completed: approved. The product is cleared for corporate use.',
                            state: STATE_CLOSED_COMPLETE,
                            stage: STAGE_COMPLETE,
                        }),
                    }
                )
            }
        )

        wfa.flowLogic.elseIf(
            {
                $id: Now.ID['fsa-elseif-restricted'],
                label: 'Approved with restrictions',
                condition: `${wfa.dataPill(restrictedCheck.Record.sys_id, 'string')}ISNOTEMPTY`,
            },
            () => {
                wfa.action(
                    action.core.sendEmail,
                    { $id: Now.ID['fsa-email-restricted'] },
                    {
                        ah_to: `${wfa.dataPill(params.trigger.request_item.requested_for.email, 'string')}`,
                        ah_subject: `Software approved with restrictions: ${wfa.dataPill(params.trigger.request_item.number, 'string')}`,
                        ah_body:
                            'Your software approval request has been approved with restrictions. Review the conditions recorded on the request item before requesting a license.',
                        record: wfa.dataPill(params.trigger.request_item, 'reference'),
                        table_name: 'sc_req_item',
                    }
                )
                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['fsa-close-restricted'] },
                    {
                        table_name: 'sc_req_item',
                        record: wfa.dataPill(params.trigger.request_item, 'reference'),
                        values: TemplateValue({
                            work_notes:
                                'Homologation completed: approved with restrictions. The conditions are recorded on this request item.',
                            state: STATE_CLOSED_COMPLETE,
                            stage: STAGE_COMPLETE,
                        }),
                    }
                )
            }
        )

        wfa.flowLogic.elseIf(
            {
                $id: Now.ID['fsa-elseif-rejected'],
                label: 'Rejected',
                condition: `${wfa.dataPill(rejectedCheck.Record.sys_id, 'string')}ISNOTEMPTY`,
            },
            () => {
                wfa.action(
                    action.core.sendEmail,
                    { $id: Now.ID['fsa-email-rejected'] },
                    {
                        ah_to: `${wfa.dataPill(params.trigger.request_item.requested_for.email, 'string')}`,
                        ah_subject: `Software not approved: ${wfa.dataPill(params.trigger.request_item.number, 'string')}`,
                        ah_body:
                            'Your software approval request was not approved. The reasons are recorded on the request item.',
                        record: wfa.dataPill(params.trigger.request_item, 'reference'),
                        table_name: 'sc_req_item',
                    }
                )
                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['fsa-close-rejected'] },
                    {
                        table_name: 'sc_req_item',
                        record: wfa.dataPill(params.trigger.request_item, 'reference'),
                        values: TemplateValue({
                            work_notes:
                                'Homologation completed: not approved. The reasons are recorded on this request item.',
                            state: STATE_CLOSED_INCOMPLETE,
                            stage: STAGE_CLOSED_INCOMPLETE,
                        }),
                    }
                )
            }
        )

        // Nenhum dos três desfechos foi gravado. Não é recusa: é a task de
        // consolidação fechada sem preencher o campo. O solicitante não recebe
        // e-mail de recusa por algo que ninguém decidiu — quem recebe é a Gestão
        // de Licenças, por task.
        wfa.flowLogic.else({ $id: Now.ID['fsa-else-no-outcome'], annotation: 'No outcome recorded' }, () => {
            wfa.action(
                action.core.createCatalogTask,
                { $id: Now.ID['fsa-no-outcome-task'] },
                {
                    ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                    ah_short_description:
                        'Record the homologation outcome on this request item: the consolidation task was closed without one',
                    ah_wait: false,
                    ah_fields: TemplateValue({
                        assignment_group: wfa.dataPill(licenseGroup.Record.value, 'string'),
                    }),
                }
            )
            wfa.action(
                action.core.updateRecord,
                { $id: Now.ID['fsa-close-no-outcome'] },
                {
                    table_name: 'sc_req_item',
                    record: wfa.dataPill(params.trigger.request_item, 'reference'),
                    values: TemplateValue({
                        comments:
                            'Your software approval request was closed without a recorded outcome. License Management has been asked to record it.',
                        work_notes:
                            'The consolidation task closed without setting u_homologation_outcome. No decision was recorded.',
                        state: STATE_CLOSED_INCOMPLETE,
                        stage: STAGE_CLOSED_INCOMPLETE,
                    }),
                }
            )
        })
    }
)
