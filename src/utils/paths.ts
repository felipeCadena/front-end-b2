type PathsConfig = {
  public: string[];
  private: {
    admin: string[];
    partner: string[];
    customer: string[];
  };
};

// Rotas Públicas
const ROOTS_INITIAL = "/";
const ROOTS_LOGIN = "/login";
const ROOTS_CADASTRO = "/cadastro";
const ROOTS_SENHA = "/esqueci-minha-senha";
const ROOTS_QUEMSOMOS = "/quem-somos";
const ROOTS_ATIVIDADES = "/atividades";
const ROOTS_PARCEIRO = "/parceiro";
const ROOTS_CADASTRO_PARCEIRO = "/parceiro/cadastro";
const ROOTS_CADASTRO_FLUXO_PARCEIRO = "/parceiro/cadastro-parceiro";
const ROOTS_LOGIN_PARCEIRO = "/parceiro/login";
const ROOTS_SENHA_PARCEIRO = "/parceiro/esqueci-minha-senha";
const ROOTS_SOBRE_A_EMPRESA = "/parceiro/sobre-a-empresa";
const ROOTS_TERMOS_PARCEIRO = "/parceiro/termos-de-uso";

// Rotas Privadas
const ROOTS_CARRINHO = "/carrinho";
const ROOTS_FINALIZAR_COMPRA = "/finalizar-compra";
// Agrupa Favoritos, Histórico, Reservas e Fotos (Na Web)
const ROOTS_INFOS = "/informacoes";

// Rotas Parceiros
const ROOTS_ATIVIDADES_CADASTRADAS = "/parceiro/atividades-cadastradas";
const ROOTS_SUAS_ATIVIDADES = "/parceiro/minhas-atividades";
const ROOTS_CADASTRO_ATIVIDADE = "/parceiro/cadastro-atividade";
const ROOTS_FOTOS_PASSEIOS = "/parceiro/fotos-de-passeios";
const ROOTS_RESERVAS_PARCEIRO = "/parceiro/reservas";
const ROOTS_ATIVIDADES_OCULTAS = "/parceiro/reservas/ocultas";
const ROOTS_INFORMACOES_ATIVIDADES = "/parceiro/informacoes-atividade";

// Rotas Admin
const ROOTS_ADMIN = "/admin";
const ROOTS_PAGAMENTOS = "/admin/pagamento-parceiros";

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

const RELATORIO_ATIVIDADE_PARCEIRO = (slug: number | string) =>
  `/parceiro/financeiro/relatorio/${slug}`;

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
  admin: ROOTS_ADMIN,
  "pagamento-parceiros": ROOTS_PAGAMENTOS,
  "enviar-fotos": ENVIAR_FOTOS,
  "enviar-videos": ENVIAR_VIDEOS,
  visualizarAtividade: VISUALIZAR_ATIVIDADE,
  visualizarNotificacao: VISUALIZAR_NOTIFICACAO,
  atividadeRealizada: ATIVIDADE_REALIZADA,
  visualizarFotos: VISUALIZAR_FOTOS,
  visualizarAtividadeParceiro: VISUALIZAR_ATIVIDADE_PARCEIRO,
  editarAtividadeParceiro: EDITAR_ATIVIDADE_PARCEIRO,
  cancelarAtividade: CANCELAR_ATIVIDADE_PARCEIRO,
  relatorioAtividade: RELATORIO_ATIVIDADE_PARCEIRO,
};

export const PATHS_CONFIG: PathsConfig = {
  public: [
    ROOTS_INITIAL,
    ROOTS_LOGIN,
    ROOTS_CADASTRO,
    ROOTS_SENHA,
    ROOTS_QUEMSOMOS,
    ROOTS_ATIVIDADES,
    ROOTS_PARCEIRO,
    ROOTS_CADASTRO_PARCEIRO,
    ROOTS_CADASTRO_FLUXO_PARCEIRO,
    ROOTS_LOGIN_PARCEIRO,
    ROOTS_SENHA_PARCEIRO,
    ROOTS_SOBRE_A_EMPRESA,
    ROOTS_TERMOS_PARCEIRO,
  ],
  private: {
    admin: [
      ROOTS_ADMIN,
      ROOTS_PAGAMENTOS,
      // ... outras rotas admin
    ],
    partner: [
      ROOTS_ATIVIDADES_CADASTRADAS,
      ROOTS_SUAS_ATIVIDADES,
      ROOTS_CADASTRO_ATIVIDADE,
      ROOTS_FOTOS_PASSEIOS,
      ROOTS_RESERVAS_PARCEIRO,
      ROOTS_ATIVIDADES_OCULTAS,
      ROOTS_INFORMACOES_ATIVIDADES,
      // ... outras rotas partner
    ],
    customer: [
      ROOTS_CARRINHO,
      ROOTS_FINALIZAR_COMPRA,
      ROOTS_INFOS,
      // ... outras rotas customer
    ],
  },
};

export const DEFAULT_ROLE_PATHS = {
  admin: ROOTS_ADMIN,
  partner: ROOTS_SUAS_ATIVIDADES,
  customer: ROOTS_ATIVIDADES,
} as const;

export default PATHS;
