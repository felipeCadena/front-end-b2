"use client";

import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/useAuthStore";
import useSearchQueryService from "@/services/use-search-query-service";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Layout = ({ children }: { children: JSX.Element | ReactNode }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { clearUser } = useAuthStore();

  const fullWidthPages = [
    "/login",
    "/cadastro",
    "/esqueci-minha-senha",
    "/parceiro/login",
    "/parceiro/esqueci-minha-senha",
    "/recuperacao/novasenha",
  ];

  useEffect(() => {
    if (
      session?.error === "RefreshAccessTokenError" &&
      !session?.user &&
      !fullWidthPages.includes(pathname)
    ) {
      // Logout automático ou redirecionamento
      console.log("Session expired, logging out...");
      clearUser();
      signOut();
      toast.error("Sua sessão expirou. Por favor, faça login novamente.");
    }
  }, [session]);

  return (
    <section
      className={cn(
        `${inter.className} antialiased`,
        !fullWidthPages.includes(pathname) &&
          "md:mx-auto w-full md:max-w-screen-custom "
      )}
    >
      {children}
    </section>
  );
};

export default Layout;
