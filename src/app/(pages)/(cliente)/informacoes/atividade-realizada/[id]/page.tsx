'use client';

import Loading from '@/app/loading';
import NotFound from '@/app/not-found';
import MyBadge from '@/components/atoms/my-badge';
import MyButton from '@/components/atoms/my-button';
import MyIcon from '@/components/atoms/my-icon';
import MyTextarea from '@/components/atoms/my-textarea';
import MyTypography from '@/components/atoms/my-typography';
import MyStarRatingButton from '@/components/molecules/my-star-rating-button';
import { ordersAdventuresService } from '@/services/api/orders';
import { cn } from '@/utils/cn';
import { handleNameActivity } from '@/utils/formatters';
import PATHS from '@/utils/paths';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

export default function AtividadeRealizada() {
  const router = useRouter();
  const [comment, setComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  const { id } = useParams();

  const { data: activity, isLoading } = useQuery({
    queryKey: ['order_schedule'],
    queryFn: () =>
      ordersAdventuresService.getCustomerSchedulesById(id as string),
  });

  const handleChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = target;
    setComment(value);
  };

  const orderAdventureID = activity?.orderAdventure.id.toString();

  const handleSubmitReview = async () => {
    const ratingData = { rating: userRating, comment };
    try {
      const { data } = await ordersAdventuresService.rateAdventure(
        orderAdventureID ? orderAdventureID : '',
        id as string,
        ratingData
      );

      toast.success('Avaliação enviada com sucesso!');
      router.push(PATHS.atividades);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          toast.error('Token inválido ou expirado. Faça login novamente!');
          return;
        }
        toast.error(error.response?.data.message);
        return;
      }
    }
  };

  return isLoading ? (
    <Loading />
  ) : !activity ? (
    <NotFound />
  ) : (
    <section className="mx-4 my-4">
      <div className="flex gap-4 items-center">
        <MyIcon
          name="voltar-black"
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle1" weight="bold" className="">
          Resumo da atividade feita
        </MyTypography>
      </div>
      <div className="md:flex md:gap-4">
        <div
          className="bg-[#F7F7F9] w-full md:w-2/5 h-[440px] rounded-lg mt-4 cursor-pointer"
          onClick={() =>
            router.push(
              PATHS.visualizarAtividade(activity?.adventure?.id as number)
            )
          }
        >
          <Image
            src={
              activity?.adventure.images[0]?.url ??
              `/images/atividades/${activity?.adventure?.typeAdventure}/${activity?.adventure?.typeAdventure}-1.jpeg`
            }
            alt="Imagem da atividade"
            width={342}
            height={100}
            className={cn(
              'w-full h-[250px] object-cover rounded-t-lg',
              activity?.adventure?.typeAdventure.includes('terra')
                ? 'object-top'
                : 'object-bottom'
            )}
          />

          <div className="p-8 flex flex-col gap-2">
            <div>
              <MyBadge variant="outline" className="p-1">
                {handleNameActivity(activity?.adventure?.typeAdventure ?? '')}
              </MyBadge>
            </div>
            <MyTypography variant="subtitle3" weight="bold" className="">
              {activity?.adventure?.title}
            </MyTypography>
            {/* <MyTypography variant="label" className="">
              {activity?.description}
            </MyTypography> */}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:w-3/4">
          <div className="bg-[#F1F0F5] h-[64px] md:w-1/3 rounded-lg mt-4 flex items-center justify-center">
            <MyStarRatingButton
              userRating={userRating}
              setUserRating={setUserRating}
              isMobile={false}
            />
          </div>

          <div className="mt-8 md:mt-4">
            <MyTextarea
              label="Comentários sobre a atividade"
              className=""
              placeholder="Deixe seu comentário"
              rows={6}
              value={comment}
              onChange={handleChange}
            />
            <MyButton
              variant="default"
              borderRadius="squared"
              size="lg"
              className="w-full mt-8"
              onClick={handleSubmitReview}
            >
              Enviar comentário
            </MyButton>
          </div>
        </div>
      </div>

      <div className="md:w-[354px]">
        <MyTypography variant="heading2" weight="bold" className="mt-8">
          Suas fotos da atividade
        </MyTypography>
        <MyTypography variant="subtitle3" weight="regular" lightness={400}>
          Acesse aqui suas fotos dessa atividade
        </MyTypography>
        <div className="p-3 mt-6 bg-[#F1F0F587] border border-primary-600/30 border-opacity-80 rounded-lg shadow-sm hover:bg-gray-100 relative">
          <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>

          <div className="flex items-center gap-1 ml-4" onClick={() => {}}>
            <Image
              alt="sample_file"
              src="/icons/drive.png"
              width={30}
              height={30}
            />
            <MyTypography variant="subtitle3" weight="bold" className="ml-3">
              Fotos dessa Atividade
            </MyTypography>
          </div>
        </div>
        <MyButton
          variant="outline-neutral"
          borderRadius="squared"
          size="lg"
          className="w-full mt-8"
          onClick={() =>
            router.push(
              PATHS.visualizarAtividade(activity?.adventure?.id as number)
            )
          }
        >
          Refazer atividade
        </MyButton>
      </div>
    </section>
  );
}
