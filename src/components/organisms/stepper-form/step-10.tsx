"use client";

import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import { Dropzone } from "@/components/molecules/drop-zone";
import Image from "next/image";
import React, { useRef, useState } from "react";

export default function Step10() {
  const [files, setFiles] = useState<File[] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClickUpload = () => {
    inputRef.current?.click();
  };

  return (
    <section className="md:border-2 md:border-gray-200 md:rounded-xl md:p-16">
      <MyTypography variant="subtitle3" weight="bold" className="mb-1">
        Imagens da Atividade
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
      {/* Grid com 5 espaços para imagens */}
      <div className="grid grid-cols-3 gap-3 my-6">
        {Array.from({ length: 5 }).map((_, index) => {
          const file = files && files[index];

          return file ? (
            <div key={file.name} className="relative">
              <Image
                width={100}
                height={100}
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-[120px] h-[100px] rounded-md object-cover"
              />
              <MyIcon
                name="x-red"
                className="absolute top-1 right-1 cursor-pointer bg-white rounded-full"
                onClick={() =>
                  setFiles((prev) =>
                    prev ? prev.filter((item) => item.name !== file.name) : []
                  )
                }
              />
            </div>
          ) : (
            <div
              key={`placeholder-${index}`}
              className="w-[100px] h-[100px] border border-dashed border-neutral-400 rounded-md"
            />
          );
        })}
      </div>
    </section>
  );
}
