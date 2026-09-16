import { CatalogUiPolicy } from '@servicenow/sdk/core'
import { versionUpgrade } from '../catalog-items/version-upgrade.now'

export const upgradeTargetPolicy = CatalogUiPolicy({
    $id: Now.ID['uip-upgrade-target'],
    shortDescription: 'Require target version unless the request is a license-only update',
    catalogItem: versionUpgrade,
    catalogCondition: `${versionUpgrade.variables.upgrade_type}!=license_update^EQ`,
    active: true,
    onLoad: true,
    reverseIfFalse: true,
    appliesOnCatalogItemView: true,
    appliesOnRequestedItems: true,
    actions: [
        {
            variableName: versionUpgrade.variables.target_version,
            visible: true,
            mandatory: true,
            order: 100,
        },
        {
            variableName: versionUpgrade.variables.target_edition,
            visible: true,
            order: 200,
        },
    ],
})
