import React, { Dispatch, SetStateAction, useState } from 'react';
import MyIcon from '../atoms/my-icon';
import MyButton from '../atoms/my-button';
import StarRating from '../molecules/my-stars';
import MyBadge from '../atoms/my-badge';
import MyTypography from '../atoms/my-typography';
import Image from 'next/image';
import { getData, handleNameActivity } from '@/utils/formatters';
import Calendar from '../atoms/my-icon/elements/calendar';
import { cn } from '@/utils/cn';
import PATHS from '@/utils/paths';
import { useRouter } from 'next/navigation';
import { CustomerSchedule } from '@/services/api/orders';
import Loading from '@/app/loading';
import MediaPreviewCard from './media-preview-card';
import { useQuery } from '@tanstack/react-query';
import { schedules } from '@/services/api/schedules';
import downloadImagesAsZip from '@/utils/zipPhotos';

type ActivityPhotoGalleryCardType = {
  activity: CustomerSchedule;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
};

const ActivityPhotoGalleryCard = ({
  activity,
  selected,
  setSelected,
}: ActivityPhotoGalleryCardType) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

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

  const handleFetchPhotos = async (id: string, downloadAll?: boolean) => {
    setOpen(!open);
    setSelected(id);
    if (downloadAll && id !== '') {
      if (activityPhotos.length === 0) {
        setOpen(false);
        return;
      }
      try {
        setLoading(true);
        await downloadImagesAsZip(activityPhotos);
      } catch (error) {
        console.error('Erro ao baixar imagens', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDownloadImage = async (imageURL: string, fileTitle: string) => {
    try {
      const response = await fetch(`${imageURL}?download=1`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = fileTitle;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Erro ao baixar imagem', err);
    }
  };
  return (
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
          {getData(activity?.schedule?.datetime)}
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
            router.push(PATHS.visualizarAtividade(activity?.adventure?.id))
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
                  src={activity?.adventure?.partner?.logo.url ?? '/user.png'}
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
                {activity?.adventure?.description.slice(0, 40).concat('...')}
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
              className="px-8 min-w-[200px]"
              size="lg"
              rightIcon={<MyIcon name="download-green" className="" />}
              isLoading={loading}
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

          {activityPhotos.length > 0 ? (
            <div className="grid grid-cols-6 gap-4">
              {activityPhotos.map((media, index) => (
                <MediaPreviewCard
                  media={media}
                  key={index}
                  handleDownloadMedia={handleDownloadImage}
                />
              ))}
            </div>
          ) : (
            <div className="w-full flex justify-center items-center h-[10vh]">
              <Loading />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityPhotoGalleryCard;
