"use client";

import { hiddenActivities } from "@/common/constants/mock";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import ActivitiesHidden from "@/components/organisms/activities-hidden";
import { useRouter } from "next/navigation";
import React from "react";

export default function AtividadesOcultas() {
  const router = useRouter();

  return (
    <main>
      <div className="flex gap-2 items-center md:w-1/2">
        <MyIcon
          name="voltar-black"
          className="mx-2"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle1" weight="semibold">
          Atividades Ocultas
        </MyTypography>
      </div>
      <ActivitiesHidden notifications={hiddenActivities} hidden />
    </main>
  );
}
