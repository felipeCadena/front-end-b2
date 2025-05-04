'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { cn } from '@/utils/cn';
import { ptBR } from 'react-day-picker/locale';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  bookedDates: string[];
};

function MyFullScheduleCalendar({
  className,
  classNames,
  bookedDates,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn('md:flex md:justify-center', className)}
        ISOWeek={true}
        locale={ptBR}
        disabled={(date) => {
          const formattedDate = format(date, 'yyyy-MM-dd');
          return !bookedDates.includes(formattedDate);
        }}
        formatters={{
          formatWeekdayName: (weekday) => {
            const fullName = weekday.toLocaleDateString('pt-BR', {
              weekday: 'long',
            });
            return isDesktop
              ? fullName.replace('-feira', '').split(' ')[0]
              : fullName.substring(0, 3);
          },
          formatCaption: (month) => {
            return `${format(month, 'MMMM', { locale: ptBR })}
          ${format(month, 'yyyy', { locale: ptBR })}`;
          },
          formatDay: (day) => {
            return format(day, 'd', { locale: ptBR });
          },
        }}
        modifiers={{
          booked: bookedDates.map((date) => parseISO(date)),
          selected: selectedDate ? [selectedDate] : [],
          bookedSelected: selectedDate
            ? bookedDates
                .map((date) => parseISO(date))
                .filter((d) => d.getTime() === selectedDate.getTime())
            : [],
        }}
        modifiersClassNames={{
          booked: 'bg-primary-600 rounded-lg text-white relative',
          bookedSelected: 'bg-[#689b2e] text-black rounded-lg ',
        }}
        onDayClick={(date, modifiers) => {
          if (modifiers.booked) {
            setSelectedDate(date);
            return date;
          }
        }}
        styles={{
          months: { display: 'flex', justifyContent: 'center', width: '100%' },
          day: { width: '40px', height: '40px' },
          weekday: { width: '40px' },
          caption: { width: '100%' },
          table: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
          },
          head_row: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '280px',
          },
          row: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '280px',
          },
        }}
        classNames={{
          root: '',
          button_next:
            'absolute right-1 top-2 md:right-1/3 border rounded-lg p-2',
          button_previous:
            'absolute left-1 top-2 md:left-1/3 border rounded-lg p-2',
          months: 'flex flex-col mt-1',
          month: 'space-y-4 text-center',
          caption: 'flex justify-center relative items-center',
          caption_label:
            'whitespace-pre-line text-center font-semibold text-lg',
          nav: 'flex items-center justify-between',
          nav_button: cn(
            'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
          ),
          nav_button_previous: 'absolute left-4 bottom-4',
          nav_button_next: 'absolute right-4',
          table: 'w-full border-collapse',
          head_row: 'flex justify-between',
          row: 'flex justify-between w-full',
          cell: cn(
            'relative p-0 text-center text-sm focus-within:relative focus-within:z-20',
            '[&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
            props.mode === 'range'
              ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
              : '[&:has([aria-selected])]:rounded-md'
          ),
          day: cn('h-6 w-6 md:py-4'),
          day_range_start: 'day-range-start',
          day_range_end: 'day-range-end',

          today: 'text-primary-600',
          day_disabled: 'text-[#929292] opacity-50',
          day_range_middle:
            'aria-selected:bg-accent aria-selected:text-accent-foreground',
          day_hidden: 'invisible',

          weekday:
            'font-normal text-[#929292] md:text-primary-600 md:font-semibold opacity-80 pt-6',
          outside: 'text-[#929292] opacity-50',
          disabled: 'text-[#929292] opacity-50',
          month_grid: 'w-full',
          ...classNames,
        }}
        {...props}
      />
    </div>
  );
}
MyFullScheduleCalendar.displayName = 'Full Calendar';

export { MyFullScheduleCalendar };
