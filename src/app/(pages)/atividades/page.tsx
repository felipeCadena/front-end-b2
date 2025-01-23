"use client"

import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import ShoppingCard from "@/components/molecules/shopping-card";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import SearchActivity from "@/components/organisms/search-activity";
import CarouselCustom from "@/components/templates/second-section/carousel-custom";
import React from "react";

export default function Atividades() {
  const activities = [
    {
      image: "images/mar.png",
      tag: "Atividade no Mar",
      stars: 5,
      title: "Passeio de barco",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
      favorite: true,
    },
    {
      image: "images/ar.png",
      tag: "Atividade Aérea",
      stars: 3,
      title: "Escalada Cristo - RJ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    },
    {
      image: "images/terra.png",
      tag: "Atividade Terrestre",
      stars: 4,
      title: "Voo de Parapente",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
      favorite: true,
    },
    {
      image: "images/mar.png",
      tag: "Atividade no Mar",
      stars: 5,
      title: "Passeio de barco",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    },
  ];

  return (
    <section>
      <SearchActivity />

      <div className="mt-8">
        <MyTypography variant="heading2" weight="semibold" className="">
          Qual sua próxima aventurar?
        </MyTypography>
        <MyTypography variant="body-big" weight="regular" className="">
          Como você quer se aventurar?
        </MyTypography>
      </div>

      <ActivitiesFilter />

      <div className="my-4">
        <MyTypography variant="heading2" weight="semibold" className="">
          Sugestões para você
        </MyTypography>
        <MyTypography variant="subtitle2" weight="semibold" className="mt-4">
          Atividades Aéreas
        </MyTypography>
        <CarouselCustom activities={activities} />

        <MyTypography variant="subtitle2" weight="semibold" className="">
          Atividades Terrestres
        </MyTypography>
        <CarouselCustom activities={activities} />

        <MyTypography variant="subtitle2" weight="semibold" className="">
          Atividades no Mar
        </MyTypography>
        <CarouselCustom activities={activities} />
      </div>
      <ShoppingCard items={"3"}/>
    </section>
  );
}
