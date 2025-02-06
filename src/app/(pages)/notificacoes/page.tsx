"use client";

import { notifications } from "@/common/constants/mock";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import { cn } from "@/utils/cn";
import { formatDate, getData, getHora, isDateInPast } from "@/utils/formatters";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import React from "react";

export default function Notificacoes() {
  const router = useRouter();

  const getMonthName = (timestamp: string) => {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const date = new Date(timestamp);
    return months[date.getMonth()];
  };

  const groupedNotifications = notifications.reduce<
    Record<string, typeof notifications>
  >((acc, notification) => {
    const monthYear = getMonthName(notification.timestamp); // Exemplo: "Fevereiro"

    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(notification);

    return acc;
  }, {});

  return (
    <section className="mx-6">
      <div className="flex gap-4 items-center my-6">
        <MyIcon
          name="voltar-black"
          className=""
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle1" weight="bold" className="">
          Suas notificações
        </MyTypography>
      </div>

      <div className="my-12">
        {Object.entries(groupedNotifications).map(([month, notifications]) => (
          <div key={month} className="space-y-4 my-6">
            <MyTypography
              variant="body-big"
              weight="semibold"
              lightness={500}
              className=""
            >
              {month}
            </MyTypography>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
              {notifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={cn(
                    "w-full flex flex-col gap-2 px-3 py-2 bg-[#F1F0F5] rounded-lg shadow-sm hover:bg-gray-100 relative",
                    notification.status == "realizada" && "opacity-70"
                  )}
                  onClick={() =>
                    router.push(PATHS.visualizarNotificacao(notification.id))
                  }
                >
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 w-2 rounded-l-lg",
                      notification.status == "cancelada"
                        ? "bg-[#FF7272] opacity-50"
                        : notification.status == "pendente"
                          ? "bg-primary-900"
                          : "bg-[#D6D6D6]"
                    )}
                  />

                  <MyTypography
                    variant="notification"
                    weight="semibold"
                    className="ml-1 mt-1 flex gap-2 items-center"
                  >
                    {formatDate(notification.timestamp) == "Agora pouco" && (
                      <MyIcon name="now" />
                    )}
                    {formatDate(notification.timestamp)}
                    {formatDate(notification.timestamp) != "Agora pouco" &&
                      ` - ${getHora(notification.timestamp)}`}
                  </MyTypography>
                  <MyTypography
                    variant="label"
                    weight="semibold"
                    className="ml-1"
                  >
                    {index < 9 ? `0${index + 1}` : index} - {notification.title}
                  </MyTypography>
                  <MyTypography
                    variant="notification"
                    weight="regular"
                    className="ml-1 flex justify-between"
                  >
                    {notification.description.slice(0, 30) + "..."}
                    <MyIcon name={notification.read ? "read" : "unread"} />
                  </MyTypography>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
