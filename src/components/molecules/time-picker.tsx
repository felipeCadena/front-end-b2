'use client';

import React, { useEffect, useRef, useState } from 'react';
import MyButton from '../atoms/my-button';
import { Popover, PopoverContent, PopoverTrigger } from '../atoms/my-popover';
import { cn } from '@/utils/cn';
import MyTypography from '../atoms/my-typography';
import { MyScrollArea } from '../atoms/my-scroll-area';
import Time from '../atoms/my-icon/elements/time';
import { useQuery } from '@tanstack/react-query';

interface TimePickerModalProps {
  iconColor?: string;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  availableActivityTimes: string[];
}

export default function TimePickerModal({
  iconColor,
  selectedTime,
  setSelectedTime,
  availableActivityTimes,
}: TimePickerModalProps) {
  const [open, setOpen] = useState(false);

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
            block: 'center',
            behavior: 'smooth',
          });
        }
      }, 100);
    }
  }, [open, selectedTime]);

  useEffect(() => {
    if (availableActivityTimes.length > 0 && selectedTime === '') {
      setSelectedTime(availableActivityTimes[0]);
    }
  }, [availableActivityTimes, selectedTime]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <MyButton
          variant="date"
          borderRadius="squared"
          className="w-full justify-start text-sm items-center gap-2 py-6 border-gray-300 md:bg-white disabled:bg-slate-100"
          disabled={availableActivityTimes.length === 0}
        >
          <Time fill={iconColor ?? '#8DC63F'} />
          {availableActivityTimes.length !== 0 ? (
            <span className="text-black">{selectedTime}</span>
          ) : (
            <MyTypography
              variant="body"
              weight="regular"
              lightness={500}
              className={cn(
                'text-sm',
                iconColor ? `text-neutral-400` : 'text-black'
              )}
            >
              Escolha o dia da atividade
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
            ref={timeRef}
            className="h-48 w-36 flex items-center justify-center rounded-lg overflow-hidden"
          >
            <div className="flex flex-col items-center w-full">
              {availableActivityTimes.map((time) => (
                <div
                  key={time}
                  data-value={time}
                  className={cn(
                    `text-center py-4 w-full cursor-pointer transition-all`,
                    selectedTime === time
                      ? 'border border-primary-600 rounded-md'
                      : 'opacity-50'
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
