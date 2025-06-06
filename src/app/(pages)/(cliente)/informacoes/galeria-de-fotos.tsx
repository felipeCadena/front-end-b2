"use client";

import { activities, album } from "@/common/constants/mock";
import MyBadge from "@/components/atoms/my-badge";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import Calendar from "@/components/atoms/my-icon/elements/calendar";
import MyTypography from "@/components/atoms/my-typography";
import StarRating from "@/components/molecules/my-stars";
import { cn } from "@/utils/cn";
import { getData } from "@/utils/formatters";
import Image from "next/image";
import React from "react";

export default function GaleriaDeFotos() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState("");

  return (
    <section className="space-y-12 mb-10">
      {activities.map((activity) => (
        <div key={activity.id} className="flex md:flex-col gap-4">
          <div className="border border-gray-300 rounded-lg h-[220px] flex items-center gap-5 p-4 overflow-hidden cursor-pointer">
            <MyButton
              variant={"secondary-text"}
              borderRadius="squared"
              size={"md"}
              className={cn("flex flex-col gap-1 text-base")}
            >
              <div>
                <Calendar width={30} height={30} />
              </div>
              {getData(activity.reserva.timestamp)}
            </MyButton>
            <Image
              src={activity.image}
              alt={activity.title}
              width={300}
              height={300}
              className="h-[186px] w-[186px] rounded-lg object-cover"
            />
            <div className="w-full flex justify-between items-center gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <MyTypography variant="body-big" weight="bold">
                    {activity.title}
                  </MyTypography>
                  <div className="flex gap-2 max-sm:hidden">
                    <Image
                      alt="avatar"
                      src={activity?.parceiro.avatar ?? ""}
                      width={8}
                      height={8}
                      className="w-10 h-10 rounded-full object-contain"
                    />
                    <div>
                      <MyTypography variant="button" weight="semibold">
                        {activity?.parceiro.nome}
                      </MyTypography>
                      <MyTypography
                        variant="button"
                        weight="regular"
                        lightness={400}
                      >
                        Parceiro e Guia de atividades
                      </MyTypography>
                    </div>
                  </div>
                  <MyTypography variant="subtitle3" weight="regular">
                    {activity.description.slice(0, 40).concat("...")}
                  </MyTypography>
                  <div className="flex gap-2">
                    <MyBadge variant="outline" className="p-2">
                      {activity.tag}
                    </MyBadge>
                    <StarRating rating={activity.stars} />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <MyButton
                  variant="message"
                  borderRadius="squared"
                  className="px-[4rem]"
                  size="lg"
                  rightIcon={<MyIcon name="white-eye" className="" />}
                  onClick={() => {
                    setOpen(!open);
                    setSelected(activity.id);
                  }}
                >
                  Ver fotos
                </MyButton>
                <MyButton
                  variant="secondary"
                  borderRadius="squared"
                  className="px-8"
                  size="lg"
                  rightIcon={<MyIcon name="download-green" className="" />}
                >
                  Baixar Imagens
                </MyButton>
              </div>
            </div>
          </div>
          {activity.id == selected && (
            <div
              className={cn(
                "mt-4 flex flex-col justify-center items-center space-y-4",
                !open && "hidden"
              )}
            >
              <MyIcon name="chevron-down-green" className="mt-2" />
              <div className="grid grid-cols-6 gap-4">
                {album.map((image, index) => (
                  <div className="relative group" key={index}>
                    <Image
                      src={image}
                      alt={activity.title}
                      width={300}
                      height={300}
                      className="h-[168px] w-[168px] rounded-lg object-cover"
                    />
                    <MyIcon
                      name="x-red"
                      className="absolute top-2 left-2 bg-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    />
                    <MyIcon
                      name="download-green"
                      className="absolute top-2 right-2 bg-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
