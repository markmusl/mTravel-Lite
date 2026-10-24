# mTravel Lite

> **Versão do mTravel adaptada para a escola.**
> Trabalho individual de Programação de Sistemas, UFCD 0792 — Criação de páginas para a web em hipertexto (12.º ano, turma 12PB2).
> Autor: Mark Muslimov.

O mTravel é o meu diário de viagens: reúne num só lugar as fotografias, as datas e a
música (playlist) de cada destino. O **mTravel Lite** é a mesma ideia e o mesmo design
("liquid glass", cores pastel), mas construído da forma mais simples de ler:
**cada página é um ficheiro HTML**.

**Ver o site:** https://markmusl.github.io/mTravel-Lite/

## O que mudou em relação ao mTravel original

| | mTravel (original) | mTravel Lite |
|---|---|---|
| Páginas | uma só página; o JavaScript troca o conteúdo | um ficheiro HTML por página |
| Navbar e rodapé | carregados com JavaScript (`fetch`) | escritos em cada página (repetidos) |
| Países da galeria | criados por JavaScript a partir de uma lista | escritos em HTML |
| Mudança entre páginas | JavaScript | CSS (`@view-transition`) |
| JavaScript | vários módulos (`import`/`export`) | 3 ficheiros pequenos, sem módulos |
| Estilos | SCSS | SCSS (os mesmos), compilado para `styles.css` |

Repetir a navbar em cada página é de propósito: quem abre `galerie.html` vê logo todo o código.

## Estrutura

```
mTravel-Lite/
├── index.html           página inicial (apresentação, "sobre" e lista de destinos)
├── galerie.html         galeria: uma secção por destino (texto, fonte, playlist, fotografias)
├── mapa.html            mapa-múndi clicável e tabela das viagens
├── registration.html    entrar / criar conta (simulação)
├── styles/scss/         estilos em SCSS (abstracts, base, components, layout, main)
│   └── main/styles.css  o CSS compilado, que as páginas usam
├── scripts/
│   ├── playlist.js      abre e fecha o leitor de playlist
│   ├── mapa.js          ajusta as zonas clicáveis do mapa ao tamanho do ecrã
│   └── registration.js  os três passos do formulário
├── materials/           fonte, ícones, imagens e fotografias
└── tools/               ferramenta opcional para preparar fotografias (ver abaixo)
```

## Como abrir

Duplo clique em `index.html`, ou *Live Server* no VS Code. Não precisa de instalar nada.

## SCSS

Os estilos estão em `styles/scss/`. O `styles.css` é gerado a partir de
`styles/scss/main/styles.scss` (extensão *Live Sass Compiler* do VS Code, ou
`sass styles/scss/main/styles.scss styles/scss/main/styles.css`).
O `styles.css` está no repositório porque o GitHub Pages não compila SCSS.

- `abstracts/` — variáveis (cores, tamanhos, tempos…) e mixins; não produzem CSS.
- `base/` — reset, fonte, corpo da página, títulos e classes utilitárias.
- `components/` — botões, galeria, mapa, formulário, cartão da página inicial.
- `layout/` — navbar, página, secções, rodapé.

Há dois tipos de botão, com a mesma forma: `.button` (preto) e `.liquid-button` (vidro).

## Conteúdos de HTML aplicados

| Tópico | Onde |
|---|---|
| Estrutura da página (`doctype`, `head`, `body`, `lang`, `meta`) | todas as páginas |
| Ligações relativas entre páginas | navbar (`index.html`, `galerie.html`, …) |
| Ligações para locais dentro de uma página (`#id`) | botões dos destinos → `galerie.html#dubai`; "saltar para o conteúdo" |
| Ligações para outros sites (`target="_blank"`) | fontes, redes sociais, créditos do mapa |
| Texto, títulos e caracteres especiais | todas as páginas (UTF-8) |
| Listas (`ul`/`li`) | lista de destinos em `index.html` |
| Imagens (`alt`, `width`, `height`, `loading`) | galeria, logótipo |
| Imagem de fundo e cores | cartão da página inicial, degradados pastel |
| Tabelas (`caption`, `thead`, `tbody`, `tfoot`, `th scope`, `colspan`) | `mapa.html` |
| Mapa de imagem (`<map>`, `<area>`, `usemap`, coordenadas) | `mapa.html` |
| Frames (`<iframe>`) / multimédia | leitor da playlist (Apple Music) na galeria |
| Formulários (`input` de vários tipos, `label`, `submit`) | `registration.html` |

Para além das aulas: variáveis e mixins em SCSS, `grid`/`flexbox`, `backdrop-filter`,
*media queries* (o site adapta-se a telemóvel), `@view-transition`, atributos ARIA,
`loading="lazy"` e redução das fotografias.

## Adicionar fotografias

As fotografias de cada destino ficam em `materials/images/countries/<destino>/`.
Para não escrever dezenas de `<img>` à mão, existe uma ferramenta opcional:

1. `pip3 install pillow` (uma vez)
2. pôr as fotografias originais em `fotos-originais/<destino>/` (por exemplo `fotos-originais/ucrania/`);
   o nome da pasta é o `id` da secção em `galerie.html`
3. `python3 tools/atualizar-fotos.py`

A ferramenta reduz as fotografias a 1400 px, **apaga os metadados (incluindo a localização GPS)** e
escreve as linhas `<img>` em `galerie.html`. A pasta `fotos-originais/` não vai para o GitHub.

## Fontes e referências

Texto dos destinos (cada secção da galeria tem a ligação "fonte"):
[Cazaquistão](https://pt.wikipedia.org/wiki/Cazaquist%C3%A3o) ·
[Astana](https://pt.wikipedia.org/wiki/Astana) ·
[Rússia](https://pt.wikipedia.org/wiki/R%C3%BAssia) ·
[Ucrânia](https://pt.wikipedia.org/wiki/Ucr%C3%A2nia) ·
[Tailândia](https://pt.wikipedia.org/wiki/Tail%C3%A2ndia) ·
[Dubai](https://pt.wikipedia.org/wiki/Dubai) ·
[China](https://pt.wikipedia.org/wiki/China) ·
[Portugal](https://pt.wikipedia.org/wiki/Portugal)

- Mapa-múndi: [Al MacDonald](https://commons.wikimedia.org/wiki/File:World_map_-_low_resolution.svg), Wikimedia Commons, licença [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) (cores e pontos adicionados por mim).
- Fotografias, logótipo e design: Mark Muslimov.
- Playlist: Apple Music (leitor incorporado).
- Fonte tipográfica: ABC Favorit (versão *trial*).

## Validação

O HTML das quatro páginas foi verificado com o [Nu Html Checker](https://validator.w3.org/nu/) (o validador do W3C): sem erros.
O CSS usa `@view-transition` (mudança suave entre páginas), uma funcionalidade nova que o validador de CSS
ainda não conhece; nos browsers que não a suportam (por exemplo o Firefox) a página nova aparece com um fundido simples.

## Notas

- O formulário de `registration.html` é uma simulação (não há servidor). Utilizador de teste:
  `mark@example.com` / `1234567`.
- Contactos: ver as ligações no rodapé.
