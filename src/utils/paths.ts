// ==========================================

// import { encodeUrl } from "./url-util";

// * Static routes
const ROOTS_INITIAL = "/";
const ROOTS_LOGIN = "/login";
const ROOTS_CADASTRO = "/cadastro";
const ROOTS_SENHA = "/esqueci-minha-senha";
const ROOTS_PARCEIRO = "/parceiros";
const ROOTS_ATIVIDADES = "/atividades";

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
  visualizarAtividade: VISUALIZAR_ATIVIDADE,
};

export default PATHS;
