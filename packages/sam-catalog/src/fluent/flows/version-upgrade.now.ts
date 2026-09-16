import { Flow, wfa, action, trigger } from '@servicenow/sdk/automation'
import { GROUP_LICENSE_MANAGEMENT } from '../shared/instance-refs'
import { versionUpgrade } from '../catalog/catalog-items/version-upgrade.now'

// Por que este flow NÃO chama o license-fulfillment-backbone.
//
// Chamava, passando operation: 'upgrade'. Só que o backbone lê `operation` num
// único ponto — a condição `=return` —, então 'upgrade' percorria exatamente o
// caminho de 'request'. E o software_model que ia junto era o
// current_software_model: o modelo que o usuário JÁ tem. O guard de alocação
// duplicada encontrava a alocação existente e fechava o RITM como atendido, com
// o comentário "you already hold a license for this software". Nenhuma tarefa,
// nada no Entra, ninguém avisado.
//
// Não dá para consertar mandando o backbone alocar o destino: a oferta captura
// `target_version` e `target_edition` como TEXTO LIVRE e não tem referência a um
// modelo de destino. Nenhum flow consegue descobrir qual alm_license alocar,
// porque o dado não existe. Enquanto a oferta não capturar o modelo de destino,
// upgrade é trabalho humano — e o que a automação pode fazer é o que está aqui:
// conferir que há o que atualizar, aprovar, abrir a tarefa e fechar o RITM.
const STATE_CLOSED_COMPLETE = '3'
const STATE_CLOSED_INCOMPLETE = '4'
const STAGE_COMPLETE = 'complete'

// sc_req_item.stage tem a escolha 'closed_incomplete' no dicionário, ao lado de
// 'complete'. Fechar em state=4 com stage='complete' contava duas histórias
// diferentes no mesmo registro.
const STAGE_CLOSED_INCOMPLETE = 'closed_incomplete'

// sc_task fechada com sucesso. ah_wait retoma o flow em QUALQUER fechamento,
// inclusive Closed Incomplete e Closed Skipped, então o desfecho tem de ser lido
// antes de dizer ao solicitante que o upgrade foi feito.
const TASK_STATE_CLOSED_COMPLETE = '3'

