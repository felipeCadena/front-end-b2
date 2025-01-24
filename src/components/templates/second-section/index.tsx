"use client";

import MyTypography from "@/components/atoms/my-typography";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import React from "react";
import CarouselCustom from "./carousel-custom";
import { activities } from "@/common/constants/mock";

export default function SecondSection() {
  return (
    <section className="my-10">
      <MyTypography variant="heading2" weight="semibold" className="">
        Como você quer se aventurar?
      </MyTypography>
      <MyTypography variant="body-big" weight="regular" className="">
        Escolha aqui seu tipo favorito de atividade
      </MyTypography>

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
