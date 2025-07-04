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
import { partnerService } from "@/services/api/partner";
import StarRating from "@/components/molecules/my-stars";

// const formSchema = z
//   .object({
//     password: z.string().superRefine((value, ctx) => {
//       if (value.length < 6) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.too_small,
//           minimum: 6,
//           type: "string",
//           inclusive: true,
//           message: "A senha deve ter no mínimo 6 caracteres.",
//         });
//       }
//       if (!/[A-Z]/.test(value)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: "A senha deve conter pelo menos uma letra maiúscula.",
//         });
//       }
//       if (!/[\W_]/.test(value)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message:
//             "A senha deve conter pelo menos um caractere especial e um número.",
//         });
//       }
//     }),
//     confirmPassword: z.string(),
//   })
//   .superRefine((data, ctx) => {
//     if (data.password !== data.confirmPassword) {
//       ctx.addIssue({
//         code: "custom",
//         message: "As senhas não coincidem",
//         path: ["confirmPassword"],
//       });
//     }
//   });

// type FormData = z.infer<typeof formSchema>;

export default function PerfiParceiro() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [file, setFile] = React.useState<File[] | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { setUser, user } = useAuthStore();

  // const form = useForm<FormData>({
  //   resolver: zodResolver(formSchema),
  //   mode: "onChange",
  //   criteriaMode: "all",
  //   defaultValues: {
  //     password: "",
  //     confirmPassword: "",
  //   },
  // });

  const { data: fetchPartner } = useQuery({
    queryKey: ["fetchPartner"],
    queryFn: () => partnerService.getPartnerLogged(),
  });

  const { refetch } = useQuery({
    queryKey: ["fetchUser"],
    queryFn: async () => {
      const user = await users.getUserLogged();
      setUser({
        ...user,
        photo: {
          url: user?.photo?.url,
          mimetype: user?.photo?.mimetype,
          updatedAt: user?.photo?.updatedAt,
        },
      });
      return user;
    },
  });

  const handleClickUpload = () => {
    inputRef.current?.click();
  };

  const uploadImage = async (file: File) => {
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      try {
        const url = await partnerService.addPartnerLogo({
          mimetype: file.type,
          file: new Blob([arrayBuffer]),
        });

        await users.uploadMedia({
          mimetype: file.type,
          file: new Blob([arrayBuffer]),
        });

        setUser({
          email: fetchPartner?.businessEmail ?? "",
          name: fetchPartner?.fantasyName ?? "",
          role: user?.role ?? "",
          photo: {
            url,
            mimetype: file.type,
            updatedAt: fetchPartner?.updatedAt,
          },
        });

        refetch();

        toast.success("Imagem alterada com sucesso!");
      } catch (error) {
        console.error("Erro ao enviar imagem", error);
      } finally {
        queryClient.invalidateQueries({ queryKey: ["fetchPartner"] });
      }
    }
  };

  // const handleSubmit = async (formData: FormData) => {
  //   setIsLoading(true);
  //   try {
  //     await users.updatePassword({
  //       password: formData.password,
  //     });

  //     toast.success("Senha alterada com sucesso!");
  //   } catch (error) {
  //     if (error instanceof AxiosError) {
  //       console.error(error.response?.data.message);
  //     }
  //   }
  //   setIsLoading(false);
  //   queryClient.invalidateQueries({ queryKey: ["fetchPartner"] });
  // };

  const handleActivities = (length: number) => {
    if (length === 0) {
      return "Nenhuma atividade cadastrada";
    } else if (length === 1) {
      return "1 atividade cadastrada";
    } else {
      return `${length} atividades cadastradas`;
    }
  };

  return (
    <section className="px-6 mt-8 mb-16">
      <div className="relative flex gap-4 items-center">
        <MyIcon
          name="seta"
          className="rotate-180 cursor-pointer"
          onClick={() => router.back()}
        />
        <MyTypography variant="heading3" weight="bold" className="">
          Perfil do Parceiro
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
              key={user?.photo?.updatedAt}
              alt="avatar"
              src={
                user?.photo?.url
                  ? `${user?.photo?.url}?v=${new Date(user?.photo?.updatedAt ?? Date.now()).getTime()}`
                  : "/user.png"
              }
              width={28}
              height={28}
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>
        <Dropzone
          ref={inputRef}
          small
          className="cursor-pointer"
          onChange={(fileList) => {
            if (fileList) {
              uploadImage(fileList[0]);
              setFile(Array.from(fileList));
            }
          }}
          multiple
          accept="jpg, png, image/*"
        >
          <div onClick={handleClickUpload}>
            <Camera color="#8DC63F" width="30" height="30" />
          </div>
        </Dropzone>
        <div>
          <MyTypography variant="label" weight="semibold">
            {fetchPartner?.fantasyName}
          </MyTypography>
          <MyTypography
            variant="label"
            weight="regular"
            lightness={400}
            className="mt-2"
          >
            {handleActivities(fetchPartner?._count?.adventures ?? 0)}
          </MyTypography>

          <div className="flex gap-2 items-center">
            <StarRating rating={fetchPartner?.averageRating ?? 0} />
            <MyTypography variant="label" weight="semibold">
              {fetchPartner?.averageRating?.toFixed(2)}
            </MyTypography>
            <MyTypography variant="label">
              ({fetchPartner?.qntRatings} Avaliações)
            </MyTypography>
          </div>
        </div>
      </div>

      <div className="w-full space-y-2 my-6 md:max-w-2xl md:mx-auto flex flex-col gap-1 items-center">
        <MyTypography variant="subtitle3" weight="bold" className="mb-4">
          Dados cadastrais
        </MyTypography>
        <MyTextInput
          type="email"
          label="E-mail"
          placeholder="Digite seu e-mail"
          className="mt-2 disabled:cursor-default"
          value={fetchPartner?.businessEmail}
          disabled
        />
        <MyTextInput
          label="Nome Completo"
          placeholder="Nome Completo"
          value={fetchPartner?.fantasyName}
          className="mt-2 disabled:cursor-default"
          disabled
        />

        {/* <MyForm {...form}>
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
        </MyForm> */}
      </div>
    </section>
  );
}
