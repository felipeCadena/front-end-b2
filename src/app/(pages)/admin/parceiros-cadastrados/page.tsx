"use client";

import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import PartnerApprovalCard from "@/components/molecules/partner-approval";
import { useRouter } from "next/navigation";
import React from "react";

export default function ParceiroCadastrados() {
  const router = useRouter();

  const newPartners = [
    {
      id: 3,
      name: "Vitória Batista",
      activitiesCount: 0,
      avatar: "/images/avatar1.png",
      isNew: true,
    },
    {
      id: 4,
      name: "Vera Oliveira",
      activitiesCount: 0,
      avatar: "/images/avatar1.png",
      isNew: true,
    },
    {
      id: 1,
      name: "Bruna Almeida",
      activitiesCount: 0,
      avatar: "/images/avatar1.png",
      isNew: true,
    },
  ];

  const partnes = [
    {
      id: 1,
      name: "Luis Otávio Menezes",
      activitiesCount: 20,
      avatar: "/images/avatar3.png",
      isNew: false,
      star: 5,
    },
    {
      id: 2,
      name: "Vitória Batista",
      activitiesCount: 15,
      avatar: "/images/avatar1.png",
      isNew: false,
      star: 4,
    },
    {
      id: 4,
      name: "Vitória Batista",
      activitiesCount: 5,
      avatar: "/images/avatar1.png",
      isNew: false,
      star: 3,
    },
    {
      id: 5,
      name: "Vitória Batista",
      activitiesCount: 13,
      avatar: "/images/avatar1.png",
      isNew: false,
      star: 1,
    },
    {
      id: 6,
      name: "Vitória Batista",
      activitiesCount: 15,
      avatar: "/images/avatar1.png",
      isNew: false,
      star: 4,
    },
    {
      id: 7,
      name: "Vitória Batista",
      activitiesCount: 5,
      avatar: "/images/avatar1.png",
      isNew: false,
      star: 3,
    },
    {
      id: 8,
      name: "Vitória Batista",
      activitiesCount: 13,
      avatar: "/images/avatar1.png",
      isNew: false,
      star: 5,
    },
  ];

  return (
    <main className="px-4 space-y-4 md:my-8">
      <div className="flex items-center gap-3 bg-white">
        <MyIcon
          name="voltar-black"
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle2" weight="bold">
          Parceiros Cadastrados
        </MyTypography>
      </div>

      <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:items-end">
        {newPartners.map(
          (partner: {
            id: React.Key | null | undefined;
            name: string;
            activitiesCount: number;
            avatar: string;
            isNew: boolean | undefined;
          }) => (
            <PartnerApprovalCard
              key={partner.id}
              name={partner.name}
              activitiesCount={partner.activitiesCount}
              avatar={partner.avatar}
              isNew={partner.isNew}
              onClick={() =>
                router.push(`/admin/parceiros-cadastrados/${partner.id}`)
              }
            />
          )
        )}
      </div>
      <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:items-end">
        {partnes.map(
          (partner: {
            id: React.Key | null | undefined;
            name: string;
            activitiesCount: number;
            avatar: string;
            isNew: boolean | undefined;
            star: number;
          }) => (
            <PartnerApprovalCard
              key={partner.id}
              rating={partner.star}
              name={partner.name}
              activitiesCount={partner.activitiesCount}
              avatar={partner.avatar}
              isNew={partner.isNew}
              onClick={() =>
                router.push(`/admin/parceiros-cadastrados/${partner.id}`)
              }
            />
          )
        )}
      </div>
    </main>
  );
}