export const versionUpgradeFlow = Flow(
    {
        $id: Now.ID['flow-version-upgrade'],
        name: 'Software Version Upgrade - Fulfillment',
        description:
            'Confirms the user holds the current software, asks License Management to approve, and opens the upgrade task.',
        runAs: 'system',
    },
    wfa.trigger(
        trigger.application.serviceCatalog,
        { $id: Now.ID['trg-version-upgrade'] },
        { run_flow_in: 'background' }
    ),
    params => {
        const licenseGroup = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['fvu-lookup-license-group'], annotation: 'License Management group' },
            {
                table: 'sys_properties',
                conditions: 'name=software_license_offerings.group_license_management',
                dont_fail_flow_on_error: true,
            }
        )

        wfa.action(
            action.core.getCatalogVariables,
            { $id: Now.ID['fvu-get-variables'] },
            {
                requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                template_catalog_item: `${versionUpgrade}`,
                catalog_variables: [
                    versionUpgrade.variables.current_software_model,
                    versionUpgrade.variables.current_version,
                    versionUpgrade.variables.current_edition,
                    versionUpgrade.variables.upgrade_type,
                    versionUpgrade.variables.target_version,
                    versionUpgrade.variables.target_edition,
                    versionUpgrade.variables.upgrade_justification,
                    versionUpgrade.variables.expected_impact,
                ],
            }
        )

        const currentModelValue = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['fvu-read-current-model'], annotation: 'Read the current software model' },
            {
                table: 'sc_item_option_mtom',
                conditions: `request_item=${wfa.dataPill(params.trigger.request_item, 'string')}^sc_item_option.item_option_new.name=current_software_model`,
                dont_fail_flow_on_error: true,
            }
        )

        // Não conseguir LER a variável é diferente de o usuário não ter o
        // software, e os dois casos precisam de saídas diferentes. Sem esta
        // guarda, com dont_fail_flow_on_error ligado o valor sai vazio, a query
        // de alocação vira `licensed_by.software_model=` e não casa nada — e o
        // RITM fecharia dizendo ao solicitante que ele não tem a licença, que é
        // mentira e ainda o deixa sem recurso, porque o pedido está fechado.
        wfa.flowLogic.if(
            {
                $id: Now.ID['fvu-if-no-model'],
                label: 'Current software not readable',
                condition: `${wfa.dataPill(currentModelValue.Record.sc_item_option.value, 'string')}ISEMPTY`,
            },
            () => {
                wfa.action(
                    action.core.createCatalogTask,
                    { $id: Now.ID['fvu-no-model-task'] },
                    {
                        ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                        ah_short_description:
                            'Could not read the current software on this upgrade request. Check the request item variables',
                        ah_wait: false,
                        ah_fields: TemplateValue({
                            assignment_group: wfa.dataPill(licenseGroup.Record.value, 'string'),
                        }),
                    }
                )
                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['fvu-close-no-model'] },
                    {
                        table_name: 'sc_req_item',
                        record: wfa.dataPill(params.trigger.request_item, 'reference'),
                        values: TemplateValue({
                            comments:
                                'We could not read which software you asked to upgrade. License Management has been asked to look at this request.',
                            work_notes:
                                'The current_software_model variable could not be read from this request item. Routed to License Management.',
                            state: STATE_CLOSED_INCOMPLETE,
                            stage: STAGE_CLOSED_INCOMPLETE,
                        }),
                    }
                )
                wfa.flowLogic.endFlow({ $id: Now.ID['fvu-end-no-model'] })
            }
        )

        // Não há o que atualizar se o solicitante não tem o software alocado.
        // Barrar aqui evita gastar uma aprovação e uma tarefa com um pedido que
        // deveria ter entrado pela oferta de requisição.
        const currentAllocation = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['fvu-lookup-allocation'], annotation: 'Does the user hold this software?' },
            {
                table: 'alm_entitlement',
                conditions: `assigned_to=${wfa.dataPill(params.trigger.request_item.requested_for, 'string')}^licensed_by.software_model=${wfa.dataPill(currentModelValue.Record.sc_item_option.value, 'string')}`,
                dont_fail_flow_on_error: true,
            }
        )

        wfa.flowLogic.if(
            {
                $id: Now.ID['fvu-if-no-allocation'],
                label: 'Nothing to upgrade',
                condition: `${wfa.dataPill(currentAllocation.Record.sys_id, 'string')}ISEMPTY`,
            },
            () => {
                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['fvu-close-no-allocation'] },
                    {
                        table_name: 'sc_req_item',
                        record: wfa.dataPill(params.trigger.request_item, 'reference'),
                        values: TemplateValue({
                            comments:
                                'We found no active license allocation for you on the software you asked to upgrade. Request the software first through the Software License Request offering.',
                            work_notes:
                                'No active allocation found for this user and the current software model. Nothing to upgrade.',
                            state: STATE_CLOSED_INCOMPLETE,
                            stage: STAGE_CLOSED_INCOMPLETE,
                        }),
                    }
                )
                wfa.flowLogic.endFlow({ $id: Now.ID['fvu-end-no-allocation'] })
            }
        )

        const upgradeApproval = wfa.action(
            action.core.askForApproval,
            { $id: Now.ID['fvu-approval'] },
            {
                record: wfa.dataPill(params.trigger.request_item, 'reference'),
                table: 'sc_req_item',
                approval_reason: 'License Management validation for a software version or edition upgrade',
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

        // A condição é `NÃO aprovado`, não `= rejected`. approval_state também
        // assume 'cancelled', e testar só a rejeição deixava o cancelamento
        // escorrer para a criação da tarefa e para o fechamento em 3 — um upgrade
        // cancelado sairia como concluído.
        wfa.flowLogic.if(
            {
                $id: Now.ID['fvu-if-not-approved'],
                label: 'Not approved',
                condition: `${wfa.dataPill(upgradeApproval.approval_state, 'choice')}!=approved`,
            },
            () => {
                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['fvu-close-rejected'] },
                    {
                        table_name: 'sc_req_item',
                        record: wfa.dataPill(params.trigger.request_item, 'reference'),
                        values: TemplateValue({
                            comments:
                                'Your software version or edition upgrade was not approved by License Management. The reason is recorded in the approval history above.',
                            work_notes: `Upgrade not approved. Approval state: ${wfa.dataPill(upgradeApproval.approval_state, 'choice')}.`,
                            state: STATE_CLOSED_INCOMPLETE,
                            stage: STAGE_CLOSED_INCOMPLETE,
                        }),
                    }
                )
                wfa.flowLogic.endFlow({ $id: Now.ID['fvu-end-rejected'] })
            }
        )

        // A tarefa é o ponto de entrega. O responsável lê o destino nas variáveis
        // do próprio RITM: valor de variável de catálogo não é dot-walkable a
        // partir de sc_req_item, então não dá para trazer target_version e
        // target_edition para a descrição sem um lookUpRecord por variável.
        wfa.action(
            action.core.createCatalogTask,
            { $id: Now.ID['fvu-upgrade-task'] },
            {
                ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                ah_short_description:
                    'Upgrade the software version or edition for this user, as requested on the request item',
                ah_wait: true,
                ah_fields: TemplateValue({
                    assignment_group: wfa.dataPill(licenseGroup.Record.value, 'string'),
                }),
            }
        )

        // ah_wait retoma o flow em QUALQUER fechamento da task, inclusive Closed
        // Incomplete e Closed Skipped. Como este flow não cria nem altera
        // alm_entitlement, a task é o único artefato de entrega que existe —
        // fechar em 3 sem ler o desfecho dela diria ao solicitante que o upgrade
        // foi feito quando o responsável pode tê-la cancelado.
        //
        // O desfecho é lido por lookUpRecord e não pela saída do createCatalogTask
        // porque a action devolve task['Catalog Task'], e o compilador recusa a
        // forma com colchete (TS212). Só existe uma task neste caminho: os dois
        // ramos anteriores encerram o flow antes de chegar aqui.
        const upgradeTask = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['fvu-read-task-outcome'], annotation: 'Was the upgrade task completed?' },
            {
                table: 'sc_task',
                conditions: `request_item=${wfa.dataPill(params.trigger.request_item, 'string')}^state=${TASK_STATE_CLOSED_COMPLETE}`,
                dont_fail_flow_on_error: true,
            }
        )

        wfa.flowLogic.if(
            {
                $id: Now.ID['fvu-if-task-completed'],
                label: 'Upgrade task completed',
                condition: `${wfa.dataPill(upgradeTask.Record.sys_id, 'string')}ISNOTEMPTY`,
            },
            () => {
                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['fvu-close-done'] },
                    {
                        table_name: 'sc_req_item',
                        record: wfa.dataPill(params.trigger.request_item, 'reference'),
                        values: TemplateValue({
                            comments: 'Your software version or edition upgrade has been completed.',
                            work_notes: 'Upgrade task completed by License Management.',
                            state: STATE_CLOSED_COMPLETE,
                            stage: STAGE_COMPLETE,
                        }),
                    }
                )
            }
        )

        wfa.flowLogic.else({ $id: Now.ID['fvu-else-task-not-completed'], annotation: 'Task not completed' }, () => {
            wfa.action(
                action.core.updateRecord,
                { $id: Now.ID['fvu-close-task-not-completed'] },
                {
                    table_name: 'sc_req_item',
                    record: wfa.dataPill(params.trigger.request_item, 'reference'),
                    values: TemplateValue({
                        comments:
                            'Your software version or edition upgrade was closed without being delivered. Raise a new request if you still need it.',
                        work_notes:
                            'The upgrade task was closed without completing. The request item was closed as incomplete.',
                        state: STATE_CLOSED_INCOMPLETE,
                        stage: STAGE_CLOSED_INCOMPLETE,
                    }),
                }
            )
        })
    }
)
