# 4Matt Pool de Entregaveis — demo

Catalogo de aplicacoes ServiceNow **agnosticas de cliente**, escritas com o Now SDK
(Fluent), versionadas aqui e instalaveis em qualquer instancia depois de uma calibragem
documentada.

> Repositorio de **demonstracao**, na conta pessoal. A versao definitiva vai para a
> organizacao do GitHub da 4Matt.

## Pacotes

| Pacote | O que faz | Escopo | Status |
|---|---|---|---|
| [sam-catalog](packages/sam-catalog) | Ciclo de licencas de software sobre SAM Pro: 6 ofertas de catalogo, 5 flows, 2 subflows | global | `active` |

## Como usar um pacote

```bash
cd packages/<pacote>
npm install
# calibrar conforme o PLAYBOOK.md do pacote
npm run build
npx --no-install now-sdk install -a <alias-da-instancia>
```

Cada pacote traz tres arquivos que dizem tudo:

- **`README.md`** — o que a aplicacao faz e como ela e construida
- **`PLAYBOOK.md`** — calibragem por cliente, instalacao e verificacao
- **`package.yml`** — metadados que o CI e o portal leem: versao, plugins exigidos,
  slots de configuracao, releases testadas, implantacoes e, obrigatoriamente, **o que o
  pacote entrega** (`delivers`), **o que nao viaja junto** (`requires_environment`) e **o
  que ajustar depois do install** (`post_install`)

## Regras do pool

1. **Nada de cliente entra aqui.** Sem sys_id de instancia, sem URL de instancia, sem
   nome de cliente, sem dado exportado. O CI barra as tres primeiras coisas.
2. **Correcao nasce no pacote** e desce para as implantacoes. O caminho inverso — corrigir
   so na implantacao — e como o codigo reutilizavel morre.
3. **Config separada de codigo.** Todo valor que muda por cliente vive num arquivo de
   calibragem ou numa property, nunca espalhado pela logica.
4. **Aplicacao custom em escopo global**, nao customizacao solta no global. Uma aplicacao
   por pacote, com `scopeId` proprio e fixo.
5. **Nunca editar artefato deployado pela UI.** Toda mudanca nasce no codigo.
6. **Cada pacote tem dono**, declarado em `package.yml`.

## Por que aplicacao global, e nao escopo proprio

Trabalho de SAM/HAM mexe em tabelas globais (`sc_cat_item`, `alm_*`, flows) que um app
com escopo proprio nao alcanca sem cross-scope. O preco e conhecido e esta nas regras:

- app global nao tem identidade de escopo — todas aparecem como `global`, e so o `sys_id`
  distingue uma da outra; dai o `scopeId` fixo por pacote;
- `now-sdk download` e `init --from` **recusam** app de escopo global. **O GitHub e a
  fonte da verdade**, nunca a instancia;
- dois projetos Fluent instalados contra o mesmo `sys_app` misturam `sys_module`. Um
  pacote, uma aplicacao;
- layout de formulario (`sys_ui_element`) **nao viaja** com o app: e passo de playbook;
- nao ha protecao em runtime — admin do cliente pode editar um artefato, e a versao
  seguinte sobrescreve. Por isso o playbook manda mudar **config**, nao registro.

## Adicionar um pacote

1. `packages/<id>/` com o projeto Fluent, `README.md`, `PLAYBOOK.md` e `package.yml`
   — o README abre com **"O que voce recebe ao instalar"**, e o mesmo inventario vai
   estruturado no `package.yml`, que e o que o portal publica
2. Zerar os valores de instancia e passar no lint (`scripts/lint-package.sh`)
3. Instalar e calibrar numa PDI limpa, seguindo **so** o playbook. Se nao der, o playbook
   esta incompleto — e esse e o teste
4. Tag `<id>/vX.Y.Z` e uma release

## O que ainda nao existe

- portal gerado a partir dos `package.yml` (GitHub Pages)
- segundo pacote, para provar que o padrao serve a mais de uma aplicacao
- definicao de licenca e de propriedade intelectual antes de qualquer uso com cliente
