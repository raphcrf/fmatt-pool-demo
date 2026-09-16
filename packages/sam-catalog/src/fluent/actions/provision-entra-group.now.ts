import { Action, wfa, actionStep } from '@servicenow/sdk/automation'
import { StringColumn, BooleanColumn } from '@servicenow/sdk/core'

export const provisionEntraGroup = Action(
    {
        $id: Now.ID['action-provision-entra-group'],
        name: 'Provision Entra Group Membership',
        description:
            'Adds the requested user to the Microsoft Entra security group mapped to a software model, or confirms an existing membership.',
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

            operation: StringColumn({
                label: 'Operation',
                mandatory: true,
                maxLength: 20,
            }),
        },

        outputs: {

            status: StringColumn({ label: 'Status', maxLength: 40 }),
            confirmed: BooleanColumn({ label: 'Membership confirmed' }),
            group_id: StringColumn({ label: 'Entra group ID', maxLength: 36 }),
            group_name: StringColumn({ label: 'Entra group name', maxLength: 255 }),
            message: StringColumn({ label: 'Message', maxLength: 255 }),
            // Instante em que a conferência deve rodar, já somado a partir da
            // property de minutos. O flow usa isto como `relativeDatetime` do
            // timer, porque duração literal não aceita data pill.
            verify_after: StringColumn({ label: 'Verify after', maxLength: 40 }),
        },
    },
    params => {
        const run = wfa.actionStep(
            actionStep.script,
            { $id: Now.ID['apeg-run-provision'], label: 'Call the Entra spoke' },
            {
                required_run_time: 'instance',
                script: Now.include('../../scripts/server/provision-entra-group-step.js'),
                inputVariables: {
                    software_model: {
                        label: 'Software model',
                        value: wfa.dataPill(params.inputs.software_model, 'string'),
                    },
                    requested_for: {
                        label: 'Requested for',
                        value: wfa.dataPill(params.inputs.requested_for, 'string'),
                    },
                    operation: {
                        label: 'Operation',
                        value: wfa.dataPill(params.inputs.operation, 'string'),
                    },
                },
                outputVariables: {
                    status: StringColumn({ label: 'Status', maxLength: 40 }),
                    confirmed: BooleanColumn({ label: 'Membership confirmed' }),
                    group_id: StringColumn({ label: 'Entra group ID', maxLength: 36 }),
                    group_name: StringColumn({ label: 'Entra group name', maxLength: 255 }),
                    message: StringColumn({ label: 'Message', maxLength: 255 }),
                    verify_after: StringColumn({ label: 'Verify after', maxLength: 40 }),
                },
            }
        )

        wfa.assignActionOutputs(params.outputs, {
            status: wfa.dataPill(run.status, 'string'),
            confirmed: wfa.dataPill(run.confirmed, 'boolean'),
            group_id: wfa.dataPill(run.group_id, 'string'),
            group_name: wfa.dataPill(run.group_name, 'string'),
            message: wfa.dataPill(run.message, 'string'),
            verify_after: wfa.dataPill(run.verify_after, 'string'),
        })
    }
)
