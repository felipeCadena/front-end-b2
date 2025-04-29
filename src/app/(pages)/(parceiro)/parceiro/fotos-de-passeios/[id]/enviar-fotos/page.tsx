"use client";

import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import SendImages from "@/components/organisms/send-images";
import { schedules } from "@/services/api/schedules";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function EnviarFotos() {
  const router = useRouter();
  const { id } = useParams();

  const handleSendImages = async (files: File[]) => {
    try {
      const uploadMedias = await schedules.postScheduleMedias(
        id as string,
        files.map((file, index) => ({
          filename: file.name,
          mimetype: file.type,
          title: "", // Você pode preencher se quiser
          description: "", // Você pode preencher se quiser
          isDefault: index === 0, // primeiro arquivo é default
          file: file, // aqui mandamos o File direto, que é um Blob
        }))
      );

      console.log("Upload metadata enviado:", uploadMedias);
    } catch (error) {
      console.error("Erro ao enviar imagens:", error);
    }
  };

  return (
    <main className="my-6 mx-4">
      <div className="flex gap-4 items-center">
        <MyIcon
          name="voltar-black"
          className="-ml-2"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle1" weight="bold" className="">
          Configuração da Atividade
        </MyTypography>
      </div>

      <div className="space-y-2 mt-4">
        <MyTypography variant="subtitle3" weight="bold" className="">
          Enviar fotos da atividade
        </MyTypography>
        <MyTypography variant="label" lightness={500} className="">
          Enviar as fotos da atividade{" "}
          <span className="font-bold">até o dia 05/04/2024</span>
        </MyTypography>
      </div>

      <SendImages handleSendImages={handleSendImages} />
    </main>
  );
}
