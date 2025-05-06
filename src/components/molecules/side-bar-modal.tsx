"use client";

import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  MyDropdownMenu,
} from "../atoms/my-drop-menu";
import Link from "next/link";
import MyIcon from "../atoms/my-icon";
import { useAuthStore } from "@/store/useAuthStore";
import { authService } from "@/services/api/auth";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
export default function SideBarModal({
  children,
  sideBar,
}: {
  children: React.ReactNode;
  sideBar: any[];
}) {
  const { clearUser } = useAuthStore();
  const { data: session } = useSession();
  const handleExit = async (item: any) => {
    if (item === "Sair") {
      try {
        await authService.logout(session?.user.refreshToken ?? "");
        signOut({
          callbackUrl: "/",
          redirect: true,
        });
        clearUser();
      } catch (error) {
        console.error("Error during logout:", error);
        toast.error("Erro ao fazer logout. Tente novamente.");
      }
    }
  };

  return (
    <MyDropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white shadow-lg rounded-lg py-1 w-full">
        {sideBar
          .filter((item) => item.menu)
          .map((item) => (
            <Link
              key={item.label}
              href={`${item.link == "/galeria-de-fotos" ? "/informacoes" : item.link}${item.tab ? `?tab=${item.tab}` : ""}`}
              passHref
              onClick={() => handleExit(item.label)}
            >
              <DropdownMenuItem
                className="px-4 py-3 hover:text-black hover:bg-gray-100 cursor-pointer"
                onSelect={() => {}} // Evita comportamento padrão e fecha o dropdown
              >
                <div className="flex gap-2 items-center">
                  <MyIcon name={item.icon} />
                  {item.label}
                </div>
              </DropdownMenuItem>
            </Link>
          ))}
      </DropdownMenuContent>
    </MyDropdownMenu>
  );
}
