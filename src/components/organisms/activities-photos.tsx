"use client";

import Image from "next/image";
import React from "react";
import MyBadge from "../atoms/my-badge";
import MyTypography from "../atoms/my-typography";
import MyButton from "../atoms/my-button";
import MyIcon from "../atoms/my-icon";
import Camera from "../atoms/my-icon/elements/camera";
import { useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import { getData, getHora } from "@/utils/formatters";

export default function ActivitiesPhotos({ activities }: any) {
  const router = useRouter();

  return activities.map((activity: any, index: number) => (
    <>
      <div
        key={index}
        className="flex max-sm:flex-col md:justify-between gap-2 cursor-pointer my-6"
      >
        <div className="flex gap-2 cursor-pointer">
          <div className="relative z-10 overflow-hidden w-[170px] h-[100px] hover:cursor-pointer rounded-md">
            <Image
              alt="sample_file"
              src={activity.image ?? ""}
              width={250}
              height={300}
              className="w-[170px] h-[100px] object-cover"
            />
          </div>

          <div className="space-y-1">
            <MyBadge variant="outline" className="p-1">
              {activity.tag}
            </MyBadge>
            <MyTypography variant="subtitle3" weight="bold" className="">
              {activity.title}
            </MyTypography>
            <MyTypography variant="body-big" weight="regular" className="">
              {`Data: ${getData(activity.reserva.timestamp)} - ${getHora(activity.reserva.timestamp)}`}
            </MyTypography>
            <MyTypography
              variant="label"
              weight="regular"
              lightness={500}
              className=""
            >
              Enviar fotos ou vídeos da atividade{" "}
              <span className="font-bold">até dia 05/04/2025</span>
            </MyTypography>
          </div>
        </div>

        <div className="flex md:flex-col justify-center items-center gap-3 my-2">
          <MyButton
            variant="secondary-muted"
            borderRadius="squared"
            leftIcon={<Camera color="#8DC63F" />}
            className="w-full"
            onClick={() => router.push(PATHS["enviar-fotos"](activity.id))}
          >
            Enviar Fotos
          </MyButton>
          <MyButton
            variant="secondary-muted"
            borderRadius="squared"
            leftIcon={<MyIcon name="video" />}
            className="w-full"
            onClick={() => router.push(PATHS["enviar-videos"](activity.id))}
          >
            Enviar Vídeos
          </MyButton>
        </div>
      </div>
      <div className="w-[40%] md:w-full mx-auto h-1 bg-gray-200 rounded-2xl my-4" />
    </>
  ));
}
