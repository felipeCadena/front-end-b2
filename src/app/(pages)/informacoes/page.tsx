import { MyTabs, TabsList, TabsTrigger } from "@/components/molecules/my-tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import Favoritos from "./favoritos";

export default function Informacoes() {
  return (
    <section>
      <MyTabs defaultValue="favoritos">
        <TabsList className="mb-4 grid w-full grid-cols-3">
          <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
        </TabsList>
        <TabsContent value="favoritos">
            <Favoritos />
        </TabsContent>
        <TabsContent value="historico">Histórico</TabsContent>
        <TabsContent value="agenda">Agenda</TabsContent>
      </MyTabs>
    </section>
  );
}
