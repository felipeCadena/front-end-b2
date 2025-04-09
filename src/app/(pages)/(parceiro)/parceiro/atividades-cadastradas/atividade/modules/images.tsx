"use client";

import { mockAlbum } from "@/common/constants/mock";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import Edit from "@/components/atoms/my-icon/elements/edit";
import { Dropzone } from "@/components/molecules/drop-zone";
import { Adventure, adventures } from "@/services/api/adventures";
import { cn } from "@/utils/cn";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

type UpdateImagesProps = {
  formData: Adventure; // Tipo da sua atividade
  onClose: () => void;
};

export default function UpdateImages({ formData, onClose }: UpdateImagesProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRefs = React.useRef(new Map<number, HTMLInputElement>());
  const queryClient = useQueryClient();
  const [images, setImages] = React.useState(formData.images);

  const handleClickUpload = (id: number) => {
    const ref = inputRefs.current.get(id);
    if (ref) ref.click();
  };

  useEffect(() => {
    setImages(formData.images);
  }, [formData.images]);

  const uploadImage = async (file: File, mediaId: string) => {
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const image = {
        mimetype: file.type,
        file: new Blob([arrayBuffer]),
      };
      try {
        await adventures.updateMedia(formData.id, mediaId, image);

        queryClient.invalidateQueries({ queryKey: ["activity"] });

        toast.success("Imagem alterada com sucesso!");
      } catch (error) {
        console.error("Erro ao enviar imagem", error);
      }
    }
  };

  return (
    <section className="space-y-16">
      <div className="max-sm:hidden grid grid-cols-4 grid-rows-2 gap-4">
        {images.map((image, index) => (
          <div
            className={cn(
              "relative h-full w-full",
              index === 0 && "col-span-2 row-span-2 h-full"
            )}
            key={index}
          >
            <Image
              src={image.url ?? "/images/atividades/ar/ar-1.jpeg"}
              alt="fotos da atividade"
              width={300}
              height={300}
              className="w-full h-full rounded-lg object-cover"
            />
            <div className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
              <Dropzone
                ref={(ref) => {
                  if (ref) {
                    inputRefs.current.set(index, ref);
                  }
                }}
                small
                className="cursor-pointer"
                onChange={(fileList) => {
                  console.log(image);
                  if (fileList) {
                    uploadImage(fileList[0], image.id ?? "");
                  }
                }}
                accept="jpg, png, image/*"
              >
                <div onClick={() => handleClickUpload(index)}>
                  <Edit fill="#8DC63F" />
                </div>
              </Dropzone>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        <MyButton
          borderRadius="squared"
          size="lg"
          type="submit"
          variant="outline-neutral"
          className="w-full"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancelar
        </MyButton>
        <MyButton
          borderRadius="squared"
          size="lg"
          type="submit"
          variant="default"
          className="w-full"
          onClick={onClose}
          disabled={isLoading}
        >
          Concluir
        </MyButton>
      </div>
    </section>
  );
}
