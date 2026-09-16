import { Table, Record, ImportSet, StringColumn } from '@servicenow/sdk/core'

export const u_autodesk_usage_import = Table({
    name: 'u_autodesk_usage_import',
    label: 'Autodesk Usage Import',
    extends: 'sys_import_set_row',
    schema: {

        u_hashed_autodesk_id: StringColumn({ label: 'hashed_autodesk_id', maxLength: 64 }),
        u_first_name: StringColumn({ label: 'first_name', maxLength: 100 }),
        u_last_name: StringColumn({ label: 'last_name', maxLength: 100 }),
        u_email: StringColumn({ label: 'email', maxLength: 255 }),
        u_autodesk_id: StringColumn({ label: 'autodesk_id', maxLength: 100 }),
        u_team_alias: StringColumn({ label: 'team_alias', maxLength: 100 }),

        u_group: StringColumn({ label: 'group', maxLength: 255 }),
        u_offering_name: StringColumn({ label: 'offering_name', maxLength: 255 }),

        u_version: StringColumn({ label: 'version', maxLength: 255 }),
        u_seat_assignment: StringColumn({ label: 'seat_assignment', maxLength: 40 }),

        u_assigned_date: StringColumn({ label: 'assigned_date', maxLength: 40 }),
        u_unassigned_date: StringColumn({ label: 'unassigned_date', maxLength: 40 }),
        u_user_activity: StringColumn({ label: 'user_activity', maxLength: 40 }),
        u_days_inactive: StringColumn({ label: 'days_inactive', maxLength: 20 }),
        u_access_option: StringColumn({ label: 'access_option', maxLength: 40 }),
        u_days_used: StringColumn({ label: 'days_used', maxLength: 20 }),
        u_monthly_average: StringColumn({ label: 'monthly_average', maxLength: 20 }),

        u_tokens_used: StringColumn({ label: 'tokens_used', maxLength: 20 }),
        u_last_accessed: StringColumn({ label: 'last_accessed', maxLength: 40 }),
        u_import_status: StringColumn({ label: 'Import status', maxLength: 40 }),
        u_import_message: StringColumn({ label: 'Import message', maxLength: 255 }),
    },
})

export const autodeskUsageCsvDataSource = Record({
    $id: Now.ID['ds-autodesk-usage-csv'],
    table: 'sys_data_source',
    data: {
        name: 'Autodesk Usage Report - CSV',
        type: 'File',
        format: 'CSV',
        file_retrieval_method: 'Attachment',
        csv_delimiter: ',',
        header_row: 1,
        import_set_table_name: 'u_autodesk_usage_import',
        import_set_table_label: 'Autodesk Usage Import',
        batch_size: 500,
    },
})

export const autodeskUsageExcelDataSource = Record({
    $id: Now.ID['ds-autodesk-usage-excel'],
    table: 'sys_data_source',
    data: {
        name: 'Autodesk Usage Report - Excel',
        type: 'File',
        format: 'Excel',
        file_retrieval_method: 'Attachment',
        header_row: 1,

        // A aba 1 e o bloco de filtros do export; os usuarios estao na aba 2.
        sheet_number: 2,
        import_set_table_name: 'u_autodesk_usage_import',
        import_set_table_label: 'Autodesk Usage Import',
        batch_size: 500,
    },
})

export const autodeskUsageImportSet = ImportSet({
    $id: Now.ID['is-autodesk-usage-transform'],
    name: 'Autodesk Usage Report Transform',
    targetTable: 'samp_sw_subscription',
    sourceTable: 'u_autodesk_usage_import',
    active: true,
    runBusinessRules: true,
    enforceMandatoryFields: 'no',
    copyEmptyFields: false,
    order: 100,

    // Coalesce pelo PAR (e-mail, oferta): o e-mail sozinho nao e unico, porque um
    // usuario aparece uma vez por oferta que detem.
    fields: {

        user_principal_name: {
            sourceField: 'u_email',
            coalesce: true,
            coalesceCaseSensitive: false,
            useSourceScript: true,
            sourceScript: `answer = (function normaliseEmail(source) {
    return (source.u_email || '').toString().trim().toLowerCase();
})(source);`,
        },

        software_model: {
            sourceField: 'u_offering_name',
            coalesce: true,
            useSourceScript: true,

            sourceScript: `answer = (function autodeskModel(source) {
    return new UniversalUsageImporter().resolveOfferingModel('autodesk', source.u_offering_name);
})(source);`,
        },
    },

    scripts: [
        {
            $id: Now.ID['is-autodesk-usage-onbefore'],
            when: 'onBefore',
            order: 100,
            active: true,
            script: Now.include('../../scripts/server/autodesk-usage-transform.js'),
        },
    ],
})
