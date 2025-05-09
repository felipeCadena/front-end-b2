"use client";

import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import ModalAlert from "@/components/molecules/modal-alert";
import SendImages from "@/components/organisms/send-images";
import { schedules } from "@/services/api/schedules";
import { getData } from "@/utils/formatters";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function EnviarFotos() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [sendImages, setSendImages] = React.useState(false);
  const [modalImages, setModalImages] = React.useState(false);
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["schedulesMedia"] });
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
      <ModalAlert
        open={modalImages}
        onClose={() => setModalImages(false)}
        onAction={() => setModalImages(false)}
        button="Voltar ao início"
        title="Fotos Enviadas"
        descrition="As fotos dessa atividade foram enviadas para os seus clientes que participaram neste dia com sucesso."
        iconName="sucess"
      />

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
        {schedule?.dateMediasPosted ? (
          <MyTypography variant="label" lightness={500} className="">
            Imagens enviadas no dia {getData(schedule?.dateMediasPosted)}
          </MyTypography>
        ) : (
          <MyTypography variant="label" lightness={500} className="">
            Enviar as fotos da atividade{" "}
            <span className="font-bold">
              {limitDateForMedias
                ? `até ${getData(limitDateForMedias)}`
                : "em até 7 dias após a realização da atividade"}
            </span>
          </MyTypography>
        )}
      </div>

      <SendImages
        open={sendImages}
        setOpen={setSendImages}
        handleSendImages={handleSendImages}
        handleDeleteMedia={handleDeleteMedia}
        schedulesMedia={schedulesMedia}
        isLoading={isLoading}
      />
    </main>
  );
}
