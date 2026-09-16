import { Subflow, wfa, action } from '@servicenow/sdk/automation'
import { StringColumn, IntegerColumn, ReferenceColumn } from '@servicenow/sdk/core'
import { GROUP_LICENSE_MANAGEMENT } from '../shared/instance-refs'
import { softwarePurchaseRequest } from '../catalog/catalog-items/software-purchase-request.now'
import { provisionEntraGroup } from '../actions/provision-entra-group.now'
import { releaseAllocation } from '../actions/release-allocation.now'

const PURCHASE_REQUEST_ITEM = `${softwarePurchaseRequest}`

const STATE_CLOSED_COMPLETE = '3'
const STAGE_COMPLETE = 'complete'

// Rejeição e indisponibilidade fecham em 4 (Closed Incomplete): o flow terminou,
// mas o solicitante não recebeu o que pediu. Sem isto o RITM fica em Open para
// sempre — o item dirigido por Flow Designer não se fecha sozinho, e nenhum dos
// flows chamadores toca no registro depois que o subflow encerra.
//
// O stage acompanha: sc_req_item.stage tem a escolha 'closed_incomplete' ao lado
// de 'complete', e fechar em state=4 com stage='complete' contava duas histórias
// diferentes no mesmo registro.
const STATE_CLOSED_INCOMPLETE = '4'
const STAGE_CLOSED_INCOMPLETE = 'closed_incomplete'

