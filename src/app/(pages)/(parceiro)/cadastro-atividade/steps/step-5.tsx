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

export default function Step5() {
  return (
    <section className="space-y-6">
      <MySelect
        // value={value}
        // onValueChange={setValue}
        label="Transporte Incluso"
        className="text-base text-black"
      >
        <SelectTrigger className="py-6 my-1">
          <SelectValue placeholder="Selecione " />
        </SelectTrigger>
        <SelectContent className="rounded-lg">
            <SelectItem value="true">Sim</SelectItem>
            <SelectItem value="false">Não Oferecemos</SelectItem>
        </SelectContent>
      </MySelect>

      <MySelect
        // value={value}
        // onValueChange={setValue}
        label="Fotos da atividade inclusa"
        className="text-base text-black"
      >
        <SelectTrigger className="py-6 my-1">
          <SelectValue placeholder="Selecione " />
        </SelectTrigger>
        <SelectContent className="rounded-lg">
        <SelectItem value="true">Sim</SelectItem>
        <SelectItem value="false">Não Oferecemos</SelectItem>
        </SelectContent>
      </MySelect>

    </section>
  )
}
