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

// Rotas Parceiros
const ROOTS_PARCEIRO = "/parceiro";
const ROOTS_CADASTRO_PARCEIRO = "/parceiro/cadastro";
const ROOTS_CADASTRO_FLUXO_PARCEIRO = "/parceiro/cadastro-parceiro";
const ROOTS_LOGIN_PARCEIRO = "/parceiro/login";
const ROOTS_SENHA_PARCEIRO = "/parceiro/esqueci-minha-senha";
const ROOTS_ATIVIDADES_CADASTRADAS = "/parceiro/atividades-cadastradas";
const ROOTS_SUAS_ATIVIDADES = "/parceiro/minhas-atividades";
const ROOTS_CADASTRO_ATIVIDADE = "/parceiro/cadastro-atividade";
const ROOTS_FOTOS_PASSEIOS = "/parceiro/fotos-de-passeios";
const ROOTS_SOBRE_A_EMPRESA = "/parceiro/sobre-a-empresa";
const ROOTS_TERMOS_PARCEIRO = "/parceiro/termos-de-uso";
const ROOTS_RESERVAS_PARCEIRO = "/parceiro/reservas";
const ROOTS_ATIVIDADES_OCULTAS = "/parceiro/reservas/ocultas";
const ROOTS_INFORMACOES_ATIVIDADES = "/parceiro/informacoes-atividade";

// ==========================================
// * Dimanic routes
const VISUALIZAR_ATIVIDADE = (slug: number | string) =>
  `/atividades/atividade/${slug}`;
const VISUALIZAR_FOTOS = (slug: number | string) =>
  `/galeria-de-fotos/galeria/${slug}`;
const ATIVIDADE_REALIZADA = (slug: number | string) =>
  `/informacoes/atividade-realizada/${slug}`;
const VISUALIZAR_NOTIFICACAO = (slug: number | string) =>
  `/notificacoes/notificacao/${slug}`;

const ENVIAR_FOTOS = (slug: number | string) =>
  `/parceiro/fotos-de-passeios/${slug}/enviar-fotos`;
const ENVIAR_VIDEOS = (slug: number | string) =>
  `/parceiro/fotos-de-passeios/${slug}/enviar-videos`;

const VISUALIZAR_ATIVIDADE_PARCEIRO = (slug: number | string) =>
  `/parceiro/atividades-cadastradas/atividade/${slug}`;
const EDITAR_ATIVIDADE_PARCEIRO = (slug: number | string) =>
  `/parceiro/atividades-cadastradas/atividade/${slug}/editar`;

const CANCELAR_ATIVIDADE_PARCEIRO = (slug: number | string) =>
  `/parceiro/reservas/cancelar/${slug}`;

// ==========================================
// * Dynamic encode routes
// const PROPOSTA_PERSONALIZADO = (slug: string) => `/proposta/personalizado/${encodeUrl(slug)}`;

// ==========================================
// * Possible routes
const PATHS = {
  initial: ROOTS_INITIAL,
  login: ROOTS_LOGIN,
  "login-parceiro": ROOTS_LOGIN_PARCEIRO,
  "senha-parceiro": ROOTS_SENHA_PARCEIRO,
  cadastro: ROOTS_CADASTRO,
  "esqueci-minha-senha": ROOTS_SENHA,
  atividades: ROOTS_ATIVIDADES,
  informacoes: ROOTS_INFOS,
  quemSomos: ROOTS_QUEMSOMOS,
  carrinho: ROOTS_CARRINHO,
  "finalizar-compra": ROOTS_FINALIZAR_COMPRA,
  "termos-parceiro": ROOTS_TERMOS_PARCEIRO,
  parceiro: ROOTS_PARCEIRO,
  "sobre-a-empresa": ROOTS_SOBRE_A_EMPRESA,
  "cadastro-parceiro": ROOTS_CADASTRO_PARCEIRO,
  "fluxo-cadastro-parceiro": ROOTS_CADASTRO_FLUXO_PARCEIRO,
  "cadastro-atividade": ROOTS_CADASTRO_ATIVIDADE,
  "informacoes-atividades": ROOTS_INFORMACOES_ATIVIDADES,
  "minhas-atividades": ROOTS_SUAS_ATIVIDADES,
  "atividades-cadastradas": ROOTS_ATIVIDADES_CADASTRADAS,
  "fotos-de-passeios": ROOTS_FOTOS_PASSEIOS,
  "atividades-ocultas": ROOTS_ATIVIDADES_OCULTAS,
  "reservas-parceiro": ROOTS_RESERVAS_PARCEIRO,
  "enviar-fotos": ENVIAR_FOTOS,
  "enviar-videos": ENVIAR_VIDEOS,
  visualizarAtividade: VISUALIZAR_ATIVIDADE,
  visualizarNotificacao: VISUALIZAR_NOTIFICACAO,
  atividadeRealizada: ATIVIDADE_REALIZADA,
  visualizarFotos: VISUALIZAR_FOTOS,
  visualizarAtividadeParceiro: VISUALIZAR_ATIVIDADE_PARCEIRO,
  editarAtividadeParceiro: EDITAR_ATIVIDADE_PARCEIRO,
  cancelarAtividade: CANCELAR_ATIVIDADE_PARCEIRO,
};

export default PATHS;
