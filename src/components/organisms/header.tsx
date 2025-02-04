"use client";

import React from "react";
import Sidebar from "./sidebar";
import MyLogo from "../atoms/my-logo";
import LanguageDropdown from "./language-dropdown";
import MyIcon from "../atoms/my-icon";
import { useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import useLogin from "@/app/(pages)/(acesso)/login/login-store";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const { email } = useLogin();
  return (
    <header className="top-0 z-50 h-[100px] w-full md:max-w-screen-xl md:mx-auto bg-white flex items-center justify-between md:justify-between max-sm:px-4 mb-4">
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
      <div className="flex-shrink-0 md:flex md:items-center md:gap-6">
        <LanguageDropdown />

        <div className="max-sm:hidden">
          {!email ? (
            <button
              onClick={() => router.push(PATHS.login)}
              className="flex items-center font-semibold gap-1 px-2 md:px-4 py-1 text-[0.9rem] text-white bg-black rounded-full shadow-md"
            >
              Logar-se
              <MyIcon name="user" />
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <MyIcon name="chevron-down" className="" />
              <Image
                src="/images/avatar1.png"
                alt="Avatar"
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
