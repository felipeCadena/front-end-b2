"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyLogo from "@/components/atoms/my-logo";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import { useStepperStore } from "@/store/useStepperStore";
import {
  formatCPF,
  formatPhoneNumber,
  formatPhoneNumberDDI,
} from "@/utils/formatters";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

export default function CadastroParceiro({
  handleNext,
  handleBack,
}: {
  handleNext: () => void;
  handleBack: () => void;
}) {
  const router = useRouter();
  const { setStepData, name, email, phone, password, confirmPassword, cpf } =
    useStepperStore();

  const [visibility, setVisibility] = React.useState(false);
  const [visibilityConfirm, setVisibilityConfirm] = React.useState(false);

  const handleNextStep = () => {
    if (!name || !email || !phone || !password || !confirmPassword || !cpf) {
      toast.error("Todos os campos são obrigatórios!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }

    if (password.length < 8) {
      toast.error("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("A senha deve conter pelo menos uma letra maiúscula.");
      return;
    }
    if (!/[\W_]/.test(password)) {
      toast.error(
        "A senha deve conter pelo menos um caractere especial e um número."
      );
      return;
    }

    setStepData(2, {
      cpf,
      name,
      email,
      phone,
      password,
      confirmPassword,
    });

    handleNext();
  };

  useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <section className="flex flex-col bg-white md:my-4 rounded-lg max-w-3xl m-auto w-full">
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
            placeholder="Digite seu e-mail"
            className="mt-2"
          />
          <MyTextInput
            onChange={(e) => setStepData(2, { cpf: formatCPF(e.target.value) })}
            value={cpf}
            type="cpf"
            label="CPF"
            placeholder="Digite seu CPF"
            className="mt-2"
          />
          <MyTextInput
            onChange={(e) =>
              setStepData(2, { phone: formatPhoneNumberDDI(e.target.value) })
            }
            maxLength={19}
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
            type={visibilityConfirm ? "text" : "password"}
            rightIcon={
              <MyIcon
                name={visibilityConfirm ? "hide" : "eye"}
                className="mr-4 mt-7 cursor-pointer"
                onClick={() => setVisibilityConfirm((prev) => !prev)}
              />
            }
            className="mt-2"
          />
        </div>

        <div className="flex flex-col">
          <div className="text-center">
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

      <div className="flex justify-between items-center w-full max-w-3xl mx-auto p-4">
        <MyButton
          variant="default"
          borderRadius="squared"
          onClick={handleBack}
          leftIcon={<MyIcon name="seta-direita" className="rotate-180" />}
        >
          Voltar
        </MyButton>
        <MyButton
          variant="default"
          borderRadius="squared"
          onClick={handleNextStep}
          rightIcon={<MyIcon name="seta-direita" />}
        >
          Próximo
        </MyButton>
      </div>
    </section>
  );
}
