// ==========================================

// import { encodeUrl } from "./url-util";

// * Static routes
const ROOTS_INITIAL = "/";
const ROOTS_LOGIN = "/login";
const ROOTS_LOGIN_PARCEIRO = "/login-parceiro";
const ROOTS_CADASTRO = "/cadastro";
const ROOTS_SENHA = "/esqueci-minha-senha";
const ROOTS_PARCEIRO = "/parceiros";
const ROOTS_QUEMSOMOS = "/quem-somos";
const ROOTS_ATIVIDADES = "/atividades";
const ROOTS_CARRINHO = "/carrinho";
const ROOTS_CFINALIZAR_COMPRA = "/finalizar-compra";
// Agrupa Favoritos, Histórico e Reservas
const ROOTS_INFOS = "/informacoes";
const ROOTS_TERMOS = "/termos-de-uso";
const ROOTS_CADASTRO_PARCEIRO = "/cadastro-parceiro";
const ROOTS_SOBRE_A_EMPRESA = "/sobre-a-empresa";

// ==========================================
// * Dimanic routes
const VISUALIZAR_ATIVIDADE = (slug: number | string) => `/atividades/atividade/${slug}`;
const ATIVIDADE_REALIZADA = (slug: number | string) => `/informacoes/atividade-realizada/${slug}`;
const VISUALIZAR_NOTIFICACAO = (slug: number | string) => `/notificacoes/notificacao/${slug}`;


// ==========================================
// * Dynamic encode routes
// const PROPOSTA_PERSONALIZADO = (slug: string) => `/proposta/personalizado/${encodeUrl(slug)}`;

// ==========================================
// * Possible routes
const PATHS = {
  initial: ROOTS_INITIAL,
  login: ROOTS_LOGIN,
  "login-parceiro": ROOTS_LOGIN_PARCEIRO,
  cadastro: ROOTS_CADASTRO,
  "esqueci-minha-senha": ROOTS_SENHA,
  parceiros: ROOTS_PARCEIRO,
  atividades: ROOTS_ATIVIDADES,
  informacoes: ROOTS_INFOS,
  quemSomos: ROOTS_QUEMSOMOS,
  carrinho: ROOTS_CARRINHO,
  "finalizar-compra": ROOTS_CFINALIZAR_COMPRA,
  termos: ROOTS_TERMOS,
  "sobre-a-empresa": ROOTS_SOBRE_A_EMPRESA,
  "cadastro-parceiro": ROOTS_CADASTRO_PARCEIRO,
  visualizarAtividade: VISUALIZAR_ATIVIDADE,
  visualizarNotificacao: VISUALIZAR_NOTIFICACAO,
  atividadeRealizada: ATIVIDADE_REALIZADA,
};

export default PATHS;
