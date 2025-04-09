'use client';

import useLogin from '@/app/(pages)/(cliente)/(acesso)/login/login-store';

import {
  sideBarAdmin,
  sideBarClient,
  sideBarLp,
  sideBarPartnet,
} from '@/common/constants/sideBar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MyIcon from '../atoms/my-icon';
import { useAuthStore } from '@/store/useAuthStore';
import { useSession } from 'next-auth/react';
import { authService } from '@/services/api/auth';
import {
  Notification,
  notificationsService,
} from '@/services/api/notifications';
import { useQuery } from '@tanstack/react-query';
import { useCart } from '@/store/useCart';

export default function SidebarMenuWeb({}) {
  const pathname = usePathname();
  const { email, setSideBarActive, sideBarActive } = useLogin();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { user, clearUser } = useAuthStore();
  const { data: session } = useSession();
  const { getCartSize } = useCart();

  const cartSize = getCartSize();

  useEffect(() => {
    switch (session?.user?.role) {
      case 'admin':
        setSideBarActive(sideBarAdmin);
        break;
      case 'partner':
        setSideBarActive(sideBarPartnet);
        break;
      case 'customer':
        setSideBarActive(sideBarClient);
        break;
      default:
        setSideBarActive(sideBarLp);
    }
  }, [user, session]);

  useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      if (session?.user) {
        const unreadNotifications =
          await notificationsService.listNotifications({
            limit: 30,
            isRead: false,
          });

        setNotifications(unreadNotifications);
      }
    },
  });

  const handleLogout = async () => {
    await authService.logout();
    clearUser();
  };

  const iconInclude = ['Notificações', 'Carrinho de Compras'];

  return (
    <div className="flex items-center gap-10 ">
      {sideBarActive.map((item) => {
        const isActive = pathname.startsWith(
          item.link == '/carrinho'
            ? '/finalizar-compra'
            : item.link == '/chat'
              ? 'nao-incluir'
              : item.link
        );

        return (
          <React.Fragment key={item.label}>
            {item.web && (
              <Link
                href={`${item.link == '/carrinho' ? '/finalizar-compra' : item.link}${item.tab ? `?tab=${item.tab}` : ''}`}
                className={`${
                  isActive ? 'border-b-2 border-black' : 'hover:text-black'
                } transition-all text-black relative`}
                onClick={(e) => {
                  if (item.label == 'Sair') {
                    e.preventDefault();
                    handleLogout();
                  }
                }}
              >
                {item.label != 'Chat' && (
                  <div className="flex gap-4 text-sm">
                    {iconInclude.includes(item.label) && (
                      <MyIcon name={item.icon} className="w-4 h-4" />
                    )}
                    {item.label}
                  </div>
                )}

                {item.label == 'Notificações' && (
                  <div
                    className={`absolute flex justify-center items-center bottom-4 left-3 ${notifications.length > 0 ? 'bg-red-400 h-[1.125rem]' : 'bg-slate-300 h-[1.125rem]'} w-[1.125rem] rounded-full text-white text-xs font-bold`}
                  >
                    {notifications?.length > 9 ? '9+' : notifications?.length}
                  </div>
                )}

                {item.label == 'Carrinho de Compras' && (
                  <div className="absolute flex justify-center items-center bottom-4 left-3 bg-primary-600 h-[1.125rem] w-[1.125rem] rounded-full text-white text-xs font-bold">
                    {cartSize}
                  </div>
                )}

                {item.label == 'Chat' && (
                  <div className="relative bg-secondary-200 h-[2rem] w-[2rem] rounded-full">
                    <div className="absolute bg-red-400 h-[0.625rem] w-[0.625rem] rounded-full" />
                    <MyIcon
                      name="chat-web"
                      className="absolute top-1.5 left-[0.30rem]"
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
