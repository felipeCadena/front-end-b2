"use client";

import React from "react";
import { ptBR } from "date-fns/locale/pt-BR";
import { MyFullCalendar } from "@/components/molecules/my-full-calendar";

export default function Agenda() {
  const [date, setDate] = React.useState<Date>();

  return (
    <section className="w-full bg-white flex flex-col items-center relative">
      <MyFullCalendar
        mode="single"
        selected={date}
        onSelect={setDate}
        locale={ptBR}
        className="capitalize"
      />
    </section>
  );
}
