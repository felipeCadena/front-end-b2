"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import PATHS from "@/utils/paths";
import Header from "./header";
import Footer from "../templates/footer";

const Layout = ({ children }: { children: JSX.Element | ReactNode }) => {
  const pathname = usePathname();

  const withHeader = () => {
    return (
      pathname !== PATHS.login &&
      pathname !== PATHS["esqueci-minha-senha"] &&
      pathname !== PATHS.cadastro
    );
  };

  const withFooter = () => {
    return (
      pathname == PATHS.initial &&
      pathname == PATHS.atividades
    );
  };


  return (
    <section>
      {withHeader() && <Header />}
        {children}
      {withFooter() && <Footer />}
    </section>
  );
};

export default Layout;
