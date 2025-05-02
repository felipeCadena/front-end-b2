"use client";

import MyIcon from "@/components/atoms/my-icon";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import MyButton from "@/components/atoms/my-button";
import { users } from "@/services/api/users";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Dropzone } from "@/components/molecules/drop-zone";
import Camera from "@/components/atoms/my-icon/elements/camera";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-toastify";
import { MyForm } from "@/components/atoms/my-form";
import MyFormInput from "@/components/atoms/my-form-input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import MySpinner from "@/components/atoms/my-spinner";
import Loading from "@/app/loading";

const formSchema = z
  .object({
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

export default function Perfil() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [file, setFile] = React.useState<File[] | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { setUser, user } = useAuthStore();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { data: fetchUser, isLoading: loadingPage } = useQuery({
    queryKey: ["fetchUser"],
    queryFn: () => users.getUserLogged(),
  });

  console.log("USER", fetchUser);

  // const [profile, setProfile] = React.useState({
  //   email: '',
  //   name: '',
  //   image: '',
  // });
  const handleClickUpload = () => {
    inputRef.current?.click();
  };

  // useEffect(() => {
  //   setProfile({
  //     email: user?.email ?? '',
  //     name: user?.name ?? '',
  //     image: user?.photo?.url ?? '/user.png',
  //   });
  // }, [user]);

  const handleUploadPicture = async (fileList: FileList | null) => {
    if (fileList && fileList.length > 0) {
      setFile(Array.from(fileList));
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await users.updatePassword({
        password: formData.password,
      });

      toast.success("Senha alterada com sucesso!");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data.message);
      }
    }

    setIsLoading(false);
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  useEffect(() => {
    const handleSendPhoto = async () => {
      if (file) {
        const arrayBuffer = await file[0].arrayBuffer();
        try {
          const response = await users.uploadMedia({
            mimetype: file[0].type,
            file: new Blob([arrayBuffer]),
          });
          console.log("useEffect Res", response);
          if (user?.name && user?.email && user?.role) {
            console.log("MUDOU");
            setUser({
              ...user,
              photo: {
                url: `${response}?v=${Date.now()}`,
                mimetype: file[0].type,
              },
            });
          }

          toast.success("Imagem alterada com sucesso!");
          queryClient.invalidateQueries({
            queryKey: ["user"],
          });
        } catch (error) {
          console.error("Erro ao enviar imagem", error);
        }
      }
    };

    handleSendPhoto();
  }, [file]);

  const userData = user ?? fetchUser;

  return loadingPage ? (
    <div className="w-full h-[30vh] flex justify-center items-center mb-16">
      <Loading />
    </div>
  ) : (
    <section className="px-6 my-8">
      <div className="relative flex gap-4 items-center">
        <MyIcon
          name="seta"
          className="rotate-180 cursor-pointer"
          onClick={() => router.back()}
        />
        <MyTypography variant="heading3" weight="bold" className="">
          Perfil de Usuário
        </MyTypography>
      </div>
      <div className="flex flex-col items-center gap-2 text-center mt-8">
        <div className="border-4 border-gray-300 rounded-full">
          {file ? (
            <Image
              alt="avatar"
              src={URL.createObjectURL(file[0]) ?? "/user.png"}
              width={28}
              height={28}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <Image
              alt="avatar"
              src={userData?.photo?.url ?? "/user.png"}
              width={28}
              height={28}
              className="w-24 h-24 rounded-full object-cover"
              unoptimized
            />
          )}
        </div>
        <Dropzone
          ref={inputRef}
          small
          className="cursor-pointer"
          onChange={(fileList) => handleUploadPicture(fileList)}
          multiple
          accept="jpg, png, image/*"
        >
          <div onClick={handleClickUpload}>
            <Camera color="#8DC63F" width="30" height="30" />
          </div>
        </Dropzone>
        <div>
          <MyTypography variant="label" weight="semibold">
            {userData?.name}
          </MyTypography>
          <MyTypography
            variant="label"
            weight="regular"
            lightness={400}
            className="mt-2"
          >
            250 Atividades realizadas
          </MyTypography>
        </div>
      </div>

      <div className="w-full my-6 md:max-w-2xl md:mx-auto flex flex-col gap-1 items-center">
        <MyTypography variant="subtitle1" weight="bold" className="mb-4">
          Dados cadastrais
        </MyTypography>
        <MyTextInput
          type="email"
          label="E-mail"
          placeholder="b2adventure@gmail.com"
          className="mt-2 disabled:cursor-default"
          value={userData?.email}
          disabled
        />
        <MyTextInput
          label="Nome Completo"
          placeholder="Nome Completo"
          value={userData?.name}
          className="mt-2 disabled:cursor-default"
          disabled
        />

        <MyForm {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
            <MyTypography
              variant="body-big"
              weight="bold"
              className="text-[1rem] mb-4 mt-8"
            >
              Caso queria atualizar sua senha, preencha os campos abaixo
            </MyTypography>
            <MyFormInput
              form={form}
              label="Senha"
              name="password"
              placeholder="******"
              type="password"
              className="mt-2"
            />
            <MyFormInput
              form={form}
              label="Confirme sua senha"
              name="confirmPassword"
              placeholder="******"
              type="password"
              className="mt-2"
            />
            <MyButton
              variant="default"
              borderRadius="squared"
              size="lg"
              className="mt-4 px-12 w-[166px]"
            >
              {isLoading ? <MySpinner /> : "Atualizar"}
            </MyButton>
          </form>
        </MyForm>
      </div>
    </section>
  );
}
