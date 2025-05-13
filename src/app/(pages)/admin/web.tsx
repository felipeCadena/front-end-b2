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
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const payments = [
    {
      id: 1,
      name: "Luciana Bianco",
      amount: 1200,
      avatar: "/images/avatar1.png",
      status: "pending",
    },
    {
      id: 2,
      name: "Patricia Nogue",
      amount: 1200,
      avatar: "/images/avatar2.png",
      status: "paid",
    },
    {
      id: 3,
      name: "Patricia Nogue",
      amount: 1200,
      avatar: "/images/avatar2.png",
      status: "paid",
    },
    {
      id: 4,
      name: "Patricia Nogue",
      amount: 1200,
      avatar: "/images/avatar2.png",
      status: "pending",
    },
  ];
  const now = new Date();
  const currentMonthKey = format(new Date(), "MM");

  const startsAt = format(startOfMonth(now), "yyyy-MM-dd'T'00:00:00");
  const endsAt = format(endOfMonth(now), "yyyy-MM-dd'T'00:00:00");

  const { data: pendingPayments, isLoading } = useQuery({
    queryKey: ["pendingPayments", page],
    queryFn: () =>
      adminService.listPendingPaidPartners({
        startsAt,
        endsAt,
        limit: 12,
        skip: page * 12 - 12,
      }),
  });

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
      await adminService.payPartner(token);
      queryClient.invalidateQueries({ queryKey: ["pendingPayments"] });
      toast.success("Pagamento realizado com sucesso!");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const message =
          err.response?.data?.message || "Erro ao realizar pagamento.";
        toast.error(`Erro: ${message}`);
      } else {
        toast.error("Erro desconhecido ao realizar pagamento.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="max-sm:hidden md:my-10">{/* <SearchActivity /> */}</div>

      {
        <MyTabs defaultValue="pagamento" className="mb-10">
          <TabsList className="mb-10 grid grid-cols-2">
            <TabsTrigger value="pagamento" className="">
              Pagamento de parceiros
            </TabsTrigger>
            {/* <TabsTrigger value="parceiros">
              Aprovação de novas atividades
            </TabsTrigger> */}
            <TabsTrigger value="atividades">
              Aprovação de atividades
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pagamento">
            <div className="space-y-3 max-w-4xl mx-auto">
              {/* <MyTypography variant="subtitle3" weight="bold" className="my-4">
                Pagamentos de Parceiros
              </MyTypography> */}

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
                    Você ainda não possui pagamentos.
                  </MyTypography>
                </div>
              ) : (
                <>
                  {/* <div className="ml-auto">
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
                              </div> */}
                  {Object.values(pendingPayments?.partners ?? {}).map(
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
                  )}
                </>
              )}
            </div>
            {Object.values(pendingPayments?.partners ?? {}).length > 1 && (
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
          {/* <TabsContent value="parceiros">
            <div className="space-y-10 max-w-4xl mx-auto">
              <div>
                <MyTypography
                  variant="subtitle3"
                  weight="bold"
                  className="mb-4"
                >
                  Aprovar novos parceiros
                </MyTypography>
                <div className="space-y-3">
                  {newPartners.map((partner) => (
                    <PartnerApprovalCard
                      key={partner.id}
                      name={partner.name}
                      activitiesCount={partner.activitiesCount}
                      withButton
                      avatar={partner.avatar}
                      isNew={partner.isNew}
                      onClick={() =>
                        router.push(`/admin/aprovar-atividade/${partner.id}`)
                      }
                    />
                  ))}
                </div>
              </div> */}

          {/* <div>
                <MyTypography
                  variant="subtitle3"
                  weight="bold"
                  className="mb-4"
                >
                  Alteração de dados cadastrais
                </MyTypography>
                <div className="space-y-3">
                  {newPartners.map((partner) => (
                    <PartnerApprovalCard
                      key={partner.id}
                      name={partner.name}
                      activitiesCount={partner.activitiesCount}
                      avatar={partner.avatar}
                      withButton
                      isNew={partner.isNew}
                      onClick={() =>
                        router.push(
                          `/admin/parceiros-cadastrados/${partner.id}`
                        )
                      }
                    />
                  ))}
                </div>
              </div> */}
          {/* </div> */}
          {/* </TabsContent> */}
          <TabsContent value="atividades">
            <div className="space-y-10 max-w-5xl mx-auto">
              {/* Nova Atividade */}
              <ActivityStatusCard
                type="new"
                activity={{
                  title: "Escalada Cristo - RJ",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                  image: "/images/atividades/ar/ar-1.jpeg",
                  category: "Atividades Terrestres",
                }}
                user={{
                  name: "Sara Nogueria",
                  avatar: "/images/avatar1.png",
                  timestamp: "Solicitado ontem às 16:27",
                }}
                onApprove={() => console.log("Aprovar")}
                onReject={() => console.log("Rejeitar")}
              />

              {/* Atividade Pendente */}
              <ActivityStatusCard
                type="pending"
                activity={{
                  title: "Escalada Cristo - RJ",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                  image: "/images/atividades/terra/terra-1.jpeg",
                  category: "Atividades Terrestres",
                }}
                user={{
                  name: "Cliente: Luciana Bianco",
                  avatar: "/images/avatar3.png",
                  timestamp: "Marcada em 03/10/2024 às 10:40 da manhã",
                }}
                partner={{
                  name: "Luis Otavio Menezes",
                  avatar: "/images/avatar2.png",
                  status: "Não confirmado.",
                }}
                onNotify={() => console.log("Notificar")}
              />
            </div>
          </TabsContent>
        </MyTabs>
      }
    </main>
  );
}
