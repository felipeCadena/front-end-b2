
"use client"
import React from "react";
import MyButton from "../atoms/my-button";
import MyIcon, { IconsMapTypes } from "../atoms/my-icon";

export default function ActivitiesFilter({ withText = true }) {
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
    <section className="flex justify-center gap-2 mt-4">
      {activities.map((item, index) => (
          <MyButton 
          key={index} 
          variant="outline-muted" 
          size="md" 
          className="flex flex-col gap-1 items-center rounded-md w-[6.625rem] h-[6.625rem]"
          >
            <MyIcon name={item.icon as IconsMapTypes}/>
            <span className="px-4">{item.title}</span>
          </MyButton>
      ))}
    </section>
  );
}
