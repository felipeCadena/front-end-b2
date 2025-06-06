"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyLogo from "@/components/atoms/my-logo";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import { cn } from "@/utils/cn";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import React from "react";

export default function SobreAEmpresa() {
  const router = useRouter();
  const [steps, setSteps] = React.useState(1);

  return (
    <section className="m-6 space-y-4 md:space-y-8 md:max-w-screen-md md:mx-auto md:mt-12 md:border-2 md:border-gray-200 md:rounded-xl md:py-16">
      <div className="relative md:hidden">
        <MyLogo variant="mobile" width={100} height={100} className="mx-auto" />
        <MyIcon
          name="voltar"
          className="absolute top-1/3 left-0 md:hidden"
          // onClick={() => router.push(PATHS.initial)}
        />
      </div>

      <div
        className={cn(
          "space-y-4 md:space-y-8 md:w-2/3 md:mx-auto",
          steps != 1 && "hidden"
        )}
      >
        <div className="space-y-2">
          <MyTypography variant="heading2" weight="bold">
            Agora nos conte um pouco sobre a sua empresa!
          </MyTypography>
          <MyTypography variant="subtitle3" weight="regular" lightness={400}>
            Só precisa preencher alguns dados antes.
          </MyTypography>
        </div>

        <div className="space-y-2">
          <MyTextInput
            label="Nome da empresa/pessoa"
            placeholder="Nome Completo"
            className="mt-2"
          />
          <MyTextInput
            label="CNPJ ou CPF"
            placeholder="XX.XXX.XXX/XXXX-XX"
            className="mt-2"
          />
        </div>

        <MyButton
          className="w-full hidden md:block"
          variant="default"
          borderRadius="squared"
          size="lg"
          onClick={() => setSteps(2)}
        >
          Próximo
        </MyButton>
      </div>

      <div
        className={cn(
          "md:space-y-8 md:w-2/3 md:mx-auto",
          steps == 1 && "md:hidden"
        )}
      >
        <div className="hidden md:block space-y-2">
          <MyTypography variant="heading2" weight="bold">
            Precisamos de só mais algumas informações
          </MyTypography>
          <MyTypography variant="subtitle3" weight="regular" lightness={400}>
            Precisamos de seus dados bancários agora.
          </MyTypography>
        </div>

        <div className="space-y-2">
          <MyTypography variant="subtitle3" weight="semibold" className="mb-3">
            Dados Bancários
          </MyTypography>
          <MyTextInput
            label="Número da conta"
            placeholder="0987 2348 2348 1243"
            className="mt-2"
          />

          <div className="flex gap-2">
            <MyTextInput
              label="Agência"
              placeholder="Digite sua agência"
              className="mt-2"
            />

            <MyTextInput label="Banco" placeholder="001" className="mt-2" />
          </div>

          <MySelect
            //   value={}
            //   onValueChange={}
            label="Data de Pagamento"
          >
            <SelectTrigger className="py-6 mt-1 mb-4">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="05">Todo dia 05</SelectItem>
              <SelectItem value="10">Todo dia 10</SelectItem>
              <SelectItem value="15">Todo dia 15</SelectItem>
            </SelectContent>
          </MySelect>
        </div>
        <MyButton
          className="w-full"
          variant="default"
          borderRadius="squared"
          size="lg"
          onClick={() => router.push(PATHS["cadastro-atividade"])}
        >
          Cadastrar Atividades
        </MyButton>
      </div>
    </section>
  );
}
