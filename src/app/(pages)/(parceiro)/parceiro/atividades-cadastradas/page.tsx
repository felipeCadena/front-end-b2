"use client";

import { activities } from "@/common/constants/mock";
import MyButton from "@/components/atoms/my-button";
import MyTypography from "@/components/atoms/my-typography";
import Activities from "@/components/organisms/activities";
import ActivitiesDetails from "@/components/organisms/activities-details";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import SearchActivity from "@/components/organisms/search-activity";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import React from "react";

export default function AtividadesCadastradas() {
  const router = useRouter();

  return (
    <main className="px-4 my-8 w-full space-y-8 md:space-y-12 overflow-x-hidden">
      <SearchActivity />

      <div className="">
        <MyTypography variant="heading2" weight="semibold">
          Atividades cadastradas
        </MyTypography>
        <MyTypography variant="body-big" weight="regular" className="">
          Acompanhe suas atividades cadastradas
        </MyTypography>
        <ActivitiesFilter withText={false} />
      </div>

      <div className="md:hidden">
        <ActivitiesDetails activities={activities} type="parceiro" />
      </div>

      <div className="max-sm:hidden">
        <Activities
          activities={activities}
          type="parceiro"
          withoutHeart
          withoutShared
        />
      </div>

      <MyButton
        variant="default"
        size="lg"
        borderRadius="squared"
        className="max-sm:w-full mx-auto flex"
        onClick={() => router.push(PATHS["cadastro-atividade"])}
      >
        Cadastrar nova atividade
      </MyButton>
    </main>
  );
}
