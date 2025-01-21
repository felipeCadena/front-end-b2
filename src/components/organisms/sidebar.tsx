"use client";

import MyIcon from "@/components/atoms/my-icon";
import SidebarMenu from "../molecules/sidebar-menu";
import { useState } from "react";
import LanguageDropdown from "./language-dropdown";

export default function Sidebar({ logout }: { logout?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="relative flex min-h-screen">
      {/* Botão Hamburguer */}
      <button
        onClick={toggleSidebar}
        className="z-50 rounded-md lg:hidden"
      >
        <MyIcon name="open" className={isOpen ? "hidden" : ""} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-9/12 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="relative h-full flex flex-col justify-start gap-4 p-4">
          {/* Botão de Fechar */}
          <button
            onClick={closeSidebar}
            className="absolute top-4 right-4 z-50 p-2 rounded-md lg:hidden"
          >
            <MyIcon name="close" />
          </button>

          {/* Dropdown de Idiomas */}
          <LanguageDropdown />

          <div className="-ml-4">
          <SidebarMenu />
          </div>
        </nav>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out lg:hidden"
        />
      )}
    </div>
  );
}
