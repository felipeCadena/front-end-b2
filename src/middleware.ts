import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PATHS_CONFIG, DEFAULT_ROLE_PATHS } from "@/utils/paths";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  role: string;
  exp: number;
}

// Cache de rotas públicas para lookup mais rápido
const PUBLIC_PATHS = new Set(PATHS_CONFIG.public);

// Extensões de arquivos para ignorar
const IGNORED_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg",
  ".ico",
  ".css",
  ".js",
  ".map",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
]);

export function middleware(request: NextRequest) {
  //   const { pathname } = request.nextUrl;

  //   // Ignora arquivos estáticos
  //   const fileExtension = pathname.split(".").pop()?.toLowerCase();
  //   if (fileExtension && IGNORED_EXTENSIONS.has(`.${fileExtension}`)) {
  //     return NextResponse.next();
  //   }

  //   // Ignora rotas públicas
  //   if (PUBLIC_PATHS.has(pathname)) {
  //     return NextResponse.next();
  //   }

  //   // Pega o token do cookie @auth
  //   const authCookie = request.cookies.get("@auth")?.value;

  //   if (!authCookie) {
  //     if (pathname === "/login") return NextResponse.next();

  //     const url = new URL("/login", request.url);
  //     url.searchParams.set("redirect", pathname);
  //     return NextResponse.redirect(url);
  //   }

  //   try {
  //     // Parse do cookie JSON
  //     const auth = JSON.parse(authCookie);

  //     if (!auth.access_token) {
  //       throw new Error("No access token");
  //     }

  //     // Decodifica o token
  //     const decoded = jwtDecode<DecodedToken>(auth.access_token);

  //     // Verifica se o token está válido
  //     const isTokenValid = decoded.exp * 1000 > Date.now();

  //     if (!isTokenValid) {
  //       throw new Error("Token expired");
  //     }

  //     // Verifica token
  //     const token = request.cookies.get("token")?.value;

  //     if (!token) {
  //       // Verifica se já estamos na página de login para evitar loop
  //       if (pathname === "/login") {
  //         return NextResponse.next();
  //       }

  //       const url = new URL("/login", request.url);
  //       url.searchParams.set("redirect", pathname);
  //       return NextResponse.redirect(url);
  //     }

  //     try {
  //       // Decodifica o token para pegar a role
  //       const decodedToken = jwtDecode<DecodedToken>(token);
  //       const userRole = decodedToken.role.toLowerCase();

  //       // Mapeia os roles do token para os roles da aplicação
  //       const roleMapping = {
  //         superadmin: "admin",
  //         admin: "admin",
  //         partner: "partner",
  //         customer: "customer",
  //       };

  //       const mappedRole = roleMapping[userRole as keyof typeof roleMapping];
  //       // Verifica se a rota é permitida para a role
  //       const allowedPaths =
  //         PATHS_CONFIG.private[mappedRole as keyof typeof PATHS_CONFIG.private] ||
  //         [];
  //       const isAllowedPath = allowedPaths.some(
  //         (path: string) => pathname === path
  //       );

  //       if (!isAllowedPath) {
  //         // Redireciona para a rota padrão da role
  //         const defaultPath =
  //           DEFAULT_ROLE_PATHS[mappedRole as keyof typeof DEFAULT_ROLE_PATHS];
  //         return NextResponse.redirect(new URL(defaultPath, request.url));
  //       }

  return NextResponse.next();
  //     } catch (error) {
  //       return NextResponse.redirect(new URL("/login", request.url));
  //     }
  //   } catch (error) {
  //     // Em caso de erro, redireciona para login
  //     const url = new URL("/login", request.url);
  //     url.searchParams.set("redirect", pathname);
  //     return NextResponse.redirect(url);
  //   }
}

// Configuração do matcher para o middleware
export const config = {
  matcher: [
    // Exclui arquivos estáticos e API routes
    "/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)",
  ],
};
