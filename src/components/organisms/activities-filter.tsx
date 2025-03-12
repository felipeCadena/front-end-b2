"use client";
import React from "react";
import MyButton from "../atoms/my-button";
import MyIcon, { IconsMapTypes } from "../atoms/my-icon";
import { cn } from "@/utils/cn";
import MyTypography from "../atoms/my-typography";
import { usePathname } from "next/navigation";

export default function ActivitiesFilter({ withText = true, small = false }) {
  const [selected, setSelected] = React.useState("Atividades no Ar");
  const pathname = usePathname();

  const activities = [
    {
      icon: "ar",
      title: "Atividades no Ar",
    },
    {
      icon: "terra",
      title: "Atividades na Terra",
    },
    {
      icon: "mar",
      title: "Atividade na Água",
    },
  ];
  return (
    <section
      className={cn(
        "flex flex-col justify-around gap-2 mx-auto max-sm:px-4",
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
        withText && (
          <div className="md:hidden">
            <MyTypography variant="heading2" weight="semibold" className="">
              Qual sua próxima aventura?
            </MyTypography>
          </div>
        )
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
              item.title === selected &&
                "border border-black bg-[#E5E4E9] opacity-100",
              small && "md:flex-col md:w-[10rem] md:h-[5rem]"
            )}
            onClick={() => setSelected(item.title)}
          >
            <MyIcon name={item.icon as IconsMapTypes} />
            <span className="px-4">{item.title}</span>
          </MyButton>
        ))}
      </div>
    </section>
  );
}
