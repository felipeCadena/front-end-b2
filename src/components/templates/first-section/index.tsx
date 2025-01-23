import MyButton from "@/components/atoms/my-button";
import MyTypography from "@/components/atoms/my-typography";
import CarouselImages from "@/components/organisms/carousel-images";
import Image from "next/image";
import React from "react";

export default function FirstSection() {
  const images = [
    "/images/atividades/montanha.webp",
    "/images/atividades/paraquedas.webp",
    "/images/atividades/mergulho.webp",
  ]
  return (
    <section className="mt-10">
      <CarouselImages images={images}/>
      <div className="mt-4 px-4">
        <MyTypography variant="heading2" weight="bold" className="">
          Qual será sua próxima aventura?
        </MyTypography>
        <MyButton variant="default" size="md" borderRadius="squared" className="mt-4">
          Descobrir agora
        </MyButton>
      </div>
    </section>
  );
}