export const licenseFulfillmentBackbone = Subflow(
    {
        $id: Now.ID['subflow-license-fulfillment-backbone'],
        name: 'Software License Fulfillment Backbone',
        description:
            'Shared fulfillment path for software license request and return: availability validation, manager approval, software owner approval, allocation and inventory update, operational task.',
        runAs: 'system',
        category: 'Software Asset Management',
        access: 'public',

        inputs: {

            request_item: ReferenceColumn({
                label: 'Request item',
                referenceTable: 'sc_req_item',
                mandatory: true,
            }),
            software_model: ReferenceColumn({
                label: 'Software model',
                referenceTable: 'cmdb_software_product_model',
                mandatory: true,
            }),

            operation: StringColumn({
                label: 'Operation',
                mandatory: true,
                maxLength: 40,
            }),

            requested_for: ReferenceColumn({
                label: 'Requested for',
                referenceTable: 'sys_user',
                mandatory: true,
            }),
        },

        outputs: {

            outcome: StringColumn({ label: 'Outcome', maxLength: 40 }),
            entitlement: ReferenceColumn({
                label: 'Software entitlement',
                referenceTable: 'alm_license',
            }),
            available_rights: IntegerColumn({ label: 'Available rights at validation' }),

            status_message: StringColumn({ label: 'Status message', maxLength: 255 }),
        },
    },

    params => {

        const licenseGroup = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['sf-bb-lookup-license-group'], annotation: 'License Management group' },
            {
                table: 'sys_properties',
                conditions: 'name=software_license_offerings.group_license_management',
                dont_fail_flow_on_error: true,
            }
        )

        const model = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['sf-bb-lookup-model'], annotation: 'Read software owner and AD group' },
            {
                table: 'cmdb_software_product_model',
                conditions: `sys_id=${wfa.dataPill(params.inputs.software_model, 'string')}`,
            }
        )

        wfa.flowLogic.if(
            {
                $id: Now.ID['sf-bb-if-return'],
                label: 'Return',
                condition: `${wfa.dataPill(params.inputs.operation, 'string')}=return`,
            },
            () => {

                const allocation = wfa.action(
                    action.core.lookUpRecord,
                    { $id: Now.ID['sf-bb-lookup-allocation'] },
                    {
                        table: 'alm_entitlement',
                        conditions: `assigned_to=${wfa.dataPill(params.inputs.requested_for, 'string')}^licensed_by.software_model=${wfa.dataPill(params.inputs.software_model, 'string')}`,
                        dont_fail_flow_on_error: true,
                    }
                )

                wfa.flowLogic.if(
                    {
                        $id: Now.ID['sf-bb-if-no-allocation'],
                        label: 'Nothing allocated',
                        condition: `${wfa.dataPill(allocation.Record.sys_id, 'string')}ISEMPTY`,
                    },
                    () => {
                        wfa.action(
                            action.core.updateRecord,
                            { $id: Now.ID['sf-bb-worknote-no-allocation'] },
                            {
                                table_name: 'sc_req_item',
                                record: wfa.dataPill(params.inputs.request_item, 'reference'),
                                values: TemplateValue({
                                    comments:
                                        'We found no active license allocation for you on this software, so there was nothing to return.',
                                    work_notes:
                                        'No active license allocation was found for this user and software. Nothing to return.',
                                    state: STATE_CLOSED_INCOMPLETE,
                                    stage: STAGE_CLOSED_INCOMPLETE,
                                }),
                            }
                        )
                        wfa.flowLogic.assignSubflowOutputs(
                            { $id: Now.ID['sf-bb-out-nothing-to-return'] },
                            params.outputs,
                            {
                                outcome: 'unavailable',
                                status_message: 'No active allocation found for this user and software.',
                            }
                        )
                        wfa.flowLogic.endFlow({ $id: Now.ID['sf-bb-end-nothing-to-return'] })
                    }
                )

                const returnApproval = wfa.action(
                    action.core.askForApproval,
                    { $id: Now.ID['sf-bb-return-approval'] },
                    {
                        record: wfa.dataPill(params.inputs.request_item, 'reference'),
                        table: 'sc_req_item',
                        approval_reason: 'License Management validation for a software license return',
                        journal_field: 'comments',
                        approval_conditions: wfa.approvalRules({
                            ruleSets: [
                                {
                                    action: 'ApprovesRejects',
                                    conditionType: 'AND',
                                    rules: [
                                        [
                                            {
                                                ruleType: 'Any',
                                                users: [],
                                                groups: [GROUP_LICENSE_MANAGEMENT],
                                                manual: false,
                                            },
                                        ],
                                    ],
                                },
                            ],
                        }),
                    }
                )

                wfa.flowLogic.if(
                    {
                        $id: Now.ID['sf-bb-if-return-rejected'],
                        label: 'Return rejected',
                        condition: `${wfa.dataPill(returnApproval.approval_state, 'choice')}=rejected`,
                    },
                    () => {
                        wfa.action(
                            action.core.updateRecord,
                            { $id: Now.ID['sf-bb-reject-note-return'] },
                            {
                                table_name: 'sc_req_item',
                                record: wfa.dataPill(params.inputs.request_item, 'reference'),
                                values: TemplateValue({
                                    comments:
                                        'Your software license return was not approved by License Management. The reason is recorded in the approval history above.',
                                    work_notes: 'Return rejected by License Management.',
                                    state: STATE_CLOSED_INCOMPLETE,
                                    stage: STAGE_CLOSED_INCOMPLETE,
                                }),
                            }
                        )
                        wfa.flowLogic.assignSubflowOutputs(
                            { $id: Now.ID['sf-bb-out-return-rejected'] },
                            params.outputs,
                            {
                                outcome: 'rejected',
                                status_message: 'License Management rejected the return request.',
                            }
                        )
                        wfa.flowLogic.endFlow({ $id: Now.ID['sf-bb-end-return-rejected'] })
                    }
                )

                // Espelho exato da rota de inclusão: tira do grupo, espera a
                // sincronização, CONFERE a ausência, e só então libera a alocação.
                //
                // A ordem importa. Liberar a alocação antes de confirmar diria que
                // a licença está livre com a pessoa ainda no grupo e ainda usando
                // — o ServiceNow entregaria o mesmo direito a outra pessoa.
                // CONSULTA ANTES DE AGIR. Pergunta ao Entra se a pessoa está no
                // grupo e trata os dois desfechos de forma diferente:
                //
                //   está no grupo    -> remove e registra que removeu
                //   não está         -> registra que não estava e abre task para
                //                       alguém tirar a licença onde ela estiver
                //
                // O segundo caso não é "nada a fazer": se o ServiceNow tem alocação
                // e o Entra não tem associação, os dois lados divergiram, e a
                // licença pode estar vindo de outro grupo. Isso é trabalho humano.
                const memberCheck = wfa.action(
                    provisionEntraGroup,
                    { $id: Now.ID['sf-bb-entra-check-member'], annotation: 'Is the user in the group?' },
                    {
                        software_model: wfa.dataPill(params.inputs.software_model, 'string'),
                        requested_for: wfa.dataPill(params.inputs.requested_for, 'string'),
                        operation: 'verify',
                    }
                )

                wfa.flowLogic.if(
                    {
                        $id: Now.ID['sf-bb-if-is-member'],
                        label: 'User is in the group',
                        condition: `${wfa.dataPill(memberCheck.status, 'string')}=confirmed`,
                    },
                    () => {
                        const entraRemove = wfa.action(
                            provisionEntraGroup,
                            { $id: Now.ID['sf-bb-entra-remove'], annotation: 'Remove the user from the group' },
                            {
                                software_model: wfa.dataPill(params.inputs.software_model, 'string'),
                                requested_for: wfa.dataPill(params.inputs.requested_for, 'string'),
                                operation: 'remove',
                            }
                        )

                        wfa.flowLogic.if(
                            {
                                $id: Now.ID['sf-bb-if-entra-removed'],
                                label: 'Removed',
                                condition: `${wfa.dataPill(entraRemove.status, 'string')}=removed`,
                            },
                            () => {
                                wfa.action(
                                    action.core.updateRecord,
                                    { $id: Now.ID['sf-bb-entra-removed-note'] },
                                    {
                                        table_name: 'sc_req_item',
                                        record: wfa.dataPill(params.inputs.request_item, 'reference'),
                                        values: TemplateValue({
                                            work_notes: `${wfa.dataPill(entraRemove.message, 'string')} The membership will be re-checked in one hour before the license is returned to the pool.`,
                                        }),
                                    }
                                )

                                // UMA HORA, e menos folga do que a inclusão porque a
                                // pergunta é outra: aqui não se espera licença
                                // aparecer, só a associação desaparecer, e ela sai do
                                // grupo na hora. A hora existe para pegar o caso em
                                // que a remoção foi aceita e algo a desfez — regra
                                // dinâmica de grupo, sincronização de diretório,
                                // outra automação.
                                wfa.flowLogic.waitForADuration({
                                    $id: Now.ID['sf-bb-entra-remove-wait'],
                                    durationType: 'relative_duration',
                                    duration: { seconds: 0 },
                                    relativeOperator: 'after',
                                    relativeDatetime: `${wfa.dataPill(entraRemove.verify_after, 'string')}`,
                                    annotation: 'Wait before confirming the removal',
                                })

                                const removalCheck = wfa.action(
                                    provisionEntraGroup,
                                    {
                                        $id: Now.ID['sf-bb-entra-verify-removal'],
                                        annotation: 'Confirm the user is out',
                                    },
                                    {
                                        software_model: wfa.dataPill(params.inputs.software_model, 'string'),
                                        requested_for: wfa.dataPill(params.inputs.requested_for, 'string'),
                                        operation: 'verify_removal',
                                    }
                                )

                                wfa.flowLogic.if(
                                    {
                                        $id: Now.ID['sf-bb-if-removal-confirmed'],
                                        label: 'Removal confirmed',
                                        condition: `${wfa.dataPill(removalCheck.confirmed, 'boolean')}=true`,
                                    },
                                    () => {
                                        // A Action resolve a alocacao por conta propria, ja do outro lado da
                                        // espera, e apaga o registro. A consulta vive dentro do passo, com o
                                        // filtro de licenca ativa que a consulta do flow nao tinha.
                                        const releaseEntra = wfa.action(
                                            releaseAllocation,
                                            { $id: Now.ID['sf-bb-release-alloc-entra'], annotation: 'Return the license to the pool' },
                                            {
                                                software_model: wfa.dataPill(params.inputs.software_model, 'string'),
                                                requested_for: wfa.dataPill(params.inputs.requested_for, 'string'),
                                                context_note: `${wfa.dataPill(removalCheck.message, 'string')}`,
                                            }
                                        )

                                        wfa.action(
                                            action.core.updateRecord,
                                            { $id: Now.ID['sf-bb-returned-closed-entra'] },
                                            {
                                                table_name: 'sc_req_item',
                                                record: wfa.dataPill(params.inputs.request_item, 'reference'),
                                                values: TemplateValue({
                                                    comments: `${wfa.dataPill(releaseEntra.comments, 'string')}`,
                                                    work_notes: `${wfa.dataPill(releaseEntra.work_notes, 'string')}`,
                                                    state: `${wfa.dataPill(releaseEntra.ritm_state, 'string')}`,
                                                    stage: `${wfa.dataPill(releaseEntra.ritm_stage, 'string')}`,
                                                }),
                                            }
                                        )
                                        wfa.flowLogic.assignSubflowOutputs(
                                            { $id: Now.ID['sf-bb-out-returned-entra'] },
                                            params.outputs,
                                            {
                                                outcome: `${wfa.dataPill(releaseEntra.outcome, 'string')}`,
                                                status_message: `Entra removal confirmed; allocation release: ${wfa.dataPill(releaseEntra.status, 'string')}.`,
                                            }
                                        )
                                        wfa.flowLogic.endFlow({ $id: Now.ID['sf-bb-end-returned-entra'] })
                                    }
                                )

                                // Removido e, uma hora depois, ainda no grupo. A
                                // alocação NÃO é liberada: dizer que a licença está
                                // livre com a pessoa ainda dentro é o erro que esta
                                // conferência existe para evitar.
                                wfa.action(
                                    action.core.updateRecord,
                                    { $id: Now.ID['sf-bb-removal-unconfirmed-note'] },
                                    {
                                        table_name: 'sc_req_item',
                                        record: wfa.dataPill(params.inputs.request_item, 'reference'),
                                        values: TemplateValue({
                                            work_notes: `${wfa.dataPill(removalCheck.message, 'string')} The license was NOT returned to the pool. A removal task follows.`,
                                        }),
                                    }
                                )
                            }
                        )

                        wfa.flowLogic.else(
                            { $id: Now.ID['sf-bb-else-entra-remove-failed'], annotation: 'Removal failed' },
                            () => {
                                wfa.action(
                                    action.core.updateRecord,
                                    { $id: Now.ID['sf-bb-entra-remove-failed-note'] },
                                    {
                                        table_name: 'sc_req_item',
                                        record: wfa.dataPill(params.inputs.request_item, 'reference'),
                                        values: TemplateValue({
                                            work_notes: `Automatic removal failed: ${wfa.dataPill(entraRemove.message, 'string')} A removal task follows.`,
                                        }),
                                    }
                                )
                            }
                        )
                    }
                )

                wfa.flowLogic.elseIf(
                    {
                        $id: Now.ID['sf-bb-elseif-not-member'],
                        label: 'User is not in the group',
                        condition: `${wfa.dataPill(memberCheck.status, 'string')}=not_confirmed`,
                    },
                    () => {
                        wfa.action(
                            action.core.updateRecord,
                            { $id: Now.ID['sf-bb-not-member-note'] },
                            {
                                table_name: 'sc_req_item',
                                record: wfa.dataPill(params.inputs.request_item, 'reference'),
                                values: TemplateValue({
                                    work_notes: `${wfa.dataPill(memberCheck.message, 'string')} ServiceNow shows an allocation but Entra shows no membership, so the license may be granted by another group. A task follows to remove it manually.`,
                                }),
                            }
                        )
                        wfa.action(
                            action.core.createCatalogTask,
                            { $id: Now.ID['sf-bb-entra-manual-removal-task'] },
                            {
                                ah_requested_item: wfa.dataPill(params.inputs.request_item, 'reference'),
                                ah_short_description: 'Remove the user from the Entra group for this software',
                                ah_wait: true,
                                ah_fields: TemplateValue({
                                    assignment_group: wfa.dataPill(licenseGroup.Record.value, 'string'),
                                }),
                            }
                        )
                        // A Action resolve a alocacao por conta propria, ja do outro lado da
                        // espera da task, e apaga o registro.
                        const releaseManual = wfa.action(
                            releaseAllocation,
                            { $id: Now.ID['sf-bb-release-alloc-manual'], annotation: 'Return the license to the pool' },
                            {
                                software_model: wfa.dataPill(params.inputs.software_model, 'string'),
                                requested_for: wfa.dataPill(params.inputs.requested_for, 'string'),
                                context_note: 'Entra removal task closed.',
                            }
                        )

                        wfa.action(
                            action.core.updateRecord,
                            { $id: Now.ID['sf-bb-returned-closed-manual'] },
                            {
                                table_name: 'sc_req_item',
                                record: wfa.dataPill(params.inputs.request_item, 'reference'),
                                values: TemplateValue({
                                    comments: `${wfa.dataPill(releaseManual.comments, 'string')}`,
                                    work_notes: `${wfa.dataPill(releaseManual.work_notes, 'string')}`,
                                    state: `${wfa.dataPill(releaseManual.ritm_state, 'string')}`,
                                    stage: `${wfa.dataPill(releaseManual.ritm_stage, 'string')}`,
                                }),
                            }
                        )
                        wfa.flowLogic.assignSubflowOutputs(
                            { $id: Now.ID['sf-bb-out-returned-manual-entra'] },
                            params.outputs,
                            {
                                outcome: `${wfa.dataPill(releaseManual.outcome, 'string')}`,
                                status_message: `Manual Entra removal task closed; allocation release: ${wfa.dataPill(releaseManual.status, 'string')}.`,
                            }
                        )
                        wfa.flowLogic.endFlow({ $id: Now.ID['sf-bb-end-returned-manual-entra'] })
                    }
                )

                wfa.flowLogic.else(
                    { $id: Now.ID['sf-bb-else-no-entra-group'], annotation: 'No group to check' },
                    () => {
                        wfa.action(
                            action.core.updateRecord,
                            { $id: Now.ID['sf-bb-no-entra-group-note'] },
                            {
                                table_name: 'sc_req_item',
                                record: wfa.dataPill(params.inputs.request_item, 'reference'),
                                values: TemplateValue({
                                    work_notes: `Entra was not consulted: ${wfa.dataPill(memberCheck.message, 'string')} A removal task follows.`,
                                }),
                            }
                        )
                    }
                )

                wfa.action(
                    action.core.createCatalogTask,
                    { $id: Now.ID['sf-bb-removal-task'] },
                    {
                        ah_requested_item: wfa.dataPill(params.inputs.request_item, 'reference'),
                        ah_short_description: 'Remove software access or uninstall the product',
                        ah_wait: true,
                        ah_fields: TemplateValue({
                            assignment_group: wfa.dataPill(licenseGroup.Record.value, 'string'),
                        }),
                    }
                )

                // A Action resolve a alocacao por conta propria, ja do outro lado da espera
                // da task, e apaga o registro.
                const releaseTask = wfa.action(
                    releaseAllocation,
                    { $id: Now.ID['sf-bb-release-alloc-task'], annotation: 'Return the license to the pool' },
                    {
                        software_model: wfa.dataPill(params.inputs.software_model, 'string'),
                        requested_for: wfa.dataPill(params.inputs.requested_for, 'string'),
                        context_note: 'Removal task closed.',
                    }
                )

                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['sf-bb-worknote-returned'] },
                    {
                        table_name: 'sc_req_item',
                        record: wfa.dataPill(params.inputs.request_item, 'reference'),
                        values: TemplateValue({
                            comments: `${wfa.dataPill(releaseTask.comments, 'string')}`,
                            work_notes: `${wfa.dataPill(releaseTask.work_notes, 'string')}`,
                            state: `${wfa.dataPill(releaseTask.ritm_state, 'string')}`,
                            stage: `${wfa.dataPill(releaseTask.ritm_stage, 'string')}`,
                        }),
                    }
                )

                wfa.flowLogic.assignSubflowOutputs(
                    { $id: Now.ID['sf-bb-out-returned'] },
                    params.outputs,
                    {
                        outcome: `${wfa.dataPill(releaseTask.outcome, 'string')}`,
                        status_message: `Removal task closed; allocation release: ${wfa.dataPill(releaseTask.status, 'string')}.`,
                    }
                )
            }
        )

        wfa.flowLogic.else({ $id: Now.ID['sf-bb-else-request'], annotation: 'Request' }, () => {

            const entitlement = wfa.action(
                action.core.lookUpRecord,
                { $id: Now.ID['sf-bb-lookup-entitlement'], annotation: 'Check license availability' },
                {
                    table: 'alm_license',
                    conditions: `software_model=${wfa.dataPill(params.inputs.software_model, 'string')}^allocations_available>0`,
                    sort_column: 'allocations_available',
                    sort_type: 'sort_desc',
                    dont_fail_flow_on_error: true,
                }
            )

            wfa.flowLogic.if(
                {
                    $id: Now.ID['sf-bb-if-unavailable'],
                    label: 'No rights available',
                    condition: `${wfa.dataPill(entitlement.Record.sys_id, 'string')}ISEMPTY`,
                },
                () => {

                    wfa.action(
                        action.core.log,
                        { $id: Now.ID['sf-bb-log-unavailable'] },
                        {
                            log_level: 'warn',
                            log_message: `No available rights for software model ${wfa.dataPill(params.inputs.software_model, 'string')}`,
                        }
                    )

                    const purchaseApproval = wfa.action(
                        action.core.askForApproval,
                        { $id: Now.ID['sf-bb-purchase-approval'], annotation: 'Manager approval to raise a purchase' },
                        {
                            record: wfa.dataPill(params.inputs.request_item, 'reference'),
                            table: 'sc_req_item',
                            approval_reason:
                                'No license rights available. Manager approval required to raise a purchase request',
                            journal_field: 'comments',
                            approval_conditions: wfa.approvalRules({
                                ruleSets: [
                                    {
                                        action: 'ApprovesRejects',
                                        conditionType: 'AND',
                                        rules: [
                                            [
                                                {
                                                    ruleType: 'Any',
                                                    users: [
                                                        wfa.dataPill(params.inputs.requested_for.manager, 'reference'),
                                                    ],
                                                    groups: [],
                                                    manual: false,
                                                },
                                            ],
                                        ],
                                    },
                                ],
                            }),
                        }
                    )

                    wfa.flowLogic.if(
                        {
                            $id: Now.ID['sf-bb-if-purchase-rejected'],
                            label: 'Purchase rejected',
                            condition: `${wfa.dataPill(purchaseApproval.approval_state, 'choice')}=rejected`,
                        },
                        () => {
                            wfa.action(
                                action.core.updateRecord,
                                { $id: Now.ID['sf-bb-worknote-purchase-rejected'] },
                                {
                                    table_name: 'sc_req_item',
                                    record: wfa.dataPill(params.inputs.request_item, 'reference'),
                                    values: TemplateValue({
                                        comments:
                                            'No licenses are available for this software and your manager did not approve raising a purchase request. The reason is recorded in the approval history above.',
                                        work_notes:
                                            'Purchase not authorised by the requester manager. Closed without allocation.',
                                        state: STATE_CLOSED_INCOMPLETE,
                                        stage: STAGE_CLOSED_INCOMPLETE,
                                    }),
                                }
                            )
                            wfa.flowLogic.assignSubflowOutputs(
                                { $id: Now.ID['sf-bb-out-purchase-rejected'] },
                                params.outputs,
                                {
                                    outcome: 'rejected',
                                    available_rights: 0,
                                    status_message: 'Manager rejected raising a purchase request.',
                                }
                            )
                            wfa.flowLogic.endFlow({ $id: Now.ID['sf-bb-end-purchase-rejected'] })
                        }
                    )

                    wfa.action(
                        action.core.updateRecord,
                        { $id: Now.ID['sf-bb-worknote-unavailable'] },
                        {
                            table_name: 'sc_req_item',
                            record: wfa.dataPill(params.inputs.request_item, 'reference'),
                            values: TemplateValue({
                                work_notes:
                                    'No license rights are available for the requested software. The manager approved raising a purchase request with License Management.',
                            }),
                        }
                    )

                    wfa.action(
                        action.core.submitCatalogItemRequest,
                        { $id: Now.ID['sf-bb-raise-purchase-request'], annotation: 'Raise purchase demand' },
                        {
                            catalog_item: PURCHASE_REQUEST_ITEM,
                            sysparm_requested_for: wfa.dataPill(params.inputs.requested_for, 'reference'),
                            sysparm_quantity: 1,

                            // request_for vai junto de proposito. A Purchase Request
                            // nasce por aqui, sem ninguem preencher formulario, e a
                            // business rule global reescreve sc_req_item.requested_for
                            // a partir dessa variavel. Sem ela, o sysparm_requested_for
                            // acima seria sobrescrito por vazio.
                            catalog_item_inputs: `{"software_model":"${wfa.dataPill(params.inputs.software_model, 'string')}","originating_request_item":"${wfa.dataPill(params.inputs.request_item, 'string')}","request_for":"${wfa.dataPill(params.inputs.requested_for, 'string')}"}`,
                            wait_for_completion: false,
                            _snc_dont_fail_on_error: true,
                        }
                    )

                    // Fecha em 4 porque a licença não foi entregue por este pedido —
                    // quem entrega é a Purchase Request, que tem RITM próprio.
                    // Deixar aberto não é opção: a oferta de compra não tem flow,
                    // então nada voltaria aqui para fechar.
                    //
                    // Vem DEPOIS do submitCatalogItemRequest só por ordem de leitura;
                    // isso NÃO confere que a compra nasceu. O passo acima usa
                    // _snc_dont_fail_on_error: true, então ele pode falhar calado e
                    // este fechamento roda mesmo assim, dizendo ao solicitante que a
                    // compra foi aberta. Conferir de verdade exigiria localizar o
                    // RITM gerado, e o vínculo é a variável originating_request_item
                    // — valor de variável não é dot-walkable a partir de sc_req_item
                    // (armadilha 4), então seria mais um lookUpRecord em
                    // sc_item_option_mtom. Fica registrado como dívida.
                    wfa.action(
                        action.core.updateRecord,
                        { $id: Now.ID['sf-bb-close-purchase-required'] },
                        {
                            table_name: 'sc_req_item',
                            record: wfa.dataPill(params.inputs.request_item, 'reference'),
                            values: TemplateValue({
                                comments:
                                    'No licenses were available, so a software purchase request was raised on your behalf. This request is closed; you will be served through the purchase request.',
                                work_notes: 'Closed as incomplete: fulfillment moves to the software purchase request.',
                                state: STATE_CLOSED_INCOMPLETE,
                                stage: STAGE_CLOSED_INCOMPLETE,
                            }),
                        }
                    )

                    wfa.flowLogic.assignSubflowOutputs(
                        { $id: Now.ID['sf-bb-out-unavailable'] },
                        params.outputs,
                        {
                            outcome: 'purchase_required',
                            available_rights: 0,
                            status_message: 'No rights available. Manager approved and a purchase request was raised.',
                        }
                    )
                    wfa.flowLogic.endFlow({ $id: Now.ID['sf-bb-end-unavailable'] })
                }
            )

            wfa.flowLogic.if(
                {
                    $id: Now.ID['sf-bb-if-owner-set'],
                    label: 'Software owner defined',
                    condition: `${wfa.dataPill(model.Record.owner, 'string')}ISNOTEMPTY`,
                },
                () => {
                    const ownerApproval = wfa.action(
                        action.core.askForApproval,
                        { $id: Now.ID['sf-bb-owner-approval'] },
                        {
                            record: wfa.dataPill(params.inputs.request_item, 'reference'),
                            table: 'sc_req_item',
                            approval_reason: 'Software owner approval for a license request',
                            journal_field: 'comments',
                            approval_conditions: wfa.approvalRules({
                                ruleSets: [
                                    {
                                        action: 'ApprovesRejects',
                                        conditionType: 'AND',
                                        rules: [
                                            [
                                                {
                                                    ruleType: 'Any',
                                                    users: [wfa.dataPill(model.Record.owner, 'reference')],
                                                    groups: [],
                                                    manual: false,
                                                },
                                            ],
                                        ],
                                    },
                                ],
                            }),
                        }
                    )

                    wfa.flowLogic.if(
                        {
                            $id: Now.ID['sf-bb-if-owner-rejected'],
                            label: 'Owner rejected',
                            condition: `${wfa.dataPill(ownerApproval.approval_state, 'choice')}=rejected`,
                        },
                        () => {
                            wfa.action(
                                action.core.updateRecord,
                                { $id: Now.ID['sf-bb-reject-note-owner'] },
                                {
                                    table_name: 'sc_req_item',
                                    record: wfa.dataPill(params.inputs.request_item, 'reference'),
                                    values: TemplateValue({
                                        comments: 'Your software license request was not approved by the software owner. The reason is recorded in the approval history above.',
                                        work_notes: 'Rejected at the IT review step by the software owner.',
                                        state: STATE_CLOSED_INCOMPLETE,
                                        stage: STAGE_CLOSED_INCOMPLETE,
                                    }),
                                }
                            )
                            wfa.flowLogic.assignSubflowOutputs(
                                { $id: Now.ID['sf-bb-out-owner-rejected'] },
                                params.outputs,
                                {
                                    outcome: 'rejected',
                                    status_message: 'The software owner rejected the request.',
                                }
                            )
                            wfa.flowLogic.endFlow({ $id: Now.ID['sf-bb-end-owner-rejected'] })
                        }
                    )
                }
            )

            wfa.flowLogic.else({ $id: Now.ID['sf-bb-else-no-owner'], annotation: 'Fallback approval' }, () => {
                const fallbackApproval = wfa.action(
                    action.core.askForApproval,
                    { $id: Now.ID['sf-bb-fallback-approval'] },
                    {
                        record: wfa.dataPill(params.inputs.request_item, 'reference'),
                        table: 'sc_req_item',
                        approval_reason: 'License Management approval - no software owner is defined on the model',
                        journal_field: 'comments',
                        approval_conditions: wfa.approvalRules({
                            ruleSets: [
                                {
                                    action: 'ApprovesRejects',
                                    conditionType: 'AND',
                                    rules: [
                                        [
                                            {
                                                ruleType: 'Any',
                                                users: [],
                                                groups: [GROUP_LICENSE_MANAGEMENT],
                                                manual: false,
                                            },
                                        ],
                                    ],
                                },
                            ],
                        }),
                    }
                )

                wfa.flowLogic.if(
                    {
                        $id: Now.ID['sf-bb-if-fallback-rejected'],
                        label: 'Fallback rejected',
                        condition: `${wfa.dataPill(fallbackApproval.approval_state, 'choice')}=rejected`,
                    },
                    () => {
                        // Único ramo de rejeição que não avisava ninguém: não havia
                        // updateRecord aqui, então o solicitante não recebia nem
                        // comentário nem fechamento.
                        wfa.action(
                            action.core.updateRecord,
                            { $id: Now.ID['sf-bb-reject-note-fallback'] },
                            {
                                table_name: 'sc_req_item',
                                record: wfa.dataPill(params.inputs.request_item, 'reference'),
                                values: TemplateValue({
                                    comments:
                                        'Your software license request was not approved by License Management. The reason is recorded in the approval history above.',
                                    work_notes:
                                        'Rejected by License Management at the fallback review step (the software model has no owner).',
                                    state: STATE_CLOSED_INCOMPLETE,
                                    stage: STAGE_CLOSED_INCOMPLETE,
                                }),
                            }
                        )
                        wfa.flowLogic.assignSubflowOutputs(
                            { $id: Now.ID['sf-bb-out-fallback-rejected'] },
                            params.outputs,
                            {
                                outcome: 'rejected',
                                status_message: 'License Management rejected the request.',
                            }
                        )
                        wfa.flowLogic.endFlow({ $id: Now.ID['sf-bb-end-fallback-rejected'] })
                    }
                )
            })

            const managerApprovalToggle = wfa.action(
                action.core.lookUpRecord,
                { $id: Now.ID['sf-bb-lookup-manager-toggle'], annotation: 'Is manager approval enabled?' },
                {
                    table: 'sys_properties',
                    conditions: 'name=software_license_offerings.manager_approval_enabled',
                    dont_fail_flow_on_error: true,
                }
            )

            wfa.flowLogic.if(
                {
                    $id: Now.ID['sf-bb-if-manager-approval-on'],
                    label: 'Manager approval enabled',
                    condition: `${wfa.dataPill(managerApprovalToggle.Record.value, 'string')}=true`,
                },
                () => {
            const managerApproval = wfa.action(
                action.core.askForApproval,
                { $id: Now.ID['sf-bb-manager-approval'] },
                {
                    record: wfa.dataPill(params.inputs.request_item, 'reference'),
                    table: 'sc_req_item',
                    approval_reason: 'Manager approval for a software license request',
                    journal_field: 'comments',
                    approval_conditions: wfa.approvalRules({
                        ruleSets: [
                            {
                                action: 'ApprovesRejects',
                                conditionType: 'AND',
                                rules: [
                                    [
                                        {
                                            ruleType: 'Any',
                                            users: [wfa.dataPill(params.inputs.requested_for.manager, 'reference')],
                                            groups: [],
                                            manual: false,
                                        },
                                    ],
                                ],
                            },
                        ],
                    }),
                }
            )

            wfa.flowLogic.if(
                {
                    $id: Now.ID['sf-bb-if-manager-rejected'],
                    label: 'Manager rejected',
                    condition: `${wfa.dataPill(managerApproval.approval_state, 'choice')}=rejected`,
                },
                () => {

                    wfa.action(
                        action.core.updateRecord,
                        { $id: Now.ID['sf-bb-reject-note-manager'] },
                        {
                            table_name: 'sc_req_item',
                            record: wfa.dataPill(params.inputs.request_item, 'reference'),
                            values: TemplateValue({
                                comments:
                                    'Your software license request was not approved by your manager. The reason is recorded in the approval history above.',
                                work_notes: 'Rejected by the requester manager after IT review had approved.',
                                state: STATE_CLOSED_INCOMPLETE,
                                stage: STAGE_CLOSED_INCOMPLETE,
                            }),
                        }
                    )
                    wfa.flowLogic.assignSubflowOutputs(
                        { $id: Now.ID['sf-bb-out-manager-rejected'] },
                        params.outputs,
                        { outcome: 'rejected', status_message: 'The manager rejected the request.' }
                    )
                    wfa.flowLogic.endFlow({ $id: Now.ID['sf-bb-end-manager-rejected'] })
                }
            )
                }
            )

            const existingAllocation = wfa.action(
                action.core.lookUpRecord,
                { $id: Now.ID['sf-bb-lookup-existing-allocation'], annotation: 'Already allocated to this user?' },
                {
                    table: 'alm_entitlement',
                    conditions: `assigned_to=${wfa.dataPill(params.inputs.requested_for, 'string')}^licensed_by.software_model=${wfa.dataPill(params.inputs.software_model, 'string')}`,
                    dont_fail_flow_on_error: true,
                }
            )

            wfa.flowLogic.if(
                {
                    $id: Now.ID['sf-bb-if-already-allocated'],
                    label: 'Already allocated',
                    condition: `${wfa.dataPill(existingAllocation.Record.sys_id, 'string')}ISNOTEMPTY`,
                },
                () => {

                    wfa.action(
                        action.core.updateRecord,
                        { $id: Now.ID['sf-bb-already-allocated-note'] },
                        {
                            table_name: 'sc_req_item',
                            record: wfa.dataPill(params.inputs.request_item, 'reference'),
                            values: TemplateValue({
                                comments:
                                    'You already hold a license for this software, so no new license was assigned. If it is not working, raise an incident instead of a new request.',
                                work_notes:
                                    'Closed without allocating: an allocation for this user and software model already exists. No second allocation was created and the Entra group was not touched.',
                                state: STATE_CLOSED_COMPLETE,
                                stage: STAGE_COMPLETE,
                            }),
                        }
                    )
                    wfa.flowLogic.assignSubflowOutputs(
                        { $id: Now.ID['sf-bb-out-already-allocated'] },
                        params.outputs,
                        {
                            outcome: 'fulfilled',
                            entitlement: wfa.dataPill(entitlement.Record, 'reference'),
                            status_message: 'The requester already holds a license for this software.',
                        }
                    )
                    wfa.flowLogic.endFlow({ $id: Now.ID['sf-bb-end-already-allocated'] })
                }
            )

            const entraAdd = wfa.action(
                provisionEntraGroup,
                { $id: Now.ID['sf-bb-entra-add'], annotation: 'Add the user to the Entra group' },
                {
                    software_model: wfa.dataPill(params.inputs.software_model, 'string'),
                    requested_for: wfa.dataPill(params.inputs.requested_for, 'string'),
                    operation: 'add',
                }
            )

            wfa.flowLogic.if(
                {
                    $id: Now.ID['sf-bb-if-entra-added'],
                    label: 'Added to the Entra group',
                    condition: `${wfa.dataPill(entraAdd.status, 'string')}=added`,
                },
                () => {
                    wfa.action(
                        action.core.updateRecord,
                        { $id: Now.ID['sf-bb-entra-added-note'] },
                        {
                            table_name: 'sc_req_item',
                            record: wfa.dataPill(params.inputs.request_item, 'reference'),
                            values: TemplateValue({
                                work_notes: wfa.dataPill(entraAdd.message, 'string'),
                            }),
                        }
                    )

                    wfa.flowLogic.waitForADuration({
                        $id: Now.ID['sf-bb-entra-wait'],
                        durationType: 'relative_duration',
                        duration: { seconds: 0 },
                        relativeOperator: 'after',
                        relativeDatetime: `${wfa.dataPill(entraAdd.verify_after, 'string')}`,
                        annotation: 'Wait for the publisher sync',
                    })

                    const entraVerify = wfa.action(
                        provisionEntraGroup,
                        { $id: Now.ID['sf-bb-entra-verify'], annotation: 'Confirm the user is in the group' },
                        {
                            software_model: wfa.dataPill(params.inputs.software_model, 'string'),
                            requested_for: wfa.dataPill(params.inputs.requested_for, 'string'),
                            operation: 'verify',
                        }
                    )

                    wfa.flowLogic.if(
                        {
                            $id: Now.ID['sf-bb-if-entra-confirmed'],
                            label: 'Membership confirmed',
                            condition: `${wfa.dataPill(entraVerify.confirmed, 'boolean')}=true`,
                        },
                        () => {

                            wfa.action(
                                action.core.createRecord,
                                { $id: Now.ID['sf-bb-create-allocation-entra'] },
                                {
                                    table_name: 'alm_entitlement',
                                    values: TemplateValue({
                                        licensed_by: wfa.dataPill(entitlement.Record, 'reference'),
                                        assigned_to: wfa.dataPill(params.inputs.requested_for, 'reference'),
                                        quantity: 1,
                                    }),
                                }
                            )

                            wfa.action(
                                action.core.updateRecord,
                                { $id: Now.ID['sf-bb-entra-confirmed-note'] },
                                {
                                    table_name: 'sc_req_item',
                                    record: wfa.dataPill(params.inputs.request_item, 'reference'),
                                    values: TemplateValue({
                                        comments: wfa.dataPill(entraVerify.message, 'string'),
                                        work_notes:
                                            'Entra group membership confirmed and the license allocated. No manual assignment is needed for this request.',
                                        state: STATE_CLOSED_COMPLETE,
                                        stage: STAGE_COMPLETE,
                                    }),
                                }
                            )
                            wfa.flowLogic.assignSubflowOutputs(
                                { $id: Now.ID['sf-bb-out-fulfilled-entra'] },
                                params.outputs,
                                {
                                    outcome: 'fulfilled',
                                    entitlement: wfa.dataPill(entitlement.Record, 'reference'),
                                    status_message: 'License allocated and granted through the Entra group.',
                                }
                            )
                            wfa.flowLogic.endFlow({ $id: Now.ID['sf-bb-end-entra-confirmed'] })
                        }
                    )

                    wfa.action(
                        action.core.updateRecord,
                        { $id: Now.ID['sf-bb-entra-unconfirmed-note'] },
                        {
                            table_name: 'sc_req_item',
                            record: wfa.dataPill(params.inputs.request_item, 'reference'),
                            values: TemplateValue({
                                work_notes: wfa.dataPill(entraVerify.message, 'string'),
                            }),
                        }
                    )
                }
            )

            wfa.flowLogic.else(
                { $id: Now.ID['sf-bb-else-entra-not-added'], annotation: 'No automatic provisioning' },
                () => {
                    wfa.action(
                        action.core.updateRecord,
                        { $id: Now.ID['sf-bb-entra-not-added-note'] },
                        {
                            table_name: 'sc_req_item',
                            record: wfa.dataPill(params.inputs.request_item, 'reference'),
                            values: TemplateValue({
                                work_notes: `Automatic provisioning did not run: ${wfa.dataPill(entraAdd.message, 'string')} A fulfillment task follows for manual assignment.`,
                            }),
                        }
                    )
                }
            )

            wfa.flowLogic.if(
                {
                    $id: Now.ID['sf-bb-if-ad-group'],
                    label: 'Model has an AD group',
                    condition: `${wfa.dataPill(model.Record.u_ad_group, 'string')}ISNOTEMPTY`,
                },
                () => {
                    wfa.action(
                        action.core.createCatalogTask,
                        { $id: Now.ID['sf-bb-provisioning-task'] },
                        {
                            ah_requested_item: wfa.dataPill(params.inputs.request_item, 'reference'),
                            ah_short_description: 'Assign the license to the requester and confirm it is active',
                            ah_wait: true,
                            ah_fields: TemplateValue({
                                assignment_group: wfa.dataPill(model.Record.u_ad_group, 'reference'),
                            }),
                        }
                    )
                }
            )

            wfa.flowLogic.else({ $id: Now.ID['sf-bb-else-no-ad-group'], annotation: 'No AD group' }, () => {
                wfa.action(
                    action.core.createCatalogTask,
                    { $id: Now.ID['sf-bb-provisioning-task-fallback'] },
                    {
                        ah_requested_item: wfa.dataPill(params.inputs.request_item, 'reference'),
                        ah_short_description: 'Assign the license to the requester and confirm it is active',
                        ah_wait: true,
                        ah_fields: TemplateValue({ assignment_group: wfa.dataPill(licenseGroup.Record.value, 'string') }),
                    }
                )
            })

            wfa.action(
                action.core.createRecord,
                { $id: Now.ID['sf-bb-create-allocation-manual'] },
                {
                    table_name: 'alm_entitlement',
                    values: TemplateValue({
                        licensed_by: wfa.dataPill(entitlement.Record, 'reference'),
                        assigned_to: wfa.dataPill(params.inputs.requested_for, 'reference'),
                        quantity: 1,
                    }),
                }
            )

            wfa.action(
                action.core.updateRecord,
                { $id: Now.ID['sf-bb-manual-done-note'] },
                {
                    table_name: 'sc_req_item',
                    record: wfa.dataPill(params.inputs.request_item, 'reference'),
                    values: TemplateValue({
                        comments: 'Your software license has been assigned.',
                        work_notes:
                            'Fulfillment task closed and the license allocated. This request did not complete through the Entra group automation.',
                        state: STATE_CLOSED_COMPLETE,
                        stage: STAGE_COMPLETE,
                    }),
                }
            )

            wfa.flowLogic.assignSubflowOutputs(
                { $id: Now.ID['sf-bb-out-fulfilled-with-task'] },
                params.outputs,
                {
                    outcome: 'fulfilled',
                    entitlement: wfa.dataPill(entitlement.Record, 'reference'),
                    status_message: 'License allocated after the fulfillment task was completed.',
                }
            )

            wfa.action(
                action.core.log,
                { $id: Now.ID['sf-bb-log-allocated'] },
                {
                    log_level: 'info',

                    log_message: `License fulfillment finished for entitlement ${wfa.dataPill(entitlement.Record, 'string')}`,
                }
            )
        })
    }
)
