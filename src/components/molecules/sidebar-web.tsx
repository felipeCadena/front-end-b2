"use client";

import useLogin from "@/app/(pages)/(acesso)/login/login-store";
import { sideBarClient, sideBarLp } from "@/common/constants/sideBar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SidebarMenuWeb({}) {
  const [sideBar, setSideBar] = useState<any[]>(sideBarLp);
  const pathname = usePathname();
  const { email } = useLogin();

  useEffect(() => {
    if (pathname !== "/" && email.includes("cliente")) {
      setSideBar(sideBarClient);
    }
  }, []);

  return (
    <div className="flex items-center gap-6">
      {sideBar.map((item) => {
        const isActive = pathname.startsWith(item.link);

        return (
          <React.Fragment key={item.label}>
            {item.web && (
              <Link
                href={`${item.link}${item.tab ? `?tab=${item.tab}` : ""}`}
                className={`${
                  isActive
                    ? "border-b-2 border-black"
                    : "hover:text-black"
                } transition-all text-black`}
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
