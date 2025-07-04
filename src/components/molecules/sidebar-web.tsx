"use client";

import {
  sideBarAdmin,
  sideBarClient,
  sideBarLp,
  sideBarPartnet,
} from "@/common/constants/sideBar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import MyIcon from "../atoms/my-icon";
import { useAuthStore } from "@/store/useAuthStore";
import { signOut, useSession } from "next-auth/react";
import { authService } from "@/services/api/auth";
import { notificationsService } from "@/services/api/notifications";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/store/useCart";
import useLogin from "@/store/useLogin";
import { toast } from "react-toastify";
import { adminService } from "@/services/api/admin";
import { cn } from "@/utils/cn";
import { users } from "@/services/api/users";

export default function SidebarMenuWeb({}) {
  const pathname = usePathname();
  const { setSideBarActive, sideBarActive } = useLogin();
  const { user, clearUser } = useAuthStore();
  const { data: session } = useSession();
  const { getCartSize } = useCart();

  const userId = session?.user?.id ?? "";

  const cartSize = getCartSize(userId ?? "");

  useEffect(() => {
    switch (session?.user?.role) {
      case "admin":
      case "superadmin":
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

  const { data: notifications = { messagesUnred: 0 } } = useQuery({
    queryKey: ["unread_notifications"],
    queryFn: () => notificationsService.countUnreadNotifications(),
    enabled: !!session?.user?.id,
  });

  const handleLogout = async () => {
    try {
      clearUser();
      await authService.logout(session?.user.refreshToken ?? "");
      signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Erro ao fazer logout. Tente novamente.");
    }
  };

  const iconInclude = ["Notificações", "Carrinho de Compras"];

  return (
    <div className="flex items-center gap-10 ">
      {sideBarActive.map((item) => {
        const link =
          item.link === "/carrinho"
            ? "/finalizar-compra"
            : item.link === "/chat"
              ? "nao-incluir"
              : item.link;

        if (link === "nao-incluir") return false;

        const isActive = pathname === link;

        return (
          <React.Fragment key={item.label}>
            {item.web && (
              <Link
                href={`${item.link == "/carrinho" ? "/finalizar-compra" : item.link}${item.tab ? `?tab=${item.tab}` : ""}`}
                className={`${
                  isActive ? "border-b-2 border-black" : "hover:text-black"
                } transition-all text-black relative`}
                onClick={(e) => {
                  if (item.label == "Sair") {
                    e.preventDefault();
                    handleLogout();
                  }
                }}
              >
                {item.label != "Chat" && (
                  <div className="flex gap-4 text-sm">
                    {iconInclude.includes(item.label) && (
                      <MyIcon name={item.icon} className="w-4 h-4" />
                    )}
                    {item.label}
                  </div>
                )}

                {item.label == "Notificações" && (
                  <div
                    className={cn(
                      `absolute flex justify-center items-center bottom-4 left-3 w-[1.125rem] rounded-full text-white text-xs font-bold`,
                      notifications?.messagesUnred > 0
                        ? "bg-red-400 h-[1.125rem]"
                        : "bg-slate-300 h-[1.125rem]",
                      notifications?.messagesUnred > 10 &&
                        "h-[1.3rem] w-[1.8rem]"
                    )}
                  >
                    {notifications?.messagesUnred}
                  </div>
                )}

                {item.label == "Carrinho de Compras" && (
                  <div className="absolute flex justify-center items-center bottom-4 left-3 bg-primary-600 h-[1.125rem] w-[1.125rem] rounded-full text-white text-xs font-bold">
                    {cartSize}
                  </div>
                )}

                {item.label == "Chat" && (
                  <div className="h-[2rem] w-[2rem] rounded-full">
                    {/* relative bg-secondary-200 */}
                    {/* <div className="absolute bg-red-400 h-[0.625rem] w-[0.625rem] rounded-full" /> */}
                    <MyIcon
                      name="chat-web"
                      // className="absolute top-1.5 left-[0.30rem]"
                    />
                  </div>
                )}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
