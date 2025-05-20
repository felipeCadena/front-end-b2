'use client';

import Image from 'next/image';
import React from 'react';
import MyBadge from '../atoms/my-badge';
import StarRating from '../molecules/my-stars';
import MyTypography from '../atoms/my-typography';
import { handleNameActivity } from '@/utils/formatters';

import { useRouter } from 'next/navigation';
import PATHS from '@/utils/paths';

import { cn } from '@/utils/cn';
import { Adventure, adventures } from '@/services/api/adventures';
import MyIcon from '../atoms/my-icon';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import FullHeart from '../atoms/my-icon/elements/full-heart';
import MyButton from '../atoms/my-button';
import MobileFullHeart from '../atoms/my-icon/mobile-full-heart';

type FavoriteActivityMobileProps = {
  activity: Adventure;
  favoriteID: string;
};

export default function FavoriteActivityMobile({
  activity,
  favoriteID,
}: FavoriteActivityMobileProps) {
  const router = useRouter();

  const id = activity.id.toString();

  const query = useQueryClient();

  const removeFavorite = async () => {
    try {
      await adventures.removeFavorite(id, favoriteID);
      query.invalidateQueries();
      toast.success('Atividade removida dos favoritos!');
    } catch (error) {
      console.error('Falha ao remover dos favoritos');
    }
  };

  return (
    <section className="md:hidden">
      <div className={cn('flex flex-col gap-4 my-8')}>
        <div className="flex justify-around items-center gap-2 cursor-pointer">
          <div className="flex justify-center gap-2">
            <div className="relative z-10 overflow-hidden min-w-[100px] min-h-[7rem] hover:cursor-pointer rounded-md">
              <Image
                alt="sample_file"
                src={'/images/atividades/paraquedas.webp'}
                width={250}
                height={300}
                className="w-[100px] h-full object-cover"
                onClick={() =>
                  router.push(PATHS.visualizarAtividade(activity.id))
                }
              />
              <MyIcon
                name="mobile-full-heart"
                className="absolute top-1 right-1 hover:cursor-pointer"
                onClick={removeFavorite}
              />
            </div>
            <div className="flex flex-col justify-start">
              <div>
                <div className="w-full flex items-center justify-between gap-1 mb-1">
                  <MyBadge
                    className="font-medium text-nowrap p-1"
                    variant="outline"
                  >
                    {handleNameActivity(activity?.typeAdventure)}
                  </MyBadge>
                  <StarRating rating={activity.averageRating} />
                </div>
              </div>

              <MyTypography variant="subtitle3" weight="bold">
                {activity?.title.length > 20
                  ? activity?.title.slice(0, 20).trim() + '...'
                  : activity?.title}
              </MyTypography>
              <MyTypography variant="label" className="pr-4">
                {activity.description.slice(0, 60).concat('...')}
              </MyTypography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
