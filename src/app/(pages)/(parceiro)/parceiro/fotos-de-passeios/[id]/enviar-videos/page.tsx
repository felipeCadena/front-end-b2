"use client";

import { activities } from "@/common/constants/mock";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import SendVideos from "@/components/organisms/send-videos";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function EnviarVideos() {
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

      <div className="space-y-2 my-4">
        <MyTypography variant="subtitle3" weight="bold" className="">
          Enviar vídeos da atividade
        </MyTypography>
        <MyTypography variant="label" lightness={500} className="">
          Enviar os vídeos da atividade <span className="font-bold">até o dia 05/04/2024</span>
        </MyTypography>
      </div>   

      <SendVideos />   
    </main>
  );
}
