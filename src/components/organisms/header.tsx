import React from "react";
import Sidebar from "./sidebar";
import MyLogo from "../atoms/my-logo";
import LanguageDropdown from "./language-dropdown";

export default function Header() {
  return (
    <header className=" top-0 z-50 h-[100px] w-full bg-white flex items-center justify-between px-4">
      {/* Sidebar - Alinhado à esquerda */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Logo - Centralizado */}
      <div className="absolute left-1/2 transform -translate-x-1/2 mt-10">
        <MyLogo variant="regular" width={80} height={80} />
      </div>

      {/* Language Dropdown - Alinhado à direita */}
      <div className="flex-shrink-0">
        <LanguageDropdown />
      </div>
    </header>
  );
}
