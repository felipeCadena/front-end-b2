"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/my-popover";
import MyButton from "../atoms/my-button";
import MyIcon from "../atoms/my-icon";
import { Command, CommandGroup, CommandItem } from "../atoms/my-command";
import { cn } from "@/utils/cn";

type ComboxType = {
  options: { label: string; value: string }[];
  placeholder?: string;
  disabledHours?: string[];
  selected: string[]; // Mantemos os números como string
  setSelected: (values: string[]) => void; // Atualiza os números selecionados
  duration?: string;
};

export default function HoursSelect({
  options,
  placeholder,
  selected,
  duration,
  setSelected,
}: ComboxType) {
  const [open, setOpen] = React.useState(false);
  const [disabledTimes, setDisabledTimes] = React.useState<string[]>([]);

  function parseDuration(duration?: string): number {
    if (!duration) return 0;
    console.log(parseFloat(duration.split(":")[0]));
    return parseFloat(duration.split(":")[0]);
  }

  // Alternar seleção do item
  const toggleSelection = (value: string) => {
    let updated: string[];

    if (selected.includes(value)) {
      // Remove se já estiver selecionado
      updated = selected.filter((item) => item !== value);
    } else {
      // Adiciona se não estiver selecionado
      updated = [...selected, value];
    }

    setSelected(updated);

    console.log(updated);

    // === Aqui começa o cálculo das horas a desabilitar ===
    const dur = parseDuration(duration); // ex: "2h" → 2

    const blocked = new Set<string>();

    updated.forEach((val) => {
      const [hourStr, minuteStr] = val.split(":");
      const startHour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);

      for (let i = 1; i < dur; i++) {
        const nextHour = startHour + i;
        if (nextHour < 24) {
          const nextTime = `${String(nextHour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
          blocked.add(nextTime);
        }
      }
    });

    // Agora você pode usar esse array para aplicar estilos
    const disabledArray = Array.from(blocked);
    console.log("Horas desabilitadas:", disabledArray);
    // Salve em estado se quiser, por exemplo:
    setDisabledTimes(disabledArray);
  };

  const isVisible = React.useMemo(() => {
    return selected.filter((item) =>
      options.some((option) => option.value === item)
    );
  }, [options, selected]);

  console.log(selected);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <MyButton
          variant="text-black"
          borderRadius="squared"
          size="md"
          className="w-full justify-between border border-gray-300"
        >
          {isVisible?.length > 0 ? (
            isVisible.join(", ").slice(0, 20).concat("...")
          ) : (
            <span className="text-neutral-400">
              {placeholder ?? "Selecione"}
            </span>
          )}
          <MyIcon name="chevron-down" className="opacity-90" />
        </MyButton>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandGroup>
            {
              <div className={cn("grid grid-cols-4 gap-4 p-4")}>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleSelection(option.value)}
                    className={cn(
                      "flex items-center justify-center p-2 border rounded-md cursor-pointer",
                      selected?.includes(option.value) &&
                        "bg-primary-600 text-white",
                      disabledTimes &&
                        disabledTimes.includes(option.value) &&
                        "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </div>
            }
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
