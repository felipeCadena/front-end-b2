"use client";

import React from "react";
import { ptBR } from "date-fns/locale/pt-BR";
import { MyFullCalendar } from "@/components/molecules/my-full-calendar";
import ActivitiesDetails from "@/components/organisms/activities-details";
import { activities } from "@/common/constants/mock";

export default function Agenda() {
  const [date, setDate] = React.useState<Date>();

  return (
    <section className=" bg-white flex flex-col items-center relative">
      <MyFullCalendar
        mode="single"
        selected={date}
        onSelect={setDate}
        locale={ptBR}
        className="capitalize"
      />
      <ActivitiesDetails withDate activities={activities}/>
    </section>
  );
}
