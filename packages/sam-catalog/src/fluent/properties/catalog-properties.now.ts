import { Property } from '@servicenow/sdk/core'

export const managerApprovalEnabled = Property({
    $id: Now.ID['prop-manager-approval-enabled'],
    name: 'software_license_offerings.manager_approval_enabled',
    type: 'string',
    value: 'false',
    description:
        'Set to true to require the requester manager to approve after the License Management team. Set to false to fulfill as soon as License Management approves. Ships disabled; enable per deployment.',
    ignoreCache: false,
})

/**
 * Minutos de espera antes de CONFERIR a inclusão no grupo do Entra.
 *
 * 120 por padrão: o time do cliente estimou 45 a 60 minutos para a licença descer
 * do grupo, e a folga é proposital — conferir cedo demais joga na fila manual um
 * caso que se resolveria sozinho.
 *
 * A espera não é literal no flow. O passo de script soma estes minutos à hora
 * atual e devolve o instante em `verify_after`; o timer espera até lá. Foi o
 * único jeito de deixar o tempo ajustável sem redeploy: `waitForADuration` com
 * `explicit_duration` exige objeto literal em tempo de build e recusa data pill
 * ("Failed to cast StringLiteralShape to ObjectShape").
 */
export const entraAddVerifyWaitMinutes = Property({
    $id: Now.ID['prop-entra-add-verify-wait'],
    name: 'software_license_offerings.entra_add_verify_wait_minutes',
    type: 'integer',
    value: '120',
    description:
        'Minutes to wait after adding a user to an Entra group before confirming the membership. Lower it to demo the full loop; 120 is the working value.',
    ignoreCache: false,
})

/**
 * Minutos de espera antes de CONFERIR a remoção do grupo.
 *
 * 60 por padrão, metade da inclusão, porque a pergunta é outra: aqui não se espera
 * licença aparecer, só a associação desaparecer, e ela sai do grupo na hora. A
 * espera existe para pegar o caso em que a remoção foi aceita e algo a desfez.
 */
export const entraRemoveVerifyWaitMinutes = Property({
    $id: Now.ID['prop-entra-remove-verify-wait'],
    name: 'software_license_offerings.entra_remove_verify_wait_minutes',
    type: 'integer',
    value: '60',
    description:
        'Minutes to wait after removing a user from an Entra group before confirming the removal. The license is only returned to the pool after that confirmation.',
    ignoreCache: false,
})

export const softwareModelQualifier = Property({
    $id: Now.ID['prop-software-model-qualifier'],
    name: 'software_license_offerings.software_model_qualifier',
    type: 'string',
    value: 'certified=true^blacklisted=false^status=In Production',
    description:
        'Encoded query applied as the reference qualifier on the software model variable of the license request, upgrade and return offerings. Maintained by the License Management team.',
    ignoreCache: false,
})
