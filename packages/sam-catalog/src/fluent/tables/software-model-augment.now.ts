import { Table, ReferenceColumn } from '@servicenow/sdk/core'

export const cmdb_software_product_model = Table({
    augments: 'cmdb_software_product_model',
    schema: {
        u_ad_group: ReferenceColumn({
            label: 'AD group',
            referenceTable: 'sys_user_group',
            active: true,
        }),
    },
})
