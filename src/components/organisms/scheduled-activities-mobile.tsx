'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import MyBadge from '../atoms/my-badge';
import StarRating from '../molecules/my-stars';
import MyTypography from '../atoms/my-typography';
import MyIcon from '../atoms/my-icon';
import { getData, handleNameActivity } from '@/utils/formatters';
import MyButton from '../atoms/my-button';
import { useRouter } from 'next/navigation';
import PATHS from '@/utils/paths';
import {
  CustomerSchedule,
  ordersAdventuresService,
} from '@/services/api/orders';
import PopupCancelActivity from './popup-cancel-activity';
import MyCancelScheduleModal from '../molecules/my-cancel-schedule-modal';
import { cn } from '@/utils/cn';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type FullActivitiesHistoricProps = {
  activities: CustomerSchedule[] | undefined;
  withOptions: boolean;
};

type CancelSchedule = {
  orderAdventuresId: string;
  orderScheduleAdventureId: string;
};

export default function ScheduledActivitiesMobile({
  activities,
  withOptions,
}: FullActivitiesHistoricProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showCanceledModal, setShowCanceledModal] = useState(false);
  const [cancelOrder, setCancelOrder] = useState<CancelSchedule | null>(null);
  const queryClient = useQueryClient();

  const handleModal = (
    orderAdventuresId: string,
    orderScheduleAdventureId: string
  ) => {
    setShowModal(true);
    setCancelOrder({ orderAdventuresId, orderScheduleAdventureId });
  };

  const handleClose = () => {
    setCancelOrder(null);
    setShowModal(false);
  };

  const handleCloseSecondModal = () => {
    setCancelOrder(null);
    setShowCanceledModal(false);
  };
  const handleCancelSchedule = async () => {
    if (cancelOrder) {
      try {
        const { orderAdventuresId, orderScheduleAdventureId } = cancelOrder;
        await ordersAdventuresService.cancelSchedule(
          orderAdventuresId,
          orderScheduleAdventureId
        );
        queryClient.invalidateQueries({
          queryKey: ['schedules'],
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.status === 400) {
            handleClose();
            toast.error(error.response?.data.message);
          }
        }
      } finally {
        setCancelOrder(null);
        setShowModal(false);
        setTimeout(() => {
          setShowCanceledModal(true);
        }, 500);
      }
    }
  };

  return (
    <section className="">
      {activities &&
        activities.map((activity, index: number) => (
          <div
            className={cn(
              'flex flex-col gap-4 px-2 my-8',
              activity?.adventureStatus == 'cancelado_pelo_cliente' &&
                'opacity-60 pointer-events-none'
            )}
            key={index}
          >
            <div className="flex justify-around items-center gap-2 cursor-pointer">
              <div className="flex flex-col items-center">
                <MyIcon name="calendar" />
                <MyTypography weight="bold" className="text-primary-600">
                  {getData(activity.schedule.datetime, true).slice(0, 5)}
                </MyTypography>
              </div>
              <div className="flex justify-center gap-2">
                <div
                  className="relative z-10 overflow-hidden min-w-[100px] min-h-[7rem] hover:cursor-pointer rounded-md"
                  onClick={() =>
                    router.push(PATHS.atividadeRealizada(activity.id))
                  }
                >
                  <Image
                    alt="sample_file"
                    src={'/images/atividades/paraquedas.webp'}
                    width={250}
                    height={300}
                    className="w-[100px] h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1 mr-4">
                      <MyBadge
                        className="font-medium text-nowrap p-1"
                        variant="outline"
                      >
                        {handleNameActivity(activity?.adventure?.typeAdventure)}
                      </MyBadge>
                      {activity?.adventureStatus ===
                        'cancelado_pelo_cliente' && (
                        <MyBadge
                          className="font-medium text-nowrap p-1 rounded-lg"
                          variant="error"
                        >
                          Cancelada
                        </MyBadge>
                      )}
                      {withOptions && (
                        <div className="cursor-pointer z-20">
                          <PopupCancelActivity
                            onCancelar={() =>
                              handleModal(
                                String(activity.orderAdventureId),
                                activity.id
                              )
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <MyTypography variant="subtitle3" weight="bold" className="">
                    {activity?.adventure?.title.length > 20
                      ? activity?.adventure?.title.slice(0, 20).trim() + '...'
                      : activity?.adventure?.title}
                  </MyTypography>
                  <MyTypography variant="label" className="pr-2">
                    {activity.adventure.description.slice(0, 60).concat('...')}
                  </MyTypography>
                </div>
              </div>
            </div>
          </div>
        ))}
      <MyCancelScheduleModal
        title="Cancelamento de atividade"
        subtitle="Tem certeza que deseja cancelar essa atividade? Não será possível remarcar na mesma data ou reembolsar o valor pago."
        buttonTitle="Cancelar atividade"
        iconName="cancel"
        open={showModal}
        onClose={handleClose}
        onSubmit={handleCancelSchedule}
      />
      <MyCancelScheduleModal
        title="Atividade cancelada"
        subtitle="A atividade já foi cancelada e em breve seu estorno estará disponível na mesma forma de pagamento realizada."
        buttonTitle="Voltar"
        iconName="warning"
        open={showCanceledModal}
        onClose={handleCloseSecondModal}
        onSubmit={handleCloseSecondModal}
      />
    </section>
  );
}
