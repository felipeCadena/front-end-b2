import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { PATHS_CONFIG } from "./utils/paths";

// Verifica se a rota começa com alguma das listadas
const isPathMatch = (path: string, list: string[]) =>
  list.some((p) => path === p || path.startsWith(p));

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const { pathname } = req.nextUrl;

  const isPublic = isPathMatch(pathname, PATHS_CONFIG.public);
  const isAdmin = isPathMatch(pathname, PATHS_CONFIG.private.admin);
  const isPartner = isPathMatch(pathname, PATHS_CONFIG.private.partner);
  const isCustomer = isPathMatch(pathname, PATHS_CONFIG.private.customer);

  // Se for pública, libera
  if (isPublic) return NextResponse.next();

  // Se não tiver token, redireciona
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const role = token.role;

  // Verifica se o usuário tem acesso à rota privada
  if (
    (isAdmin && role !== "admin") ||
    (isPartner && role !== "partner") ||
    (isCustomer && role !== "customer")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Libera se passou por tudo
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Ignora rotas internas do Next, imagens públicas, favicons, fontes, etc
    "/((?!api|_next/static|_next/image|favicon.ico|images|logo.png|logo-web.png|fonts|assets).*)",
  ],
};
