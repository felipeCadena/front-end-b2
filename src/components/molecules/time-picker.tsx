"use client";

import React, { useEffect, useRef, useState } from "react";
import MyButton from "../atoms/my-button";
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/my-popover";
import { cn } from "@/utils/cn";
import MyTypography from "../atoms/my-typography";
import { MyScrollArea } from "../atoms/my-scroll-area";
import Time from "../atoms/my-icon/elements/time";
import { toast } from "react-toastify";

interface TimePickerModalProps {
  iconColor?: string;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  availableActivityTimes?: string[];
  className?: string;
}

export default function TimePickerModal({
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

  // useEffect(() => {
  //   if (availableActivityTimes.length > 0 && selectedTime === "") {
  //     setInitialTime(availableActivityTimes[0]);
  //     setSelectedTime(availableActivityTimes[0]);
  //   }
  //   if (
  //     availableActivityTimes.length > 0 &&
  //     availableActivityTimes[0] !== initialTime
  //   ) {
  //     setInitialTime(availableActivityTimes[0]);
  //     setSelectedTime(availableActivityTimes[0]);
  //   }
  // }, [availableActivityTimes, selectedTime]);

  const handleOpen = () => {
    if (availableActivityTimes.length === 0) {
      toast.error("Selecione uma data antes de escolher o horário");
      return;
    }
    setOpen(true);
  };

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <MyButton
          variant="date"
          borderRadius="squared"
          className="w-full justify-start text-sm items-center gap-2 py-6 border-gray-300 md:bg-white "
          // disabled={availableActivityTimes.length === 0}
        >
          <Time fill={iconColor ?? "#8DC63F"} />
          {availableActivityTimes.length !== 0 && selectedTime ? (
            <span className={cn("text-black", className)}>{selectedTime}</span>
          ) : (
            <MyTypography
              variant="body-big"
              weight="regular"
              className="text-gray-400 text-base"
            >
              Horário da Atividade
            </MyTypography>
          )}
        </MyButton>
      </PopoverTrigger>
      <PopoverContent
        className="bg-white flex flex-col items-center max-w-[260px]"
        align="center"
      >
        <div className="flex justify-center items-center w-full">
          <MyScrollArea
            ref={timeRef}
            className="h-48 w-40 flex items-center justify-center rounded-lg overflow-hidden"
          >
            <p className="text-sm font-semibold text-center">
              Horários Disponíveis
            </p>
            <div className="flex flex-col justify-center items-center min-h-48 w-[80%] mx-auto">
              {availableActivityTimes?.map((time, i) => (
                <div
                  key={`${time} - ${i}`}
                  data-value={time}
                  className={cn(
                    `text-center py-[9px] w-full cursor-pointer transition-all`,
                    selectedTime === time
                      ? "border border-primary-600 rounded-md"
                      : "opacity-50"
                  )}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </div>
              ))}
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
