"use client";

import { activities } from "@/common/constants/mock";
import Activities from "@/components/organisms/activities";
import ActivitiesDetails from "@/components/organisms/activities-details";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import SearchActivity from "@/components/organisms/search-activity";
import React from "react";

export default function Favoritos() {
  return (
    <section className="mx-auto mb-15 max-sm:max-w-5xl">
      <div className="mx-4 space-y-8 md:space-y-16">
        <div className="md:hidden">
          <SearchActivity />
        </div>
        <ActivitiesFilter withoutText />

        <div className="md:hidden">
          <ActivitiesDetails activities={activities} />
        </div>

        <div className="max-sm:hidden">
          <Activities activities={activities} />
        </div>
      </div>
    </section>
  );
}
