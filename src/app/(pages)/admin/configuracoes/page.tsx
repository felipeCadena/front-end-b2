"use client";

import React from "react";
import MyTypography from "@/components/atoms/my-typography";
import MyIcon, { IconsMapTypes } from "@/components/atoms/my-icon";
import { useRouter } from "next/navigation";
import MyButton from "@/components/atoms/my-button";
import ConfigTextos from "@/components/templates/config-textos";
import ConfigFotos from "@/components/templates/config-fotos";
import JustificativasTemplate from "@/components/templates/config-justificativas";
import ConfigIdiomas from "@/components/templates/config-idiomas";

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
  // {
  //   title: "Idioma do Aplicativo",
  //   icon: "world",
  //   path: "/admin/configuracoes/idioma",
  // },
];

export default function ConfiguracoesSistema() {
  const router = useRouter();
  const [config, setConfig] = React.useState<string | null>(null);

  const handleConfig = (title: string) => {
    switch (title) {
      case "Editar Textos":
        return setConfig("textos");
      case "Editar Fotos":
        return setConfig("fotos");
      case "Editar Justificativas":
        return setConfig("justificativas");
      case "Idioma do Aplicativo":
        return setConfig("idiomas");
      default:
        return null;
    }
  };

  const renderConfig = () => {
    switch (config) {
      case "textos":
        return <ConfigTextos />;
      case "fotos":
        return <ConfigFotos />;
      case "justificativas":
        return <JustificativasTemplate />;
      case "idiomas":
        return <ConfigIdiomas />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <MyIcon
          name="voltar-black"
          className="cursor-pointer max-sm:-ml-2"
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
        <div className="grid gap-4 md:hidden">
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
        <div className="max-sm:hidden grid grid-cols-2 items-center gap-4">
          {systemConfigs.map((config, index) => (
            <MyButton
              key={index}
              variant="config"
              size="md"
              borderRadius="squared"
              className="flex justify-between md:w-full"
              onClick={() => handleConfig(config.title)}
            >
              {config.title}
              <MyIcon name={config.icon as IconsMapTypes} />
            </MyButton>
          ))}
        </div>

        <div className="pt-4">{renderConfig()}</div>
      </div>
    </div>
  );
}
