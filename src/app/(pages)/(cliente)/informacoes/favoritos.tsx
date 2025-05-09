'use client';

import Loading from '@/app/loading';
import MyTypography from '@/components/atoms/my-typography';
import ActivitiesFilter from '@/components/organisms/activities-filter';
import FavoriteActivityMobile from '@/components/organisms/favorite-acitvity-mobile';
import FavoriteActivity from '@/components/organisms/favorite-activity';
import { adventures } from '@/services/api/adventures';
import { cn } from '@/utils/cn';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

export default function Favoritos() {
  const [selected, setSelected] = useState<'ar' | 'terra' | 'mar' | ''>('');
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => adventures.listFavorites(),
  });

  const filteredAdventures = () => {
    const filterFav = favorites.filter(
      (fav) => fav.adventure.typeAdventure === selected
    );
    if (filterFav.length === 0) {
      return (
        <div className="w-full h-[30vh] flex justify-center items-center">
          <MyTypography variant="subtitle3" weight="bold">
            Você não tem favoritos nessa categoria
          </MyTypography>
        </div>
      );
    }

    return filterFav.map((favorite, i) => (
      <>
        <FavoriteActivity
          key={`filterd-${favorite.id}-${i}`}
          activity={favorite.adventure}
          favoriteID={favorite.id}
        />
        <FavoriteActivityMobile
          key={`filtered-${favorite.id}-${i}-mobile`}
          activity={favorite.adventure}
          favoriteID={favorite.id}
        />
      </>
    ));
  };

  return isLoading ? (
    <div className="w-full h-[30vh] flex justify-center items-center mb-16">
      <Loading />
    </div>
  ) : (
    <section className="mx-auto mb-15 max-sm:max-w-5xl">
      <div className="mx-4 space-y-8 md:space-y-16">
        {favorites.length > 0 ? (
          <>
            <ActivitiesFilter
              selected={selected}
              setSelected={setSelected}
              withoutText
            />

            <div
              className={cn(
                selected === ''
                  ? 'md:grid md:grid-cols-4 md:gap-6'
                  : 'md:flex md:w-full'
              )}
            >
              {selected === ''
                ? favorites.map((favorite, i) => (
                    <>
                      <FavoriteActivity
                        key={`${favorite.id}-${i}`}
                        activity={favorite.adventure}
                        favoriteID={favorite.id}
                      />
                      <FavoriteActivityMobile
                        key={`${favorite.id}-${i}-mobile`}
                        activity={favorite.adventure}
                        favoriteID={favorite.id}
                      />
                    </>
                  ))
                : filteredAdventures()}
            </div>
          </>
        ) : (
          <div className="w-full flex justify-center h-[20vh]">
            <MyTypography variant="heading3" weight="bold">
              Você não possui favoritos.
            </MyTypography>
          </div>
        )}
      </div>
    </section>
  );
}
