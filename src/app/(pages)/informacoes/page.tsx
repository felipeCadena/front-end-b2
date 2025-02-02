"use client"

import { MyTabs, TabsList, TabsTrigger } from "@/components/molecules/my-tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import React, { useEffect } from "react";
import Favoritos from "./favoritos";
import useSearchQueryService from "@/services/use-search-query-service";
import Historico from "./historico";
import Agenda from "./agenda";

export default function Informacoes() {
  const [tab, setTab] = React.useState("");
  const { params } = useSearchQueryService();

  useEffect(() => {
    if (params.tab) {
      setTab(params.tab)
    }
  }, [params])

  return (
    <section>
      {tab && <MyTabs defaultValue={tab ?? "favoritos"}>
        <TabsList className="mb-8 grid w-full grid-cols-3">
          <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
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
      </MyTabs>}
    </section>
  );
}
