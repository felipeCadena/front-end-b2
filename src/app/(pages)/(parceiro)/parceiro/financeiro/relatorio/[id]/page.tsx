"use client";

import Lancamentos from "@/components/templates/lancamentos";
import { partnerService } from "@/services/api/partner";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { startOfMonth, endOfMonth, format } from "date-fns";
import useSearchQueryService from "@/services/use-search-query-service";
import { useParams } from "next/navigation";

export default function RelatorioAtividade() {
  const now = new Date();
  const { id: typeAdventure } = useParams();

  const currentMonthKey = format(new Date(), "yyyy-MM");
  const startOfCurrentMonth = format(
    startOfMonth(now),
    "yyyy-MM-dd'T'00:00:00"
  );

  const [filters, setFilters] = React.useState({
    report: "pago",
    year: "2025",
    month: "04",
  });
  const { data: partnerOrders } = useQuery({
    queryKey: ["partnerOrders", typeAdventure],
    queryFn: () =>
      partnerService.getOrders({
        startsAt: "2025-04-01T00:00:00",
        endsAt: "2025-04-30T23:59:59",
        typeAdventure: typeAdventure as string,
      }),
  });

  return (
    <Lancamentos
      backButton
      data={partnerOrders?.ordersSchedules}
      title="Relatório da atividade"
      filters={filters}
      setFilters={setFilters}
    />
  );
}
