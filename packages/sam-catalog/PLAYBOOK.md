# Playbook — Software and License Offerings

Calibragem e instalacao numa instancia nova. Uma passada completa leva algumas horas,
a maior parte esperando confirmacao de flow.

Quem instala precisa de: acesso `admin` na instancia alvo, SAM Pro ativo, Node >= 20 e
credencial do Now SDK configurada (ver a skill `sn-connect` se `now-sdk` reclamar de auth).

---

## 1. Conferir a instancia antes de prometer prazo

```bash
npx now-sdk query sys_plugins -q "id=com.snc.samp" -f id,active -a <alias>
```

Sem SAM Pro ativo, **pare aqui**. As ofertas instalam, e nada funciona: `alm_license`
e `samp_sw_subscription` nao existem sem o plugin.

Depois, procurar o que ja existe na instancia e vai colidir ou ajudar:

```bash
npx now-sdk query sc_cat_item -q "nameLIKElicen" -f sys_id,name,active -a <alias>
npx now-sdk query sys_script  -q "collection=sc_req_item^active=true" -f sys_id,name -a <alias>
```

A segunda consulta e a que economiza um dia. Se houver uma business rule global de
mapeamento de variaveis em `sc_req_item` sem guarda, o nome `request_for` na variavel
da oferta de requisicao **tem de ficar como esta** — a explicacao inteira esta no
comentario em `src/fluent/catalog/catalog-items/license-request.now.ts`.

## 2. Levantar os sete valores

Sao **nove slots** com **sete valores distintos**: o sys_id do grupo de Gestao de
Licencas ocupa tres deles, e **nada valida que os tres batem**.

```bash
npx now-sdk query sc_catalog     -q "active=true" -f sys_id,title -a <alias>
npx now-sdk query sc_category    -q "active=true" -f sys_id,title -a <alias>
npx now-sdk query user_criteria  -q "active=true" -f sys_id,name  -a <alias>
npx now-sdk query sys_user_group -q "active=true^nameLIKElicen"   -f sys_id,name -a <alias>
npx now-sdk query cmdb_software_product_model -q "nameLIKEVisio"  -f sys_id,name -a <alias>
npx now-sdk query cmdb_software_product_model -q "nameLIKEProject" -f sys_id,name -a <alias>
```

A tabela de slots, arquivo por arquivo, esta em [package.yml](package.yml) e no
[README](README.md#antes-de-instalar-em-qualquer-instancia).

**Vazio nao e neutro:**

| Slot vazio | Consequencia |
|---|---|
| catalogo / categoria | ofertas instalam fora de qualquer catalogo; ninguem as acha |
| `GROUP_LICENSE_MANAGEMENT` | duas etapas de aprovacao nascem **sem aprovador**, gravado em build — so reinstalando |
| property do grupo | toda fulfillment task nasce sem assignment group |
| `visio_software_model` / `project_software_model` | o transform **rejeita toda linha** do relatorio de uso |

## 3. Calibrar

Editar **apenas** `src/fluent/shared/instance-refs.ts` (os cinco de build) e
`src/fluent/properties/instance-bindings.now.ts` (as duas properties), mais os dois
modelos nos import sets, se o cliente usa Visio/Project.

Nada mais do pacote deve ser editado por implantacao. Precisando mudar logica, a
mudanca nasce no pacote e vira uma versao nova — e nao um fork do cliente.

Os cinco de `instance-refs.ts` **nao podem virar property**: sao gravados no XML do
registro em tempo de build.

## 4. Build e install

```bash
npm install
npm run build
npx --no-install now-sdk install -a <alias>
```

`npm install` nao e opcional: os scripts usam `npx --no-install now-sdk`, que falha se o
pacote local nao estiver la em vez de cair num `now-sdk` global de outra versao. O
`package.json` fixa a 4.9.2, e um global desatualizado compila em silencio.

## 5. Conferir lendo a instancia

**Install "successfully" nao prova nada.** O primeiro install deste projeto passou com
sucesso e 2 de 6 flows ativos.

```bash
npx now-sdk query sys_hub_flow -q "sys_scope=f54705066303755ab5405eed473962f5" \
  -f name,type,active,status -a <alias> -o json
```

Esperado: **7 registros**, 5 `flow` e 2 `subflow`, todos `active=true`.

```bash
npx now-sdk query sc_cat_item -q "sys_scope=f54705066303755ab5405eed473962f5" \
  -f name,active,category -a <alias>
```

Esperado: **6 ofertas**, todas ativas e com categoria preenchida.

O marcador de IA volta em todos os flows a cada install. Limpar com script de background
que zera `generation_source` em `sys_hub_flow` no escopo da aplicacao.

## 6. Ajuste fino, sem rebuild

As quatro properties de comportamento mudam em runtime (`sys_properties`):

| Property | Padrao | Quando mexer |
|---|---|---|
| `manager_approval_enabled` | `false` | cliente exige aprovacao do gestor depois da Gestao de Licencas |
| `entra_add_verify_wait_minutes` | `120` | baixar para demonstrar o ciclo inteiro |
| `entra_remove_verify_wait_minutes` | `60` | idem |
| `software_model_qualifier` | `certified=true^blacklisted=false^status=In Production` | ajustar ao criterio de modelo do cliente |

## 7. Entregar ao cliente

- `@types/` **nunca vai junto**: e o inventario de tabelas da instancia que o gerou.
  Fica fora do git de proposito.
- A promocao de dev para teste e producao segue o processo do cliente. O SDK instala em
  dev; dali em diante e o app repository ou update set **deles**.
- Registrar a implantacao em `package.yml` → `deployments`: cliente, instancia, versao,
  data. **Sem sys_ids.**

## Regras que atravessam tudo

1. **Nunca editar artefato deployado pela UI da instancia.** Toda mudanca nasce no codigo
   e sobe com `npm run build && npx now-sdk install`.
2. **Conferir lendo a instancia.** A mensagem mente; o registro nao.
3. `npx now-sdk query` e somente leitura. Escrita so por script de background, rodado por
   quem tem acesso.
4. Comentarios de codigo em **pt-BR**; logs e strings de UI em **ingles**.
