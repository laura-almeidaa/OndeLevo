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
  areaIndustrial: "Área Industrial Tuffy Mafud",
  cdhu: "CDHU Dr. Antônio Duarte Nogueira",
  cecap: "CECAP Almerindo Francisco Mariani",
  centro: "Centro",
  cidadeNova: "Cidade Nova - Complexo Urb. Hab. Elza Princivali Reis",
  cidadeOperaria: "Cidade Operária Gininho Marchió",
  bomJesus: "Cohab Bom Jesus",
  ilhaGrande: "Cohab Ilha Grande",
  complexoFranciscoDiogo: "Complexo Habit. Francisco Diogo",
  beiraRio: "Condomínio Estância Beira Rio",
  Haras: "Condomínio Residencial Haras Country Village",
  madri: "Condomínio Residencial Madri",
  miranteNiagara: "Condomínio Residencial Mirante Niagara",
  novaJerusalem: "Condomínio Vila Nova Jerusalém",
  sanLuigio: "Condomínio Villagio San Luigio",
  humbertoLima: "Conj. Hab. Humberto de S. P. Lima",
  marioFregonesi: "Conj. Hab. Mario Fregonesi",
  villageBandeiranteUm: "Conjunto Residencial Village Bandeirante I",
  villageBandeiranteDois: "Conjunto Residencial Village Bandeirante II",
  distritoIndustrialAdib: "Distrito Industrial Adib Rassi",
  distritoIndustrialMarincek: "Distrito Industrial José Marincek",
  distritoIndustrialAdibDois: "Distrito Industrial Adib Rassi II",
  ivoneRassi: "Ivone Rassi",
  jardimAlvorada: "Jardim Alvorada",
  jardimBandeirante: "Jardim Bandeirante",
  jardimBelaVista: "Jardim Bela Vista",
  jardimCesarCapato: "Jardim Cesar Capato",
  jardimDasAroeiras: "Jardim Das Aroeiras",
  jardimDasAroeirasDois: "Jardim das Aroeiras II",
  jardimDasOliveiras: "Jardim das Oliveiras",
  jardimEuropa: "Jardim Europa",
  jardimFlorida: "Jardim Flórida",
  jardimItamaraca: "Jardim Itamaracá",
  jardimLiberdade: "Jardim Liberdade",
  jardimMariaRegina: "Jardim Maria Regina",
  distritoIndustrialMarincekDois: "Distrito Industrial José Marincek II",
  jardimMariaThereza: "Jardim Maria Thereza",
  jardimMarioAntonioMarconi: "Jardim Mario Antônio Marconi",
  jardimMorumbi: "Jardim Morumbi I",
  jardimNiagara: "Jardim Niagara",
  jardimNiagaraDois: "Jardim Niagara II",
  jardimNoveDeJulho: "Jardim Nove De Julho",
  jardimSanDomingues: "Jardim San Domingues",
  jardimSantaEmilia: "Jardim Santa Emília",
  jardimSantaFe: "Jardim Santa Fé",
  jardimSantaJulia: "Jardim Santa Julia",
  jardimSantaLucia: "Jardim Santa Lúcia",
  jardimSantaMaria: "Jardim Santa Maria",
  jardimSantaRita: "Jardim Santa Rita",
  jardimSantoAntonio: "Jardim Santo Antônio",
  jardimSaoFrancisco: "Jardim São Francisco",
  jardimSaoFranciscoDois: "Jardim São Francisco II",
  jardimSaoGabriel: "Jardim São Gabriel",
  jardimSaoJorge: "Jardim São Jorge",
  jardimSaoLucas: "Jardim São Lucas",
  jardimSaoLucasDois: "Jardim São Lucas II",
  jardimSaoLucasTres: "Jardim São Lucas III",
  jardimSaoMarcos: "Jardim São Marcos",
  judencioVilares: "Juvencio Vilares",
  loteamentoFlamboyant: "Loteamento Flamboyant",
  loteamentoSaoRoque: "Loteamento São Roque",
  parqueNovaJardinopolis: "Parque Nova Jardinópolis",
  rediencialAdibRassi: "Residencial Adib Rassi",
  residencialCarniel: "Residencial Carniel",
  residencialPiteira: "Residencial Piteira",
  residencialPortao: "Residencial Portão",
  residencialRecantoDoRioPardo: "Residencial Recanto do Rio Pardo",
  residencialVilaBourbon: "Residencial Vila Bourbon",
  vilaAmerica: "Vila América",
  vilaBoldini: "Vila Boldini",
  vilaBomJesus: "Vila Bom Jesus",
  vilaDasMangeuiras: "Vila das Mangueiras",
  vilaNossaSenhoraAparecida: "Vila Nossa Senhora Aparecida",
  vilaOlimpica: "Vila Olímpica",
  vilaOliveira: "Vila Oliveira",
  vilaPaulista: "Vila Paulista",
  vilaReis: "Vila Reis",
  vilaSantaLuzia: "Vila Santa Luzia",
  vilaSaoLuiz: "Vila São Luiz"
};

const PONTOS = [
  {
    nome: "Ponto de exemplo 1 (substitua)",
    endereco: "",          // opcional: aparece escrito abaixo do nome
    horario: "A confirmar",
    materiais: ["pilhas", "eletronicos"],
    bairros: ["centro", "vilaPaulista"],
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
