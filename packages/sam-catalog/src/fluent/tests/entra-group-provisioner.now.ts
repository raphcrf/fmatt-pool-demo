import { Test } from '@servicenow/sdk/core'

export const testEntraGroupProvisioner = Test(
    {
        $id: Now.ID['atf-entra-group-provisioner'],
        name: 'Entra group provisioner - mapping behaviour',
        description:
            'Server-side Jasmine coverage of the software model to Entra group mapping: single match, no match, ambiguity, inactive rows and user object id resolution.',
        active: true,
        failOnServerError: true,
    },
    atf => {
        atf.server.runServerSideScript({
            $id: Now.ID['atf-egp-run'],
            jasmineVersion: '3.1',
            script: Now.include('../../scripts/server/test-entra-group-provisioner.js'),
        })
    }
)
