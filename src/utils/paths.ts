// ==========================================

import { vi } from "react-day-picker/locale";

// import { encodeUrl } from "./url-util";

// Static routes

// Rotas Únicas
const ROOTS_INITIAL = "/";
const ROOTS_LOGIN = "/login";
const ROOTS_CADASTRO = "/cadastro";
const ROOTS_SENHA = "/esqueci-minha-senha";
const ROOTS_QUEMSOMOS = "/quem-somos";
const ROOTS_ATIVIDADES = "/atividades";
const ROOTS_CARRINHO = "/carrinho";
const ROOTS_FINALIZAR_COMPRA = "/finalizar-compra";
// Agrupa Favoritos, Histórico, Reservas e Fotos (Na Web)
const ROOTS_INFOS = "/informacoes";
const ROOTS_TERMOS = "/termos-de-uso";
const ROOTS_INFORMACOES_ATIVIDADES = "/informacoes-atividade";
const ROOTS_SOBRE_A_EMPRESA = "/sobre-a-empresa";

// Rotas Parceiros
const ROOTS_CADASTRO_PARCEIRO = "/cadastro-parceiro";
const ROOTS_LOGIN_PARCEIRO = "/login-parceiro";
const ROOTS_PARCEIRO = "/parceiro";
const ROOTS_ATIVIDADES_CADASTRADAS = "/parceiro/atividades-cadastradas";
const ROOTS_SUAS_ATIVIDADES = "/parceiro/minhas-atividades";
const ROOTS_CADASTRO_ATIVIDADE = "/parceiro/cadastro-atividade";
const ROOTS_FOTOS_PASSEIOS = "/parceiro/fotos-de-passeios";

// ==========================================
// * Dimanic routes
const VISUALIZAR_ATIVIDADE = (slug: number | string) => `/atividades/atividade/${slug}`;
const VISUALIZAR_FOTOS = (slug: number | string) => `/galeria-de-fotos/galeria/${slug}`;
const ATIVIDADE_REALIZADA = (slug: number | string) => `/informacoes/atividade-realizada/${slug}`;
const VISUALIZAR_NOTIFICACAO = (slug: number | string) => `/notificacoes/notificacao/${slug}`;

const ENVIAR_FOTOS = (slug: number | string) => `/parceiro/fotos-de-passeios/${slug}/enviar-fotos`;
const ENVIAR_VIDEOS = (slug: number | string) => `/parceiro/fotos-de-passeios/${slug}/enviar-fotos`;

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
  atividades: ROOTS_ATIVIDADES,
  informacoes: ROOTS_INFOS,
  quemSomos: ROOTS_QUEMSOMOS,
  carrinho: ROOTS_CARRINHO,
  "finalizar-compra": ROOTS_FINALIZAR_COMPRA,
  termos: ROOTS_TERMOS,
  parceiro: ROOTS_PARCEIRO,
  "sobre-a-empresa": ROOTS_SOBRE_A_EMPRESA,
  "cadastro-parceiro": ROOTS_CADASTRO_PARCEIRO,
  "cadastro-atividade": ROOTS_CADASTRO_ATIVIDADE,
  "informacoes-atividades": ROOTS_INFORMACOES_ATIVIDADES,
  "minhas-atividades": ROOTS_SUAS_ATIVIDADES,
  "atividades-cadastradas": ROOTS_ATIVIDADES_CADASTRADAS,
  "fotos-de-passeios": ROOTS_FOTOS_PASSEIOS,
  "enviar-fotos": ENVIAR_FOTOS,
  "enviar-videos": ENVIAR_VIDEOS,
  visualizarAtividade: VISUALIZAR_ATIVIDADE,
  visualizarNotificacao: VISUALIZAR_NOTIFICACAO,
  atividadeRealizada: ATIVIDADE_REALIZADA,
  visualizarFotos: VISUALIZAR_FOTOS,
};

export default PATHS;
