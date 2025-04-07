'use client';

import useLogin from '@/app/(pages)/(cliente)/(acesso)/login/login-store';
import { sideBarClient, sideBarPartnet } from '@/common/constants/sideBar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import MyIcon from '../atoms/my-icon';
import useNotifications from '@/store/useNotifications';

export default function SidebarMenuWeb({}) {
  const pathname = usePathname();
  const { email, setSideBarActive, sideBarActive } = useLogin();
  const { unreadNotifications } = useNotifications();

  useEffect(() => {
    if (pathname !== '/' && email.includes('cliente')) {
      setSideBarActive(sideBarClient);
    }

    if (pathname !== '/' && email.includes('parceiro')) {
      setSideBarActive(sideBarPartnet);
    }
  }, []);

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
                    className={`absolute flex justify-center items-center bottom-4 left-3 ${unreadNotifications.length > 0 ? 'bg-red-400 h-[1.125rem]' : 'bg-slate-300 h-[1.125rem]'} w-[1.125rem] rounded-full text-white text-xs font-bold`}
                  >
                    {unreadNotifications?.length > 9
                      ? '9+'
                      : unreadNotifications?.length}
                  </div>
                )}

                {item.label == 'Carrinho de Compras' && (
                  <div className="absolute flex justify-center items-center bottom-4 left-3 bg-primary-600 h-[1.125rem] w-[1.125rem] rounded-full text-white text-xs font-bold">
                    1
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
