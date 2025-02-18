import { dificulties } from "@/common/constants/constants";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import MyTypography from "@/components/atoms/my-typography";
import TimePickerModal from "@/components/molecules/time-picker";
import React from "react";

export default function Step3() {
  return (
    <section className="space-y-6">
      <MySelect
        // value={value}
        // onValueChange={setValue}
        label="Grau de Dificuldade"
        className="text-base text-black"
      >
        <SelectTrigger className="py-6 my-1">
          <SelectValue placeholder="Selecione " />
        </SelectTrigger>
        <SelectContent>
          {dificulties.map((dificulty) => (
            <SelectItem key={dificulty} value={dificulty}>
              {dificulty}
            </SelectItem>
          ))}
        </SelectContent>
      </MySelect>

      <div>
        <MyTypography variant="subtitle3" weight="bold" className="mb-1">
          Duração da atividade
        </MyTypography>
        <TimePickerModal />
      </div>
    </section>
  );
}
