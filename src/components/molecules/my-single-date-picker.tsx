"use client";

import * as React from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/my-popover";
import MyButton from "../atoms/my-button";
import { cn } from "@/utils/cn";
import MyIcon from "../atoms/my-icon";
import { MyCalendar } from "./my-calendar";
import { ptBR } from "date-fns/locale/pt-BR";
import MyTypography from "../atoms/my-typography";

type MySingleDatePickerProps = {
  withlabel?: string;
  selectedDates: Date[]; // Continua sendo array por compatibilidade
  setSelectedDates: (dates: Date[]) => void;
};

export function MySingleDatePicker({
  withlabel,
  selectedDates,
  setSelectedDates,
}: MySingleDatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleDateSelect = (dates?: Date[]) => {
    if (!dates) return;
    setSelectedDates(dates);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <MyButton
          variant="date"
          borderRadius="squared"
          className={cn(
            "w-full justify-start text-sm items-center gap-2 py-6 border-gray-300 md:bg-white"
          )}
        >
          {!withlabel && <MyIcon name="date" />}
          {withlabel ? (
            selectedDates && selectedDates.length > 0 ? (
              selectedDates
                .map((date) => format(date, "dd/MM/yyyy", { locale: ptBR }))
                .slice(0, 3)
                .join(", ")
                .concat("...")
            ) : (
              // {selectedDates.length > 3 && ", ..."}
              <MyTypography
                variant="body"
                weight="regular"
                lightness={400}
                className="text-sm ml-2"
              >
                {withlabel}
              </MyTypography>
            )
          ) : selectedDates && selectedDates.length > 0 ? (
            selectedDates
              .map((date) => format(date, "dd/MM/yyyy", { locale: ptBR }))
              .slice(0, 3)
              .join(", ")
              .concat("...")
          ) : (
            <MyTypography variant="body" weight="regular" className="text-sm">
              Data da Atividade
            </MyTypography>
          )}
        </MyButton>
      </PopoverTrigger>
      <PopoverContent
        className="w-full bg-white flex flex-col items-center"
        align="center"
      >
        <MyCalendar
          mode="multiple"
          selected={selectedDates}
          onSelect={handleDateSelect}
          locale={ptBR}
          className="capitalize"
        />
        <MyButton
          variant="default"
          size="md"
          borderRadius="squared"
          className="my-2"
          onClick={() => setOpen(false)}
        >
          Ok
        </MyButton>
      </PopoverContent>
    </Popover>
  );
}
