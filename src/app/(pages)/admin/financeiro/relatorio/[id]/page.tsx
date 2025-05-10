"use client";

import Lancamentos from "@/components/templates/lancamentos";
import { partnerService } from "@/services/api/partner";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { startOfMonth, endOfMonth, format } from "date-fns";

export default function RelatorioAtividade() {
  const now = new Date();
  const currentMonthKey = format(new Date(), "yyyy-MM");
  const startOfCurrentMonth = format(
    startOfMonth(now),
    "yyyy-MM-dd'T'00:00:00"
  );

  const [filters, setFilters] = React.useState({
    report: "",
    year: "2025",
    month: currentMonthKey,
    typeDate: "",
  });
  const { data: partnerOrders } = useQuery({
    queryKey: ["partnerOrders"],
    queryFn: () =>
      partnerService.getOrders({
        startsAt: "2025-04-01T00:00:00",
        endsAt: "2025-04-30T23:59:59",
      }),
  });

  return (
    <Lancamentos
      data={partnerOrders?.ordersSchedules}
      title="Relatório da atividade"
      filters={filters}
      setFilters={setFilters}
    />
  );
}
