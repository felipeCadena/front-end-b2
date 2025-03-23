"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import DownloadGreen from "@/components/atoms/my-icon/elements/download-green";
import MyTypography from "@/components/atoms/my-typography";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const images = [
  "/images/atividades/montanha.webp",
  "/images/atividades/paraquedas.webp",
  "/images/atividades/cachoeira.webp",
  "/images/atividades/moto.webp",
  "/images/atividades/parapente.webp",
];

const imagesClients = [
  "/images/atividades/montanha.webp",
  "/images/atividades/paraquedas.webp",
  "/images/atividades/cachoeira.webp",
  "/images/atividades/moto.webp",
  "/images/atividades/parapente.webp",
  "/images/atividades/sup.webp",
  "/images/atividades/montanha.webp",
  "/images/atividades/paraquedas.webp",
  "/images/atividades/cachoeira.webp",
  "/images/atividades/moto.webp",
  "/images/atividades/parapente.webp",
  "/images/atividades/sup.webp",
];

export default function Atividade() {
  const router = useRouter();
  const [files, setFiles] = React.useState<string[]>(images);

  const [clients, setClients] = React.useState<string[]>(imagesClients);

  return (
    <main className="px-4 space-y-8 md:space-y-12 my-8">
      <div className="flex items-center gap-3 bg-white">
        <MyIcon
          name="voltar-black"
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle2" weight="bold">
          Fotos da atividade
        </MyTypography>
      </div>

      <MyButton
        variant="default"
        className="w-full md:w-1/3"
        borderRadius="squared"
        size="lg"
        onClick={() => router.push("/admin/marketing/atividade/1/enviar-fotos")}
      >
        Baixar todas
      </MyButton>

      <div>
        <MyTypography variant="subtitle3" weight="bold">
          Fotos da atividade
        </MyTypography>

        <div className="md:w-2/3 grid grid-cols-3 gap-4 md:gap-1 items-center">
          {files &&
            files.map((file, index) => (
              <div key={file} className="relative w-[100px] md:w-[200px] mt-4">
                <Image
                  width={100}
                  height={100}
                  src={file}
                  alt={file}
                  className="w-[100px] md:w-[200px] h-[100px] md:h-[200px] rounded-md object-cover"
                />
                <MyTypography
                  weight="bold"
                  className="absolute top-1 left-1 bg-white w-6 h-6 rounded-full flex items-center justify-center text-xs text-primary-600"
                >
                  {index + 1}
                </MyTypography>
                <div className="absolute flex items-center justify-center w-6 h-6 top-1 right-1 cursor-pointer bg-white rounded-full">
                  <DownloadGreen width="18" height="18" onClick={() => {}} />
                </div>
              </div>
            ))}
        </div>
      </div>

      <div>
        <MyTypography variant="subtitle3" weight="bold">
          Fotos do passeio
        </MyTypography>

        <div className="md:w-4/5 grid grid-cols-3 md:grid-cols-4 gap-4 items-center">
          {clients &&
            clients.map((file, index) => (
              <div key={file} className="relative w-[100px] md:w-[200px] mt-4">
                <Image
                  width={100}
                  height={100}
                  src={file}
                  alt={file}
                  className="w-[100px] md:w-[200px] h-[100px] md:h-[200px]  rounded-md object-cover"
                />
                <MyTypography
                  weight="bold"
                  className="absolute top-1 left-1 bg-white w-6 h-6 rounded-full flex items-center justify-center text-xs text-primary-600"
                >
                  {index + 1}
                </MyTypography>

                <div className="absolute flex items-center justify-center w-6 h-6 top-1 right-1 cursor-pointer bg-white rounded-full">
                  <DownloadGreen width="18" height="18" onClick={() => {}} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
