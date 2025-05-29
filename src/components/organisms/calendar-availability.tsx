"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import type { DayPickerProps } from "react-day-picker";
import { cn } from "@/utils/cn";
import { ptBR } from "react-day-picker/locale";
import { format, isSameDay, parseISO } from "date-fns";
import { toast } from "react-toastify";
import MyButton from "../atoms/my-button";
import { hours } from "@/common/constants/constants";
import HoursSelect from "../molecules/date-select";
import ConfirmModal from "../molecules/confirm-modal";
import ModalAlert from "../molecules/modal-alert";
import MyTypography from "../atoms/my-typography";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/api/admin";

// const justificativas = [
//   "Houve um imprevisto e irei precisar cancelar nossa atividade, desculpe!",
//   "Condições climáticas desfavoráveis para a realização da atividade.",
//   "Problemas técnicos com equipamentos necessários.",
//   "Número insuficiente de participantes.",
//   "Motivos de força maior/emergência.",
// ];

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
  duration: string;
  schedules?: Schedule[];
  onCreateSchedule: (datetimes: string[]) => Promise<any>;
  onCancelSchedule: (
    scheduleId: string,
    justificativa?: string
  ) => Promise<any>;
  onCancelAllSchedules: (
    chedulesId: string[],
    justificativa?: string
  ) => Promise<any>;
  className?: string;
} & Omit<DayPickerProps, "mode" | "selected" | "onSelect">;

