'use client';

import MyButton from '@/components/atoms/my-button';
import MyIcon from '@/components/atoms/my-icon';
import DownloadGreen from '@/components/atoms/my-icon/elements/download-green';
import MyTypography from '@/components/atoms/my-typography';
import { adventures } from '@/services/api/adventures';
import { Media, schedules } from '@/services/api/schedules';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import handleDownloadImage from '@/utils/downloadImage';
import downloadImagesAsZip from '@/utils/zipPhotos';
import MySpinner from '@/components/atoms/my-spinner';
import MediaPreviewCard from '@/components/organisms/media-preview-card';
import Loading from '@/app/loading';

export default function Atividade() {
  const [loadingMedia, setLoadingMedia] = useState(false);
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const scheduleId = searchParams.get('sch');

  const { data: scheduleMedias = [], isLoading } = useQuery({
    queryKey: ['schedule_media'],
    queryFn: async () => schedules.getScheduleMedias(scheduleId as string),
  });

  const { data: adventure = { images: [] }, isLoading: loadingActivity } =
    useQuery({
      queryKey: ['activity'],
      queryFn: () => adventures.getAdventureById(Number(id)),
    });

  const mediaFiles = useMemo(() => {
    return [
      ...scheduleMedias.map((medias) => ({ url: medias.url })),
      ...adventure?.images?.map((image) => ({ url: image.url })),
    ];
  }, [scheduleMedias, adventure]);

  const handleDownLoadZipFile = async () => {
    setLoadingMedia(true);
    if (mediaFiles.length > 0) {
      await downloadImagesAsZip(mediaFiles as Media[]);
    }

    setLoadingMedia(false);
  };

  return (
    <main className="px-4 space-y-8 md:space-y-12 my-8">
      <div className="flex items-center gap-3 bg-white">
        <MyIcon
          name="voltar-black"
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle2" weight="bold">
          Fotos da atividade
        </MyTypography>
      </div>

      {isLoading || loadingMedia ? (
        <div className="w-full">
          <Loading />
        </div>
      ) : (
        <>
          <MyButton
            variant="default"
            className="w-full md:w-1/3"
            borderRadius="squared"
            size="lg"
            onClick={handleDownLoadZipFile}
          >
            {loadingMedia ? <MySpinner /> : 'Baixar todas'}
          </MyButton>

          <div>
            <MyTypography variant="subtitle3" weight="bold">
              Fotos da atividade
            </MyTypography>

            <div className="md:w-2/3 grid grid-cols-3 gap-4 md:gap-1 items-center">
              {adventure &&
                adventure.images?.map((file, index) => (
                  <div
                    key={file?.id}
                    className="relative w-[100px] md:w-[200px] mt-4"
                  >
                    <Image
                      width={100}
                      height={100}
                      src={file?.url}
                      alt={file.title ?? 'foto do passeio'}
                      className="w-[100px] md:w-[200px] h-[100px] md:h-[200px] rounded-md object-cover"
                    />
                    <MyTypography
                      weight="bold"
                      className="absolute top-1 left-1 bg-white w-6 h-6 rounded-full flex items-center justify-center text-xs text-primary-600"
                    >
                      {index + 1}
                    </MyTypography>
                    <div className="absolute flex items-center justify-center w-6 h-6 top-1 right-1 cursor-pointer bg-white rounded-full">
                      <DownloadGreen
                        width="18"
                        height="18"
                        onClick={() =>
                          handleDownloadImage(file.url, `media-${index}`)
                        }
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <MyTypography variant="subtitle3" weight="bold">
              Fotos do passeio
            </MyTypography>

            <div className="md:w-4/5 grid grid-cols-3 md:grid-cols-4 gap-4 items-center">
              {scheduleMedias &&
                scheduleMedias.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-[100px] md:w-[200px] mt-4"
                  >
                    {file.mimetype !== 'video/mp4' ? (
                      <Image
                        width={100}
                        height={100}
                        src={file.url}
                        alt={file.title ?? 'foto do passeio'}
                        className="w-[100px] md:w-[200px] h-[100px] md:h-[200px]  rounded-md object-cover"
                      />
                    ) : (
                      <video
                        src={file?.url}
                        className="h-[200px] w-[200px] rounded-lg object-cover"
                        controls
                      />
                    )}
                    <MyTypography
                      weight="bold"
                      className="absolute top-1 left-1 bg-white w-6 h-6 rounded-full flex items-center justify-center text-xs text-primary-600"
                    >
                      {index + 1}
                    </MyTypography>

                    <div className="absolute flex items-center justify-center w-6 h-6 top-1 right-1 cursor-pointer bg-white rounded-full">
                      <DownloadGreen
                        width="18"
                        height="18"
                        onClick={() =>
                          handleDownloadImage(file.url, `media-${index}`)
                        }
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
