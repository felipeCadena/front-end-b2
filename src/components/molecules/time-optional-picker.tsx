"use client";

import React, { useEffect, useRef, useState } from "react";
import MyButton from "../atoms/my-button";
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/my-popover";
import { cn } from "@/utils/cn";
import MyTypography from "../atoms/my-typography";
import { MyScrollArea } from "../atoms/my-scroll-area";
import Time from "../atoms/my-icon/elements/time";

interface TimePickerModalProps {
  iconColor?: string;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  availableActivityTimes?: string[];
  className?: string;
}

export default function TimePickerOptional({
  iconColor,
  selectedTime,
  setSelectedTime,
  availableActivityTimes = [],
  className,
}: TimePickerModalProps) {
  const [open, setOpen] = useState(false);
  const [initialTime, setInitialTime] = useState("");

  const timeRef = useRef<HTMLDivElement>(null);

  // Scroll para a seleção atual quando o popover abre
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (timeRef.current) {
          const selectedElement = timeRef.current.querySelector(
            `[data-value="${selectedTime}"]`
          );
          selectedElement?.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [open, selectedTime]);

  useEffect(() => {
    setInitialTime(""); // limpa o horário inicial, apenas para evitar comparações visuais
  }, [availableActivityTimes]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <MyButton
          variant="date"
          borderRadius="squared"
          className="w-full justify-start text-sm items-center gap-2 py-6 border-gray-300 md:bg-white disabled:bg-slate-100"
          disabled={availableActivityTimes.length === 0}
        >
          <Time fill={iconColor ?? "#8DC63F"} />
          {availableActivityTimes.length !== 0 &&
          selectedTime !== initialTime ? (
            <span className={cn("text-black", className)}>
              {/* {selectedTime !== initialTime */}
              {selectedTime}
              {/* : "Horário da Atividade"} */}
            </span>
          ) : (
            <MyTypography
              variant="body-big"
              weight="regular"
              // lightness={500}
              className="text-gray-400 text-base"
            >
              Horário da Atividade
            </MyTypography>
          )}
        </MyButton>
      </PopoverTrigger>
      <PopoverContent
        className="bg-white flex flex-col items-center max-w-[240px]"
        align="center"
      >
        <div className="flex justify-center items-center w-full">
          <MyScrollArea
            ref={timeRef}
            className="h-48 w-36 flex items-center justify-center rounded-lg overflow-hidden"
          >
            <div className="flex flex-col justify-center items-center min-h-48 w-full ">
              {availableActivityTimes?.map((time, i) => {
                return (
                  <div
                    key={`${time} - ${i}`}
                    data-value={time}
                    className={cn(
                      `text-center py-[9px] w-full cursor-pointer transition-all`,
                      selectedTime === time
                        ? "border border-primary-600 rounded-md"
                        : "opacity-80"
                    )}
                    onClick={() =>
                      setSelectedTime(selectedTime === time ? "" : time)
                    }
                  >
                    {time}
                  </div>
                );
              })}
            </div>
          </MyScrollArea>
        </div>
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
