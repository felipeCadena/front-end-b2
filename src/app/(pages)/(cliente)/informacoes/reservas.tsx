"use client";

import React from "react";
import { ptBR } from "date-fns/locale/pt-BR";
import { MyFullCalendar } from "@/components/molecules/my-full-calendar";
import ActivitiesDetails from "@/components/organisms/activities-details";
import { activities } from "@/common/constants/mock";
import FullActivitiesHistoric from "@/components/organisms/full-activities-historic";
import { useQuery } from "@tanstack/react-query";
import { adventures } from "@/services/api/adventures";

export default function Reservas() {
  const [date, setDate] = React.useState<Date>();

  const { data: agenda } = useQuery({
    queryKey: ["agenda"],
    queryFn: () => adventures.getAdventures(),
  });

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
        <ActivitiesDetails withDate activities={agenda ? agenda : []} />
      </div>

      <div className="max-sm:hidden">
        <FullActivitiesHistoric withDate activities={activities} />
      </div>
    </section>
  );
}
