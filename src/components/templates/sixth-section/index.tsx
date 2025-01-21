"use client";
import MyButton from "@/components/atoms/my-button";
import MyTypography from "@/components/atoms/my-typography";
import PATHS from "@/utils/paths";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function SixthSection() {
    const router = useRouter();

  return (
    <section className="my-20">
      <MyTypography variant="subtitle2" weight="bold" className="">
        Você é um Guia de Atividades?
      </MyTypography>
      <MyTypography variant="body-big" weight="regular" className="">
        Venha ser um de nossos parceiros!
      </MyTypography>
    <Image
        src="/images/thumb.png"
        alt="image-lp"  
        width={400}
        height={400}
        className="mt-6"
        />
        <MyButton variant="black" borderRadius="squared" size="md" className="mt-5 w-full h-14" onClick={() => router.push(PATHS.parceiros)}>
          Seja um de nossos parceiros
        </MyButton>
      {/* <div className="w-full">
        <video src="/video.mp4" controls className="mt-4 w-full rounded-xl" />
      </div> */}
    </section>
  );
}
