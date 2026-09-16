import { ScriptInclude } from '@servicenow/sdk/core'

export const entraGroupProvisioner = ScriptInclude({
    $id: Now.ID['si-entra-group-provisioner'],
    name: 'EntraGroupProvisioner',
    description:
        'Adds a user to the Microsoft Entra security group mapped to a software model, and confirms the membership afterwards.',
    script: Now.include('../../scripts/server/entra-group-provisioner.js'),
    active: true,
    clientCallable: false,
    accessibleFrom: 'public',
})
