"use client";

import React, { useState } from "react";
import MyIcon from "../atoms/my-icon";
import MyButton from "../atoms/my-button";
import MyTypography from "../atoms/my-typography";
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/my-popover";

export default function PeopleSelector() {
  const [open, setOpen] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

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

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
              Adultos: {adults} {children != 0 && `+ Crianças: ${children}`}`{" "}
            </MyTypography>
          ) : (
            <MyTypography variant="body" weight="regular" className="text-sm">
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
          {/* Adultos */}
          <div className="w-full flex justify-between gap-12 items-center">
            <div>
              <MyTypography variant="body-big" weight="semibold">
                Adultos - R$ 181,50
              </MyTypography>
              <MyTypography variant="body-big" weight="regular">
                Idade: 13 - 99
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
              <button onClick={() => handleChange("adult", "increase")}>
                <MyIcon name="soma" />
              </button>
            </div>
          </div>

          {/* Crianças */}
          <div className="w-full flex justify-between gap-12 items-center">
            <div>
              <MyTypography variant="body-big" weight="semibold">
                Crianças - R$ 90,00
              </MyTypography>
              <MyTypography variant="body-big" weight="regular">
                Idade: 4 - 10
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
              <button onClick={() => handleChange("child", "increase")}>
                <MyIcon name="soma" />
              </button>
            </div>
          </div>

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
