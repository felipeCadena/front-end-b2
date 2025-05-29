"use client";

import { MyTabs, TabsList, TabsTrigger } from "@/components/molecules/my-tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import React, { useState } from "react";
import SearchActivity from "@/components/organisms/search-activity";
import MyTypography from "@/components/atoms/my-typography";
import { useRouter } from "next/navigation";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import { months, states } from "@/common/constants/constants";
import Activities from "@/components/organisms/activities";
import { useQuery } from "@tanstack/react-query";
import { adventures } from "@/services/api/adventures";
import { Pagination } from "@/components/molecules/pagination";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import Loading from "@/app/loading";

type TypeAdventure = "ar" | "terra" | "mar" | "";

export default function AvaliacoesWeb() {
  const router = useRouter();
  const [actFilter, setActFilter] = useState("favoritos");
  const [typeAdvFilter, setTypeAdvFilter] = useState<TypeAdventure>("");
  const [stateFilter, setStateFilter] = useState("RJ");
  const [rateFilter, setRateFilter] = useState("Todos");
  const [page, setPage] = useState(1);

  const [activeTab, setActiveTab] = useState<TabKey>("favoritos");
  const [pageMap, setPageMap] = useState<Record<TabKey, number>>({
    favoritos: 1,
    procuradas: 1,
    menor: 1,
  });

  const tabFilters = {
    favoritos: "totalFavorites desc",
    procuradas: "qntTotalSales desc",
    menor: "averageRating asc",
  } as const;

  type TabKey = keyof typeof tabFilters;

  const { data: activitiesFavoritos = [], isLoading: loadingFavoritos } =
    useQuery({
      queryKey: [
        "favoritos",
        pageMap.favoritos,
        typeAdvFilter,
        stateFilter,
        rateFilter,
      ],
      queryFn: () =>
        adventures.filterAdventures({
          orderBy: tabFilters.favoritos,
          limit: 8,
          skip: pageMap.favoritos * 8 - 8,
          typeAdventure: typeAdvFilter || undefined,
          state: stateFilter,
          averageRating: rateFilter === "Todos" ? undefined : rateFilter,
        }),
      enabled: activeTab === "favoritos",
    });

  const { data: activitiesProcuradas = [], isLoading: loadingProcuradas } =
    useQuery({
      queryKey: [
        "procuradas",
        pageMap.procuradas,
        typeAdvFilter,
        stateFilter,
        rateFilter,
      ],
      queryFn: () =>
        adventures.filterAdventures({
          orderBy: tabFilters.procuradas,
          limit: 8,
          skip: pageMap.procuradas * 8 - 8,
          typeAdventure: typeAdvFilter || undefined,
          state: stateFilter,
          averageRating: rateFilter === "Todos" ? undefined : rateFilter,
        }),
      enabled: activeTab === "procuradas",
    });

  const { data: activitiesMenor = [], isLoading: loadingMenor } = useQuery({
    queryKey: ["menor", pageMap.menor, typeAdvFilter, stateFilter, rateFilter],
    queryFn: () =>
      adventures.filterAdventures({
        orderBy: tabFilters.menor,
        limit: 8,
        skip: pageMap.menor * 8 - 8,
        typeAdventure: typeAdvFilter || undefined,
        state: stateFilter,
        averageRating: rateFilter === "Todos" ? undefined : rateFilter,
      }),
    enabled: activeTab === "menor",
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
              value="favoritos"
              onClick={() => setActiveTab("favoritos")}
            >
              Favoritos dos clientes
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setActiveTab("procuradas")}
              value="procuradas"
            >
              Atividades mais procuradas
            </TabsTrigger>
            <TabsTrigger value="menor" onClick={() => setActiveTab("menor")}>
              Atividades com menores avaliações
            </TabsTrigger>
          </TabsList>
          <TabsContent value="favoritos">
            {loadingFavoritos ? (
              <div className="h-[50vh] flex justify-center items-center">
                <Loading height="[10vh]" />
              </div>
            ) : (
              <div className="space-y-3">
                {activitiesFavoritos.length > 0 ? (
                  <>
                    <Activities
                      activities={activitiesFavoritos}
                      withoutHeart
                      withoutShared
                      type="admin"
                    />
                    <Pagination
                      data={activitiesFavoritos}
                      page={page}
                      setPage={setPage}
                      limit={8}
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
            {loadingProcuradas ? (
              <div className="h-[50vh] flex justify-center items-center">
                <Loading height="[10vh]" />
              </div>
            ) : (
              <div className="space-y-3">
                {activitiesProcuradas.length > 0 ? (
                  <>
                    <Activities
                      activities={activitiesProcuradas}
                      withoutHeart
                      withoutShared
                      type="admin"
                    />
                    <Pagination
                      data={activitiesProcuradas}
                      page={page}
                      setPage={setPage}
                      limit={8}
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
            {loadingMenor ? (
              <div className="h-[50vh] flex justify-center items-center">
                <Loading height="[10vh]" />
              </div>
            ) : (
              <div className="space-y-3">
                {activitiesMenor.length > 0 ? (
                  <>
                    <Activities
                      activities={activitiesMenor}
                      withoutHeart
                      withoutShared
                      type="admin"
                    />
                    <Pagination
                      data={activitiesMenor}
                      page={page}
                      setPage={setPage}
                      limit={8}
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
