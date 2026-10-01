/* ---------- Cabeçalho e rodapé (iguais em todas as páginas) ---------- */
const PAGINAS = [["index.html","Buscar ponto"],["impactos.html","Por que importa"],["guia.html","Guia de descarte"],["sobre.html","Sobre"]];
const atual = location.pathname.split("/").pop() || "index.html";

const topo = document.getElementById("topo");
if (topo) topo.innerHTML = `<div class="wrap">
  <a class="marca" href="index.html"><img class="logo-nav" src="img/logo-projeto.png" alt=""><span>Onde Levo?</span></a>
  <button id="menu-toggle" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">☰</button>
  <nav aria-label="Principal"><ul id="menu">${PAGINAS.map(([h,t]) =>
    `<li><a href="${h}" ${h===atual?'aria-current="page"':""}>${t}</a></li>`).join("")}</ul></nav></div>`;

const rodape = document.getElementById("rodape");
if (rodape) rodape.innerHTML = `<div class="wrap rod-wrap"><div class="rod-grade">
    <div class="rod-col rod-parceria">
      <h2>uma colaboração entre</h2>
      <div class="logos">
        <img src="img/logo-onde-levo.png" alt="Logo do projeto Onde Levo?">
        <img src="img/logo-instituto-kaio-martins.jpg" alt="Logo do Instituto Kaio Martins">
        <img src="img/logo-COOPAA-Cooperativa-de-Trabalho-de-Materiais-Recicláveis-Atitude-Ambiental-de-Jardinópolis-e-Região copy.jpg" alt="Logo da COOPAA">
      </div>
    </div>
    <div class="rod-col rod-info">
      <h2>Horários e endereços podem mudar. Confirme antes de ir.</h2>
      <p class="rod-txt">Portal gratuito para ajudar os moradores de Jardinópolis (SP) a descartar resíduos corretamente. Projeto de extensão dos alunos da UniSENAI RP, alinhado aos ODS 11 e 12 da ONU.</p>
      <ul class="rod-links">${PAGINAS.map(([h,t]) => `<li><a href="${h}">${t}</a></li>`).join("")}<li><a href="sobre.html#fontes">Fontes</a></li></ul>
    </div>
  </div></div>`;

// Imagem que não existe ainda: esconde o ícone quebrado e mostra o espaço reservado
document.addEventListener("error", (e) => {
  if (e.target.tagName !== "IMG") return;
  e.target.classList.add("quebrada");
  e.target.closest(".foto")?.classList.add("sem-foto");
}, true);

const toggle = document.getElementById("menu-toggle");
toggle?.addEventListener("click", () => {
  toggle.setAttribute("aria-expanded", document.getElementById("menu").classList.toggle("aberto"));
});

/* ---------- Busca (só na página inicial) ---------- */
const form = document.getElementById("form-busca");
if (form) {
  const selMaterial = document.getElementById("material"), selBairro = document.getElementById("bairro");
  const resultado = document.getElementById("resultado");
  for (const [k, m] of Object.entries(MATERIAIS)) selMaterial.add(new Option(`${m.icone} ${m.nome}`, k));
  for (const [k, n] of Object.entries(BAIRROS)) selBairro.add(new Option(n, k));

  const atende = (p, b) => p.bairros === "todos" || p.bairros.includes(b);
  const cartao = (p) => `<article class="ponto"><h3>📍 ${p.nome}</h3>
    ${p.endereco ? `<p>${p.endereco}</p>` : ""}<p>🕒 ${p.horario}</p>
    ${p.iframe ? `<div class="mapa">${p.iframe}</div>` : ""}</article>`;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const mat = selMaterial.value, bairro = selBairro.value, m = MATERIAIS[mat];
    const achados = PONTOS.filter((p) => p.materiais.includes(mat)).sort((a, b) => atende(b, bairro) - atende(a, bairro));
    resultado.innerHTML = `<p class="dica">${m.dica}</p>` + (achados.length ? achados.map(cartao).join("")
      : `<p class="vazio">Ainda não cadastramos pontos para este material. Consulte a Secretaria de Meio Ambiente.</p>`);
    resultado.hidden = false;
    resultado.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
