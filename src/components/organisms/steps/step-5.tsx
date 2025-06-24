import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import { MyDatePicker } from "@/components/molecules/my-date-picker";
import { useAdventureStore } from "@/store/useAdventureStore";
import React from "react";

export default function Step5() {
  const {
    setAdventureData,
    transportIncluded,
    picturesIncluded,
    waterIncluded,
    foodIncluded,
    fuelIncluded,
    transportAddress,
  } = useAdventureStore();

  React.useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <section className="space-y-6">
      <MySelect
        label="Transporte Incluso"
        className="text-base text-black"
        value={transportIncluded ? "true" : "false"}
        onValueChange={(value) =>
          setAdventureData({
            transportIncluded: value === "true",
          })
        }
      >
        <SelectTrigger className="py-6 my-1">
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">Sim</SelectItem>
          <SelectItem value="false">Não Oferecemos</SelectItem>
        </SelectContent>
      </MySelect>

      {transportIncluded && (
        <MyTextInput
          value={transportAddress}
          onChange={(e) =>
            setAdventureData({ transportAddress: e.target.value })
          }
          placeholder="Local de saída e retorno"
          label="Local de saída e retorno"
          className="mt-1"
          classNameLabel="text-base text-black"
        />
      )}

      <MySelect
        label="Água inclusa"
        className="text-base text-black"
        value={waterIncluded ? "true" : "false"}
        onValueChange={(value) =>
          setAdventureData({
            waterIncluded: value === "true",
          })
        }
      >
        <SelectTrigger className="py-6 my-1">
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">Sim</SelectItem>
          <SelectItem value="false">Não Oferecemos</SelectItem>
        </SelectContent>
      </MySelect>

      <MySelect
        label="Alimentação inclusa"
        className="text-base text-black"
        value={foodIncluded ? "true" : "false"}
        onValueChange={(value) =>
          setAdventureData({
            foodIncluded: value === "true",
          })
        }
      >
        <SelectTrigger className="py-6 my-1">
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">Sim</SelectItem>
          <SelectItem value="false">Não Oferecemos</SelectItem>
        </SelectContent>
      </MySelect>

      <MySelect
        label="Combustível incluso"
        className="text-base text-black"
        value={fuelIncluded ? "true" : "false"}
        onValueChange={(value) =>
          setAdventureData({
            fuelIncluded: value === "true",
          })
        }
      >
        <SelectTrigger className="py-6 my-1">
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">Sim</SelectItem>
          <SelectItem value="false">Não Oferecemos</SelectItem>
        </SelectContent>
      </MySelect>

      <MySelect
        label="Fotos da atividade inclusa"
        className="text-base text-black"
        value={picturesIncluded ? "true" : "false"}
        onValueChange={(value) =>
          setAdventureData({
            picturesIncluded: value === "true",
          })
        }
      >
        <SelectTrigger className="py-6 my-1">
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">Sim</SelectItem>
          <SelectItem value="false">Não Oferecemos</SelectItem>
        </SelectContent>
      </MySelect>
    </section>
  );
}
