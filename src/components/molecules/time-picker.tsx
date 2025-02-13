"use client";

import React, { useEffect, useRef, useState } from "react";
import MyButton from "../atoms/my-button";
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/my-popover";
import { cn } from "@/utils/cn";
import MyIcon from "../atoms/my-icon";
import MyTypography from "../atoms/my-typography";
import { MyScrollArea } from "../atoms/my-scroll-area";

export default function TimePickerModal() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedHour, setSelectedHour] = useState("00");
  const [selectedMinute, setSelectedMinute] = useState("00");

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (hourRef.current) {
          const selectedElement = hourRef.current.querySelector(`[data-value="${selectedHour}"]`);
          selectedElement?.scrollIntoView({ block: "center", behavior: "smooth" });
        }
        if (minuteRef.current) {
          const selectedElement = minuteRef.current.querySelector(`[data-value="${selectedMinute}"]`);
          selectedElement?.scrollIntoView({ block: "center", behavior: "smooth" });
        }
      }, 100);
    }
  }, [open, selectedHour, selectedMinute]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <MyButton variant="date" borderRadius="squared" className="w-full justify-start text-sm items-center gap-2 py-6 border-gray-300 md:bg-white">
          <MyIcon name="time" />
          {visible && selectedHour && selectedMinute ? (
            selectedHour + ":" + selectedMinute
          ) : (
            <MyTypography variant="body" weight="regular" className="text-sm">
              Horário da Atividade
            </MyTypography>
          )}
        </MyButton>
      </PopoverTrigger>
      <PopoverContent className="w-full bg-white flex flex-col items-center" align="center">
        <div className="flex justify-center items-center w-full">
          <MyScrollArea ref={hourRef} className="h-48 w-36 flex items-center justify-center rounded-lg overflow-hidden">
            <div className="flex flex-col items-center w-full">
              {hours.map((hour) => (
                <div
                  key={hour}
                  data-value={hour}
                  className={cn(`text-center py-4 w-full cursor-pointer transition-all`, selectedHour === hour ? "border border-primary-600 rounded-md" : "opacity-50")}
                  onClick={() => {setSelectedHour(hour); setVisible(true)}}
                >
                  {hour}
                </div>
              ))}
            </div>
          </MyScrollArea>
          <span className="text-2xl mx-3">:</span>
          <MyScrollArea ref={minuteRef} className="h-48 w-36 flex items-center justify-center rounded-lg overflow-hidden">
            <div className="flex flex-col items-center w-full">
              {minutes.map((minute) => (
                <div
                  key={minute}
                  data-value={minute}
                  className={cn(`text-center py-4 w-full cursor-pointer transition-all`, selectedMinute === minute ? "border border-primary-600 rounded-md" : "opacity-50")}
                  onClick={() => {setSelectedMinute(minute); setVisible(true)}}
                >
                  {minute}
                </div>
              ))}
            </div>
          </MyScrollArea>
        </div>
        <MyButton variant="default" size="md" borderRadius="squared" className="my-2" onClick={() => setOpen(false)}>
          Ok
        </MyButton>
      </PopoverContent>
    </Popover>
  );
}
