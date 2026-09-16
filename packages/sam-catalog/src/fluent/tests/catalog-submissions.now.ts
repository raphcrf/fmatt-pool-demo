import { Test } from '@servicenow/sdk/core'

export const testLicenseRequestSubmission = Test(
    {
        $id: Now.ID['atf-license-request-submission'],
        name: 'Software License Request - submit with mandatory variables',
        description:
            'Creates an approved software model with available rights, fills every mandatory variable and orders the item.',
        active: true,
        failOnServerError: true,
    },
    atf => {

        const requester = atf.server.createUser({
            $id: Now.ID['atf-lr-create-user'],
            firstName: 'ATF',
            lastName: 'Licensee',
            impersonate: true,
        })

        const model = atf.server.recordInsert({
            $id: Now.ID['atf-lr-insert-model'],
            table: 'cmdb_software_product_model',
            fieldValues: {
                name: 'ATF Test Software - License Request',
                status: 'In Production',
                certified: true,
                blacklisted: false,
            },
            enforceSecurity: false,
        })

        atf.server.recordInsert({
            $id: Now.ID['atf-lr-insert-entitlement'],
            table: 'alm_license',
            fieldValues: {
                software_model: model.record_id,
                purchased_rights: 10,
                allocations_available: 10,
            },
            enforceSecurity: false,
        })

        atf.catalog.openCatalogItem({
            $id: Now.ID['atf-lr-open'],
            catalogItem: Now.ref('sc_cat_item', 'ci-license-request'),
        })

        atf.catalog.setVariableValue({
            $id: Now.ID['atf-lr-set-vars'],
            catalogItem: Now.ref('sc_cat_item', 'ci-license-request'),
            variableValues: `request_for=${requester.user}^software_model=${model.record_id}^request_justification=ATF automated submission^usage_duration=temporary^different_cost_center=No^required_by_date=2030-01-01`,
        })

        atf.catalog.orderCatalogItem({
            $id: Now.ID['atf-lr-order'],
            assert: 'form_submitted_to_server',
        })
    }
)

export const testSoftwareApprovalSubmission = Test(
    {
        $id: Now.ID['atf-software-approval-submission'],
        name: 'Software Approval Request - submit with mandatory variables',
        description: 'Fills the mandatory variables across the four variable sets and orders the item.',
        active: true,
        failOnServerError: true,
    },
    atf => {
        const manufacturer = atf.server.recordInsert({
            $id: Now.ID['atf-sa-insert-manufacturer'],
            table: 'core_company',
            fieldValues: {
                name: 'ATF Test Manufacturer',
                manufacturer: true,
            },
            enforceSecurity: false,
        })

        const department = atf.server.recordQuery({
            $id: Now.ID['atf-sa-query-department'],
            table: 'cmn_department',
            fieldValues: 'active=true',
        })

        atf.catalog.openCatalogItem({
            $id: Now.ID['atf-sa-open'],
            catalogItem: Now.ref('sc_cat_item', 'ci-software-approval'),
        })

        atf.catalog.setVariableValue({
            $id: Now.ID['atf-sa-set-vars'],
            catalogItem: Now.ref('sc_cat_item', 'ci-software-approval'),
            variableValues: `software_name=ATF Test Product^software_manufacturer=${manufacturer.record_id}^software_version=1.0^requesting_area=${department.first_record}^business_objective=ATF objective^expected_benefits=ATF benefits^estimated_user_count=10^required_operating_system=windows^installation_type=saas^integration_required=no^licensing_model=free`,
        })

        atf.catalog.orderCatalogItem({
            $id: Now.ID['atf-sa-order'],
            assert: 'form_submitted_to_server',
        })
    }
)

