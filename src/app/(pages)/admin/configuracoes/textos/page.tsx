"use client";

import React from "react";
import MyTypography from "@/components/atoms/my-typography";
import MyIcon from "@/components/atoms/my-icon";
import { useRouter } from "next/navigation";
import ChevronDown from "@/components/atoms/my-icon/elements/down";
import MyTextarea from "@/components/atoms/my-textarea";
import MyButton from "@/components/atoms/my-button";

export default function Textos() {
  const router = useRouter();
  const [selectedJustificativa, setSelectedJustificativa] =
    React.useState<string>("");

  const justificativas = [
    "Houve um imprevisto e irei precisar cancelar nossa atividade, desculpe!",
    "Condições climáticas desfavoráveis para a realização da atividade.",
    "Problemas técnicos com equipamentos necessários.",
    "Número insuficiente de participantes.",
    "Motivos de força maior/emergência.",
  ];

  return (
    <div className="min-h-screen px-4">
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

      <div className="mt-6">
        <div className="flex gap-2 items-center">
          <ChevronDown
            fill="#000"
            width="24"
            height="24"
            className="-rotate-90"
          />
          <MyTypography variant="subtitle3" weight="bold" className="">
            Textos da Landing Page
          </MyTypography>
        </div>

        <MyTextarea
          rows={5}
          placeholder="Lorem ipsum dolor sit amet, consectetur di..."
          className="mt-1"
        />

        <MyButton
          borderRadius="squared"
          size="lg"
          variant="default"
          className="mt-6 w-full"
        >
          Salvar
        </MyButton>
      </div>

      <div className="mt-10">
        <div className="flex gap-2 items-center">
          <ChevronDown
            fill="#000"
            width="24"
            height="24"
            className="-rotate-90"
          />
          <MyTypography variant="subtitle3" weight="bold" className="">
            Textos da área de Parceiros
          </MyTypography>
        </div>

        <MyTextarea
          rows={5}
          placeholder="Lorem ipsum dolor sit amet, consectetur di..."
          className="mt-1"
        />

        <MyButton
          borderRadius="squared"
          size="lg"
          variant="default"
          className="mt-6 w-full"
        >
          Salvar
        </MyButton>
      </div>
    </div>
  );
}
