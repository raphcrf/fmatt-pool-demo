import { Test } from '@servicenow/sdk/core'

export const testLicenseRequestApprovalPath = Test(
    {
        $id: Now.ID['atf-license-request-approval-path'],
        name: 'Software License Request - manager approval path',
        description:
            'Submits a license request for a model with available rights, approves the manager approval and verifies the allocation is created.',
        active: true,
        failOnServerError: true,
    },
    atf => {
        const manager = atf.server.createUser({
            $id: Now.ID['atf-ap-create-manager'],
            firstName: 'ATF',
            lastName: 'Manager',
            impersonate: false,
        })

        const requester = atf.server.createUser({
            $id: Now.ID['atf-ap-create-requester'],
            firstName: 'ATF',
            lastName: 'Requester',
            fieldValues: {
                manager: manager.user,
            },
            impersonate: true,
        })

        const model = atf.server.recordInsert({
            $id: Now.ID['atf-ap-insert-model'],
            table: 'cmdb_software_product_model',
            fieldValues: {
                name: 'ATF Test Software - Approval Path',
                status: 'In Production',
                certified: true,
                blacklisted: false,
            },
            enforceSecurity: false,
        })

        const entitlement = atf.server.recordInsert({
            $id: Now.ID['atf-ap-insert-entitlement'],
            table: 'alm_license',
            fieldValues: {
                software_model: model.record_id,
                purchased_rights: 10,
                allocations_available: 10,
            },
            enforceSecurity: false,
        })

        atf.catalog.openCatalogItem({
            $id: Now.ID['atf-ap-open'],
            catalogItem: Now.ref('sc_cat_item', 'ci-license-request'),
        })

        atf.catalog.setVariableValue({
            $id: Now.ID['atf-ap-set-vars'],
            catalogItem: Now.ref('sc_cat_item', 'ci-license-request'),
            variableValues: `request_for=${requester.user}^software_model=${model.record_id}^request_justification=ATF approval path^usage_duration=temporary^different_cost_center=No^required_by_date=2030-01-01`,
        })

        const order = atf.catalog.orderCatalogItem({
            $id: Now.ID['atf-ap-order'],
            assert: 'form_submitted_to_server',
        })

        const requestItem = atf.server.recordQuery({
            $id: Now.ID['atf-ap-find-ritm'],
            table: 'sc_req_item',
            fieldValues: `request=${order.request_id}`,
            assert: 'records_match_query',
            enforceSecurity: false,
        })

        const approval = atf.server.recordQuery({
            $id: Now.ID['atf-ap-find-approval'],
            table: 'sysapproval_approver',
            fieldValues: `sysapproval=${requestItem.first_record}^approver=${manager.user}^state=requested`,
            assert: 'records_match_query',
            enforceSecurity: false,
        })

        atf.server.impersonate({
            $id: Now.ID['atf-ap-impersonate-manager'],
            user: manager.user,
        })

        atf.server.recordUpdate({
            $id: Now.ID['atf-ap-approve'],
            table: 'sysapproval_approver',
            recordId: approval.first_record,
            fieldValues: {
                state: 'approved',
            },
            enforceSecurity: false,
        })

        atf.server.recordQuery({
            $id: Now.ID['atf-ap-verify-allocation'],
            table: 'alm_entitlement',
            fieldValues: `licensed_by=${entitlement.record_id}^assigned_to=${requester.user}`,
            assert: 'records_match_query',
            enforceSecurity: false,
        })
    }
)
