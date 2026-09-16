import { ScriptInclude } from '@servicenow/sdk/core'

export const universalUsageImporter = ScriptInclude({
    $id: Now.ID['si-universal-usage-importer'],
    name: 'UniversalUsageImporter',
    description:
        'Loads a universal software usage template (.csv or .xlsx) attached to a request item and transforms it into software subscriptions.',
    script: Now.include('../../scripts/server/universal-usage-importer.js'),
    active: true,
    clientCallable: false,
    accessibleFrom: 'public',
})
