import { Test } from '@servicenow/sdk/core'

export const testUniversalUsageImport = Test(
    {
        $id: Now.ID['atf-universal-usage-import'],
        name: 'Universal usage template - import behaviour',
        description:
            'Server-side Jasmine coverage of the universal usage import: valid rows, rejected rows, date validation and idempotency.',
        active: true,
        failOnServerError: true,
    },
    atf => {
        atf.server.runServerSideScript({
            $id: Now.ID['atf-uui-run'],
            jasmineVersion: '3.1',
            script: Now.include('../../scripts/server/test-universal-usage-import.js'),
        })
    }
)

export const testUsageImportSubmission = Test(
    {
        $id: Now.ID['atf-usage-import-submission'],
        name: 'Software Usage Report Import - submit the universal source',
        description:
            'Checks the report source choice and that the universal template attachment becomes mandatory for that source.',
        active: true,
        failOnServerError: true,
    },
    atf => {
        atf.server.impersonate({
            $id: Now.ID['atf-ui-impersonate'],
            user: 'admin',
        })

        atf.catalog.openCatalogItem({
            $id: Now.ID['atf-ui-open'],
            catalogItem: Now.ref('sc_cat_item', 'ci-m365-report-import'),
        })

        atf.catalog.setVariableValue({
            $id: Now.ID['atf-ui-set-source'],
            catalogItem: Now.ref('sc_cat_item', 'ci-m365-report-import'),
            variableValues: `report_source=universal`,
        })

        atf.catalog.variableStateValidation({
            $id: Now.ID['atf-ui-validate-states'],
            catalogItem: Now.ref('sc_cat_item', 'ci-m365-report-import'),

            visible: ['universal_template'],
            mandatory: ['universal_template'],
            notVisible: ['visio_usage_report', 'project_usage_report'],
        })
    }
)

export const testAutodeskUsageImport = Test(
    {
        $id: Now.ID['atf-autodesk-usage-import'],
        name: 'Autodesk usage report - import behaviour',
        description:
            'Server-side Jasmine coverage of the Autodesk usage import: offering to model mapping, multi-offering users, revoked seats and idempotency.',
        active: true,
        failOnServerError: true,
    },
    atf => {
        atf.server.runServerSideScript({
            $id: Now.ID['atf-aui-run'],
            jasmineVersion: '3.1',
            script: Now.include('../../scripts/server/test-autodesk-usage-import.js'),
        })
    }
)

export const testVisioUsageImport = Test(
    {
        $id: Now.ID['atf-visio-usage-import'],
        name: 'Visio usage report - import behaviour',
        description:
            'Server-side Jasmine coverage of the Visio User Detail import against the exact tenant layout, including BOM and CRLF.',
        active: true,
        failOnServerError: true,
    },
    atf => {
        atf.server.runServerSideScript({
            $id: Now.ID['atf-vui-run'],
            jasmineVersion: '3.1',
            script: Now.include('../../scripts/server/test-visio-usage-import.js'),
        })
    }
)
