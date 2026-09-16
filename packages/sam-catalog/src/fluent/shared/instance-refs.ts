// Unico arquivo a editar por implantacao. Preencher com os sys_ids da instancia
// alvo antes de `npm run build`. Vazio, as ofertas instalam fora de qualquer
// catalogo. Nao pode virar property: sao gravados no XML do registro em tempo
// de build. Referencia de execucao mora em properties/instance-bindings.now.ts.
//   npx now-sdk query sc_catalog|sc_category|user_criteria|sys_user_group -a <alias>

export const SERVICE_CATALOG_SYS_ID = ''

export const CATEGORY = {

    software: '',
} as const

export const GROUP = {

    licenseManagement: '',
} as const

export const GROUP_LICENSE_MANAGEMENT = ''

export const USER_CRITERIA = {
    allEmployees: '',
} as const

export const TABLE = {
    softwareModel: 'cmdb_software_product_model',
    softwareEntitlement: 'alm_license',
    licenseEntitlement: 'alm_entitlement',
} as const
