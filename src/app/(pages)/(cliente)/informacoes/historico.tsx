import Loading from "@/app/loading";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import MyTypography from "@/components/atoms/my-typography";
import { Pagination } from "@/components/molecules/pagination";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import FullActivitiesHistoric from "@/components/organisms/full-activities-historic";
import FullActivitiesHistoricMobile from "@/components/organisms/full-activities-historic-mobile";
import { ordersAdventuresService } from "@/services/api/orders";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Historico() {
  const [selected, setSelected] = React.useState<"ar" | "terra" | "mar" | "">(
    ""
  );
  const [page, setPage] = React.useState(1);

  // "realizado" | "cancelado"
  const [status, setStatus] = React.useState("realizado");

  const { data: schedules, isLoading } = useQuery({
    queryKey: ["schedules", status, page],
    queryFn: () =>
      ordersAdventuresService.getCustomerSchedules({
        adventureStatus: status,
        limit: 6,
        skip: page * 6 - 6,
      }),
  });

  const filteredActivities = schedules?.filter(
    (sch) => sch.adventure.typeAdventure === selected
  );

  const showHistoricActivities =
    selected === "" ? schedules : filteredActivities;

  return (
    <section className="w-full mb-6">
      <div className="px-2 space-y-8">
        <ActivitiesFilter
          selected={selected}
          setSelected={setSelected}
          withoutText
        />
        <div className="w-1/3 md:w-1/6 ml-auto">
          <MySelect
            className="text-base text-black"
            value={status}
            onValueChange={(value) => setStatus(value)}
          >
            <SelectTrigger className="rounded-2xl text-[#848A9C] text-xs">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="realizado">Realizado</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </MySelect>
        </div>
        {isLoading && (
          <div className="w-full h-[30vh] flex justify-center items-center">
            <Loading />
          </div>
        )}

        {showHistoricActivities && showHistoricActivities.length > 0 ? (
          <>
            <div className="md:hidden">
              <FullActivitiesHistoricMobile
                activities={showHistoricActivities}
              />
            </div>
            <div className="max-sm:hidden">
              <FullActivitiesHistoric
                isActivityDone
                activities={showHistoricActivities}
              />
            </div>
            <div className="flex w-full justify-center items-center">
              <Pagination
                setPage={setPage}
                page={page}
                limit={6}
                data={showHistoricActivities ?? []}
              />
            </div>
          </>
        ) : (
          !isLoading && (
            <div className="w-full h-[30vh] flex justify-center items-center">
              <MyTypography variant="subtitle3" weight="bold">
                Você não tem histórico de atividades
              </MyTypography>
            </div>
          )
        )}
      </div>
    </section>
  );
}
