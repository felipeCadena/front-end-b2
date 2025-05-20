"use client";

import { cn } from "@/utils/cn";
import React from "react";
import MyTypography from "../atoms/my-typography";
import { getData, getHora, isPastActivity } from "@/utils/formatters";
import Now from "../atoms/my-icon/elements/now";
import PopupActivity from "./popup-activity";
import { useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import Hide from "../atoms/my-icon/elements/hide";
import ModalClient from "./modal-client";
import Pessoas from "../atoms/my-icon/elements/pessoas";
import MyBadge from "../atoms/my-badge";
import GenericModal from "./generic-modal";
import { partnerService } from "@/services/api/partner";
import { useQuery } from "@tanstack/react-query";

export default function PartnerHistoricMobile({
  activities,
  hidden,
  admin,
}: {
  activities: any;
  hidden?: boolean;
  admin?: boolean;
}) {
  const router = useRouter();
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

  const handleConfirmed = (ordersScheduleAdventure: any) => {
    if (!ordersScheduleAdventure) return null;
    return ordersScheduleAdventure?.some(
      (order: any) => !order?.partnerConfirmed
    );
  };

  return (
    <section className="px-4">
      <div className="mt-6">
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

        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-3 gap-5",
            admin && "md:grid-cols-2"
          )}
        >
          {activities &&
            activities.map((activity: any, index: number) => (
              <div
                key={activity.id}
                className={cn(
                  "w-full flex flex-col gap-2 px-3 py-2 bg-[#F1F0F5] rounded-lg shadow-sm hover:bg-gray-100 relative cursor-pointer",
                  activity.isCanceled &&
                    "border border-[#FF7272] cursor-not-allowed opacity-50",
                  isPastActivity(activity?.datetime) && !activity.isCanceled
                    ? "border border-[#9F9F9F]"
                    : !activity.isCanceled && "border border-[#8DC63F]"
                )}
              >
                {!hidden ? (
                  <div className="absolute top-0 right-3 z-20">
                    <PopupActivity
                      reservation
                      onDuplicar={() => console.log("Duplicar")}
                      onCancelar={() => handleCancel(activity?.id)}
                      onEditar={() => handleEdit(activity.id)}
                      onOcultar={() => console.log("Ocultar")}
                      onExcluir={() => console.log("Excluir")}
                      onCustomer={() => handleModalCustomers(activity?.id)}
                    />
                  </div>
                ) : (
                  <div className="absolute top-4 right-3 z-20">
                    <Hide iconColor="#9F9F9F" />
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-between">
                    <MyTypography
                      variant="notification"
                      weight="semibold"
                      className="mt-1 flex gap-2 items-center"
                    >
                      <Now
                        iconColor={cn(
                          activity?.isCanceled && "#FF7272",
                          isPastActivity(activity?.datetime) &&
                            !activity.isCanceled
                            ? "#1E1E1E"
                            : !activity.isCanceled && "#8DC63F"
                        )}
                      />
                      {`${getData(activity?.datetime)} - ${getHora(activity?.datetime)}`}
                    </MyTypography>
                  </div>

                  {!activity?.adventure?.deleted &&
                    !activity.isCanceled &&
                    handleConfirmed(activity?.ordersScheduleAdventure) && (
                      <MyBadge
                        onClick={() => handleConfirm(activity?.id)}
                        variant="warning"
                      >
                        Confirmar agendamento
                      </MyBadge>
                    )}

                  {activity?.isCanceled && (
                    <MyBadge variant="error">Cancelada</MyBadge>
                  )}
                </div>

                <MyTypography variant="label" weight="semibold" className="">
                  {index < 9 ? `0${index + 1}` : index} -{" "}
                  {activity?.adventure?.title}
                </MyTypography>
                <MyTypography
                  variant="notification"
                  weight="regular"
                  className="flex justify-between"
                  lightness={400}
                >
                  {activity?.adventure?.description.slice(0, 50).concat("...")}
                </MyTypography>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
