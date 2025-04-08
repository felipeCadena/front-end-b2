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
import { Recurrence, useAdventureStore } from "@/store/useAdventureStore";
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
  } = useAdventureStore();

  const [selections, setSelections] = useState([{ id: Date.now() }]);

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
        if (block.dates.length > 0) {
          recurrence.recurrenceMonthly = block.dates
            .map((date) => format(date, "dd"))
            .map((day) => parseInt(day))
            .sort((a, b) => a - b)
            .join(",");
        }

        // Só adiciona a recorrência se tiver pelo menos um tipo de recorrência
        if (recurrence.recurrenceWeekly || recurrence.recurrenceMonthly) {
          formattedRecurrences.push(recurrence);
        }
      }
    });

    return formattedRecurrences;
  };

  // Atualiza o store quando necessário
  useEffect(() => {
    const formattedRecurrences = formatRecurrences();
    console.log("Blocos de seleção:", selectionBlocks);
    console.log("Recorrências formatadas:", formattedRecurrences);

    setAdventureData({
      isRepeatable: formattedRecurrences.length > 0,
      recurrences: formattedRecurrences, // Agora salvamos as recorrências já formatadas
    });
  }, [selectionBlocks]);

  return (
    <section className="w-full space-y-6">
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
        <MyTypography variant="subtitle3" weight="bold" className="mb-3">
          Repetir a atividade
        </MyTypography>

        <div className="space-y-4">
          {selectionBlocks.map((block, index) => (
            <div
              key={block.id}
              className="border px-6 first:py-4 py-8 rounded-lg space-y-4 relative"
            >
              <MultiSelect
                placeholder="Selecione dias da semana"
                options={daysOfWeek}
                selected={block.recurrenceWeekly}
                setSelected={(value) =>
                  updateSelectionBlock(block.id, "recurrenceWeekly", value)
                }
              />

              <MyDatePicker
                withlabel="Selecione dias específicos"
                selectedDates={block.dates}
                setSelectedDates={(dates) => handleDateChange(block.id, dates)}
              />

              <MultiSelect
                grid
                placeholder="Selecione os horários"
                options={hours}
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
