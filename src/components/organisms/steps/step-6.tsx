"use client";

import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import { Dropzone } from "@/components/molecules/drop-zone";
import { useAdventureStore } from "@/store/useAdventureStore";
import Image from "next/image";
import React, { useRef, useState } from "react";

export default function Step6() {
  const { setAdventureData, tempImages, addTempImage } = useAdventureStore();

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClickUpload = () => {
    inputRef.current?.click();
  };

  const handleImages = (fileList: FileList) => {
    const files = Array.from(fileList);
    for (const file of files) {
      addTempImage(file); // Usa o método do store que já converte para base64 e salva como string
    }
  };

  React.useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <section>
      <MyTypography variant="subtitle3" weight="bold" className="mb-1">
        Imagens da Atividade
      </MyTypography>
      <MyTypography variant="body" weight="medium" className="mb-1">
        <span className="text-red-500">Atenção:</span> Dê preferência para fotos
        na horizontal
      </MyTypography>
      <MyTypography
        variant="body"
        weight="medium"
        lightness={400}
        className="mb-4"
      >
        Máximo de 5 fotos por atividade
      </MyTypography>

      <Dropzone
        ref={inputRef}
        disabled={tempImages?.length == 5}
        onChange={(files) => files && handleImages(files)}
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
            <MyTypography lightness={400}>
              ou arraste os arquivos aqui
            </MyTypography>
            <MyTypography lightness={400}>JPG e PNG</MyTypography>
            <MyTypography lightness={400}>
              Tamanho máximo de cada imagem: 1MB
            </MyTypography>
          </div>
        </div>
      </Dropzone>

      {/* Grid com 5 espaços para imagens */}
      <div className="grid grid-cols-3 gap-3 my-6">
        {Array.from({ length: 5 }).map((_, index) => {
          const file = tempImages && tempImages[index];

          const isBase64 = typeof file === "string";
          const imageUrl = isBase64
            ? file
            : file instanceof File
              ? URL.createObjectURL(file)
              : "";

          return file ? (
            <div key={index} className="relative w-full h-[100px]">
              <Image
                fill
                src={imageUrl}
                alt={`Imagem ${index}`}
                className="rounded-md object-cover"
              />
              <MyIcon
                name="x-red"
                className="absolute top-1 right-1 cursor-pointer bg-white rounded-full"
                onClick={() =>
                  setAdventureData({
                    tempImages: tempImages.filter((_, i) => i !== index),
                  })
                }
              />
            </div>
          ) : (
            <div
              key={`placeholder-${index}`}
              className="w-full h-[100px] border border-dashed border-neutral-400 rounded-md"
            />
          );
        })}
      </div>
    </section>
  );
}
