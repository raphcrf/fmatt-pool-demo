import { EmailNotification } from '@servicenow/sdk/core'
import { licenseRequest } from '../catalog/catalog-items/license-request.now'
import { versionUpgrade } from '../catalog/catalog-items/version-upgrade.now'
import { licenseReturn } from '../catalog/catalog-items/license-return.now'

export const licenseApprovalRequestNotification = EmailNotification({
    $id: Now.ID['notif-license-approval-request'],
    table: 'sysapproval_approver',
    name: 'Software License Offerings - approval request',
    description:
        'Sends the full request detail to the approver and accepts the decision by email reply. Required because not every manager holds an ITSM license.',
    active: true,

    triggerConditions: {
        generationType: 'engine',
        onRecordInsert: true,
        onRecordUpdate: false,

        condition: `state=requested^sysapproval.cat_itemIN${licenseRequest},${versionUpgrade},${licenseReturn}`,
    },

    recipientDetails: {
        recipientFields: ['approver'],

        excludeDelegates: false,
        sendToCreator: false,
    },

    emailContent: {
        contentType: 'text/html',

        subject: 'Action required: ${sysapproval.number} - ${sysapproval.cat_item}',
        messageHtml: [
            '<p>Hello ${approver.first_name},</p>',
            '<p>A software request needs your decision. You can respond directly from this email &mdash; no login required.</p>',
            '<h3>Request</h3>',
            '<ul>',
            '<li><b>Number:</b> ${sysapproval.number}</li>',
            '<li><b>Offering:</b> ${sysapproval.cat_item}</li>',
            '<li><b>Requested for:</b> ${sysapproval.requested_for}</li>',
            '<li><b>Opened by:</b> ${sysapproval.opened_by}</li>',
            '<li><b>Opened:</b> ${sysapproval.opened_at}</li>',
            '</ul>',
            '<h3>Details submitted by the requester</h3>',
            '${sysapproval.variables}',
            '<h3>Your decision</h3>',
            '<p>Use the buttons below. <b>Whatever you write in the body of your reply is recorded as the reason</b> and is shown to the requester &mdash; please say why, especially when rejecting.</p>',
            '${mail_script:include_approval_actionable}',
        ].join(''),
        importance: 'high',
        includeAttachments: false,
    },
})
