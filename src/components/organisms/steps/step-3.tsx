"use client";

import { dificulties } from "@/common/constants/constants";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import MyTypography from "@/components/atoms/my-typography";
import Duration from "@/components/molecules/duration";
import TimePickerModal from "@/components/molecules/time-picker";
import { useAdventureStore } from "@/store/useAdventureStore";
import {
  getDifficultyDescription,
  getDifficultyNumber,
} from "@/utils/formatters";
import React from "react";

export default function Step3() {
  const { difficult, setAdventureData, duration } = useAdventureStore();

  // Converte de "HH:mm" para "Xh" ou "XhYY"
  const formatDuration = (hours: string) => {
    if (!hours) return "";

    const [h, m] = hours.split("h");

    // Garante que temos números válidos
    const hour = parseInt(h);
    const minute = parseInt(m);

    if (isNaN(hour)) return "";

    // Mantém os minutos se existirem e forem diferentes de zero
    if (!isNaN(minute) && minute > 0) {
      return `0${hour}:${minute}`;
    }

    return `0${hour}:00`;
  };

  return (
    <section className="space-y-6">
      <MySelect
        label="Grau de Dificuldade"
        className="text-base text-black"
        value={getDifficultyDescription(difficult) ?? ""}
        onValueChange={(value) =>
          setAdventureData({
            difficult: getDifficultyNumber(value) ?? undefined,
          })
        }
      >
        <SelectTrigger className="py-6 my-1">
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          {dificulties.map((dificulty) => (
            <SelectItem key={dificulty} value={dificulty}>
              {dificulty}
            </SelectItem>
          ))}
        </SelectContent>
      </MySelect>

      <div>
        <MyTypography variant="subtitle3" weight="bold" className="mb-1">
          Duração da atividade
        </MyTypography>
        <Duration
          iconColor="black"
          selectedTime={duration}
          setSelectedTime={(time) =>
            setAdventureData({ duration: formatDuration(time) })
          }
        />
      </div>
    </section>
  );
}
