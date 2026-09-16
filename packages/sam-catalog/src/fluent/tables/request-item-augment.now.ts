import { Table, StringColumn } from '@servicenow/sdk/core'

export const sc_req_item = Table({
    augments: 'sc_req_item',
    schema: {
        u_homologation_outcome: StringColumn({
            label: 'Homologation outcome',
            maxLength: 40,
            // Sem `dropdown` o campo nasce como TEXTO LIVRE mesmo com `choices`
            // preenchido: declarar escolhas cria os `sys_choice`, mas nao marca
            // `sys_dictionary.choice`, e o formulario renderiza caixa de texto.
            // Os lookups do flow de homologacao comparam por valor exato, entao
            // qualquer coisa digitada a mao perde a decisao.
            //
            // 'dropdown_with_none' porque vazio e estado legitimo: o campo so e
            // preenchido quando a analise termina, e o flow ja trata o vazio.
            dropdown: 'dropdown_with_none',
            choices: {
                approved: 'Approved',
                approved_with_restrictions: 'Approved with restrictions',
                rejected: 'Rejected',
            },
        }),
    },
})
