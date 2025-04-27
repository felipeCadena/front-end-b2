'use client';

import MyIcon from '@/components/atoms/my-icon';
import MySpinner from '@/components/atoms/my-spinner';
import MyTypography from '@/components/atoms/my-typography';
import { notificationsService } from '@/services/api/notifications';
import { cn } from '@/utils/cn';
import { formatDate, getHora } from '@/utils/formatters';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Notificacao() {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: notification, isLoading } = useQuery({
    queryKey: ['notification'],
    queryFn: () => notificationsService.getNotificationById(id as string),
  });

  const notificationHeader =
    notification?.title.split(' dia')[0] ?? 'Carregando...';
  const orderStatus = 'realizada';

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['notifications'] });
  }, []);

  const formatDescription = (statusColor: string) => {
    switch (statusColor) {
      case '#FF7272':
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
      case '#D9D9D9':
        return (
          <div className="flex flex-col gap-4 ml-2 mt-2">
            <MyTypography variant="label" weight="regular">
              {notification?.text}
            </MyTypography>
          </div>
        );
      case '#8DC63F':
        return (
          <div className="flex flex-col gap-4 ml-2 mt-2">
            <p dangerouslySetInnerHTML={{ __html: notification?.text || '' }} />
          </div>
        );
      default:
        return '';
    }
  };

  return (
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

      {isLoading ? (
        <MySpinner />
      ) : (
        <div className="w-full flex justify-center items-center">
          <div
            key={0}
            className={cn(
              'md:w-[60%] flex flex-col gap-3 p-4 mt-4 bg-[#F1F0F5] rounded-lg shadow-sm hover:bg-gray-100 relative',
              orderStatus === 'realizada' && 'opacity-70'
            )}
          >
            <div
              className={cn(
                `absolute inset-y-0 left-0 w-2 rounded-l-lg  border-2 bg-[${notification?.color}]`
              )}
            ></div>

            <MyTypography
              variant="notification"
              weight="semibold"
              className="ml-2 flex gap-2 items-center"
            >
              {formatDate(notification?.updatedAt ?? '') == 'Agora pouco' && (
                <MyIcon name="now" className="" />
              )}
              {formatDate(notification?.createdAt ?? '')}
              {formatDate(notification?.createdAt ?? '') != 'Agora pouco' &&
                `- ${getHora(notification?.createdAt ?? '')}`}
            </MyTypography>
            <MyTypography variant="subtitle3" weight="bold" className="ml-2">
              {notificationHeader}
            </MyTypography>
            <div className="flex justify-start items-center">
              {formatDescription(notification?.color ?? '')}
            </div>
          </div>
        </div>
      )}

      {/* <div
        key={notification?.id}
        className={cn(
          'w-full flex flex-col gap-3 p-4  bg-[#F1F0F5] rounded-lg shadow-sm hover:bg-gray-100 relative',
          orderStatus === 'realizada' && 'opacity-70'
        )}
      >
        <div
          className={cn(
            'absolute inset-y-0 left-0 w-2 rounded-l-lg bg-[#D6D6D6]'
          )}
        ></div>
        <MyTypography variant="subtitle3" weight="semibold" className="ml-2">
          Justificativa de Cancelamento:
        </MyTypography>
        <MyTypography variant="label" weight="regular" className="ml-2 mt-2">
          {notification?.reason}
        </MyTypography>

        <div className="flex gap-2 mt-4">
          <Image
            alt="avatar"
            src={notification?.parceiro?.avatar ?? ''}
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
      </div> */}
    </section>
  );
}
