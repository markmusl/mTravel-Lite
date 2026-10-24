// Playlist do Apple Music na galeria.
// Ao passar o rato (ou ao carregar no botão) abre o leitor e desfoca o fundo.

const overlay = document.getElementById("overlay");

document.querySelectorAll(".info-right").forEach(function (bloco) {
  const botao = bloco.querySelector(".playlist-button");
  const janela = bloco.querySelector(".playlist-window");
  const icone = bloco.querySelector(".button-icon");

  function abrir() {
    // o leitor só é carregado na primeira vez que se abre (poupa dados)
    if (!janela.src) {
      janela.src = janela.dataset.src;
    }
    janela.classList.remove("is-hidden");
    botao.classList.add("is-active");
    botao.setAttribute("aria-expanded", "true");
    icone.src = "materials/icons/chevron.down.svg";
    overlay.classList.remove("is-hidden");
  }

  function fechar() {
    janela.classList.add("is-hidden");
    botao.classList.remove("is-active");
    botao.setAttribute("aria-expanded", "false");
    icone.src = "materials/icons/chevron.up.svg";
    overlay.classList.add("is-hidden");
  }

  // rato: abre ao entrar, fecha ao sair
  bloco.addEventListener("mouseenter", abrir);
  bloco.addEventListener("mouseleave", fechar);

  // teclado e ecrãs tácteis: o botão abre e fecha
  botao.addEventListener("click", function () {
    if (botao.getAttribute("aria-expanded") === "true") {
      fechar();
    } else {
      abrir();
    }
  });

  // a tecla Escape fecha o leitor
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
      fechar();
    }
  });
});
