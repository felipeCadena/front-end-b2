"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import MyFormInput from "@/components/atoms/my-form-input";
import { MyForm } from "@/components/atoms/my-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import MyFormRadio from "@/components/atoms/my-form-radio";
import MyFormTextarea from "@/components/atoms/my-form-textarea";
import { sendMessage } from "@/services/api/sendMessage";
import { toast } from "react-toastify";
import MySpinner from "@/components/atoms/my-spinner";

const formschema = z.object({
  name: z.string().min(3, { message: "Por favor, informe seu nome." }),
  phone: z.string().regex(/^\+\d{1,3} \(\d{2}\) \d{4,5}-\d{4}$/, {
    message:
      "Informe um telefone válido com código do país. Ex: +55 (11) 91234-5678",
  }),
  email: z.string().email({ message: "Informe seu e-mail." }),
  topic: z.enum(["Elogio", "Sugestão", "Reclamação"]),
  message: z
    .string()
    .min(2, { message: "Mensagem deve ter no mínimo 6 caracteres" }),
});

type FormData = z.infer<typeof formschema>;

export default function FaleConosco() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const options = ["Elogio", "Sugestão", "Reclamação"];

  const form = useForm<FormData>({
    resolver: zodResolver(formschema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      topic: "Elogio",
      message: "",
    },
  });

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const response = await sendMessage.talkToUs(formData);
      form.reset();

      toast.success(response.message);
    } catch (error) {
      toast.error("Um erro inesperado ocorreu. Tente novamente.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="my-6 px-4 space-y-4 md:max-w-2xl">
      <div className="relative flex gap-4 items-center">
        <MyIcon
          name="seta"
          className="rotate-180 cursor-pointer"
          onClick={() => router.back()}
        />
        <MyTypography variant="heading3" weight="bold" className="">
          Fale Conosco
        </MyTypography>
      </div>

      <div className="space-y-2">
        <MyTypography variant="label">
          Tem alguma dúvida, sugestão ou precisa de suporte?
        </MyTypography>
        <MyTypography variant="label">
          Entre em contato conosco através do formulário abaixo:
        </MyTypography>
      </div>

      <MyForm {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="md:max-w-2xl"
        >
          <MyFormInput
            label="Nome Completo"
            name="name"
            form={form}
            placeholder="Digite seu nome"
            className="mt-2"
          />
          <MyFormInput
            label="Telefone (DDI + DDD + Telefone)"
            name="phone"
            isPhoneNumber
            form={form}
            placeholder="+00 (00) 00000-0000"
            className="mt-2"
          />
          <MyFormInput
            label="E-mail"
            name="email"
            form={form}
            placeholder="Digite seu e-mail"
            className="mt-2"
          />

          <MyFormRadio
            className="flex gap-4 mt-2"
            name="topic"
            form={form}
            options={options}
          />

          <MyFormTextarea form={form} name="message" />

          <MyButton
            variant="default"
            size="lg"
            borderRadius="squared"
            className="px-16 lg:w-[175px] items-center mt-4"
          >
            {isLoading ? (
              <MySpinner className="w-full flex justify-center items-center" />
            ) : (
              "Enviar"
            )}
          </MyButton>
        </form>
      </MyForm>
    </section>
  );
}
