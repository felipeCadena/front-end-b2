import { activities } from "@/common/constants/mock";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import MyTypography from "@/components/atoms/my-typography";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import ActivitiesHistoric from "@/components/organisms/activities-historic";
import FullActivitiesHistoric from "@/components/organisms/full-activities-historic";
import SearchActivity from "@/components/organisms/search-activity";
import React from "react";

export default function Historico() {
  return (
    <section className="mx-auto max-sm:max-w-5xl">
      <div className="mx-4 space-y-8">
        <div className="md:hidden">
          <SearchActivity />
        </div>
        <ActivitiesFilter />
        <div className="w-full flex items-center justify-between space-x-12 md:hidden">
          <MyTypography variant="subtitle1" weight="bold" className="text-nowrap">
            Histórico de atividades
          </MyTypography>

          <MySelect
            //   value={}
            //   onValueChange={}
          >
            <SelectTrigger className="rounded-2xl text-[#848A9C] text-xs">
              <SelectValue placeholder="Mensal" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="Mensal">Mensal</SelectItem>
              <SelectItem value="Semanal">Semanal</SelectItem>
            </SelectContent>
          </MySelect>
        </div>
        <div className="md:hidden">
          <ActivitiesHistoric activities={activities} />
        </div>
        <div className="max-sm:hidden">
        <FullActivitiesHistoric activities={activities} />
        </div>
      </div>
    </section>
  );
}
