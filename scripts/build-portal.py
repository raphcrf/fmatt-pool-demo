#!/usr/bin/env python3
"""Gera o portal estatico em docs/ a partir dos package.yml.

Fonte unica: packages/<id>/package.yml. Nada aqui e escrito a mao —
para mudar o portal, mude o metadado ou este gerador.

    python3 scripts/build-portal.py
"""
import html
import pathlib
import sys

import yaml

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
REPO = "https://github.com/raphcrf/fmatt-pool-demo"
BLOB = f"{REPO}/blob/main"

CSS = """
:root{--bg:#fbfbfa;--panel:#fff;--ink:#1b1b19;--muted:#6b6b66;--line:#e5e4e0;
--accent:#1c6e5a;--accent-soft:#e8f2ef;--warn:#8a5a00;--warn-soft:#fdf3e0}
@media (prefers-color-scheme:dark){:root{--bg:#161715;--panel:#1e201d;--ink:#eceae4;
--muted:#9b9a93;--line:#32342f;--accent:#7fd1b5;--accent-soft:#1d2e29;--warn:#e0b25f;--warn-soft:#2e2718}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);
font:16px/1.6 ui-sans-serif,-apple-system,"Segoe UI",Roboto,sans-serif}
.wrap{max-width:860px;margin:0 auto;padding-block:56px;padding-left:20px;padding-right:20px}
a{color:var(--accent)}
h1{font-size:1.9rem;margin:0 0 6px;letter-spacing:-.02em}
h2{font-size:1.15rem;margin:40px 0 12px;letter-spacing:-.01em}
h3{font-size:.95rem;margin:24px 0 8px}
.lede{color:var(--muted);margin:0 0 8px;max-width:62ch}
.crumb{font-size:.85rem;color:var(--muted);margin:0 0 20px}
.card{display:block;background:var(--panel);border:1px solid var(--line);border-radius:12px;
padding:20px;margin:14px 0;text-decoration:none;color:inherit}
.card:hover{border-color:var(--accent)}
.card h3{margin:0 0 6px;font-size:1.05rem;color:var(--accent)}
.card p{margin:0;color:var(--muted);font-size:.92rem}
.tags{margin-top:12px;display:flex;flex-wrap:wrap;gap:6px}
.tag{font-size:.75rem;padding:2px 9px;border-radius:99px;background:var(--accent-soft);
color:var(--accent);white-space:nowrap}
.tag.n{background:transparent;border:1px solid var(--line);color:var(--muted)}
.scroll{overflow-x:auto;margin:12px 0}
table{border-collapse:collapse;width:100%;font-size:.88rem;min-width:600px}
td code{white-space:normal;word-break:break-word}
td:first-child{width:30%}
th,td{text-align:left;padding:9px 12px;border-bottom:1px solid var(--line);vertical-align:top}
th{font-weight:600;color:var(--muted);font-size:.78rem;text-transform:uppercase;letter-spacing:.04em}
code{font:.85em ui-monospace,SFMono-Regular,Menlo,monospace;background:var(--accent-soft);
padding:1px 5px;border-radius:4px}
pre{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:14px;
overflow-x:auto;font-size:.85rem}
pre code{background:none;padding:0}
.note{background:var(--warn-soft);border-left:3px solid var(--warn);border-radius:0 8px 8px 0;
padding:12px 16px;margin:20px 0;font-size:.9rem}
.req{color:var(--warn);font-weight:600}
footer{margin-top:56px;padding-top:20px;border-top:1px solid var(--line);
color:var(--muted);font-size:.82rem}
ul{padding-left:20px}li{margin:4px 0}
"""

def e(v):
    return html.escape(str(v if v is not None else ""))

def page(title, body):
    return (
        f"<!doctype html><html lang=pt-BR><meta charset=utf-8>"
        f'<meta name=viewport content="width=device-width,initial-scale=1">'
        f"<title>{e(title)}</title><style>{CSS}</style>"
        f'<div class=wrap>{body}<footer>Gerado de <code>packages/*/package.yml</code> por '
        f'<code>scripts/build-portal.py</code> &middot; <a href="{REPO}">repositorio</a>'
        f"</footer></div></html>"
    )

