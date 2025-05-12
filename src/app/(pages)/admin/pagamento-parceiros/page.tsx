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
import { endOfMonth, format, startOfMonth } from "date-fns";
import { adminService } from "@/services/api/admin";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

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
  const currentMonthKey = format(new Date(), "MM");

  const startsAt = format(startOfMonth(now), "yyyy-MM-dd'T'00:00:00");
  const endsAt = format(endOfMonth(now), "yyyy-MM-dd'T'00:00:00");

  const { data: pending, isLoading } = useQuery({
    queryKey: ["pendingPayments"],
    queryFn: () =>
      adminService.listPendingPaidPartners({
        startsAt,
        endsAt,
      }),
  });

  const { data: paid, isLoading: isLoadingPaid } = useQuery({
    queryKey: ["paidPayments"],
    queryFn: () =>
      adminService.listPendingPaidPartners({
        startsAt,
        endsAt,
        partnerIsPaid: true,
      }),
  });

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
    paidPartners.reduce((acc, p) => acc + p.total_value_pending, 0) +
    pendingPartners.reduce((acc, p) => acc + p.total_value_pending, 0);

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
            <div className="ml-auto">
              <MySelect
                //   value={}
                //   onValueChange={}
                value="Mensal"
              >
                <SelectTrigger className="rounded-2xl text-[#848A9C] text-xs">
                  <SelectValue placeholder="Mensal" />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="Mensal">Mensal</SelectItem>
                  <SelectItem value="Semanal">Semanal</SelectItem>
                </SelectContent>
              </MySelect>
            </div>
          </div>

          <div className="space-y-3">
            {paid?.total_orders == 0 && !isLoadingPaid ? (
              <div className="flex items-center justify-center h-[100px]">
                <MyTypography variant="subtitle4" weight="bold">
                  Não há pagamentos realizados.
                </MyTypography>
              </div>
            ) : (
              paidPartners.map((payment: any) => (
                <PartnerPaymentCard
                  key={payment?.ordersSchedules}
                  name={payment?.partnerFantasyName}
                  amount={payment?.total_value_pending}
                  avatar={payment?.partnerLogo}
                  status={hasTotalValuePaid(payment) ? "paid" : "pending"}
                  loading={loading}
                  onPay={() => payPartner(payment?.token_for_pay)}
                />
              ))
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
            <div className="ml-auto">
              <MySelect value="Mensal">
                <SelectTrigger className="rounded-2xl text-[#848A9C] text-xs">
                  <SelectValue placeholder="Mensal" />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="Mensal">Mensal</SelectItem>
                  <SelectItem value="Semanal">Semanal</SelectItem>
                </SelectContent>
              </MySelect>
            </div>
          </div>

          <div className="space-y-3">
            {pending?.total_orders == 0 && !isLoading ? (
              <div className="flex items-center justify-center h-[250px]">
                <MyTypography variant="subtitle4" weight="bold">
                  Não há pagamentos pendentes.
                </MyTypography>
              </div>
            ) : (
              pendingPartners.map((payment: any) => (
                <PartnerPaymentCard
                  key={payment?.ordersSchedules}
                  name={payment?.partnerFantasyName}
                  amount={payment?.total_value_pending}
                  avatar={payment?.partnerLogo}
                  status={hasTotalValuePaid(payment) ? "paid" : "pending"}
                  loading={loading}
                  onPay={() => payPartner(payment?.token_for_pay)}
                />
              ))
            )}
          </div>
        </div>

        {/* Resumo */}
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
              {valorTotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </MyTypography>
          </div>
        </div>
      </div>
    </div>
  );
}
