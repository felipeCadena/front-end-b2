"use client";

import React from "react";
import MyTypography from "@/components/atoms/my-typography";
import MyIcon from "@/components/atoms/my-icon";
import { useRouter } from "next/navigation";
import { CardContent, MyCard } from "@/components/molecules/my-card";
import Image from "next/image";
import MyButton from "@/components/atoms/my-button";
import SendImages from "@/components/organisms/send-images";
import ChevronDown from "@/components/atoms/my-icon/elements/down";

const photoSections = [
  {
    title: "Banner Principal",
    description: "Imagem exibida no topo da página inicial",
    currentImage: "/path/to/banner.jpg",
    dimensions: "1920x1080px",
  },
  {
    title: "Logo da Empresa",
    description: "Logotipo exibido no cabeçalho",
    currentImage: "/path/to/logo.png",
    dimensions: "200x200px",
  },
  {
    title: "Ícone do App",
    description: "Ícone exibido na instalação do app",
    currentImage: "/path/to/icon.png",
    dimensions: "512x512px",
  },
];

export default function EditarFotos() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 space-y-6">
      <div className="flex items-center gap-3">
        <MyIcon
          name="voltar-black"
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle2" weight="bold">
          Configurações do Sistema
        </MyTypography>
      </div>

      <div className="py-2">
        <div className="flex gap-2 items-center">
          <ChevronDown
            fill="#000"
            width="24"
            height="24"
            className="-rotate-90"
          />
          <MyTypography variant="subtitle3" weight="bold" className="">
            Editar fotos de capa da Landing Page
          </MyTypography>
        </div>

        <SendImages config />
      </div>

      <div>
        <div className="flex gap-2 items-center">
          <ChevronDown
            fill="#000"
            width="24"
            height="24"
            className="-rotate-90"
          />
          <MyTypography variant="subtitle3" weight="bold" className="">
            Editar fotos da área dos Parceiros
          </MyTypography>
        </div>

        <SendImages config />
      </div>
    </div>
  );
}
