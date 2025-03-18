"use client";

import { cn } from "@/utils/cn";
import React from "react";
import MyTypography from "../atoms/my-typography";
import { getTimeInterval } from "@/utils/formatters";
import Now from "../atoms/my-icon/elements/now";
import PopupActivity from "./popup-activity";
import { useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import Hide from "../atoms/my-icon/elements/hide";
import ModalClient from "./modal-client";
import { clientList } from "@/common/constants/mock";
import User from "../atoms/my-icon/elements/user";
import Pessoas from "../atoms/my-icon/elements/pessoas";

export default function ActivitiesHidden({
  notifications,
  hidden,
}: {
  notifications: any;
  hidden?: boolean;
}) {
  const router = useRouter();
  const [showModal, setShowModal] = React.useState(false);

  const handleCancel = (id: string | number) => {
    router.push(PATHS.cancelarAtividade(id));
  };

  const handleEdit = (id: string) => {
    router.push(PATHS.editarAtividadeParceiro(id));
  };

  return (
    <section>
      <div className="mt-6 mx-4">
        <ModalClient
          open={showModal}
          onClose={() => setShowModal(false)}
          data={clientList}
          icon={<Pessoas stroke="#9F9F9F" />}
          title="Lista de Clientes"
          descrition="Confira a lista de clientes para esta atividade:"
          button="Fechar"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {notifications.map(
            (
              notification: {
                id: React.Key | null | undefined;
                duracao: number;
                group: string;
                status: string;
                timestamp: any;
                title: any;
                description: string;
                read: any;
              },
              index: number
            ) => (
              <div
                key={notification.id}
                className={cn(
                  "w-full flex flex-col gap-2 px-3 py-2 bg-[#F1F0F5] rounded-lg shadow-sm hover:bg-gray-100 relative cursor-pointer",
                  notification.status == "cancelada"
                    ? "border border-[#FF7272]"
                    : notification.status == "em andamento"
                      ? "border border-primary-600"
                      : ""
                )}
              >
                {!hidden ? (
                  <div className="absolute top-0 right-3 z-20">
                    <PopupActivity
                      onDuplicar={() => console.log("Duplicar")}
                      onCancelar={() => handleCancel(notification.id as string)}
                      onEditar={() => handleEdit(notification.id as string)}
                      onOcultar={() => console.log("Ocultar")}
                      onExcluir={() => console.log("Excluir")}
                      onCustomer={() => setShowModal(true)}
                    />
                  </div>
                ) : (
                  <div className="absolute top-4 right-3 z-20">
                    <Hide iconColor="#9F9F9F" />
                  </div>
                )}

                <div className="flex items-center justify-between w-full">
                  <MyTypography
                    variant="notification"
                    weight="semibold"
                    className="mt-1 flex gap-2 items-center"
                  >
                    <Now
                      iconColor={
                        notification.status == "em andamento"
                          ? "#8DC63F"
                          : notification.status == "realizada"
                            ? "#9F9F9F"
                            : notification.status == "cancelada"
                              ? "#FF7272"
                              : notification.status == "oculta"
                                ? "#9F9F9F"
                                : "#2DADE4"
                      }
                    />
                    {getTimeInterval(
                      notification.timestamp,
                      notification.duracao
                    )}
                  </MyTypography>
                </div>

                <MyTypography variant="label" weight="semibold" className="">
                  {index < 9 ? `0${index + 1}` : index} - {notification.title}
                </MyTypography>
                <MyTypography
                  variant="notification"
                  weight="regular"
                  className="flex justify-between"
                  lightness={400}
                >
                  {notification.status == "cancelada"
                    ? "Atividade cancelada"
                    : notification.status == "em andamento"
                      ? notification.group +
                        " clientes participando desta atividade"
                      : notification.status == "realizada"
                        ? notification.group +
                          " clientes participaram desta atividade"
                        : notification.status == "oculta"
                          ? "Atividade oculta"
                          : notification.group +
                            " clientes vão participar desta atividade"}
                </MyTypography>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
