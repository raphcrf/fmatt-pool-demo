import { Action, wfa, actionStep } from '@servicenow/sdk/automation'
import { StringColumn } from '@servicenow/sdk/core'

/**
 * Libera a alocacao de licenca de um usuario, apagando o registro de
 * `alm_entitlement`.
 *
 * Existe como Action, e nao como `action.core.deleteRecord` atras de um
 * `lookUpRecord`, por tres motivos que o passo OOB nao cobre:
 *
 *  1. O ALVO precisa de filtro de licenca ativa. A consulta por (usuario, modelo)
 *     sozinha casa alocacao presa a licenca aposentada -- ver o comentario do
 *     `release-allocation-step.js`.
 *  2. AMBIGUIDADE nao pode virar palpite. Com mais de uma alocacao ativa o passo
 *     se recusa a apagar, em vez de escolher a primeira.
 *  3. `deleteRecord()` devolve false SEM lancar excecao quando uma BR
 *     `before delete` aborta. `action.core.deleteRecord` nao expoe
 *     `dont_fail_flow_on_error` nem status: um delete recusado viraria contexto
 *     em ERROR e RITM preso -- exatamente o defeito que este conserto elimina.
 *
 * Devolve tambem o texto e o estado com que o RITM deve ser fechado, para que o
 * flow nunca feche dizendo "devolvida ao pool" quando nao devolveu.
 */
export const releaseAllocation = Action(
    {
        $id: Now.ID['action-release-allocation'],
        name: 'Release License Allocation',
        description:
            'Deletes the software entitlement allocation of a user for a given software model, returning the right to the available pool.',
        access: 'public',
        category: 'Software Asset Management',

        inputs: {
            software_model: StringColumn({
                label: 'Software model sys_id',
                mandatory: true,
                maxLength: 32,
            }),
            requested_for: StringColumn({
                label: 'Requested for sys_id',
                mandatory: true,
                maxLength: 32,
            }),

            // Prefixo da work note, para o registro dizer por qual caminho a
            // devolucao chegou aqui (remocao no Entra confirmada, tarefa manual
            // encerrada, tarefa operacional encerrada).
            context_note: StringColumn({
                label: 'Context note',
                maxLength: 255,
            }),
        },

        outputs: {
            status: StringColumn({ label: 'Status', maxLength: 40 }),
            allocation: StringColumn({ label: 'Deleted allocation sys_id', maxLength: 32 }),
            license: StringColumn({ label: 'License sys_id', maxLength: 32 }),

            comments: StringColumn({ label: 'Client comments', maxLength: 1000 }),
            work_notes: StringColumn({ label: 'Work notes', maxLength: 1000 }),

            // Estado com que o RITM deve fechar. Vem do passo, e nao do flow,
            // porque so o passo sabe se a licenca voltou mesmo ao pool.
            ritm_state: StringColumn({ label: 'Request item state', maxLength: 2 }),
            ritm_stage: StringColumn({ label: 'Request item stage', maxLength: 40 }),
            outcome: StringColumn({ label: 'Subflow outcome', maxLength: 40 }),
        },
    },
    params => {
        const run = wfa.actionStep(
            actionStep.script,
            { $id: Now.ID['arla-run-release'], label: 'Resolve and delete the allocation' },
            {
                required_run_time: 'instance',
                script: Now.include('../../scripts/server/release-allocation-step.js'),
                inputVariables: {
                    software_model: {
                        label: 'Software model',
                        value: wfa.dataPill(params.inputs.software_model, 'string'),
                    },
                    requested_for: {
                        label: 'Requested for',
                        value: wfa.dataPill(params.inputs.requested_for, 'string'),
                    },
                    context_note: {
                        label: 'Context note',
                        value: wfa.dataPill(params.inputs.context_note, 'string'),
                    },
                },
                outputVariables: {
                    status: StringColumn({ label: 'Status', maxLength: 40 }),
                    allocation: StringColumn({ label: 'Deleted allocation sys_id', maxLength: 32 }),
                    license: StringColumn({ label: 'License sys_id', maxLength: 32 }),
                    comments: StringColumn({ label: 'Client comments', maxLength: 1000 }),
                    work_notes: StringColumn({ label: 'Work notes', maxLength: 1000 }),
                    ritm_state: StringColumn({ label: 'Request item state', maxLength: 2 }),
                    ritm_stage: StringColumn({ label: 'Request item stage', maxLength: 40 }),
                    outcome: StringColumn({ label: 'Subflow outcome', maxLength: 40 }),
                },
            }
        )

        wfa.assignActionOutputs(params.outputs, {
            status: wfa.dataPill(run.status, 'string'),
            allocation: wfa.dataPill(run.allocation, 'string'),
            license: wfa.dataPill(run.license, 'string'),
            comments: wfa.dataPill(run.comments, 'string'),
            work_notes: wfa.dataPill(run.work_notes, 'string'),
            ritm_state: wfa.dataPill(run.ritm_state, 'string'),
            ritm_stage: wfa.dataPill(run.ritm_stage, 'string'),
            outcome: wfa.dataPill(run.outcome, 'string'),
        })
    }
)
