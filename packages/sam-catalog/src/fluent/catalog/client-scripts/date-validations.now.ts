import { CatalogClientScript } from '@servicenow/sdk/core'
import { licenseRequest } from '../catalog-items/license-request.now'
import { licenseReturn } from '../catalog-items/license-return.now'
import { versionUpgrade } from '../catalog-items/version-upgrade.now'

export const checkLicenseAvailability = CatalogClientScript({
    $id: Now.ID['ccs-check-license-availability'],
    name: 'License Request - check license availability',
    type: 'onChange',
    catalogItem: licenseRequest,
    variableName: licenseRequest.variables.software_model,
    script: Now.include('../../../client/catalog/check-license-availability.client.js'),
    active: true,
    appliesOnCatalogItemView: true,
    appliesOnRequestedItems: false,
})

export const validateRequiredByDate = CatalogClientScript({
    $id: Now.ID['ccs-validate-required-by-date'],
    name: 'License Request - validate required by date',
    type: 'onChange',
    catalogItem: licenseRequest,
    variableName: licenseRequest.variables.required_by_date,
    script: Now.include('../../../client/catalog/validate-required-by-date.client.js'),
    active: true,
    appliesOnCatalogItemView: true,
    appliesOnRequestedItems: false,
})

export const validateRemovalDate = CatalogClientScript({
    $id: Now.ID['ccs-validate-removal-date'],
    name: 'License Return - validate removal date',
    type: 'onChange',
    catalogItem: licenseReturn,
    variableName: licenseReturn.variables.desired_removal_date,
    script: Now.include('../../../client/catalog/validate-removal-date.client.js'),
    active: true,
    appliesOnCatalogItemView: true,
    appliesOnRequestedItems: false,
})

export const validateRequestedForActive = CatalogClientScript({
    $id: Now.ID['ccs-validate-requested-for-active'],
    name: 'License Request - requester active and cost center',
    type: 'onChange',
    catalogItem: licenseRequest,
    variableName: licenseRequest.variables.request_for,
    script: Now.include('../../../client/catalog/validate-requested-for-active.client.js'),
    active: true,
    appliesOnCatalogItemView: true,
    appliesOnRequestedItems: false,
})

export const warnJustificationLength = CatalogClientScript({
    $id: Now.ID['ccs-warn-justification-length'],
    name: 'License Request - warn on short justification',
    type: 'onChange',
    catalogItem: licenseRequest,
    variableName: licenseRequest.variables.request_justification,
    script: Now.include('../../../client/catalog/validate-justification-length.client.js'),
    active: true,
    appliesOnCatalogItemView: true,
    appliesOnRequestedItems: false,
})

export const enforceJustificationLength = CatalogClientScript({
    $id: Now.ID['ccs-enforce-justification-length'],
    name: 'License Request - enforce justification minimum',
    type: 'onSubmit',
    catalogItem: licenseRequest,
    script: Now.include('../../../client/catalog/enforce-justification-length.client.js'),
    active: true,
    appliesOnCatalogItemView: true,
    appliesOnRequestedItems: false,
})

export const validateTargetVersion = CatalogClientScript({
    $id: Now.ID['ccs-validate-target-version'],
    name: 'Version Upgrade - validate target version',
    type: 'onChange',
    catalogItem: versionUpgrade,
    variableName: versionUpgrade.variables.target_version,
    script: Now.include('../../../client/catalog/validate-target-version.client.js'),
    active: true,
    appliesOnCatalogItemView: true,
    appliesOnRequestedItems: false,
})
