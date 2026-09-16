import { VariableSet, ReferenceVariable, MultiLineTextVariable, SingleLineTextVariable } from '@servicenow/sdk/core'

export const businessJustificationSet = VariableSet({
    $id: Now.ID['vs-business-justification'],
    title: 'Business Justification',
    description: 'Business context supporting the software approval request.',
    type: 'singleRow',
    layout: 'normal',
    displayTitle: true,
    order: 200,
    variables: {
        requesting_area: ReferenceVariable({
            question: 'Requesting department',
            referenceTable: 'cmn_department',
            useReferenceQualifier: 'simple',
            referenceQualCondition: 'active=true',
            mandatory: true,
            order: 100,
        }),
        business_objective: MultiLineTextVariable({
            question: 'Objective',
            helpText: 'What business problem does this software solve?',
            mandatory: true,
            order: 200,
        }),
        expected_benefits: MultiLineTextVariable({
            question: 'Expected benefits',
            mandatory: true,
            order: 300,
        }),
        estimated_user_count: SingleLineTextVariable({
            question: 'Estimated number of users',
            mandatory: true,
            order: 400,
            exampleText: 'e.g. 25',
        }),
    },
})
