import { VariableSet, SelectBoxVariable, SingleLineTextVariable } from '@servicenow/sdk/core'

export const licensingInformationSet = VariableSet({
    $id: Now.ID['vs-licensing-information'],
    title: 'Licensing Information',
    description: 'Commercial model of the software, used by the License Management review.',
    type: 'singleRow',
    layout: '2across',
    displayTitle: true,
    order: 400,
    variables: {
        licensing_model: SelectBoxVariable({
            question: 'Licensing model',
            mandatory: true,
            order: 100,
            choices: {
                licensed: { label: 'Licensed (paid)', sequence: 1 },
                free: { label: 'Free of charge', sequence: 2 },
            },
            includeNone: true,
        }),
        license_type: SelectBoxVariable({
            question: 'License type',
            order: 200,
            choices: {
                perpetual: { label: 'Perpetual', sequence: 1 },
                subscription: { label: 'Subscription', sequence: 2 },
                named_user: { label: 'Named user', sequence: 3 },
                concurrent: { label: 'Concurrent', sequence: 4 },
                device: { label: 'Per device', sequence: 5 },
                consumption: { label: 'Consumption based', sequence: 6 },
            },
            includeNone: true,
        }),
        estimated_license_quantity: SingleLineTextVariable({
            question: 'Estimated license quantity',
            order: 300,
            exampleText: 'e.g. 25',
        }),
        estimated_cost: SingleLineTextVariable({
            question: 'Estimated cost',
            helpText: 'Annual or total cost, whichever applies to the licensing model.',
            order: 400,
        }),
    },
})
