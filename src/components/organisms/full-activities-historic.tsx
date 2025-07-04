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
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { addHours } from "date-fns";

type ChatType = {
  id: string;
  openIn: string; // ISO date string
  closeIn: string; // ISO date string
  type: "adventure" | string; // restrito a "adventure", ou aberto se houver outros tipos
  orderAdventureId: number;
  userToId: string;
  userToName: string;
  userToPhoto: string;
  userToLastOnline: string; // ISO date string
  lastMessage: string | null;
  session_token: string;
};

type FullActivitiesHistoricProps = {
  withDate?: boolean;
  withOptions?: boolean;
  isActivityDone: boolean;
  activities: CustomerSchedule[] | undefined;
  chat?: ChatType[] | [];
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
  chat,
}: FullActivitiesHistoricProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [showCanceledModal, setShowCanceledModal] = useState(false);
  const [isOffCancelLimit, setIsOffCancelLimit] = useState(false);
  const [paid, setPaid] = useState(false);
  const [cancelOrder, setCancelOrder] = useState<CancelSchedule | null>(null);
  const queryClient = useQueryClient();

  const handleFindCancelLimit = (activity: CustomerSchedule) => {
    const today = new Date();
    const hoursBeforeCancellation = activity.adventure.hoursBeforeCancellation;

    const todayPlusHours = addHours(today, hoursBeforeCancellation).getTime();

    const scheduleDateTime = new Date(activity.schedule.datetime).getTime();

    const isOffLimit = todayPlusHours > scheduleDateTime;

    const notPaid = activity.personsIsAccounted;

    setIsOffCancelLimit(isOffLimit);
    setPaid(notPaid);
  };

  const handleModal = (activity: CustomerSchedule) => {
    const orderAdventuresId = String(activity.orderAdventureId);
    const orderScheduleAdventureId = activity.id;
    setShowModal(true);
    setCancelOrder({ orderAdventuresId, orderScheduleAdventureId });
    handleFindCancelLimit(activity);
  };

  const handleClose = () => {
    setCancelOrder(null);
    setShowModal(false);
  };

  const handleCloseSecondModal = () => {
    setCancelOrder(null);
    setShowCanceledModal(false);
  };

  const handleCancelSchedule = async () => {
    if (cancelOrder) {
      try {
        const { orderAdventuresId, orderScheduleAdventureId } = cancelOrder;
        await ordersAdventuresService.cancelSchedule(
          orderAdventuresId,
          orderScheduleAdventureId
        );
        queryClient.invalidateQueries({
          queryKey: ["schedules"],
        });
        setCancelOrder(null);
        setShowModal(false);
        setShowCanceledModal(true);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.status === 400) {
            handleClose();
            toast.error(error.response?.data.message);
          }
        }
      }
    }
  };

  const handlePhotos = async (activity: any) => {
    if (activity?.schedule.dateMediasPosted) {
      router.push(PATHS.visualizarFotos(activity?.scheduleId));
    }
  };

  console.log(paid);
  console.log(isOffCancelLimit);

  return (
    <section className="md:max-w-screen-custom">
      {activities && activities.length > 0 ? (
        activities.map((activity, index: number) => (
          <div
            className={cn(
              "flex items-center gap-4 mt-20 mb-20 w-full",
              activity?.adventureStatus.includes("cancelad") &&
                "opacity-60 pointer-events-none"
            )}
            key={index}
          >
            <div
              className={cn(
                `relative z-10 flex-shrink-0 overflow-hidden w-[265px] hover:cursor-pointer rounded-md`,
                isActivityDone &&
                  !activity?.adventureStatus.includes("cancelad")
                  ? "h-[265px]"
                  : "h-[200px]"
              )}
            >
              <Image
                alt={`Imagem da atividade ${activity?.adventure?.title}`}
                src={
                  activity.adventure.images[0]?.url.length > 0
                    ? activity.adventure.images[0]?.url
                    : "/images/atividades/paraquedas.webp"
                }
                width={250}
                height={300}
                className={cn(
                  "object-cover w-[265px]",
                  isActivityDone &&
                    !activity?.adventureStatus.includes("cancelad")
                    ? "h-[265px]"
                    : "h-[200px]"
                )}
                onClick={() =>
                  router.push(PATHS.visualizarAtividade(activity.adventure.id))
                }
              />
            </div>

            <div className="w-full space-y-2 max-h-[265px]">
              <div className="w-full flex justify-between mb-4 relative">
                <div className={cn("flex flex-col gap-2 cursor-pointer")}>
                  <div className="flex min-w-[391px] items-center gap-4">
                    <MyBadge className="font-medium p-1" variant="outline">
                      {handleNameActivity(activity?.adventure?.typeAdventure)}
                    </MyBadge>
                    <StarRating
                      rating={activity?.adventure.averageRating ?? 0}
                    />

                    <div className="flex gap-2 items-center">
                      <Image
                        alt="foto parceiro"
                        src={
                          activity?.adventure?.partner?.logo?.url ?? "/user.png"
                        }
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
                    {activity?.adventure?.title.length > 40
                      ? activity?.adventure?.title.slice(0, 40).trim() + "..."
                      : activity?.adventure?.title}
                  </MyTypography>
                  <MyTypography
                    variant="subtitle4"
                    weight="regular"
                    className=""
                  >
                    {activity?.adventure?.description
                      .slice(0, 50)
                      .concat("...")}
                  </MyTypography>
                </div>

                {activity?.adventureStatus.includes("cancelado") ||
                  (activity?.schedule?.isCanceled && (
                    <MyBadge
                      variant="error"
                      className="p-1 h-6 rounded-lg text-nowrap"
                    >
                      Atividade cancelada
                    </MyBadge>
                  ))}

                {isActivityDone &&
                  !activity?.adventureStatus.includes("cancelado") && (
                    <>
                      {activity?.ratings && activity?.ratings.length == 0 && (
                        <MyButton
                          variant="outline-neutral"
                          size="md"
                          borderRadius="squared"
                          className="text-base p-2 ml-auto"
                          onClick={() =>
                            router.push(
                              PATHS.atividadeRealizadaCliente(activity.id)
                            )
                          }
                        >
                          Avaliar
                        </MyButton>
                      )}

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
                  {withDate &&
                    chat &&
                    chat[index]?.orderAdventureId ==
                      activity?.orderAdventureId && (
                      <>
                        <MyButton
                          variant="message"
                          borderRadius="squared"
                          size="md"
                          className="px-4"
                          leftIcon={<MyIcon name="message" className="" />}
                          onClick={() =>
                            router.push(`/chat?user=${chat[index]?.userToName}`)
                          }
                        >
                          Mensagem
                        </MyButton>
                        {activity?.adventureStatus.includes("cancelado") ? (
                          <MyButton
                            variant="red"
                            borderRadius="squared"
                            size="md"
                            className="px-4"
                          >
                            Atividade cancelada
                          </MyButton>
                        ) : (
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
                        )}
                      </>
                    )}
                </div>

                {!activity?.personsIsAccounted && !isActivityDone ? (
                  <MyBadge
                    variant="error"
                    className="p-1 h-6 rounded-lg text-nowrap"
                  >
                    Reserva pendente de pagamento
                  </MyBadge>
                ) : (
                  !activity?.partnerConfirmed &&
                  !isActivityDone && (
                    <MyBadge
                      variant="info"
                      className="p-1 h-6 rounded-lg text-nowrap"
                    >
                      Reserva pendente de confirmação
                    </MyBadge>
                  )
                )}

                {withOptions && (
                  <div className="cursor-pointer z-20">
                    <PopupCancelActivity
                      onCancelar={() => handleModal(activity)}
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
                      {activity?.adventure?.duration ?? "3"} horas
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
                    {(
                      Number(activity?.adventureFinalPrice) +
                      Number(activity?.totalGatewayFee)
                    ).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </MyTypography>
                </div>
              </div>

              {isActivityDone &&
                !activity?.schedule?.isCanceled &&
                !activity?.adventureStatus.includes("cancelado") && (
                  <div
                    onClick={() => handlePhotos(activity)}
                    className={cn(
                      "cursor-pointer flex justify-between items-center p-4 bg-[#F1F0F587] border border-primary-600/30 md:bg-primary-900 border-opacity-80 rounded-lg shadow-sm relative"
                    )}
                  >
                    <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>

                    <div className="flex items-center gap-1 ml-4">
                      <MyIcon name="camera" />
                      <MyTypography variant="subtitle3" weight="bold">
                        {activity?.schedule?.dateMediasPosted
                          ? "Fotos dessa atividade"
                          : "Fotos ainda não disponíveis"}
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
        title="Cancelamento de atividade"
        subtitle={
          !paid
            ? "Tem certeza que deseja cancelar essa atividade?"
            : isOffCancelLimit
              ? "O limite para cancelamento com reembolso foi ultrapassado! Tem certeza que ainda assim deseja cancelar essa atividade? Não será possível reembolsar o valor pago."
              : "Tem certeza que deseja cancelar essa atividade?"
        }
        buttonTitle="Cancelar atividade"
        iconName="cancel"
        open={showModal}
        onClose={handleClose}
        onSubmit={handleCancelSchedule}
      />
      <MyCancelScheduleModal
        title="Atividade cancelada"
        subtitle={
          !paid
            ? "Essa atividade não foi paga. Portanto, foi cancelada com sucesso e não há reembolso!"
            : isOffCancelLimit
              ? "Atividade cancelada com sucesso!"
              : "Atividade cancelada! Em breve o seu estorno estará disponível na mesma forma de pagamento realizada."
        }
        buttonTitle="Voltar"
        iconName="warning"
        open={showCanceledModal}
        onClose={handleCloseSecondModal}
        onSubmit={handleCloseSecondModal}
      />
    </section>
  );
}
