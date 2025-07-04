"use client";

import MyTypography from "@/components/atoms/my-typography";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import Image from "next/image";
import { cn } from "@/utils/cn";
import {
  MyTable,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/molecules/my-table";
import { getData, getHora, getYearsArray } from "@/utils/formatters";
import MyIcon from "@/components/atoms/my-icon";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { partnerService } from "@/services/api/partner";
import { endOfMonth, format, parse, startOfMonth } from "date-fns";
import { adminService } from "@/services/api/admin";
import { Pagination } from "@/components/molecules/pagination";

export default function RelatorioAdmin() {
  const router = useRouter();
  const { id: typeAdventure } = useParams();

  const [page, setPage] = React.useState(1);

  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

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
    year: "2025",
    month: currentMonthKey,
  });

  const selectedMonthDate = React.useMemo(() => {
    return parse(
      `${filters.year}-${filters.month}-01`,
      "yyyy-MM-dd",
      new Date()
    );
  }, [filters?.month, filters.year]);

  const startDate = React.useMemo(() => {
    return format(startOfMonth(selectedMonthDate), "yyyy-MM-dd'T'00:00:00");
  }, [selectedMonthDate]);

  const endDate = React.useMemo(() => {
    return format(endOfMonth(selectedMonthDate), "yyyy-MM-dd'T'23:59:59");
  }, [selectedMonthDate]);

  const { data: allOrders, isLoading } = useQuery({
    queryKey: ["listOrdersAdventures", page, filters, typeAdventure],
    enabled: !!typeAdventure,
    queryFn: () =>
      adminService.listOrdersAdventures({
        startCreatedAt: startDate,
        endCreatedAt: endDate,
        adventureType: typeAdventure as string,
        limit: 100,
        skip: page * 100 - 100,
      }),
  });

  const handleMonthChange = (value: string) => {
    setFilters((prev) => ({ ...prev, month: value }));
  };

  const parsedRows = React.useMemo(() => {
    if (!allOrders) return [];

    const groupedByPartnerAndOrder: Record<string, any[]> = {};

    allOrders.forEach((item: any) => {
      const key = `${item.adventure.partner.fantasyName}-${item.orderAdventureId}`;
      if (!groupedByPartnerAndOrder[key]) {
        groupedByPartnerAndOrder[key] = [];
      }
      groupedByPartnerAndOrder[key].push(item);
    });

    return Object.entries(groupedByPartnerAndOrder).map(([key, items]) => {
      const first = items[0];
      const partnerName = first.adventure.partner.fantasyName;
      const partnerLogo = first.adventure.partner.logo?.url;
      const pedidoId = first.orderAdventure.id;

      const partnerValueTotal = items.reduce(
        (sum, i) => sum + Number(i.partnerValue || 0),
        0
      );
      const b2ValueTotal = items.reduce(
        (sum, i) => sum + Number(i.b2AdventureValue || 0),
        0
      );
      const taxs = items.reduce((sum, i) => sum + Number(i.totalTaxes || 0), 0);
      const geral = partnerValueTotal + b2ValueTotal + taxs;

      return {
        partnerId: key,
        partnerName,
        partnerLogo,
        pedidoId,
        qntAgendas: items.length,
        totalPartner: partnerValueTotal,
        totalB2: b2ValueTotal,
        taxs,
        totalGeral: geral,
      };
    });
  }, [allOrders]);

  return (
    <section className="max-w-screen-xl mx-auto py-2 md:py-8 px-4 overflow-hidden">
      {/* Header */}
      <div className={cn("flex items-center my-4 gap-4")}>
        <div className="flex gap-2 items-center">
          {
            <MyIcon
              name="voltar-black"
              className="cursor-pointer"
              onClick={() => router.back()}
            />
          }

          <MyTypography
            variant="heading3"
            weight="bold"
            className={cn("text-[1.1rem] md:text-[1.3rem]")}
          >
            Relatório das atividades do tipo {typeAdventure ?? ""}
          </MyTypography>
        </div>
      </div>
      <div className="flex justify-end w-full mb-4">
        <div className="flex gap-2 ">
          <MySelect
            value={filters?.year}
            onValueChange={(value) => {
              setFilters((prev) => ({
                ...prev,
                year: value,
              }));
            }}
          >
            <SelectTrigger className="rounded-2xl w-[150px] text-[#848A9C] text-xs">
              <SelectValue placeholder="Setembro" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              {getYearsArray().map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </MySelect>

          <MySelect
            value={filters?.month}
            onValueChange={(value) => handleMonthChange(value)}
          >
            <SelectTrigger className="rounded-2xl w-[150px] text-[#848A9C] text-xs">
              <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="01">Janeiro</SelectItem>
              <SelectItem value="02">Fevereiro</SelectItem>
              <SelectItem value="03">Março</SelectItem>
              <SelectItem value="04">Abril</SelectItem>
              <SelectItem value="05">Maio</SelectItem>
              <SelectItem value="06">Junho</SelectItem>
              <SelectItem value="07">Julho</SelectItem>
              <SelectItem value="08">Agosto</SelectItem>
              <SelectItem value="09">Setembro</SelectItem>
              <SelectItem value="10">Outubro</SelectItem>
              <SelectItem value="11">Novembro</SelectItem>
              <SelectItem value="12">Dezembro</SelectItem>
            </SelectContent>
          </MySelect>
        </div>
      </div>

      <MyTable className="md:border-collapse mt-4">
        <TableHeader>
          <TableRow className="text-xs md:text-sm font-semibold">
            <TableHead className="text-center">Parceiro</TableHead>
            <TableHead className="text-center">Pedido</TableHead>
            <TableHead className="text-center">Agenda por pedido</TableHead>
            <TableHead className="text-center">Total B2</TableHead>
            <TableHead className="text-center">Total Parceiro</TableHead>
            <TableHead className="text-center">Total das taxas</TableHead>
            <TableHead className="text-center">Total Geral</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                <div className="flex items-center justify-center h-[200px] overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="B2 Adventure Logo"
                    width={250}
                    height={250}
                    className="object-contain animate-pulse"
                  />
                </div>
              </TableCell>
            </TableRow>
          ) : parsedRows?.length > 0 ? (
            parsedRows.map((row: any) => (
              <TableRow
                key={`${row.pedidoId}-${row.partnerId}`}
                className="h-12 relative bg-gray-100 text-xs md:text-sm text-center"
              >
                <TableCell className="max-sm:px-2 max-sm:py-3 rounded-l-md">
                  <div className="flex items-center justify-start gap-2 px-8">
                    {
                      <Image
                        src={row.partnerLogo ?? "/user.png"}
                        alt={row.partnerName}
                        width={24}
                        height={24}
                        className="rounded-full object-cover"
                      />
                    }
                    <MyTypography variant="body" weight="bold">
                      {row.partnerName}
                    </MyTypography>
                  </div>
                </TableCell>

                <TableCell>
                  <MyTypography variant="body">{row.pedidoId}</MyTypography>
                </TableCell>

                <TableCell>
                  <MyTypography variant="body">{row.qntAgendas}</MyTypography>
                </TableCell>

                <TableCell>
                  R${" "}
                  {row.totalB2.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>

                <TableCell>
                  R${" "}
                  {row.totalPartner.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>

                <TableCell className="rounded-r-md">
                  R${" "}
                  {row.taxs.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>

                <TableCell className="rounded-r-md">
                  R${" "}
                  {row.totalGeral.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-52 md:text-center max-sm:pr-12"
              >
                <span className="text-md md:text-xl">
                  Nenhum pedido encontrado para o mês e/ou ano selecionados
                </span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow className="text-xs md:text-sm font-semibold">
            <TableHead className="text-center">Valores totais</TableHead>
            <TableCell className="text-center text-white">0</TableCell>
            <TableCell className="text-center">
              {allOrders?.length ?? 0}
            </TableCell>
            <TableCell className="text-center">
              {allOrders
                ?.reduce(
                  (acc: number, i: any) =>
                    acc + Number(i.b2AdventureValue || 0),
                  0
                )
                .toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
            </TableCell>
            <TableCell className="text-center">
              {allOrders
                ?.reduce(
                  (acc: number, i: any) => acc + Number(i.partnerValue || 0),
                  0
                )
                .toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
            </TableCell>
            <TableCell className="text-center">
              {allOrders
                ?.reduce(
                  (acc: number, i: any) => acc + Number(i.totalTaxes || 0),
                  0
                )
                .toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
            </TableCell>
            <TableCell className="text-center">
              {allOrders
                ?.reduce(
                  (acc: number, i: any) =>
                    acc +
                    Number(i.totalTaxes || 0) +
                    Number(i.partnerValue || 0) +
                    Number(i.b2AdventureValue || 0),
                  0
                )
                .toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
            </TableCell>
          </TableRow>
        </TableFooter>
      </MyTable>

      <div className="flex w-full justify-center items-center">
        <Pagination
          setPage={setPage}
          page={page}
          limit={100}
          data={allOrders ?? []}
        />
      </div>
    </section>
  );
}
