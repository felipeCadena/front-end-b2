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
}

export default function TimePickerModal({
  iconColor,
  selectedTime,
  setSelectedTime,
}: TimePickerModalProps) {
  const [open, setOpen] = useState(false);

  // Converte o valor (ex: "2h30") para hora e minuto
  const parseValue = (val: string) => {
    if (!val) return { hour: "00", minute: "00" };
    const match = val.match(/(\d+):(?:(\d+))?/);
    if (!match) return { hour: "00", minute: "00" };

    const hour = match[1].padStart(2, "0");
    const minutes = (match[2] || "0").padStart(2, "0");
    return { hour, minute: minutes };
  };

  const { hour: initialHour, minute: initialMinute } = parseValue(selectedTime);
  const [selectedHour, setSelectedHour] = useState(initialHour);
  const [selectedMinute, setSelectedMinute] = useState(initialMinute);

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  // Atualiza a seleção quando o valor externo muda
  useEffect(() => {
    const { hour, minute } = parseValue(selectedTime);
    setSelectedHour(hour);
    setSelectedMinute(minute);
  }, [selectedTime]);

  // Formata e envia o valor quando a seleção muda
  useEffect(() => {
    if (selectedHour && selectedMinute) {
      const hour = parseInt(selectedHour);
      const minute = parseInt(selectedMinute);
      // Só inclui os minutos se forem maiores que zero
      const formattedValue = minute > 0 ? `${hour}:${minute}` : `${hour}:00`;
      setSelectedTime(formattedValue);
    }
  }, [selectedHour, selectedMinute]);

  // Scroll para a seleção atual quando o popover abre
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (hourRef.current) {
          const selectedElement = hourRef.current.querySelector(
            `[data-value="${selectedHour}"]`
          );
          selectedElement?.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        }
        if (minuteRef.current) {
          const selectedElement = minuteRef.current.querySelector(
            `[data-value="${selectedMinute}"]`
          );
          selectedElement?.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [open, selectedHour, selectedMinute]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <MyButton
          variant="date"
          borderRadius="squared"
          className="w-full justify-start text-sm items-center gap-2 py-6 border-gray-300 md:bg-white"
        >
          <Time fill={iconColor ?? "#8DC63F"} />
          {selectedTime ? (
            <span className="text-black">
              {parseInt(selectedMinute) > 0
                ? `${parseInt(selectedHour)}:${selectedMinute}`
                : `${parseInt(selectedHour)}:00`}
            </span>
          ) : (
            <MyTypography
              variant="body"
              weight="regular"
              lightness={500}
              className={cn(
                "text-sm",
                iconColor ? `text-neutral-400` : "text-black"
              )}
            >
              Duração da Atividade
            </MyTypography>
          )}
        </MyButton>
      </PopoverTrigger>
      <PopoverContent
        className="w-full bg-white flex flex-col items-center"
        align="center"
      >
        <div className="flex justify-center items-center w-full">
          <MyScrollArea
            ref={hourRef}
            className="h-48 w-36 flex items-center justify-center rounded-lg overflow-hidden"
          >
            <div className="flex flex-col items-center w-full">
              <p className="mb-2 font-semibold">Hora</p>
              {hours.map((hour) => (
                <div
                  key={hour}
                  data-value={hour}
                  className={cn(
                    `text-center py-4 w-full cursor-pointer transition-all`,
                    selectedHour === hour
                      ? "border border-primary-600 rounded-md"
                      : "opacity-50"
                  )}
                  onClick={() => setSelectedHour(hour)}
                >
                  {hour}
                </div>
              ))}
            </div>
          </MyScrollArea>
          <span className="text-2xl mx-3">:</span>
          <MyScrollArea
            ref={minuteRef}
            className="h-48 w-36 flex items-center justify-center rounded-lg overflow-hidden"
          >
            <div className="flex flex-col items-center w-full">
              <p className="mb-2 font-semibold">Minutos</p>
              {minutes.map((minute) => (
                <div
                  key={minute}
                  data-value={minute}
                  className={cn(
                    `text-center py-4 w-full cursor-pointer transition-all`,
                    selectedMinute === minute
                      ? "border border-primary-600 rounded-md"
                      : "opacity-50"
                  )}
                  onClick={() => setSelectedMinute(minute)}
                >
                  {minute}
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
