import React, { useState } from 'react';
import MyTypography from '../atoms/my-typography';
import TimePickerModal from '../molecules/time-picker';
import PeopleSelector from './people-selector';
import { ClientSchedule } from '@/services/api/adventures';
import { useQuery } from '@tanstack/react-query';
import { MyActivityDatePicker } from '../molecules/my-activity-date-picker';

export type Recurrence = {
  adventureId: number;
  groupId: string;
  id: string;
  type: string;
  value: number;
};

type ActivityDatePickerProps = {
  schedule: ClientSchedule;
  setSchedule: React.Dispatch<React.SetStateAction<ClientSchedule>>;
  price: {
    adult: string | undefined;
    children: string | undefined;
  };
  isChildrenAllowed: boolean;
  activityRecurrence: Recurrence[];
};

const ActivityDatePicker = ({
  schedule,
  setSchedule,
  price,
  isChildrenAllowed,
  activityRecurrence,
}: ActivityDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [duration, setDuration] = useState('');

  useQuery({
    queryKey: ['schedule', selectedDate, duration],
    queryFn: () => {
      const updated = {
        ...schedule,
        scheduleDate: selectedDate,
        scheduleTime: duration,
      };
      setSchedule(updated);
      return updated;
    },
    enabled: !!selectedDate && !!duration,
  });

  return (
    <div className="md:w-2/3">
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
            />
            <TimePickerModal value={duration} onChange={setDuration} />
            <PeopleSelector
              isChildrenAllowed={isChildrenAllowed}
              price={price}
              schedule={schedule}
              setSchedule={setSchedule}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDatePicker;
