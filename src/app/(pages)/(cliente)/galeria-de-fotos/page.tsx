"use client";

import { activities } from "@/common/constants/mock";
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

  const album = [
    "/images/atividades/ar/ar-1.jpeg",
    "/images/atividades/ar/ar-2.jpeg",
    "/images/atividades/ar/ar-3.jpeg",
    "/images/atividades/ar/ar-4.jpeg",
    "/images/atividades/terra/terra-1.jpeg",
    "/images/atividades/terra/terra-2.jpeg",
    "/images/atividades/terra/terra-3.jpeg",
    "/images/atividades/mar/mar-1.jpeg",
    "/images/atividades/mar/mar-2.jpeg",
    "/images/atividades/mar/mar-3.jpeg",
    "/images/atividades/mar/mar-4.jpeg",
    "/images/atividades/mar/mar-5.jpeg",
    "/images/atividades/mar/mar-6.jpeg",
    "/images/atividades/mar/mar-7.jpeg",
  ];

  return (
    <section className="space-y-12 mx-4">
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

          <div className="flex flex-col gap-2 cursor-pointer w-1/2">
          <MyTypography
              variant="body-big"
              weight="bold"
            >
              Data: {getData(activity.reserva.timestamp)}
            </MyTypography>
            <MyTypography
              variant="body-big"
              weight="bold"
            >
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
              <MyTypography
                variant="body"
                weight="medium"
                className=""
              >
                {activity.parceiro.nome}
              </MyTypography>
          </div>
          <MyTypography
              variant="body"
              weight="semibold"
              lightness={500}
            >
              Clique para ver mais
            </MyTypography>
          </div>

          <div className="flex w-2/3">
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
                    className="h-[130px] w-[130px] rounded-lg object-cover transition-all duration-300"
                  />
                  <p className="bg-white flex items-center justify-center h-5 w-5 rounded-full text-xs text-primary-600 font-bold absolute top-2 right-2 z-999">
                    {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
