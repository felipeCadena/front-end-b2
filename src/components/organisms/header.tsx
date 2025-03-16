"use client";

import React from "react";
import Sidebar from "./sidebar";
import MyLogo from "../atoms/my-logo";
import LanguageDropdown from "./language-dropdown";
import MyIcon from "../atoms/my-icon";
import { usePathname, useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import useLogin from "@/app/(pages)/(cliente)/(acesso)/login/login-store";
import Image from "next/image";
import SideBarModal from "../molecules/side-bar-modal";
import { cn } from "@/utils/cn";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const withoutHeaderMobile = () => {
    return (
      pathname === PATHS["sobre-a-empresa"] ||
      pathname === PATHS["cadastro-parceiro"] ||
      pathname === PATHS["informacoes-atividades"] ||
      pathname === PATHS["cadastro-atividade"] ||
      pathname.includes("editar")
    );
  };

  const { email, sideBarActive } = useLogin();

  return (
    <header
      className={cn(
        "top-0 z-50 h-[100px] w-full md:max-w-screen-custom md:mx-auto bg-white flex items-center justify-between px-4 md:px-6 mb-4",
        withoutHeaderMobile() && "max-sm:hidden"
      )}
    >
      <div
        className="max-sm:hidden cursor-pointer"
        onClick={() => router.push("/")}
      >
        <MyLogo variant="web" width={122} height={40} />
      </div>

      {/* Sidebar - Alinhado à esquerda */}
      <Sidebar />

      {/* Logo - Centralizado */}
      <div className="absolute left-1/2 transform -translate-x-1/2 mt-10 md:hidden">
        <MyLogo variant="mobile" width={100} height={100} />
      </div>

      {/* Language Dropdown - Alinhado à direita */}
      <div className="flex-shrink-0 md:flex md:items-center md:gap-6 ">
        <LanguageDropdown />

        <div className="max-sm:hidden">
          {!email ? (
            <button
              onClick={() => router.push(PATHS.login)}
              className="text-sm flex items-center font-semibold gap-1 px-2 md:px-4 py-1 text-[0.9rem] text-white bg-black rounded-full shadow-md"
            >
              Logar-se
              <MyIcon name="user" />
            </button>
          ) : (
            <SideBarModal sideBar={sideBarActive}>
              <div className="flex items-center gap-1 cursor-pointer">
                <MyIcon name="chevron-down" />
                <Image
                  src="/images/avatar1.png"
                  alt="Avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
            </SideBarModal>
          )}
        </div>
      </div>
    </header>
  );
}
