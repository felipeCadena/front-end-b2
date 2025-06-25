"use client";

import React from "react";
import MyTypography from "@/components/atoms/my-typography";
import MyIcon from "@/components/atoms/my-icon";
import { useRouter } from "next/navigation";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import PartnerPaymentCard from "@/components/molecules/partner-payment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { endOfMonth, format, parse, startOfMonth, subMonths } from "date-fns";
import { adminService } from "@/services/api/admin";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Image from "next/image";
import { getYearsArray } from "@/utils/formatters";

type PartnerPayment = {
  partnerFantasyName: string;
  partnerLogo: string;
  total_value_pending: number;
  token_for_pay: string;
  total_value_paid?: number;
  ordersSchedules?: string;
};

export default function PagamentosParceiros() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [loading, setLoading] = React.useState(false);

  const now = new Date();
  const previousMonth = subMonths(now, 1);

  const previousMonthKey = format(previousMonth, "MM");
  const previousYear = format(previousMonth, "yyyy");

  const currentMonthKey = format(new Date(), "MM");
  const currentYear = format(new Date(), "yyyy");

  const [filters, setFilters] = React.useState({
    year: currentYear,
    month: currentMonthKey,
  });

  const [filtersPending, setFiltersPending] = React.useState({
    year: currentYear,
    month: currentMonthKey,
  });
  const selectedMonthDate = React.useMemo(() => {
    return parse(
      `${filters.year}-${Number(filters.month) - 1}-01`,
      "yyyy-MM-dd",
      new Date()
    );
  }, [filters?.month, filters.year]);

  const startsAt = React.useMemo(() => {
    if (filters.month === "00") {
      return `${filters.year}-01-01T00:00:00`;
    }
    return format(startOfMonth(selectedMonthDate), "yyyy-MM-dd'T'00:00:00");
  }, [filters.year, filters.month, selectedMonthDate]);

  const endsAt = React.useMemo(() => {
    if (filters.month === "00") {
      return `${filters.year}-12-31T23:59:59`;
    }
    return format(endOfMonth(selectedMonthDate), "yyyy-MM-dd'T'23:59:59");
  }, [filters.year, filters.month, selectedMonthDate]);

  const selectedMonthDatePending = React.useMemo(() => {
    return parse(
      `${filtersPending.year}-${filtersPending.month}-01`,
      "yyyy-MM-dd",
      new Date()
    );
  }, [filtersPending?.month, filtersPending.year]);

  // const startsAtPending = React.useMemo(() => {
  //   return format(
  //     startOfMonth(selectedMonthDatePending),
  //     "yyyy-MM-dd'T'00:00:00"
  //   );
  // }, [filtersPending.year, filtersPending.month, selectedMonthDatePending]);

  // const endsAtPending = React.useMemo(() => {
  //   return format(
  //     endOfMonth(selectedMonthDatePending),
  //     "yyyy-MM-dd'T'23:59:59"
  //   );
  // }, [filtersPending.year, filtersPending.month, selectedMonthDatePending]);

  const previousMonthDate = React.useMemo(() => {
    return subMonths(selectedMonthDatePending, 1);
  }, [selectedMonthDatePending]);

  const startsAtPending = React.useMemo(() => {
    return format(startOfMonth(previousMonthDate), "yyyy-MM-dd'T'00:00:00");
  }, [previousMonthDate]);

  const endsAtPending = React.useMemo(() => {
    return format(endOfMonth(previousMonthDate), "yyyy-MM-dd'T'23:59:59");
  }, [previousMonthDate]);

  const { data: pending, isLoading } = useQuery({
    queryKey: ["pendingPayments", filtersPending],
    queryFn: () =>
      adminService.listPendingPaidPartners({
        startsAt: startsAtPending,
        endsAt: endsAtPending,
      }),
  });

  const { data: paid, isLoading: isLoadingPaid } = useQuery({
    queryKey: ["paidPayments", filters],
    queryFn: () =>
      adminService.listPendingPaidPartners({
        startsAt,
        endsAt,
        partnerIsPaid: true,
      }),
  });

  const handleMonthChange = (value: string) => {
    setFilters((prev) => ({ ...prev, month: value }));
  };

  const handleMonthPendingChange = (value: string) => {
    setFiltersPending((prev) => ({ ...prev, month: value }));
  };

  async function payPartner(token: string) {
    if (!token) {
      toast.error("Token inválido ou inexistente.");
      return;
    }

    setLoading(true);
    try {
      await adminService.payPartner(token);
      queryClient.invalidateQueries({ queryKey: ["pendingPayments"] });
      toast.success("Pagamento realizado com sucesso!");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const message =
          err.response?.data?.message || "Erro ao realizar pagamento.";
        toast.error(
          `${typeof message === "string" && message !== null ? `Erro: ${message}` : "Erro desconhecido ao realizar pagamento."}`
        );
      } else {
        toast.error("Erro desconhecido ao realizar pagamento.");
      }
    } finally {
      setLoading(false);
    }
  }

  function hasTotalValuePaid(partner: Record<string, any>): boolean {
    return "total_value_paid" in partner;
  }

  const paidPartners: PartnerPayment[] = paid?.partners
    ? Object.values(paid.partners)
    : [];

  const pendingPartners: PartnerPayment[] = pending?.partners
    ? Object.values(pending.partners)
    : [];

  const valorTotal =
    paidPartners.reduce((acc, p) => acc + (p.total_value_paid ?? 0), 0) ??
    0 +
      pendingPartners.reduce(
        (acc, p) => acc + (p.total_value_pending ?? 0),
        0
      ) ??
    0;

  const totalPagamentos = paidPartners.length + pendingPartners.length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 p-2 bg-white">
        <MyIcon
          name="voltar-black"
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle2" weight="bold">
          Pagamentos de Parceiros
        </MyTypography>
      </div>

      {isLoading && isLoadingPaid && (
        <div className="flex items-center justify-center h-[250px]">
          <Image
            src="/logo.png"
            alt="B2 Adventure Logo"
            width={250}
            height={250}
            className="object-contain animate-pulse"
          />
        </div>
      )}

      <div className="w-full p-4 space-y-6 md:space-y-16 md:mt-6">
        {/* Pagos */}
        <div>
          <div className="flex items-center w-full mb-4">
            <MyTypography
              variant="subtitle3"
              weight="bold"
              className="text-nowrap"
            >
              Pagos
            </MyTypography>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-end w-full mb-4">
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
            {paid?.total_orders == 0 && !isLoadingPaid ? (
              <div className="flex items-center justify-center h-[250px]">
                <MyTypography variant="subtitle4" weight="bold">
                  Não há pagamentos realizados.
                </MyTypography>
              </div>
            ) : (
              <div>
                {paidPartners.map((payment: any) => (
                  <PartnerPaymentCard
                    key={payment?.ordersSchedules}
                    name={payment?.partnerFantasyName}
                    amount={payment?.total_value_paid}
                    avatar={payment?.partnerLogo}
                    payday={payment?.payday}
                    status={hasTotalValuePaid(payment) ? "paid" : "pending"}
                    loading={loading}
                    onPay={() => payPartner(payment?.token_for_pay)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Aguardando Pagamento */}
        <div className="w-full">
          <div className="flex items-center w-full mb-4">
            <MyTypography
              variant="subtitle3"
              weight="bold"
              className="text-nowrap"
            >
              Aguardando Pagamento
            </MyTypography>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-end w-full mb-4">
              <div className="flex gap-2 ">
                <MySelect
                  value={filtersPending?.year}
                  onValueChange={(value) => {
                    setFiltersPending((prev) => ({
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
                  value={filtersPending?.month}
                  onValueChange={(value) => handleMonthPendingChange(value)}
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
            {pending?.total_orders == 0 && !isLoading ? (
              <div className="flex items-center justify-center h-[250px]">
                <MyTypography variant="subtitle4" weight="bold">
                  Não há pagamentos pendentes.
                </MyTypography>
              </div>
            ) : (
              <div>
                {pendingPartners.map((payment: any) => (
                  <PartnerPaymentCard
                    key={payment?.ordersSchedules}
                    name={payment?.partnerFantasyName}
                    amount={payment?.total_value_pending}
                    avatar={payment?.partnerLogo}
                    payday={payment?.payday}
                    status={hasTotalValuePaid(payment) ? "paid" : "pending"}
                    loading={loading}
                    onPay={() => payPartner(payment?.token_for_pay)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Resumo */}
        {!isLoadingPaid && !isLoading && (
          <div className="bg-primary-900 p-4 rounded-lg flex justify-between items-center">
            <div>
              <MyTypography variant="body-big" weight="bold">
                Pagamentos
              </MyTypography>
              <MyTypography variant="body-big" weight="bold">
                {totalPagamentos} parceiros esse mês
              </MyTypography>
            </div>
            <div className="flex flex-col items-center">
              <MyTypography
                variant="body-big"
                weight="bold"
                className="text-primary-600 self-end"
              >
                Total:
              </MyTypography>
              <MyTypography
                variant="body-big"
                weight="bold"
                className="text-primary-600"
              >
                {Number(valorTotal).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </MyTypography>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
