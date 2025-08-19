"use client";

import React from "react";
import MyTextInput from "../atoms/my-text-input";
import MyIcon from "../atoms/my-icon";
import MyButton from "../atoms/my-button";
import { cn } from "@/utils/cn";
import { useQuery } from "@tanstack/react-query";
import { adventures } from "@/services/api/adventures";
import { useDebounce } from "@/hooks/useDebounce";
import { PriceRangeSlider } from "../molecules/price-range";

export default function SearchActivity({
  className,
  setFormData,
  priceAdult,
}: {
  className?: string;
  priceAdult?: {
    min: string;
    max: string;
  };
  setFormData: (adventures: any) => void;
}) {
  const [search, setSearch] = React.useState("");
  const [openFilter, setOpenFilter] = React.useState(false);
  const [priceRange, setPriceRange] = React.useState([
    Number(priceAdult?.min) ?? 0,
    Number(priceAdult?.max) ?? 10000,
  ]);

  const debouncedValue = useDebounce(search, 700);

  React.useEffect(() => {
    if (priceAdult) {
      setPriceRange([Number(priceAdult.min), Number(priceAdult.max)]);
    }
  }, [priceAdult]);

  const { data: filterAdventure, refetch } = useQuery({
    queryKey: ["filterAdventure", debouncedValue, priceRange],
    queryFn: async () => {
      return adventures.filterAdventures({
        q: debouncedValue || undefined,
        priceAdult:
          priceRange[0] === Number(priceAdult?.min) &&
          priceRange[1] === Number(priceAdult?.max)
            ? undefined
            : `${priceRange[0]},${priceRange[1]}`,
      });
    },
    enabled: false,
  });

  const handleSearch = () => {
    refetch().then((res) => {
      setFormData(res.data ?? []);
      setSearch("");
      setPriceRange([
        Number(priceAdult?.min) ?? 0,
        Number(priceAdult?.max) ?? 10000,
      ]);
    });
  };

  const handleFilter = () => {
    refetch().then((res) => {
      setFormData(res.data ?? []);
      setOpenFilter(false);
      setSearch("");
      setPriceRange([
        Number(priceAdult?.min) ?? 0,
        Number(priceAdult?.max) ?? 10000,
      ]);
    });
  };

  const handleClear = () => {
    setSearch("");
    setPriceRange([
      Number(priceAdult?.min) ?? 0,
      Number(priceAdult?.max) ?? 10000,
    ]);
  };

  return (
    <>
      <section
        className={cn(
          "mt-2 md:w-2/3 md:mx-auto max-sm:px-4 flex items-center gap-4",
          className
        )}
      >

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
        <MyButton
          variant="secondary"
          borderRadius="squared"
          className="max-sm:hidden py-6 px-8 text-black"
          leftIcon={<MyIcon name="filter-muted" />}
          onClick={() => setOpenFilter(true)}
        >
          Filtrar
        </MyButton>

        <MyIcon
          className={cn("md:hidden")}
          name="filter"
          onClick={() => setOpenFilter(true)}
        />
      </section>
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[80%] md:w-[30%] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50",
          openFilter ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4">
          <MyIcon className="" name="x" onClick={() => setOpenFilter(false)} />
        </div>

        <div className="p-4 space-y-10 overflow-y-auto h-[calc(100%-60px)]">
          {/* Valor da atividade */}
          <div className="flex justify-between font-bold">
            <PriceRangeSlider
              value={priceRange}
              onChange={setPriceRange}
              min={Number(priceAdult?.min)}
              max={Number(priceAdult?.max)}
              step={50}
            />
          </div>
          {/* Botão Salvar */}

          <div className="flex gap-2">
            <MyButton
              variant="outline-neutral"
              size="lg"
              borderRadius="squared"
              className="w-full"
              onClick={handleClear}
            >
              Limpar
            </MyButton>

            <MyButton
              variant="default"
              size="lg"
              borderRadius="squared"
              className="w-full"
              onClick={handleFilter}
            >
              Filtrar
            </MyButton>
          </div>
        </div>
      </div>
      {/* Overlay escuro ao fundo */}
      {openFilter && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setOpenFilter(false)}
        />
      )}
    </>
  );
}
