"use client";

import React, { useRef, useState } from "react";
import { Dropzone } from "../molecules/drop-zone";
import MyIcon from "../atoms/my-icon";
import MyTypography from "../atoms/my-typography";
import Image from "next/image";
import MyButton from "../atoms/my-button";

export default function SendImages({
  config,
  handleSendImages,
  isLoading,
}: {
  config?: boolean;
  handleSendImages: (files: File[]) => void;
  isLoading: boolean;
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
    }
  };

  return (
    <section className="space-y-6">
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
        {config ? "Salvar" : "Enviar"}
      </MyButton>
    </section>
  );
}
