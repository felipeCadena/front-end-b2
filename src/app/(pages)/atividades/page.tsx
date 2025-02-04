"use client"

import { activities } from "@/common/constants/mock";
import MyTypography from "@/components/atoms/my-typography";
import ShoppingCard from "@/components/molecules/shopping-card";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import SearchActivity from "@/components/organisms/search-activity";
import CarouselCustom from "@/components/templates/second-section/carousel-custom";
import React from "react";

export default function Atividades() {
  return (
    <section className="mx-5">
      <SearchActivity />

      <div className="mt-8 md:hidden">
        <MyTypography variant="heading2" weight="semibold" className="">
          Qual sua próxima aventurar?
        </MyTypography>
        <MyTypography variant="body-big" weight="regular" className="">
          Como você quer se aventurar?
        </MyTypography>
      </div>

      <ActivitiesFilter />

      <div className="my-8 md:my-16">
        <MyTypography variant="heading2" weight="semibold" className="mb-4 md:text-lg">
          Sugestões para você
        </MyTypography>
        <MyTypography variant="subtitle3" weight="regular" className="md:opacity-50">
          Atividades Aéreas
        </MyTypography>
        <CarouselCustom activities={activities} />

        <MyTypography variant="subtitle3" weight="regular" className="md:opacity-50">
          Atividades Terrestres
        </MyTypography>
        <CarouselCustom activities={activities} />

        <MyTypography variant="subtitle3" weight="regular" className="md:opacity-50">
          Atividades no Mar
        </MyTypography>
        <CarouselCustom activities={activities} />
      </div>
      <ShoppingCard items={"1"}/>
    </section>
  );
}
