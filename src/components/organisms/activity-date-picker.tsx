import React, { useState } from 'react';
import MyTypography from '../atoms/my-typography';
import TimePickerModal from '../molecules/time-picker';
import PeopleSelector from './people-selector';
import { Adventure, ClientSchedule } from '@/services/api/adventures';
import { useQuery } from '@tanstack/react-query';
import { MyActivityDatePicker } from '../molecules/my-activity-date-picker';
import {
  addPartnerScheduledTimeToSelectedDateTime,
  agruparRecorrencias,
  findAvailableVacancies,
  getPartnerAvailableSchedules,
  getWeeklyRecurrenceTime,
} from '@/utils/formatters';

export type Recurrence = {
  adventureId: number;
  groupId: string;
  id: string;
  type: string;
  value: number;
};

export type GroupedRecurrences = {
  semanal: {
    tipo: 'semanal';
    dias: number[];
    horarios: string[];
  }[];
  mensal: {
    tipo: 'mensal';
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
  const [selectedTime, setSelectedTime] = useState('');

  const price = {
    adult: activity?.priceAdult,
    children: activity?.priceChildren,
  };

  const isChildrenAllowed = activity?.isChildrenAllowed ?? false;

  const activityRecurrence = activity?.recurrence ?? [];

  const groupedRecurrences = agruparRecorrencias(activityRecurrence);

  const selectedDateTimes = getWeeklyRecurrenceTime(
    selectedDate,
    groupedRecurrences
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
    queryKey: ['schedule', selectedDate, selectedTime],
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

  console.log('ava', availableVacancies);

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
