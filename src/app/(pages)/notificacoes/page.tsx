'use client';

import MyButton from '@/components/atoms/my-button';
import MyIcon from '@/components/atoms/my-icon';
import MyTypography from '@/components/atoms/my-typography';
import {
  Notification,
  notificationsService,
} from '@/services/api/notifications';
import useNotifications from '@/store/useNotifications';

import { cn } from '@/utils/cn';
import {
  formatDate,
  formatNotificationText,
  getData,
  getHora,
  isDateInPast,
} from '@/utils/formatters';
import PATHS from '@/utils/paths';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Notificacoes() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { setStoreNotifications } = useNotifications();

  const session = useSession();

  useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      if (session.data?.user) {
        const userNotifications = await notificationsService.listNotifications({
          limit: 30,
        });
        setStoreNotifications(userNotifications);
        setNotifications(userNotifications);
      }
    },
  });

  const getMonthName = (timestamp: string) => {
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    const date = new Date(timestamp);
    return months[date.getMonth()];
  };

  const groupedNotifications = notifications.reduce<
    Record<string, typeof notifications>
  >((acc, notification) => {
    const monthYear = getMonthName(notification.createdAt); // Exemplo: "Fevereiro"

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
          className="hover:cursor-pointer"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle1" weight="bold" className="">
          Suas notificações
        </MyTypography>
      </div>

      {notifications.length === 0 ? (
        <div className="w-full h-[30vh] flex justify-center items-center">
          <p>Você não possui notificações.</p>
        </div>
      ) : (
        <div className="my-12">
          {Object.entries(groupedNotifications).map(
            ([month, notifications]) => (
              <div key={month} className="space-y-4 my-6">
                <MyTypography
                  variant="body-big"
                  weight="semibold"
                  lightness={500}
                  className="max-sm:hidden"
                >
                  {month}
                </MyTypography>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
                  {notifications.map((notification, index) => (
                    <div
                      key={index}
                      className={cn(
                        'w-full flex flex-col gap-2 px-3 py-2 bg-[#F1F0F5] rounded-lg shadow-sm hover:bg-gray-100 relative cursor-pointer'
                      )}
                      onClick={() =>
                        router.push(
                          PATHS.visualizarNotificacao(notification.id)
                        )
                      }
                    >
                      <div
                        className={cn(
                          'absolute inset-y-0 left-0 w-2 rounded-l-lg',
                          notification.title.includes('Pedido Cancelado')
                            ? 'bg-[#FF7272] opacity-50'
                            : notification.title.includes('Pedido Realizado')
                              ? 'bg-primary-900'
                              : 'bg-[#D6D6D6]'
                        )}
                      />

                      <div className="flex items-center justify-between w-full">
                        <MyTypography
                          variant="notification"
                          weight="semibold"
                          className="ml-1 mt-1 flex gap-2 items-center"
                        >
                          {formatDate(notification.updatedAt) ==
                            'Agora pouco' && <MyIcon name="now" />}
                          {formatDate(notification.updatedAt)}
                          {formatDate(notification.updatedAt) !=
                            'Agora pouco' &&
                            ` - ${getHora(notification.updatedAt)}`}
                        </MyTypography>
                        {formatDate(notification.updatedAt) ==
                          'Agora pouco' && (
                          <MyButton
                            className="ml-1"
                            borderRadius="squared"
                            size="sm"
                            variant="default"
                          >
                            Novo
                          </MyButton>
                        )}
                      </div>

                      <MyTypography
                        variant="label"
                        weight="semibold"
                        className="ml-1 flex justify-between items-center"
                      >
                        {index < 9 ? `0${index + 1}` : index} -{' '}
                        {notification.title.slice(0, 33) + '...'}
                        <MyIcon
                          name={notification.isRead ? 'read' : 'unread'}
                        />
                      </MyTypography>

                      <MyTypography
                        variant="notification"
                        weight="regular"
                        className="ml-1 flex justify-between"
                      >
                        {notification.text.slice(0, 47) + '...'}
                      </MyTypography>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}
