'use client';

import MyBadge from '@/components/atoms/my-badge';
import MyIcon from '@/components/atoms/my-icon';
import MyTypography from '@/components/atoms/my-typography';
import StarRating from '@/components/molecules/my-stars';
import { Adventure, adventures } from '@/services/api/adventures';
import { handleNameActivity, selectActivityImage } from '@/utils/formatters';
import PATHS from '@/utils/paths';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';

type FavoriteActivityProps = {
  activity: Adventure;
  favoriteID: string;
};

export default function FavoriteActivity({
  activity,
  favoriteID,
}: FavoriteActivityProps) {
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
    <div
      key={id}
      className="min-w-[70%] md:min-w-[30%] lg:min-w-[20%] flex flex-col gap-1 md:mb-8"
    >
      <div className="relative z-10 overflow-hidden h-[265px] w-full  rounded-md">
        <Link href={PATHS.visualizarAtividade(id)}>
          <Image
            alt="sample_file"
            src={selectActivityImage(activity)}
            width={250}
            height={300}
            className="w-full h-[265px] object-cover"
          />
        </Link>

        <MyIcon
          name="full-heart"
          variant="circled"
          className="absolute top-3 right-3 border-2 hover:cursor-pointer"
          onClick={removeFavorite}
        />
      </div>
      <span className="mt-2">
        <MyBadge variant="outline" className="p-2">
          {handleNameActivity(activity.typeAdventure)}
        </MyBadge>
      </span>
      <div className="flex justify-between items-center">
        <StarRating rating={activity.averageRating} />

        <MyIcon name="shared-muted" className="cursor-pointer mx-2" />
      </div>
      <MyTypography variant="subtitle1" weight="bold" className="">
        {activity.title.slice(0, 23) + '...'}
      </MyTypography>
      <MyTypography variant="body-big" className="">
        {activity.description.slice(0, 25).concat('...')}
      </MyTypography>
    </div>
  );
}