def load():
    out = []
    for f in sorted((ROOT / "packages").glob("*/package.yml")):
        d = yaml.safe_load(f.read_text())
        d["_dir"] = f.parent.name
        out.append(d)
    return out

def index(pkgs):
    cards = []
    for p in pkgs:
        tags = [f'<span class=tag>escopo {e(p.get("scope"))}</span>',
                f'<span class="tag n">v{e(p.get("version"))}</span>',
                f'<span class="tag n">{e(p.get("status"))}</span>']
        for pl in (p.get("requires") or {}).get("plugins") or []:
            tags.append(f'<span class="tag n">{e(pl)}</span>')
        n = len(p.get("config") or [])
        tags.append(f'<span class="tag n">{n} slots de calibragem</span>')
        cards.append(
            f'<a class=card href="{e(p["_dir"])}.html"><h3>{e(p.get("name"))}</h3>'
            f'<p>{e((p.get("summary") or "").strip())}</p>'
            f'<div class=tags>{"".join(tags)}</div></a>'
        )
    body = (
        "<h1>Pool de Entregaveis</h1>"
        "<p class=lede>Aplicacoes ServiceNow agnosticas de cliente, escritas com o Now SDK, "
        "instalaveis em qualquer instancia depois de uma calibragem documentada.</p>"
        '<div class=note>Demonstracao, em conta pessoal. A versao definitiva vai para a '
        "organizacao do GitHub da 4Matt.</div>"
        f"<h2>Pacotes ({len(pkgs)})</h2>" + "".join(cards) +
        "<h2>Como usar</h2><pre><code>git clone " + REPO + ".git\n"
        "cd fmatt-pool-demo/packages/&lt;pacote&gt;\nnpm install\n"
        "# calibrar conforme o PLAYBOOK.md do pacote\nnpm run build\n"
        "npx --no-install now-sdk install -a &lt;alias&gt;</code></pre>"
        "<h2>Regras do pool</h2><ul>"
        "<li>Nada de cliente entra: sem sys_id, sem URL de instancia, sem nome de cliente. O CI barra.</li>"
        "<li>Correcao nasce no pacote e desce para as implantacoes, nunca o contrario.</li>"
        "<li>Config separada de codigo: o que muda por cliente vive em arquivo de calibragem ou property.</li>"
        "<li>Aplicacao custom em escopo global, uma por pacote, com <code>scopeId</code> proprio e fixo.</li>"
        "<li>Nunca editar artefato deployado pela UI da instancia.</li>"
        "<li>Cada pacote tem dono, declarado em <code>package.yml</code>.</li></ul>"
    )
    return page("Pool de Entregaveis", body)

