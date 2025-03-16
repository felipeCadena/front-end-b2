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
import React, { useState } from "react";

export default function Step2() {
  const [selections, setSelections] = useState([{ id: Date.now() }]);

  const addSelection = () => {
    setSelections([...selections, { id: Date.now() }]);
  };

  const removeSelection = (id: number) => {
    setSelections(selections.filter((item) => item.id !== id));
  };

  return (
    <section className="w-full space-y-6">
      <MySelect
        // value={value}
        // onValueChange={setValue}
        label="Antecedência de Agendamento"
        className="text-base text-black"
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
        // value={value}
        // onValueChange={setValue}
        label="Antecedência de Cancelamento"
        className="text-base text-black"
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
          {selections.map((item, index) => (
            <div
              key={item.id}
              className="border px-6 first:py-4 py-8 rounded-lg space-y-4 relative"
            >
              <MultiSelect
                placeholder="Selecione dias da semana"
                options={daysOfWeek}
              />
              <MyDatePicker withlabel="Selecione dias específicos" />
              <MultiSelect
                grid
                placeholder="Selecione os horários"
                options={hours}
              />

              {index > 0 && (
                <MyIcon
                  name="subtracao"
                  title="Remover"
                  className="absolute -top-3 right-1"
                  onClick={() => removeSelection(item.id)}
                />
              )}
            </div>
          ))}

          <MyButton
            variant="secondary"
            borderRadius="squared"
            size="lg"
            className="w-full"
            onClick={addSelection}
            leftIcon={<MyIcon name="soma" />}
          >
            Adicionar outro conjunto
          </MyButton>
        </div>
      </div>
    </section>
  );
}
