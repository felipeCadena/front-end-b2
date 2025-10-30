"use client";

import React, { useState } from "react";
import MyTypography from "@/components/atoms/my-typography";
import ActivitiesDetails from "@/components/organisms/activities-details";
import { useQuery } from "@tanstack/react-query";
import { adventures } from "@/services/api/adventures";
import { MyTabs } from "@/components/molecules/my-tabs";
import { Pagination } from "@/components/molecules/pagination";
import { TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import Loading from "@/app/loading";

type TypeAdventure = "ar" | "terra" | "mar" | "";

export default function AvaliacoesMobile() {
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

  return (
    <section className="space-y-8 my-6 px-4">
      {
        <MyTabs defaultValue="favoritos" className="mb-10">
          <TabsList className="mb-10 grid grid-cols-3">
            <TabsTrigger
              value="favoritos"
              onClick={() => setActiveTab("favoritos")}
            >
              <MyTypography
                weight="bold"
                variant="label"
                className={`${activeTab === "favoritos" ? "underline" : "text-[#d9d9d9]"}`}
              >
                Favoritos
              </MyTypography>
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setActiveTab("procuradas")}
              value="procuradas"
            >
              <MyTypography
                weight="bold"
                variant="label"
                className={`${activeTab === "procuradas" ? "underline" : "text-[#d9d9d9]"}`}
              >
                Mais procuradas
              </MyTypography>
            </TabsTrigger>
            <TabsTrigger value="menor" onClick={() => setActiveTab("menor")}>
              <MyTypography
                weight="bold"
                variant="label"
                className={`${activeTab === "menor" ? "underline" : "text-[#d9d9d9]"}`}
              >
                Avaliação baixa
              </MyTypography>
            </TabsTrigger>
          </TabsList>
          <ActivitiesFilter
            withoutText
            selected={typeAdvFilter}
            setSelected={setTypeAdvFilter}
          />
          <TabsContent value="favoritos">
            {loadingFavoritos ? (
              <div className="h-[50vh] flex justify-center items-center">
                <Loading height="[10vh]" />
              </div>
            ) : (
              <div className="space-y-3 mt-8">
                {activitiesFavoritos.length > 0 ? (
                  <>
                    <ActivitiesDetails
                      activities={activitiesFavoritos}
                      type="admin"
                    />

                    <Pagination
                      data={activitiesFavoritos}
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
            {loadingMenor ? (
              <div className="h-[50vh] flex justify-center items-center">
                <Loading height="[10vh]" />
              </div>
            ) : (
              <div className="space-y-3 mt-8">
                {activitiesProcuradas.length > 0 ? (
                  <>
                    <ActivitiesDetails
                      activities={activitiesProcuradas}
                      type="admin"
                    />
                    <Pagination
                      data={activitiesProcuradas}
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
            {loadingMenor ? (
              <div className="h-[50vh] flex justify-center items-center">
                <Loading height="[10vh]" />
              </div>
            ) : (
              <div className="space-y-3 mt-8">
                {activitiesMenor.length > 0 ? (
                  <>
                    <ActivitiesDetails
                      activities={activitiesMenor}
                      type="admin"
                    />
                    <Pagination
                      data={activitiesMenor}
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
