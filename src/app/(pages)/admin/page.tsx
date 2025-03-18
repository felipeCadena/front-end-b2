"use client";

import React from "react";
import MyTextInput from "@/components/atoms/my-text-input";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import MyButton from "@/components/atoms/my-button";
import { useRouter } from "next/navigation";
import PartnerPaymentCard from "@/components/molecules/partner-payment";
import PartnerApprovalCard from "@/components/molecules/partner-approval";
import ActivityStatusCard from "@/components/molecules/activity-status";
import PATHS from "@/utils/paths";

export default function Admin() {
  const router = useRouter();

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

  return (
    <main className="max-w-lg mx-auto p-4 space-y-8">
      {/* Busca */}
      <MyTextInput
        placeholder="Procurar atividade"
        noHintText
        rightIcon={<MyIcon name="search" />}
      />

      {/* Filtro de Atividades */}
      <ActivitiesFilter admin />

      {/* Pagamentos */}
      <div>
        <MyTypography variant="subtitle2" weight="bold" className="my-4">
          Pagamentos de Parceiros
        </MyTypography>
        <div className="space-y-3">
          {payments.map((payment) => (
            <PartnerPaymentCard
              key={payment.id}
              name={payment.name}
              amount={payment.amount}
              avatar={payment.avatar}
              onPay={() => console.log(`Pagar ${payment.name}`)}
            />
          ))}
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
      <div className="space-y-6">
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
      </div>

      {/* Atividades Pendentes */}
      <div>
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
              category: "Atividade Terrestre",
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
              category: "Atividade Terrestre",
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
