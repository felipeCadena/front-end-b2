"use client";

import { activities } from "@/common/constants/mock";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import ActivitiesPhotos from "@/components/organisms/activities-photos";
import { partnerService } from "@/services/api/partner";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

export default function FotosDePasseios() {
  const router = useRouter();

  const { data: partnerOrders } = useQuery({
    queryKey: ["partnerOrders"],
    queryFn: () =>
      partnerService.listPartnerSchedules({ adventureStatus: "realizado" }),
  });

  return (
    <main className="px-4">
      <div className="flex gap-2 items-center">
        <MyIcon
          name="voltar-black"
          className="-ml-2"
          onClick={() => router.back()}
        />

        <MyTypography variant="subtitle1" weight="semibold">
          Passeios com fotos
        </MyTypography>
      </div>

      <MyTypography
        variant="body-big"
        weight="regular"
        lightness={500}
        className="mt-4"
      >
        Enviar fotos ou vídeos da atividade!
      </MyTypography>

      <ActivitiesPhotos activities={partnerOrders} />
    </main>
  );
}
