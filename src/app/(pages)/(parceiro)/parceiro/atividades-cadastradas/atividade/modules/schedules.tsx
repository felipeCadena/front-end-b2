"use client";

import { daysOfWeek, hours } from "@/common/constants/constants";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import MultiSelect from "@/components/molecules/combobox";
import { MyDatePicker } from "@/components/molecules/my-date-picker";
import { ModalProps } from "@/components/organisms/edit-activity";
import { adventures } from "@/services/api/adventures";
import {
  Recurrence,
  useEditAdventureStore,
} from "@/store/useEditAdventureStore";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

type SelectionBlock = {
  id: string;
  recurrenceWeekly: string[];
  recurrenceHour: string[];
  dates: Date[];
};

type FormDataType = {
  recurrences: {
    block: SelectionBlock;
    index: number;
  }[];
};

export default function Schedules({
  formData,
  setFormData,
  onClose,
}: ModalProps) {
  const addSelectionBlock = () => {
    const newBlock: SelectionBlock = {
      id: crypto.randomUUID(),
      recurrenceWeekly: [],
      recurrenceHour: [],
      dates: [],
    };

    const updatedRecurrences = [
      ...formData.recurrences,
      { ...newBlock, index: formData.recurrences.length },
    ];

    setFormData({ ...formData, recurrences: updatedRecurrences });
  };

  const removeSelectionBlock = (id: string) => {
    const updatedRecurrences = formData.recurrences
      .filter((block: any) => block.groupId !== id)
      .map((item: any) => ({ ...item })); // atualiza o index também

    setFormData({ ...formData, recurrences: updatedRecurrences });
  };

  const updateSelectionBlock = (
    id: string,
    field: keyof SelectionBlock,
    value: any
  ) => {
    const updatedRecurrences = formData.recurrences.map(
      (item: any, index: number) =>
        item.groupId === id
          ? {
              ...item,

              [field]: value,
            }
          : item
    );

    setFormData({ ...formData, recurrences: updatedRecurrences });
  };

  const [isLoading, setIsLoading] = React.useState(false);

  // Função para formatar os dados antes de salvar
  const formatRecurrences = (): Recurrence[] => {
    const formattedRecurrences: Recurrence[] = [];

    formData.recurrences.forEach((block: any) => {
      // Cria uma recorrência por bloco
      if (block.recurrenceHour.length > 0) {
        const recurrence: Recurrence = {
          recurrenceHour: block.recurrenceHour.join(","),
        };

        // Adiciona dias da semana se existirem
        if (block.recurrenceWeekly.length > 0) {
          recurrence.recurrenceWeekly = block.recurrenceWeekly
            .map((day: any) => daysOfWeek.findIndex((d) => d.value === day) + 1)
            .filter((index: any) => index !== -1)
            .sort((a: any, b: any) => a - b)
            .join(",");
        }

        // Adiciona dias do mês se existirem
        if (block.dates.length > 0) {
          recurrence.recurrenceMonthly = block.dates
            .map((date: any) => format(date, "dd"))
            .map((day: any) => parseInt(day))
            .sort((a: any, b: any) => a - b)
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

  const queryClient = useQueryClient();
  const formattedRecurrences = formatRecurrences();
  // console.log("formattedRecurrences", formattedRecurrences);

  const handleSubmit = async () => {
    const formattedRecurrences = formatRecurrences();

    const data = {
      isRepeatable: formattedRecurrences.length > 0,
      recurrences: formattedRecurrences,
    };

    setIsLoading(true);

    try {
      await adventures.updateAdventureById(formData.id, data);

      queryClient.invalidateQueries({ queryKey: ["activity"] });
      toast.success("Atividade atualizada com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar atividade");
      console.error("Error updating adventure:", error);
    }
    setIsLoading(false);
    onClose();
  };

  const handleDateChange = (blockId: string, dates: Date[]) => {
    updateSelectionBlock(blockId, "dates", dates);
  };

  const handleAddSelectionBlock = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addSelectionBlock();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center mb-8">
        <MyIcon name="voltar-black" className="-ml-2" onClick={onClose} />
        <MyTypography variant="subtitle1" weight="bold" className="">
          Editar Horários - Repetição
        </MyTypography>
      </div>

      {formData?.recurrences && formData?.recurrences.length > 0 ? (
        formData?.recurrences.map((block: any, index: number) => (
          <div
            key={index}
            className="w-full md:w-2/3 md:mx-auto border px-6 first:py-4 py-8 rounded-lg space-y-4 relative"
          >
            <MultiSelect
              placeholder="Selecione dias da semana"
              options={daysOfWeek}
              selected={block?.recurrenceWeekly}
              setSelected={(value) =>
                updateSelectionBlock(block.groupId, "recurrenceWeekly", value)
              }
            />

            <MultiSelect
              grid
              placeholder="Selecione os horários"
              options={hours}
              selected={block?.recurrenceHour}
              setSelected={(value) =>
                updateSelectionBlock(block.groupId, "recurrenceHour", value)
              }
            />
            {
              <MyIcon
                name="subtracao"
                title="Remover"
                className="absolute -top-3 right-1"
                onClick={() => removeSelectionBlock(block?.groupId)}
              />
            }
          </div>
        ))
      ) : (
        <MyTypography
          variant="subtitle3"
          weight="bold"
          className="text-center my-2"
        >
          Esta atividade não se repete!
        </MyTypography>
      )}

      <MyButton
        variant="secondary"
        borderRadius="squared"
        size="lg"
        className="w-full md:w-1/2 mx-auto"
        onClick={(e) => handleAddSelectionBlock(e)}
        leftIcon={<MyIcon name="soma" />}
      >
        {formData?.recurrences && formData?.recurrences.length == 0
          ? "Adicionar repeticão"
          : "Adicionar outro conjunto"}
      </MyButton>

      <div className="w-full md:w-1/2 md:mx-auto mt-12">
        <MyButton
          borderRadius="squared"
          size="lg"
          className="w-full"
          onClick={handleSubmit}
          //   isLoading={isLoading}
        >
          Salvar
        </MyButton>
      </div>
    </div>
  );
}
