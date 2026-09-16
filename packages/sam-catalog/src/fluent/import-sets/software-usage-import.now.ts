import { Table, Record, ImportSet, StringColumn } from '@servicenow/sdk/core'

export const u_software_usage_import = Table({
    name: 'u_software_usage_import',
    label: 'Software Usage Import',
    extends: 'sys_import_set_row',
    schema: {

        u_software_model: StringColumn({ label: 'Software Model', maxLength: 255 }),
        u_user_email: StringColumn({ label: 'User Email', maxLength: 100 }),
        u_last_activity: StringColumn({ label: 'Last Activity', maxLength: 40 }),

        u_import_status: StringColumn({ label: 'Import status', maxLength: 40 }),
        u_import_message: StringColumn({ label: 'Import message', maxLength: 255 }),
    },
})

export const universalUsageCsvDataSource = Record({
    $id: Now.ID['ds-universal-usage-csv'],
    table: 'sys_data_source',
    data: {
        name: 'Universal Software Usage - CSV',
        type: 'File',
        format: 'CSV',
        file_retrieval_method: 'Attachment',
        csv_delimiter: ',',
        header_row: 1,
        import_set_table_name: 'u_software_usage_import',
        import_set_table_label: 'Software Usage Import',
        batch_size: 500,
    },
})

export const universalUsageExcelDataSource = Record({
    $id: Now.ID['ds-universal-usage-excel'],
    table: 'sys_data_source',
    data: {
        name: 'Universal Software Usage - Excel',
        type: 'File',
        format: 'Excel',
        file_retrieval_method: 'Attachment',
        header_row: 1,

        sheet_number: 1,
        import_set_table_name: 'u_software_usage_import',
        import_set_table_label: 'Software Usage Import',
        batch_size: 500,
    },
})

export const universalUsageImportSet = ImportSet({
    $id: Now.ID['is-universal-usage-transform'],
    name: 'Universal Software Usage Transform',
    targetTable: 'samp_sw_subscription',
    sourceTable: 'u_software_usage_import',
    active: true,

    runBusinessRules: true,
    enforceMandatoryFields: 'no',
    copyEmptyFields: false,
    order: 100,

    fields: {

        subscription_identifier: {
            sourceField: 'u_user_email',
            coalesce: true,
            coalesceCaseSensitive: false,
            useSourceScript: true,
            sourceScript: `answer = (function buildKey(source) {
    var email = (source.u_user_email || '').toString().trim().toLowerCase();
    var model = (source.u_software_model || '').toString().trim().toLowerCase();
    if (!email || !model) {
        return '';
    }
    return 'UNIVERSAL|' + email + '|' + model;
})(source);`,
        },
    },

    scripts: [
        {
            $id: Now.ID['is-universal-usage-onbefore'],
            when: 'onBefore',
            order: 100,
            active: true,
            script: Now.include('../../scripts/server/universal-usage-transform.js'),
        },
    ],
})
