"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import type { DayPickerProps } from "react-day-picker";
import { cn } from "@/utils/cn";
import { ptBR } from "react-day-picker/locale";
import { addHours, format, isBefore, startOfDay, startOfMonth } from "date-fns";
import MyIcon from "../atoms/my-icon";
import { before } from "node:test";

type CalendarProps = {
  selected: Date | undefined;
  onSelect: (dates?: Date | undefined) => void;
  markedDates?: Date[];
  markedDays?: Date[];
  hoursBeforeSchedule?: number;
  className?: string;
  initialMonth?: Date;
  onMonthChange?: (month: Date) => void;
} & Omit<DayPickerProps, "mode" | "selected" | "onSelect">;

export function MyActivityCalendar({
  selected,
  onSelect,
  hoursBeforeSchedule = 24,
  markedDates = [],
  markedDays = [],
  showOutsideDays = true,
  classNames,
  className,
  initialMonth,
  onMonthChange,
  ...props
}: CalendarProps) {
  const [isDesktop, setIsDesktop] = React.useState<boolean>(false);
  const [startMonth, setStartMonth] = React.useState<Date>(
    initialMonth || startOfMonth(new Date())
  );

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleDayClick = (date: Date) => {
    onSelect(date);
  };

  return (
    <div>
      <DayPicker
        mode="single"
        selected={selected}
        onDayClick={handleDayClick}
        showOutsideDays={showOutsideDays}
        className={cn("md:flex md:justify-center", className)}
        ISOWeek={true}
        locale={ptBR}
        startMonth={startOfMonth(startMonth)}
        disabled={(date) => {
          const limitDate = addHours(new Date(), hoursBeforeSchedule);

          const isBeforeLimit = isBefore(date, limitDate);

          const isMarkedDate = markedDates.some(
            (thisDate) => thisDate.toDateString() === date.toDateString()
          );
          const isMarkedDay = markedDays?.some(
            (thisDay) => thisDay.toDateString() === date.toDateString()
          );

          return isBeforeLimit || !(isMarkedDay || isMarkedDate);
        }}
        formatters={{
          formatWeekdayName: (weekday) => {
            const fullName = weekday.toLocaleDateString("pt-BR", {
              weekday: "short",
            });
            return isDesktop
              ? fullName.replace("-feira", "").split(" ")[0]
              : fullName.substring(0, 3);
          },
          formatCaption: (month) => {
            const formatedMonth = format(month, "MMMM", { locale: ptBR });
            return `${formatedMonth.charAt(0).toUpperCase() + formatedMonth.slice(1)}
            ${format(month, "yyyy", { locale: ptBR })}`;
          },
          formatDay: (day) => {
            return format(day, "d", { locale: ptBR });
          },
        }}
        modifiers={{
          booked: markedDates.map((act) => act),
          bookedDays: markedDays.map((act) => act),
        }}
        modifiersClassNames={{
          booked: "text-primary-600 relative md:after:top-1/3 md:after:left-20",
          bookedDays:
            "rounded-full text-primary-600 relative md:after:top-1/3 md:after:left-20",
          selected: "bg-primary-600 text-white font-bold ",
        }}
        month={initialMonth}
        onMonthChange={onMonthChange}
        styles={{
          months: { display: "flex", justifyContent: "center", width: "100%" },
          day: { width: "40px", height: "40px" },
          weekday: { width: "40px" },
          caption: { width: "100%" },
          table: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0",
          },
          head_row: {
            display: "flex",
            justifyContent: "space-between",
            width: "280px",
          },
          row: {
            display: "flex",
            justifyContent: "space-between",
            width: "280px",
          },
        }}
        classNames={{
          button_next: "absolute right-4 top-5",
          button_previous: "absolute left-4 top-5",
          months: "flex flex-col",
          month: "space-y-4 text-center h-[350px]",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "font-semibold text-lg",
          nav: "flex items-center justify-between",
          nav_button: cn(
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-4 bottom-4",
          nav_button_next: "absolute right-4",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-[#929292] rounded-md w-8 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: cn(
            "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
            "[&:has([aria-selected])]:rounded-md"
          ),
          day: cn(
            "h-8 w-8 p-3 font-regular text-[#4A4A4A] aria-selected:opacity-100"
          ),
          day_range_start: "day-range-start",
          day_range_end: "day-range-end",
          day_selected:
            "bg-white text-primary-600 hover:bg-primary-600 hover:text-white focus:bg-primary-600 focus:text-white",
          day_today: "bg-primary-600 text-white",
          today: "text-primary-600",
          day_disabled: "text-[#929292] opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          selected: "bg-primary-600 text-[#fff] rounded-md",
          weekday: "font-normal text-[#929292] opacity-80",
          outside: "text-[#929292] opacity-50",
          disabled: "text-[#929292] opacity-50",
          ...classNames,
        }}
        components={{
          PreviousMonthButton: ({ className, ...props }) => (
            <span {...props}>
              <MyIcon
                name="left"
                className={cn("h-4 w-4 cursor-pointer", className)}
              />
            </span>
          ),
          NextMonthButton: ({ className, ...props }) => (
            <span {...props}>
              <MyIcon
                name="right"
                className={cn("h-4 w-4 cursor-pointer", className)}
              />
            </span>
          ),
        }}
        {...props}
      />
    </div>
  );
}

MyActivityCalendar.displayName = "Full Calendar";
