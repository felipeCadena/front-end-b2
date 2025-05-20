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
import { ActivityCardSkeleton } from "@/components/organisms/activities-skeleton";
import SearchActivity from "@/components/organisms/search-activity";

export default function SecondSection() {
  const { params, clear } = useSearchQueryService();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const searchRef = React.useRef<HTMLDivElement>(null);

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
  const { data: popularAdventures = [], isLoading: popularIsLoading } =
    useQuery({
      queryKey: ["popularAdventures"],
      queryFn: async () =>
        await adventuresService.getAdventures({
          orderBy: "qntTotalSales desc",
        }),
    });

  useEffect(() => {
    const hasFilters = params && Object.keys(params).length > 0;
    if (hasFilters) {
      setSelected("");
      // Scroll só depois de tudo carregado
      window.scrollTo({
        top: 400,
        behavior: "smooth",
      });
    }
  }, [params]);

  const handleSelect = (value: "ar" | "terra" | "mar" | "") => {
    setSelected(value);
    clear();
  };

  const handleSearch = (adventures: any) => {
    setAdventures(adventures);
    if (searchRef.current) {
      searchRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="">
      <div className="mt-8">
        <SearchActivity setFormData={handleSearch} />
      </div>

      <ActivitiesFilter selected={selected} setSelected={handleSelect} />

      <div className="max-sm:pl-4" ref={searchRef}>
        <MyTypography variant="heading2" weight="semibold" className="mt-8 ">
          Conheça nossas atividades
        </MyTypography>
        <MyTypography variant="subtitle3" weight="regular" className="mt-1">
          {params && params?.state
            ? `Atividades mais próximas do estado de ${formatStateName(params?.state)}`
            : handleNameActivity(searchedAdventures)}
        </MyTypography>

        {!isLoading ? (
          adventures && adventures?.length > 0 ? (
            <CarouselCustom home activities={adventures} />
          ) : (
            <div className="w-full h-[225px] flex flex-col justify-center items-center">
              <MyTypography
                variant="heading3"
                className="text-base md:text-2xl text-center"
              >
                Nenhuma atividade encontrada.
                <p>Faça uma nova busca!</p>
              </MyTypography>
            </div>
          )
        ) : (
          <div className="grid md:grid-cols-4 gap-4 max-sm:hidden">
            {Array.from({ length: 4 }).map((_, index) => (
              <ActivityCardSkeleton key={index} />
            ))}
          </div>
        )}

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

        {!popularIsLoading ? (
          popularAdventures && popularAdventures?.length > 0 ? (
            <CarouselCustom home activities={popularAdventures} />
          ) : (
            <div className="w-full h-[225px] flex flex-col justify-center items-center">
              <MyTypography
                variant="heading3"
                className="text-base md:text-2xl text-center"
              >
                Nenhuma atividade encontrada.
                <p>Faça uma nova busca!</p>
              </MyTypography>
            </div>
          )
        ) : (
          <div className="grid md:grid-cols-4 gap-4 max-sm:hidden">
            {Array.from({ length: 4 }).map((_, index) => (
              <ActivityCardSkeleton key={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
