"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/my-popover";
import MyButton from "../atoms/my-button";
import MyIcon from "../atoms/my-icon";
import { Command, CommandGroup, CommandItem, CommandSeparator } from "../atoms/my-command";
import { cn } from "@/utils/cn";

type ComboxType = {
  options: { label: string; value: string }[]
  placeholder?: string
  grid?: boolean
}

export default function MultiSelect({ options, placeholder, grid }: ComboxType) {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const toggleSelection = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <Popover  open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <MyButton variant="text-muted" borderRadius="squared" size="md" className="w-full justify-between border border-gray-300">
          {selected.length > 0
            ? selected.map((val) => options.find((o) => o.value === val)?.label).join(", ").slice(0, 30).concat("...")
            : placeholder ?? "Selecione"}
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
                    selected.includes(option.value) && "bg-primary-600 text-white"
                  )}
                >
                  {option.label}
                </CommandItem>
              ))}
            </div>
            ): (
              options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => toggleSelection(option.value)}
                  className={cn("flex", selected.includes(option.value) && "bg-primary-600")}
                >
                  {option.label}
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
