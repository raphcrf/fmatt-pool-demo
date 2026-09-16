import { ScriptInclude } from '@servicenow/sdk/core'

export const softwareLicenseAvailabilityAjax = ScriptInclude({
    $id: Now.ID['si-software-license-availability'],
    name: 'SoftwareLicenseAvailability',
    description:
        'Client-callable availability check for software models. Returns the number of free entitlement rights for a given software model.',
    script: Now.include('../../scripts/server/software-license-availability-ajax.js'),
    active: true,
    clientCallable: true,
    accessibleFrom: 'public',
})
