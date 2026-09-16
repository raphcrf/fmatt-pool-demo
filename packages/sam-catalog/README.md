# Software and License Offerings

Aplicacao ServiceNow SAM Pro escrita com `@servicenow/sdk` (Fluent), escopo **global**.
Seis ofertas de catalogo, cinco flows e dois subflows: requisicao de licenca,
homologacao de software, atualizacao de versao ou edicao, devolucao de licenca,
importacao de relatorio de uso e requisicao de compra.

Este pacote e o **produto**, instalavel em qualquer instancia depois da calibragem
descrita em [PLAYBOOK.md](PLAYBOOK.md). Nasceu como copia de uma implantacao real e
foi limpo de tudo que era especifico dela — veja [Origem](#origem).

## O que voce recebe ao instalar

### As seis ofertas de catalogo

| Oferta | Para que serve | Atendimento |
|---|---|---|
| **Software License Request** | pedir licenca de um software ja homologado | `Software License Request - Fulfillment` |
| **Software Approval Request** | homologar um software novo, com parecer de seguranca | `Software Approval Request - Review` |
| **Software Version or Edition Upgrade** | subir versao ou edicao de uma licenca existente | `Software Version Upgrade - Fulfillment` |
| **Software License Return** | devolver licenca e liberar o seat para o pool | `Software License Return - Fulfillment` |
| **Software Usage Report Import** | subir relatorio de uso (M365, Autodesk, Visio, Project) | `Software Usage Report Import - Processing` |
| **Software Purchase Request** | pedir compra do que nao existe em contrato | atendimento manual |

As ofertas usam quatro **variable sets** compartilhados — Software Information, Licensing
Information, Technical Information e Business Justification — mais **7 client scripts** e
**6 UI policies** de catalogo (validacao de datas, justificativa, centro de custo, motivo de
devolucao, alvo de upgrade, origem do relatorio).

Quem enxerga as ofertas: o user criteria **License Management Team**.

### Automacao

- **5 flows**, um por oferta com atendimento automatico
- **2 subflows**: `Software License Fulfillment Backbone` (o caminho comum de atendimento) e
  `Entra Removal After Allocation Delete`
- **3 actions**: `Provision Entra Group Membership`, `Release License Allocation`,
  `Process Software Usage Report`
- **1 business rule**: remove do grupo do Entra quando a alocacao e apagada
- **1 notificacao**: pedido de aprovacao

### Modelo de dados

**Tabelas novas**

| Tabela | Para que |
|---|---|
| `u_software_entra_group` | de-para entre modelo de software e grupo do Entra |
| `u_software_usage_offering_map` | de-para entre linha de relatorio de uso e oferta |
| `u_software_usage_import` | staging do importador universal |
| `u_autodesk_usage_import` · `u_visio_usage_import` · `u_project_usage_import` | staging por fornecedor |

**Colunas acrescentadas a tabelas OOB** — acrescentadas, nunca alterando registro existente:

| Tabela | Colunas |
|---|---|
| `sc_req_item` | `u_homologation_outcome` |
| `cmdb_software_product_model` | `u_ad_group` |
| `samp_sw_subscription` | `u_seat_assignment`, `u_unassigned_date`, `u_access_option`, `u_days_used`, `u_monthly_average` |

### Codigo de servidor

**4 script includes**: `SoftwareLicenseCatalogUtils`, `SoftwareLicenseAvailability` (AJAX de
disponibilidade no formulario), `EntraGroupProvisioner`, `UniversalUsageImporter`.

### Configuracao

**8 system properties** com o prefixo `software_license_offerings.` — duas apontam grupos, duas
apontam modelos de software, quatro ajustam comportamento (aprovacao do gestor, dois tempos de
verificacao do Entra e o qualifier de modelo). A tabela completa esta na
[secao de calibragem](#antes-de-instalar-em-qualquer-instancia).

### Testes

Testes ATF cobrindo a submissao das seis ofertas, o caminho de aprovacao com gestor e o
comportamento dos importadores de uso.

## O que **nao** vem junto

Nada disto viaja com a aplicacao, e cada item e pre-requisito de funcionamento:

- **Plugin SAM Pro** (`com.snc.samp`) — dono de `alm_license`, `alm_entitlement` e
  `samp_sw_subscription`
- **Catalogo, categoria, user criteria e grupos** — sao referenciados por sys_id, nao criados
- **Spoke, connection e credential** do Entra, e o registro do lado do IdP
- **Dado**: modelos homologados, entitlements, de-para de uso, valores das properties

## O que precisa de ajuste depois de instalar

1. Preencher as properties de ambiente (grupos e modelos)
2. Vincular as ofertas ao catalogo e a categoria, se a instalacao veio por update set
3. Rodar o script de reconciliacao de layout — `sys_ui_element` **nao** viaja
4. Limpar o selo `generation_source` dos flows, reposto a cada install do SDK
5. Conferir lendo a instancia: **7 flows ativos** e **6 ofertas com categoria**

Passo a passo em [PLAYBOOK.md](PLAYBOOK.md); rotas de instalacao em [INSTALL-ZIP.md](INSTALL-ZIP.md).

## Do zero a um build valido

```bash
npm install
npm run build
```

`npm install` nao e opcional. Os scripts usam `npx --no-install now-sdk`, que **falha**
se o pacote local nao estiver la, em vez de cair num `now-sdk` global de outra versao —
o `package.json` fixa a 4.9.2 e um global desatualizado compila em silencio.

`@types/` e gerado contra uma instancia por `npm run types -- -a <alias>` e **nunca deve
ser entregue a um cliente**: e o inventario de tabelas da instancia que o gerou. Fica
fora do git de proposito. Se rodar `npm run types`, apague `tables.modules.d.ts` e
`fluent/global/keys.ts` antes de empacotar a pasta — nenhum dos dois e necessario para
compilar, e juntos sao mais de 9 MB do schema alheio.

## Antes de instalar em qualquer instancia

Sao **nove slots** com **sete valores distintos** — o sys_id do grupo de Gestao de
Licencas ocupa tres deles, e nada valida que os tres batem.

```bash
npx now-sdk query sc_catalog      -q "active=true" -f sys_id,title -a <alias>
npx now-sdk query sc_category     -q "active=true" -f sys_id,title -a <alias>
npx now-sdk query user_criteria   -q "active=true" -f sys_id,name  -a <alias>
npx now-sdk query sys_user_group  -q "active=true" -f sys_id,name  -a <alias>
npx now-sdk query cmdb_software_product_model -q "nameLIKEVisio"   -f sys_id,name -a <alias>
```

| Arquivo | Slot | O que e |
|---|---|---|
| `src/fluent/shared/instance-refs.ts` | `SERVICE_CATALOG_SYS_ID` | catalogo onde as ofertas aparecem |
| | `CATEGORY.software` | categoria dentro do catalogo |
| | `GROUP.licenseManagement` | grupo de Gestao de Licencas |
| | `GROUP_LICENSE_MANAGEMENT` | **o mesmo sys_id acima**, como constante plana |
| | `USER_CRITERIA.allEmployees` | quem enxerga as ofertas |
| `src/fluent/properties/instance-bindings.now.ts` | `group_license_management` | **o mesmo sys_id**, como property |
| | `group_information_security` | grupo do parecer de seguranca |
| `src/fluent/import-sets/visio-usage-import.now.ts` | `visio_software_model` | modelo do Visio |
| `src/fluent/import-sets/project-usage-import.now.ts` | `project_software_model` | modelo do Project |

Os cinco de `instance-refs.ts` **nao podem virar property**: sao gravados no XML do
registro em tempo de build. Os quatro restantes sao properties e mudam sem rebuild.

**Vazio nao e neutro:**

- sem catalogo e categoria, as ofertas instalam fora de qualquer catalogo e ninguem as acha;
- sem `GROUP_LICENSE_MANAGEMENT`, duas etapas de aprovacao nascem **sem aprovador** — e
  esta e gravada em build, entao nao tem conserto sem reinstalar;
- sem a property do grupo, toda fulfillment task nasce sem assignment group;
- sem `visio_software_model` / `project_software_model`, o transform **rejeita toda linha**
  dos relatorios de uso correspondentes.

## Depois de instalar

Instalacao bem-sucedida nao implica nada. Conferir lendo a instancia:

```bash
npx now-sdk query sys_hub_flow -q "sys_scope=f54705066303755ab5405eed473962f5" -f name,type,active,status -a <alias> -o json
```

Esperado: **7 registros**, 5 `flow` e 2 `subflow`, todos `active=true`. O primeiro install
deste projeto passou com "successfully" e 2 de 6 flows ativos.

O marcador de IA volta em todos os flows a cada install. Limpar com um script de
background que zera `generation_source` em `sys_hub_flow` no escopo da aplicacao.

## Origem

Este pacote tem `scopeId` **proprio** (`f54705066303755ab5405eed473962f5`) e nenhum sys_id
de registro em comum com as implantacoes feitas em cliente. Pacote e implantacao podem
coexistir na mesma instancia, e instalar daqui com o alias errado **nao** danifica a
instalacao de la.

Nem sempre foi assim: os dois pacotes ja compartilharam o mesmo `scopeId`, e o `keys.ts`
era um ledger comum — cada build de um lado marcava as chaves m2m do outro como apagadas,
e o `dist/` saia com 37 XMLs `action="DELETE"` carregando sys_ids reais.

**Regra do pool:** correcao nasce aqui, no pacote, e desce para as implantacoes. O caminho
inverso — corrigir na implantacao e nunca trazer de volta — e como o codigo reutilizavel
morre. Nao ha merge automatico entre pacote e implantacao.

## Regras de trabalho

1. **Nunca editar artefato deployado pela UI da instancia.** Toda mudanca nasce no codigo
   e sobe com `npm run build && npx now-sdk install -a <alias>`.
2. **Conferir lendo a instancia** depois de instalar. A mensagem mente; o registro nao.
3. `npx now-sdk query` e somente leitura. Nao ha como executar script na instancia pelo
   CLI — teste de servidor vive em ATF, ou num harness local.
4. Comentarios de codigo em **pt-BR**; logs e strings de UI em **ingles**.
