import { activities } from "@/common/constants/mock";
import MyTypography from "@/components/atoms/my-typography";
import ActivitiesDetails from "@/components/organisms/activities-details";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import CarouselImages from "@/components/organisms/carousel-images";
import SearchActivity from "@/components/organisms/search-activity";
import CarouselCustom from "@/components/templates/second-section/carousel-custom";
import React from "react";

export default function Avaliações() {
  return (
    <main className="max-w-lg mx-auto space-y-8 my-6">
      <SearchActivity />

      <ActivitiesFilter admin />

      <div className="px-4 space-y-4">
        <MyTypography variant="subtitle1" weight="extrabold">
          Favoritos dos nossos Clientes
        </MyTypography>

        <ActivitiesDetails activities={activities.slice(0, 3)} />

        <MyTypography variant="subtitle1" weight="extrabold">
          Atividades com menor avaliação
        </MyTypography>

        <ActivitiesDetails activities={activities.slice(4, 6)} lowRating />

        <MyTypography variant="subtitle1" weight="extrabold">
          Atividades mais procuradas
        </MyTypography>

        <ActivitiesDetails activities={activities.slice(0, 4)} />
      </div>
    </main>
  );
}
