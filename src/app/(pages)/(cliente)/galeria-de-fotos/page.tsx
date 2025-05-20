"use client";

import Loading from "@/app/loading";

import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import MobileActivityPhotosCard from "@/components/organisms/mobile-activity-photos-card";
import { ordersAdventuresService } from "@/services/api/orders";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

export default function GaleriaDeFotos() {
  const router = useRouter();

  const { data: activities = [], isLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: () =>
      ordersAdventuresService.getCustomerSchedules({
        adventureStatus: "realizado",
      }),
  });

  return isLoading ? (
    <div className="w-full h-[30vh] flex justify-center items-center">
      <Loading />
    </div>
  ) : (
    <section className="space-y-8 m-6 md:hidden">
      <div className="relative flex gap-4 items-center">
        <MyIcon
          name="seta"
          className="rotate-180"
          onClick={() => router.back()}
        />
        <MyTypography variant="heading3" weight="bold" className="">
          Galeria de Fotos
        </MyTypography>
      </div>

      {activities && activities.length > 0 ? (
        activities
          ?.filter((act) => act.schedule.dateMediasPosted)
          .map((activity, index: number) => (
            <MobileActivityPhotosCard activity={activity} key={index} />
          ))
      ) : (
        <div className="w-full flex justify-center items-center h-[30vh]">
          <MyTypography variant="subtitle3" weight="bold">
            Você não possui fotos de atividades.
          </MyTypography>
        </div>
      )}
    </section>
  );
}
