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

export default function Perfil() {
  const router = useRouter();
  const [visibility, setVisibility] = React.useState(false);
  const [file, setFile] = React.useState<File[] | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => users.getUserLogged(),
  });

  const [password, setPassword] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [profile, setProfile] = React.useState({
    email: "",
    name: "",
    image: "",
  });
  const handleClickUpload = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    setProfile({
      email: user?.email ?? "",
      name: user?.name ?? "",
      image: user?.photo?.url ?? "/user.png",
    });
  }, [user]);

  // const handleUploadImage = async () => {
  //   if (file) {
  //     const arrayBuffer = await file[0].arrayBuffer();
  //     users
  //       .uploadMedia({ mimetype: file[0].type, file: new Blob([arrayBuffer]) })
  //       .then((res) => {
  //         console.log(res);

  //         setUser({
  //           ...user,
  //           photo: {
  //             url: res,
  //             mimetype: file[0].type,
  //           },
  //         });
  //         queryClient.invalidateQueries({ queryKey: ["user"] });
  //       })
  //       .catch((error) => {
  //         console.error("Error uploading image:", error);
  //       });
  //   }
  // };

  const handleSubmit = async () => {
    if (password.password && password.confirmPassword) {
      if (password.password !== password.confirmPassword) {
        toast.success("As senhas não coincidem");
        return;
      }
      users.updatePassword({
        password: password.password,
        confirmPassword: password.confirmPassword,
      });
    }

    if (file) {
      const arrayBuffer = await file[0].arrayBuffer();
      users
        .uploadMedia({ mimetype: file[0].type, file: new Blob([arrayBuffer]) })
        .then((res) => {
          console.log(res);
          setUser({
            ...user,
            photo: {
              url: res,
              mimetype: file[0].type,
            },
          });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return (
    <section className="px-6 my-8">
      <div className="relative flex gap-4 items-center">
        <MyIcon
          name="seta"
          className="rotate-180"
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
              src={profile.image ?? "/user.png"}
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
            if (fileList && fileList.length > 0) {
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
            {user?.name}
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
          className="mt-2"
          value={user?.email}
          readOnly
        />
        <MyTextInput
          label="Nome Completo"
          placeholder="Nome Completo"
          value={user?.name}
          className="mt-2"
          readOnly
        />

        <div className="w-full">
          <MyTypography
            variant="body-big"
            weight="bold"
            className="text-[1rem] mb-4 mt-8"
          >
            Caso queria atualizar sua senha, preencha os campos abaixo
          </MyTypography>
          <MyTextInput
            label="Senha"
            placeholder="******"
            type={visibility ? "text" : "password"}
            value={password.password}
            onChange={(e) =>
              setPassword((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            rightIcon={
              <MyIcon
                name={visibility ? "hide" : "eye"}
                className="mr-4 mt-2 cursor-pointer"
                onClick={() => setVisibility((prev) => !prev)}
              />
            }
            className="mt-2"
          />
          <MyTextInput
            label="Confirme sua senha"
            placeholder="******"
            type={visibility ? "text" : "password"}
            value={password.confirmPassword}
            onChange={(e) =>
              setPassword((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            rightIcon={
              <MyIcon
                name={visibility ? "hide" : "eye"}
                className="mr-4 mt-2 cursor-pointer"
                onClick={() => setVisibility((prev) => !prev)}
              />
            }
            className="mt-2"
          />
        </div>

        <MyButton
          variant="default"
          borderRadius="squared"
          size="lg"
          className="mt-4 px-12"
          onClick={() => handleSubmit()}
        >
          Atualizar
        </MyButton>
      </div>
    </section>
  );
}
