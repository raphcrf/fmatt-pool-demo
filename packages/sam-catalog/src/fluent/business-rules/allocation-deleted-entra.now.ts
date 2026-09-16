import { BusinessRule } from '@servicenow/sdk/core'

/**
 * Apagar a alocacao tira o usuario do grupo do Entra.
 *
 * Pedido da sessao de 14/08/2026: "remove licenses from Entra groups/portal when
 * an allocation is deleted in ServiceNow". E o mesmo desfecho da oferta de
 * devolucao, por outro gatilho — ali o usuario pede, aqui a Gestao de Licencas
 * apaga o direito direto na tabela.
 *
 * `after` e nao `async`: a regra precisa dos valores de `assigned_to` e
 * `licensed_by`, e em delete assincrono o registro ja nao existe para ser lido.
 * O custo e uma chamada ao Graph dentro da transacao, na casa de um segundo.
 *
 * NAO confere depois, ao contrario da devolucao pela oferta. Regra de negocio nao
 * espera: quem quiser a conferencia de uma hora tem de passar pela oferta, que
 * tem flow e timer.
 */
export const allocationDeletedEntra = BusinessRule({
    $id: Now.ID['br-allocation-deleted-entra'],
    name: 'Remove from Entra group when allocation is deleted',
    table: 'alm_entitlement',
    when: 'after',
    action: ['delete'],
    order: 100,
    active: true,
    description:
        'When a license allocation is deleted, removes the user from the Entra security group mapped to that software model.',
    script: Now.include('../../scripts/server/allocation-deleted-entra.js'),
})
