"use client";

import { activities, album } from "@/common/constants/mock";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import { cn } from "@/utils/cn";
import { getData } from "@/utils/formatters";
import PATHS from "@/utils/paths";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function GaleriaDeFotos() {
  const router = useRouter();

  return (
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

      {activities.map((activity: any, index: number) => (
        <div
          key={index}
          className={cn("flex justify-between")}
          onClick={() => router.push(PATHS.visualizarFotos(activity.id))}
        >
          <div className={cn("flex flex-col items-center justify-center")}>
            <MyIcon name="calendar" />
            <MyTypography variant="body" weight="semibold" className="text-primary-600">
              {getData(activity.reserva.timestamp)}
            </MyTypography>
          </div>

          <div className="flex flex-col justify-around gap-2 cursor-pointer px-4">
            <MyTypography variant="subtitle3" weight="bold">
              {activity.title}
            </MyTypography>

            <div className="flex gap-2 items-center">
              <Image
                alt="foto parceiro"
                src={activity.parceiro.avatar}
                width={40}
                height={40}
                className="rounded-full"
              />
              <MyTypography variant="body" weight="medium" className="">
                {activity.parceiro.nome}
              </MyTypography>
            </div>
              <MyTypography variant="body" weight="bold" className="flex gap-2 items-center">
                <MyIcon name="download-green" className="" /> {album.length} fotos
              </MyTypography>
          </div>

          <div className="flex items-end w-2/3 relative">
            {/* Textos sobre as imagens */}
            <MyButton variant="text-muted" className="text-primary-600 inline p-0 font-bold absolute -top-2 right-0 z-70">
              Ver mais
            </MyButton>
            {/* Imagens */}
            <div className="flex gap-2 mt-6">
              {album.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="relative transition-all duration-300"
                  style={{
                    marginLeft: index === 0 ? 0 : "-50px",
                    zIndex: album.length - index,
                  }}
                >
                  <div className="relative transition-all duration-300">
                    <Image
                      src={image}
                      alt={activity.title}
                      width={300}
                      height={300}
                      className="h-[90px] w-[90px] rounded-lg object-cover transition-all duration-300"
                    />
                    <p className="bg-white flex items-center justify-center h-5 w-5 rounded-full text-xs text-primary-600 font-bold absolute top-2 right-2 z-20">
                      {index + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
