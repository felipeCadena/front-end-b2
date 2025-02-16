"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/my-popover";
import MyButton from "../atoms/my-button";
import MyIcon from "../atoms/my-icon";
import { Command, CommandGroup, CommandItem, CommandSeparator } from "../atoms/my-command";

type ComboxType = {
  options: { label: string; value: string }[]
  placeholder?: string
}

export default function MultiSelect({ options, placeholder }: ComboxType) {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const toggleSelection = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <MyButton variant="text-muted" borderRadius="squared" size="md" className="w-full justify-between border border-gray-300">
          {selected.length > 0
            ? selected.map((val) => options.find((o) => o.value === val)?.label).join(", ")
            : placeholder ?? "Selecione"}
          <MyIcon name="chevron-down" className="opacity-90" />
        </MyButton>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
              
                key={option.value}
                onSelect={() => toggleSelection(option.value)}
                className="flex items-center justify-between"
              >
                {option.label}
                {selected.includes(option.value) && <MyIcon name="check" className="" />
                }
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
