"use client"

import MyTypography from "@/components/atoms/my-typography";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import React from "react";
import CarouselCustom from "./carousel-custom";

export default function SecondSection() {
    const activities = [
      {
      images: ["images/ar.png", "images/terra.png", "images/mar.png"],
      tag: "Atividade Aérea",
      stars: 3,
      title: "Escalada Cristo - RJ",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    },
    {
      images: ["images/ar.png", "images/terra.png", "images/mar.png"],
      tag: "Atividade Terrestre",
      stars: 4,
      title: "Voo de Parapente",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    },
    {
      images: ["images/ar.png", "images/terra.png", "images/mar.png"],
      tag: "Atividade no Mar",
      stars: 5,
      title: "Passeio de barco",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    }
    ]


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

      <div className="flex gap-4 mt-6 max-sm:overflow-x-scroll overflow-x-hidden scrollbar-hide">
        {activities.map((activity: any | null | undefined) => (
          <CarouselCustom activity={activity} images={activity.images} key={activity.title}/>
          
        ))}
      </div>
      <div className="flex gap-4 mt-10 max-sm:overflow-x-scroll overflow-x-hidden scrollbar-hide">
        {activities.map((activity: any | null | undefined) => (
          <CarouselCustom activity={activity} images={activity.images} key={activity.title}/>
          
        ))}
      </div>
    </section>
  );
}
