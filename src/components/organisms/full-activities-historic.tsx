"use client";

import Image from "next/image";
import React from "react";
import MyBadge from "../atoms/my-badge";
import StarRating from "../molecules/my-stars";
import MyTypography from "../atoms/my-typography";
import MyIcon from "../atoms/my-icon";
import { getData, getHora } from "@/utils/formatters";
import MyButton from "../atoms/my-button";
import { useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import { cn } from "@/utils/cn";

export default function FullActivitiesHistoric({ activities, withDate }: any) {
  const router = useRouter();

  return (
    <section className="md:max-w-screen-xl">
      {activities.map((activity: any, index: number) => (
        <div className="flex gap-4 mt-20 mb-20" key={index}>
          <div className="relative z-10 flex-shrink-0 overflow-hidden w-[265px] h-[265px] hover:cursor-pointer rounded-md">
            <Image
              alt="sample_file"
              src={activity.image ?? ""}
              width={250}
              height={300}
              className="object-cover w-[265px] h-[265px]"
              onClick={() =>
                router.push(PATHS.atividadeRealizada(activity.id))
              }
            />
          </div>

          <div className="w-full space-y-4 max-h-[265px]">
            <div className="flex justify-between mb-4">
              <div
                className="flex flex-col gap-2 cursor-pointer"
                onClick={() =>
                  router.push(PATHS.atividadeRealizada(activity.id))
                }
              >
                <div className="flex gap-2">
                  <MyBadge className="font-medium" variant="outline">
                    {activity.tag}
                  </MyBadge>
                  <StarRating rating={activity.stars} />
                </div>
                <MyTypography variant="subtitle3" weight="bold" className="">
                  {activity.title}
                </MyTypography>
                <MyTypography variant="label" className="">
                  {activity.description.slice(0, 40).concat("...")}
                </MyTypography>
              </div>

              <div className="flex gap-4">
                {withDate && (
                  <MyButton
                    variant="message"
                    borderRadius="squared"
                    size="md"
                    className="px-10"
                    leftIcon={<MyIcon name="message" className="" />}
                  >
                    Mensagem
                  </MyButton>
                )}
                <MyButton
                  variant={withDate ? "secondary" : "default"}
                  borderRadius="squared"
                  size={withDate ? "md" : "lg"}
                  className={cn(!withDate && "px-10")}
                  leftIcon={
                    withDate ? (
                      <MyIcon name="calendar" className="" />
                    ) : (
                      <MyIcon name="clock" className="mr-2" />
                    )
                  }
                >
                  {withDate
                    ? getData(activity.reserva.timestamp, true)
                    : "Refazer atividade"}
                </MyButton>
              </div>
            </div>
            <div className="w-full flex justify-between items-center p-3 bg-[#F1F0F587] border border-primary-600/30 border-opacity-80 rounded-lg shadow-sm relative">
              <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>

              <div className="flex flex-col">
                <MyTypography variant="label" weight="bold" className="ml-3">
                  Data da Atividade
                </MyTypography>
                <MyTypography variant="body" weight="regular" className="ml-3">
                  {getData(activity.reserva.timestamp)} -{" "}
                  {getHora(activity.reserva.timestamp)}{" "}
                  {+getHora(activity.reserva.timestamp).split(":")[0] > 12
                    ? "tarde"
                    : "manhã"}
                </MyTypography>
              </div>
              <div className="flex items-center gap-1">
                <MyIcon name="duracao" />
                <div>
                  <MyTypography variant="label" weight="bold" className="">
                    Duração da atividade
                  </MyTypography>
                  <MyTypography variant="body" weight="regular" className="">
                    4 horas
                  </MyTypography>
                </div>
              </div>

              <div className="flex flex-col">
                <MyTypography variant="label" weight="bold" className="ml-3">
                  Quant. de pessoas
                </MyTypography>
                <MyTypography variant="body" weight="regular" className="ml-3">
                  {activity.reserva.pessoas} adultos x{" "}
                  {new Intl.NumberFormat("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(activity.reserva.total / activity.reserva.pessoas)}
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
                  {activity.reserva.total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </MyTypography>
              </div>
            </div>

            <div className="cursor-pointer flex justify-between items-center p-4 bg-[#F1F0F587] border border-primary-600/30 md:bg-primary-900 border-opacity-80 rounded-lg shadow-sm relative">
              <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>

              <div className="flex items-center gap-1 ml-4">
                <Image
                  alt="sample_file"
                  src="/icons/drive.png"
                  width={30}
                  height={30}
                />
                <MyTypography
                  variant="subtitle3"
                  weight="bold"
                  className="ml-3"
                >
                  Fotos dessa Atividade
                </MyTypography>
              </div>
              <MyIcon name="seta" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
