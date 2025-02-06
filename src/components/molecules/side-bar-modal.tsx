import React from "react";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    MyDropdownMenu,
  } from "../atoms/my-drop-menu";

export default function SideBarModal({children}: {children: React.ReactNode}) {
  return (
    <MyDropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white shadow-lg rounded-lg py-2 w-52">
        <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
          Chat
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
          Favoritos
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
          Histórico de Atividades
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
          Reservas
        </DropdownMenuItem>
        <DropdownMenuSeparator className="h-px bg-gray-200 my-1" />
        <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer">
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </MyDropdownMenu>
  );
}
