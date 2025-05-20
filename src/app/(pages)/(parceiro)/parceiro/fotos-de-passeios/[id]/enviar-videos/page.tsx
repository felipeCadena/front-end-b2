"use client";

import { activities } from "@/common/constants/mock";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import ModalAlert from "@/components/molecules/modal-alert";
import SendVideos from "@/components/organisms/send-videos";
import { schedules } from "@/services/api/schedules";
import { getData } from "@/utils/formatters";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { send } from "process";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function EnviarVideos() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [sendVideos, setSendVideos] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [modalVideos, setModalVideos] = useState(false);

  const { data: schedulesMedia } = useQuery({
    queryKey: ["schedulesMedia"],
    queryFn: () => schedules.listScheduleMedias(id as string),
  });

  const { data: schedule } = useQuery({
    queryKey: ["schedule"],
    queryFn: () => schedules.getScheduleById(id as string),
  });

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

      setSendVideos(true);
      queryClient.invalidateQueries({ queryKey: ["schedulesMedia"] });
    } catch (error) {
      console.error("Erro ao enviar imagens:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMedia = async (mediaId: string) => {
    try {
      setIsLoading(true);
      await schedules.deleteScheduleMedia(id as string, mediaId);

      // Invalida a query para recarregar as imagens
      queryClient.invalidateQueries({ queryKey: ["schedulesMedia"] });
      toast.success("Imagem excluída com sucesso");
    } catch (error) {
      console.error("Erro ao excluir imagem:", error);
      toast.error("Erro ao excluir imagem");
    } finally {
      setIsLoading(false);
    }
  };

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
          Configuração da Atividade
        </MyTypography>
      </div>

      <div className="space-y-2 my-4">
        <MyTypography variant="subtitle3" weight="bold" className="">
          Enviar vídeos da atividade
        </MyTypography>
        {schedule?.dateMediasPosted ? (
          <MyTypography variant="label" lightness={500} className="">
            Vídeos enviados no dia {getData(schedule?.dateMediasPosted)}
          </MyTypography>
        ) : (
          <MyTypography variant="label" lightness={500} className="">
            Enviar os vídeos da atividade{" "}
            <span className="font-bold">
              {limitDateForMedias
                ? `até ${getData(limitDateForMedias)}`
                : "em até 7 dias após a realização da atividade"}
            </span>
          </MyTypography>
        )}
      </div>

      <SendVideos
        open={sendVideos}
        setOpen={setSendVideos}
        handleSendImages={handleSendImages}
        handleDeleteMedia={handleDeleteMedia}
        schedulesMedia={schedulesMedia}
        isLoading={isLoading}
      />
    </main>
  );
}
