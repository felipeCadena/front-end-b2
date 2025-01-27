// ==========================================

// import { encodeUrl } from "./url-util";

// * Static routes
const ROOTS_INITIAL = "/";
const ROOTS_LOGIN = "/login";
const ROOTS_CADASTRO = "/cadastro";
const ROOTS_SENHA = "/esqueci-minha-senha";
const ROOTS_PARCEIRO = "/parceiros";
const ROOTS_QUEMSOMOS = "/quem-somos";
const ROOTS_ATIVIDADES = "/atividades";
// Agrupa Favoritos, Histórico e Agenda
const ROOTS_INFOS = "/informacoes";

// ==========================================
// * Dimanic routes
const VISUALIZAR_ATIVIDADE = (slug: number | string) => `/atividades/${slug}`;

// ==========================================
// * Dynamic encode routes
// const PROPOSTA_PERSONALIZADO = (slug: string) => `/proposta/personalizado/${encodeUrl(slug)}`;

// ==========================================
// * Possible routes
const PATHS = {
  initial: ROOTS_INITIAL,
  login: ROOTS_LOGIN,
  cadastro: ROOTS_CADASTRO,
  "esqueci-minha-senha": ROOTS_SENHA,
  parceiros: ROOTS_PARCEIRO,
  atividades: ROOTS_ATIVIDADES,
  informacoes: ROOTS_INFOS,
  visualizarAtividade: VISUALIZAR_ATIVIDADE,
  quemSomos: ROOTS_QUEMSOMOS,
};

export default PATHS;
