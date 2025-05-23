"use client";

import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { users } from "@/services/api/users";
import { partnerService } from "@/services/api/partner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Layout = ({ children }: { children: JSX.Element | ReactNode }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const fullWidthPages = [
    "/login",
    "/cadastro",
    "/esqueci-minha-senha",
    "/parceiro/login",
    "/parceiro/esqueci-minha-senha",
    "/recuperacao/novasenha",
  ];

  // const { data: partner } = useQuery({
  //   queryKey: ["partner"],
  //   enabled: !!session?.user,
  //   queryFn: () => partnerService.getPartnerLogged(),
  // });

  useEffect(() => {
    if (session?.user?.error === "RefreshAccessTokenError") {
      // Logout automático ou redirecionamento
      signOut({ callbackUrl: "/login" });
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
