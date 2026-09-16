import { ScriptInclude } from '@servicenow/sdk/core'

export const softwareLicenseCatalogUtils = ScriptInclude({
    $id: Now.ID['si-software-license-catalog-utils'],
    name: 'SoftwareLicenseCatalogUtils',
    description:
        'Server-side helpers for the software and license catalog offerings. Resolves the software models currently allocated to a user.',
    script: Now.include('../../scripts/server/software-license-catalog-utils.js'),
    active: true,
    clientCallable: false,
    sandboxCallable: true,
    accessibleFrom: 'public',
})
