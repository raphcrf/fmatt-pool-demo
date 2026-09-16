import { Flow, wfa, action, trigger } from '@servicenow/sdk/automation'
import { licenseRequest } from '../catalog/catalog-items/license-request.now'
import { licenseFulfillmentBackbone } from './license-fulfillment-backbone.now'

export const licenseRequestFlow = Flow(
    {
        $id: Now.ID['flow-license-request'],
        name: 'Software License Request - Fulfillment',
        description: 'Fulfills a software license request through the shared license fulfillment backbone.',
        runAs: 'system',
    },
    wfa.trigger(
        trigger.application.serviceCatalog,
        { $id: Now.ID['trg-license-request'] },
        { run_flow_in: 'background' }
    ),
    params => {
        wfa.action(
            action.core.getCatalogVariables,
            { $id: Now.ID['flr-get-variables'] },
            {
                requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                template_catalog_item: `${licenseRequest}`,
                catalog_variables: [
                    licenseRequest.variables.request_for,
                    licenseRequest.variables.software_model,
                    licenseRequest.variables.request_justification,
                    licenseRequest.variables.usage_duration,
                    licenseRequest.variables.cost_center,
                    licenseRequest.variables.different_cost_center,
                    licenseRequest.variables.alternate_cost_center,
                    licenseRequest.variables.required_by_date,
                    licenseRequest.variables.usage_end_date,
                    licenseRequest.variables.additional_notes,
                    licenseRequest.variables.acknowledge_purchase,
                ],
            }
        )

        const softwareModelValue = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['flr-read-software-model'], annotation: 'Read the software model variable value' },
            {
                table: 'sc_item_option_mtom',
                conditions: `request_item=${wfa.dataPill(params.trigger.request_item, 'string')}^sc_item_option.item_option_new.name=software_model`,
            }
        )

        const fulfillment = wfa.subflow(
            licenseFulfillmentBackbone,
            { $id: Now.ID['flr-run-backbone'], annotation: 'Validate, approve, allocate' },
            {
                request_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                software_model: wfa.dataPill(softwareModelValue.Record.sc_item_option.value, 'reference'),
                operation: 'request',
                requested_for: wfa.dataPill(params.trigger.request_item.requested_for, 'reference'),
                waitForCompletion: true,
            }
        )

        wfa.action(
            action.core.log,
            { $id: Now.ID['flr-log-outcome'] },
            {
                log_level: 'info',
                log_message: `License request outcome: ${wfa.dataPill(fulfillment.outcome, 'string')}`,
            }
        )
    }
)
