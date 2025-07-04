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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/molecules/my-table";
import { getData, getHora, getYearsArray } from "@/utils/formatters";
import MyIcon from "@/components/atoms/my-icon";
import { useRouter } from "next/navigation";
import React from "react";

export default function Lancamentos({
  data,
  withoutFilters = false,
  backButton = false,
  title = "Seus lançamentos",
  filters,
  isLoading,
  setFilters,
  setSelectedDate,
}: {
  data: any;
  withoutFilters?: boolean;
  backButton?: boolean;
  title?: string;
  filters: any;
  isLoading?: boolean;
  setSelectedDate?: React.Dispatch<React.SetStateAction<Date>>;
  setFilters: React.Dispatch<
    React.SetStateAction<{
      report: string;
      year: string;
      month: string;
      typeDate: string;
    }>
  >;
}) {
  const router = useRouter();

  const handleMonthChange = (value: string) => {
    setFilters((prev) => ({ ...prev, month: value, typeDate: "month" }));
  };

  return (
    <section className="mx-auto py-2 md:py-8 px-4 overflow-hidden">
      {/* Header */}
      <div
        className={cn(
          "flex items-center my-4",
          withoutFilters ? "gap-4" : "justify-between"
        )}
      >
        <div className="flex gap-2 items-center">
          {backButton && (
            <MyIcon
              name="voltar-black"
              className="cursor-pointer"
              onClick={() => router.back()}
            />
          )}

          <MyTypography
            variant="heading3"
            weight="bold"
            className={cn(
              "text-[1.1rem] md:text-[1.3rem]",
              !withoutFilters && "underline decoration-primary-600"
            )}
          >
            {title}
          </MyTypography>
        </div>

        {!withoutFilters && (
          <div className="flex gap-4 max-sm:hidden">
            <MySelect
              value={filters?.report}
              onValueChange={(value) => {
                setFilters((prev) => ({ ...prev, report: value }));
              }}
            >
              <SelectTrigger className="rounded-2xl w-[150px] text-[#848A9C] text-xs">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                <SelectItem value="a_receber">A receber</SelectItem>
                <SelectItem value="recebido">Recebido</SelectItem>
                <SelectItem value="cancelado">Cancelada</SelectItem>
              </SelectContent>
            </MySelect>

            {/* <MySelect defaultValue="data">
            <SelectTrigger className="rounded-2xl w-[180px] text-[#848A9C] text-xs">
              <SelectValue placeholder="Data da atividade" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="data">Data da atividade</SelectItem>
              <SelectItem value="nome">Nome da atividade</SelectItem>
            </SelectContent>
          </MySelect> */}

            <MySelect
              value={filters?.year}
              onValueChange={(value) => {
                setFilters((prev) => ({
                  ...prev,
                  year: value,
                  typeDate: "year",
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
        )}
      </div>

      <MyTable className="md:border-collapse mt-4">
        <TableHeader>
          <TableRow className="text-xs md:text-sm font-semibold">
            <TableHead className="text-center">Passeio</TableHead>
            <TableHead>Data da Atividade</TableHead>
            <TableHead className="max-sm:hidden text-center">
              Duração da Atividade
            </TableHead>
            <TableHead className="max-sm:hidden text-center">
              Quant. de pessoas
            </TableHead>
            <TableHead className="text-center">Total s/ taxas:</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
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
          )}
          {data && data.ordersSchedules.length > 0 && !isLoading
            ? data.ordersSchedules.map((lancamento: any) => (
                <TableRow
                  key={lancamento?.id}
                  className={cn(
                    "relative bg-gray-100 text-xs md:text-sm text-center",
                    lancamento?.partnerIsPaid === "realizado" &&
                      "bg-primary-800",
                    lancamento?.adventureStatus.includes("cancelado") &&
                      "bg-[#FFE3E3]"
                  )}
                >
                  <TableCell className="max-sm:px-2 max-sm:py-3 rounded-l-md">
                    <div className="flex items-center gap-6">
                      <Image
                        src={
                          lancamento?.adventure?.imagens
                            ? lancamento?.adventure?.imagens[0]?.url
                            : "/images/atividades/paraquedas.webp"
                        }
                        alt={lancamento?.id}
                        width={80}
                        height={80}
                        className="w-[70px] h-[70px] rounded-md object-cover max-sm:hidden"
                      />
                      <MyTypography
                        variant="body"
                        weight="bold"
                        className={cn(
                          lancamento?.adventureStatus.includes("cancelado") &&
                            "line-through"
                        )}
                      >
                        {lancamento?.adventure?.title}
                      </MyTypography>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {getData(lancamento?.schedule?.datetime)}{" "}
                    <span className="max-sm:hidden">{` - ${getHora(lancamento?.schedule?.datetime)}`}</span>
                  </TableCell>
                  <TableCell className="max-sm:hidden md:px-8">
                    {lancamento?.adventure?.duration} horas
                  </TableCell>
                  <TableCell className="max-sm:hidden md:px-4">
                    {lancamento?.qntAdults +
                      lancamento?.qntChildren +
                      lancamento?.qntBabies}{" "}
                    pessoas
                  </TableCell>
                  <TableCell
                    className={cn(
                      "border-r-8 rounded-r-md border-opacity-50 border-gray-300",
                      lancamento?.partnerIsPaid && " border-[#C0E197]",
                      lancamento?.adventureStatus.includes("cancelado") &&
                        "border-[#FF5757]"
                    )}
                  >
                    {lancamento?.adventureStatus.includes("cancelado")
                      ? "Cancelado"
                      : `${Number(lancamento?.partnerValue).toLocaleString(
                          "pt-BR",
                          {
                            style: "currency",
                            currency: "BRL",
                          }
                        )} `}
                  </TableCell>
                </TableRow>
              ))
            : !isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    <MyTypography
                      variant="subtitle3"
                      weight="bold"
                      className="my-12"
                    >
                      Não há lançamentos{" "}
                      {filters?.report == "cancelado"
                        ? "cancelados"
                        : filters?.report == "a_receber"
                          ? "a receber"
                          : "recebidos"}{" "}
                      {/* para este período */}
                    </MyTypography>
                  </TableCell>
                </TableRow>
              )}
        </TableBody>
      </MyTable>

      {/* Footer com valor total */}
      {data &&
        data?.ordersSchedules?.length > 0 &&
        filters?.report != "cancelado" && (
          <div className="flex justify-between items-center bg-[#a0e2ff46] p-4 rounded-lg mt-4 relative">
            <MyTypography variant="body" weight="bold" className="md:px-2">
              Valor{" "}
              {filters?.report == "receber"
                ? "a receber"
                : filters?.report == ""
                  ? ""
                  : "recebido"}
              :
            </MyTypography>
            <span className="text-[#00A3FF] text-xs max-sm:hidden">
              ----------------------------------------------------------------------------------------------------------------
            </span>
            <MyTypography
              variant="body"
              weight="bold"
              className="text-[#00A3FF] px-4"
            >
              {filters?.report == "a_receber" ? (
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data?.total_value_pending)
              ) : filters?.report == "recebido" ? (
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data?.total_value_paid)
              ) : (
                <span className="">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(data?.total_value_paid + data?.total_value_pending)}
                </span>
              )}
            </MyTypography>
            <div
              className={cn(
                "absolute right-0 top-0 h-full w-2 rounded-r-md opacity-50 bg-[#00A3FF]"
              )}
            />
          </div>
        )}
    </section>
  );
}
