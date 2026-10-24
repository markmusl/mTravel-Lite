#!/usr/bin/env python3
"""
Ferramenta opcional: prepara as fotografias e atualiza a galeria (galerie.html).
Não faz parte do site — serve só para poupar trabalho ao adicionar fotografias.

Como usar
  1. pip3 install pillow                (só uma vez)
  2. Põe as fotografias originais em  fotos-originais/<destino>/
     (o nome da pasta é o id da secção em galerie.html: astana, dubai, china, ...)
  3. python3 tools/atualizar-fotos.py

O que faz, para cada destino
  - reduz as fotografias a 1400 px e guarda em materials/images/countries/<destino>/01.jpg, 02.jpg ...
  - remove os metadados (incluindo a localização GPS) — as fotografias ficam públicas
  - escreve as linhas <img> em galerie.html, entre as marcas  <!-- fotos:destino -->  e  <!-- /fotos:destino -->
"""
import re
import shutil
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Falta o Pillow. Instala com:  pip3 install pillow")

RAIZ = Path(__file__).resolve().parent.parent
ORIGINAIS = RAIZ / "fotos-originais"
DESTINO = RAIZ / "materials" / "images" / "countries"
GALERIA = RAIZ / "galerie.html"
LADO_MAXIMO = 1400
EXTENSOES = {".jpg", ".jpeg", ".png", ".webp", ".heic"}


def otimizar(origem: Path, destino: Path):
    """Reduz uma fotografia e grava-a sem metadados. Devolve (largura, altura)."""
    imagem = ImageOps.exif_transpose(Image.open(origem)).convert("RGB")  # endireita a foto
    imagem.thumbnail((LADO_MAXIMO, LADO_MAXIMO))
    imagem.save(destino, quality=78, optimize=True, progressive=True)  # sem EXIF
    return imagem.size


def processar_originais():
    """Passo 1: fotos-originais/<destino>/ -> materials/images/countries/<destino>/NN.jpg"""
    if not ORIGINAIS.is_dir():
        return
    for pasta in sorted(p for p in ORIGINAIS.iterdir() if p.is_dir()):
        fotos = sorted(f for f in pasta.iterdir() if f.suffix.lower() in EXTENSOES)
        if not fotos:
            continue
        saida = DESTINO / pasta.name
        if saida.exists():
            shutil.rmtree(saida)  # recomeça do zero: a numeração fica sempre certa
        saida.mkdir(parents=True)
        for numero, foto in enumerate(fotos, start=1):
            otimizar(foto, saida / f"{numero:02d}.jpg")
        print(f"{pasta.name}: {len(fotos)} fotografias")


def bloco_html(destino: str, nome: str) -> str:
    """Passo 2: o HTML das fotografias de um destino (vazio se não houver fotografias)."""
    pasta = DESTINO / destino
    fotos = sorted(pasta.glob("*.jpg")) if pasta.is_dir() else []
    if not fotos:
        return ""
    linhas = []
    for numero, foto in enumerate(fotos, start=1):
        largura, altura = Image.open(foto).size
        linhas.append(
            f'      <img class="galerie-photo" src="materials/images/countries/{destino}/{foto.name}" '
            f'alt="{nome} — fotografia {numero} de {len(fotos)}" '
            f'width="{largura}" height="{altura}" loading="lazy" decoding="async">'
        )
    return '    <div class="photos-container">\n' + "\n".join(linhas) + "\n    </div>\n    "


def atualizar_galeria():
    html = GALERIA.read_text(encoding="utf-8")

    def substituir(correspondencia):
        destino = correspondencia.group(1)
        titulo = re.search(rf'id="titulo-{destino}">([^<]+)<', html)
        nome = titulo.group(1).capitalize() if titulo else destino
        return f"<!-- fotos:{destino} -->\n    {bloco_html(destino, nome)}<!-- /fotos:{destino} -->"

    novo = re.sub(r"<!-- fotos:(\w+) -->.*?<!-- /fotos:\1 -->", substituir, html, flags=re.S)
    GALERIA.write_text(novo, encoding="utf-8")


processar_originais()
atualizar_galeria()
print("galerie.html atualizada.")
