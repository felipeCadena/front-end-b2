"use client";

import React from "react";
import MyTypography from "@/components/atoms/my-typography";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import MyButton from "@/components/atoms/my-button";
import { useRouter } from "next/navigation";
import PartnerPaymentCard from "@/components/molecules/partner-payment";
import PartnerApprovalCard from "@/components/molecules/partner-approval";
import ActivityStatusCard from "@/components/molecules/activity-status";
import PATHS from "@/utils/paths";
import SearchActivity from "@/components/organisms/search-activity";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/api/admin";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Adventure } from "@/services/api/adventures";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import { Pagination } from "@/components/molecules/pagination";
import Image from "next/image";

type PartnerPayment = {
  ordersSchedules: string;
  partnerFantasyName: string;
  total_value_pending: number;
  partnerLogo: string;
  token_for_pay: string;
  // outros campos...
};

type PendingPayments = {
  total_orders: number;
  partners: Record<string, PartnerPayment>;
};

export default function AdminMobile() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [loading, setLoading] = React.useState(false);
  const [filter, setFilter] = React.useState("pendente");

  const [pageActivities, setPageActivities] = React.useState(1);
  const [refusalMsg, setRefusalMsg] = React.useState("");
  const [loadingItem, setLoadingItem] = React.useState<{
    id: number;
  } | null>(null);

  const [allActivities, setAllActivities] = React.useState<Adventure[]>([]);
  const [activitiesNotAprovved, setActivitiesNotAprovved] = React.useState<
    Adventure[]
  >([]);

  const now = new Date();
  const currentMonthKey = format(new Date(), "MM");

  const startsAt = format(startOfMonth(now), "yyyy-MM-dd'T'00:00:00");
  const endsAt = format(endOfMonth(now), "yyyy-MM-dd'T'00:00:00");

  const { data: pendingPayments, isLoading } = useQuery({
    queryKey: ["pendingPayments"],
    queryFn: () =>
      adminService.listPendingPaidPartners({
        startsAt,
        endsAt,
        limit: 6,
      }),
  });

  const { isLoading: activitiesLoading } = useQuery({
    queryKey: ["activitiesNotAprooved", pageActivities],
    queryFn: async () => {
      const adventures = await adminService.searchAdventures({
        // startsAt,
        // endsAt,
        adminApproved: false,
        limit: 6,
        skip: pageActivities * 6 - 6,
      });
      setAllActivities(adventures);
      setActivitiesNotAprovved(
        adventures.filter(
          (activity) =>
            !activity.refusalMsg || activity.refusalMsg.trim() === ""
        )
      );
      return adventures;
    },
  });

  const handleFilter = (value: string) => {
    setFilter(value);
    if (value === "pendente") {
      setActivitiesNotAprovved(
        allActivities.filter(
          (activity) =>
            !activity.refusalMsg || activity.refusalMsg.trim() === ""
        )
      );
    }

    if (value === "recusado") {
      setActivitiesNotAprovved(
        allActivities.filter(
          (activity) =>
            activity.refusalMsg && activity.refusalMsg.trim().length > 0
        )
      );
    }
  };

  function hasTotalValuePaid(partner: Record<string, any>): boolean {
    return "total_value_paid" in partner;
  }

  async function payPartner(token: string) {
    if (!token) {
      toast.error("Token inválido ou inexistente.");
      return;
    }

    setLoading(true);
    try {
      const paid = await adminService.payPartner(token);
      queryClient.invalidateQueries({ queryKey: ["pendingPayments"] });
      toast.success(paid?.message ?? "Pagamento realizado com sucesso!");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const message =
          err.response?.data?.message == "string"
            ? err.response?.data?.message
            : "Erro ao realizar pagamento.";
        toast.error(`${message}`);
      } else {
        toast.error("Erro desconhecido ao realizar pagamento.");
      }
    } finally {
      setLoading(false);
    }
  }

  const onApproveActivity = async (id: number) => {
    setLoadingItem({ id });
    const body = {
      adminApproved: true,
      onSite: true,
      refusalMsg: "",
    };
    try {
      await adminService.approveOrRejectAdventure(id, body);
      toast.success("Atividade aprovada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["activitiesNotAprooved"] });
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const message =
          err.response?.data?.message == "string"
            ? err.response?.data?.message
            : "Erro ao aprovar atividade.";
        toast.error(`${message}`);
      } else {
        toast.error("Erro desconhecido ao aprovar atividade.");
      }
    } finally {
      setLoadingItem(null);
    }
  };

  const onRejectActivity = async (id: number) => {
    setLoadingItem({ id });

    const body = {
      adminApproved: false,
      onSite: false,
      refusalMsg,
    };
    try {
      await adminService.approveOrRejectAdventure(id, body);
      toast.success("Atividade rejeitada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["activitiesNotAprooved"] });
      setRefusalMsg("");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const message =
          err.response?.data?.message == "string"
            ? err.response?.data?.message
            : "Erro ao rejeitar atividade.";
        toast.error(`${message}`);
      } else {
        toast.error("Erro desconhecido ao rejeitar atividade.");
      }
    } finally {
      setLoadingItem(null);
    }
  };

  return (
    <main className=" space-y-8 mt-6">
      <div className="px-4">
        <MyTypography variant="subtitle2" weight="bold" className="my-4">
          Pagamentos de Parceiros
        </MyTypography>
        <div className="space-y-3">
          {pendingPayments?.total_orders == 0 && !isLoading ? (
            <div className="flex items-center justify-center h-[250px]">
              <MyTypography variant="subtitle4" weight="bold">
                Não há pagamentos pendentes neste mês
              </MyTypography>
            </div>
          ) : (
            Object.values(pendingPayments?.partners ?? {}).map(
              (payment: any) => (
                <PartnerPaymentCard
                  key={payment?.ordersSchedules}
                  name={payment?.partnerFantasyName}
                  amount={payment?.total_value_pending}
                  avatar={payment?.partnerLogo}
                  status={hasTotalValuePaid(payment) ? "paid" : "pending"}
                  loading={loading}
                  onPay={() => payPartner(payment?.token_for_pay)}
                />
              )
            )
          )}
        </div>
        <MyButton
          variant="default"
          className="w-full mt-6 bg-[#8BC34A] hover:bg-[#7CB342]"
          size="lg"
          borderRadius="squared"
          onClick={() => router.push(PATHS["pagamento-parceiros"])}
        >
          Pagamentos do mês
        </MyButton>
      </div>
      <div className="px-4">
        <MyTypography variant="heading3" weight="bold" className="mb-2">
          Atividades pendentes
        </MyTypography>

        {activitiesLoading && (
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

        {!activitiesLoading && (
          <div className="space-y-6">
            <div className="ml-auto w-1/3 md:w-1/6">
              <MySelect
                className="text-base text-black"
                value={filter}
                onValueChange={(value) => handleFilter(value)}
              >
                <SelectTrigger className="rounded-2xl text-[#848A9C] text-xs">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  {/* <SelectItem value="todos">Todos</SelectItem> */}
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="recusado">Recusado</SelectItem>
                </SelectContent>
              </MySelect>
            </div>

            {!activitiesLoading &&
            activitiesNotAprovved &&
            activitiesNotAprovved?.length > 0
              ? activitiesNotAprovved?.map((activity) => (
                  <ActivityStatusCard
                    isLoading={loadingItem?.id === activity.id}
                    key={activity.id}
                    refusalMsg={refusalMsg}
                    setRefusalMsg={setRefusalMsg}
                    activity={activity}
                    onApprove={() => onApproveActivity(activity?.id)}
                    onReject={() => onRejectActivity(activity?.id)}
                  />
                ))
              : !activitiesLoading && (
                  <div className="flex items-center justify-center h-[250px]">
                    <MyTypography variant="subtitle4" weight="bold">
                      Não há atividades pendentes
                    </MyTypography>
                  </div>
                )}

            <div className="flex w-full justify-center items-center">
              <Pagination
                setPage={setPageActivities}
                page={pageActivities}
                limit={6}
                data={activitiesNotAprovved ?? []}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
