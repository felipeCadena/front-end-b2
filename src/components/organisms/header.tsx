"use client"

import React from "react";
import Sidebar from "./sidebar";
import MyLogo from "../atoms/my-logo";
import LanguageDropdown from "./language-dropdown";
import MyIcon from "../atoms/my-icon";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter()
  return (
    <header className="top-0 z-50 h-[100px] w-full bg-white flex items-center justify-between md:justify-around px-4 mb-4">
      <div className="max-sm:hidden cursor-pointer" onClick={() => router.push("/")}>
        <MyLogo variant="web" width={122} height={40} />
      </div>

      {/* Sidebar - Alinhado à esquerda */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Logo - Centralizado */}
      <div className="absolute left-1/2 transform -translate-x-1/2 mt-10 md:hidden">
        <MyLogo variant="mobile" width={100} height={100} />
      </div>

      {/* Language Dropdown - Alinhado à direita */}
      <div className="flex-shrink-0 md:flex md:items-center md:gap-4">
        <LanguageDropdown />

        <button
          // onClick={toggleMenu}
          className="max-sm:hidden flex items-center font-semibold gap-1 px-2 md:px-4 py-1 text-[0.9rem] text-white bg-black rounded-full shadow-md"
        >
          Logar-se
          <MyIcon name="user" />
        </button>
      </div>
    </header>
  );
}
