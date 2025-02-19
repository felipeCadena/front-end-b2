"use client";

import { activities } from "@/common/constants/mock";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function EnviarFotos() {
  const { id } = useParams();
  const router = useRouter();

  const acitivty = activities.find((activity: any) => activity.id === id);

  return (
    <main className="m-6">
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
        <MyTypography variant="subtitle3" weight="bold" className="my-4">
          {acitivty?.title}
        </MyTypography>
    </main>
  );
}
