"use client";

import { types } from "@/common/constants/constants";
import MyButton from "@/components/atoms/my-button";
import MyIcon, { IconsMapTypes } from "@/components/atoms/my-icon";
import MyLogo from "@/components/atoms/my-logo";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import { cn } from "@/utils/cn";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import React from "react";

export default function InformacoesAtividade({
  edit,
  onBack,
  step,
}: {
  edit?: boolean;
  step?: boolean;
  onBack?: () => void;
}) {
  const router = useRouter();
  const [selected, setSelected] = React.useState("Em grupo");
  const params = "1";

  const handleNext = () => {
    if (edit) {
      router.push(
        `${PATHS.visualizarAtividadeParceiro(params)}?openModal=true`
      );
    } else {
      router.push(`${PATHS["minhas-atividades"]}?openModal=true`);
    }
  };

  return (
    <main className="w-full max-w-md md:max-w-3xl mx-auto md:p-4">
      <div className={cn("relative md:hidden", edit && "hidden")}>
        <MyLogo variant="mobile" width={100} height={100} className="mx-auto" />
        <MyIcon
          name="voltar"
          className="absolute bottom-8 left-0"
          onClick={() => router.back()}
        />
      </div>

      <MyTypography variant="heading2" weight="bold" className="max-sm:hidden">
        Informações da Atividade
      </MyTypography>
      <MyTypography variant="subtitle3" weight="medium" lightness={400}>
        Essa atividade será realizada:
      </MyTypography>

      <div className="grid grid-cols-2 gap-4 my-6 md:my-8">
        {types.map((item, index) => (
          <MyButton
            key={index}
            variant="outline-muted"
            size="sm"
            className={cn(
              "flex justify-center gap-2 rounded-md py-6 border border-black text-nowrap",
              item.title === selected &&
                "border border-black bg-[#E5E4E9] opacity-100"
            )}
            onClick={() => setSelected(item.title)}
          >
            <MyIcon name={item.icon as IconsMapTypes} className="" />
            <span className="">{item.title}</span>
          </MyButton>
        ))}
      </div>

      <div className="space-y-4">
        <MyTextInput
          label="Quantidade de pessoas"
          placeholder="Digite a quantidade de pessoas"
          classNameLabel="font-bold text-black"
          className="mt-2 pl-12"
          noHintText
          leftIcon={<MyIcon name="small-group" className="ml-5 mt-6" />}
        />

        <MyTextInput
          label="Valor por adulto"
          placeholder="R$ 200"
          className="mt-2 pl-12"
          noHintText
          leftIcon={<MyIcon name="dollar" className="ml-5 mt-5" />}
        />

        <MyTextInput
          label="Valor por criança"
          placeholder="R$ 100"
          className="mt-2 pl-12"
          noHintText
          leftIcon={<MyIcon name="dollar" className="ml-5 mt-5" />}
        />
      </div>

      <div className="flex flex-col my-8">
        <div className="flex justify-between">
          <MyTypography variant="label" weight="regular" className="mb-1">
            Custo Adultos
          </MyTypography>
          <MyTypography variant="label" weight="bold" className="mb-1">
            R$ 40,00
          </MyTypography>
        </div>
        <div className="flex justify-between">
          <MyTypography variant="label" weight="regular" className="mb-1">
            Custo Crianças
          </MyTypography>
          <MyTypography variant="label" weight="bold" className="mb-1">
            R$ 40,00
          </MyTypography>
        </div>

        <div className="flex justify-between">
          <MyTypography variant="label" weight="regular" className="mb-1">
            Tarifa B2
          </MyTypography>
          <MyTypography variant="label" weight="bold" className="mb-1">
            R$ 40,00
          </MyTypography>
        </div>

        <div className="flex justify-between mt-1">
          <MyTypography
            variant="label"
            weight="regular"
            className="text-primary-600"
          >
            Valor total da Atividade
          </MyTypography>
          <MyTypography
            variant="label"
            weight="bold"
            className="text-primary-600"
          >
            R$ 350,00
          </MyTypography>
        </div>
      </div>

      <div className={cn("space-y-8 my-6", step && "hidden")}>
        {!edit && (
          <MyButton
            variant="black-border"
            borderRadius="squared"
            rightIcon={<MyIcon name="seta" className="ml-3" />}
            className="w-full font-bold"
            size="lg"
            onClick={() => router.push(PATHS.visualizarAtividade(params))}
          >
            Visualizar atividade
          </MyButton>
        )}

        {edit && (
          <MyButton
            variant="black-border"
            borderRadius="squared"
            leftIcon={<MyIcon name="seta" className="rotate-180" />}
            className="w-full font-bold"
            size="lg"
            onClick={onBack}
          >
            Voltar para etapa anterior
          </MyButton>
        )}

        <MyButton
          variant="default"
          borderRadius="squared"
          rightIcon={<MyIcon name="seta-direita" className="" />}
          className="w-full"
          size="lg"
          onClick={handleNext}
        >
          {edit ? "Concluir edição" : "Concluir atividade"}
        </MyButton>
      </div>
    </main>
  );
}