def detail(p):
    d = p["_dir"]
    req = p.get("requires") or {}
    rows = []
    for c in p.get("config") or []:
        mark = ('<span class=req>obrigatorio</span>' if c.get("required")
                else '<span style="color:var(--muted)">opcional</span>')
        kind = "build" if c.get("kind") == "build" else "property"
        short = (c.get("file") or "").replace("src/fluent/", "")
        rows.append(f"<tr><td><code>{e(c.get('key'))}</code></td><td>{e(c.get('what'))}</td>"
                    f"<td>{kind}<br>{mark}</td>"
                    f"<td><code>{e(short)}</code></td></tr>")
    tun = "".join(f"<li><code>{e(t)}</code></li>" for t in p.get("tunables") or [])
    plugins = ", ".join(f"<code>{e(x)}</code>" for x in req.get("plugins") or []) or "&mdash;"
    rel = ", ".join(e(x) for x in req.get("releases_tested") or []) or "nenhuma registrada"
    touches = "".join(f"<li><code>{e(t)}</code></li>" for t in p.get("touches") or [])
    deps = p.get("deployments") or []
    dep_html = ("<p class=lede>Nenhuma implantacao registrada.</p>" if not deps else
                "<ul>" + "".join(f"<li>{e(x)}</li>" for x in deps) + "</ul>")
    body = (
        f'<p class=crumb><a href="index.html">Pool de Entregaveis</a> / {e(p.get("name"))}</p>'
        f'<h1>{e(p.get("name"))}</h1>'
        f'<p class=lede>{e((p.get("summary") or "").strip())}</p>'
        f'<div class=tags><span class=tag>escopo {e(p.get("scope"))}</span>'
        f'<span class="tag n">v{e(p.get("version"))}</span>'
        f'<span class="tag n">{e(p.get("status"))}</span>'
        f'<span class="tag n">dono: {e(p.get("owner"))}</span></div>'
        f"<h2>Requisitos</h2><ul><li>Plugins: {plugins}</li>"
        f"<li>Now SDK: <code>{e(req.get('sdk'))}</code> &middot; Node <code>{e(req.get('node'))}</code></li>"
        f"<li>Releases validadas: {rel}</li>"
        f"<li><code>scopeId</code>: <code>{e(p.get('scope_id'))}</code></li></ul>"
        f"<h2>Calibragem</h2>"
        f"<p class=lede>{len(p.get('config') or [])} slots. Os de tipo <em>build</em> sao gravados no "
        f"XML do registro e exigem rebuild; os de tipo <em>property</em> mudam em runtime.</p>"
        f"<div class=scroll><table><tr><th>Slot</th><th>O que e</th><th>Tipo</th>"
        f"<th>Arquivo (em <code>src/</code>)</th></tr>{''.join(rows)}</table></div>"
        f'<div class=note>Vazio nao e neutro: sem catalogo e categoria as ofertas instalam fora de '
        f"qualquer catalogo, e sem o grupo de Gestao de Licencas duas etapas de aprovacao nascem "
        f"sem aprovador &mdash; gravado em build, so reinstalando.</div>"
        f"<h2>Ajustaveis sem rebuild</h2><ul>{tun}</ul>"
        f"<h2>Tabelas que a aplicacao toca</h2><ul>{touches}</ul>"
        f"<h2>Implantacoes</h2>{dep_html}"
        f'<h2>Baixar</h2><p class=lede>O ZIP instalavel de cada versao sai na release. '
        f'Ele carrega a calibragem do build, entao o anexado aqui serve para testar o '
        f'mecanismo de instalacao, nao para entregar a cliente.</p><ul>'
        f'<li><a href="{REPO}/releases">Releases</a> &mdash; pacote <code>.zip</code> por versao</li>'
        f'<li><a href="{BLOB}/packages/{d}/INSTALL-ZIP.md">INSTALL-ZIP.md</a> &mdash; as tres rotas de instalacao</li></ul>'
        f"<h2>Documentacao</h2><ul>"
        f'<li><a href="{BLOB}/packages/{d}/PLAYBOOK.md">PLAYBOOK.md</a> &mdash; calibragem, instalacao e verificacao</li>'
        f'<li><a href="{BLOB}/packages/{d}/README.md">README.md</a> &mdash; o que a aplicacao faz</li>'
        f'<li><a href="{BLOB}/packages/{d}/package.yml">package.yml</a> &mdash; a fonte desta pagina</li>'
        f'<li><a href="{REPO}/tree/main/packages/{d}">codigo</a></li></ul>'
    )
    return page(p.get("name", d), body)

def main():
    pkgs = load()
    if not pkgs:
        sys.exit("nenhum package.yml encontrado em packages/*/")
    DOCS.mkdir(exist_ok=True)
    (DOCS / ".nojekyll").write_text("")
    (DOCS / "index.html").write_text(index(pkgs))
    for p in pkgs:
        (DOCS / f"{p['_dir']}.html").write_text(detail(p))
    print(f"portal gerado: {len(pkgs)} pacote(s) em docs/")

if __name__ == "__main__":
    main()
