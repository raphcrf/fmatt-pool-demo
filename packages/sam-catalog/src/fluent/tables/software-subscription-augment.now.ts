import { Table, StringColumn, DateTimeColumn, IntegerColumn, DecimalColumn } from '@servicenow/sdk/core'

export const samp_sw_subscription = Table({
    augments: 'samp_sw_subscription',
    schema: {

        u_seat_assignment: StringColumn({
            label: 'Seat assignment',
            maxLength: 40,
        }),

        u_unassigned_date: DateTimeColumn({
            label: 'Subscription unassigned',
        }),

        u_days_used: IntegerColumn({
            label: 'Days used',
        }),
        u_monthly_average: DecimalColumn({
            label: 'Monthly average usage',
        }),

        u_access_option: StringColumn({
            label: 'Access option',
            maxLength: 40,
        }),
    },
})
