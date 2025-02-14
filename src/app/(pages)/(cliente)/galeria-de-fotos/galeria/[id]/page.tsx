"use client";

import { activities, album } from "@/common/constants/mock";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import { getData } from "@/utils/formatters";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function Galeria() {
  const { id } = useParams();
  const router = useRouter();

  const activity = activities.find((activity: any) => activity.id === id);

  return (
    <section className="m-6">
      <div className="relative flex gap-4 items-center">
        <MyIcon
          name="seta"
          className="rotate-180"
          onClick={() => router.back()}
        />
        <MyTypography variant="heading3" weight="bold" className="">
          Albúm de fotos
        </MyTypography>
      </div>

      <div className="flex flex-col gap-2 cursor-pointer w-1/2 mt-8">
        <MyTypography variant="heading3" weight="bold">
          {activity?.title}
        </MyTypography>
        <MyTypography variant="body-big" weight="bold">
          Data: {getData(activity?.reserva.timestamp ?? "", true)}
        </MyTypography>

        <div className="flex gap-2 items-center">
          <Image
            alt="foto parceiro"
            src={activity?.parceiro.avatar ?? ""}
            width={40}
            height={40}
            className="rounded-full"
          />
          <MyTypography variant="body" weight="medium" className="">
            {activity?.parceiro.nome}
          </MyTypography>
        </div>
      </div>


      <div className="grid grid-cols-2 gap-2 mt-4">
      <MyButton
        variant="default"
        borderRadius="squared"
        size="md"
        className="col-span-2 my-4"
        rightIcon={<MyIcon name="download" className="" />}
      >
        Baixar todas as imagens
      </MyButton>
        {album.map((foto: any, index: number) => (
          <div key={index} className="flex justify-center relative">
            <Image
              src={foto}
              alt="foto"
              width={150}
              height={150}
              className="rounded-lg object-cover"
            />
            <MyIcon name="download-green" className="absolute top-2 right-3 bg-white p-2 rounded-lg cursor-pointer" />
            
          </div>
        ))}
      </div>
    </section>
  );
}