export const testVersionUpgradeSubmission = Test(
    {
        $id: Now.ID['atf-version-upgrade-submission'],
        name: 'Software Version Upgrade - submit with mandatory variables',
        description:
            'Orders a version upgrade with upgrade_type other than license_update, so the target version is mandatory.',
        active: true,
        failOnServerError: true,
    },
    atf => {
        const model = atf.server.recordInsert({
            $id: Now.ID['atf-vu-insert-model'],
            table: 'cmdb_software_product_model',
            fieldValues: {
                name: 'ATF Test Software - Version Upgrade',
                status: 'In Production',
                certified: true,
                blacklisted: false,
            },
            enforceSecurity: false,
        })

        atf.catalog.openCatalogItem({
            $id: Now.ID['atf-vu-open'],
            catalogItem: Now.ref('sc_cat_item', 'ci-version-upgrade'),
        })

        atf.catalog.setVariableValue({
            $id: Now.ID['atf-vu-set-vars'],
            catalogItem: Now.ref('sc_cat_item', 'ci-version-upgrade'),
            variableValues: `current_software_model=${model.record_id}^current_version=1.0^upgrade_type=version_upgrade^target_version=2.0^upgrade_justification=ATF upgrade^expected_impact=individual`,
        })

        atf.catalog.orderCatalogItem({
            $id: Now.ID['atf-vu-order'],
            assert: 'form_submitted_to_server',
        })
    }
)

export const testLicenseReturnSubmission = Test(
    {
        $id: Now.ID['atf-license-return-submission'],
        name: 'Software License Return - submit with mandatory variables',
        description:
            'Allocates an entitlement to the running user, then returns it. Exercises the allocated-only reference qualifier.',
        active: true,
        failOnServerError: true,
    },
    atf => {
        const model = atf.server.recordInsert({
            $id: Now.ID['atf-lt-insert-model'],
            table: 'cmdb_software_product_model',
            fieldValues: {
                name: 'ATF Test Software - License Return',
                status: 'In Production',
                certified: true,
                blacklisted: false,
            },
            enforceSecurity: false,
        })

        const entitlement = atf.server.recordInsert({
            $id: Now.ID['atf-lt-insert-entitlement'],
            table: 'alm_license',
            fieldValues: {
                software_model: model.record_id,
                purchased_rights: 5,
                allocations_available: 4,
            },
            enforceSecurity: false,
        })

        const requester = atf.server.createUser({
            $id: Now.ID['atf-lt-create-user'],
            firstName: 'ATF',
            lastName: 'Returner',
            impersonate: true,
        })

        atf.server.recordInsert({
            $id: Now.ID['atf-lt-insert-allocation'],
            table: 'alm_entitlement',
            fieldValues: {
                licensed_by: entitlement.record_id,
                assigned_to: requester.user,
                quantity: 1,
            },
            enforceSecurity: false,
        })

        atf.catalog.openCatalogItem({
            $id: Now.ID['atf-lt-open'],
            catalogItem: Now.ref('sc_cat_item', 'ci-license-return'),
        })

        atf.catalog.setVariableValue({
            $id: Now.ID['atf-lt-set-vars'],
            catalogItem: Now.ref('sc_cat_item', 'ci-license-return'),
            variableValues: `software_model=${model.record_id}^return_reason=no_longer_used^return_justification=ATF return^desired_removal_date=2030-01-01`,
        })

        atf.catalog.orderCatalogItem({
            $id: Now.ID['atf-lt-order'],
            assert: 'form_submitted_to_server',
        })
    }
)

export const testPurchaseRequestSubmission = Test(
    {
        $id: Now.ID['atf-purchase-request-submission'],
        name: 'Software Purchase Request - submit with mandatory variables',
        description:
            'Orders the internal purchase offering directly. Normally raised by the fulfillment subflow, not by hand.',
        active: true,
        failOnServerError: true,
    },
    atf => {
        const model = atf.server.recordInsert({
            $id: Now.ID['atf-pr-insert-model'],
            table: 'cmdb_software_product_model',
            fieldValues: {
                name: 'ATF Test Software - Purchase',
                status: 'In Production',
            },
            enforceSecurity: false,
        })

        atf.server.impersonate({
            $id: Now.ID['atf-pr-impersonate-admin'],
            user: 'admin',
        })

        atf.catalog.openCatalogItem({
            $id: Now.ID['atf-pr-open'],
            catalogItem: Now.ref('sc_cat_item', 'ci-software-purchase-request'),
        })

        atf.catalog.setVariableValue({
            $id: Now.ID['atf-pr-set-vars'],
            catalogItem: Now.ref('sc_cat_item', 'ci-software-purchase-request'),
            variableValues: `software_model=${model.record_id}^requested_quantity=5^purchase_justification=ATF purchase demand`,
        })

        atf.catalog.orderCatalogItem({
            $id: Now.ID['atf-pr-order'],
            assert: 'form_submitted_to_server',
        })
    }
)
