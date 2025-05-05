"use client";

import { days, daysOfWeek, hours } from "@/common/constants/constants";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import MyTypography from "@/components/atoms/my-typography";
import MultiSelect from "@/components/molecules/combobox";
import { MyDatePicker } from "@/components/molecules/my-date-picker";
import { MySingleDatePicker } from "@/components/molecules/my-single-date-picker";
import {
  DateOption,
  Recurrence,
  useAdventureStore,
} from "@/store/useAdventureStore";
import { convertToHours, convertToTimeString } from "@/utils/formatters";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

export default function Step2() {
  const {
    setAdventureData,
    hoursBeforeCancellation,
    hoursBeforeSchedule,
    selectionBlocks,
    addSelectionBlock,
    removeSelectionBlock,
    updateSelectionBlock,
    isRepeatable,
    duration,
  } = useAdventureStore();

  console.log(hoursBeforeCancellation, hoursBeforeSchedule);

  // Atualiza as datas para um bloco específico
  const handleDateChange = (blockId: number, dates: Date[]) => {
    updateSelectionBlock(blockId, "dates", dates);
  };

  const handleAddSelectionBlock = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addSelectionBlock();
  };

  // Função para formatar os dados antes de salvar
  const formatRecurrences = (): Recurrence[] => {
    const formattedRecurrences: Recurrence[] = [];

    selectionBlocks.forEach((block) => {
      // Cria uma recorrência por bloco
      if (block.recurrenceHour.length > 0) {
        const recurrence: Recurrence = {
          recurrenceHour: block.recurrenceHour.join(","),
        };

        // Adiciona dias da semana se existirem
        if (block.recurrenceWeekly.length > 0) {
          recurrence.recurrenceWeekly = block.recurrenceWeekly
            .map((day) => daysOfWeek.findIndex((d) => d.value === day) + 1)
            .filter((index) => index !== -1)
            .sort((a, b) => a - b)
            .join(",");
        }

        // Adiciona dias do mês se existirem
        // if (block.dates.length > 0) {
        //   recurrence.recurrenceMonthly = block.dates
        //     .map((date) => format(date, "dd"))
        //     .map((day) => parseInt(day))
        //     .sort((a, b) => a - b)
        //     .join(",");
        // }

        // Só adiciona a recorrência se tiver pelo menos um tipo de recorrência
        if (recurrence.recurrenceWeekly) {
          formattedRecurrences.push(recurrence);
        }
      }
    });

    return formattedRecurrences;
  };

  const formatAvailableDates = (): DateOption[] => {
    const availableDates: DateOption[] = [];

    selectionBlocks.forEach((block) => {
      block.dates.forEach((date) => {
        block.recurrenceHour.forEach((hourStr) => {
          const [hour, minute] = hourStr.split(":").map(Number);

          const newDate = new Date(date);
          newDate.setHours(hour);
          newDate.setMinutes(minute);
          newDate.setSeconds(0);
          newDate.setMilliseconds(0);

          availableDates.push({
            datetime: format(newDate, "yyyy-MM-dd'T'HH:mm:ss"),
            isAvailable: true,
          });
        });
      });
    });

    return availableDates;
  };

  // Atualiza o store quando necessário
  useEffect(() => {
    if (isRepeatable) {
      const formattedRecurrences = formatRecurrences();

      setAdventureData({
        recurrences: formattedRecurrences,
        availableDates: [],
      });
    } else {
      const formattedDates = formatAvailableDates();

      setAdventureData({
        recurrences: [],
        availableDates: formattedDates,
      });
    }
  }, [selectionBlocks, isRepeatable]);

  return (
    <section className="w-full space-y-6">
      <MySelect
        label="Antecedência de Agendamento"
        className="text-base text-black"
        value={String(convertToTimeString(hoursBeforeSchedule))}
        onValueChange={(value) =>
          setAdventureData({
            hoursBeforeSchedule: convertToHours(value),
          })
        }
      >
        <SelectTrigger className="py-6 my-1">
          <SelectValue placeholder="Selecione o número de dias" />
        </SelectTrigger>
        <SelectContent>
          {days.map((day) => (
            <SelectItem key={day} value={day}>
              {day}
            </SelectItem>
          ))}
        </SelectContent>
      </MySelect>

      <MySelect
        name="daysBeforeCancellation"
        label="Antecedência de Cancelamento"
        className="text-base text-black"
        value={String(convertToTimeString(hoursBeforeCancellation))}
        onValueChange={(value) =>
          setAdventureData({
            hoursBeforeCancellation: convertToHours(value),
          })
        }
      >
        <SelectTrigger className="py-6 my-1">
          <SelectValue placeholder="Selecione o número de dias" />
        </SelectTrigger>
        <SelectContent>
          {days.map((day) => (
            <SelectItem key={day} value={day}>
              {day}
            </SelectItem>
          ))}
        </SelectContent>
      </MySelect>

      <div>
        {/* <MyTypography variant="subtitle3" weight="bold" className="mb-3">
          Repetir a atividade
        </MyTypography> */}

        <MySelect
          label="Calendário da atividade"
          className="text-base text-black"
          value={isRepeatable == true ? "true" : "false"}
          onValueChange={(value) =>
            setAdventureData({
              isRepeatable: value === "true",
            })
          }
        >
          <SelectTrigger className="py-6 my-1">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Repetir a atividade</SelectItem>
            <SelectItem value="false">Datas específicas</SelectItem>
          </SelectContent>
        </MySelect>

        <div className="space-y-4">
          {isRepeatable ? (
            <div className="space-y-8 flex flex-col items-center mt-8">
              {selectionBlocks.map((block, index) => (
                <div
                  key={block.id}
                  className="w-full border px-6 first:py-4 py-8 rounded-lg space-y-4 relative"
                >
                  <MultiSelect
                    placeholder="Selecione dias da semana"
                    options={daysOfWeek}
                    selected={block.recurrenceWeekly}
                    setSelected={(value) =>
                      updateSelectionBlock(block.id, "recurrenceWeekly", value)
                    }
                  />

                  <MultiSelect
                    grid
                    placeholder="Selecione os horários"
                    options={hours}
                    duration={duration}
                    selected={block.recurrenceHour}
                    setSelected={(value) =>
                      updateSelectionBlock(block.id, "recurrenceHour", value)
                    }
                  />
                  {index > 0 && (
                    <MyIcon
                      name="subtracao"
                      title="Remover"
                      className="absolute -top-3 right-1"
                      onClick={() => removeSelectionBlock(block.id)}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8 flex flex-col items-center mt-8">
              {selectionBlocks.map((block, index) => (
                <div
                  key={block.id}
                  className="w-full border px-6 first:py-4 py-8 rounded-lg space-y-4 relative"
                >
                  <MySingleDatePicker
                    withlabel="Selecione dias específicos"
                    selectedDates={block.dates}
                    setSelectedDates={(dates) =>
                      handleDateChange(block.id, dates)
                    }
                  />

                  <MultiSelect
                    grid
                    placeholder="Selecione os horários"
                    options={hours}
                    duration={duration}
                    selected={block.recurrenceHour}
                    setSelected={(value) =>
                      updateSelectionBlock(block.id, "recurrenceHour", value)
                    }
                  />
                  {index > 0 && (
                    <MyIcon
                      name="subtracao"
                      title="Remover"
                      className="absolute -top-3 right-1"
                      onClick={() => removeSelectionBlock(block.id)}
                    />
                  )}
                </div>
              ))}

              {/* <MyButton
                variant="secondary"
                borderRadius="squared"
                size="lg"
                className="w-1/2 mx-auto mt-4"
                onClick={(e) => handleAddSelectionBlock(e)}
                leftIcon={<MyIcon name="soma" />}
              >
                Adicionar outro conjunto
              </MyButton> */}
            </div>
          )}

          <MyButton
            variant="secondary"
            borderRadius="squared"
            size="lg"
            className="w-full"
            onClick={(e) => handleAddSelectionBlock(e)}
            leftIcon={<MyIcon name="soma" />}
          >
            Adicionar outro conjunto
          </MyButton>
        </div>
      </div>
    </section>
  );
}
