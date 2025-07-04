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
import { getData, getHora, handleNameActivity } from "@/utils/formatters";
import { cn } from "@/utils/cn";
import Edit from "../atoms/my-icon/elements/edit";

export default function ActivitiesPhotos({
  activities,
  admin,
}: {
  activities: any;
  admin?: boolean;
}) {
  const router = useRouter();

  const handleImagesAdmin = (adventureId: string, scheduleId: string) => {
    router.push(`/admin/marketing/atividade/${adventureId}?sch=${scheduleId}`);
  };

  return (
    <section
      className={cn(
        admin &&
          "md:max-w-4xl md:grid md:grid-cols-2 md:gap-4 md:items-center md:justify-center md:mx-auto"
      )}
    >
      {activities &&
        activities?.map((activity: any, index: number) => (
          <div key={index}>
            <div
              className="flex max-sm:flex-col md:justify-between gap-2 cursor-pointer my-6 space-y-2"
              onClick={() =>
                admin && handleImagesAdmin(activity?.adventureId, activity?.id)
              }
            >
              <div className="w-full flex gap-2 cursor-pointer">
                <div
                  className={cn(
                    "relative z-10 overflow-hidden w-[180px] h-[120px] hover:cursor-pointer rounded-md",
                    admin && "md:min-h-[170px] md:min-w-[180px]"
                  )}
                >
                  <Image
                    alt="Imagem de uma atividade"
                    src={
                      activity?.adventure?.images &&
                      activity?.adventure?.images.length > 0
                        ? activity?.adventure?.images[0].url
                        : "/images/atividades/paraquedas.webp"
                    }
                    width={250}
                    height={300}
                    className={cn(
                      "w-[180px] h-[120px] object-cover",
                      admin && "md:min-h-[170px] md:min-w-[180px]"
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "space-y-1 max-sm:w-1/2",
                    admin &&
                      "md:flex flex-col md:items-start md:justify-between"
                  )}
                >
                  <MyBadge variant="outline" className="p-1">
                    {handleNameActivity(
                      activity?.adventure?.typeAdventure ?? "mar"
                    )}
                  </MyBadge>
                  <MyTypography variant="subtitle3" weight="bold" className="">
                    {activity?.adventure?.title.length > 16 ? (
                      <>
                        <span className="md:hidden">
                          {activity?.adventure?.title
                            .slice(0, 14)
                            .concat("...")}
                        </span>
                        <span className="max-sm:hidden">
                          {activity?.adventure?.title}
                        </span>
                      </>
                    ) : (
                      activity?.adventure?.title
                    )}
                  </MyTypography>

                  {admin && (
                    <div className="flex items-center gap-1 mt-4">
                      <Image
                        alt="avatar"
                        src={
                          activity?.adventure?.partner?.logo?.url ?? "user.png"
                        }
                        width={8}
                        height={8}
                        className="w-10 h-10 rounded-full object-contain"
                      />
                      <div>
                        <MyTypography variant="label" weight="regular">
                          {activity?.adventure?.partner?.fantasyName}
                        </MyTypography>
                      </div>
                    </div>
                  )}

                  {admin && (
                    <MyTypography variant="body" weight="regular" className="">
                      {`Data: ${getData(activity?.datetime)} - ${getHora(activity.datetime)}`}
                    </MyTypography>
                  )}
                  {!admin && (
                    <MyTypography variant="body" weight="regular" className="">
                      {`Data: ${getData(activity?.schedule?.datetime)} - ${getHora(activity?.schedule?.datetime)}`}
                    </MyTypography>
                  )}

                  {!admin &&
                    (activity?.schedule?.limitDateForMedias &&
                    !activity?.schedule?.dateMediasPosted ? (
                      <MyTypography
                        variant="body"
                        weight="regular"
                        lightness={500}
                        className=""
                      >
                        Enviar fotos ou vídeos da atividade{" "}
                        <span className="font-bold">
                          até dia{" "}
                          {getData(activity?.schedule?.limitDateForMedias)}
                        </span>
                      </MyTypography>
                    ) : (
                      <MyTypography
                        variant="body"
                        weight="regular"
                        lightness={500}
                        className=""
                      >
                        Fotos e vídeos enviados no dia{" "}
                        {getData(activity?.schedule?.dateMediasPosted)}
                      </MyTypography>
                    ))}
                </div>
              </div>

              {!admin && (
                <div className="flex md:flex-col justify-center items-center gap-3 my-2">
                  <MyButton
                    variant="secondary-muted"
                    borderRadius="squared"
                    size="md"
                    leftIcon={<Camera color="#8DC63F" />}
                    className="w-full"
                    onClick={() =>
                      router.push(PATHS["enviar-fotos"](activity?.scheduleId))
                    }
                  >
                    {activity?.schedule?.dateMediasPosted
                      ? "Editar Fotos"
                      : "Enviar Fotos"}
                  </MyButton>
                  <MyButton
                    variant="secondary-muted"
                    borderRadius="squared"
                    size="md"
                    leftIcon={<MyIcon name="video" />}
                    className="w-full"
                    onClick={() =>
                      router.push(PATHS["enviar-videos"](activity?.scheduleId))
                    }
                  >
                    {activity?.schedule?.dateMediasPosted
                      ? "Editar Vídeos"
                      : "Enviar Vídeos"}
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
