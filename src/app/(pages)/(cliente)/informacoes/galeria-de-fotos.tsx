'use client';

import Loading from '@/app/loading';
import MyBadge from '@/components/atoms/my-badge';
import MyButton from '@/components/atoms/my-button';
import MyIcon from '@/components/atoms/my-icon';
import Calendar from '@/components/atoms/my-icon/elements/calendar';
import MyTypography from '@/components/atoms/my-typography';
import StarRating from '@/components/molecules/my-stars';
import { ordersAdventuresService } from '@/services/api/orders';
import { schedules } from '@/services/api/schedules';
import { cn } from '@/utils/cn';
import { getData, handleNameActivity } from '@/utils/formatters';
import PATHS from '@/utils/paths';
import downloadImagesAsZip from '@/utils/zipPhotos';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function GaleriaDeFotos() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState('');
  const router = useRouter();

  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: () =>
      ordersAdventuresService.getCustomerSchedules({
        adventureStatus: 'realizado',
      }),
  });

  const { data: activityPhotos = [], isLoading: isLoadingPhotos } = useQuery({
    queryKey: ['activity_photos', selected],
    queryFn: async () => {
      if (selected !== '') {
        const response = await schedules.getScheduleMedias(selected);
        return response;
      }

      return [];
    },
  });

  console.log(activityPhotos);

  const handleDownloadImage = async (imageURL: string, fileTitle: string) => {
    const response = await fetch(imageURL);
    console.log('res', response);
  };
  const handleFetchPhotos = (id: string, downloadAll?: boolean) => {
    setOpen(!open);
    setSelected(id);
    if (downloadAll && id !== '') {
      if (activityPhotos.length === 0) {
        setOpen(false);
        return;
      }
      downloadImagesAsZip(activityPhotos);
    }
  };

  return isLoading ? (
    <div className="w-full h-[30vh] flex justify-center items-center mb-16">
      <Loading />
    </div>
  ) : (
    <section className="space-y-12 mb-10">
      {activities && activities.length > 0 ? (
        activities.map((activity) => (
          <div key={activity?.id} className="flex md:flex-col gap-4">
            <div className="border border-gray-300 rounded-lg h-[220px] flex items-center gap-5 p-4 overflow-hidden">
              <MyButton
                variant={'secondary-text'}
                borderRadius="squared"
                size={'md'}
                className={cn('flex flex-col gap-1 text-base')}
              >
                <div>
                  <Calendar width={30} height={30} />
                </div>
                {getData('2025-03-12T08:00:00')}
              </MyButton>
              <Image
                src={
                  activity?.adventure.images[0].url ??
                  '/images/atividades/cachoeira.webp'
                }
                alt={activity?.adventure.title}
                width={300}
                height={300}
                className="h-[186px] w-[186px] rounded-lg object-cover cursor-pointer"
                onClick={() =>
                  router.push(
                    PATHS.visualizarAtividade(activity?.adventure?.id)
                  )
                }
              />
              <div className="w-full flex justify-between items-center gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    <MyTypography variant="body-big" weight="bold">
                      {activity?.adventure?.title}
                    </MyTypography>
                    <div className="flex gap-2 items-center max-sm:hidden">
                      <Image
                        alt="avatar"
                        src={
                          activity?.adventure?.partner?.logo.url ?? '/user.png'
                        }
                        width={10}
                        height={10}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <MyTypography variant="button" weight="semibold">
                          {activity?.adventure?.partner?.fantasyName}
                        </MyTypography>
                        <MyTypography
                          variant="button"
                          weight="regular"
                          lightness={400}
                        >
                          Parceiro e Guia de atividades
                        </MyTypography>
                      </div>
                    </div>
                    <MyTypography variant="body-big" weight="regular">
                      {activity?.adventure?.description
                        .slice(0, 40)
                        .concat('...')}
                    </MyTypography>
                    <div className="flex gap-2">
                      <MyBadge variant="outline" className="p-2">
                        {handleNameActivity(activity?.adventure?.typeAdventure)}
                      </MyBadge>
                      <StarRating rating={activity?.adventure?.averageRating} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MyButton
                    variant="message"
                    borderRadius="squared"
                    className="px-[4rem]"
                    size="lg"
                    rightIcon={<MyIcon name="white-eye" className="" />}
                    onClick={() => handleFetchPhotos(activity.scheduleId)}
                  >
                    Ver fotos
                  </MyButton>
                  <MyButton
                    variant="secondary"
                    borderRadius="squared"
                    className="px-8"
                    size="lg"
                    rightIcon={<MyIcon name="download-green" className="" />}
                    onClick={() => handleFetchPhotos(activity.scheduleId, true)}
                  >
                    Baixar Imagens
                  </MyButton>
                </div>
              </div>
            </div>
            {activity.scheduleId === selected && (
              <div
                className={cn(
                  'mt-4 flex flex-col justify-center items-center space-y-4',
                  !open && 'hidden'
                )}
              >
                <MyIcon
                  name="chevron-down-green"
                  className="mt-2 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
                {isLoadingPhotos ? (
                  <Loading />
                ) : (
                  <div className="grid grid-cols-6 gap-4">
                    {activityPhotos.map((photo, index) => (
                      <div className="relative group" key={index}>
                        <Image
                          src={photo?.url}
                          alt={photo?.title ?? 'Foto da atividade'}
                          width={300}
                          height={300}
                          className="h-[168px] w-[168px] rounded-lg object-cover"
                        />

                        <a href={photo.url} download={photo.title}>
                          <MyIcon
                            name="download-green"
                            className="absolute top-2 right-2 bg-white p-2 rounded-lg  group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                            // onClick={() =>
                            //   handleDownloadImage(
                            //     photo.url,
                            //     photo.title as string
                            //   )
                            // }
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="w-full flex justify-center items-center h-[100%] md:h-[30vh]">
          <MyTypography variant="subtitle3" weight="bold">
            Você ainda não possui atividades realizadas
          </MyTypography>
        </div>
      )}
    </section>
  );
}
