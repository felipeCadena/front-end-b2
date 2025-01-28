"use client"

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

export default function ActivitiesHistoric({ activities }: any) {
  const router = useRouter();

  return (
    <section className="">
      {activities.map((activity: any, index: number) => (
        <div className="flex flex-col gap-4 my-8" key={index}>
          <div 
          className="flex justify-around gap-2 cursor-pointer"
          onClick={() => router.push(PATHS.atividadeRealizada(activity.id))}
          >
            <div className="relative z-10 overflow-hidden min-w-[6.625rem] min-h-[6.625rem] hover:cursor-pointer rounded-md">
              <Image
                alt="sample_file"
                src={activity.image ?? ""}
                width={250}
                height={300}
                className="w-[6.625rem] h-[6.625rem] object-cover"
              />
            </div>
            <div>
              <div className="flex justify-between gap-1 mb-1 mr-4">
                <MyBadge
                  className="font-medium flex-shrink-0"
                  variant="outline"
                >
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
          </div>
          <div className="w-full flex flex-col items-center gap-3 p-3 mt-2 bg-[#F1F0F587] border border-primary-600/30 border-opacity-80 rounded-lg shadow-sm hover:bg-gray-100 relative">
            <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>

            <div className="w-full flex items-center justify-between gap-1 text-nowrap">
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
            </div>

            <div className="w-full flex items-center justify-between ">
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
          </div>

          <div className="p-3 mt-2 bg-[#F1F0F587] border border-primary-600/30 border-opacity-80 rounded-lg shadow-sm hover:bg-gray-100 relative">
            <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>

            <div className="flex items-center gap-1 ml-4">
            <Image
              alt="sample_file"
              src="/icons/drive.png"
              width={30}
              height={30}
            />
            <MyTypography variant="subtitle3" weight="bold" className="ml-3">
                Fotos dessa Atividade 
            </MyTypography>
            </div>
          </div>

          <MyButton variant="default" borderRadius="squared" size="lg" className="w-full mt-2">
            Refazer atividade
            </MyButton>
        </div>
      ))}
    </section>
  );
}
