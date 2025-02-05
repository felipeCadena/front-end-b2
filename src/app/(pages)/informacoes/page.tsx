"use client";

import { MyTabs, TabsList, TabsTrigger } from "@/components/molecules/my-tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import React, { useEffect } from "react";
import Favoritos from "./favoritos";
import useSearchQueryService from "@/services/use-search-query-service";
import Historico from "./historico";
import Agenda from "./agenda";
import SearchActivity from "@/components/organisms/search-activity";
import GaleriaDeFotos from "./galeria-de-fotos";

export default function Informacoes() {
  const [tab, setTab] = React.useState("");
  const { params, set } = useSearchQueryService();

  useEffect(() => {
    if (params.tab) {
      setTab(params.tab);
    }
  }, [params]);

  return (
    <section>
      <div className="max-sm:hidden md:my-10">
        <SearchActivity />
      </div>

      {tab && (
        <MyTabs 
        defaultValue={tab ?? "favoritos"} 
        onValueChange={(value) => set({ tab: value })}
        className=""
        >
          <TabsList className="mb-8 md:mb-16 grid w-full grid-cols-3 md:grid-cols-4">
            <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
            <TabsTrigger value="galeria" className="max-sm:hidden">Galeria de Fotos</TabsTrigger>
          </TabsList>
          <TabsContent value="favoritos">
            <Favoritos />
          </TabsContent>
          <TabsContent value="historico">
            <Historico />
          </TabsContent>
          <TabsContent value="agenda">
            <Agenda />
          </TabsContent>
          <TabsContent value="galeria" className="max-sm:hidden">
            <GaleriaDeFotos />
          </TabsContent>
        </MyTabs>
      )}
    </section>
  );
}
