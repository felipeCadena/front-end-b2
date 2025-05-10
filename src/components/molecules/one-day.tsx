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

type OneDayProps = {
  date?: Date;
  setDate?: React.Dispatch<React.SetStateAction<Date | undefined>>;
  withlabel?: string;
};

export function OneDay({ withlabel, date, setDate }: OneDayProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <MyButton
          variant="date"
          borderRadius="squared"
          className={cn(
            "w-full justify-start text-base items-center gap-2 py-6 border-gray-300 md:bg-white"
          )}
        >
          {!withlabel && <MyIcon name="date" />}
          {withlabel ? (
            date ? (
              <span className="text-black">
                {date && format(date, "dd/MM", { locale: ptBR })}
              </span>
            ) : (
              <MyTypography
                variant="body"
                weight="regular"
                lightness={400}
                className="text-sm ml-2"
              >
                {withlabel}
              </MyTypography>
            )
          ) : date ? (
            <span className="text-black">
              {date && format(date, "dd/MM", { locale: ptBR })}
            </span>
          ) : (
            <MyTypography
              variant="body-big"
              weight="regular"
              className="text-base"
            >
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
          mode="single"
          selected={date}
          onSelect={setDate}
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
