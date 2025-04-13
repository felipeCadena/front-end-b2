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
  grid?: boolean;
  selected: string[]; // Mantemos os números como string
  setSelected: (values: string[]) => void; // Atualiza os números selecionados
};

export default function MultiSelect({
  options,
  placeholder,
  grid,
  selected,
  setSelected,
}: ComboxType) {
  const [open, setOpen] = React.useState(false);

  // Mapeamento para exibir os nomes dos dias corretamente
  const daysMap: Record<string, string> = {
    "1": "Segunda",
    "2": "Terça",
    "3": "Quarta",
    "4": "Quinta",
    "5": "Sexta",
    "6": "Sábado",
    "0": "Domingo",
  };

  // Alternar seleção do item
  const toggleSelection = (value: string) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((item) => item !== value) // Remove se já estiver selecionado
        : [...selected, value] // Adiciona se não estiver selecionado
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <MyButton
          variant="text-black"
          borderRadius="squared"
          size="md"
          className="w-full justify-between border border-gray-300"
        >
          {grid ? (
            selected?.length > 0 ? (
              selected
                .map((val) => options.find((o) => o.value === val)?.label)
                .join(", ")
                .slice(0, 30)
                .concat("...")
            ) : (
              <span className="text-neutral-400">
                {placeholder ?? "Selecione"}
              </span>
            )
          ) : selected?.length > 0 ? (
            selected
              .map((val) => daysMap[val])
              .join(", ")
              .slice(0, 30)
              .concat("...")
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
            {grid ? (
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
            ) : (
              options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => toggleSelection(option.value)}
                  className={cn(
                    "flex justify-center",
                    selected?.includes(option.value) &&
                      "bg-primary-600 text-white"
                  )}
                >
                  {daysMap[option.value]}
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
