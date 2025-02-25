"use client";
import MyButton from "@/components/atoms/my-button";
import MyTypography from "@/components/atoms/my-typography";
import PATHS from "@/utils/paths";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function FifithSection() {
  const router = useRouter();

  return (
    <section className="max-sm:px-4 max-sm:my-8 my-4 md:mt-20 md:bg-primary-100 md:text-center py-8">
      <MyTypography variant="subtitle2" weight="bold" className="">
        Você é um Guia de Atividades?
      </MyTypography>
      <MyTypography variant="body-big" weight="regular" className="mt-2">
        Venha ser um de nossos parceiros!
      </MyTypography>
      <MyButton
        variant="black"
        borderRadius="squared"
        size="md"
        className="mt-8 w-full md:w-1/4 h-14"
        onClick={() => router.push(PATHS.parceiro)}
      >
        Seja um de nossos parceiros
      </MyButton>
      {/* <div className="w-full">
        <video src="/video.mp4" controls className="mt-4 w-full rounded-xl" />
      </div> */}
    </section>
  );
}
