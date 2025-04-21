"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import type { DayPickerProps } from "react-day-picker";
import { cn } from "@/utils/cn";
import { ptBR, se } from "react-day-picker/locale";
import { format, isSameDay, parseISO } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import { schedules } from "@/services/api/schedules";
import { toast } from "react-toastify";
import { partnerService } from "@/services/api/partner";
import { useParams } from "next/navigation";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  MyDropdownMenu,
} from "../atoms/my-drop-menu";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  MyDialog,
} from "../molecules/my-dialog";
import MyButton from "../atoms/my-button";

type CalendarProps = {
  markedDates?: Date[];
  formData: any;
  className?: string;
} & Omit<DayPickerProps, "mode" | "selected" | "onSelect">;

function CalendarAvailability({
  formData,
  showOutsideDays = true,
  classNames,
  className,
  ...props
}: CalendarProps) {
  const [isDesktop, setIsDesktop] = React.useState<boolean>(false);
  const { id } = useParams();

  const allDates = formData?.schedules
    .flatMap((item) => item?.dates || [])
    .filter(Boolean);

  const [selected, setSelected] = React.useState<Date | undefined>(undefined);
  const [dates, setDates] = React.useState<Date[]>(allDates ?? []);

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined
  );
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [dateAvailable, setDateAvailable] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useQuery({
    queryKey: ["allSchedulesByActivity"],
    queryFn: async () => {
      const reservations = await partnerService.getMySchedules({
        adventureId: id as string,
      });
      console.log(reservations);
      if (reservations) {
        const bookedDates = reservations.map((item: any) =>
          parseISO(item.datetime)
        );
        setDates(bookedDates);
      }
      return reservations ?? [];
    },
  });

  console.log(allDates);
  console.log(formData);

  const isDateAvailable = (date: Date) => {
    return dates.some(
      (d) => format(d, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  };

  const handleAvailabilityChange = async (selected: any) => {
    if (!selected) {
      toast.error("Selecione uma data disponível");
      return;
    }

    const isAvailable = !isDateAvailable(selected);
    console.log("selected", selected);
    console.log("isAvailable", isAvailable);

    const schedule = {
      datetime: selected.toISOString(),
      isAvailable: true,
    };

    console.log(schedule);

    // const avaliable = await partnerService.createSchedule(Number(id), schedule);
  };

  const handleDayClick = (date: Date, modifiers: any, e: React.MouseEvent) => {
    e.preventDefault();
    setSelected(date);
    setSelectedDate(date);
    setDateAvailable(modifiers.booked || false);
    setIsDialogOpen(true);
  };

  return (
    <div className="">
      <DayPicker
        mode="single"
        selected={selected}
        onDayClick={handleDayClick}
        showOutsideDays={showOutsideDays}
        className={cn("md:flex md:justify-center", className)}
        ISOWeek={true}
        locale={ptBR}
        formatters={{
          formatWeekdayName: (weekday) => {
            const fullName = weekday.toLocaleDateString("pt-BR", {
              weekday: "long",
            });
            return isDesktop
              ? fullName.replace("-feira", "")
              : fullName.substring(0, 3);
          },
          formatCaption: (month) => {
            return `${format(month, "MMMM", { locale: ptBR })}
            ${format(month, "yyyy", { locale: ptBR })}`;
          },
          formatDay: (day) => {
            return format(day, "d", { locale: ptBR });
          },
        }}
        modifiers={{
          booked: dates.map((act) => act),
          // selected: selected,
          // disabled: (date) => !isDateAvailable(date),
        }}
        modifiersClassNames={{
          booked: "rounded-lg bg-primary-600 text-white relative",
          selected: "rounded-lg bg-primary-800 text-primary-600 relative",
        }}
        styles={{
          months: {
            display: "flex",
            justifyContent: "center",
            width: "100%",
            textTransform: "capitalize",
          },
          day: { width: "40px", height: "40px" },
          weekday: { width: "40px", textTransform: "capitalize" },
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
          root: "",
          button_next:
            "absolute right-1 top-2 md:right-1/3 border rounded-lg p-2",
          button_previous:
            "absolute left-1 top-2 md:left-1/3 border rounded-lg p-2",
          months: "flex flex-col mt-1",
          month: "space-y-4 text-center",
          caption: "flex justify-center relative items-center",
          caption_label:
            "whitespace-pre-line text-center font-semibold text-lg",
          nav: "flex items-center justify-between",
          nav_button: cn(
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-4 bottom-4",
          nav_button_next: "absolute right-4",
          table: "w-full border-collapse",
          head_row: "flex justify-between",
          row: "flex justify-between w-full",
          cell: cn(
            "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
            "[&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
            "[&:has([aria-selected])]:rounded-md"
          ),
          day: cn("h-6 w-6 md:py-4"),
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
          weekday:
            "font-normal text-[#929292] md:text-primary-600 md:font-semibold opacity-80 pt-6",
          outside: "text-[#929292] opacity-50",
          disabled: "text-[#929292] opacity-50",
          month_grid: "w-full",
          ...classNames,
        }}
        {...props}
      />

      <MyDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              <p className="mt-2 text-gray-600">
                {isDateAvailable(selectedDate || new Date())
                  ? "Deseja tornar esta data indisponível?"
                  : "Deseja tornar esta data disponível?"}
              </p>
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p className="text-gray-700">
              Data: {format(selectedDate || new Date(), "dd/MM/yyyy")}
            </p>
          </div>

          <DialogFooter>
            <div className="flex gap-2 w-full">
              <MyButton
                variant="outline-neutral"
                borderRadius="squared"
                size="lg"
                className="w-full"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </MyButton>
              <MyButton
                variant="default"
                borderRadius="squared"
                size="lg"
                className="w-full"
                onClick={() => handleAvailabilityChange(selectedDate)}
              >
                Confirmar
              </MyButton>
            </div>
          </DialogFooter>
        </DialogContent>
      </MyDialog>
    </div>
  );
}

CalendarAvailability.displayName = "Full Calendar";

export { CalendarAvailability };
