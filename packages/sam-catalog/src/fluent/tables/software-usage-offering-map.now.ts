import { Table, Record, StringColumn, ReferenceColumn, BooleanColumn } from '@servicenow/sdk/core'

export const u_software_usage_offering_map = Table({
    name: 'u_software_usage_offering_map',
    label: 'Software Usage Offering Map',
    display: 'u_offering_name',

    index: [{ name: 'vendor_offering', unique: true, element: ['u_vendor', 'u_offering_name'] }],
    schema: {

        u_vendor: StringColumn({
            label: 'Vendor',
            maxLength: 40,
            mandatory: true,
            default: 'autodesk',
        }),

        u_offering_name: StringColumn({
            label: 'Offering name',
            maxLength: 255,
            mandatory: true,
        }),

        // Nao e mandatory de proposito: as linhas nascem sem modelo no deploy,
        // porque sys_id de software model e proprio de cada instancia.
        u_software_model: ReferenceColumn({
            label: 'Software model',
            referenceTable: 'cmdb_software_product_model',
        }),
        u_active: BooleanColumn({
            label: 'Active',
            default: true,
        }),
    },
})

export const mapAutodeskAecCollection = Record({
    $id: Now.ID['map-autodesk-aec-collection'],
    table: 'u_software_usage_offering_map',
    data: {
        u_vendor: 'autodesk',
        u_offering_name: 'Architecture Engineering & Construction Collection',
        u_active: true,
    },
})

export const mapAutodeskMeCollection = Record({
    $id: Now.ID['map-autodesk-me-collection'],
    table: 'u_software_usage_offering_map',
    data: {
        u_vendor: 'autodesk',
        u_offering_name: 'Media & Entertainment Collection',
        u_active: true,
    },
})

export const mapAutodeskFlame = Record({
    $id: Now.ID['map-autodesk-flame'],
    table: 'u_software_usage_offering_map',
    data: {
        u_vendor: 'autodesk',
        u_offering_name: 'Flame',
        u_active: true,
    },
})

export const mapAutodeskFormaBuild = Record({
    $id: Now.ID['map-autodesk-forma-build'],
    table: 'u_software_usage_offering_map',
    data: {
        u_vendor: 'autodesk',
        u_offering_name: 'Forma Build 5000',
        u_active: true,
    },
})

export const mapAutodeskFusion = Record({
    $id: Now.ID['map-autodesk-fusion'],
    table: 'u_software_usage_offering_map',
    data: {
        u_vendor: 'autodesk',
        u_offering_name: 'Fusion',
        u_active: true,
    },
})

export const mapAutodeskPdmCollection = Record({
    $id: Now.ID['map-autodesk-pdm-collection'],
    table: 'u_software_usage_offering_map',
    data: {
        u_vendor: 'autodesk',
        u_offering_name: 'Product Design & Manufacturing Collection',
        u_active: true,
    },
})

export const mapAutodeskFlameAssist = Record({
    $id: Now.ID['map-autodesk-flame-assist'],
    table: 'u_software_usage_offering_map',
    data: {
        u_vendor: 'autodesk',
        u_offering_name: 'Flame Assist',
        u_active: true,
    },
})
