"use client";

import MyTypography from "@/components/atoms/my-typography";
import ShoppingCard from "@/components/molecules/shopping-card";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import CarouselCustom from "@/components/templates/second-section/carousel-custom";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { adventures } from "@/services/api/adventures";
import { useCart } from "@/store/useCart";
import { useSession } from "next-auth/react";
import useSearchQueryService from "@/services/use-search-query-service";

export default function AtividadesTemplate() {
  const { params } = useSearchQueryService();

  const { data: activities = [], isFetching } = useQuery({
    queryKey: ["activities", params],
    queryFn: () => {
      // Verifica se `params` está vazio (sem filtros) ou não
      const hasFilters = params && Object.keys(params).length > 0;

      return adventures.filterAdventures({
        limit: 30,
        skip: 0,
        ...(hasFilters ? params : {}), // Só passa se houver filtros
      });
    },
  });

  console.log(params);

  const { data } = useSession();
  const userId = data?.user.id;

  const { getCartSize } = useCart();

  const cartSize = getCartSize(userId ?? "");

  const filterActivity = (typeAdventure: string) => {
    return (
      activities.filter(
        (activity) => activity.typeAdventure === typeAdventure
      ) ?? []
    );
  };

  return (
    <section className="">
      {/* <SearchActivity /> */}

      <ActivitiesFilter />

      <div className="ml-5 my-8 md:my-16">
        <MyTypography
          variant="heading2"
          weight="semibold"
          className="mb-4 md:text-lg"
        >
          Sugestões para você!
        </MyTypography>
        <MyTypography
          variant="subtitle3"
          weight="regular"
          className="md:opacity-50"
        >
          Atividades Aéreas
        </MyTypography>
        <CarouselCustom
          activities={filterActivity("ar").map((activity) => ({
            ...activity,
            addressComplement: activity.addressComplement || "",
          }))}
        />

        <div className="border-2 border-gray-200 w-1/2 mx-auto rounded-md mb-6 md:hidden" />

        <MyTypography
          variant="subtitle3"
          weight="regular"
          className="md:opacity-50 md:mt-8"
        >
          Atividades Terrestres
        </MyTypography>
        <CarouselCustom
          activities={filterActivity("terra").map((activity) => ({
            ...activity,
            addressComplement: activity.addressComplement || "",
          }))}
        />

        <div className="border-2 border-gray-200 w-1/2 mx-auto rounded-md mb-6 md:hidden" />

        <MyTypography
          variant="subtitle3"
          weight="regular"
          className="md:opacity-50 md:mt-8"
        >
          Atividades Aquática
        </MyTypography>
        <CarouselCustom
          activities={filterActivity("mar").map((activity) => ({
            ...activity,
            addressComplement: activity.addressComplement || "",
          }))}
        />
      </div>
      <ShoppingCard isMobile={false} items={cartSize} />
      <ShoppingCard isMobile items={cartSize} />
    </section>
  );
}
