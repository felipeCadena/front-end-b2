"use client";

import MyTypography from "@/components/atoms/my-typography";
import ShoppingCard from "@/components/molecules/shopping-card";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import CarouselCustom from "@/components/templates/second-section/carousel-custom";
import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Adventure, adventures } from "@/services/api/adventures";
import { useCart } from "@/store/useCart";
import { useSession } from "next-auth/react";
import useSearchQueryService from "@/services/use-search-query-service";
import Loading from "@/app/loading";
import SearchActivity from "@/components/organisms/search-activity";
import { cn } from "@/utils/cn";
import { users } from "@/services/api/users";

export default function AtividadesTemplate() {
  const { params } = useSearchQueryService();
  const [adventuresSearch, setAdventuresSearch] = React.useState<Adventure[]>();
  const [selected, setSelected] = React.useState<"ar" | "terra" | "mar" | "">(
    ""
  );

  const { data: activities = [], isLoading } = useQuery({
    queryKey: ["activities", params],
    enabled: !!params,
    queryFn: () =>
      adventures.filterAdventures({
        limit: 100,
        skip: 0,
        ...params,
      }),
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
    setAdventuresSearch(undefined);
    setSelected(value);
    if (value) scrollToSection(value);
  };

  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";

  const { getCartSize } = useCart();

  const cartSize = getCartSize(userId ?? "");

  const filterActivity = (activities: any, typeAdventure: string) => {
    return (
      activities?.filter(
        (activity: any) => activity.typeAdventure === typeAdventure
      ) ?? []
    );
  };

  const handleSearch = (adventures: any) => {
    setAdventuresSearch(adventures);
    setSelected("");
  };

  return isLoading ? (
    <Loading />
  ) : (
    <section className="">
      <div className="mt-8">
        <SearchActivity setFormData={handleSearch} />
      </div>

      <ActivitiesFilter selected={selected} setSelected={handleSelect} />

      {adventuresSearch && (
        <div className={cn("max-sm:ml-5 my-8")}>
          <MyTypography
            variant="heading2"
            weight="semibold"
            className="md:text-lg"
          >
            Atividades mais próximas da sua busca
          </MyTypography>
          {adventuresSearch?.length == 0 ? (
            <div className="w-full h-[225px] flex flex-col justify-center items-center">
              <MyTypography variant="heading3">
                Nenhuma atividade encontrada. Faça uma nova busca!
              </MyTypography>
            </div>
          ) : (
            <CarouselCustom activities={adventuresSearch} />
          )}
        </div>
      )}

      {!adventuresSearch && (
        <div className={cn("max-sm:ml-5 my-8")}>
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
            {filterActivity(activities, "ar")?.length > 0 ? (
              <CarouselCustom activities={filterActivity(activities, "ar")} />
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
            )}
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
            {filterActivity(activities, "terra")?.length > 0 ? (
              <CarouselCustom
                activities={filterActivity(activities, "terra")}
              />
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
            )}
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
            {filterActivity(activities, "mar")?.length > 0 ? (
              <CarouselCustom activities={filterActivity(activities, "mar")} />
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
            )}
          </div>
        </div>
      )}
      {cartSize > 0 && <ShoppingCard isMobile={false} items={cartSize} />}
      {cartSize > 0 && <ShoppingCard isMobile items={cartSize} />}
    </section>
  );
}
