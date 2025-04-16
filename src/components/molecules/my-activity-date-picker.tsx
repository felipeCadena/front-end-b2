'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../atoms/my-popover';
import MyButton from '../atoms/my-button';
import { cn } from '@/utils/cn';
import MyIcon from '../atoms/my-icon';
import { MyCalendar } from './my-calendar';
import { ptBR } from 'date-fns/locale/pt-BR';
import MyTypography from '../atoms/my-typography';
import { MyActivityCalendar } from './my-activity-calendar';
import { Dispatch, SetStateAction, useState } from 'react';
import { Recurrence } from '../organisms/activity-date-picker';
import {
  agruparRecorrencias,
  formatRecurrencesToDates,
} from '@/utils/formatters';

type MyActivityDatePickerProps = {
  withlabel?: string;
  selectedDate: Date | undefined;
  setSelectedDates: Dispatch<SetStateAction<Date | undefined>>;
  activityRecurrences: Recurrence[];
};

export function MyActivityDatePicker({
  withlabel,
  selectedDate,
  activityRecurrences,
  setSelectedDates,
}: MyActivityDatePickerProps) {
  const [open, setOpen] = useState(false);

  const handleDateSelect = (dates?: Date | undefined) => {
    if (!dates) return;

    // Apenas atualiza as datas selecionadas sem formatação
    setSelectedDates(dates);
  };

  const monthlyRecurrences = formatRecurrencesToDates(
    activityRecurrences,
    'monthly'
  );

  const weeklyRecurrences = formatRecurrencesToDates(
    activityRecurrences,
    'weekly'
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <MyButton
          variant="date"
          borderRadius="squared"
          className={cn(
            'w-full justify-start text-sm items-center gap-2 py-6 border-gray-300 md:bg-white'
          )}
        >
          {!withlabel && <MyIcon name="date" />}
          {withlabel ? (
            selectedDate ? (
              <span className="text-black">
                {format(selectedDate, 'dd', { locale: ptBR })}
              </span>
            ) : (
              <MyTypography
                variant="body"
                weight="regular"
                lightness={400}
                className="text-sm ml-2"
              >
                {withlabel}
              </MyTypography>
            )
          ) : selectedDate ? (
            <span className="text-black">
              {format(selectedDate, 'dd/MM', { locale: ptBR })}
            </span>
          ) : (
            <MyTypography variant="body" weight="regular" className="text-sm">
              Data da Atividade
            </MyTypography>
          )}
        </MyButton>
      </PopoverTrigger>
      <PopoverContent
        className="w-full bg-white flex flex-col items-center"
        align="center"
      >
        <MyActivityCalendar
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="capitalize"
          locale={ptBR}
          markedDates={monthlyRecurrences}
          markedDays={weeklyRecurrences}
        />
        <MyButton
          variant="default"
          size="md"
          borderRadius="squared"
          className="my-2"
          onClick={() => setOpen(false)}
        >
          Ok
        </MyButton>
      </PopoverContent>
    </Popover>
  );
}
