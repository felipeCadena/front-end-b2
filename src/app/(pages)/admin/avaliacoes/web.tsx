"use client";

import { MyTabs, TabsList, TabsTrigger } from "@/components/molecules/my-tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import SearchActivity from "@/components/organisms/search-activity";
import PartnerPaymentCard from "@/components/molecules/partner-payment";
import MyTypography from "@/components/atoms/my-typography";
import PartnerApprovalCard from "@/components/molecules/partner-approval";
import MyButton from "@/components/atoms/my-button";
import { useRouter } from "next/navigation";
import ActivityStatusCard from "@/components/molecules/activity-status";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import { months, states } from "@/common/constants/constants";
import CarouselCustom from "@/components/templates/second-section/carousel-custom";
import { activities } from "@/common/constants/mock";
import Activities from "@/components/organisms/activities";

export default function AvaliacoesWeb() {
  const router = useRouter();

  return (
    <main>
      <div className="w-full mt-10 mb-16 flex justify-between gap-10 items-center">
        <SearchActivity />

        <div className="w-1/2 grid grid-cols-3 gap-4 ml-auto">
          <MySelect
            //   value={}
            //   onValueChange={}
            value="Rio de Janeiro"
          >
            <SelectTrigger className="rounded-2xl text-[#848A9C] text-xs">
              <SelectValue placeholder="Rio de Janeiro" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              {states.map((state) => (
                <SelectItem key={state.sigla} value={state.nome}>
                  {state.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </MySelect>

          <MySelect
            //   value={}
            //   onValueChange={}
            value="Janeiro"
          >
            <SelectTrigger className="rounded-2xl text-[#848A9C] text-xs">
              <SelectValue placeholder="Janeiro" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              {months.map((month) => (
                <SelectItem key={month.numero} value={month.nome}>
                  {month.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </MySelect>

          <MySelect
            //   value={}
            //   onValueChange={}
            value="5"
          >
            <SelectTrigger className="rounded-2xl text-[#848A9C] text-xs">
              <SelectValue placeholder="5 estrelas" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="5">5 estrelas</SelectItem>
              <SelectItem value="4">4 estrelas</SelectItem>
              <SelectItem value="3">3 estrelas</SelectItem>
              <SelectItem value="2">2 estrelas</SelectItem>
              <SelectItem value="1">1 estrela</SelectItem>
            </SelectContent>
          </MySelect>
        </div>
      </div>

      {
        <MyTabs defaultValue="favoritos" className="mb-10">
          <TabsList className="mb-10 grid grid-cols-3">
            <TabsTrigger value="favoritos" className="">
              Favoritos dos clientes
            </TabsTrigger>
            <TabsTrigger value="procuradas">
              Atividades mais procuradas
            </TabsTrigger>
            <TabsTrigger value="menor">
              Atividades com menores avaliações
            </TabsTrigger>
          </TabsList>
          <TabsContent value="favoritos">
            <div className="space-y-3">
              <MyTypography variant="subtitle3" weight="bold" className="my-4">
                Atividades recém cadastradas
              </MyTypography>

              <Activities
                activities={activities.slice(0, 4)}
                withoutHeart
                withoutShared
                type="admin"
              />
            </div>
          </TabsContent>
          <TabsContent value="procuradas">
            <div className="space-y-3">
              <MyTypography variant="subtitle3" weight="bold" className="my-4">
                Atividades mais procuradas
              </MyTypography>
              <Activities
                activities={activities.slice(0, 4)}
                withoutHeart
                withoutShared
                type="admin"
              />
            </div>
          </TabsContent>
          <TabsContent value="menor">
            <div className="space-y-3">
              <MyTypography variant="subtitle3" weight="bold" className="my-4">
                Atividades com menores avaliações
              </MyTypography>
              <Activities
                activities={activities.slice(4, 6)}
                withoutHeart
                withoutShared
                type="admin"
              />
            </div>
          </TabsContent>
        </MyTabs>
      }
    </main>
  );
}
