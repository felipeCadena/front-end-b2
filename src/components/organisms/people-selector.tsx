"use client";

import React, { useState } from "react";
import MyIcon from "../atoms/my-icon";
import MyButton from "../atoms/my-button";
import MyTypography from "../atoms/my-typography";
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/my-popover";
import { ClientSchedule } from "@/services/api/adventures";
import { useQuery } from "@tanstack/react-query";
import { formatPrice } from "@/utils/formatters";
import { MyAlert } from "../atoms/my-alert";
import ModalAlert from "../molecules/modal-alert";
import { toast } from "react-toastify";

type PeopleSelectorProps = {
  schedule: ClientSchedule;
  setSchedule: React.Dispatch<React.SetStateAction<ClientSchedule>>;
  price: {
    adult: string | undefined;
    children: string | undefined;
  };
  isChildrenAllowed: boolean;
  personsLimit: number | undefined;
};

export default function PeopleSelector({
  schedule,
  setSchedule,
  price,
  personsLimit,
  isChildrenAllowed,
}: PeopleSelectorProps) {
  const [open, setOpen] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  useQuery({
    queryKey: ["schedule", adults, children],
    queryFn: () => {
      const updated = {
        ...schedule,
        qntAdults: adults,
        qntChildren: children,
      };
      setSchedule(updated);
      return updated;
    },
  });

  console.log(schedule);
  console.log(personsLimit);

  // Função para incrementar ou decrementar valores
  const handleChange = (type: string, action: "increase" | "decrease") => {
    if (type === "adult") {
      setAdults((prev) =>
        action === "increase" ? prev + 1 : Math.max(0, prev - 1)
      );
    } else if (type === "child") {
      setChildren((prev) =>
        action === "increase" ? prev + 1 : Math.max(0, prev - 1)
      );
    }
  };

  const handleOpen = () => {
    if (schedule?.scheduleTime === "") {
      toast.error("Selecione um horário.");
      return;
    }

    setOpen(true);
  };

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <MyButton
          variant="date"
          borderRadius="squared"
          className="w-full justify-start text-sm items-center gap-2 py-6 border-gray-300 md:bg-white"
        >
          <MyIcon name="pessoas" />
          {adults || children ? (
            <MyTypography variant="label" weight="medium">
              {" "}
              Adultos: {adults} {children != 0 && `+ Crianças: ${children}`}{" "}
            </MyTypography>
          ) : (
            <MyTypography
              variant="body-big"
              weight="regular"
              className="text-base text-gray-400"
            >
              Número de pessoas
            </MyTypography>
          )}
        </MyButton>
      </PopoverTrigger>

      <PopoverContent
        className="w-full bg-white flex flex-col items-center"
        align="center"
      >
        <div className="w-full space-y-8 p-2">
          <div className="w-full flex justify-center items-center">
            <MyTypography
              variant="label"
              weight="bold"
            >{`Vagas disponíveis: ${personsLimit}`}</MyTypography>
          </div>
          {/* Adultos */}
          <div className="w-full flex justify-between gap-12 items-center">
            <div>
              <MyTypography variant="body-big" weight="semibold">
                {`Adultos - ${formatPrice(price?.adult ?? "0")}`}
              </MyTypography>
              <MyTypography variant="body-big" weight="regular">
                Idade: acima de 13 anos.
              </MyTypography>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleChange("adult", "decrease")}
                disabled={adults === 0}
              >
                <MyIcon
                  name={adults > 0 ? "subtracao" : "subtracaoDesativada"}
                />
              </button>
              <span>{adults}</span>
              <button
                disabled={adults + children === personsLimit}
                onClick={() => handleChange("adult", "increase")}
              >
                <MyIcon
                  name={
                    personsLimit && adults + children < personsLimit
                      ? "soma"
                      : "somaDesativada"
                  }
                />
              </button>
            </div>
          </div>

          {/* Crianças */}
          {isChildrenAllowed && (
            <div className="w-full flex justify-between gap-12 items-center">
              <div>
                <MyTypography variant="body-big" weight="semibold">
                  {`Crianças - ${formatPrice(price?.children ?? "0")}`}
                </MyTypography>
                <MyTypography variant="body-big" weight="regular">
                  Idade: de 4 a 12 anos
                </MyTypography>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleChange("child", "decrease")}
                  disabled={children === 0}
                >
                  <MyIcon
                    name={children > 0 ? "subtracao" : "subtracaoDesativada"}
                  />
                </button>
                <span>{children}</span>
                <button
                  disabled={adults + children === personsLimit}
                  onClick={() => handleChange("child", "increase")}
                >
                  <MyIcon
                    name={
                      personsLimit && adults + children < personsLimit
                        ? "soma"
                        : "somaDesativada"
                    }
                  />
                </button>
              </div>
            </div>
          )}

          {/* Botão Salvar */}
          <MyButton
            variant="default"
            size="lg"
            borderRadius="squared"
            onClick={() => setOpen(false)}
            className="w-full"
          >
            Ok
          </MyButton>
        </div>
      </PopoverContent>
    </Popover>
  );
}
