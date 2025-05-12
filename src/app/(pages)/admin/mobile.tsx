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
      }),
  });

  // Mock data - substituir por dados reais
  const payments = [
    {
      id: 1,
      name: "Luciana Bianco",
      amount: 1200,
      avatar: "/images/avatar1.png",
    },
    {
      id: 2,
      name: "Patricia Nogue",
      amount: 1200,
      avatar: "/images/avatar2.png",
    },
  ];

  const newPartners = [
    {
      id: 1,
      name: "Luis Otávio Menezes",
      activitiesCount: 2,
      avatar: "/images/avatar3.png",
      isNew: true,
    },
    {
      id: 2,
      name: "Vitória Batista",
      activitiesCount: 1,
      avatar: "/images/avatar1.png",
      isNew: true,
    },
  ];

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

  function hasTotalValuePaid(partner: Record<string, any>): boolean {
    return "total_value_paid" in partner;
  }

  return (
    <main className=" space-y-8">
      {/* Busca */}
      {/* <SearchActivity /> */}

      {/* Filtro de Atividades */}
      <ActivitiesFilter admin />

      {/* Pagamentos */}
      <div className="px-4">
        <MyTypography variant="subtitle2" weight="bold" className="my-4">
          Pagamentos de Parceiros
        </MyTypography>
        <div className="space-y-3">
          {pendingPayments?.total_orders == 0 && !isLoading ? (
            <div className="flex items-center justify-center h-[250px]">
              <MyTypography variant="subtitle4" weight="bold">
                Você ainda não possui pagamentos.
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

      {/* Aprovações */}
      {/* <div className="space-y-6 px-4">
        <div>
          <MyTypography variant="subtitle2" weight="bold" className="mb-4">
            Aprovar novos parceiros
          </MyTypography>
          <div className="space-y-3">
            {newPartners.map((partner) => (
              <PartnerApprovalCard
                key={partner.id}
                name={partner.name}
                activitiesCount={partner.activitiesCount}
                avatar={partner.avatar}
                isNew={partner.isNew}
                onClick={() => router.push(`/admin/parceiros/${partner.id}`)}
              />
            ))}
          </div>
        </div>

        <div>
          <MyTypography variant="subtitle2" weight="bold" className="mb-4">
            Alteração de dados cadastrais
          </MyTypography>
          <div className="space-y-3">
            {newPartners.map((partner) => (
              <PartnerApprovalCard
                key={partner.id}
                name={partner.name}
                activitiesCount={partner.activitiesCount}
                avatar={partner.avatar}
                isNew={partner.isNew}
                onClick={() => router.push(`/admin/parceiros/${partner.id}`)}
              />
            ))}
          </div>
        </div>
        <MyButton
          variant="default"
          className="w-full mt-6 bg-[#8BC34A] hover:bg-[#7CB342]"
          size="lg"
          borderRadius="squared"
        >
          Aprovar agora
        </MyButton>
      </div> */}

      {/* Atividades Pendentes */}
      <div className="px-4">
        <MyTypography variant="heading3" weight="bold" className="mb-2">
          Atividades pendentes
        </MyTypography>
        <MyTypography variant="body" className="text-gray-600 mb-6">
          Status de atividades:
        </MyTypography>

        <div className="space-y-6">
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
      </div>
    </main>
  );
}
