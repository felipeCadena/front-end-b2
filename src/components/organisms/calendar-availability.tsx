'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import type { DayPickerProps } from 'react-day-picker';
import { cn } from '@/utils/cn';
import { ptBR } from 'react-day-picker/locale';
import { format, isSameDay, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  MyDialog,
} from '../molecules/my-dialog';
import MyButton from '../atoms/my-button';
import MultiSelect from '../molecules/combobox';
import { hours } from '@/common/constants/constants';
import HoursSelect from '../molecules/date-select';

interface Schedule {
  id: string;
  datetime: string;
  adventureId: number;
  isAvailable: boolean;
  qntLimitPersons: number;
  qntConfirmedPersons: number;
  isCanceled: boolean;
}

interface SchedulesByDate {
  [key: string]: Schedule[];
}

type CalendarProps = {
  schedules?: Schedule[];
  onCreateSchedule: (datetimes: string[]) => Promise<void>;
  onCancelSchedule: (scheduleId: string) => Promise<void>;
  onCancelAllSchedules: (chedulesId: string[]) => Promise<void>;
  className?: string;
} & Omit<DayPickerProps, 'mode' | 'selected' | 'onSelect'>;

function CalendarAvailability({
  schedules,
  onCreateSchedule,
  onCancelSchedule,
  onCancelAllSchedules,
  showOutsideDays = true,
  classNames,
  className,
  ...props
}: CalendarProps) {
  const [isDesktop, setIsDesktop] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingCancel, setIsLoadingCancel] = React.useState(false);
  const [isLoadingAllCancel, setIsLoadingAllCancel] = React.useState(false);

  const [selectedTimes, setSelectedTimes] = React.useState<string[]>([]);

  // Agrupa horários por data se existirem schedules
  const schedulesByDate = React.useMemo<SchedulesByDate>(() => {
    if (!schedules || !Array.isArray(schedules) || schedules.length === 0) {
      console.log('schedules inválido ou vazio'); // Debug 2
      return {};
    }

    const result = schedules.reduce((acc: SchedulesByDate, schedule) => {
      try {
        if (!schedule?.datetime) {
          console.log('datetime inválido:', schedule); // Debug 3
          return acc;
        }

        const date = format(parseISO(schedule.datetime), 'yyyy-MM-dd');
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(schedule);
        return acc;
      } catch (error) {
        console.error('Erro ao processar data:', schedule?.datetime, error);
        return acc;
      }
    }, {});
    return result;
  }, [schedules]);

  const availableDates = React.useMemo(() => {
    const dates = Object.keys(schedulesByDate).map((date) => parseISO(date));
    return dates;
  }, [schedulesByDate]);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsDialogOpen(true);
  };

  const getSchedulesForDate = (date: Date): Schedule[] => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return schedulesByDate[dateStr] || [];
  };

  const formatScheduleTimes = (
    date: Date,
    selectedTimes: string[]
  ): string[] => {
    const baseDate = format(date, 'yyyy-MM-dd');

    // Conta quantas vezes cada horário aparece
    const countMap = selectedTimes.reduce<Record<string, number>>(
      (acc, time) => {
        acc[time] = (acc[time] || 0) + 1;
        return acc;
      },
      {}
    );

    // Filtra os horários que aparecem só 1 vez
    const filteredTimes = selectedTimes.filter((time) => countMap[time] === 1);

    console.log(filteredTimes);

    // Formata os horários
    return filteredTimes.map((time) => `${baseDate}T${time}:00-03:00`);
  };

  const handleSaveNewSchedules = async () => {
    setIsLoading(true);
    if (!selectedDate || selectedTimes.length === 0) return;

    const existingTimes = getSchedulesForDate(selectedDate).map((s) =>
      format(parseISO(s.datetime), 'HH:mm')
    );

    const newTimesOnly = selectedTimes.filter(
      (time) => !existingTimes.includes(time)
    );

    if (newTimesOnly.length === 0) {
      toast.info('Selecione novamente o horário.');
      return;
    }

    const formattedSchedules = formatScheduleTimes(selectedDate, newTimesOnly);

    try {
      await onCreateSchedule(formattedSchedules);
      setSelectedTimes([]); // limpa a seleção
    } catch (error) {
      console.log('Erro ao criar horários');
    } finally {
      setIsLoading(false);
    }
  };

  const handleScheduleSelection = (times: string[]) => {
    setSelectedTimes(times); // Atualiza o estado`local
  };

  const handleCancel = async (id: string) => {
    setIsLoadingCancel(true);

    try {
      await onCancelSchedule(id);
    } catch (error) {
      console.log('Erro ao cancelar horário');
    } finally {
      setIsLoadingCancel(false);
    }
  };

  const handleCancelAllSchedules = async (ids: string[]) => {
    setIsLoadingAllCancel(true);

    try {
      await onCancelAllSchedules(ids);
    } catch (error) {
      console.log('Erro ao cancelar horários');
    } finally {
      setIsLoadingAllCancel(false);
    }
  };

  // Função para extrair apenas os horários de uma data específica
  const getSelectedTimesForDate = (
    date: Date,
    schedules: Schedule[]
  ): string[] => {
    if (!date || !schedules) return [];

    return schedules
      .filter((schedule) => {
        const scheduleDate = format(parseISO(schedule.datetime), 'yyyy-MM-dd');
        const selectedDateStr = format(date, 'yyyy-MM-dd');
        return scheduleDate === selectedDateStr;
      })
      .map((schedule) => format(parseISO(schedule.datetime), 'HH:mm'));
  };

  // Atualiza os horários selecionados quando a data muda
  React.useEffect(() => {
    if (selectedDate) {
      const timesForDate = getSelectedTimesForDate(
        selectedDate,
        schedules || []
      );
      setSelectedTimes(timesForDate); // <- isto está forçando os horários antigos
    }
  }, [selectedDate, schedules]);

  const selectedTimesForDate = selectedDate
    ? getSelectedTimesForDate(selectedDate, schedules || [])
    : [];

  const availableHours = hours.filter(
    (hour) => !selectedTimesForDate.includes(hour.value)
  );

  return (
    <div className="">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onDayClick={handleDayClick}
        showOutsideDays={showOutsideDays}
        className={cn('md:flex md:justify-center', className)}
        ISOWeek={true}
        locale={ptBR}
        formatters={{
          formatWeekdayName: (weekday) => {
            const fullName = weekday.toLocaleDateString('pt-BR', {
              weekday: 'long',
            });
            return isDesktop
              ? fullName.replace('-feira', '')
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
          booked: availableDates,
          selected: selectedDate,
          // disabled: (date) => !isDateAvailable(date),
        }}
        modifiersClassNames={{
          booked: 'rounded-lg bg-primary-600 text-white relative',
          selected: !availableDates.some((date) =>
            selectedDate ? isSameDay(date, selectedDate) : false
          )
            ? 'rounded-lg bg-primary-800 text-primary-600 relative'
            : '',
        }}
        styles={{
          months: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            textTransform: 'capitalize',
          },
          day: { width: '40px', height: '40px' },
          weekday: { width: '40px', textTransform: 'capitalize' },
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
            '[&:has([aria-selected])]:rounded-md'
          ),
          day: cn('h-6 w-6 md:py-4'),
          day_range_start: 'day-range-start',
          day_range_end: 'day-range-end',
          day_selected:
            'bg-white text-primary-600 hover:bg-primary-600 hover:text-white focus:bg-primary-600 focus:text-white',
          // day_today: "bg-primary-600 text-white",
          today: 'text-primary-600',
          day_disabled: 'text-[#929292] opacity-50',
          day_range_middle:
            'aria-selected:bg-accent aria-selected:text-accent-foreground',
          day_hidden: 'invisible',
          selected: 'bg-primary-600 text-white rounded-md',
          weekday:
            'font-normal text-[#929292] md:text-primary-600 md:font-semibold opacity-80 pt-6',
          outside: 'text-[#929292] opacity-50',
          disabled: 'text-[#929292] opacity-50',
          month_grid: 'w-full',
          ...classNames,
        }}
        {...props}
      />

      <MyDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedDate && (
                <span className="text-lg font-semibold">
                  {format(selectedDate, "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            {selectedDate && getSchedulesForDate(selectedDate).length > 0 ? (
              <>
                <div className="space-y-4">
                  {getSchedulesForDate(selectedDate).map((schedule) => (
                    <div
                      key={schedule.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium">
                        {format(parseISO(schedule.datetime), 'HH:mm')}
                      </span>
                      <div className="flex gap-2">
                        <MyButton
                          variant="red"
                          size="sm"
                          borderRadius="squared"
                          onClick={() => handleCancel(schedule.id)}
                          isLoading={isLoadingCancel}
                        >
                          Cancelar
                        </MyButton>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <MyButton
                    variant="red"
                    className="w-full"
                    size="lg"
                    borderRadius="squared"
                    isLoading={isLoadingAllCancel}
                    onClick={() =>
                      handleCancelAllSchedules(
                        getSchedulesForDate(selectedDate).map(
                          (schedule) => schedule.id
                        )
                      )
                    }
                  >
                    Cancelar Todos os Horários
                  </MyButton>
                </div>
              </>
            ) : (
              <p className="text-center mb-4">
                Nenhum horário disponível para esta data
              </p>
            )}

            <div className="mt-6 border-t pt-4">
              <h4 className="font-medium mb-2">Adicionar Novo Horário</h4>
              <div className="flex gap-2">
                <HoursSelect
                  placeholder="Selecione os horários"
                  options={availableHours}
                  selected={selectedTimes}
                  setSelected={handleScheduleSelection}
                />
                <MyButton
                  variant="default"
                  borderRadius="squared"
                  size="md"
                  onClick={handleSaveNewSchedules}
                  isLoading={isLoading}
                >
                  Adicionar Novo Horário
                </MyButton>
              </div>
            </div>
          </div>
        </DialogContent>
      </MyDialog>
    </div>
  );
}

CalendarAvailability.displayName = 'Full Calendar';

export { CalendarAvailability };
