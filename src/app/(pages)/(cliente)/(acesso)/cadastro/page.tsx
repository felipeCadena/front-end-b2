"use client";

import MyButton from "@/components/atoms/my-button";
import MyCheckbox from "@/components/atoms/my-checkbox";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import PATHS, { DEFAULT_ROLE_PATHS } from "@/utils/paths";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MyForm } from "@/components/atoms/my-form";
import MyFormInput from "@/components/atoms/my-form-input";
import { users } from "@/services/api/users";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import MySpinner from "@/components/atoms/my-spinner";
import { authService } from "@/services/api/auth";
import { signIn, useSession } from "next-auth/react";
import { useAuthStore } from "@/store/useAuthStore";

const formSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: "Por favor, forneça seu nome completo." }),
    email: z.string().email({ message: "E-mail inválido." }),
    phone: z
      .string()
      .trim()
      .min(8, { message: "Forneça um número de celular válido." }),
    cpf: z
      .string()
      .trim()
      .min(11, { message: "Por favor insira um cpf válido" }),
    password: z.string().superRefine((value, ctx) => {
      if (value.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 6,
          type: "string",
          inclusive: true,
          message: "A senha deve ter no mínimo 6 caracteres.",
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

export default function Cadastro() {
  const router = useRouter();
  const [visibility, setVisibility] = useState(false);
  const [visibilityConfirm, setVisibilityConfirm] = React.useState(false);

  const [isTermChecked, setIsTermChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const { setUser } = useAuthStore();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cpf: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const { name, email, phone, cpf, password } = formData;
    const formattedPhone = phone.replace(/\D/g, "");
    const formattedCpfCnpJ = cpf
      .replaceAll("-", "")
      .replaceAll("/", "")
      .replaceAll(".", "")
      .replaceAll(" ", "");
    setIsLoading(true);
    try {
      await users.registerCustomer({
        name,
        email,
        phone: formattedPhone,
        cpf: formattedCpfCnpJ,
        password,
      });

      form.reset();
      toast.success("Cadastro feito com sucesso!");

      const credentials = {
        email,
        password,
      };

      await signIn("credentials", {
        ...credentials,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return toast.error("Email ou senha inválidos");
        }
        if (error.response?.status === 500) {
          toast.error(`Um erro inesperado ocorreu. Tente novamente.`);
        } else {
          toast.error(error.response?.data.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const handleSessionUpdate = async () => {
      if (status === "authenticated" && session?.user?.role) {
        try {
          const userData = {
            id: session.user.id,
            name: session.user.name ?? "",
            email: session.user.email ?? "",
            role: session.user.role.toLowerCase(),
          };

          setUser({
            id: session.user.id!, // Garante que id não é undefined
            name: userData.name,
            email: userData.email,
            role: userData.role,
          });

          const userRole = session.user.role.toLowerCase();
          const roleMapping = {
            superadmin: "admin",
            admin: "admin",
            partner: "partner",
            customer: "customer",
          };

          const mappedRole = roleMapping[userRole as keyof typeof roleMapping];
          const defaultPath =
            DEFAULT_ROLE_PATHS[mappedRole as keyof typeof DEFAULT_ROLE_PATHS];

          if (defaultPath) {
            console.log("Redirecionando para:", defaultPath);
            router.replace(defaultPath);
          }
        } catch (error) {
          console.error("Erro ao processar sessão:", error);
        }
      }
    };

    handleSessionUpdate();
  }, [status]);

  return (
    <MyForm {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col bg-white rounded-lg max-w-lg m-auto w-full py-8 px-6 md:px-12"
      >
        <div className="relative flex max-sm:flex-col gap-4 md:items-center">
          <MyIcon
            name="voltar"
            className="hover:cursor-pointer"
            onClick={() => router.push(PATHS.login)}
          />
          <MyTypography variant="heading2" weight="bold">
            Cadastre-se
          </MyTypography>
        </div>

        <div className="my-4">
          <MyFormInput
            form={form}
            name="name"
            label="Nome completo:"
            placeholder="Digite seu nome completo"
            className="mt-2 mb-4"
          />
          <MyFormInput
            form={form}
            name="email"
            type="email"
            label="E-mail:"
            placeholder="Digite seu e-mail"
            className="mb-4"
          />
          <MyFormInput
            form={form}
            name="phone"
            label="Celular:"
            isPhoneNumber
            placeholder="+00 (00) 0000-0000"
            className="mb-4"
          />
          <MyFormInput
            isCpfCnpj
            form={form}
            name="cpf"
            label="CPF"
            className="mb-6"
          />

          <MyFormInput
            form={form}
            name="password"
            label="Senha:"
            placeholder="******"
            type={visibility ? "text" : "password"}
            className="mb-4"
          />

          <MyFormInput
            form={form}
            name="confirmPassword"
            label="Confirmar Senha:"
            placeholder="******"
            type={visibilityConfirm ? "text" : "password"}
            className="mb-4"
          />

          <MyCheckbox
            onClick={() => setIsTermChecked((prev) => !prev)}
            checked={isTermChecked}
            label="Li e aceito os"
            termsLink="termos de uso"
          />
        </div>

        <div className="flex flex-col">
          <MyButton
            className=""
            variant="default"
            borderRadius="squared"
            size="md"
            disabled={!isTermChecked}
          >
            {isLoading ? <MySpinner /> : "Cadastrar Conta"}
          </MyButton>

          <div className="flex justify-center items-center text-center mt-4">
            <MyTypography
              variant="label"
              weight="regular"
              className="text-[#5F5C6B]"
            >
              Lembrou que tem uma conta?
            </MyTypography>
            <MyButton
              onClick={() => router.push(PATHS.login)}
              variant="text"
              className="p-0 ml-2"
            >
              Bora lá!
            </MyButton>
          </div>
        </div>
      </form>
    </MyForm>
  );
}
