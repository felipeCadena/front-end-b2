"use client";

import React, { useRef, useState } from "react";
import { Dropzone } from "../molecules/drop-zone";
import MyIcon from "../atoms/my-icon";
import MyTypography from "../atoms/my-typography";
import Image from "next/image";
import MyButton from "../atoms/my-button";
import MyTextInput from "../atoms/my-text-input";
import ModalAlert from "../molecules/modal-alert";
import MySpinner from "../atoms/my-spinner";

export default function SendVideos({
  open,
  setOpen,
  config,
  handleSendImages,
  handleDeleteMedia,
  isLoading,
  schedulesMedia,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  config?: boolean;
  handleSendImages: (files: File[]) => void;
  handleDeleteMedia: (mediaId: string) => void;
  isLoading: boolean;
  schedulesMedia?: any;
}) {
  const [files, setFiles] = useState<File[] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickUpload = () => {
    inputRef.current?.click();
  };

  const sendFiles = (files: File[] | null) => {
    if (files) {
      console.log(files);
      handleSendImages(files);
      setFiles(null);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setFiles(null);
  };

  console.log(files);

  return (
    <section className="space-y-6">
      <ModalAlert
        open={open}
        onClose={handleClose}
        onAction={handleClose}
        button="Voltar ao início"
        title="Vídeos Enviadas"
        descrition="Os vídeos dessa atividade foram enviadas para os seus clientes que participaram neste dia com sucesso."
        iconName="sucess"
      />

      {isLoading && (
        <div className="flex items-center justify-center w-full h-20">
          <MySpinner className="h-10 w-10" />
        </div>
      )}

      <div className="grid grid-cols-3 md:flex md:flex-wrap gap-4 items-center">
        {schedulesMedia &&
          !isLoading &&
          schedulesMedia
            ?.filter((video: any) => video?.mimetype?.includes("video"))
            ?.map((media: any, index: number) => (
              <div key={media.id} className="relative w-[16rem] mt-4">
                <video
                  src={media?.url}
                  className="w-[16rem] h-[16rem] rounded-md object-cover"
                  controls
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
                  onClick={() => handleDeleteMedia(media.id)}
                />
              </div>
            ))}

        {files &&
          files?.map((file, index) => (
            <div key={file.name} className="relative w-[16rem] mt-4">
              <video
                src={URL.createObjectURL(file)}
                className="w-[16rem] h-[16rem] rounded-md object-cover"
                controls
              />
              <MyTypography
                weight="bold"
                className="absolute top-1 left-1 bg-white w-6 h-6 rounded-full flex items-center justify-center text-xs text-primary-600"
              >
                {schedulesMedia.length + index + 1}
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
        accept="mp4, video/*"
      >
        <div
          className="flex cursor-pointer flex-col items-center justify-center gap-y-2"
          onClick={handleClickUpload}
        >
          <MyIcon name="upload" />
          <div className="text-center space-y-2">
            <MyTypography variant="body-big" lightness={400}>
              Enviar vídeo e fazer o upload de arquivo
            </MyTypography>
            <MyTypography lightness={400} className="max-sm:hidden">
              ou arraste os arquivos aqui
            </MyTypography>
            {/* <MyTypography lightness={400}>
              Tamanho máximo de cada vídeo: 5MB
            </MyTypography> */}
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
        {config ? "Salvar" : "Enviar"}
      </MyButton>
    </section>
  );
}
