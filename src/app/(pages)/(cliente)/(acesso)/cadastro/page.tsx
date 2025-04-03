'use client';

import MyButton from '@/components/atoms/my-button';
import MyCheckbox from '@/components/atoms/my-checkbox';
import MyIcon from '@/components/atoms/my-icon';
import MyTextInput from '@/components/atoms/my-text-input';
import MyTypography from '@/components/atoms/my-typography';
import PATHS from '@/utils/paths';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MyForm } from '@/components/atoms/my-form';

const formSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: 'Por favor, forneça seu nome completo.' }),
    email: z.string().email({ message: 'E-mail inválido.' }),
    phone: z
      .string()
      .trim()
      .min(8, { message: 'Forneça um número de celular válido.' }),
    password: z
      .string()
      .min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas não coincidem',
        path: ['confirmPassword'],
      });
    }
  });

type FormData = z.infer<typeof formSchema>;

export default function Cadastro() {
  const router = useRouter();
  const [visibility, setVisibility] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleCadastro = async () => {};

  const handleSubmit = async () => {};

  return (
    <MyForm {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col bg-white rounded-lg max-w-lg m-auto w-full py-16 px-6 md:px-12"
      >
        <div className="relative flex max-sm:flex-col gap-4 md:items-center">
          <MyIcon
            name="voltar"
            className="hover:cursor-pointer"
            onClick={() => router.push(PATHS.login)}
          />
          <MyTypography variant="heading2" weight="bold" className="mt-2">
            Cadastre-se
          </MyTypography>
        </div>

        <div className="my-6">
          <MyTextInput
            label="Nome Completo"
            placeholder="Nome Completo"
            className="mt-2"
          />
          <MyTextInput
            type="email"
            label="E-mail ou celular"
            placeholder="b2adventure@gmail.com"
            className="mt-2"
          />
          <MyTextInput
            label="Telefone/Celular"
            placeholder="b2adventure@gmail.com"
            className="mt-2"
          />
          <MyTextInput
            label="Senha"
            placeholder="******"
            type={visibility ? 'text' : 'password'}
            rightIcon={
              <MyIcon
                name={visibility ? 'hide' : 'eye'}
                className="mr-4 mt-2 cursor-pointer"
                onClick={() => setVisibility((prev) => !prev)}
              />
            }
            className="mt-2"
          />
          <MyTextInput
            label="Confirmar Senha"
            placeholder="******"
            type={visibility ? 'text' : 'password'}
            rightIcon={
              <MyIcon
                name={visibility ? 'hide' : 'eye'}
                className="mr-4 mt-2 cursor-pointer"
                onClick={() => setVisibility((prev) => !prev)}
              />
            }
            className="mt-2"
          />

          <MyCheckbox label="Li e aceito os" termsLink="termos de uso" />
        </div>

        <div className="flex flex-col">
          <MyButton
            className=""
            variant="default"
            borderRadius="squared"
            size="md"
          >
            Cadastrar Conta
          </MyButton>

          <div className="text-center mt-12">
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
              className=""
            >
              Bora lá!
            </MyButton>
          </div>
        </div>
      </form>
    </MyForm>
  );
}
