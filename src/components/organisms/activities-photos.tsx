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
import { cn } from "@/utils/cn";

export default function ActivitiesPhotos({
  activities,
  admin,
}: {
  activities: any;
  admin?: boolean;
}) {
  const router = useRouter();

  const handleImagesAdmin = (id: string) => {
    router.push("/admin/marketing/atividade/" + id);
  };

  return (
    <section
      className={cn(
        admin &&
          "md:max-w-4xl md:grid md:grid-cols-2 md:gap-4 md:items-center md:justify-center md:mx-auto"
      )}
    >
      {activities.map((activity: any, index: number) => (
        <div key={index}>
          <div
            className="flex max-sm:flex-col md:justify-between gap-2 cursor-pointer my-6 space-y-2"
            onClick={() => admin && handleImagesAdmin(activity.id)}
          >
            <div className="w-full flex gap-2 cursor-pointer">
              <div
                className={cn(
                  "relative z-10 overflow-hidden w-[180px] h-[120px] hover:cursor-pointer rounded-md",
                  admin && "md:h-[130px] "
                )}
              >
                <Image
                  alt="sample_file"
                  src={activity.image ?? ""}
                  width={250}
                  height={300}
                  className={cn(
                    "w-[180px] h-[120px] object-cover",
                    admin && "md:h-[130px]"
                  )}
                />
              </div>

              <div className="space-y-1 max-sm:w-1/2">
                <MyBadge variant="outline" className="p-1">
                  {activity.tag}
                </MyBadge>
                <MyTypography variant="subtitle3" weight="bold" className="">
                  {activity.title}
                </MyTypography>

                {admin && (
                  <div className="flex items-center gap-1 mt-4">
                    <Image
                      alt="avatar"
                      src={activity?.parceiro.avatar ?? ""}
                      width={8}
                      height={8}
                      className="w-10 h-10 rounded-full object-contain"
                    />
                    <div>
                      <MyTypography variant="label" weight="regular">
                        {activity?.parceiro.nome}
                      </MyTypography>
                    </div>
                  </div>
                )}
                <MyTypography variant="body" weight="regular" className="">
                  {`Data: ${getData(activity.reserva.timestamp)} - ${getHora(activity.reserva.timestamp)}`}
                </MyTypography>
                {!admin && (
                  <MyTypography
                    variant="body"
                    weight="regular"
                    lightness={500}
                    className=""
                  >
                    Enviar fotos ou vídeos da atividade{" "}
                    <span className="font-bold">até dia 05/04/2025</span>
                  </MyTypography>
                )}
              </div>
            </div>

            {!admin && (
              <div className="flex md:flex-col justify-center items-center gap-3 my-2">
                <MyButton
                  variant="secondary-muted"
                  borderRadius="squared"
                  leftIcon={<Camera color="#8DC63F" />}
                  className="w-full"
                  onClick={() =>
                    router.push(PATHS["enviar-fotos"](activity.id))
                  }
                >
                  Enviar Fotos
                </MyButton>
                <MyButton
                  variant="secondary-muted"
                  borderRadius="squared"
                  leftIcon={<MyIcon name="video" />}
                  className="w-full"
                  onClick={() =>
                    router.push(PATHS["enviar-videos"](activity.id))
                  }
                >
                  Enviar Vídeos
                </MyButton>
              </div>
            )}
          </div>
          {!admin && (
            <div className="w-[40%] md:w-full mx-auto h-1 bg-gray-200 rounded-2xl my-4" />
          )}
        </div>
      ))}
    </section>
  );
}
