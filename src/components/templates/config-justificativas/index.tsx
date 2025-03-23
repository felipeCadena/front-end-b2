import React from "react";
import MyTypography from "@/components/atoms/my-typography";
import MyIcon from "@/components/atoms/my-icon";
import { useRouter } from "next/navigation";
import ChevronDown from "@/components/atoms/my-icon/elements/down";
import MyTextarea from "@/components/atoms/my-textarea";
import MyButton from "@/components/atoms/my-button";

export default function JustificativasTemplate() {
  const [selectedJustificativa, setSelectedJustificativa] =
    React.useState<string>("");

  const justificativas = [
    "Houve um imprevisto e irei precisar cancelar nossa atividade, desculpe!",
    "Condições climáticas desfavoráveis para a realização da atividade.",
    "Problemas técnicos com equipamentos necessários.",
    "Número insuficiente de participantes.",
    "Motivos de força maior/emergência.",
  ];
  return (
    <section className="mt-4 space-y-12 mb-4">
      <div>
        <div className="flex gap-2 items-center">
          <ChevronDown
            fill="#000"
            width="24"
            height="24"
            className="-rotate-90"
          />
          <MyTypography variant="subtitle3" weight="bold" className="">
            Justificativa de cancelamento
          </MyTypography>
        </div>

        <MyTextarea
          rows={5}
          placeholder="Lorem ipsum dolor sit amet, consectetur di..."
          className="mt-1"
        />

        <MyButton
          borderRadius="squared"
          size="lg"
          variant="default"
          className="mt-6 w-full"
        >
          Salvar
        </MyButton>
      </div>

      <div className="space-y-4">
        <MyTypography variant="subtitle2" weight="bold" className="">
          Justificativa cadastradas
        </MyTypography>
        <div className="space-y-3 relative">
          {justificativas.map((justificativa, index) => (
            <div
              key={index}
              className={`flex justify-between items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all border-l-8 ${
                selectedJustificativa === justificativa
                  ? "border-black bg-gray-50"
                  : "border-gray-200 bg-gray-50 opacity-80"
              }`}
              onClick={() => setSelectedJustificativa(justificativa)}
            >
              <MyTypography variant="body-big">{justificativa}</MyTypography>
              <MyIcon name="trash" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
