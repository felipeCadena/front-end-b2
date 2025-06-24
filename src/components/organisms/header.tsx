"use client";

import React from "react";
import Sidebar from "./sidebar";
import MyLogo from "../atoms/my-logo";
import LanguageDropdown from "./language-dropdown";
import MyIcon from "../atoms/my-icon";
import { usePathname, useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import Image from "next/image";
import SideBarModal from "../molecules/side-bar-modal";
import { cn } from "@/utils/cn";
import { useSession } from "next-auth/react";
import useLogin from "@/store/useLogin";
import { useQuery } from "@tanstack/react-query";
import { users } from "@/services/api/users";
import { useAuthStore } from "@/store/useAuthStore";
import User from "../atoms/my-icon/elements/user";
import MyButton from "../atoms/my-button";
import { sideBarClient } from "@/common/constants/sideBar";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { sideBarActive, setSideBarActive } = useLogin();
  const { setUser } = useAuthStore();
  const { data: session, status } = useSession();

  const { data: fetchUser } = useQuery({
    queryKey: ["fetchUser"],
    enabled: !!session?.user,
    queryFn: async () => {
      const user = await users.getUserLogged();
      setUser({
        ...user,
        photo: {
          url: user?.photo?.url,
          mimetype: user?.photo?.mimetype,
          updatedAt: user?.photo?.updatedAt,
        },
      });
      return user;
    },
  });

  const isPhotoAvailable =
    fetchUser?.photo?.url !== "" && fetchUser?.photo?.url;

  const withoutHeaderMobile = () => {
    return (
      pathname === PATHS["sobre-a-empresa"] ||
      pathname === PATHS["cadastro-parceiro"] ||
      pathname === PATHS["informacoes-atividades"] ||
      pathname === PATHS["cadastro-atividade"]
    );
  };

  return (
    <header
      className={cn(
        "top-0 z-50 h-[100px] w-full md:max-w-screen-custom md:mx-auto bg-white flex items-center justify-between px-4 md:px-6 mb-4",
        withoutHeaderMobile() && "max-sm:hidden"
      )}
    >
      <div
        className="max-sm:hidden cursor-pointer"
        onClick={() => router.push("/")}
      >
        <MyLogo variant="web" width={122} height={40} />
      </div>

      {/* Sidebar - Alinhado à esquerda */}
      <Sidebar />

      {/* Logo - Centralizado */}
      <div className="absolute left-1/2 transform -translate-x-1/2 mt-10 md:hidden">
        <MyLogo variant="mobile" width={100} height={100} />
      </div>

      {/* Language Dropdown - Alinhado à direita */}
      <div className="flex-shrink-0 md:flex md:items-center md:gap-6 ">
        <div className="flex gap-2 items-center">
          <LanguageDropdown />
          {!session?.user?.accessToken && status === "unauthenticated" && (
            <button
              onClick={() => router.push(PATHS.login)}
              className="md:hidden flex items-center font-semibold gap-1 px-2 py-1 text-white bg-black rounded-full shadow-md"
            >
              <User fill="#fff" />
            </button>
          )}
        </div>

        <div className="max-sm:hidden">
          {session?.user?.accessToken && status === "authenticated" ? (
            <SideBarModal sideBar={sideBarActive}>
              <MyButton
                variant="text"
                className="flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-0"
              >
                <MyIcon name="chevron-down" />
                <Image
                  key={fetchUser?.photo?.updatedAt ?? "foto do usuario"}
                  src={`${isPhotoAvailable ? `${fetchUser?.photo?.url}?v=${fetchUser?.photo?.updatedAt}` : "/user.png"}`}
                  alt="Avatar"
                  width={50}
                  height={50}
                  className="rounded-full w-14 h-14 object-cover"
                />
              </MyButton>
            </SideBarModal>
          ) : (
            <button
              onClick={() => router.push(PATHS.login)}
              className="text-sm flex items-center font-semibold gap-1 px-2 md:px-4 py-1 text-[0.9rem] text-white bg-black rounded-full shadow-md"
            >
              Logar-se
              <MyIcon name="user" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
