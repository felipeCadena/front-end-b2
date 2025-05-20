'use client';

import React, { useState } from 'react';
import MyTypography from '@/components/atoms/my-typography';
import ActivitiesDetails from '@/components/organisms/activities-details';
import { useQuery } from '@tanstack/react-query';
import { adventures } from '@/services/api/adventures';
import { MyTabs } from '@/components/molecules/my-tabs';
import { Pagination } from '@/components/molecules/pagination';
import { TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import ActivitiesFilter from '@/components/organisms/activities-filter';
import Loading from '@/app/loading';

type TypeAdventure = 'ar' | 'terra' | 'mar' | '';

export default function AvaliacoesMobile() {
  const [actFilter, setActFilter] = useState('totalFavorites desc');
  const [typeAdvFilter, setTypeAdvFilter] = useState<TypeAdventure>();

  const [page, setPage] = useState(1);

  const { data: activities = [], isLoading } = useQuery({
    queryKey: [actFilter, page, typeAdvFilter],
    queryFn: () =>
      adventures.filterAdventures({
        orderBy: actFilter,
        typeAdventure: typeAdvFilter,
        limit: 4,
        skip: page * 4 - 4,
      }),
  });

  const handleChangeTab = (tabFilter: string) => {
    setActFilter(tabFilter);
    setPage(1);
  };

  return (
    <section className="space-y-8 my-6 px-4">
      {
        <MyTabs defaultValue="favoritos" className="mb-10">
          <TabsList className="mb-10 flex justify-between items-center ">
            <TabsTrigger
              onClick={() => handleChangeTab('totalFavorites desc')}
              value="favoritos"
              className={`${actFilter === 'totalFavorites desc' ? 'underline' : 'text-[#d9d9d9]'}`}
            >
              <MyTypography
                weight="bold"
                variant="label"
                className={`${actFilter === 'totalFavorites desc' ? 'underline' : 'text-[#d9d9d9]'}`}
              >
                Favoritos
              </MyTypography>
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleChangeTab('qntTotalSales desc')}
              value="procuradas"
            >
              <MyTypography
                weight="bold"
                variant="label"
                className={`${actFilter === 'qntTotalSales desc' ? 'underline' : 'text-[#d9d9d9]'}`}
              >
                Mais procuradas
              </MyTypography>
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleChangeTab('averageRating asc')}
              value="menor"
            >
              <MyTypography
                weight="bold"
                variant="label"
                className={`${actFilter === 'averageRating asc' ? 'underline' : 'text-[#d9d9d9]'}`}
              >
                Menor avaliadas
              </MyTypography>
            </TabsTrigger>
          </TabsList>
          <ActivitiesFilter
            withoutText
            selected={typeAdvFilter}
            setSelected={setTypeAdvFilter}
          />
          <TabsContent value="favoritos">
            {isLoading ? (
              <div className="h-[50vh] flex justify-center items-center">
                <Loading height="[10vh]" />
              </div>
            ) : (
              <div className="space-y-3 mt-8">
                {activities.length > 0 ? (
                  <>
                    <ActivitiesDetails activities={activities} type="admin" />

                    <Pagination
                      data={activities}
                      page={page}
                      setPage={setPage}
                      limit={4}
                    />
                  </>
                ) : (
                  <div className="w-full flex justify-center items-center h-[30vh]">
                    <MyTypography variant="subtitle3" weight="bold">
                      Atividade não encontrada
                    </MyTypography>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          <TabsContent value="procuradas">
            {isLoading ? (
              <div className="h-[50vh] flex justify-center items-center">
                <Loading height="[10vh]" />
              </div>
            ) : (
              <div className="space-y-3 mt-8">
                {activities.length > 0 ? (
                  <>
                    <ActivitiesDetails activities={activities} type="admin" />
                    <Pagination
                      data={activities}
                      page={page}
                      setPage={setPage}
                      limit={4}
                    />
                  </>
                ) : (
                  <div className="w-full flex justify-center items-center h-[30vh]">
                    <MyTypography variant="subtitle3" weight="bold">
                      Atividade não encontrada
                    </MyTypography>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          <TabsContent value="menor">
            {isLoading ? (
              <div className="h-[50vh] flex justify-center items-center">
                <Loading height="[10vh]" />
              </div>
            ) : (
              <div className="space-y-3 mt-8">
                {activities.length > 0 ? (
                  <>
                    <ActivitiesDetails activities={activities} type="admin" />
                    <Pagination
                      data={activities}
                      page={page}
                      setPage={setPage}
                      limit={4}
                    />
                  </>
                ) : (
                  <div className="w-full flex justify-center items-center h-[30vh]">
                    <MyTypography variant="subtitle3" weight="bold">
                      Atividade não encontrada
                    </MyTypography>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </MyTabs>
      }
    </section>
  );
}
