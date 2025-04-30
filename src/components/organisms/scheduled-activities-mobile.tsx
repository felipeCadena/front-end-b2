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
  const [cancelOrder, setCancelOrder] = useState<CancelSchedule | null>(null);

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

  const handleCancelSchedule = async () => {
    if (cancelOrder) {
      const { orderAdventuresId, orderScheduleAdventureId } = cancelOrder;
      console.log(
        `/ordersAdventures/${orderAdventuresId}/orderSchedule/${orderScheduleAdventureId}/cancel`
      );
      const response = await ordersAdventuresService.cancelSchedule(
        orderAdventuresId,
        orderScheduleAdventureId
      );
      console.log(response);
      setCancelOrder(null);
    }
  };

  return (
    <section className="">
      {activities &&
        activities.map((activity, index: number) => (
          <div className="flex flex-col gap-4 px-2 mt-8 mb-16" key={index}>
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
                      {withOptions && (
                        <div className="cursor-pointer z-20">
                          <PopupCancelActivity
                            onCancelar={() =>
                              handleModal(activity.id, activity.scheduleId)
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
        open={showModal}
        onClose={handleClose}
        onSubmit={handleCancelSchedule}
      />
    </section>
  );
}
