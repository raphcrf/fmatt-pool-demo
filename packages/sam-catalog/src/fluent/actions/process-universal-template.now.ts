import { Action, wfa, actionStep } from '@servicenow/sdk/automation'
import { StringColumn, IntegerColumn, BooleanColumn } from '@servicenow/sdk/core'

export const processUniversalTemplate = Action(
    {
        $id: Now.ID['action-process-universal-template'],
        name: 'Process Software Usage Report',
        description:
            'Loads the software usage file attached to a request item, using the given import profile, and transforms it into software subscriptions.',
        access: 'public',
        category: 'Software Asset Management',

        inputs: {

            request_item: StringColumn({
                label: 'Request item sys_id',
                mandatory: true,
                maxLength: 32,
            }),

            profile: StringColumn({
                label: 'Import profile',
                mandatory: true,
                maxLength: 40,
            }),
        },

        outputs: {
            ok: BooleanColumn({ label: 'Import succeeded' }),
            message: StringColumn({ label: 'Message', maxLength: 255 }),
            file_name: StringColumn({ label: 'File name', maxLength: 255 }),
            rows_read: IntegerColumn({ label: 'Rows read' }),
            rows_imported: IntegerColumn({ label: 'Rows imported' }),
            rows_rejected: IntegerColumn({ label: 'Rows rejected' }),
        },
    },
    params => {
        const run = wfa.actionStep(
            actionStep.script,
            { $id: Now.ID['aput-run-import'], label: 'Load and transform the template' },
            {
                required_run_time: 'instance',
                script: Now.include('../../scripts/server/process-universal-template-step.js'),
                inputVariables: {
                    request_item: {
                        label: 'Request item',
                        value: wfa.dataPill(params.inputs.request_item, 'string'),
                    },
                    profile: {
                        label: 'Import profile',
                        value: wfa.dataPill(params.inputs.profile, 'string'),
                    },
                },
                outputVariables: {
                    ok: BooleanColumn({ label: 'Import succeeded' }),
                    message: StringColumn({ label: 'Message', maxLength: 255 }),
                    file_name: StringColumn({ label: 'File name', maxLength: 255 }),
                    rows_read: IntegerColumn({ label: 'Rows read' }),
                    rows_imported: IntegerColumn({ label: 'Rows imported' }),
                    rows_rejected: IntegerColumn({ label: 'Rows rejected' }),
                },
            }
        )

        wfa.assignActionOutputs(params.outputs, {
            ok: wfa.dataPill(run.ok, 'boolean'),
            message: wfa.dataPill(run.message, 'string'),
            file_name: wfa.dataPill(run.file_name, 'string'),
            rows_read: wfa.dataPill(run.rows_read, 'integer'),
            rows_imported: wfa.dataPill(run.rows_imported, 'integer'),
            rows_rejected: wfa.dataPill(run.rows_rejected, 'integer'),
        })
    }
)
