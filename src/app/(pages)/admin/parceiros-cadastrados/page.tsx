"use client";

import Loading from "@/app/loading";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import { Pagination } from "@/components/molecules/pagination";
import PartnerApprovalCard from "@/components/molecules/partner-approval";
import { adminService } from "@/services/api/admin";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ParceiroCadastrados() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { data: allPartners, isLoading } = useQuery({
    queryKey: ["allPartners", page],
    queryFn: () =>
      adminService.searchPartners({
        limit: 15,
        orderBy: "createdAt asc",
        skip: page * 15 - 15,
      }),
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
      {isLoading ? (
        <div className="h-[30vh] my-16">
          <Loading height="[30vh]" />
        </div>
      ) : (
        <>
          <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:items-end">
            {allPartners && allPartners.length > 0 ? (
              allPartners.map((partner: any) => (
                <PartnerApprovalCard
                  key={partner?.id}
                  name={partner?.companyName ?? "Nome do Parceiro"}
                  activitiesCount={partner?._count?.adventures}
                  rating={partner?.averageRating}
                  avatar={partner?.logo?.url ?? "/user.png"}
                  onClick={() =>
                    router.push(`/admin/parceiros-cadastrados/${partner?.id}`)
                  }
                />
              ))
            ) : (
              <div>
                <MyTypography weight="bold" variant="subtitle3">
                  Não há parceiros cadastrados
                </MyTypography>
              </div>
            )}
          </div>
          {allPartners && (
            <Pagination
              limit={15}
              data={allPartners}
              page={page}
              setPage={setPage}
            />
          )}
        </>
      )}
    </main>
  );
}
