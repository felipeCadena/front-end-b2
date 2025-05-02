"use client";

import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import SendImages from "@/components/organisms/send-images";
import { schedules } from "@/services/api/schedules";
import { getData } from "@/utils/formatters";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import Edit from "./edit-midias";

export default function EditarMidias() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [sendImages, setSendImages] = React.useState(false);

  const handleSendImages = async (files: File[]) => {
    setIsLoading(true);
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

      setSendImages(true);
    } catch (error) {
      console.error("Erro ao enviar imagens:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const { data: schedulesMedia } = useQuery({
    queryKey: ["schedulesMedia"],
    queryFn: () => schedules.listScheduleMedias(id as string),
  });

  const { data: schedule } = useQuery({
    queryKey: ["schedule"],
    queryFn: () => schedules.getScheduleById(id as string),
  });

  const limitDateForMedias = schedule?.limitDateForMedias;

  return (
    <main className="my-6 mx-4">
      <div className="flex gap-4 items-center">
        <MyIcon
          name="voltar-black"
          className="-ml-2"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle1" weight="bold" className="">
          Editar Mídias
        </MyTypography>
      </div>

      <Edit
        open={sendImages}
        schedulesMedia={schedulesMedia}
        setOpen={setSendImages}
        handleSendImages={handleSendImages}
        isLoading={isLoading}
      />
    </main>
  );
}
