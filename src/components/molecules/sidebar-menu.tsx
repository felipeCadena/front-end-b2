"use client";

import { useAuthStore } from "@/store/useAuthStore";
import {
  sideBarAdmin,
  sideBarClient,
  sideBarLp,
  sideBarPartnet,
} from "@/common/constants/sideBar";
import MyIcon from "@/components/atoms/my-icon";
import {
  MyToggleGroup,
  ToggleGroupItem,
} from "@/components/molecules/my-toggle-group";
import { cn } from "@/utils/cn";
import Link from "next/link";
import React, { useEffect } from "react";
import { authService } from "@/services/api/auth";
import { signOut, useSession } from "next-auth/react";
import useLogin from "@/store/useLogin";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCart } from "@/store/useCart";
import { notificationsService } from "@/services/api/notifications";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { adminService } from "@/services/api/admin";

export default function SidebarMenu({
  closeSidebar,
}: {
  closeSidebar: () => void;
}) {
  const { user, clearUser } = useAuthStore();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { setSideBarActive, sideBarActive } = useLogin();

  useEffect(() => {
    switch (session?.user?.role) {
      case "admin":
        setSideBarActive(sideBarAdmin);
        break;
      case "partner":
        setSideBarActive(sideBarPartnet);
        break;
      case "customer":
        setSideBarActive(sideBarClient);
        break;
      default:
        setSideBarActive(sideBarLp);
    }
  }, [user, session]);

  const handleLogout = async () => {
    try {
      await authService.logout(session?.user.refreshToken ?? "");
      signOut({
        callbackUrl: "/",
        redirect: true,
      });
      clearUser();
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Erro ao fazer logout. Tente novamente.");
    }
  };

  const handleCloseSidebar = (event: React.MouseEvent) => {
    event.stopPropagation();
    closeSidebar();
  };

  const { getCartSize } = useCart();

  const userId = session?.user.id;

  const cartSize = getCartSize(userId ?? "");

  const customerOrPartner =
    session?.user.role === "partner" || session?.user.role === "customer";

  const adminOrSuperAdmin =
    session?.user.role === "admin" || session?.user.role === "superadmin";

  const { data: notifications = { messagesUnred: 0 } } = useQuery({
    queryKey: ["unread_notifications"],
    queryFn: () => notificationsService.countUnreadNotifications(),
    enabled: customerOrPartner,
  });

  const { data: adminNotifications = { messagesUnred: 0 } } = useQuery({
    queryKey: ["unread_admin_notifications"],
    queryFn: () => adminService.countUnreadNotificationsAdmin(),
    enabled: adminOrSuperAdmin,
  });

  const notificationsCount = customerOrPartner
    ? notifications.messagesUnred
    : adminNotifications.messagesUnred;

  return (
    <div className="relative">
      <MyToggleGroup
        type="single"
        className="absolute flex w-full flex-col items-start"
      >
        {sideBarActive.map((item) => (
          <ToggleGroupItem
            asChild
            key={item.label}
            value={item.label}
            className="flex w-full items-center justify-start gap-2 rounded-md border-none bg-white p-8 text-start font-normal hover:bg-gray-100 data-[state=on]:text-black data-[state=on]:bg-gray-100"
          >
            <Link
              href={`${item.link}${item.tab ? `?tab=${item.tab}` : ""}`}
              className={cn("flex justify-between")}
              onClick={(e) => {
                handleCloseSidebar(e);
                item.label === "Sair" && handleLogout();
              }}
            >
              <div className="flex gap-1 items-center">
                <MyIcon name={item.icon} />
                {item.label}
              </div>

              {item.label === "Notificações" && (
                <span
                  className={cn(
                    `flex items-center justify-center h-[1.1rem] w-[1.1rem] rounded-full text-white text-xs font-bold`,
                    notificationsCount > 0 ? "bg-red-400" : "bg-slate-300",
                    notificationsCount > 10 && "h-[1.2rem] w-[1.3rem]"
                  )}
                >
                  {notificationsCount}
                </span>
              )}

              {item.label === "Carrinho de Compras" && (
                <span className="flex items-center justify-center bg-primary-600 h-[1.1rem] w-[1.1rem] rounded-full text-white text-xs font-bold">
                  {cartSize ?? 0}
                </span>
              )}
            </Link>
          </ToggleGroupItem>
        ))}
      </MyToggleGroup>
    </div>
  );
}
