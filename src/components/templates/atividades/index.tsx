"use client";

import MyTypography from "@/components/atoms/my-typography";
import ShoppingCard from "@/components/molecules/shopping-card";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import CarouselCustom from "@/components/templates/second-section/carousel-custom";
import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { adventures } from "@/services/api/adventures";
import { useCart } from "@/store/useCart";
import { useSession } from "next-auth/react";
import useSearchQueryService from "@/services/use-search-query-service";
import Loading from "@/app/loading";

export default function AtividadesTemplate() {
  const { params } = useSearchQueryService();
  const [selected, setSelected] = React.useState<"ar" | "terra" | "mar" | "">(
    ""
  );

  const { data: activities = [], isLoading } = useQuery({
    queryKey: ["activities", params],
    queryFn: () => {
      // Verifica se `params` está vazio (sem filtros) ou não
      const hasFilters = params && Object.keys(params).length > 0;
      console.log(params);

      return adventures.filterAdventures({
        limit: 30,
        skip: 0,
        ...params, // Só passa se houver filtros
      });
    },
  });

  const arRef = useRef<HTMLDivElement>(null);
  const terraRef = useRef<HTMLDivElement>(null);
  const marRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (type: "ar" | "terra" | "mar") => {
    const refs = {
      ar: arRef,
      terra: terraRef,
      mar: marRef,
    };

    refs[type]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSelect = (value: "ar" | "terra" | "mar" | "") => {
    setSelected(value);
    if (value) scrollToSection(value);
  };

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

  return isLoading ? (
    <Loading />
  ) : (
    <section className="">
      {/* <SearchActivity /> */}

      <ActivitiesFilter selected={selected} setSelected={handleSelect} />

      <div className="ml-5 my-8 md:my-16">
        <MyTypography
          variant="heading2"
          weight="semibold"
          className="mb-4 md:text-lg"
        >
          Sugestões para você!
        </MyTypography>

        <div ref={arRef}>
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
        </div>

        <div className="border-2 border-gray-200 w-1/2 mx-auto rounded-md mb-6 md:hidden" />

        <div ref={terraRef}>
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
        </div>

        <div className="border-2 border-gray-200 w-1/2 mx-auto rounded-md mb-6 md:hidden" />

        <div ref={marRef}>
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
      </div>
      <ShoppingCard isMobile={false} items={cartSize} />
      <ShoppingCard isMobile items={cartSize} />
    </section>
  );
}
