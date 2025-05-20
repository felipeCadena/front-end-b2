"use client";

import React, { useState } from "react";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyLogo from "@/components/atoms/my-logo";

import MyTypography from "@/components/atoms/my-typography";
import PATHS from "@/utils/paths";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/services/api/auth";
import { MyForm } from "@/components/atoms/my-form";
import MyFormInput from "@/components/atoms/my-form-input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import MySpinner from "@/components/atoms/my-spinner";
import { AxiosError } from "axios";

const formSchema = z
  .object({
    password: z.string().superRefine((value, ctx) => {
      if (value.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 8,
          type: "string",
          inclusive: true,
          message: "A senha deve ter no mínimo 8 caracteres.",
        });
      }
      if (!/[A-Z]/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "A senha deve conter pelo menos uma letra maiúscula.",
        });
      }
      if (!/[\W_]/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "A senha deve conter pelo menos um caractere especial e um número.",
        });
      }
    }),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
      });
    }
  });

type FormData = z.infer<typeof formSchema>;

export default function RecuperacaoSenha() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("resetToken");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const { password } = formData;
    setIsLoading(true);
    try {
      await authService.resetPassword(password, (resetToken as string) ?? "");
      toast.success("Senha alterada com sucesso!");
      form.reset();
      router.push(PATHS.login);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          toast.error(
            "Token expirado ou inválido. Faça o processo de recuperação novamente."
          );
        } else {
          toast.error(error.response?.data.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MyForm {...form}>
      <form
        className="flex flex-col bg-white rounded-lg max-w-lg m-auto w-full py-16 px-6 md:px-12"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="relative flex max-sm:flex-col gap-4 md:items-center">
          {/* <MyLogo
          variant="mobile"
          width={200}
          height={200}
          className="mx-auto"
        /> */}
          <MyIcon
            name="voltar"
            className="hover:cursor-pointer"
            onClick={() => router.push(PATHS.login)}
          />
          <MyTypography variant="heading2" weight="bold">
            Resetar senha
          </MyTypography>
        </div>

        <div className="mt-6">
          <MyFormInput
            label="Senha:"
            name="password"
            type="password"
            form={form}
          />
          <MyFormInput
            label="Confirme sua senha:"
            name="confirmPassword"
            type="password"
            form={form}
            className="mt-2"
          />
        </div>

        <div className="flex flex-col">
          <MyButton
            className="mt-8"
            variant="default"
            borderRadius="squared"
            size="md"
          >
            {isLoading ? <MySpinner /> : "Solicitar nova senha"}
          </MyButton>

          <div className=" flex justify-center items-center text-center mt-12">
            <MyTypography
              variant="label"
              weight="regular"
              className="text-[#5F5C6B]"
            >
              Lembrou da sua senha?
            </MyTypography>
            <MyButton
              variant="text"
              type="button"
              className="p-0 ml-2 underline"
              onClick={() => router.push(PATHS.login)}
            >
              Bora lá!
            </MyButton>
          </div>
        </div>
      </form>
    </MyForm>
  );
}
