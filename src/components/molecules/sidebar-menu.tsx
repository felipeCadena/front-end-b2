"use client";

import useLogin from "@/app/(pages)/login/login-store";
import { sideBarClient, sideBarLp } from "@/common/constants/sideBar";
import MyIcon from "@/components/atoms/my-icon";
import {
  MyToggleGroup,
  ToggleGroupItem,
} from "@/components/molecules/my-toggle-group";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SidebarMenu({closeSidebar}: {closeSidebar: () => void}) {
  const [sideBar, setSideBar] = useState<any[]>(sideBarLp);
  const pathname = usePathname();
  const { email } = useLogin()

  useEffect(() => {
    if (pathname !== "/" && email.includes("cliente")) {
      setSideBar(sideBarClient)
    }
  }, [])
  

  const handleCloseSidebar = () => {
    closeSidebar()
  };

  return (
    <div className={`relative mt-2`}>
      <MyToggleGroup
        type="single"
        className="absolute flex w-full flex-col items-start gap-4"
      >
        {sideBar.map((item) => {
          return (
            <React.Fragment key={item.label} >
              <ToggleGroupItem
                asChild
                key={item.label}
                value={item.label}
                className="flex w-full items-center justify-start gap-2 rounded-md border-none bg-white p-8 text-start font-normal hover:bg-gray-100 data-[state=on]:text-black data-[state=on]:bg-gray-100"
              >
                <Link
                  href={`${item.link}${item.tab ? `?tab=${item.tab}` : ""}`}
                  className="p-0"
                  onClick={handleCloseSidebar}
                >
                  <MyIcon name={item.icon} /> {item.label}
                </Link>
              </ToggleGroupItem>
            </React.Fragment>
          );
        })}
      </MyToggleGroup>
    </div>
  );
}
