"use client";

import Lancamentos from "@/components/templates/lancamentos";
import { partnerService } from "@/services/api/partner";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { useParams } from "next/navigation";

export default function RelatorioPagamentos() {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const { id: typeAdventure } = useParams();

  const startOfSelectedMonth = format(
    startOfMonth(selectedDate),
    "yyyy-MM-dd'T'00:00:00"
  );

  const endOfSelectedMonth = format(
    endOfMonth(selectedDate),
    "yyyy-MM-dd'T'23:59:59"
  );

  const currentMonthKey = format(new Date(), "MM");

  const [filters, setFilters] = React.useState({
    report: "",
    year: "2025",
    month: currentMonthKey,
    typeDate: "",
  });
  const { data: partnerOrders } = useQuery({
    queryKey: ["partnerOrders", typeAdventure, filters],
    queryFn: () =>
      partnerService.getOrders({
        startsAt: startOfSelectedMonth,
        endsAt: endOfSelectedMonth,
        typeAdventure: typeAdventure as string,
        orderStatus: filters.report,
        orderBy: "createdAt desc",
      }),
  });

  return (
    <Lancamentos
      setSelectedDate={setSelectedDate}
      backButton
      data={partnerOrders}
      title="Relatório da atividade"
      filters={filters}
      setFilters={setFilters}
    />
  );
}
