import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { PATHS_CONFIG } from "./utils/paths";

// Verifica se a rota começa com alguma das listadas
const isPathMatch = (path: string, publicPaths: string[]) => {
  return publicPaths.some((publicPath) => {
    if (publicPath.includes("*")) {
      // Remove o '*' e compara se o path começa com isso
      const basePath = publicPath.replace("*", "");
      return path.startsWith(basePath);
    }
    return path === publicPath;
  });
};

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
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/";

    return NextResponse.redirect(redirectUrl);
  }

  const role = token.role;

  // Verifica se o usuário tem acesso à rota privada
  if (
    (isAdmin && role !== "admin") ||
    (isPartner && role !== "partner") ||
    (isCustomer && role !== "customer")
  ) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/";

    return NextResponse.redirect(redirectUrl);
  }

  // Libera se passou por tudo
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Ignora rotas internas do Next, imagens públicas, favicons, fontes, etc
    "/((?!api|_next/static|_next/image|favicon.ico|images|user.png|logo.png|logo-web.png|fonts|assets).*)",
  ],
};
