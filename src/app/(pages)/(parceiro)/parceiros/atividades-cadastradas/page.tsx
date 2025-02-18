"use client"

import { activities } from "@/common/constants/mock";
import MyButton from "@/components/atoms/my-button";
import MyTypography from "@/components/atoms/my-typography";
import ActivitiesDetails from "@/components/organisms/activities-details";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import SearchActivity from "@/components/organisms/search-activity";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import React from "react";

export default function AtividadesCadastradas() {
    const router = useRouter();

  return (
    <main className="m-6">
      <SearchActivity />

      <div className="mt-6">
        <MyTypography variant="heading2" weight="semibold">
          Atividades cadastradas
        </MyTypography>
        <MyTypography variant="body-big" weight="regular" className="">
          Acompanhe suas atividades cadastradas
        </MyTypography>
        <ActivitiesFilter withText={false} />
      </div>

      <ActivitiesDetails activities={activities} />

      <MyButton
        variant="default"
        size="lg"
        borderRadius="squared"
        className="w-full"
        onClick={() => router.push(PATHS["cadastro-atividade"])}
      >
        Cadastrar nova atividade
      </MyButton>
    </main>
  );
}
