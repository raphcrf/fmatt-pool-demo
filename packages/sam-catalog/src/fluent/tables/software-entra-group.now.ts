import { Table, StringColumn, ReferenceColumn, BooleanColumn } from '@servicenow/sdk/core'

export const u_software_entra_group = Table({
    name: 'u_software_entra_group',
    label: 'Software Entra Group',
    schema: {
        u_software_model: ReferenceColumn({
            label: 'Software model',
            referenceTable: 'cmdb_software_product_model',
            mandatory: true,
        }),

        u_entra_group_id: StringColumn({
            label: 'Entra group ID',
            maxLength: 36,
            mandatory: true,
        }),

        u_entra_group_name: StringColumn({
            label: 'Entra group name',
            maxLength: 255,
        }),

        u_application_name: StringColumn({
            label: 'Application name',
            maxLength: 255,
        }),
        u_active: BooleanColumn({
            label: 'Active',
            default: true,
        }),
    },
})
