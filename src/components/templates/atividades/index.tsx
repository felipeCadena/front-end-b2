"use client";

import {
  activitiesAir,
  activitiesLand,
  activitiesOcean,
} from "@/common/constants/mock";
import MyTypography from "@/components/atoms/my-typography";
import ShoppingCard from "@/components/molecules/shopping-card";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import SearchActivity from "@/components/organisms/search-activity";
import CarouselCustom from "@/components/templates/second-section/carousel-custom";
import React from "react";

export default function AtividadesTemplate() {
  return (
    <section className="mx-5">
      <SearchActivity />

      <ActivitiesFilter />

      <div className="my-8 md:my-16">
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
        <CarouselCustom activities={activitiesAir} />

        <div className="border-2 border-gray-200 w-1/2 mx-auto rounded-md mb-6 md:hidden" />

        <MyTypography
          variant="subtitle3"
          weight="regular"
          className="md:opacity-50 md:mt-8"
        >
          Atividades Terrestres
        </MyTypography>
        <CarouselCustom activities={activitiesLand} />

        <div className="border-2 border-gray-200 w-1/2 mx-auto rounded-md mb-6 md:hidden" />

        <MyTypography
          variant="subtitle3"
          weight="regular"
          className="md:opacity-50 md:mt-8"
        >
          Atividade na Água
        </MyTypography>
        <CarouselCustom activities={activitiesOcean} />
      </div>
      <ShoppingCard items={"1"} />
    </section>
  );
}
