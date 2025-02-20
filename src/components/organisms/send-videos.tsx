"use client";

import React, { useRef, useState } from "react";
import { Dropzone } from "../molecules/drop-zone";
import MyIcon from "../atoms/my-icon";
import MyTypography from "../atoms/my-typography";
import Image from "next/image";
import MyButton from "../atoms/my-button";
import MyTextInput from "../atoms/my-text-input";

export default function SendVideos() {
  const [files, setFiles] = useState<File[] | null>(null);
  const [videoUrl, setVideoUrl] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickUpload = () => {
    inputRef.current?.click();
  };

  // Função para verificar se a URL é válida (simples validação)
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  // Função para extrair o ID do vídeo do YouTube
  const extractYoutubeID = (url: string) => {
    // Verifica se a URL possui '/embed/' e extrai o ID que vem a seguir
    const embedMatch = url.match(/\/embed\/([a-zA-Z0-9_-]+)/);
    if (embedMatch && embedMatch[1]) {
      return embedMatch[1];
    }
    // Caso queira suportar outras formas de URL, adicione outras regex aqui
    return null;
  };

  return (
    <section className="my-4">
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
            <MyTypography lightness={400}>
              Tamanho máximo de cada vídeo: 5MB
            </MyTypography>
          </div>
        </div>
      </Dropzone>

      <MyTextInput
        placeholder="Enviar url do vídeo online aqui"
        className="my-4 py-6 text-center text-xs"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        />
      
      <div className="flex flex-col gap-4">

        {files &&
          files.map((file, index) => (
            <div key={file.name} className="relative w-full">
              <video
                width={200}
                height={200}
                src={URL.createObjectURL(file)}
                muted
                className="w-full h-[200px] rounded-md object-cover"
              />
              {/* <MyTypography weight="bold" className="absolute top-1 left-1 bg-white w-6 h-6 rounded-full flex items-center justify-center text-xs text-primary-600">
                {index + 1}
              </MyTypography> */}
              <MyIcon
                name="x"
                className="absolute flex items-center justify-center w-6 h-6 top-2 right-2 cursor-pointer bg-white rounded-full"
                onClick={() =>
                  setFiles((prev) =>
                    prev ? prev.filter((item) => item.name !== file.name) : []
                  )
                }
              />
            </div>
          ))}
      </div>

       {/* Renderiza o vídeo da URL se for válida */}
       {videoUrl && isValidUrl(videoUrl) && (
          <div className="relative w-full">
            {extractYoutubeID(videoUrl) ? (
              // Se for uma URL do YouTube, exibe a thumbnail
              <img
                src={`https://img.youtube.com/vi/${extractYoutubeID(videoUrl)}/hqdefault.jpg`}
                alt="Thumbnail do YouTube"
                className="w-full h-[200px] rounded-md object-cover"
              />
            ) : (
              // Caso não seja do YouTube, tenta renderizar o vídeo normalmente
              <video
                width={200}
                height={200}
                src={videoUrl}
                muted
                className="w-full h-[200px] rounded-md object-cover"
              />
            )}
            <MyIcon
              name="x"
              className="absolute flex items-center justify-center w-6 h-6 top-2 right-2 cursor-pointer bg-white rounded-full"
              onClick={() => setVideoUrl("")}
            />
          </div>
        )}

      <MyButton
        variant="default"
        className="w-full my-8"
        size="lg"
        borderRadius="squared"
        onClick={() => console.log("Enviar")}
        >
        Enviar
        </MyButton>
    </section>
  );
}
