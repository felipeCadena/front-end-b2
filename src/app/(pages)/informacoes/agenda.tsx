"use client";

import React from "react";
import { ptBR } from "date-fns/locale/pt-BR";
import { MyFullCalendar } from "@/components/molecules/my-full-calendar";
import ActivitiesDetails from "@/components/organisms/activities-details";
import { activities } from "@/common/constants/mock";
import Activities from "@/components/organisms/activities";
import FullActivitiesHistoric from "@/components/organisms/full-activities-historic";

export default function Agenda() {
  const [date, setDate] = React.useState<Date>();

  return (
    <section className="bg-white w-full flex flex-col max-sm:items-center relative">
      <MyFullCalendar
        mode="single"
        selected={date}
        onSelect={setDate}
        locale={ptBR}
        className="capitalize"
      />
      <div className="md:hidden">
        <ActivitiesDetails withDate activities={activities}/>
      </div>

      <div className="max-sm:hidden">
        <FullActivitiesHistoric withDate activities={activities}/>
      </div>
    </section>
  );
}