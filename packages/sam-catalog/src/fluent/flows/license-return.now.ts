import { Flow, wfa, action, trigger } from '@servicenow/sdk/automation'
import { licenseReturn } from '../catalog/catalog-items/license-return.now'
import { licenseFulfillmentBackbone } from './license-fulfillment-backbone.now'

export const licenseReturnFlow = Flow(
    {
        $id: Now.ID['flow-license-return'],
        name: 'Software License Return - Fulfillment',
        description: 'Returns an allocated software license through the shared license fulfillment backbone.',
        runAs: 'system',
    },
    wfa.trigger(
        trigger.application.serviceCatalog,
        { $id: Now.ID['trg-license-return'] },
        { run_flow_in: 'background' }
    ),
    params => {
        wfa.action(
            action.core.getCatalogVariables,
            { $id: Now.ID['flt-get-variables'] },
            {
                requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                template_catalog_item: `${licenseReturn}`,
                catalog_variables: [
                    licenseReturn.variables.software_model,
                    licenseReturn.variables.return_reason,
                    licenseReturn.variables.other_reason_details,
                    licenseReturn.variables.return_justification,
                    licenseReturn.variables.desired_removal_date,
                    licenseReturn.variables.additional_notes,
                ],
            }
        )

        const softwareModelValue = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['flt-read-software-model'], annotation: 'Read the software model variable value' },
            {
                table: 'sc_item_option_mtom',
                conditions: `request_item=${wfa.dataPill(params.trigger.request_item, 'string')}^sc_item_option.item_option_new.name=software_model`,
            }
        )

        const fulfillment = wfa.subflow(
            licenseFulfillmentBackbone,
            { $id: Now.ID['flt-run-backbone'], annotation: 'Validate, approve, unassign' },
            {
                request_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                software_model: wfa.dataPill(softwareModelValue.Record.sc_item_option.value, 'reference'),
                operation: 'return',
                requested_for: wfa.dataPill(params.trigger.request_item.requested_for, 'reference'),
                waitForCompletion: true,
            }
        )

        wfa.action(
            action.core.log,
            { $id: Now.ID['flt-log-outcome'] },
            {
                log_level: 'info',
                log_message: `License return outcome: ${wfa.dataPill(fulfillment.outcome, 'string')}`,
            }
        )
    }
)
