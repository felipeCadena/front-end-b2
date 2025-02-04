"use client";

import useLogin from "@/app/(pages)/(acesso)/login/login-store";
import { notifications } from "@/common/constants/mock";
import { sideBarClient, sideBarLp } from "@/common/constants/sideBar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import MyIcon from "../atoms/my-icon";

export default function SidebarMenuWeb({}) {
  const [sideBar, setSideBar] = useState<any[]>(sideBarLp);
  const pathname = usePathname();
  const { email } = useLogin();

  useEffect(() => {
    if (pathname !== "/" && email.includes("cliente")) {
      setSideBar(sideBarClient);
    }
  }, []);

  const iconInclude = ["Notificações", "Carrinho de Compras"];

  return (
    <div className="flex items-center gap-10">
      {sideBar.map((item) => {
        const isActive = pathname.startsWith(item.link);

        return (
          <React.Fragment key={item.label}>
            {item.web && (
              <Link
                href={`${item.link}${item.tab ? `?tab=${item.tab}` : ""}`}
                className={`${
                  isActive ? "border-b-2 border-black" : "hover:text-black"
                } transition-all text-black relative`}
              >
                {item.label != "Chat" && <div className="flex gap-4">
                  {iconInclude.includes(item.label) && (
                    <MyIcon name={item.icon} className="w-4 h-4" />
                  )}
                  {item.label}
                </div>}

                {item.label == "Notificações" && (
                  <div className="absolute flex justify-center items-center bottom-4 left-3 bg-red-400 h-[1.125rem] w-[1.125rem] rounded-full text-white text-xs font-bold">
                    {notifications?.length ?? 0}
                  </div>
                )}

                {item.label == "Carrinho de Compras" && (
                  <div className="absolute flex justify-center items-center bottom-4 left-3 bg-primary-600 h-[1.125rem] w-[1.125rem] rounded-full text-white text-xs font-bold">
                    1
                  </div>
                )}

                {item.label == "Chat" && (
                  <div className="relative bg-secondary-200 h-[2rem] w-[2rem] rounded-full">
                  <div className="absolute bg-red-400 h-[0.625rem] w-[0.625rem] rounded-full"/>
                  <MyIcon name="chat-web" className="absolute top-1.5 left-[0.30rem]"/>
                  </div>
                  )}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
