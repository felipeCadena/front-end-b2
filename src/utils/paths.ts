// ==========================================

// import { encodeUrl } from "./url-util";

// * Static routes
const ROOTS_INITIAL = "/";
const ROOTS_LOGIN = "/login";
const ROOTS_CADASTRO = "/cadastro";
const ROOTS_PARCEIRO = "/parceiros";

// ==========================================
// * Dimanic routes
// const ECOMMERCE_PROJECT = (slug: number | string) => `/ecommerce/projeto/${slug}`;


// ==========================================
// * Dynamic encode routes
// const PROPOSTA_PERSONALIZADO = (slug: string) => `/proposta/personalizado/${encodeUrl(slug)}`;

// ==========================================
// * Possible routes
const PATHS = {
  initial: ROOTS_INITIAL,
  login: ROOTS_LOGIN,
  cadastro: ROOTS_CADASTRO,
  parceiros: ROOTS_PARCEIRO
};

export default PATHS;
