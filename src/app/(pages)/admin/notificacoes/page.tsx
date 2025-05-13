'use client';

import Loading from '@/app/loading';
import MyButton from '@/components/atoms/my-button';
import MyIcon from '@/components/atoms/my-icon';
import MyTypography from '@/components/atoms/my-typography';
import { adminService } from '@/services/api/admin';
import useNotifications from '@/store/useNotifications';

import { cn } from '@/utils/cn';
import { formatDate, getHora } from '@/utils/formatters';
import PATHS from '@/utils/paths';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Notificacoes() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const { notifications, setStoreNotifications } = useNotifications();

  const session = useSession();

  const { isLoading } = useQuery({
    queryKey: ['adminNotifications', page],
    queryFn: async () => {
      if (session.data?.user) {
        const userNotifications = await adminService.listNotifications({
          limit: 12,
          skip: page * 12 - 12,
        });
        setStoreNotifications(userNotifications);

        return userNotifications;
      }

      return [];
    },
  });

  const handlePage = (pg: number) => {
    setPage(pg);
  };

  const renderPageButtons = (pages: number) => {
    const withContinue = (
      <div className="flex items-center justify-center">
        <MyButton
          onClick={() => handlePage(page - 1)}
          variant="ghost"
          disabled={page === 1}
        >
          <MyIcon name="left" className={`${page === 1 ? 'hidden' : ''}`} />
        </MyButton>

        <MyButton
          variant="ghost"
          className={`text-primary-600 text-lg ${page === 1 ? 'ml-6' : ''}`}
          onClick={() => handlePage(pages)}
          key={page}
        >
          {page}
        </MyButton>

        <MyButton
          disabled={notifications.length < 12}
          onClick={() => handlePage(page + 1)}
          variant="ghost"
        >
          <MyIcon
            className={`${notifications.length < 12 ? 'hidden' : ''}`}
            name="right"
          />
        </MyButton>
      </div>
    );

    return withContinue;
  };

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['adminNotifications'],
    });
  }, []);

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

  return isLoading ? (
    <div className="w-full h-[30vh] flex justify-center items-center">
      <Loading />
    </div>
  ) : (
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
        <>
          <div className="my-12 min-h-[300px] md:min-h-[505px]">
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
                            PATHS.visualizarNotificacaoAdmin(notification.id)
                          )
                        }
                      >
                        <div
                          className={`absolute inset-y-0 left-0 w-2 rounded-l-lg bg-[${notification.color}]`}
                          style={{ backgroundColor: notification.color }}
                        />

                        <div className="flex items-center justify-between w-full">
                          <MyTypography
                            variant="notification"
                            weight="semibold"
                            className="ml-1 mt-1 flex gap-2 items-center"
                          >
                            {formatDate(notification.createdAt) ==
                              'Agora pouco' && <MyIcon name="now" />}
                            {formatDate(notification.createdAt)}
                            {formatDate(notification.createdAt) !=
                              'Agora pouco' &&
                              ` - ${getHora(notification.createdAt)}`}
                          </MyTypography>
                          {formatDate(notification.createdAt) ==
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
                          {page * 12 - 12 + index < 9
                            ? `0${page * 12 - 12 + index + 1}`
                            : page * 12 - 12 + index + 1}{' '}
                          -{' '}
                          {notification?.title?.length > 33
                            ? notification.title.slice(0, 33) + '...'
                            : notification.title}
                        </MyTypography>

                        <MyTypography
                          variant="notification"
                          weight="regular"
                          className="ml-1 flex justify-between"
                        >
                          {notification.text?.slice(0, 40) + '...'}
                          <MyIcon
                            name={notification.isRead ? 'read' : 'unread'}
                          />
                        </MyTypography>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
          <div className="flex w-full justify-center items-center my-16">
            {renderPageButtons(notifications.length)}
          </div>
        </>
      )}
    </section>
  );
}
