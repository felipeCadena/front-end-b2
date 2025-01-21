"use client"

import React, { useState, useEffect } from "react"
import Button from "../atoms/my-button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/atoms/my-command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/my-popover"
import { ListCustomerResponse } from "@/services/api/customer-service"
import { useDebounce } from "@/hooks/useDebounce"

type ComboxType = {
  list?: ListCustomerResponse[]
  onChange: (search: string) => Promise<void>
  setSelected: (e: string) => void
}

export function Combobox({ list, onChange, setSelected }: ComboxType) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const debouncedValue = useDebounce(value, 1000);

  useEffect(() => {
    if (debouncedValue) {
      onChange(debouncedValue);
    }
  }, [debouncedValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSelect = (selectedValue: string) => {
    setSelected(selectedValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="border-input flex h-10 w-full items-center justify-between rounded-md border bg-neutral-000 px-3 py-2 text-sm ring-offset-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-neutral-400 [&>span]:line-clamp-1" asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full text-slate-400 justify-between"
        >
          {value
            ? list?.find((item: ListCustomerResponse) => item.nome === value)?.nome
            : "Digite o nome, e-mail, telefone, código ou ID."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="popover-content-width-same-as-its-trigger p-0 top-10">
        <Command>
          <CommandInput
            placeholder="Digite o nome, e-mail, telefone, código ou ID"
            value={value}
            onChangeCapture={handleInputChange}
            className="p-2 w-full border rounded bg-white"
          />
          <CommandList className="bg-white">
            {list?.length === 0 ? (
              <CommandEmpty>Cliente não encontrado</CommandEmpty>
            ) : (
              <CommandGroup>
                {list?.map((item: ListCustomerResponse) => (
                  <CommandItem
                    key={item.id}
                    value={item.nome}
                    onSelect={(currentValue: string) => {
                      setValue(currentValue === value ? "" : currentValue)
                      handleSelect(item.id)
                      setOpen(false)
                    }}
                    className="hover:bg-primary-500"
                  >
                    {item.nome}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}