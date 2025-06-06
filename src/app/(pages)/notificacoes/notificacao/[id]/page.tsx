"use client";

import { notifications } from "@/common/constants/mock";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import { cn } from "@/utils/cn";
import { formatDate, getHora } from "@/utils/formatters";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Notificacao() {
  const router = useRouter();
  const { id } = useParams();
  const [notification, setNotification] = React.useState<any>();

  useEffect(() => {
    const index = notifications.findIndex(
      (notification) => notification.id == Number(id)
    );

    if (index !== -1) {
      const notificationData = { ...notifications[index], index: index + 1 };
      setNotification(notificationData);
    }
  }, [id]);

  const formatDescription = (status: string) => {
    switch (status) {
      case "cancelada":
        return (
          <div className="flex flex-col gap-4 ml-2 mt-2">
            <MyTypography variant="label" weight="regular">
              Pedimos desculpas pelo ocorrido, um de nossos parceiros precisou
              cancelar sua atividade.
            </MyTypography>
            <MyTypography variant="label" weight="semibold">
              O valor debitado da atividade será estornado em sua conta em até 3
              dias úteis
            </MyTypography>
          </div>
        );
      case "pendente":
        return (
          <div className="flex flex-col gap-4 ml-2 mt-2">
            <MyTypography variant="label" weight="regular">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas
            </MyTypography>
            <MyTypography variant="label" weight="semibold">
              O valor debitado da atividade será estornado em sua conta em até 3
              dias úteis
            </MyTypography>
          </div>
        );
      case "realizada":
        return (
          <div className="flex flex-col gap-4 ml-2 mt-2">
            <MyTypography variant="label" weight="regular">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas
            </MyTypography>
            <MyTypography variant="label" weight="semibold">
              O valor debitado da atividade será estornado em sua conta em até 3
              dias úteis
            </MyTypography>
          </div>
        );
      default:
        return "";
    }
  };

  return (
    <section className="m-6 space-y-4">
      <div className="flex gap-4 items-center">
        <MyIcon
          name="voltar-black"
          className=""
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle1" weight="bold" className="">
          Suas notificações
        </MyTypography>
      </div>

      <div
        key={notification?.id}
        className={cn(
          "w-full flex flex-col gap-3 p-4 mt-4 bg-[#F1F0F5] rounded-lg shadow-sm hover:bg-gray-100 relative",
          notification?.status == "realizada" && "opacity-70"
        )}
      >
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-2 rounded-l-lg",
            notification?.status == "cancelada"
              ? "bg-[#FF7272] opacity-50"
              : notification?.status == "pendente"
                ? "bg-primary-900 opacity-50"
                : "bg-[#D6D6D6]"
          )}
        ></div>

        <MyTypography
          variant="notification"
          weight="semibold"
          className="ml-2 flex gap-2 items-center"
        >
          {formatDate(notification?.timestamp ?? "") == "Agora pouco" && (
            <MyIcon name="now" className="" />
          )}
          {formatDate(notification?.timestamp ?? "")}
          {formatDate(notification?.timestamp ?? "") != "Agora pouco" &&
            `- ${getHora(notification?.timestamp ?? "")}`}
        </MyTypography>
        <MyTypography variant="subtitle3" weight="bold" className="ml-2">
          {notification?.index < 9
            ? `0${notification?.index}`
            : notification?.index}{" "}
          - {notification?.title}
        </MyTypography>
        <MyTypography variant="label" weight="regular" className="ml-2">
          Sua atividade de{" "}
          <span className="font-semibold">{notification?.title}</span> foi{" "}
          {notification?.status}!
        </MyTypography>
        {formatDescription(notification?.status)}
        <MyTypography variant="label" weight="regular" className="ml-2 mt-4">
          Valor da atividade <span className="font-bold">R$ 340,00</span>
        </MyTypography>
      </div>

      <div
        key={notification?.id}
        className={cn(
          "w-full flex flex-col gap-3 p-4  bg-[#F1F0F5] rounded-lg shadow-sm hover:bg-gray-100 relative",
          notification?.status == "realizada" && "opacity-70"
        )}
      >
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-2 rounded-l-lg bg-[#D6D6D6]"
          )}
        ></div>
        <MyTypography
          variant="subtitle3"
          weight="semibold"
          className="ml-2"
        >
          Justificativa de Cancelamento:
        </MyTypography>
        <MyTypography variant="label" weight="regular" className="ml-2 mt-2">
          {notification?.reason}
        </MyTypography>

        <div className="flex gap-2 mt-4">
          <Image
            alt="avatar"
            src={notification?.parceiro?.avatar ?? ""}
            width={8}
            height={8}
            className="w-12 h-12 rounded-full object-contain"
          />
          <div>
            <MyTypography variant="label" weight="semibold">
              {notification?.parceiro?.nome}
            </MyTypography>
            <MyTypography variant="label" weight="regular" lightness={400}>
              Visto por Último Ontem
            </MyTypography>
          </div>
        </div>
      </div>
    </section>
  );
}
