"use client";

import { MyTabs, TabsList, TabsTrigger } from "@/components/molecules/my-tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import SearchActivity from "@/components/organisms/search-activity";
import PartnerPaymentCard from "@/components/molecules/partner-payment";
import MyTypography from "@/components/atoms/my-typography";
import PartnerApprovalCard from "@/components/molecules/partner-approval";
import MyButton from "@/components/atoms/my-button";
import { useRouter } from "next/navigation";
import ActivityStatusCard from "@/components/molecules/activity-status";

export default function AdminWeb() {
  const router = useRouter();

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
      isNew: false,
    },
  ];

  return (
    <main>
      <div className="max-sm:hidden md:my-10">
        <SearchActivity />
      </div>

      {
        <MyTabs defaultValue="pagamento" className="mb-10">
          <TabsList className="mb-10 grid grid-cols-3">
            <TabsTrigger value="pagamento" className="">
              Pagamento de parceiros
            </TabsTrigger>
            <TabsTrigger value="parceiros">
              Aprovação de novos parceiros
            </TabsTrigger>
            <TabsTrigger value="atividades">
              Aprovação de atividades
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pagamento">
            <div className="space-y-3 max-w-4xl mx-auto">
              <MyTypography variant="subtitle3" weight="bold" className="my-4">
                Pagamentos de Parceiros
              </MyTypography>
              {payments.map((payment) => (
                <PartnerPaymentCard
                  key={payment.id}
                  name={payment.name}
                  amount={payment.amount}
                  avatar={payment.avatar}
                  status={payment.status}
                  onPay={() => console.log(`Pagar ${payment.name}`)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="parceiros">
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
                        router.push(`/admin/parceiros/${partner.id}`)
                      }
                    />
                  ))}
                </div>
              </div>

              <div>
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
              </div>
            </div>
          </TabsContent>
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
          </TabsContent>
        </MyTabs>
      }
    </main>
  );
}
