"use client";

import { activities } from "@/common/constants/mock";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import SendImages from "@/components/organisms/send-images";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function EnviarFotos() {
  const { id } = useParams();
  const router = useRouter();

  const acitivty = activities.find((activity: any) => activity.id === id);

  return (
    <main className="mt-6 mx-4">
      <div className="flex gap-4 items-center">
        <MyIcon
          name="voltar-black"
          className="-ml-2"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle1" weight="bold" className="">
          Configuração da Atividade
        </MyTypography>
      </div>

      <div className="space-y-2 mt-4">
        <MyTypography variant="subtitle3" weight="bold" className="">
          Enviar fotos da atividade
        </MyTypography>
        <MyTypography variant="label" lightness={500} className="">
          Enviar as fotos da atividade{" "}
          <span className="font-bold">até o dia 05/04/2024</span>
        </MyTypography>
      </div>

      <SendImages />
    </main>
  );
}
