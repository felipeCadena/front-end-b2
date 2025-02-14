"use client";

import MyTypography from "@/components/atoms/my-typography";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import React from "react";
import CarouselCustom from "./carousel-custom";
import { activities } from "@/common/constants/mock";

export default function SecondSection() {
  return (
    <section className="">
      <ActivitiesFilter />

      <MyTypography variant="heading2" weight="semibold" className="mt-8">
        Conheça nossas atividades
      </MyTypography>
      <MyTypography variant="subtitle3" weight="regular" className="mt-1">
        Esses são os resultados da sua busca
      </MyTypography>

      <CarouselCustom activities={activities} />

      <div className="border-2 border-gray-200 w-1/2 mx-auto rounded-md md:hidden" />

      <MyTypography variant="heading2" weight="semibold" className="mt-8">
        Sugestões para você!
      </MyTypography>
      <MyTypography variant="subtitle3" weight="regular" className="mt-1">
        Atividades mais buscadas
      </MyTypography>

      <CarouselCustom activities={activities} />
    </section>
  );
}
