import { UiPolicy } from '@servicenow/sdk/core'
import { softwareApproval } from '../catalog/catalog-items/software-approval.now'

/**
 * Mostra o "Homologation outcome" so nos itens da Requisicao de Homologacao.
 *
 * `u_homologation_outcome` vive em `sc_req_item`, que e tabela GLOBAL: o campo
 * aparece no formulario de TODO item de requisicao da instancia, de qualquer
 * oferta, e nas outras nao significa nada.
 *
 * `reverseIfFalse` e o que faz o "somente": com a condicao falsa a politica
 * desfaz a acao e o campo fica escondido. Sem isso ele apareceria em todo lugar
 * assim que uma vez ficasse visivel.
 *
 * NAO e mandatorio de proposito. O flow de homologacao trata o campo vazio com
 * saida propria -- fecha o item como "encerrada sem resultado registrado" em vez
 * de avisar o solicitante que o software foi recusado. Tornar obrigatorio
 * impediria salvar o RITM por qualquer outro motivo enquanto a analise nao
 * terminasse.
 *
 * O campo estar NO formulario continua sendo layout (`sys_ui_element`), que esta
 * fora deste arquivo: a politica controla a visibilidade de um campo ja presente,
 * nao o adiciona ao layout.
 */
export const homologationOutcomeVisibility = UiPolicy({
    $id: Now.ID['uip-homologation-outcome-visibility'],
    table: 'sc_req_item',
    shortDescription: 'Shows the homologation outcome only on Software Approval Request items',
    conditions: `cat_item=${softwareApproval}^EQ`,
    active: true,
    onLoad: true,
    global: true,
    reverseIfFalse: true,
    order: 100,
    actions: [
        {
            field: 'u_homologation_outcome',
            visible: true,
            mandatory: false,
            readOnly: false,
        },
    ],
})
