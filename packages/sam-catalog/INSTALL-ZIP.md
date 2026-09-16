# Instalar pelo ZIP — sem codigo-fonte, sem CLI

O `now-sdk pack` gera um **pacote instalavel** (`sam_catalog_<versao>.zip`) com o mesmo
formato que a plataforma usa para aplicacoes: `scope/sys_app_*.xml`, `update/`,
`dictionary/`, `author_elective_update/` e o manifesto `package_inventory.csv` com os
hashes SHA-256 de cada arquivo.

O ZIP da versao publicada esta em **[Releases](https://github.com/raphcrf/fmatt-pool-demo/releases)**.

> **Estado deste guia:** a Rota A e documentada e ja rodou. A **Rota B ainda nao foi testada
> por nos** — os parametros vieram da leitura do proprio SDK, nao da documentacao da
> ServiceNow, que **nao descreve** instalacao do ZIP fora do CLI. Testar em PDI antes de
> prometer a qualquer cliente. Qualquer resultado do teste volta para este arquivo.

---

## O ZIP ja vem calibrado

O ZIP **nao** e agnostico: ele carrega os valores que estavam em `instance-refs.ts` no
momento do build. Um ZIP construido com os slots vazios instala as ofertas **fora de
qualquer catalogo** e com duas etapas de aprovacao **sem aprovador**.

Ou seja: **um ZIP por instancia**, gerado depois da calibragem do [PLAYBOOK](PLAYBOOK.md).
O ZIP anexado a release e a versao de referencia, boa para testar o mecanismo de
instalacao — nao para entregar a um cliente.

## Rota A — `now-sdk install` (documentada)

Precisa do codigo-fonte e de credencial na instancia alvo.

```bash
npm install && npm run build
npx --no-install now-sdk install -a <alias>
```

O `install` faz `pack` por baixo e envia exatamente o mesmo artefato. Se a instancia
aceita o CLI, nao ha motivo para usar o ZIP.

## Rota B — enviar o ZIP para o processor (a testar)

O que o proprio SDK faz e um POST multipart para `sn_appclient_upload_processor.do`. Dai
que o ZIP pode, em tese, ser instalado com **sessao de admin e nada mais** — sem Node,
sem CLI, sem fonte.

**Pre-requisitos**

- papel `admin` **mais** `sn_appclient.app_client_user`;
- para instancia sem saida para a internet, a property `sn_appclient.app.install.offline`
  igual a `true`;
- SAM Pro ativo (`com.snc.samp`), senao a app instala e nao funciona.

**A requisicao**

```
POST https://<instancia>.service-now.com/sn_appclient_upload_processor.do
  ?sysparm_track_fluent_install=true
  &sysparm_async_fluent_install=false
  &sysparm_fluent_scope_id=f54705066303755ab5405eed473962f5
  &sysparm_fluent_scope_name=global
  &sysparm_fluent_app_version=1.0.0
  &sysparm_request_type=custom_app
```

Corpo `multipart/form-data`:

| Campo | Valor |
|---|---|
| `upload_type` | `file` |
| `load_demo` | `false` |
| `sysparm_ck` | token CSRF da sessao |
| `attachFile` | o arquivo `.zip` |

O `sysparm_ck` e o token da **sessao logada** — nao ha como montar a chamada so com
usuario e senha. O caminho pratico e o navegador: logar na instancia, pegar o token
(`window.g_ck` no console) e enviar dali mesmo, ou usar uma ferramenta que reaproveite o
cookie da sessao.

Resposta esperada: JSON com `executionTracker` (e `rollbackContext`). **Guardar o
`rollbackContext`** — e o ponto de retorno se a instalacao sair errada.

`401` significa papel faltando, nao senha errada.

## Rota C — update set (quando o ZIP nao for aceito)

Instalar numa instancia de desenvolvimento e, de la, **Studio → Publish to Update Set**,
que percorre a lista de arquivos da aplicacao e monta o conjunto completo.

Nao capturar update set na mao: numa medicao nossa o conjunto capturado trouxe **10 de
151** arquivos. Script includes, business rules, colunas de dicionario e variaveis de
catalogo ficam de fora, e cada uma quebra em silencio.

## Conferir depois de instalar, em qualquer rota

Mensagem de sucesso nao prova nada — nesta aplicacao o install ja disse "successfully"
com 2 de 6 flows ativos.

```
sys_hub_flow:  sys_scope=f54705066303755ab5405eed473962f5   -> 7 registros, todos active
sc_cat_item:   sys_scope=f54705066303755ab5405eed473962f5   -> 6 ofertas, com categoria
```

Pelas rotas A e B a app aparece em **`sys_app`**. Vinda do Application Repository, aparece
em **`sys_store_app`** — e app nenhuma deve existir nas duas ao mesmo tempo sob o mesmo
scope id: as duas copias disputam o mesmo registro e a saida passa a exigir `--reinstall`,
que **desinstala antes de instalar** e remove o que nao estiver no pacote local.

Depois: preencher as properties de ambiente, rodar o script de reconciliacao de layout
(`sys_ui_element` nao viaja) e limpar o selo `generation_source` dos flows.

## O que o ZIP nao leva

Catalogo, categoria, user criteria, grupos, o plugin do SAM Pro, spoke, connection e
credential, modelos homologados, mapeamentos e **todo o dado**. Essa lista e a checklist
de entorno antes de instalar numa instancia nova — e boa parte do que faz uma app
"instalar com sucesso" e nao funcionar.
