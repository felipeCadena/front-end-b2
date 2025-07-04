"use client";

import React from "react";
import MyTextInput from "../atoms/my-text-input";
import MyIcon from "../atoms/my-icon";
import MyButton from "../atoms/my-button";
import { cn } from "@/utils/cn";
import { useQuery } from "@tanstack/react-query";
import { adventures } from "@/services/api/adventures";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchActivity({
  className,
  setFormData,
}: {
  className?: string;
  setFormData: (adventures: any) => void;
}) {
  const [chips, setChips] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState("");

  const debouncedValue = useDebounce(search, 700);

  const { data: filterAdventure } = useQuery({
    queryKey: ["filterAdventure", debouncedValue],
    queryFn: async () => {
      const search = await adventures.filterAdventures({ q: debouncedValue });

      if (search?.length === 0) {
        const city = await adventures.filterAdventures({
          city: debouncedValue,
        });
        return city;
      }
      return search;
    },
    enabled: Boolean(debouncedValue),
  });

  const handleSearch = () => {
    setFormData(filterAdventure ?? []);
    setSearch("");
  };

  return (
    <section className={cn("mt-2 md:w-2/3 md:mx-auto max-sm:px-4", className)}>
      <MyTextInput
        placeholder="Procurar atividade"
        noHintText
        withButton
        leftIcon={<MyIcon name="search" className="md:ml-2 max-sm:hidden" />}
        className="max-sm:pl-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        rightIcon={
          <>
            <MyIcon
              name="search"
              className="mr-4 md:hidden"
              onClick={handleSearch}
            />
            <MyButton
              variant="default"
              size="md"
              borderRadius="squared"
              className="mr-24 max-sm:hidden"
              onClick={handleSearch}
            >
              Pesquisar
            </MyButton>
          </>
        }
      />
    </section>
  );
}
