// Mapa clicável.
// As coordenadas das zonas (<area>) foram medidas para o mapa com 950 px de largura.
// Quando o mapa aparece mais pequeno (telemóvel), multiplicam-se pela escala.

const LARGURA_ORIGINAL = 950;
const mapa = document.getElementById("mapa-mundo");
const zonas = document.querySelectorAll('map[name="mapa-viagens"] area');

// guarda as coordenadas originais de cada zona
const originais = [];
zonas.forEach(function (zona) {
  originais.push(zona.coords.split(",").map(Number));
});

function ajustarZonas() {
  const escala = mapa.clientWidth / LARGURA_ORIGINAL;
  zonas.forEach(function (zona, i) {
    zona.coords = originais[i]
      .map(function (valor) {
        return Math.round(valor * escala);
      })
      .join(",");
  });
}

window.addEventListener("resize", ajustarZonas);
window.addEventListener("load", ajustarZonas);
ajustarZonas();
