import { Record } from '@servicenow/sdk/core'
import { GROUP } from '../../shared/instance-refs'

export const licenseManagementCriteria = Record({
    $id: Now.ID['uc-license-management'],
    table: 'user_criteria',
    data: {
        name: 'License Management Team',
        active: true,
        match_all: false,
        advanced: false,
        group: GROUP.licenseManagement,
        short_description:
            'Members of the License Management group. Grants visibility to internal, operational software asset offerings.',
    },
})
