import { Subflow, wfa, action } from '@servicenow/sdk/automation'
import { StringColumn } from '@servicenow/sdk/core'
import { provisionEntraGroup } from '../actions/provision-entra-group.now'

/**
 * Remocao no Entra depois que uma alocacao foi apagada.
 *
 * Existe como SUBFLOW e nao dentro da business rule porque regra de negocio nao
 * espera: a conferencia de uma hora precisa de timer, e timer so existe em flow.
 * A regra apenas dispara este subflow em background e devolve a transacao.
 *
 * As work notes vao para `alm_license` (Software Entitlement), nao para a
 * alocacao: a alocacao foi apagada e nao ha onde escrever. O entitlement e o
 * registro que sobrevive e o lugar onde a Gestao de Licencas vai procurar.
 */
export const entraRemovalAfterDelete = Subflow(
    {
        $id: Now.ID['subflow-entra-removal-after-delete'],
        name: 'Entra Removal After Allocation Delete',
        description:
            'Removes a user from the Entra group after their allocation was deleted, and records both the attempt and the confirmation on the software entitlement.',
        runAs: 'system',
        category: 'Software Asset Management',
        access: 'public',

        inputs: {
            software_model: StringColumn({ label: 'Software model sys_id', mandatory: true, maxLength: 32 }),
            requested_for: StringColumn({ label: 'User sys_id', mandatory: true, maxLength: 32 }),
            entitlement: StringColumn({ label: 'Software entitlement sys_id', mandatory: true, maxLength: 32 }),
            deleted_by: StringColumn({ label: 'Deleted by', maxLength: 100 }),
        },

        outputs: {
            status: StringColumn({ label: 'Status', maxLength: 40 }),
        },
    },
    params => {
        // Aviso PRIMEIRO, resultado depois. Quem olhar o entitlement no minuto
        // seguinte precisa ver que algo esta em curso, mesmo que a chamada ao
        // Entra ainda nao tenha respondido.
        wfa.action(
            action.core.updateRecord,
            { $id: Now.ID['erad-heads-up-note'] },
            {
                table_name: 'alm_license',
                record: wfa.dataPill(params.inputs.entitlement, 'reference'),
                values: TemplateValue({
                    work_notes: `An allocation was deleted by ${wfa.dataPill(params.inputs.deleted_by, 'string')}. If this software is mapped to an Entra group and the user is a member, they will be removed from it.`,
                }),
            }
        )

        const removal = wfa.action(
            provisionEntraGroup,
            { $id: Now.ID['erad-remove'], annotation: 'Remove the user from the Entra group' },
            {
                software_model: wfa.dataPill(params.inputs.software_model, 'string'),
                requested_for: wfa.dataPill(params.inputs.requested_for, 'string'),
                operation: 'remove',
            }
        )

        wfa.action(
            action.core.updateRecord,
            { $id: Now.ID['erad-result-note'] },
            {
                table_name: 'alm_license',
                record: wfa.dataPill(params.inputs.entitlement, 'reference'),
                values: TemplateValue({
                    work_notes: wfa.dataPill(removal.message, 'string'),
                }),
            }
        )

        wfa.flowLogic.if(
            {
                $id: Now.ID['erad-if-removed'],
                label: 'Removed',
                condition: `${wfa.dataPill(removal.status, 'string')}=removed`,
            },
            () => {
                // Espera ate o instante que o passo de script calculou a partir da
                // property de minutos, pelo mesmo motivo da oferta: duracao
                // literal em Fluent nao aceita data pill.
                wfa.flowLogic.waitForADuration({
                    $id: Now.ID['erad-wait'],
                    durationType: 'relative_duration',
                    duration: { seconds: 0 },
                    relativeOperator: 'after',
                    relativeDatetime: `${wfa.dataPill(removal.verify_after, 'string')}`,
                    annotation: 'Wait before confirming the removal',
                })

                const check = wfa.action(
                    provisionEntraGroup,
                    { $id: Now.ID['erad-verify'], annotation: 'Confirm the user is out' },
                    {
                        software_model: wfa.dataPill(params.inputs.software_model, 'string'),
                        requested_for: wfa.dataPill(params.inputs.requested_for, 'string'),
                        operation: 'verify_removal',
                    }
                )

                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['erad-confirmation-note'] },
                    {
                        table_name: 'alm_license',
                        record: wfa.dataPill(params.inputs.entitlement, 'reference'),
                        values: TemplateValue({
                            work_notes: wfa.dataPill(check.message, 'string'),
                        }),
                    }
                )

                wfa.flowLogic.assignSubflowOutputs(
                    { $id: Now.ID['erad-out-verified'] },
                    params.outputs,
                    { status: 'verified' }
                )
                wfa.flowLogic.endFlow({ $id: Now.ID['erad-end-verified'] })
            }
        )

        wfa.flowLogic.assignSubflowOutputs(
            { $id: Now.ID['erad-out-not-removed'] },
            params.outputs,
            { status: 'not_removed' }
        )
    }
)
