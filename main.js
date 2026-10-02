/* ---------- Cabeçalho e rodapé (iguais em todas as páginas) ---------- */
const PAGINAS = [["index.html","Buscar ponto"],["impactos.html","A importância do descarte correto"],["guia.html","Guia de descarte"],["sobre.html","Sobre"]];
const atual = location.pathname.split("/").pop() || "index.html";

document.body.insertAdjacentHTML("afterbegin", '<a class="pular" href="#conteudo">Pular para o conteúdo</a>');
const topo = document.getElementById("topo");
if (topo) topo.innerHTML = `<div class="wrap">
  <a class="marca" href="index.html"><img class="logo-nav" src="img/logo-onde-levo-sembg.png" alt=""><span>Onde Levo?</span></a>
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
        <img src="img/logo-coopaa.jpg" alt="Logo da COOPAA">
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
  const aberto = document.getElementById("menu").classList.toggle("aberto");
  toggle.setAttribute("aria-expanded", aberto);
  toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.getElementById("menu")?.classList.contains("aberto")) toggle.click();
});

/* ---------- Busca (só na página inicial) ---------- */
const form = document.getElementById("form-busca");
if (form) {
  const selMaterial = document.getElementById("material");
  const inp = document.getElementById("bairro"), lista = document.getElementById("bairro-lista"), msg = document.getElementById("bairro-msg");
  const resultado = document.getElementById("resultado");
  for (const [k, m] of Object.entries(MATERIAIS)) selMaterial.add(new Option(`${m.icone} ${m.nome}`, k));

  /* --- Campo de bairro com pesquisa (ignora acentos e maiúsculas, acha em qualquer parte do nome) --- */
  const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const itens = Object.entries(BAIRROS).map(([k, n]) => ({ k, n, nn: norm(n) })).sort((a, b) => a.n.localeCompare(b.n, "pt-BR"));
  let bairroSel = "", ativo = -1, visiveis = [];

  const filtrar = () => { const t = norm(inp.value).split(/\s+/).filter(Boolean); visiveis = itens.filter((i) => t.every((w) => i.nn.includes(w))); };
  const abrir = () => {
    filtrar(); ativo = -1;
    lista.innerHTML = visiveis.length
      ? visiveis.map((i, x) => `<li role="option" id="op${x}" data-k="${i.k}">${i.n}</li>`).join("")
      : `<li class="sem" role="option" aria-disabled="true">Nenhum bairro encontrado. Veja o mapa abaixo.</li>`;
    lista.hidden = false; inp.setAttribute("aria-expanded", "true");
  };
  const fechar = () => { lista.hidden = true; inp.setAttribute("aria-expanded", "false"); inp.removeAttribute("aria-activedescendant"); ativo = -1; };
  const escolher = (i) => { bairroSel = i.k; inp.value = i.n; msg.textContent = ""; fechar(); };
  const destacar = (x) => {
    [...lista.children].forEach((li, j) => li.classList.toggle("ativo", j === x)); ativo = x;
    if (x >= 0) { inp.setAttribute("aria-activedescendant", "op" + x); lista.children[x].scrollIntoView({ block: "nearest" }); }
  };

  inp.addEventListener("input", () => { bairroSel = ""; msg.textContent = ""; abrir(); });
  inp.addEventListener("focus", abrir);
  inp.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); if (lista.hidden) abrir(); destacar(Math.min(ativo + 1, visiveis.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); destacar(Math.max(ativo - 1, 0)); }
    else if (e.key === "Enter" && !lista.hidden && ativo >= 0) { e.preventDefault(); escolher(visiveis[ativo]); }
    else if (e.key === "Escape" || e.key === "Tab") fechar();
  });
  lista.addEventListener("click", (e) => { const li = e.target.closest("li[data-k]"); if (li) escolher(itens.find((i) => i.k === li.dataset.k)); });
  document.addEventListener("click", (e) => { if (!e.target.closest(".combo")) fechar(); });

  /* --- Resultado --- */
  const atende = (p, b) => p.bairros === "todos" || p.bairros.includes(b);
  const cartao = (p) => `<article class="ponto"><h3>📍 ${p.nome}</h3>
    ${p.endereco ? `<p>${p.endereco}</p>` : ""}<p>🕒 ${p.horario}</p>
    ${p.iframe ? `<div class="mapa">${p.iframe}</div>` : ""}</article>`;
  const OFICIAIS = {
    pilhas: ["Green Eletron", "https://greeneletron.org.br"],
    eletronicos: ["Green Eletron", "https://greeneletron.org.br"],
    lampadas: ["Reciclus", "https://www.reciclus.org.br"]
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let b = bairroSel;
    if (!b && inp.value.trim()) {
      filtrar();
      const exato = visiveis.find((i) => i.nn === norm(inp.value));
      const unico = exato || (visiveis.length === 1 ? visiveis[0] : null);
      if (unico) { escolher(unico); b = unico.k; }
      else { msg.textContent = "Escolha o seu bairro na lista, ou apague o campo para ver todos os pontos."; inp.focus(); abrir(); return; }
    }
    const mat = selMaterial.value, m = MATERIAIS[mat];
    const todos = PONTOS.filter((p) => p.materiais.includes(mat));
    const meus = b ? todos.filter((p) => atende(p, b)) : [];
    const outros = b ? todos.filter((p) => !atende(p, b)) : todos;

    let html = `<p class="dica">${m.dica}</p>`;
    if (!todos.length) {
      const o = OFICIAIS[mat];
      html += `<p class="vazio">Ainda não cadastramos pontos para este material.${o ? ` Enquanto isso, veja os pontos oficiais no site da <a href="${o[1]}" target="_blank" rel="noopener">${o[0]}</a>.` : " Consulte a Secretaria de Meio Ambiente."}</p>`;
    } else {
      if (b && !meus.length) html += `<p class="vazio">Ainda não há ponto cadastrado para o seu bairro. Veja os outros pontos da cidade:</p>`;
      html += meus.map(cartao).join("");
      if (meus.length && outros.length) html += `<h3 class="sub-res">Outros pontos da cidade</h3>`;
      html += outros.map(cartao).join("");
    }
    resultado.innerHTML = html;
    resultado.hidden = false;
    resultado.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
