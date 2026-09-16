import {
    CatalogItem,
    ReferenceVariable,
    MultiLineTextVariable,
    SelectBoxVariable,
    DateVariable,
    CheckboxVariable,
    YesNoVariable,
    RequestedForVariable,
} from '@servicenow/sdk/core'
import { SERVICE_CATALOG_SYS_ID, CATEGORY, USER_CRITERIA, TABLE } from '../../shared/instance-refs'

export const licenseRequest = CatalogItem({
    $id: Now.ID['ci-license-request'],
    name: 'Software License Request',
    shortDescription: 'Request a license for an approved software product',
    description:
        'Use this offering to request a license for a software product already approved for use. The request is validated against license availability and approved by your manager and by the software owner.',

    catalogs: [SERVICE_CATALOG_SYS_ID],
    categories: [CATEGORY.software],
    availableFor: [USER_CRITERIA.allEmployees],

    flow: Now.ref('sys_hub_flow', 'flow-license-request'),

    availability: 'both',
    requestMethod: 'submit',
    hideAddToCart: true,

    variables: {

        // O nome e `request_for`, sem o "ed", e isso NAO e erro de digitacao.
        //
        // Algumas instancias tem uma business rule global de mapeamento de
        // variaveis, before insert em sc_req_item com filtro `cat_itemISNOTEMPTY`
        // — ou seja, roda para todo RITM de todo item de catalogo — cuja primeira
        // linha e:
        //
        //     current.setValue("requested_for", current.variables.request_for);
        //
        // Sem guarda. Item cujo formulario nao tem uma variavel chamada
        // `request_for` recebe `undefined` coagido para string dentro do campo
        // sc_req_item.requested_for, que entao aparece vazio na tela porque nenhum
        // sys_user casa com esse valor. A regra nao e desta aplicacao.
        //
        // O tipo continua sendo RequestedForVariable (type 31), e isso importa: e o
        // TIPO que alimenta sc_request.requested_for no REQ, e o NOME que a
        // business rule procura para alimentar o RITM. Manter este nome e inofensivo
        // nas instancias que nao tem a regra, e necessario nas que tem.
        //
        // Na calibragem, conferir se a instancia alvo tem essa business rule: se ela
        // ganhou guarda ou nao existe, o nome pode voltar a ser `requested_for`.
        request_for: RequestedForVariable({
            question: 'Requested for',
            referenceQualCondition: 'active=true',
            mandatory: true,
            order: 50,
        }),
        software_model: ReferenceVariable({
            question: 'Requested software',
            referenceTable: TABLE.softwareModel,

            useReferenceQualifier: 'advanced',
            referenceQual: 'javascript:gs.getProperty("software_license_offerings.software_model_qualifier")',
            mandatory: true,
            order: 100,
        }),
        request_justification: MultiLineTextVariable({
            question: 'Justification',
            helpText: 'Explain why this software is required for your work.',
            mandatory: true,
            order: 200,
        }),
        usage_duration: SelectBoxVariable({
            question: 'Is this need temporary or permanent?',
            mandatory: true,
            order: 300,
            choices: {
                temporary: { label: 'Temporary', sequence: 1 },
                permanent: { label: 'Permanent', sequence: 2 },
            },
            includeNone: true,
        }),

        cost_center: ReferenceVariable({
            question: 'Cost center',
            referenceTable: 'cmn_cost_center',
            useDynamicDefault: true,
            dependentQuestion: 'request_for',
            dotWalkPath: 'cost_center',
            hidden: true,
            order: 400,
        }),
        different_cost_center: YesNoVariable({
            question: 'Is a different cost center responsible for this charge?',
            defaultValue: 'No',
            mandatory: true,
            order: 420,
        }),

        alternate_cost_center: ReferenceVariable({
            question: 'Which cost center should be charged?',
            referenceTable: 'cmn_cost_center',
            useReferenceQualifier: 'simple',
            referenceQualCondition: 'active=true',
            order: 440,
        }),
        required_by_date: DateVariable({
            question: 'Date the software is needed by',
            mandatory: true,
            order: 500,
        }),

        usage_end_date: DateVariable({
            question: 'Expected end date',
            helpText: 'When do you expect to stop needing this software?',
            hidden: true,
            order: 550,
        }),
        additional_notes: MultiLineTextVariable({
            question: 'Additional notes',
            order: 600,
        }),

        acknowledge_purchase: CheckboxVariable({
            question: 'I understand that a purchase request will be raised and this may incur cost',
            hidden: true,
            order: 700,
        }),
    },
})
