"use client";

import { activities } from "@/common/constants/mock";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import Activities from "@/components/organisms/activities";
import ActivitiesDetails from "@/components/organisms/activities-details";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import { ActivityCardSkeleton } from "@/components/organisms/activities-skeleton";
import SearchActivity from "@/components/organisms/search-activity";
import { AddToCartAdventure, Adventure } from "@/services/api/adventures";
import { partnerService } from "@/services/api/partner";
import PATHS from "@/utils/paths";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

export default function AtividadesCadastradas() {
  const router = useRouter();
  const [selected, setSelected] = React.useState<"ar" | "terra" | "mar" | "">(
    ""
  );
  const [loading, setLoading] = React.useState(false);

  const [partnerAdventures, setPartnerAdventures] =
    React.useState<Adventure[]>();

  const { isLoading } = useQuery({
    queryKey: ["myAdventures", selected],
    queryFn: async () => {
      setLoading(true);
      const activities = await partnerService.getMyAdventures({
        typeAdventure: selected ? selected : undefined,
        orderBy: "createdAt desc",
        limit: 30,
        skip: 0,
      });

      if (activities) {
        setPartnerAdventures(activities);
        setLoading(false);
      }
      return activities;
    },
  });

  return (
    <main className="px-4 my-8 w-full overflow-x-hidden">
      <div className="md:hidden ">
        <SearchActivity setFormData={setPartnerAdventures} />
      </div>

      <div className="hidden md:flex items-center w-full gap-40">
        <SearchActivity setFormData={setPartnerAdventures} className="w-full" />
        <MyButton
          variant="default"
          borderRadius="squared"
          className="p-[1.6rem] mt-2"
          onClick={() => router.push(PATHS["cadastro-atividade"])}
          leftIcon={<MyIcon name="plus" className="" />}
        >
          Cadastrar nova atividade
        </MyButton>
      </div>

      <div className="mt-8">
        <MyTypography variant="heading2" weight="semibold">
          Atividades cadastradas
        </MyTypography>
        <MyTypography variant="body-big" weight="regular" className="">
          Acompanhe suas atividades cadastradas
        </MyTypography>
        <ActivitiesFilter
          selected={selected}
          setSelected={setSelected}
          withText={false}
        />
      </div>

      <div className="md:hidden mb-16">
        {partnerAdventures?.length == 0 && !loading ? (
          <div className="w-full h-[225px] flex flex-col justify-center items-center">
            <MyTypography variant="heading3">
              Nenhuma atividade encontrada. Faça uma nova busca!
            </MyTypography>
          </div>
        ) : (
          !loading && (
            <ActivitiesDetails
              activities={partnerAdventures ? partnerAdventures : []}
              type="parceiro"
            />
          )
        )}
      </div>

      {loading && (
        <div className="grid md:grid-cols-4 gap-4">
          {activities.map((_, index) => (
            <ActivityCardSkeleton key={index} />
          ))}
        </div>
      )}

      <div className="max-sm:hidden mt-12">
        {partnerAdventures?.length && !loading ? (
          <Activities
            activities={partnerAdventures ? partnerAdventures : []}
            type="parceiro"
            withoutHeart
            withoutShared
          />
        ) : (
          !loading && (
            <div className="w-full h-[225px] flex flex-col justify-center items-center">
              <MyTypography variant="heading3">
                Nenhuma atividade encontrada. Faça uma nova busca!
              </MyTypography>
            </div>
          )
        )}
      </div>

      {/* Mobile fixed button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 px-4 py-4 bg-white z-30 shadow-md">
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
