"use client";

import { hiddenActivities } from "@/common/constants/mock";
import MyIcon from "@/components/atoms/my-icon";
import ActivitiesHidden from "@/components/organisms/activities-hidden";
import { useRouter } from "next/navigation";
import React from "react";

export default function AtividadesOcultas() {
  const router = useRouter();

  return (
    <main>
      <MyIcon
        name="voltar-black"
        className="mx-2"
        onClick={() => router.back()}
      />
      <ActivitiesHidden notifications={hiddenActivities} />
    </main>
  );
}
