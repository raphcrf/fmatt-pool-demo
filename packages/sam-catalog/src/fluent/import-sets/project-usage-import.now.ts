import { Table, Record, ImportSet, StringColumn, Property } from '@servicenow/sdk/core'

export const projectSoftwareModelProperty = Property({
    $id: Now.ID['prop-project-software-model'],
    name: 'software_license_offerings.project_software_model',
    type: 'string',
    value: '',
    description:
        'sys_id of the cmdb_software_product_model that represents Project. Used by the Project usage report import to attach subscriptions to the right model.',
})

// Os LABELS tem de bater caractere a caractere com o cabecalho do CSV do tenant:
// o loader casa coluna por rotulo, nao por nome. Conferido contra o export real
// ProjectActivityUserDetail (3.406 linhas, BOM UTF-8).
export const u_project_usage_import = Table({
    name: 'u_project_usage_import',
    label: 'Project Usage Import',
    extends: 'sys_import_set_row',
    schema: {
        u_report_refresh_date: StringColumn({ label: 'Report Refresh Date', maxLength: 40 }),
        u_user_principal_name: StringColumn({ label: 'User Principal Name', maxLength: 100 }),
        u_display_name: StringColumn({ label: 'Display Name', maxLength: 100 }),
        u_last_activity_date: StringColumn({ label: 'Last Activity Date', maxLength: 40 }),
        u_report_period: StringColumn({ label: 'Report Period', maxLength: 10 }),
        u_projects_desktop: StringColumn({ label: 'Projects Visited (Desktop)', maxLength: 10 }),
        u_projects_web: StringColumn({ label: 'Projects Visited (Web)', maxLength: 10 }),
        u_tasks_created_web: StringColumn({ label: 'Tasks Created (Web)', maxLength: 10 }),
        u_tasks_edited_web: StringColumn({ label: 'Tasks Edited (Web)', maxLength: 10 }),
        u_other_activity: StringColumn({ label: 'Other Activity', maxLength: 10 }),
        u_import_status: StringColumn({ label: 'Import status', maxLength: 40 }),
        u_import_message: StringColumn({ label: 'Import message', maxLength: 255 }),
    },
})

export const projectUsageCsvDataSource = Record({
    $id: Now.ID['ds-project-usage-csv'],
    table: 'sys_data_source',
    data: {
        name: 'Project Usage Report - CSV',
        type: 'File',
        format: 'CSV',
        file_retrieval_method: 'Attachment',
        csv_delimiter: ',',
        header_row: 1,
        import_set_table_name: 'u_project_usage_import',
        import_set_table_label: 'Project Usage Import',
        batch_size: 500,
    },
})

export const projectUsageExcelDataSource = Record({
    $id: Now.ID['ds-project-usage-excel'],
    table: 'sys_data_source',
    data: {
        name: 'Project Usage Report - Excel',
        type: 'File',
        format: 'Excel',
        file_retrieval_method: 'Attachment',
        header_row: 1,
        sheet_number: 1,
        import_set_table_name: 'u_project_usage_import',
        import_set_table_label: 'Project Usage Import',
        batch_size: 500,
    },
})

export const projectUsageImportSet = ImportSet({
    $id: Now.ID['is-project-usage-transform'],
    name: 'Project Usage Report Transform',
    targetTable: 'samp_sw_subscription',
    sourceTable: 'u_project_usage_import',
    active: true,
    runBusinessRules: true,
    enforceMandatoryFields: 'no',
    copyEmptyFields: false,
    order: 100,

    // Coalesce pelo PAR (UPN, modelo), como no Visio: o UPN sozinho casaria com
    // subscription de outro software do mesmo usuario.
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
        software_model: {
            sourceField: 'u_user_principal_name',
            coalesce: true,
            useSourceScript: true,
            sourceScript: `answer = (function projectModel() {
    return gs.getProperty('software_license_offerings.project_software_model', '');
})();`,
        },
    },

    scripts: [
        {
            $id: Now.ID['is-project-usage-onbefore'],
            when: 'onBefore',
            order: 100,
            active: true,
            script: Now.include('../../scripts/server/project-usage-transform.js'),
        },
    ],
})
