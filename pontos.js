/* ============================================================
   ÚNICO arquivo que você edita para cadastrar pontos.
   Como adicionar um ponto:
   1. No Google Maps: Compartilhar > Incorporar um mapa > Copiar HTML
   2. Cole o iframe dentro de CRASES ( ` ` ) no campo "iframe".
      (crases permitem colar o código sem quebrar as aspas)
   ============================================================ */

const MATERIAIS = {
  pilhas:      { nome: "Pilhas e baterias", icone: "🔋", dica: "Guarde em um pote fechado até levar ao ponto." },
  eletronicos: { nome: "Eletrônicos",       icone: "💻", dica: "Leve inteiro, sem desmontar, e apague seus dados." },
  moveis:      { nome: "Móveis e entulho",  icone: "🛋️", dica: "Nunca deixe na calçada ou em terrenos." },
  oleo:        { nome: "Óleo de cozinha",   icone: "🫙", dica: "Coe e guarde em garrafa PET fechada. Nunca jogue na pia." },
  reciclaveis: { nome: "Recicláveis",       icone: "♻️", dica: "Entregue limpos e secos." },
  remedios:    { nome: "Remédios vencidos", icone: "💊", dica: "Nunca jogue no lixo ou no vaso. Leve a um ponto de coleta, como farmácias e unidades de saúde." },
  lampadas:    { nome: "Lâmpadas",          icone: "💡", dica: "Fluorescentes têm mercúrio. Não quebre: leve inteira, na embalagem, ao ponto de coleta." }
};

const BAIRROS = {
  centro: "Centro",
  vila_paulista: "Vila Paulista",
  morada_sol: "Morada do Sol",
  industrial: "Distrito Industrial"
};

const PONTOS = [
  {
    nome: "Ponto de exemplo 1 (substitua)",
    endereco: "",          // opcional: aparece escrito abaixo do nome
    horario: "A confirmar",
    materiais: ["pilhas", "eletronicos"],
    bairros: ["centro", "vila_paulista"],
    iframe: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14881.758514956464!2d-47.79521795!3d-21.174687799999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b9bee4814d103d%3A0x65e24506ef4a3c8c!2sShopping%20Santa%20%C3%9Arsula!5e0!3m2!1spt-BR!2sbr!4v1790806562750!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`
  },
  {
    nome: "Ponto de exemplo 2 (substitua)",
    endereco: "",
    horario: "A confirmar",
    materiais: ["oleo", "reciclaveis"],
    bairros: "todos",     // "todos" = atende a cidade inteira
    iframe: ``             // vazio = mostra o ponto sem mapa
  }
];
