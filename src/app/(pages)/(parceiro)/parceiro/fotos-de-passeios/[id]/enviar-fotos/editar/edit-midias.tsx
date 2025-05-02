"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import Edit from "@/components/atoms/my-icon/elements/edit";
import MyTypography from "@/components/atoms/my-typography";
import { Dropzone } from "@/components/molecules/drop-zone";
import ModalAlert from "@/components/molecules/modal-alert";
import { Media, schedules } from "@/services/api/schedules";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function EditMidias({
  open,
  setOpen,
  handleSendImages,
  schedulesMedia,
  isLoading,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  config?: boolean;
  schedulesMedia?: any;
  handleSendImages: (files: File[]) => void;
  isLoading: boolean;
}) {
  const [files, setFiles] = useState<File[] | null>(null);
  const [images, setImages] = useState<Media[]>(schedulesMedia);
  const inputRefs = React.useRef(new Map<number, HTMLInputElement>());
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const handleClickUploadMultiple = (id: number) => {
    const ref = inputRefs.current.get(id);
    if (ref) ref.click();
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickUpload = () => {
    inputRef.current?.click();
  };

  const sendFiles = (files: File[] | null) => {
    if (files) {
      console.log(files);
      handleSendImages(files);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setFiles(null);
  };

  const uploadImage = async (
    file: File,
    schedulesId: string,
    mediaId: string
  ) => {
    if (file) {
      setLoading(true);
      const arrayBuffer = await file.arrayBuffer();
      const image = {
        mimetype: file.type,
        file: new Blob([arrayBuffer]),
      };
      console.log(image);
      try {
        await schedules.updateScheduleMedia(schedulesId, mediaId, true, image);
        queryClient.invalidateQueries({ queryKey: ["activity"] });
        toast.success("Imagem alterada com sucesso!");
      } catch (error) {
        console.error("Erro ao enviar imagem", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="space-y-6">
      <ModalAlert
        open={open}
        onClose={handleClose}
        iconName="warning"
        title="Fotos enviadas"
        descrition="As fotos dessa atividade foram envidas para os seus clientes que participaram neste dia com sucesso."
        button="Voltar ao início"
      />

      <div className="grid grid-cols-3 md:flex md:flex-wrap gap-4 items-center">
        {files &&
          files.map((file, index) => (
            <div key={file.name} className="relative w-[100px] mt-4">
              <Image
                width={100}
                height={100}
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-[100px] h-[100px] rounded-md object-cover"
              />
              <MyTypography
                weight="bold"
                className="absolute top-1 left-1 bg-white w-6 h-6 rounded-full flex items-center justify-center text-xs text-primary-600"
              >
                {index + 1}
              </MyTypography>
              <MyIcon
                name="x"
                className="absolute flex items-center justify-center w-6 h-6 top-1 right-1 cursor-pointer bg-white rounded-full"
                onClick={() =>
                  setFiles((prev) =>
                    prev ? prev.filter((item) => item.name !== file.name) : []
                  )
                }
              />
            </div>
          ))}
        {images &&
          images.map((file, index) => (
            <div key={file.name} className="relative w-[100px] mt-4">
              <Image
                width={100}
                height={100}
                src={file.url}
                alt={file.name}
                className="w-[100px] h-[100px] rounded-md object-cover"
              />
              <MyTypography
                weight="bold"
                className="absolute top-1 left-1 bg-white w-6 h-6 rounded-full flex items-center justify-center text-xs text-primary-600"
              >
                {index + 1}
              </MyTypography>
              <div className="absolute top-1 right-1 bg-white w-6 h-6 rounded-full shadow-md flex items-center justify-center">
                <Dropzone
                  ref={(ref) => {
                    if (ref) {
                      inputRefs.current.set(index, ref);
                    }
                  }}
                  small
                  className="cursor-pointer"
                  onChange={(fileList) => {
                    if (fileList) {
                      console.log(fileList[0]);
                      uploadImage(fileList[0], file?.scheduleId, file?.id);
                    }
                  }}
                  accept="jpg, png, image/*"
                >
                  <div onClick={() => handleClickUploadMultiple(index)}>
                    <Edit fill="#8DC63F" width="20" height="20" />
                  </div>
                </Dropzone>
              </div>
            </div>
          ))}
      </div>
      <Dropzone
        ref={inputRef}
        disabled={files?.length == 5}
        onChange={(fileList) => {
          fileList &&
            setFiles((prev) => {
              if (prev) {
                return [...prev, ...Array.from(fileList)];
              }
              return [...Array.from(fileList)];
            });
        }}
        multiple={true}
        accept="jpg, png, image/*"
      >
        <div
          className="flex cursor-pointer flex-col items-center justify-center gap-y-2"
          onClick={handleClickUpload}
        >
          <MyIcon name="upload" />
          <div className="text-center space-y-2">
            <MyTypography variant="body-big" lightness={400}>
              Enviar imagens
            </MyTypography>
            <MyTypography lightness={400} className="max-sm:hidden">
              ou arraste os arquivos aqui
            </MyTypography>
            <MyTypography lightness={400}>JPG e PNG</MyTypography>
            <MyTypography lightness={400}>
              Tamanho máximo de cada imagem: 1MB
            </MyTypography>
          </div>
        </div>
      </Dropzone>

      <MyButton
        variant="default"
        className="w-full"
        size="lg"
        borderRadius="squared"
        isLoading={isLoading}
        onClick={() => sendFiles(files)}
      >
        Salvar
      </MyButton>
    </section>
  );
}
