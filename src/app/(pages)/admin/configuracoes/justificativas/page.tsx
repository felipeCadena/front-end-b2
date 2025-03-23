"use client";

import React from "react";
import MyTypography from "@/components/atoms/my-typography";
import MyIcon from "@/components/atoms/my-icon";
import { useRouter } from "next/navigation";
import JustificativasTemplate from "@/components/templates/config-justificativas";

export default function Justificativas() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4">
      <div className="flex items-center gap-3">
        <MyIcon
          name="voltar-black"
          className="cursor-pointer max-sm:-ml-2"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle2" weight="bold">
          Configurações do Sistema
        </MyTypography>
      </div>
      <JustificativasTemplate />
    </div>
  );
}
