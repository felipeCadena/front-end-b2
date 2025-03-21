"use client";

import React from "react";
import { activities } from "@/common/constants/mock";
import MyTypography from "@/components/atoms/my-typography";
import ActivitiesDetails from "@/components/organisms/activities-details";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import SearchActivity from "@/components/organisms/search-activity";

export default function AvaliacoesMobile() {
  return (
    <section className="space-y-8 my-6">
      <SearchActivity />

      <ActivitiesFilter admin />

      <div className="px-4 space-y-4">
        <MyTypography variant="subtitle1" weight="extrabold">
          Favoritos dos nossos Clientes
        </MyTypography>

        <ActivitiesDetails activities={activities.slice(0, 3)} type="admin" />

        <MyTypography variant="subtitle1" weight="extrabold">
          Atividades com menor avaliação
        </MyTypography>

        <ActivitiesDetails
          activities={activities.slice(4, 6)}
          lowRating
          type="admin"
        />

        <MyTypography variant="subtitle1" weight="extrabold">
          Atividades mais procuradas
        </MyTypography>

        <ActivitiesDetails activities={activities.slice(0, 4)} type="admin" />
      </div>
    </section>
  );
}
