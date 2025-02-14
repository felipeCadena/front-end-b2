import React from "react";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    MyDropdownMenu,
  } from "../atoms/my-drop-menu";
import Link from "next/link";
import { cn } from "@/utils/cn";
import MyIcon from "../atoms/my-icon";

export default function SideBarModal({children, sideBar}: {children: React.ReactNode, sideBar: any[]}) {
  return (
    <MyDropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white shadow-lg rounded-lg py-1 w-full">

        {sideBar.filter((item) => item.menu).map((item) => (
           <Link
           key={item.label}
           href={`${item.link == "/galeria-de-fotos" ? "/informacoes" : item.link}${item.tab ? `?tab=${item.tab}` : ""}`}
           passHref
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
