"use client";

import Image from "next/image";
import React from "react";
import MyBadge from "../atoms/my-badge";
import StarRating from "../molecules/my-stars";
import MyTypography from "../atoms/my-typography";
import MyIcon from "../atoms/my-icon";
import {
  getData,
  getDefaultImage,
  getHora,
  handleNameActivity,
} from "@/utils/formatters";
import MyButton from "../atoms/my-button";
import { useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import { CustomerSchedule } from "@/services/api/orders";
import { cn } from "@/utils/cn";

type FullActivitiesHistoricProps = {
  withDate?: boolean;
  withOptions?: boolean;
  activities: CustomerSchedule[] | undefined;
};

type CancelSchedule = {
  orderAdventuresId: string;
  orderScheduleAdventureId: string;
};

export default function FullActivitiesHistoricMobile({
  activities,
}: FullActivitiesHistoricProps) {
  const router = useRouter();

  const handlePhotos = async (activity: any) => {
    if (activity?.schedule.dateMediasPosted) {
      router.push(PATHS.visualizarFotos(activity?.scheduleId));
    }
  };
  return (
    <section className="">
      {activities &&
        activities.map((activity, index: number) => (
          <div className={cn("flex flex-col gap-4 mt-8 mb-16")} key={index}>
            <div
              className={cn(
                "flex justify-around gap-2 cursor-pointer",
                activity?.adventureStatus.includes("cancelado") &&
                  "opacity-60 pointer-events-none"
              )}
              onClick={() =>
                router.push(PATHS.visualizarAtividade(activity?.adventure?.id))
              }
            >
              <div className="relative z-10 overflow-hidden min-w-[100px] min-h-[7rem] hover:cursor-pointer rounded-md">
                <Image
                  alt="Imagen da atividade"
                  src={getDefaultImage(activity)}
                  width={250}
                  height={300}
                  className="w-[100px] h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1 mr-4">
                    <MyBadge
                      className="font-medium text-nowrap p-1"
                      variant="outline"
                    >
                      {handleNameActivity(activity?.adventure?.typeAdventure)}
                    </MyBadge>
                    <StarRating
                      rating={activity?.adventure.averageRating ?? 0}
                    />
                  </div>

                  <div className="flex gap-2 items-center my-1">
                    <Image
                      alt="foto parceiro"
                      src={activity?.adventure?.partner?.logo?.url}
                      width={40}
                      height={40}
                      className="rounded-full w-[25px] h-[25px]"
                    />
                    <MyTypography
                      variant="body"
                      weight="medium"
                      className="mt-1 text-nowrap"
                    >
                      {activity?.adventure?.partner?.fantasyName}
                    </MyTypography>
                  </div>
                </div>

                <MyTypography variant="subtitle3" weight="bold" className="">
                  {activity?.adventure?.title.length > 26
                    ? activity?.adventure?.title.slice(0, 26) + "..."
                    : activity?.adventure?.title}
                </MyTypography>
                <MyTypography variant="label" className="">
                  {activity.adventure.description.slice(0, 50).concat("...")}
                </MyTypography>
              </div>
            </div>
            <div
              className={cn(
                "w-full flex flex-col items-center gap-3 p-3 mt-2 bg-[#F1F0F587] border border-primary-600/30 border-opacity-80 rounded-lg shadow-sm hover:bg-gray-100 relative",
                activity?.adventureStatus.includes("cancelado") &&
                  "opacity-60 pointer-events-none"
              )}
            >
              <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>

              <div className="w-full flex items-center justify-between gap-1 text-nowrap">
                <div className="flex flex-col">
                  <MyTypography variant="label" weight="bold" className="ml-3">
                    Data da Atividade
                  </MyTypography>
                  <MyTypography
                    variant="body"
                    weight="regular"
                    className="ml-3"
                  >
                    {getData(activity?.schedule?.datetime)} -{" "}
                    {getHora(activity?.schedule?.datetime)}{" "}
                    {+getHora(activity?.schedule?.datetime).split(":")[0] > 12
                      ? "tarde"
                      : "manhã"}
                  </MyTypography>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <MyTypography variant="label" weight="bold" className="">
                    Duração da atividade
                  </MyTypography>
                  <div className="flex items-center justify-start w-full">
                    <MyIcon name="mobileDuracao" />

                    <MyTypography variant="body" weight="regular" className="">
                      {activity?.adventure?.duration ?? "3"} horas
                    </MyTypography>
                  </div>
                </div>
              </div>

              <div className="w-full flex items-center justify-between ">
                <div className="flex flex-col">
                  <MyTypography variant="label" weight="bold" className="ml-3">
                    Quant. de pessoas
                  </MyTypography>
                  <MyTypography
                    variant="body"
                    weight="regular"
                    className="ml-3"
                  >
                    {activity.qntAdults}x Adulto(s)
                    {activity.qntChildren > 0
                      ? ` e ${activity.qntChildren}x
                    Criança(s)`
                      : null}
                  </MyTypography>
                </div>

                <div className="flex flex-col">
                  <MyTypography
                    variant="body-big"
                    weight="bold"
                    className="text-right"
                  >
                    Total:
                  </MyTypography>
                  <MyTypography variant="body" weight="bold" className="">
                    {Number(activity.orderAdventure.totalCost).toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )}
                  </MyTypography>
                </div>
              </div>
            </div>

            <div
              className={cn(
                "p-3 mt-2 bg-[#F1F0F587] border border-primary-600/30 border-opacity-80 rounded-lg shadow-sm hover:bg-gray-100 relative",
                activity?.adventureStatus.includes("cancelado") &&
                  "opacity-60 pointer-events-none"
              )}
              onClick={() => handlePhotos(activity)}
            >
              <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>

              <div className="flex items-center gap-2 ml-4">
                <MyIcon name="camera" />
                <MyTypography variant="subtitle3" weight="bold">
                  {activity?.schedule?.dateMediasPosted
                    ? "Fotos dessa atividade"
                    : "Fotos ainda não disponíveis"}
                </MyTypography>
              </div>
            </div>

            {!activity?.adventureStatus.includes("cancelado") && (
              <div className="flex gap-2">
                <MyButton
                  variant="outline-neutral"
                  size="sm"
                  borderRadius="squared"
                  className="w-full py-6"
                  onClick={() =>
                    router.push(PATHS.atividadeRealizadaCliente(activity.id))
                  }
                >
                  Avaliar
                </MyButton>

                <MyButton
                  variant="outline-neutral"
                  borderRadius="squared"
                  size="sm"
                  className="w-full py-6"
                  onClick={() =>
                    router.push(
                      PATHS.visualizarAtividade(activity.adventure.id)
                    )
                  }
                >
                  Refazer atividade
                </MyButton>
              </div>
            )}
          </div>
        ))}
    </section>
  );
}
