"use client";
import React from "react";
import MyButton from "../atoms/my-button";
import MyIcon, { IconsMapTypes } from "../atoms/my-icon";
import { cn } from "@/utils/cn";
import MyTypography from "../atoms/my-typography";
import { usePathname } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { adventures } from "@/services/api/adventures";
import { TypeAdventure } from "@/store/useAdventureStore";
import Mar from "../atoms/my-icon/elements/mar";
import Ar from "../atoms/my-icon/elements/ar";
import Terra from "../atoms/my-icon/elements/terra";

type ActivitiesFilterProps = {
  withText?: boolean;
  withoutText?: boolean;
  small?: boolean;
  admin?: boolean;
  selected?: "ar" | "terra" | "mar" | "";
  setSelected?: (value: "ar" | "terra" | "mar" | "") => void;
};

export default function ActivitiesFilter({
  withText = true,
  withoutText,
  small = false,
  admin = false,
  selected,
  setSelected = () => {},
}: ActivitiesFilterProps) {
  const pathname = usePathname();

  const activities: {
    icon: IconsMapTypes;
    name: "ar" | "terra" | "mar";
    title: string;
  }[] = [
    {
      icon: "ar",
      name: "ar",
      title: "Atividades Aéreas",
    },
    {
      icon: "terra",
      name: "terra",
      title: "Atividades Terrestres",
    },
    {
      icon: "mar",
      name: "mar",
      title: "Atividades Aquáticas",
    },
  ];

  const handleFilterClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    filter: TypeAdventure
  ) => {
    e.preventDefault(); // Previne o comportamento padrão
    e.stopPropagation(); // Impede a propagação do evento

    setSelected(filter);
    // Sua lógica de filtro aqui
  };

  return (
    <section
      className={cn(
        "flex flex-col justify-around gap-2 mx-auto",
        withText ? "mt-12 md:my-12" : "my-6"
      )}
    >
      {withText && pathname == "/" ? (
        <div className="md:hidden mx-4">
          <MyTypography variant="heading2" weight="semibold">
            Como você quer se aventurar?
          </MyTypography>
          <MyTypography variant="body-big" weight="regular">
            Escolha aqui seu tipo favorito de atividade
          </MyTypography>
        </div>
      ) : (
        withText &&
        !admin && (
          <div className={cn("md:hidden", withoutText && "hidden")}>
            <MyTypography variant="heading2" weight="semibold" className="mx-4">
              Qual sua próxima aventura?
            </MyTypography>
          </div>
        )
      )}

      {admin && (
        <MyTypography variant="subtitle2" weight="bold">
          Qual tipo de parceria quer ver?
        </MyTypography>
      )}

      {withText && (
        <MyTypography
          variant="subtitle3"
          weight="semibold"
          className="max-sm:hidden mb-2"
        >
          Escolha seu tipo de aventura
        </MyTypography>
      )}
      <div
        className={cn(
          "flex justify-center gap-2 max-sm:w-full",
          small && "gap-4"
        )}
      >
        {activities.map((item, index) => (
          <MyButton
            key={index}
            variant="outline-muted"
            size="md"
            className={cn(
              "flex max-sm:flex-col gap-1 items-center rounded-md max-sm:w-[6.8rem] max-sm:h-[6.5rem] md:py-8 md:w-1/2 border-2 border-black md:text-nowrap",
              item.name === selected &&
                "text-white border-2 border-gray-300 bg-primary-600 opacity-80",
              small && "md:flex-col md:w-[10rem] md:h-[5rem]"
            )}
            onClick={(e) => handleFilterClick(e, item.name)}
          >
            {/* <MyIcon name={item.icon as IconsMapTypes} /> */}
            {item.icon === "mar" ? (
              <Mar fill={item.name === selected ? "#fff" : "#1E1E1E"} />
            ) : item.icon === "ar" ? (
              <Ar fill={item.name === selected ? "#fff" : "#1E1E1E"} />
            ) : (
              <Terra fill={item.name === selected ? "#fff" : "#1E1E1E"} />
            )}
            <span className="px-4">{item.title}</span>
          </MyButton>
        ))}
      </div>
    </section>
  );
}
