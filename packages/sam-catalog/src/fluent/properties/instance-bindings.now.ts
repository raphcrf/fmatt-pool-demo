import { Property } from '@servicenow/sdk/core'

export const groupLicenseManagement = Property({
    $id: Now.ID['prop-group-license-management'],
    name: 'software_license_offerings.group_license_management',
    type: 'string',
    value: '',
    description:
        'sys_id of the sys_user_group that owns software license management on this instance. Required: set during deployment. Leave empty and fulfillment tasks are created without an assignment group.',
    ignoreCache: false,
})

export const groupInformationSecurity = Property({
    $id: Now.ID['prop-group-information-security'],
    name: 'software_license_offerings.group_information_security',
    type: 'string',
    value: '',
    description:
        'sys_id of the sys_user_group that gives the information security opinion during software homologation. Set during deployment.',
    ignoreCache: false,
})
