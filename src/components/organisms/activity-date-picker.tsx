import React, { useState } from "react";
import MyTypography from "../atoms/my-typography";
import TimePickerModal from "../molecules/time-picker";
import PeopleSelector from "./people-selector";
import { Adventure, ClientSchedule } from "@/services/api/adventures";
import { useQuery } from "@tanstack/react-query";
import { MyActivityDatePicker } from "../molecules/my-activity-date-picker";
import {
  addPartnerScheduledTimeToSelectedDateTime,
  agruparRecorrencias,
  findAvailableVacancies,
  getPartnerAvailableSchedules,
  getWeeklyRecurrenceTime,
  removeCanceledRecurrenceTimes,
} from "@/utils/formatters";
import { addDays, format, getDate, getDay } from "date-fns";

export type Recurrence = {
  adventureId: number;
  groupId: string;
  id: string;
  type: string;
  value: number;
};

export type GroupedRecurrences = {
  semanal: {
    tipo: "semanal";
    dias: number[];
    horarios: string[];
  }[];
  mensal: {
    tipo: "mensal";
    dias: number[];
    horarios: string[];
  }[];
};

type ActivityDatePickerProps = {
  activity: Adventure | undefined;
  schedule: ClientSchedule;
  setSchedule: React.Dispatch<React.SetStateAction<ClientSchedule>>;
};

const ActivityDatePicker = ({
  activity,
  schedule,
  setSchedule,
}: ActivityDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");

  const price = {
    adult: activity?.priceAdult,
    children: activity?.priceChildren,
  };

  const isChildrenAllowed = activity?.isChildrenAllowed ?? false;

  const activityRecurrence = activity?.recurrence ?? [];

  const getAvailableHoursByDate = (
    groupedRecurrences: ReturnType<typeof agruparRecorrencias>,
    schedules: { datetime: string; isCanceled: boolean }[],
    daysToGenerate = 30
  ): { [date: string]: string[] } => {
    const result: { [date: string]: string[] } = {};
    const today = new Date();

    // Agrupa schedules por data/hora e se está cancelado
    const scheduleMap: { [date: string]: { [hour: string]: boolean } } = {};
    for (const s of schedules) {
      const dt = new Date(s.datetime);
      const dateStr = format(dt, "yyyy-MM-dd");
      const hourStr = format(dt, "HH:mm");

      if (!scheduleMap[dateStr]) scheduleMap[dateStr] = {};
      scheduleMap[dateStr][hourStr] = !s.isCanceled;
    }

    for (let i = 0; i < daysToGenerate; i++) {
      const currentDate = addDays(today, i);
      const dateStr = format(currentDate, "yyyy-MM-dd");
      const dayOfWeek = getDay(currentDate); // 0 (domingo) a 6 (sábado)
      const dayOfMonth = getDate(currentDate); // 1-31

      let horarios: string[] = [];

      // Recorrência semanal
      groupedRecurrences.semanal.forEach(({ dias, horarios: h }) => {
        if (dias.includes(dayOfWeek)) {
          horarios = horarios.concat(h);
        }
      });

      // Recorrência mensal
      groupedRecurrences.mensal.forEach(({ dias, horarios: h }) => {
        if (dias.includes(dayOfMonth)) {
          horarios = horarios.concat(h);
        }
      });

      if (horarios.length === 0) continue;

      // Remove duplicados e ordena
      horarios = Array.from(new Set(horarios)).sort();

      const horariosDisponiveis = horarios.filter((horario) => {
        // Se não existe nenhum schedule para esse horário nessa data, está liberado
        if (!scheduleMap[dateStr] || !(horario in scheduleMap[dateStr])) {
          return true;
        }

        // Existe, mas não está cancelado
        return scheduleMap[dateStr][horario] === true;
      });

      // Só adiciona se tiver pelo menos 1 horário
      if (horariosDisponiveis.length > 0) {
        result[dateStr] = horariosDisponiveis;
      }
    }

    return result;
  };

  const groupedRecurrences = agruparRecorrencias(activityRecurrence);

  const availableHoursByDate = getAvailableHoursByDate(
    groupedRecurrences,
    activity?.schedules ?? [],
    500
  );

  const rawSelectedDateTimes = getWeeklyRecurrenceTime(
    selectedDate,
    groupedRecurrences
  );

  const selectedDateTimes = removeCanceledRecurrenceTimes(
    selectedDate,
    rawSelectedDateTimes,
    activity?.schedules
  );

  const availablePartnerSchedules = getPartnerAvailableSchedules(activity);

  const AddToSelectedDateTimes = addPartnerScheduledTimeToSelectedDateTime(
    selectedDate,
    selectedDateTimes,
    availablePartnerSchedules
  );

  const availableVacancies = findAvailableVacancies(
    activity?.schedules,
    activity?.personsLimit,
    selectedDate,
    selectedTime
  );

  useQuery({
    queryKey: ["schedule", selectedDate, selectedTime],
    queryFn: () => {
      const updated = {
        ...schedule,
        scheduleDate: selectedDate,
        scheduleTime: selectedTime,
      };
      setSchedule(updated);
      return updated;
    },
    enabled: !!selectedDate && !!selectedTime,
  });

  return (
    <div className="md:w-3/4 mt-8 md:mt-0">
      <div className="px-6 lg:col-span-2 ">
        <div className="max-sm:border-t-[1px] max-sm:border-gray-400/30">
          <MyTypography variant="subtitle3" weight="bold" className="my-4">
            Escolha o dia e horário para realizar a atividade.
          </MyTypography>
          <div className="border space-y-6 border-gray-300 rounded-lg py-8 md:space-y-10 md:py-9 px-5 mt-8">
            <MyActivityDatePicker
              selectedDate={selectedDate}
              setSelectedDates={setSelectedDate}
              activityRecurrences={activityRecurrence}
              partnerSchedules={availablePartnerSchedules}
              hourBeforeSchedule={activity?.hoursBeforeSchedule}
              availableHoursByDate={availableHoursByDate}
            />
            <TimePickerModal
              availableActivityTimes={AddToSelectedDateTimes}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
            <PeopleSelector
              isChildrenAllowed={isChildrenAllowed}
              price={price}
              schedule={schedule}
              personsLimit={availableVacancies}
              setSchedule={setSchedule}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDatePicker;
