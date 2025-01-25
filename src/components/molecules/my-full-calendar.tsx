"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/utils/cn";
import MyIcon from "../atoms/my-icon";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function MyFullCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("", className)}
      ISOWeek={true}
      classNames={{
        button_next: "absolute right-1 top-0 border rounded-lg p-2",
        button_previous: "absolute left-1 top-0 border rounded-lg p-2",
        months: "flex flex-col mt-1",
        month: "space-y-4 text-center",
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
        head_cell:
          "text-[#929292] rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          "h-8 w-8 p-3 font-regular text-[#4A4A4A] aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-white text-primary-600 hover:bg-primary-600 hover:text-white focus:bg-primary-600 focus:text-white",
        day_today: "bg-primary-600 text-white",
        day_disabled: "text-[#929292] opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        selected: "bg-primary-600 text-[#fff] rounded-md",
        weekday: "font-normal text-[#929292] opacity-80 pt-6",
        outside: "text-[#929292] opacity-50",
        disabled: "text-[#929292] opacity-50",
        month_grid: "w-screen",
        ...classNames,
      }}
      {...props}
    />
  );
}
MyFullCalendar.displayName = "Full Calendar";

export { MyFullCalendar };
