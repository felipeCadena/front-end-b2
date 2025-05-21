"use client";

import { MyTabs, TabsList, TabsTrigger } from "@/components/molecules/my-tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import PartnerPaymentCard from "@/components/molecules/partner-payment";
import MyTypography from "@/components/atoms/my-typography";
import PartnerApprovalCard from "@/components/molecules/partner-approval";
import { useRouter } from "next/navigation";
import ActivityStatusCard from "@/components/molecules/activity-status";
import { adminService } from "@/services/api/admin";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import Loading from "@/components/molecules/loading";
import Image from "next/image";
import { Pagination } from "@/components/molecules/pagination";
import { Adventure } from "@/services/api/adventures";

type CustomError = {
  error: boolean;
  message: string;
};

const monthLabels = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

// Mapeamento de meses abreviados para completos
const monthFullNames: Record<string, string> = {
  Jan: "Janeiro",
  Fev: "Fevereiro",
  Mar: "Março",
  Abr: "Abril",
  Mai: "Maio",
  Jun: "Junho",
  Jul: "Julho",
  Ago: "Agosto",
  Set: "Setembro",
  Out: "Outubro",
  Nov: "Novembro",
  Dez: "Dezembro",
};

// Tipando a função getFullMonthName
function getFullMonthName(monthAbbreviation: string): string {
  return monthFullNames[monthAbbreviation] || monthAbbreviation;
}

export default function AdminWeb() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [loadingItem, setLoadingItem] = React.useState<{
    id: number;
  } | null>(null);

  const [loading, setLoading] = React.useState(false);

  const [filter, setFilter] = React.useState("todos");
  const [tab, setTab] = React.useState("atividades");

  const [page, setPage] = React.useState(1);
  const [pageActivities, setPageActivities] = React.useState(1);
  const [refusalMsg, setRefusalMsg] = React.useState("");

  const [allActivities, setAllActivities] = React.useState<Adventure[]>([]);
  const [activitiesNotAprovved, setActivitiesNotAprovved] = React.useState<
    Adventure[]
  >([]);

  const now = new Date();
  const currentMonthKey = format(new Date(), "MM");

  const startsAt = format(startOfMonth(now), "yyyy-MM-dd'T'00:00:00");
  const endsAt = format(endOfMonth(now), "yyyy-MM-dd'T'00:00:00");

  const { data: pendingPayments, isLoading } = useQuery({
    queryKey: ["pendingPayments", page],
    enabled: tab === "pagamento",
    queryFn: () =>
      adminService.listPendingPaidPartners({
        startsAt,
        endsAt,
        limit: 12,
        skip: page * 12 - 12,
      }),
  });

  const { isLoading: activitiesLoading } = useQuery({
    queryKey: ["activitiesNotAprooved", pageActivities],
    enabled: tab === "atividades",
    queryFn: async () => {
      const adventures = await adminService.searchAdventures({
        // startsAt,
        // endsAt,
        adminApproved: false,
        limit: 12,
        skip: pageActivities * 12 - 12,
      });
      setAllActivities(adventures);
      setActivitiesNotAprovved(adventures);
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

    if (value === "todos") {
      setActivitiesNotAprovved(allActivities);
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
    <main>
      <div className="max-sm:hidden md:my-10">{/* <SearchActivity /> */}</div>

      {
        <MyTabs value={tab} onValueChange={setTab} className="mb-10">
          <TabsList className="mb-10 grid grid-cols-2">
            <TabsTrigger value="pagamento" className="">
              Pagamento de parceiros
            </TabsTrigger>
            <TabsTrigger value="atividades">
              Aprovação de atividades
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pagamento">
            <div className="space-y-3 max-w-4xl mx-auto">
              {isLoading && (
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

              {pendingPayments?.total_orders == 0 && !isLoading ? (
                <div className="flex items-center justify-center h-[250px]">
                  <MyTypography variant="subtitle4" weight="bold">
                    Não há pagamentos pendentes
                  </MyTypography>
                </div>
              ) : (
                <div className="min-h-[20vh]">
                  {pendingPayments?.partners &&
                    Object.values(pendingPayments?.partners).map(
                      (payment: any) => (
                        <PartnerPaymentCard
                          key={payment?.ordersSchedules}
                          name={payment?.partnerFantasyName}
                          amount={payment?.total_value_pending}
                          avatar={payment?.partnerLogo}
                          status={
                            hasTotalValuePaid(payment) ? "paid" : "pending"
                          }
                          loading={loading}
                          onPay={() => payPartner(payment?.token_for_pay)}
                        />
                      )
                    )}
                </div>
              )}
            </div>
            {pendingPayments?.partners &&
              Object.values(pendingPayments?.partners).length > 1 && (
                <div className="flex w-full justify-center items-center my-16">
                  <Pagination
                    page={page}
                    setPage={setPage}
                    limit={12}
                    data={Object.values(pendingPayments?.partners ?? {})}
                  />
                </div>
              )}
          </TabsContent>
          <TabsContent value="atividades">
            <div className="space-y-10 max-w-5xl mx-auto">
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
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="recusado">Recusado</SelectItem>
                  </SelectContent>
                </MySelect>
              </div>

              {!activitiesLoading &&
                activitiesNotAprovved &&
                activitiesNotAprovved?.map((activity) => (
                  <ActivityStatusCard
                    isLoading={loadingItem?.id === activity.id}
                    key={activity.id}
                    refusalMsg={refusalMsg}
                    setRefusalMsg={setRefusalMsg}
                    activity={activity}
                    onApprove={() => onApproveActivity(activity?.id)}
                    onReject={() => onRejectActivity(activity?.id)}
                  />
                ))}
            </div>
          </TabsContent>
        </MyTabs>
      }
    </main>
  );
}
