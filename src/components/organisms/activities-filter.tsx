"use client";
import React from "react";
import MyButton from "../atoms/my-button";
import MyIcon, { IconsMapTypes } from "../atoms/my-icon";
import { cn } from "@/utils/cn";

export default function ActivitiesFilter({ withText = true }) {
  const [selected, setSelected] = React.useState("Atividades no Ar");

  const activities = [
    {
      icon: "ar",
      title: "Atividades no Ar",
    },
    {
      icon: "terra",
      title: "Atividades no Terra",
    },
    {
      icon: "mar",
      title: "Atividades no Mar",
    },
  ];
  return (
    <section className={cn("flex justify-around gap-2 mt-4 mx-auto")}>
      {activities.map((item, index) => (
        <MyButton
          key={index}
          variant="outline-muted"
          size="md"
          className={cn(
            "flex flex-col gap-1 items-center rounded-md w-[6.625rem] h-[6.625rem]",
            item.title === selected &&
              "border border-black bg-[#E5E4E9] opacity-100"
          )}
          onClick={() => setSelected(item.title)}
        >
          <MyIcon name={item.icon as IconsMapTypes} />
          <span className="px-4">{item.title}</span>
        </MyButton>
      ))}
    </section>
  );
}
