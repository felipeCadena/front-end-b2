"use client";

import Image from "next/image";
import React, { useState } from "react";
import MyBadge from "../atoms/my-badge";
import StarRating from "../molecules/my-stars";
import MyTypography from "../atoms/my-typography";
import MyIcon from "../atoms/my-icon";
import { getData, getHora, handleNameActivity } from "@/utils/formatters";
import MyButton from "../atoms/my-button";
import { usePathname, useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import { cn } from "@/utils/cn";
import {
  CustomerSchedule,
  ordersAdventuresService,
} from "@/services/api/orders";
import PopupCancelActivity from "./popup-cancel-activity";

import MyCancelScheduleModal from "../molecules/my-cancel-schedule-modal";

type FullActivitiesHistoricProps = {
  withDate?: boolean;
  withOptions?: boolean;
  isActivityDone: boolean;
  activities: CustomerSchedule[] | undefined;
};

type CancelSchedule = {
  orderAdventuresId: string;
  orderScheduleAdventureId: string;
};

export default function FullActivitiesHistoric({
  withDate,
  withOptions,
  activities,
  isActivityDone,
}: FullActivitiesHistoricProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [cancelOrder, setCancelOrder] = useState<CancelSchedule | null>(null);

  const handleModal = (
    orderAdventuresId: string,
    orderScheduleAdventureId: string
  ) => {
    setShowModal(true);
    setCancelOrder({ orderAdventuresId, orderScheduleAdventureId });
  };

  const handleClose = () => {
    setCancelOrder(null);
    setShowModal(false);
  };

  const handleCancelSchedule = async () => {
    if (cancelOrder) {
      const { orderAdventuresId, orderScheduleAdventureId } = cancelOrder;
      const response = await ordersAdventuresService.cancelSchedule(
        orderAdventuresId,
        orderScheduleAdventureId
      );
      console.log(response);
      setCancelOrder(null);
    }
  };

  return (
    <section className="md:max-w-screen-custom">
      {activities && activities.length > 0 ? (
        activities.map((activity, index: number) => (
          <div
            className="flex items-center gap-4 mt-20 mb-20 w-full"
            key={index}
          >
            <div
              className={`relative z-10 flex-shrink-0 overflow-hidden w-[265px] ${isActivityDone ? "h-[265px]" : "h-[161px]"} hover:cursor-pointer rounded-md`}
            >
              <Image
                alt="sample_file"
                src={
                  activity.adventure.images[0]?.url.length > 0
                    ? activity.adventure.images[0]?.url
                    : "/images/atividades/paraquedas.webp"
                }
                width={250}
                height={300}
                className={`object-cover w-[265px] ${isActivityDone ? "h-[265px]" : "h-[161px]"}`}
                onClick={() =>
                  router.push(PATHS.visualizarAtividade(activity.adventure.id))
                }
              />
            </div>

            <div className="w-full space-y-2 max-h-[265px]">
              <div className="w-full flex justify-between mb-4 relative">
                <div className="flex flex-col gap-2 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <MyBadge className="font-medium p-1" variant="outline">
                      {handleNameActivity(activity?.adventure?.typeAdventure)}
                    </MyBadge>
                    <StarRating rating={5} />

                    <div className="flex gap-2 items-center">
                      <Image
                        alt="foto parceiro"
                        src={activity?.adventure?.partner?.logo?.url}
                        width={40}
                        height={40}
                        className="w-[40px] h-[40px] rounded-full object-cover border-2"
                      />
                      <MyTypography
                        variant="body"
                        weight="medium"
                        className="mt-1 text-nowrap"
                      >
                        {activity?.adventure?.partner?.fantasyName}
                      </MyTypography>
                    </div>
                  </div>
                  <MyTypography variant="subtitle3" weight="bold" className="">
                    {activity?.adventure?.title}
                  </MyTypography>
                </div>

                {isActivityDone && (
                  <>
                    <MyButton
                      variant="ghost"
                      size="md"
                      className="text-base underline p-0 ml-auto decoration-dotted"
                      onClick={() =>
                        router.push(PATHS.atividadeRealizada(activity.id))
                      }
                    >
                      Avaliar
                    </MyButton>

                    <MyButton
                      variant="default"
                      borderRadius="squared"
                      size="md"
                      className="text-base ml-auto"
                      leftIcon={<MyIcon name="clock" className="mr-2" />}
                      onClick={() =>
                        router.push(
                          PATHS.visualizarAtividade(activity.adventure.id)
                        )
                      }
                    >
                      Refazer atividade
                    </MyButton>
                  </>
                )}

                <div
                  className={cn(
                    "flex gap-4",
                    pathname.includes("parceiro") && "hidden"
                  )}
                >
                  {withDate && (
                    <>
                      <MyButton
                        variant="message"
                        borderRadius="squared"
                        size="md"
                        className="px-4"
                        leftIcon={<MyIcon name="message" className="" />}
                      >
                        Mensagem
                      </MyButton>
                      <MyButton
                        variant="outline"
                        borderRadius="squared"
                        disabled
                        size="md"
                        className="p-4 py-5 ml-4 text-md border-primary-900 border-[3px]"
                        leftIcon={<MyIcon name="calendar" />}
                      >
                        {getData(activity.schedule.datetime, true)}
                      </MyButton>
                    </>
                  )}
                </div>
                {withOptions && (
                  <div className="cursor-pointer z-20">
                    <PopupCancelActivity
                      onCancelar={() =>
                        handleModal(
                          activity.orderAdventure.orderId,
                          activity.scheduleId
                        )
                      }
                    />
                  </div>
                )}
              </div>
              <div
                className={`w-full flex justify-between items-center p-3 ${isActivityDone ? "bg-[#F1F0F587]" : "bg-[#D2F1FF]"} border border-primary-600/30 border-opacity-80 rounded-lg shadow-sm relative`}
              >
                <div
                  className={`absolute inset-y-0 left-0 w-3 ${isActivityDone ? "bg-primary-900" : "bg-[#2DADE4]"} rounded-l-lg`}
                ></div>

                <div className="flex flex-col">
                  <MyTypography variant="label" weight="bold" className="ml-3">
                    Data da Atividade
                  </MyTypography>
                  <MyTypography
                    variant="body"
                    weight="regular"
                    className="ml-3"
                  >
                    {getData(activity?.schedule?.datetime)} -{" "}
                    {getHora(activity?.schedule?.datetime)}{" "}
                    {+getHora(activity?.schedule?.datetime).split(":")[0] > 12
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
                      {activity?.adventure?.duration?.slice(0, 1) ?? "3"} horas
                    </MyTypography>
                  </div>
                </div>

                <div className="flex flex-col">
                  <MyTypography variant="label" weight="bold" className="ml-3">
                    Quant. de Pessoas
                  </MyTypography>
                  <MyTypography
                    variant="body"
                    weight="regular"
                    className="ml-3"
                  >
                    {activity.qntAdults}x Adulto(s)
                    {activity.qntChildren > 0
                      ? ` e ${activity.qntChildren}x
                    Criança(s)`
                      : null}
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
                    {Number(activity.orderAdventure.totalCost).toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )}
                  </MyTypography>
                </div>
              </div>

              {isActivityDone && (
                <div className="cursor-pointer flex justify-between items-center p-4 bg-[#F1F0F587] border border-primary-600/30 md:bg-primary-900 border-opacity-80 rounded-lg shadow-sm relative">
                  <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>

                  <div className="flex items-center gap-1 ml-4">
                    <MyIcon name="camera" />
                    <MyTypography
                      variant="subtitle3"
                      weight="bold"
                      className=""
                    >
                      Fotos dessa Atividade
                    </MyTypography>
                  </div>
                  <MyIcon name="seta" />
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="w-full h-[30vh] flex justify-center items-center">
          <p>Não há atividades realizadas.</p>
        </div>
      )}

      <MyCancelScheduleModal
        open={showModal}
        onClose={handleClose}
        onSubmit={handleCancelSchedule}
      />
    </section>
  );
}
