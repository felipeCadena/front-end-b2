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
  formatDuration,
  getDifficultyDescription,
  getDifficultyNumber,
} from "@/utils/formatters";
import React from "react";

export default function Step3() {
  const { difficult, setAdventureData, duration } = useAdventureStore();

  React.useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

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
