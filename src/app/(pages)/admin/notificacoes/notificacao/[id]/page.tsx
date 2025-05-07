"use client";

import Loading from "@/app/loading";
import MyIcon from "@/components/atoms/my-icon";
import MySpinner from "@/components/atoms/my-spinner";
import MyTypography from "@/components/atoms/my-typography";
import { notificationsService } from "@/services/api/notifications";
import { cn } from "@/utils/cn";
import { formatDate, getHora } from "@/utils/formatters";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Notificacao() {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: notification, isLoading } = useQuery({
    queryKey: ["notification"],
    queryFn: () => notificationsService.getNotificationById(id as string),
  });

  const notificationHeader =
    notification?.title.split(" dia")[0] ?? "Carregando...";
  const orderStatus = "realizada";

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["unread_notifications"] });
    queryClient.invalidateQueries({ queryKey: ["unread_admin_notifications"] });
  }, [notification]);

  return isLoading ? (
    <div className="w-full h-[30vh] flex justify-center items-center mb-16">
      <Loading />
    </div>
  ) : (
    <section className="m-6 space-y-4">
      <div className="flex gap-4 items-center">
        <MyIcon
          name="voltar-black"
          className="hover:cursor-pointer"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle1" weight="bold" className="">
          Suas notificações
        </MyTypography>
      </div>

      <div className="w-full flex justify-center items-center">
        <div
          key={0}
          className={cn(
            "md:w-[60%] flex flex-col gap-3 p-4 mt-4 bg-[#F1F0F5] rounded-lg shadow-sm hover:bg-gray-100 relative w-full",
            orderStatus === "realizada" && "opacity-70"
          )}
        >
          <div
            className={cn(
              `absolute inset-y-0 left-0 w-2 rounded-l-lg  border-2 bg-[${notification?.color}]`
            )}
            style={{ backgroundColor: notification?.color }}
          ></div>

          <MyTypography
            variant="notification"
            weight="semibold"
            className="ml-2 flex gap-2 items-center"
          >
            {formatDate(notification?.updatedAt ?? "") == "Agora pouco" && (
              <MyIcon name="now" className="" />
            )}
            {formatDate(notification?.createdAt ?? "")}
            {formatDate(notification?.createdAt ?? "") != "Agora pouco" &&
              `- ${getHora(notification?.createdAt ?? "")}`}
          </MyTypography>
          <MyTypography variant="subtitle3" weight="bold" className="ml-2">
            {notificationHeader}
          </MyTypography>
          <div className="flex justify-start items-center">
            <div className="flex flex-col gap-4 ml-2 mt-2 w-full">
              <p
                dangerouslySetInnerHTML={{
                  __html: notification?.text as string,
                }}
                className="text-wrap"
              />
              {notification?.link && (
                <a
                  className="text-blue-500 underline text-wrap"
                  href={notification.link}
                  target="_blank"
                >
                  Clique aqui!
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
