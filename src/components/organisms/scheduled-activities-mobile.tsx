"use client";

import Image from "next/image";
import React, { useState } from "react";
import MyBadge from "../atoms/my-badge";
import StarRating from "../molecules/my-stars";
import MyTypography from "../atoms/my-typography";
import MyIcon from "../atoms/my-icon";
import {
  getData,
  getDefaultImage,
  handleNameActivity,
} from "@/utils/formatters";
import MyButton from "../atoms/my-button";
import { useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import {
  CustomerSchedule,
  ordersAdventuresService,
} from "@/services/api/orders";
import PopupCancelActivity from "./popup-cancel-activity";
import MyCancelScheduleModal from "../molecules/my-cancel-schedule-modal";
import { cn } from "@/utils/cn";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { addHours } from "date-fns";

type FullActivitiesHistoricProps = {
  activities: CustomerSchedule[] | undefined;
  withOptions: boolean;
};

type CancelSchedule = {
  orderAdventuresId: string;
  orderScheduleAdventureId: string;
};

export default function ScheduledActivitiesMobile({
  activities,
  withOptions,
}: FullActivitiesHistoricProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showCanceledModal, setShowCanceledModal] = useState(false);
  const [cancelOrder, setCancelOrder] = useState<CancelSchedule | null>(null);
  const queryClient = useQueryClient();
  const [isOffCancelLimit, setIsOffCancelLimit] = useState(false);
  const [paid, setPaid] = useState(false);

  const handleModal = (
    orderAdventuresId: string,
    orderScheduleAdventureId: string
  ) => {
    setShowModal(true);
    setCancelOrder({ orderAdventuresId, orderScheduleAdventureId });
  };

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
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.status === 400) {
            handleClose();
            toast.error(error.response?.data.message);
          }
        }
      } finally {
        setCancelOrder(null);
        setShowModal(false);
        setTimeout(() => {
          setShowCanceledModal(true);
        }, 500);
      }
    }
  };

  return (
    <section className="">
      {activities &&
        activities.map((activity, index: number) => (
          <div
            className={cn(
              "flex flex-col gap-4 px-2 my-8",
              activity?.adventureStatus.includes("cancelado") &&
                "opacity-60 pointer-events-none"
            )}
            key={index}
          >
            <div className="flex justify-around items-center gap-2 cursor-pointer">
              <div className="flex flex-col items-center">
                <MyIcon name="calendar" />
                <MyTypography weight="bold" className="text-primary-600">
                  {getData(activity.schedule.datetime, true).slice(0, 5)}
                </MyTypography>
              </div>
              <div className="flex justify-center gap-2 max-h-[9rem]">
                <div
                  className="relative z-10 overflow-hidden min-w-[110px] min-h-[7rem] hover:cursor-pointer rounded-md"
                  onClick={() =>
                    router.push(
                      PATHS.visualizarAtividade(activity?.adventure?.id)
                    )
                  }
                >
                  <Image
                    alt="Imagem aventura"
                    src={getDefaultImage(activity)}
                    width={250}
                    height={300}
                    className="w-[110px] h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1 justify-start">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1 mr-4">
                      <MyBadge
                        className="font-medium text-nowrap p-1"
                        variant="outline"
                      >
                        {handleNameActivity(activity?.adventure?.typeAdventure)}
                      </MyBadge>

                      {/* {activity?.adventureStatus ===
                        "cancelado_pelo_cliente" && (
                        <MyBadge
                          className="font-medium text-nowrap p-1 rounded-lg"
                          variant="error"
                        >
                          Cancelada
                        </MyBadge>
                      )} */}
                      {withOptions && (
                        <div className="cursor-pointer z-20">
                          <PopupCancelActivity
                            onCancelar={() =>
                              handleModal(
                                String(activity.orderAdventureId),
                                activity.id
                              )
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {!activity?.personsIsAccounted ? (
                    <MyBadge variant="error" className="h-6 rounded-lg ">
                      Pendente de pagamento
                    </MyBadge>
                  ) : (
                    !activity?.partnerConfirmed && (
                      <MyBadge variant="info" className="h-6 rounded-lg ">
                        Pendente de confirmação
                      </MyBadge>
                    )
                  )}
                  <MyTypography variant="subtitle3" weight="bold" className="">
                    {activity?.adventure?.title.length > 20
                      ? activity?.adventure?.title.slice(0, 20).trim() + "..."
                      : activity?.adventure?.title}
                  </MyTypography>
                  <MyTypography variant="label" className="pr-2">
                    {!activity?.personsIsAccounted ||
                    !activity?.partnerConfirmed
                      ? activity.adventure.description
                          .slice(0, 35)
                          .concat("...")
                      : activity.adventure.description
                          .slice(0, 60)
                          .concat("...")}
                  </MyTypography>
                </div>
              </div>
            </div>
          </div>
        ))}
      <MyCancelScheduleModal
        title="Cancelamento de atividade"
        subtitle={
          isOffCancelLimit
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
          isOffCancelLimit
            ? "Atividade cancelada!"
            : !paid
              ? "Essa atividade não foi paga. Portanto, foi cancelada com sucesso e não há reembolso!"
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
