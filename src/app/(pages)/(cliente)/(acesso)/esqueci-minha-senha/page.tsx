'use client';

import React, { useState } from 'react';
import MyButton from '@/components/atoms/my-button';
import MyIcon from '@/components/atoms/my-icon';
import MyLogo from '@/components/atoms/my-logo';

import MyTypography from '@/components/atoms/my-typography';
import PATHS from '@/utils/paths';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/api/auth';
import { MyForm } from '@/components/atoms/my-form';
import MyFormInput from '@/components/atoms/my-form-input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import MySpinner from '@/components/atoms/my-spinner';
import { AxiosError } from 'axios';

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Por favor, insira o e-mail.' })
    .email({ message: 'Por favor, insira um e-mail válido' }),
});

type FormData = z.infer<typeof formSchema>;

export default function EsqueciMinhaSenha() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const { email } = formData;
    setIsLoading(true);
    try {
      await authService.forgotPassword(email);
      toast.success('Solicitação enviada por e-mail.');
      form.reset();
      router.push(PATHS.login);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
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
            Esqueci minha senha
          </MyTypography>
        </div>

        <div className="mt-6">
          <MyFormInput
            label="E-mail"
            name="email"
            type="email"
            form={form}
            placeholder="b2adventure@gmail.com"
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
            {isLoading ? <MySpinner /> : 'Solicitar nova senha'}
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
              onClick={() => router.push(PATHS.cadastro)}
            >
              Bora lá!
            </MyButton>
          </div>
        </div>
      </form>
    </MyForm>
  );
}
