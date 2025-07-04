'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import PATHS from '@/utils/paths';
import Header from './header';
import Footer from '../templates/footer';

const Layout = ({ children }: { children: JSX.Element | ReactNode }) => {
  const pathname = usePathname();

  const withoutHeader = () => {
    return (
      pathname !== PATHS.login &&
      pathname !== PATHS['esqueci-minha-senha'] &&
      pathname !== PATHS.cadastro &&
      pathname !== PATHS['login-parceiro'] &&
      pathname !== PATHS['esqueci-minha-senha'] &&
      pathname !== PATHS['senha-parceiro'] &&
      pathname !== PATHS['resetar-senha']
    );
  };

  const withoutFooter = () => {
    return (
      pathname != PATHS.cadastro &&
      pathname != PATHS.login &&
      pathname != PATHS['esqueci-minha-senha'] &&
      pathname != PATHS['termos-parceiro'] &&
      pathname != PATHS['cadastro-parceiro'] &&
      pathname != PATHS['login-parceiro'] &&
      pathname != PATHS['sobre-a-empresa'] &&
      pathname !== PATHS['resetar-senha']
    );
  };

  return (
    <section>
      {withoutHeader() && <Header />}
      {children}
      {withoutFooter() && <Footer />}
    </section>
  );
};

export default Layout;
