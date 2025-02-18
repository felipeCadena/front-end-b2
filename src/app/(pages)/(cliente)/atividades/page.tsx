"use client"

import { activitiesAir, activitiesLand, activitiesOcean } from "@/common/constants/mock";
import MyTypography from "@/components/atoms/my-typography";
import ShoppingCard from "@/components/molecules/shopping-card";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import SearchActivity from "@/components/organisms/search-activity";
import AtividadesTemplate from "@/components/templates/atividades";
import CarouselCustom from "@/components/templates/second-section/carousel-custom";
import React from "react";

export default function Atividades() {
  return (
    <AtividadesTemplate />
  );
}
