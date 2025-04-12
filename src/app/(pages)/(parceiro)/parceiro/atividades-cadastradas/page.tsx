"use client";

import { activities } from "@/common/constants/mock";
import MyButton from "@/components/atoms/my-button";
import MyTypography from "@/components/atoms/my-typography";
import Activities from "@/components/organisms/activities";
import ActivitiesDetails from "@/components/organisms/activities-details";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import { ActivityCardSkeleton } from "@/components/organisms/activities-skeleton";
import SearchActivity from "@/components/organisms/search-activity";
import { partnerService } from "@/services/api/partner";
import PATHS from "@/utils/paths";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

export default function AtividadesCadastradas() {
  const router = useRouter();

  const { data: partnerActivities } = useQuery({
    queryKey: ["partnerActivities"],
    queryFn: () => partnerService.getMyAdventures(),
  });

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
        {partnerActivities ? (
          <ActivitiesDetails
            activities={partnerActivities ? partnerActivities : []}
            type="parceiro"
          />
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <ActivityCardSkeleton key={index} />
          ))
        )}
      </div>

      <div className="max-sm:hidden">
        <Activities
          activities={activities}
          type="parceiro"
          withoutHeart
          withoutShared
        />
      </div>

      {/* Web button (não fixo) */}
      <MyButton
        variant="default"
        size="lg"
        borderRadius="squared"
        className="max-sm:hidden"
        onClick={() => router.push(PATHS["cadastro-atividade"])}
      >
        Cadastrar nova atividade
      </MyButton>

      {/* Mobile fixed button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 px-4 py-4 bg-white z-50 shadow-md">
        <MyButton
          variant="default"
          size="lg"
          borderRadius="squared"
          className="w-full"
          onClick={() => router.push(PATHS["cadastro-atividade"])}
        >
          Cadastrar nova atividade
        </MyButton>
      </div>
    </main>
  );
}