function CalendarAvailability({
  duration,
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
  const [selectedJustificativa, setSelectedJustificativa] =
    React.useState<string>("");
  const [hasClient, setHasClient] = React.useState(false);
  const [hasClientAllCancel, setHasClientAllCancel] = React.useState(false);

  const { data: justificativas } = useQuery({
    queryKey: ["configs"],
    queryFn: () => adminService.listConfig({ type: "justificativa" }),
  });

  const [isModalCancelOpen, setIsModalCancelOpen] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingCancel, setIsLoadingCancel] = React.useState(false);
  const [isLoadingAllCancel, setIsLoadingAllCancel] = React.useState(false);

  const [cancelAllSchedules, setCancelAllSchedules] = React.useState(false);
  const [confirmCancelAll, setConfirmCancelAll] = React.useState(false);

  const [selectedTimes, setSelectedTimes] = React.useState<string[]>([]);

  // Agrupa horários por data se existirem schedules
  const schedulesByDate = React.useMemo<SchedulesByDate>(() => {
    if (!schedules || !Array.isArray(schedules) || schedules.length === 0) {
      console.log("schedules inválido ou vazio"); // Debug 2
      return {};
    }

    const result = schedules.reduce((acc: SchedulesByDate, schedule) => {
      try {
        if (!schedule?.datetime) {
          console.log("datetime inválido:", schedule); // Debug 3
          return acc;
        }

        const date = format(parseISO(schedule.datetime), "yyyy-MM-dd");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(schedule);
        return acc;
      } catch (error) {
        console.error("Erro ao processar data:", schedule?.datetime, error);
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
  };

  const getSchedulesForDate = (date: Date): Schedule[] => {
    const dateStr = format(date, "yyyy-MM-dd");
    return schedulesByDate[dateStr] || [];
  };

  const formatScheduleTimes = (
    date: Date,
    selectedTimes: string[]
  ): string[] => {
    const baseDate = format(date, "yyyy-MM-dd");

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

    // Formata os horários
    return filteredTimes.map(
      (time) => `${baseDate}T${time}:00-03:00
    `
    );
  };

  const handleSaveNewSchedules = async () => {
    if (!selectedDate || selectedTimes.length === 0) {
      toast.info("Selecione uma data e horário.");
      return;
    }
    setIsLoading(true);

    const existingTimes = getSchedulesForDate(selectedDate).map((s) =>
      format(parseISO(s.datetime), "HH:mm")
    );

    const newTimesOnly = selectedTimes.filter(
      (time) => !existingTimes.includes(time)
    );

    if (newTimesOnly.length === 0) {
      toast.info("Selecione novamente o horário.");
      return;
    }

    const formattedSchedules = formatScheduleTimes(selectedDate, newTimesOnly);

    try {
      const response = await onCreateSchedule(formattedSchedules);

      if (response) {
        setSelectedTimes([]);
      }
    } catch (error) {
      console.log("Erro ao criar horários");
    } finally {
      setIsLoading(false);
    }
  };

  const handleScheduleSelection = (times: string[]) => {
    setSelectedTimes(times); // Atualiza o estado`local
  };

  const handleCancel = async (id: string, justificativa?: string) => {
    setIsLoadingCancel(true);

    // Verifica se tem cliente agendado

    const response = await onCancelSchedule(id, justificativa);

    if (response) {
      setIsModalCancelOpen(true);
      setHasClient(false);
      setSelectedJustificativa("");
    }
    setIsLoadingCancel(false);
  };

  const handleCloseModal = () => {
    setIsModalCancelOpen(false);
    setSelectedDate(undefined);
    setSelectedTimes([]);
  };

  const handleCancelAllSchedules = async (
    ids: string[],
    selectedJustificativa?: string
  ) => {
    setIsLoadingAllCancel(true);

    try {
      const response = await onCancelAllSchedules(ids, selectedJustificativa);
      if (response) {
        setCancelAllSchedules(false);
        setConfirmCancelAll(true);
      }
    } catch (error) {
      console.log("Erro ao cancelar horários");
      setIsLoadingAllCancel(false);
    } finally {
    }
  };

  const handleCancelAll = () => {
    selectedDate &&
      handleCancelAllSchedules(
        getSchedulesForDate(selectedDate).map((schedule) => schedule.id),
        selectedJustificativa
      );
  };

  // Função para extrair apenas os horários de uma data específica
  const getSelectedTimesForDate = (
    date: Date,
    schedules: Schedule[]
  ): string[] => {
    if (!date || !schedules) return [];

    return schedules
      .filter((schedule) => {
        const scheduleDate = format(parseISO(schedule.datetime), "yyyy-MM-dd");
        const selectedDateStr = format(date, "yyyy-MM-dd");
        return scheduleDate === selectedDateStr;
      })
      .map((schedule) => format(parseISO(schedule.datetime), "HH:mm"));
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

  const hasSomeClient = () => {
    const dateToCheck = new Date(selectedDate!);

    const hasConfirmedSchedule = schedules?.some((schedule) => {
      const scheduleDate = new Date(schedule.datetime);

      // Verifica se é a mesma data (desconsiderando horário)
      const sameDay =
        scheduleDate.getDate() === dateToCheck.getDate() &&
        scheduleDate.getMonth() === dateToCheck.getMonth() &&
        scheduleDate.getFullYear() === dateToCheck.getFullYear();

      if (!sameDay) return false;

      // Pega o horário no formato HH:MM
      const scheduleTime = scheduleDate.toTimeString().slice(0, 5);

      // Verifica se o horário está entre os horários informados e tem confirmados
      return (
        selectedTimesForDate.includes(scheduleTime) &&
        schedule.qntConfirmedPersons > 0
      );
    });

    console.log(hasConfirmedSchedule);

    if (hasConfirmedSchedule) {
      setHasClientAllCancel(true);
    } else {
      setCancelAllSchedules(true);
    }
  };

  return (
    <div className="">
      <ModalAlert
        open={isModalCancelOpen}
        onClose={() => setIsModalCancelOpen(false)}
        onAction={handleCloseModal}
        button="Fechar"
        title="Horário cancelado"
        descrition="O horário foi cancelado com sucesso."
        iconName="cancel"
      />

      <ModalAlert
        open={cancelAllSchedules}
        onClose={() => setCancelAllSchedules(false)}
        onAction={handleCancelAll}
        button="Cancelar"
        title="Cancelar todos os horários"
        descrition="Deseja cancelar todos os horários?"
        iconName="warning"
      />

      <ModalAlert
        open={confirmCancelAll}
        onClose={() => setConfirmCancelAll(false)}
        onAction={() => setConfirmCancelAll(false)}
        button="Fechar"
        title="Horários Cancelados"
        descrition="Todos os horários foram cancelados com sucesso."
        iconName="cancel"
      />

      <DayPicker
        mode="single"
        selected={selectedDate}
        onDayClick={handleDayClick}
        showOutsideDays={showOutsideDays}
        className={cn("md:flex md:justify-center", className)}
        ISOWeek={true}
        locale={ptBR}
        formatters={{
          formatWeekdayName: (weekday) => {
            const fullName = weekday.toLocaleDateString("pt-BR", {
              weekday: "long",
            });
            return isDesktop
              ? fullName.replace("-feira", "")
              : fullName.substring(0, 3);
          },
          formatCaption: (month) => {
            return `${format(month, "MMMM", { locale: ptBR })}
            ${format(month, "yyyy", { locale: ptBR })}`;
          },
          formatDay: (day) => {
            return format(day, "d", { locale: ptBR });
          },
        }}
        modifiers={{
          booked: availableDates,
          selected: selectedDate,
          // disabled: (date) => !isDateAvailable(date),
        }}
        modifiersClassNames={{
          booked: "rounded-lg bg-primary-600 text-white relative",
          selected: !availableDates.some((date) =>
            selectedDate ? isSameDay(date, selectedDate) : false
          )
            ? "rounded-lg bg-primary-800 text-primary-600 relative"
            : "",
        }}
        styles={{
          months: {
            display: "flex",
            justifyContent: "center",
            width: "100%",
            textTransform: "capitalize",
          },
          day: { width: "40px", height: "40px" },
          weekday: { width: "40px", textTransform: "capitalize" },
          caption: { width: "100%" },
          table: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0",
          },
          head_row: {
            display: "flex",
            justifyContent: "space-between",
            width: "280px",
          },
          row: {
            display: "flex",
            justifyContent: "space-between",
            width: "280px",
          },
        }}
        classNames={{
          root: "",
          button_next:
            "absolute right-1 top-2 md:right-1/3 border rounded-lg p-2",
          button_previous:
            "absolute left-1 top-2 md:left-1/3 border rounded-lg p-2",
          months: "flex flex-col mt-1",
          month: "space-y-4 text-center",
          caption: "flex justify-center relative items-center",
          caption_label:
            "whitespace-pre-line text-center font-semibold text-lg",
          nav: "flex items-center justify-between",
          nav_button: cn(
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-4 bottom-4",
          nav_button_next: "absolute right-4",
          table: "w-full border-collapse",
          head_row: "flex justify-between",
          row: "flex justify-between w-full",
          cell: cn(
            "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
            "[&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
            "[&:has([aria-selected])]:rounded-md"
          ),
          day: cn("h-6 w-6 md:py-4"),
          day_range_start: "day-range-start",
          day_range_end: "day-range-end",
          day_selected:
            "bg-white text-primary-600 hover:bg-primary-600 hover:text-white focus:bg-primary-600 focus:text-white",
          // day_today: "bg-primary-600 text-white",
          today: "text-primary-600",
          day_disabled: "text-[#929292] opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          selected: "bg-primary-600 text-white rounded-md",
          weekday:
            "font-normal text-[#929292] md:text-primary-600 md:font-semibold opacity-80 pt-6",
          outside: "text-[#929292] opacity-50",
          disabled: "text-[#929292] opacity-50",
          month_grid: "w-full",
          ...classNames,
        }}
        {...props}
      />

      <section className="max-w-sm md:max-w-2xl mx-auto mt-16">
        {selectedDate && (
          <span className="text-lg font-semibold">
            {format(selectedDate, "dd 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })}
          </span>
        )}

        <div className="py-4 overflow-hidden w-full">
          {selectedDate &&
            (getSchedulesForDate(selectedDate).length > 0 ? (
              <>
                <div className="space-y-4">
                  {getSchedulesForDate(selectedDate).map((schedule) => (
                    <div key={schedule.id}>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">
                          {format(parseISO(schedule.datetime), "HH:mm")}
                        </span>
                        <div className="flex gap-2">
                          {schedule?.qntConfirmedPersons > 0 ? (
                            <MyButton
                              variant="red"
                              size="sm"
                              borderRadius="squared"
                              onClick={() => setHasClient(true)}
                            >
                              Cancelar
                            </MyButton>
                          ) : (
                            <ConfirmModal
                              customDescription={
                                schedule?.qntConfirmedPersons > 0
                                  ? "Esse horário já possui clientes agendados. Deseja cancelar mesmo assim?"
                                  : "Tem certeza que deseja cancelar esse horário?"
                              }
                              customTitle="Cancelar Horário"
                              customConfirmMessage="Cancelar"
                              iconName="warning"
                              callbackFn={() => handleCancel(schedule.id)}
                            >
                              <MyButton
                                variant="red"
                                size="sm"
                                borderRadius="squared"
                                isLoading={isLoadingCancel}
                              >
                                Cancelar
                              </MyButton>
                            </ConfirmModal>
                          )}
                        </div>
                      </div>
                      {/* Seção de Justificativa */}
                      {hasClient && (
                        <div className="py-6">
                          <MyTypography
                            variant="subtitle3"
                            weight="bold"
                            className="mb-4"
                          >
                            Atenção: Esse horário já possui clientes agendados.
                            Justifique o cancelamento:
                          </MyTypography>

                          <div className="space-y-3">
                            {justificativas &&
                              justificativas.map(
                                (justificativa: any, index: number) => (
                                  <div
                                    key={index}
                                    className={`p-4 rounded-lg border cursor-pointer transition-all border-l-8 ${
                                      selectedJustificativa ===
                                      justificativa?.text
                                        ? "border-black bg-gray-50"
                                        : "border-gray-200 bg-gray-50 opacity-80"
                                    }`}
                                    onClick={() =>
                                      setSelectedJustificativa(
                                        justificativa?.text
                                      )
                                    }
                                  >
                                    <MyTypography variant="body-big">
                                      {justificativa?.text}
                                    </MyTypography>
                                  </div>
                                )
                              )}
                          </div>

                          <div className="flex gap-4">
                            <MyButton
                              variant="red"
                              size="md"
                              className="w-full ml-auto mt-4"
                              borderRadius="squared"
                              onClick={() =>
                                handleCancel(schedule.id, selectedJustificativa)
                              }
                            >
                              Confirmar Cancelamento de Horário
                            </MyButton>
                            <MyButton
                              variant="outline-neutral"
                              size="md"
                              className="w-full ml-auto mt-4"
                              borderRadius="squared"
                              onClick={() => setHasClient(false)}
                            >
                              Não quero cancelar mais
                            </MyButton>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center mb-4">
                Nenhum horário disponível para esta data
              </p>
            ))}

          {selectedDate && (
            <div className="mt-4 w-full">
              {getSchedulesForDate(selectedDate).length > 0 && (
                <div className="border-t pt-4 w-full flex flex-col gap-4 justify-center items-center">
                  <MyButton
                    variant="red"
                    size="md"
                    className="w-full"
                    borderRadius="squared"
                    onClick={hasSomeClient}
                  >
                    Cancelar todos os horários
                  </MyButton>

                  {/* Seção de Justificativa */}
                  {hasClientAllCancel && (
                    <div className="py-6">
                      <MyTypography
                        variant="subtitle3"
                        weight="bold"
                        className="mb-4"
                      >
                        Atenção: Um ou mais horários já possui clientes
                        agendados. Justifique o cancelamento:
                      </MyTypography>

                      <div className="space-y-3">
                        {justificativas &&
                          justificativas.map(
                            (justificativa: any, index: number) => (
                              <div
                                key={index}
                                className={`p-4 rounded-lg border cursor-pointer transition-all border-l-8 ${
                                  selectedJustificativa === justificativa.text
                                    ? "border-black bg-gray-50"
                                    : "border-gray-200 bg-gray-50 opacity-80"
                                }`}
                                onClick={() =>
                                  setSelectedJustificativa(justificativa.text)
                                }
                              >
                                <MyTypography variant="body-big">
                                  {justificativa.text}
                                </MyTypography>
                              </div>
                            )
                          )}
                      </div>

                      <div className="flex gap-4">
                        <MyButton
                          variant="red"
                          size="md"
                          className="w-full ml-auto mt-4"
                          borderRadius="squared"
                          onClick={() =>
                            handleCancelAllSchedules(
                              getSchedulesForDate(selectedDate).map(
                                (schedule) => schedule.id
                              ),
                              selectedJustificativa
                            )
                          }
                        >
                          Confirmar Cancelamento de todos os horários
                        </MyButton>
                        <MyButton
                          variant="outline-neutral"
                          size="md"
                          className="w-full ml-auto mt-4"
                          borderRadius="squared"
                          onClick={() => setHasClientAllCancel(false)}
                        >
                          Não quero cancelar mais
                        </MyButton>
                      </div>
                    </div>
                  )}

                  {/* (
                     <ConfirmModal 
                      className="w-full"
                      customDescription={
                        schedules?.find(
                          (schedule) => schedule.qntConfirmedPersons > 0
                        )
                          ? "Um ou mais horários já possui clientes agendados. Deseja cancelar mesmo assim?"
                          : "Tem certeza que deseja cancelar todos os horário?"
                      }
                      customTitle="Cancelar Horário"
                      customConfirmMessage="Cancelar"
                      iconName="cancel"
                      callbackFn={() =>
                        handleCancelAllSchedules(
                          getSchedulesForDate(selectedDate).map(
                            (schedule) => schedule.id
                          )
                        )
                      }
                    >
                      <MyButton
                        variant="red"
                        size="md"
                        className="w-full"
                        borderRadius="squared"
                        isLoading={isLoadingAllCancel}
                      >
                        Cancelar todos os horários
                      </MyButton>
                    </ConfirmModal>
                  )} */}
                </div>
              )}
              <div className="mt-4 border-t pt-4">
                <h4 className="font-medium mb-2">Adicionar Novo Horário</h4>
                <div className="flex max-sm:flex-col gap-4 md:gap-2">
                  <HoursSelect
                    placeholder="Selecione os horários"
                    options={availableHours}
                    selected={selectedTimes}
                    duration={duration}
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
          )}
        </div>
      </section>
    </div>
  );
}

CalendarAvailability.displayName = "Full Calendar";

export { CalendarAvailability };
