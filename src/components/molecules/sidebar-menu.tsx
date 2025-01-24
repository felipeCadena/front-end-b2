"use client";

import MyIcon from "@/components/atoms/my-icon";
import {
  MyToggleGroup,
  ToggleGroupItem,
} from "@/components/molecules/my-toggle-group";
import Link from "next/link";
import React, { useState } from "react";

const items: any[] = [
  {
    label: "Atividades",
    link: "/atividades",
    icon: "atividades",
  },
  {
    label: "Quem Somos",
    link: "/quem-somos",
    icon: "quemSomos",
  },
  {
    label: "Área dos Parceiros",
    link: "/parceiros",
    icon: "parceiros",
  },
  {
    label: "Logar-se",
    link: "/login",
    icon: "logar",
  },
];

export default function SidebarMenu({closeSidebar}: {closeSidebar: () => void}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleCloseSidebar = () => {
    closeSidebar()
  };

  return (
    <div className={`relative`}>
      <MyToggleGroup
        type="single"
        className="absolute flex w-full flex-col items-start gap-4"
      >
        {items.map((item) => {
          return (
            <React.Fragment key={item.label}>
              <ToggleGroupItem
                asChild
                key={item.label}
                value={item.label}
                className="flex w-full items-center justify-start gap-2 rounded-md border-none bg-white p-4 text-start font-normal hover:bg-gray-600 data-[state=on]:bg-gray-500"
              >
                <Link
                  href={item.link}
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
