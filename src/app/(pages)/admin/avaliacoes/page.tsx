import { activities } from "@/common/constants/mock";
import MyTypography from "@/components/atoms/my-typography";
import ActivitiesDetails from "@/components/organisms/activities-details";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import CarouselImages from "@/components/organisms/carousel-images";
import SearchActivity from "@/components/organisms/search-activity";
import CarouselCustom from "@/components/templates/second-section/carousel-custom";
import React from "react";
import AvaliacoesMobile from "./mobile";
import AvaliacoesWeb from "./web";

export default function Avaliações() {
  return (
    <main className="">
      <div className="md:hidden">
        <AvaliacoesMobile />
      </div>
      <div className="max-sm:hidden">
        <AvaliacoesWeb />
      </div>
    </main>
  );
}
