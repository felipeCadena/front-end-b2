"use client";

import React from "react";
import MyTypography from "@/components/atoms/my-typography";
import MyIcon, { IconsMapTypes } from "@/components/atoms/my-icon";
import { useRouter } from "next/navigation";
import MyButton from "@/components/atoms/my-button";

const systemConfigs = [
  {
    title: "Editar Fotos",
    icon: "images",
    path: "/admin/configuracoes/fotos",
  },
  {
    title: "Editar Textos",
    icon: "atention",
    path: "/admin/configuracoes/textos",
  },
  {
    title: "Editar Justificativas",
    icon: "text",
    path: "/admin/configuracoes/justificativas",
  },
  {
    title: "Idioma do Aplicativo",
    icon: "world",
    path: "/admin/configuracoes/idioma",
  },
];

export default function ConfiguracoesSistema() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <MyIcon
          name="voltar-black"
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle2" weight="bold">
          Configurações
        </MyTypography>
      </div>

      <div className="p-4">
        <MyTypography variant="subtitle2" weight="bold" className="mb-6">
          Configurações do Sistema
        </MyTypography>
        <div className="max-sm:space-y-2 grid md:grid-cols-2 md:items-center gap-4">
          {systemConfigs.map((config, index) => (
            <MyButton
              key={index}
              variant="config"
              size="md"
              borderRadius="squared"
              className="flex justify-between md:w-full"
              onClick={() => router.push(config.path)}
            >
              {config.title}
              <MyIcon name={config.icon as IconsMapTypes} />
            </MyButton>
          ))}
        </div>
      </div>
    </div>
  );
}
