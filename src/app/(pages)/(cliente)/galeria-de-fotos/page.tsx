"use client";

import { activities } from "@/common/constants/mock";
import MyBadge from "@/components/atoms/my-badge";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import StarRating from "@/components/molecules/my-stars";
import { cn } from "@/utils/cn";
import { getData, isDateInPast } from "@/utils/formatters";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function GaleriaDeFotos() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState("");
  const router = useRouter();

  const withDate = false;

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
        <div key={index} className={cn("flex gap-4 cursor-pointer")}>
          <div className="flex flex-col items-start gap-1">
            <MyTypography
              variant="subtitle3"
              weight="bold"
              className="text-nowrap"
            >
              Álbum de Fotos
            </MyTypography>
            <MyBadge className="p-1" variant="outline">
              {activity.tag}
            </MyBadge>
            <StarRating rating={activity.stars} />
            <MyTypography variant="body-big" weight="semibold">
              {activity.title}
            </MyTypography>
            <MyTypography variant="caption" weight="semibold">
              Clique para ver mais
            </MyTypography>
          </div>

          <div className="flex">
            {album.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className="relative group transition-all duration-300"
                style={{
                  marginLeft: index === 0 ? 0 : "-50px",
                  zIndex: album.length - index,
                }}
              >
                <div className="relative group-hover:z-50 transition-all duration-300">
                  <Image
                    src={image}
                    alt={activity.title}
                    width={300}
                    height={300}
                    className="h-[130px] w-[130px] rounded-lg object-cover transition-all duration-300 group-hover:z-999 group-hover:w-full"
                  />
                  <p className="bg-white flex items-center justify-center h-5 w-5 rounded-full text-xs text-primary-600 font-bold absolute top-2 right-2 z-999">{index + 1}</p>
                  {/* <MyIcon
                    name="x-red"
                    className="absolute top-2 left-2 bg-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  />
                  <MyIcon
                    name="download-green"
                    className="absolute top-2 right-2 bg-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
