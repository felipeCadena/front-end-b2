"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyLogo from "@/components/atoms/my-logo";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import { useStepperStore } from "@/store/useStepperStore";
import { formatPhoneNumber, formatPhoneNumberDDI } from "@/utils/formatters";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function CadastroParceiro() {
  const [visibility, setVisibility] = React.useState(false);
  const router = useRouter();

  const { setStepData, name, email, phone, password, confirmPassword } =
    useStepperStore();

  const handleNextStep = () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error("Todos os campos são obrigatórios!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }

    setStepData(2, {
      name,
      email,
      phone,
      password,
      confirmPassword,
    });

    router.push(PATHS["sobre-a-empresa"]);
  };

  return (
    <section className="flex flex-col bg-white md:my-12 rounded-lg max-w-3xl m-auto w-full">
      <div className="w-full md:py-6 space-y-6 md:max-w-screen-2xl md:mx-auto md:border-2 md:border-gray-200 md:rounded-xl p-6 md:p-16">
        <div className="relative md:hidden">
          <MyLogo
            variant="mobile"
            width={100}
            height={100}
            className="mx-auto"
          />
          <MyIcon
            name="voltar"
            className="absolute top-1/3 left-0 md:hidden"
            onClick={() => router.push(PATHS.initial)}
          />
        </div>
        <div className="space-y-2">
          <MyTypography variant="heading2" weight="bold">
            Quer ser um de nossos parceiros?
          </MyTypography>
          <MyTypography variant="subtitle3" weight="regular" lightness={400}>
            Só precisa preencher alguns dados antes.
          </MyTypography>
        </div>

        <div className="space-y-2">
          <MyTextInput
            onChange={(e) => setStepData(2, { name: e.target.value })}
            value={name}
            name="user.name"
            label="Nome Completo"
            placeholder="Nome Completo"
            className="mt-2"
          />
          <MyTextInput
            onChange={(e) => setStepData(2, { email: e.target.value })}
            value={email}
            type="email"
            label="E-mail"
            placeholder="b2adventure@gmail.com"
            className="mt-2"
          />
          <MyTextInput
            onChange={(e) =>
              setStepData(2, { phone: formatPhoneNumberDDI(e.target.value) })
            }
            value={phone}
            label="Celular"
            placeholder="+00 (00) 00000-0000"
            className="mt-2"
          />
          <MyTextInput
            onChange={(e) => setStepData(2, { password: e.target.value })}
            value={password}
            label="Senha"
            placeholder="******"
            type={visibility ? "text" : "password"}
            rightIcon={
              <MyIcon
                name={visibility ? "hide" : "eye"}
                className="mr-4 mt-7 cursor-pointer"
                onClick={() => setVisibility((prev) => !prev)}
              />
            }
            className="mt-2"
          />

          <MyTextInput
            onChange={(e) =>
              setStepData(2, { confirmPassword: e.target.value })
            }
            value={confirmPassword}
            label="Confirmar Senha"
            placeholder="******"
            type={visibility ? "text" : "password"}
            rightIcon={
              <MyIcon
                name={visibility ? "hide" : "eye"}
                className="mr-4 mt-7 cursor-pointer"
                onClick={() => setVisibility((prev) => !prev)}
              />
            }
            className="mt-2"
          />
        </div>

        <div className="flex flex-col">
          <MyButton
            className=""
            variant="default"
            borderRadius="squared"
            size="md"
            onClick={handleNextStep}
          >
            Cadastrar Conta
          </MyButton>

          <div className="text-center mt-8">
            <MyTypography
              variant="label"
              weight="regular"
              className="text-[#5F5C6B]"
            >
              Lembrou que tem uma conta?
            </MyTypography>
            <MyButton
              onClick={() => router.push(PATHS["login-parceiro"])}
              variant="text"
              className=""
            >
              Bora lá!
            </MyButton>
          </div>
        </div>
      </div>
    </section>
  );
}
