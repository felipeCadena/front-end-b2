"use client";

import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Layout = ({ children }: { children: JSX.Element | ReactNode }) => {
  const pathname = usePathname();
  const fullWidthPages = [
    "/login",
    "/cadastro",
    "/esqueci-minha-senha",
    "/parceiro/login",
    "/parceiro/esqueci-minha-senha",
    "/recuperacao/novasenha",
  ];

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
