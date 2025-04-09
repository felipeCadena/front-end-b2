'use client';

import Image from 'next/image';
import React from 'react';
import MyIcon from '../atoms/my-icon';
import MyBadge from '../atoms/my-badge';
import StarRating from '../molecules/my-stars';
import MyTypography from '../atoms/my-typography';
import { cn } from '@/utils/cn';
import { getData, handleNameActivity, isDateInPast } from '@/utils/formatters';
import MyButton from '../atoms/my-button';
import { useRouter } from 'next/navigation';
import PATHS from '@/utils/paths';
import { Adventure } from '@/services/api/adventures';

type ActivitiesDetailsProps = {
  activities: Adventure[];
  withDate?: boolean;
  type?: string;
  lowRating?: boolean;
};

export default function ActivitiesDetails({
  activities,
  withDate = false,
  type,
  lowRating = false,
}: ActivitiesDetailsProps) {
  const router = useRouter();

  const handleActivity = (id: string) => {
    if (type === 'parceiro') {
      return router.push(PATHS.visualizarAtividadeParceiro(id));
    } else if (type === 'admin') {
      return router.push(`/admin/avaliacoes/atividade/${id}`);
    } else {
      router.push(PATHS.visualizarAtividade(id));
    }
  };

  const selectActivityImage = (activity: Adventure) => {
    if (activity.images.length === 0) {
      return `/images/atividades/${activity.typeAdventure}/${activity.typeAdventure}-1.jpeg`;
    }

    return activity.images[0]?.url;
  };

  return (
    <section className={cn(withDate && 'mx-4 ')}>
      {activities.map((activity: Adventure, index: number) => (
        <div key={index} className={cn('flex flex-col')}>
          <div
            onClick={() => handleActivity(activity.id)}
            className={cn(
              'flex max-sm:max-h-[120px] max-sm:justify-around gap-2 cursor-pointer my-2',
              withDate && 'my-8 relative',
              activity.averageRating <= 2 && 'max-sm:max-h-[160px]'
            )}
          >
            {withDate && (
              <MyIcon
                name="options"
                className="absolute top-0 right-0 cursor-pointer"
              />
            )}
            {/* esperando confirmação da cliente para alterar tipo da activity e englobar reserva */}
            {withDate && (
              <div
                className={cn(
                  'flex flex-col items-center justify-center',
                  isDateInPast(activity.reserva.timestamp) && 'opacity-70'
                )}
              >
                {isDateInPast(activity.reserva.timestamp) ? (
                  <MyIcon name="calendar-opacity" />
                ) : (
                  <MyIcon name="calendar" />
                )}
                <MyTypography
                  variant="body"
                  weight="semibold"
                  className={cn(
                    'text-primary-600',
                    isDateInPast(activity.reserva.timestamp) && 'text-[#c0c0c0]'
                  )}
                >
                  {getData(activity.reserva.timestamp)}
                </MyTypography>
              </div>
            )}
            <div
              className={cn(
                'relative z-10 overflow-hidden w-[6.625rem] h-[6.625rem] hover:cursor-pointer rounded-md flex-shrink-0',
                withDate ? 'w-[7.5rem] h-[7.5rem]' : 'w-[6.625rem] h-[6.625rem]'
              )}
            >
              <Image
                alt="imagem atividade"
                src={selectActivityImage(activity)}
                width={250}
                height={300}
                className={cn(
                  'object-cover',
                  withDate
                    ? 'w-[7.5rem] h-[7.5rem]'
                    : 'w-[6.625rem] h-[6.625rem]'
                )}
              />
            </div>
            <div className="relative">
              <div className="flex gap-1 justify-between mb-1 mr-4">
                <MyBadge
                  className="font-medium flex-shrink-0 w-fit"
                  variant="outline"
                >
                  {handleNameActivity(activity.typeAdventure)}
                </MyBadge>

                {!withDate && <StarRating rating={activity.averageRating} />}
              </div>

              <MyTypography
                variant="subtitle3"
                weight="bold"
                className={cn(withDate ? 'mt-4' : 'mt-2')}
              >
                {activity.title}
              </MyTypography>
              <MyTypography variant="label" className={cn(withDate && 'w-1/2')}>
                {withDate
                  ? activity.description.slice(0, 30).concat('...')
                  : activity.description.slice(0, 50).concat('...')}
              </MyTypography>
              <MyIcon
                name="shared-muted"
                className={cn(
                  'absolute z-50 right-0 top-1/2 cursor-pointer',
                  !withDate && 'hidden'
                )}
              />
            </div>
          </div>
          {lowRating && activity.averageRating <= 2 && (
            <MyButton
              variant="black-border"
              borderRadius="squared"
              size="lg"
              className="w-full mt-3 mb-5 font-bold text-[1rem]"
            >
              Falar com o parceiro
            </MyButton>
          )}
        </div>
      ))}
    </section>
  );
}
