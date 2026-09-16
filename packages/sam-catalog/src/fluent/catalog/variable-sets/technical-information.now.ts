import { VariableSet, SelectBoxVariable, MultiLineTextVariable, YesNoVariable } from '@servicenow/sdk/core'

export const technicalInformationSet = VariableSet({
    $id: Now.ID['vs-technical-information'],
    title: 'Technical Information',
    description: 'Technical footprint used by the Architecture and Infrastructure reviews.',
    type: 'singleRow',
    layout: 'normal',
    displayTitle: true,
    order: 300,
    variables: {
        required_operating_system: SelectBoxVariable({
            question: 'Required operating system',
            mandatory: true,
            order: 100,
            choices: {
                windows: { label: 'Windows', sequence: 1 },
                macos: { label: 'macOS', sequence: 2 },
                linux: { label: 'Linux', sequence: 3 },
                multiple: { label: 'Multiple platforms', sequence: 4 },
                not_applicable: { label: 'Not applicable (browser based)', sequence: 5 },
            },
            includeNone: true,
        }),
        installation_type: SelectBoxVariable({
            question: 'Installation type',
            mandatory: true,
            order: 200,
            choices: {
                local: { label: 'Local install (workstation)', sequence: 1 },
                saas: { label: 'SaaS', sequence: 2 },
                server: { label: 'Server hosted', sequence: 3 },
            },
            includeNone: true,
        }),
        infrastructure_requirements: MultiLineTextVariable({
            question: 'Infrastructure requirements',
            helpText: 'CPU, memory, storage, network or any prerequisite component.',
            order: 300,
        }),
        integration_required: YesNoVariable({
            question: 'Does it require integration with other systems?',
            mandatory: true,
            order: 400,
        }),
    },
})
