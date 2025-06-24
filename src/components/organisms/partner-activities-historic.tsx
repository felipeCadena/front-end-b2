"use client";

import Image from "next/image";
import React from "react";
import MyBadge from "../atoms/my-badge";
import StarRating from "../molecules/my-stars";
import MyTypography from "../atoms/my-typography";
import MyIcon from "../atoms/my-icon";
import {
  getData,
  getHora,
  handleNameActivity,
  isPastActivity,
  isWithinChatWindow,
} from "@/utils/formatters";
import MyButton from "../atoms/my-button";
import { usePathname, useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import { cn } from "@/utils/cn";
import Calendar from "../atoms/my-icon/elements/calendar";
import PopupActivity from "./popup-activity";
import ModalClient from "./modal-client";
import Pessoas from "../atoms/my-icon/elements/pessoas";
import GenericModal from "./generic-modal";
import { partnerService } from "@/services/api/partner";

export default function PartnerActivitiesHistoric({
  activities,
  withDate,
  withOptions,
}: any) {
  const router = useRouter();
  const pathname = usePathname();
  const [showModal, setShowModal] = React.useState(false);
  const [clientList, setClientList] = React.useState<any>([]);
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState(false);

  const [id, setId] = React.useState<string>("");

  const handleCancel = (id: string | number) => {
    router.push(PATHS.cancelarAtividade(id));
  };

  const handleEdit = (id: string) => {
    router.push(PATHS.editarAtividadeParceiro(id));
  };

  const handleModalCustomers = async (id: string) => {
    try {
      const clients = await partnerService.getPartnerScheduleById(id);
      setClientList(clients);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching schedule data:", error);
    }
  };

  const handleConfirm = async (scheduleId: string) => {
    setShowConfirmationModal(true);
    setId(scheduleId);
  };

  const calculateTotalCost = (ordersScheduleAdventure: any) => {
    const totalCost = ordersScheduleAdventure?.reduce(
      (acc: number, order: any) => acc + Number(order.partnerValue),
      0
    );
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(totalCost);
  };

  const handleConfirmed = (ordersScheduleAdventure: any) => {
    if (!ordersScheduleAdventure) return null;
    return ordersScheduleAdventure?.some(
      (order: any) => !order?.partnerConfirmed
    );
  };

  const handleChat = (id: string) => {
    router.push(`/chat?scheduleId=${id}`);
  };

  return (
    <section className="md:max-w-screen-custom">
      <ModalClient
        open={showModal}
        onClose={() => setShowModal(false)}
        data={clientList?.ordersScheduleAdventure}
        icon={<Pessoas stroke="#9F9F9F" />}
        title="Lista de Clientes"
        descrition="Confira a lista de clientes para esta atividade:"
        button="Fechar"
      />

      <GenericModal
        open={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        id={id}
        icon={<Pessoas stroke="#9F9F9F" />}
        title="Lista de reservas a serem confirmadas"
        descrition="Confira a lista reservas:"
        button="Fechar"
      />

      {activities &&
        activities.map((activity: any, index: number) => (
          <div
            className={cn(
              "flex items-center gap-4 mt-20 mb-20 w-full",
              (activity?.adventure?.deleted || activity.isCanceled) &&
                "cursor-not-allowed opacity-50"
            )}
            key={index}
          >
            {withDate && (
              <MyButton
                variant={withDate ? "secondary-text" : "default"}
                borderRadius="squared"
                size={withDate ? "md" : "lg"}
                className={cn(
                  !withDate && "px-10",
                  "flex flex-col gap-1 text-base"
                )}
              >
                {withDate ? (
                  <div>
                    <Calendar width={30} height={30} />
                  </div>
                ) : (
                  <MyIcon name="clock" className="mr-2" />
                )}
                {withDate ? getData(activity?.datetime) : "Refazer atividade"}
              </MyButton>
            )}

            <div className="relative z-10 flex-shrink-0 overflow-hidden w-[220px] h-[220px] hover:cursor-pointer rounded-md">
              <Image
                alt="Imagem da atividade"
                src={
                  activity?.adventure?.images &&
                  activity?.adventure?.images.length > 0
                    ? activity?.adventure?.images[0].url
                    : "/images/atividades/paraquedas.webp"
                }
                width={250}
                height={300}
                className={cn(
                  "object-cover w-[265px] h-[265px]",
                  (activity?.adventure?.deleted || activity.isCanceled) &&
                    "cursor-not-allowed opacity-50"
                )}
                onClick={() =>
                  router.push(PATHS.atividadeRealizada(activity?.adventureId))
                }
              />
            </div>

            <div className="flex flex-col justify-between w-full h-[220px] max-h-[220px]">
              <div className="w-full flex justify-between relative">
                <div
                  className={cn(
                    "flex flex-col gap-2 cursor-pointer",
                    (activity?.adventure?.deleted || activity.isCanceled) &&
                      "cursor-not-allowed opacity-50"
                  )}
                  onClick={() =>
                    router.push(PATHS.atividadeRealizada(activity?.adventureId))
                  }
                >
                  <div className="flex items-center gap-2">
                    <MyBadge className="font-medium p-1" variant="outline">
                      {handleNameActivity(activity?.adventure?.typeAdventure)}
                    </MyBadge>
                    <StarRating rating={activity?.adventure?.averageRating} />
                    {activity?.adventure?.deleted && (
                      <MyBadge className="font-medium p-1" variant="warning">
                        Atividade deletada!
                      </MyBadge>
                    )}

                    {activity?.isCanceled && (
                      <MyBadge className="font-medium p-1" variant="error">
                        Atividade cancelada!
                      </MyBadge>
                    )}
                  </div>
                  <MyTypography variant="subtitle3" weight="bold" className="">
                    {activity?.adventure?.title}
                  </MyTypography>

                  <MyTypography variant="label" className="md:w-[80%]">
                    {activity?.adventure?.description
                      ?.slice(0, 150)
                      .concat("...") ?? ""}
                  </MyTypography>
                </div>

                {!activity?.adventure?.deleted &&
                  !activity.isCanceled &&
                  handleConfirmed(activity?.ordersScheduleAdventure) && (
                    <MyButton
                      variant="outline-neutral"
                      borderRadius="squared"
                      size="sm"
                      className="md:w-1/2 mx-12"
                      onClick={() => {
                        handleConfirm(activity?.id);
                      }}
                    >
                      Confirmar reservas
                    </MyButton>
                  )}

                {!withDate && (
                  <MyButton
                    variant="default"
                    borderRadius="squared"
                    size="lg"
                    className="text-base ml-auto"
                    leftIcon={<MyIcon name="clock" className="mr-2" />}
                  >
                    Refazer atividade
                  </MyButton>
                )}

                {withOptions && (
                  <div className="absolute top-0 right-3 cursor-pointer z-20">
                    <PopupActivity
                      reservation
                      chat={isWithinChatWindow(activity?.datetime)}
                      onDuplicar={() => console.log("Duplicar")}
                      onChat={() => handleChat(activity?.id)}
                      onCancelar={() => handleCancel(activity?.id)}
                      activityCanceled={activity?.isCanceled}
                      pastActivity={isPastActivity(activity?.datetime)}
                      onEditar={() => handleEdit(activity.id)}
                      onOcultar={() => console.log("Ocultar")}
                      onExcluir={() => console.log("Excluir")}
                      onCustomer={() => handleModalCustomers(activity?.id)}
                    />
                  </div>
                )}

                <div
                  className={cn(
                    "flex gap-4",
                    pathname.includes("parceiro") && "hidden"
                  )}
                >
                  {withDate && (
                    <MyButton
                      variant="message"
                      borderRadius="squared"
                      size="md"
                      className="px-10"
                      leftIcon={<MyIcon name="message" className="" />}
                    >
                      Mensagem
                    </MyButton>
                  )}
                </div>
              </div>
              <div className="w-full flex justify-between items-center p-3 bg-[#F1F0F587] border border-primary-600/30 border-opacity-80 rounded-lg shadow-sm relative">
                <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>

                <div className="flex flex-col">
                  <MyTypography variant="label" weight="bold" className="ml-3">
                    Data da Atividade
                  </MyTypography>
                  <MyTypography
                    variant="body"
                    weight="regular"
                    className="ml-3"
                  >
                    {getData(activity?.datetime)} -{" "}
                    {getHora(activity?.datetime)}{" "}
                    {+getHora(activity?.datetime).split(":")[0] > 12
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
                      4 horas
                    </MyTypography>
                  </div>
                </div>

                <div className="flex flex-col">
                  <MyTypography variant="label" weight="bold" className="ml-3">
                    Quant. de pessoas
                  </MyTypography>
                  <MyTypography
                    variant="body"
                    weight="regular"
                    className="ml-3"
                  >
                    {activity?.qntConfirmedPersons} pessoas
                    {/* {new Intl.NumberFormat("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(
                      activity?.orderAdventure?.totalCost
                    )} */}
                  </MyTypography>
                </div>

                <div className="flex flex-col">
                  <MyTypography
                    variant="body-big"
                    weight="bold"
                    className="text-right"
                  >
                    Seu ganho:
                  </MyTypography>
                  <MyTypography variant="body" weight="bold" className="">
                    {activity?.ordersScheduleAdventure &&
                    activity?.ordersScheduleAdventure.length > 0
                      ? calculateTotalCost(activity?.ordersScheduleAdventure)
                      : "R$ 0,00"}
                  </MyTypography>
                </div>
              </div>

              {/* <div
                onClick={() =>
                  router.push(PATHS["enviar-fotos"](activity?.schedule?.id))
                }
                className={cn(
                  "cursor-pointer flex justify-between items-center p-4 bg-[#F1F0F587] border border-primary-600/30 md:bg-primary-900 border-opacity-80 rounded-lg shadow-sm relative",
                  (activity?.adventure?.deleted || activity.isCanceled) &&
                    "cursor-not-allowed opacity-50"
                )}
              >
                <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>

                <div className="flex items-center gap-1 ml-4">
                  <MyIcon name="camera" />
                  <MyTypography variant="subtitle3" weight="bold" className="">
                    Fotos dessa Atividade
                  </MyTypography>
                </div>
                <MyIcon name="seta" />
              </div> */}
            </div>
          </div>
        ))}
    </section>
  );
}
