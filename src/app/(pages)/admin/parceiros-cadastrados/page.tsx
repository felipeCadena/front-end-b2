"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import PartnerApprovalCard from "@/components/molecules/partner-approval";
import { adminService } from "@/services/api/admin";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

export default function ParceiroCadastrados() {
  const router = useRouter();

  const { data: allPartners } = useQuery({
    queryKey: ["allPartners"],
    queryFn: () => adminService.searchPartners(),
  });

  return (
    <main className="px-4 space-y-4 md:my-8">
      <div className="flex items-center gap-3 bg-white">
        <MyIcon
          name="voltar-black"
          className="cursor-pointer -ml-2"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle2" weight="bold">
          Parceiros Cadastrados
        </MyTypography>
      </div>

      {/* <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:items-end">
        {newPartnersData &&
          newPartnersData?.map((newPartnersData: any) => (
            <PartnerApprovalCard
              key={newPartnersData?.id}
              name={newPartnersData?.companyName}
              activitiesCount={newPartnersData?._count?.adventures}
              avatar={newPartnersData?.user?.url ?? "/user.png"}
              isNew={!newPartnersData?.isActive}
              onClick={() =>
                router.push(
                  `/admin/parceiros-cadastrados/${newPartnersData?.id}`
                )
              }
            />
          ))}
      </div>
      <MyButton
        variant="partner"
        className="w-full md:w-1/4"
        borderRadius="squared"
        size="lg"
      >
        Aprovar todos
      </MyButton> */}
      <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:items-end">
        {allPartners &&
          allPartners.map((partner: any) => (
            <PartnerApprovalCard
              key={partner?.id}
              name={partner?.companyName}
              activitiesCount={partner?._count?.adventures}
              rating={partner?.averageRating}
              avatar={partner?.user?.url ?? "/user.png"}
              onClick={() =>
                router.push(`/admin/parceiros-cadastrados/${partner?.id}`)
              }
            />
          ))}
      </div>
    </main>
  );
}
