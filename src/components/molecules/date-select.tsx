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
};

export default function HoursSelect({
  options,
  placeholder,
  selected,
  disabledHours,
  setSelected,
}: ComboxType) {
  const [open, setOpen] = React.useState(false);

  // Alternar seleção do item
  const toggleSelection = (value: string) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((item) => item !== value) // Remove se já estiver selecionado
        : [...selected, value] // Adiciona se não estiver selecionado
    );
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
                        "bg-primary-600 text-white"
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
