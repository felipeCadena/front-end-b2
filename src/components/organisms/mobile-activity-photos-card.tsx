"use client";

import { album } from "@/common/constants/mock";
import { cn } from "@/utils/cn";
import { getData } from "@/utils/formatters";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import React from "react";
import MyButton from "../atoms/my-button";
import MyIcon from "../atoms/my-icon";
import MyTypography from "../atoms/my-typography";
import { CustomerSchedule } from "@/services/api/orders";
import Image from "next/image";

type MobileActivityPhotosCardType = {
  activity: CustomerSchedule;
};

const MobileActivityPhotosCard = ({
  activity,
}: MobileActivityPhotosCardType) => {
  const router = useRouter();
  return (
    <div className={cn("flex justify-between")}>
      <div className={cn("flex flex-col items-center justify-center")}>
        <MyIcon name="calendar" />
        <MyTypography
          variant="body"
          weight="semibold"
          className="text-primary-600"
        >
          {getData(activity.schedule.datetime)}
        </MyTypography>
      </div>

      <div className="flex flex-col justify-around gap-2 cursor-pointer px-4 w-[60%]">
        <MyTypography variant="subtitle3" weight="bold">
          {activity.adventure.title.length > 20
            ? activity.adventure.title.slice(0, 20) + "..."
            : activity.adventure.title}
        </MyTypography>

        <div className="flex gap-2 items-center">
          <Image
            alt="foto parceiro"
            src={activity.adventure.partner.logo.url}
            width={40}
            height={40}
            className="rounded-full"
          />
          <MyTypography variant="body" weight="medium" className="">
            {activity.adventure.partner.fantasyName}
          </MyTypography>
        </div>
        <MyTypography
          variant="body"
          weight="bold"
          className="flex gap-2 items-center"
        >
          <MyIcon name="download-green" className="" />{" "}
          {activity?.schedule?._count?.medias} fotos
        </MyTypography>
      </div>

      <div className="flex items-end w-2/3 relative">
        {/* Textos sobre as imagens */}
        <MyButton
          variant="text-muted"
          className="text-primary-600 inline p-0 font-bold absolute -top-2 right-0 z-70"
          onClick={() =>
            router.push(PATHS.visualizarFotos(activity.scheduleId))
          }
        >
          Ver mais
        </MyButton>
        {/* Imagens */}
        <div className="flex gap-2 mt-6">
          {activity?.schedule?.medias.map((image, index) => (
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
                  src={image?.url}
                  alt={activity.adventure.title}
                  width={300}
                  height={300}
                  className="h-[90px] w-[90px] rounded-lg object-cover transition-all duration-300"
                />
                <p className="bg-white flex items-center justify-center h-5 w-5 rounded-full text-xs text-primary-600 font-bold absolute top-2 right-1 z-20">
                  {index + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileActivityPhotosCard;
