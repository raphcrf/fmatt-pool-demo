import { VariableSet, SingleLineTextVariable, ReferenceVariable, UrlVariable } from '@servicenow/sdk/core'

export const softwareInformationSet = VariableSet({
    $id: Now.ID['vs-software-information'],
    title: 'Software Information',
    description: 'Identification of the software being submitted for approval.',
    type: 'singleRow',
    layout: '2across',
    displayTitle: true,
    order: 100,
    variables: {
        software_name: SingleLineTextVariable({
            question: 'Software name',
            mandatory: true,
            order: 100,
            exampleText: 'e.g. Autodesk AutoCAD',
        }),
        software_manufacturer: ReferenceVariable({
            question: 'Manufacturer',
            referenceTable: 'core_company',
            useReferenceQualifier: 'simple',
            referenceQualCondition: 'manufacturer=true',
            mandatory: true,
            order: 200,
        }),
        software_version: SingleLineTextVariable({
            question: 'Version',
            mandatory: true,
            order: 300,
            exampleText: 'e.g. 2026.1',
        }),
        vendor_website: UrlVariable({
            question: 'Vendor website',
            order: 400,
        }),
    },
})
