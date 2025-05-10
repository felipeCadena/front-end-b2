"use client";

import MyTypography from "@/components/atoms/my-typography";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import React, { useEffect } from "react";
import CarouselCustom from "./carousel-custom";
import { useQuery } from "@tanstack/react-query";
import { adventures as adventuresService } from "@/services/api/adventures";
import useAdventures from "@/store/useAdventure";
import { formatStateName, handleNameActivity } from "@/utils/formatters";
import Loading from "@/app/loading";
import useSearchQueryService from "@/services/use-search-query-service";

export default function SecondSection() {
  const { params } = useSearchQueryService();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const [selected, setSelected] = React.useState<"ar" | "terra" | "mar" | "">(
    ""
  );
  const {
    setAdventures,
    adventures,
    searchedAdventures,
    setSearchedAdventures,
  } = useAdventures();

  // adventures
  const { isLoading } = useQuery({
    queryKey: ["adventures", selected, params],
    queryFn: async () => {
      const filterAdventures = await adventuresService.filterAdventures({
        typeAdventure: selected ? selected : undefined,
        ...params,
      });

      setSearchedAdventures(selected);
      setAdventures(filterAdventures);

      return filterAdventures;
    },
  });

  // adventures
  const { data: popularAdventures = [] } = useQuery({
    queryKey: ["popularAdventures"],
    queryFn: async () =>
      await adventuresService.getAdventures({ orderBy: "qntTotalSales desc" }),
  });

  useEffect(() => {
    const hasFilters = params && Object.keys(params).length > 0;
    if (hasFilters) {
      // Scroll só depois de tudo carregado
      window.scrollTo({
        top: 400,
        behavior: "smooth",
      });
    }
  }, [params]);

  return isLoading ? (
    <Loading />
  ) : (
    <section className="">
      <ActivitiesFilter selected={selected} setSelected={setSelected} />

      <div className="max-sm:pl-4">
        <MyTypography variant="heading2" weight="semibold" className="mt-8">
          Conheça nossas atividades
        </MyTypography>
        <MyTypography variant="subtitle3" weight="regular" className="mt-1">
          {params
            ? `Atividades mais próximas do estado de ${formatStateName(params?.state)}`
            : handleNameActivity(searchedAdventures)}
        </MyTypography>

        <CarouselCustom activities={adventures} />

        <div
          className="border-2 border-gray-200 w-1/2 mx-auto rounded-md md:hidden"
          ref={scrollRef}
          data-scroll-marker
        />

        <MyTypography variant="heading2" weight="semibold" className="mt-8">
          Sugestões para você!
        </MyTypography>
        <MyTypography variant="subtitle3" weight="regular" className="mt-1">
          Atividades mais buscadas
        </MyTypography>

        <CarouselCustom activities={popularAdventures} />
      </div>
    </section>
  );
}
