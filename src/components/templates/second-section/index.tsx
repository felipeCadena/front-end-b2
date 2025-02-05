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

      <MyTypography variant="heading3" weight="semibold" className="mt-8">
        Conheça nossas atividades
      </MyTypography>
      <MyTypography variant="body-big" weight="regular" className="">
        Esses são os resultados da sua busca
      </MyTypography>

      <CarouselCustom activities={activities} />


      <MyTypography variant="heading3" weight="semibold" className="mt-8">
        Sugestões para você
      </MyTypography>
      <MyTypography variant="body-big" weight="regular" className="">
        Atividades mais buscadas
      </MyTypography>

      <CarouselCustom activities={activities} />
    </section>
  );
}
