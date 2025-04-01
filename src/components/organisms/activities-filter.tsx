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

type ActivitiesFilterProps = {
  withText?: boolean;
  withoutText?: boolean;
  small?: boolean;
  admin?: boolean;
  selected?: "ar" | "terra" | "mar" | "";
  setSelected?: (value: "ar" | "terra" | "mar") => void;
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

  // const { data: filterAdventure } = useQuery({
  //   queryKey: ["user", selected],
  //   queryFn: () => adventures.filterAdventures({ typeAdventure: selected }),
  // });

  return (
    <section
      className={cn(
        "flex flex-col justify-around gap-2 mx-auto",
        withText ? "mt-12 md:my-12" : "my-6"
      )}
    >
      {withText && pathname == "/" ? (
        <div className="md:hidden">
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
              "flex max-sm:flex-col gap-1 items-center rounded-md max-sm:w-[6.5rem] max-sm:h-[6.5rem] md:py-8 md:w-1/2 md:border-2 md:border-black md:text-nowrap",
              item.name === selected &&
                "border border-black bg-[#E5E4E9] opacity-100",
              small && "md:flex-col md:w-[10rem] md:h-[5rem]"
            )}
            onClick={() => setSelected(item.name)}
          >
            <MyIcon name={item.icon as IconsMapTypes} />
            <span className="px-4">{item.title}</span>
          </MyButton>
        ))}
      </div>
    </section>
  );
}
