"use client";

import {
  activitiesAir,
  activitiesLand,
  activitiesOcean,
  newActivities,
} from "@/common/constants/mock";
import MyTypography from "@/components/atoms/my-typography";
import ShoppingCard from "@/components/molecules/shopping-card";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import SearchActivity from "@/components/organisms/search-activity";
import CarouselCustom from "@/components/templates/second-section/carousel-custom";
import React from "react";

export default function AtividadesTemplate() {
  return (
    <section className="">
      <SearchActivity />

      <ActivitiesFilter />

      <div className="ml-5 my-8 md:my-16">
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
        <CarouselCustom
          activities={newActivities.map((activity) => ({
            ...activity,
            addressComplement: activity.addressComplement || "",
          }))}
        />

        <div className="border-2 border-gray-200 w-1/2 mx-auto rounded-md mb-6 md:hidden" />

        <MyTypography
          variant="subtitle3"
          weight="regular"
          className="md:opacity-50 md:mt-8"
        >
          Atividades Terrestres
        </MyTypography>
        <CarouselCustom
          activities={newActivities.map((activity) => ({
            ...activity,
            addressComplement: activity.addressComplement || "",
          }))}
        />

        <div className="border-2 border-gray-200 w-1/2 mx-auto rounded-md mb-6 md:hidden" />

        <MyTypography
          variant="subtitle3"
          weight="regular"
          className="md:opacity-50 md:mt-8"
        >
          Atividades Aquática
        </MyTypography>
        <CarouselCustom
          activities={newActivities.map((activity) => ({
            ...activity,
            addressComplement: activity.addressComplement || "",
          }))}
        />
      </div>
      <ShoppingCard items={"1"} />
    </section>
  );
}
