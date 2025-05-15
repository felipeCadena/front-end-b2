'use client';

import { MyTabs, TabsList, TabsTrigger } from '@/components/molecules/my-tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import React, { useState } from 'react';
import SearchActivity from '@/components/organisms/search-activity';
import MyTypography from '@/components/atoms/my-typography';
import { useRouter } from 'next/navigation';
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/my-select';
import { months, states } from '@/common/constants/constants';
import Activities from '@/components/organisms/activities';
import { useQuery } from '@tanstack/react-query';
import { adventures } from '@/services/api/adventures';
import { Pagination } from '@/components/molecules/pagination';
import ActivitiesFilter from '@/components/organisms/activities-filter';
import Loading from '@/app/loading';

type TypeAdventure = 'ar' | 'terra' | 'mar' | '';

export default function AvaliacoesWeb() {
  const router = useRouter();
  const [actFilter, setActFilter] = useState('totalFavorites desc');
  const [typeAdvFilter, setTypeAdvFilter] = useState<TypeAdventure>();
  const [stateFilter, setStateFilter] = useState('RJ');
  const [rateFilter, setRateFilter] = useState('Todos');
  const [page, setPage] = useState(1);

  const { data: activities = [], isLoading } = useQuery({
    queryKey: [actFilter, page, typeAdvFilter, stateFilter, rateFilter],
    queryFn: () =>
      adventures.filterAdventures({
        orderBy: actFilter,
        limit: 4,
        skip: page * 4 - 4,
        typeAdventure: typeAdvFilter,
        state: stateFilter,
        averageRating: rateFilter === 'Todos' ? undefined : rateFilter,
      }),
  });

  const handleChangeTab = (tabFilter: string) => {
    setActFilter(tabFilter);
    setPage(1);
  };

  const handleStateSelect = (state: string) => {
    setStateFilter(state);
    setPage(1);
  };

  const handleRatingSelect = (rate: string) => {
    setRateFilter(rate);
    setPage(1);
  };

  return (
    <main>
      <div className="w-full mt-10 mb-16 flex justify-between gap-10 items-center">
        {/* <SearchActivity /> */}

        <div className="w-1/2 ml-auto gap-8 flex justify-end items-center">
          <MySelect value={stateFilter} onValueChange={handleStateSelect}>
            <SelectTrigger className="rounded-2xl text-[#848A9C] text-xs">
              <SelectValue placeholder="Rio de Janeiro" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              {states.map((state) => (
                <SelectItem key={state.sigla} value={state.sigla}>
                  {state.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </MySelect>

          <MySelect value={rateFilter} onValueChange={handleRatingSelect}>
            <SelectTrigger className="rounded-2xl text-[#848A9C] text-xs">
              <SelectValue placeholder="5 estrelas" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="Todos">Todos</SelectItem>
              <SelectItem value="5">5 estrelas</SelectItem>
              <SelectItem value="4">4 estrelas</SelectItem>
              <SelectItem value="3">3 estrelas</SelectItem>
              <SelectItem value="2">2 estrelas</SelectItem>
              <SelectItem value="1">1 estrela</SelectItem>
              <SelectItem value="0">0 estrelas</SelectItem>
            </SelectContent>
          </MySelect>
        </div>
      </div>
      <ActivitiesFilter
        selected={typeAdvFilter}
        setSelected={setTypeAdvFilter}
      />

      {
        <MyTabs defaultValue="favoritos" className="mb-10">
          <TabsList className="mb-10 grid grid-cols-3">
            <TabsTrigger
              onClick={() => handleChangeTab('totalFavorites desc')}
              value="favoritos"
              className=""
            >
              Favoritos dos clientes
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleChangeTab('qntTotalSales desc')}
              value="procuradas"
            >
              Atividades mais procuradas
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleChangeTab('averageRating asc')}
              value="menor"
            >
              Atividades com menores avaliações
            </TabsTrigger>
          </TabsList>
          <TabsContent value="favoritos">
            {isLoading ? (
              <div className="h-[50vh] flex justify-center items-center">
                <Loading height="[10vh]" />
              </div>
            ) : (
              <div className="space-y-3">
                {activities.length > 0 ? (
                  <>
                    <Activities
                      activities={activities}
                      withoutHeart
                      withoutShared
                      type="admin"
                    />
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
              <div className="space-y-3">
                {activities.length > 0 ? (
                  <>
                    <Activities
                      activities={activities}
                      withoutHeart
                      withoutShared
                      type="admin"
                    />
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
              <div className="space-y-3">
                {activities.length > 0 ? (
                  <>
                    <Activities
                      activities={activities}
                      withoutHeart
                      withoutShared
                      type="admin"
                    />
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
    </main>
  );
}
