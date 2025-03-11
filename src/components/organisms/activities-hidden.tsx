"use client";

import { cn } from "@/utils/cn";
import React, { useState } from "react";
import MyTypography from "../atoms/my-typography";
import MyIcon from "../atoms/my-icon";
import { formatDate, getTimeInterval } from "@/utils/formatters";
import Now from "../atoms/my-icon/elements/now";
import PopupActivity from "./popup-activity";

export default function ActivitiesHidden({ notifications }: any) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <section>
      <div className="mt-6 mx-4">
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
                onClick={() => {}}
              >
                <MyIcon
                  name="options"
                  className="absolute top-3 right-3 cursor-pointer"
                  onClick={() => setOpenModal(true)}
                />
                {openModal && (
                  <PopupActivity
                    visible={openModal}
                    onClose={() => setOpenModal(false)}
                    onDuplicar={() => {}}
                    onCancelar={() => {}}
                    onEditar={() => {}}
                    onOcultar={() => {}}
                    onExcluir={() => {}}
                  />
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
