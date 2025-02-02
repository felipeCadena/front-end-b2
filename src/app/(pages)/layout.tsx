"use client";

import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const Layout = ({ children }: { children: JSX.Element | ReactNode }) => {
  const pathname = usePathname();
  const fullWidthPages = ["/login", "/cadastro", "/esqueci-minha-senha"];

  return (
    <section className={cn(!fullWidthPages.includes(pathname) && "max-w-screen-xl mx-auto", )}>
        {children}
    </section>
  );
};

export default Layout;
