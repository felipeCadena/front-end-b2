'use client';

import { activities } from '@/common/constants/mock';
import Activities from '@/components/organisms/activities';
import ActivitiesDetails from '@/components/organisms/activities-details';
import ActivitiesFilter from '@/components/organisms/activities-filter';
import FavoriteActivity from '@/components/organisms/favorite-activity';
import SearchActivity from '@/components/organisms/search-activity';
import { adventures } from '@/services/api/adventures';
import { cn } from '@/utils/cn';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function Favoritos() {
  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => adventures.listFavorites(),
  });

  console.log('FAV', favorites);
  return (
    <section className="mx-auto mb-15 max-sm:max-w-5xl">
      <div className="mx-4 space-y-8 md:space-y-16">
        <div className="md:hidden">{/* <SearchActivity /> */}</div>
        <ActivitiesFilter withoutText />

        {/* <div className="md:hidden">
          <ActivitiesDetails activities={activities} />
        </div> */}

        <div className={cn('grid grid-cols-4 gap-6 max-sm:hidden')}>
          {favorites.map((favorite) => (
            <FavoriteActivity
              activity={favorite.adventure}
              favoriteID={favorite.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
