"use client";

import useLogin from "@/app/(pages)/(cliente)/(acesso)/login/login-store";
import { notifications } from "@/common/constants/mock";
import {
  sideBarAdmin,
  sideBarClient,
  sideBarLp,
  sideBarPartnet,
} from "@/common/constants/sideBar";
import MyIcon from "@/components/atoms/my-icon";
import {
  MyToggleGroup,
  ToggleGroupItem,
} from "@/components/molecules/my-toggle-group";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SidebarMenu({
  closeSidebar,
}: {
  closeSidebar: () => void;
}) {
  const [sideBar, setSideBar] = useState<any[]>(sideBarLp);
  const pathname = usePathname();
  const { email, setEmail, sideBarActive, setSideBarActive } = useLogin();

  useEffect(() => {
    if (pathname !== "/" && email.includes("cliente")) {
      setSideBarActive(sideBarClient);
    } else if (pathname !== "/" && email.includes("parceiro")) {
      setSideBarActive(sideBarPartnet);
    } else if (pathname !== "/" && email.includes("admin")) {
      setSideBarActive(sideBarAdmin);
    } else {
      setSideBarActive(sideBarAdmin);
    }
  }, [email]);

  const handleCloseSidebar = (event: React.MouseEvent) => {
    event.stopPropagation(); // Evita conflitos com outros eventos de clique
    closeSidebar();
  };

  return (
    <div className={`relative`}>
      <MyToggleGroup
        type="single"
        className="absolute flex w-full flex-col items-start"
      >
        {sideBarActive
          .filter((item) => !item.mobile)
          .map((item) => {
            return (
              <React.Fragment key={item.label}>
                <ToggleGroupItem
                  asChild
                  key={item.label}
                  value={item.label}
                  className="flex w-full items-center justify-start gap-2 rounded-md border-none bg-white p-8 text-start font-normal hover:bg-gray-100 data-[state=on]:text-black data-[state=on]:bg-gray-100"
                >
                  <Link
                    href={`${item.link}${item.tab ? `?tab=${item.tab}` : ""}`}
                    className={cn("flex justify-between")}
                    onClick={(e) => {
                      handleCloseSidebar(e);
                      item.label == "Sair" && setEmail("");
                    }}
                  >
                    <div className="flex gap-1 items-center">
                      <MyIcon name={item.icon} />
                      {item.label}
                    </div>

                    {item.label == "Notificações" && (
                      <span className="flex items-center justify-center bg-red-400 h-[1.1rem] w-[1.1rem] rounded-full text-white text-xs font-bold">
                        {notifications?.length ?? 0}
                      </span>
                    )}

                    {item.label == "Carrinho de Compras" && (
                      <span className="flex items-center justify-center bg-primary-600 h-[1.1rem] w-[1.1rem] rounded-full text-white text-xs font-bold">
                        1
                      </span>
                    )}
                  </Link>
                </ToggleGroupItem>
              </React.Fragment>
            );
          })}
      </MyToggleGroup>
    </div>
  );
}
