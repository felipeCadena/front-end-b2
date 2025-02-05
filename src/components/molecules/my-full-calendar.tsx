"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/utils/cn";
import { ptBR } from "react-day-picker/locale";
import { format, parseISO, isSameDay } from "date-fns";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function MyFullCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [isDesktop, setIsDesktop] = React.useState<boolean>(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const activitiesBooked = [
    {
      date: "2025-02-06",
      activities: [
        {
          name: "Atividade 1",
          activityName: "Escalada Cristo",
          time: "08:00 - 09:00",
          color: "bg-primary-600",
        },
        {
          name: "Atividade 2",
          activityName: "Surfe",
          time: "09:00 - 10:00",
          color: "bg-accent",
        },
      ],
    },
    {
      date: "2025-02-22",
      activities: [
        {
          name: "Atividade 3",
          activityName: "Parapente",
          time: "08:00 - 09:00",
          color: "bg-primary-600",
        },
        {
          name: "Atividade 4",
          activityName: "Mergulho",
          time: "15:00 - 16:00",
          color: "bg-accent",
        },
      ],
    },
  ];

  return (
    <div>
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("md:flex md:justify-center", className)}
      ISOWeek={true}
      locale={ptBR}
      formatters={{
        formatWeekdayName: (weekday) => {
          const fullName = weekday.toLocaleDateString("pt-BR", { weekday: "long" });
          return isDesktop
            ? fullName.replace("-feira", "").split(" ")[0]
            : fullName.substring(0, 3);
        },
        formatCaption: (month) => {
          return `${format(month, "MMMM", { locale: ptBR })}
          ${format(month, "yyyy", { locale: ptBR })}`;
        },
        formatDay: (day) => {
          return format(day, "d", { locale: ptBR });
        }
      }}
      modifiers={{
        // hasActivity: activitiesBooked.map((act) => parseISO(act.date)),
        booked: activitiesBooked.map((act) => parseISO(act.date)),
        
      }}
      modifiersClassNames={{
        booked: "bg-primary-800 rounded-lg border border-primary-600 text-primary-600",

      }}
      onDayClick={(date, modifiers) => {
        if (modifiers.booked) {
          alert("This day is already booked.");
        }
      }}
      styles={{
        months: { display: "flex", justifyContent: "center", width: "100%" },
        day: { width: "48px", height: "48px", textAlign: "center" },
        day_button: { margin: "4px 0" },
        weekday: { width: "72px", textAlign: "center" },  
      }}
      classNames={{
        root: "",
        button_next: "absolute right-1 top-2 md:right-1/3 border rounded-lg p-2",
        button_previous: "absolute left-1 top-2 md:left-1/3 border rounded-lg p-2",
        months: "flex flex-col mt-1",
        month: "space-y-4 text-center",
        caption: "flex justify-center relative items-center",
        caption_label: "whitespace-pre-line text-center font-semibold text-lg",
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
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          "h-8 w-8 md:py-8",
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-white text-primary-600 hover:bg-primary-600 hover:text-white focus:bg-primary-600 focus:text-white",
        // day_today: "bg-primary-600 text-white",
        today: "text-primary-600",
        day_disabled: "text-[#929292] opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        selected: "bg-primary-600 text-white rounded-md",
        weekday: "font-normal text-[#929292] md:text-primary-600 md:font-semibold opacity-80 pt-6",
        outside: "text-[#929292] opacity-50",
        disabled: "text-[#929292] opacity-50",
        month_grid: "w-full", 
        ...classNames,
      }}
      {...props}
    />
    </div>

  );
}
MyFullCalendar.displayName = "Full Calendar";

export { MyFullCalendar };
