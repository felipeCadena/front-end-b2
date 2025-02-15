import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import MyTypography from "@/components/atoms/my-typography";
import { MyDatePicker } from "@/components/molecules/my-date-picker";
import React from "react";

export default function Step2() {
  const days = [
    "3 dias",
    "5 dias",
    "7 dias",
    "10 dias",
    "15 dias",
    "20 dias",
    "30 dias",
  ];

  const daysBeforeCancel = [
    "3 dias",
    "5 dias",
    "7 dias",
    "10 dias",
    "15 dias",
    "20 dias",
    "30 dias",
  ];
  return (
    <section className="space-y-6">
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
          {daysBeforeCancel.map((day) => (
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
      <MyDatePicker withlabel="20 - 30 de todo mês" />
      </div>
    </section>
  );
}
