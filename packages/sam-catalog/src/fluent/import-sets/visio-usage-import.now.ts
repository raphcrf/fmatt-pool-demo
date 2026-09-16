import { Table, Record, ImportSet, StringColumn, Property } from '@servicenow/sdk/core'

export const visioSoftwareModelProperty = Property({
    $id: Now.ID['prop-visio-software-model'],
    name: 'software_license_offerings.visio_software_model',
    type: 'string',
    value: '',
    description:
        'Comma-separated sys_ids of every cmdb_software_product_model that counts as Visio on this instance. Required: set during deployment. The import does not pick a model from this list; it finds the Visio subscription the user already holds and attaches the usage there. The list only keeps a Visio report from touching another product. A single sys_id is still valid.',
})

export const u_visio_usage_import = Table({
    name: 'u_visio_usage_import',
    label: 'Visio Usage Import',
    extends: 'sys_import_set_row',
    schema: {

        u_report_refresh_date: StringColumn({ label: 'Report Refresh Date', maxLength: 40 }),
        u_user_principal_name: StringColumn({ label: 'User Principal Name', maxLength: 100 }),
        u_display_name: StringColumn({ label: 'Display Name', maxLength: 100 }),
        u_last_activity_date: StringColumn({ label: 'Last Activity Date', maxLength: 40 }),
        u_is_visio_licensed: StringColumn({ label: 'Is Visio Licensed', maxLength: 10 }),
        u_report_period: StringColumn({ label: 'Report Period', maxLength: 10 }),
        u_desktop: StringColumn({ label: 'Desktop', maxLength: 10 }),
        u_web: StringColumn({ label: 'Web', maxLength: 10 }),
        u_import_status: StringColumn({ label: 'Import status', maxLength: 40 }),
        u_import_message: StringColumn({ label: 'Import message', maxLength: 255 }),
    },
})

export const visioUsageCsvDataSource = Record({
    $id: Now.ID['ds-visio-usage-csv'],
    table: 'sys_data_source',
    data: {
        name: 'Visio Usage Report - CSV',
        type: 'File',
        format: 'CSV',
        file_retrieval_method: 'Attachment',
        csv_delimiter: ',',
        header_row: 1,
        import_set_table_name: 'u_visio_usage_import',
        import_set_table_label: 'Visio Usage Import',
        batch_size: 500,
    },
})

export const visioUsageExcelDataSource = Record({
    $id: Now.ID['ds-visio-usage-excel'],
    table: 'sys_data_source',
    data: {
        name: 'Visio Usage Report - Excel',
        type: 'File',
        format: 'Excel',
        file_retrieval_method: 'Attachment',
        header_row: 1,
        sheet_number: 1,
        import_set_table_name: 'u_visio_usage_import',
        import_set_table_label: 'Visio Usage Import',
        batch_size: 500,
    },
})

export const visioUsageImportSet = ImportSet({
    $id: Now.ID['is-visio-usage-transform'],
    name: 'Visio Usage Report Transform',
    targetTable: 'samp_sw_subscription',
    sourceTable: 'u_visio_usage_import',
    active: true,
    runBusinessRules: true,
    enforceMandatoryFields: 'no',
    copyEmptyFields: false,
    order: 100,

    // Coalesce pelo PAR (UPN, modelo): o UPN sozinho casaria com subscription de
    // outro software do mesmo usuario e corromperia dado alheio.
    fields: {

        user_principal_name: {
            sourceField: 'u_user_principal_name',
            coalesce: true,
            coalesceCaseSensitive: false,
            useSourceScript: true,

            sourceScript: `answer = (function normaliseUpn(source) {
    return (source.u_user_principal_name || '').toString().trim().toLowerCase();
})(source);`,
        },
        // O modelo vem da subscription que a pessoa ja tem, nao da property.
        // Precisa ser resolvido AQUI, e nao so no onBefore: e este script que
        // decide com qual registro o coalesce casa. A regra mora no Script
        // Include para que os dois pontos nao possam divergir.
        software_model: {
            sourceField: 'u_user_principal_name',
            coalesce: true,
            useSourceScript: true,
            sourceScript: `answer = (function visioModel(source) {
    var upn = (source.u_user_principal_name || '').toString().trim().toLowerCase();
    return new global.UniversalUsageImporter().visioModelForUser(upn).model_id;
})(source);`,
        },
    },

    scripts: [
        {
            $id: Now.ID['is-visio-usage-onbefore'],
            when: 'onBefore',
            order: 100,
            active: true,
            script: Now.include('../../scripts/server/visio-usage-transform.js'),
        },
    ],
})
