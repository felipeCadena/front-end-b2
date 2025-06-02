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

  return (
    <section className="">
      {activities &&
        activities.map((activity, index: number) => (
          <div
            className={cn(
              "flex flex-col gap-4 px-2 my-12",
              activity?.adventureStatus.includes("cancelado") ||
                (activity?.schedule?.isCanceled &&
                  "opacity-60 pointer-events-none")
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
                  className="relative z-10 overflow-hidden min-w-[100px] min-h-[7rem] hover:cursor-pointer rounded-md"
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
                    className="w-[100px] h-full object-cover"
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

                      {withOptions && (
                        <div className="cursor-pointer z-20">
                          <PopupCancelActivity
                            onCancelar={() => handleModal(activity)}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {!activity?.personsIsAccounted ? (
                    <div>
                      <MyBadge variant="error" className="rounded-lg">
                        Pendente de pagamento
                      </MyBadge>
                    </div>
                  ) : (
                    !activity?.partnerConfirmed && (
                      <div>
                        <MyBadge variant="info" className="rounded-lg">
                          Pendente de confirmação
                        </MyBadge>
                      </div>
                    )
                  )}
                  {activity?.adventureStatus.includes("cancelad") ||
                    (activity?.schedule?.isCanceled && (
                      <div>
                        <MyBadge className="h-6 rounded-lg" variant="error">
                          Cancelada
                        </MyBadge>
                      </div>
                    ))}
                  <MyTypography variant="subtitle3" weight="bold" className="">
                    {activity?.adventure?.title.length > 20
                      ? activity?.adventure?.title.slice(0, 14).trim() + "..."
                      : activity?.adventure?.title}
                  </MyTypography>
                  <MyTypography variant="label" className="pr-2">
                    {!activity?.personsIsAccounted ||
                    !activity?.partnerConfirmed ||
                    activity?.schedule?.isCanceled
                      ? activity.adventure.description
                          .slice(0, 30)
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
