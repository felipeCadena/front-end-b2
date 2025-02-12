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

  const withoutFooter = () => {
    return (
      pathname != PATHS.cadastro &&
      pathname != PATHS.login &&
      pathname != PATHS["esqueci-minha-senha"]
    );
  };


  return (
    <section className="">
      {withHeader() && <Header />}
        {children}
      {withoutFooter() && <Footer />}
    </section>
  );
};

export default Layout;
