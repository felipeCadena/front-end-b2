import MyButton from "@/components/atoms/my-button";
import MyTypography from "@/components/atoms/my-typography";
import CarouselImages from "@/components/organisms/carousel-images";
import React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function FirstSection() {
  const images = [
    { url: "/images/atividades/paraquedas.webp" },
    { url: "/images/atividades/moto.webp" },
    { url: "/images/atividades/cachoeira.webp" },
    { url: "/images/atividades/parapente.webp" },
    { url: "/images/atividades/escalada.webp" },
    { url: "/images/atividades/sup.webp" },
  ];

  return (
    <section className="mt-10 md:relative max-sm:px-4">
      <CarouselImages rounded images={images} />
      <div className="mt-4 px-4">
        <MyTypography
          variant="heading2"
          weight="bold"
          className={`md:font-my-font md:text-end md:absolute md:top-8 md:right-12 md:font-extrabold md:uppercase md:w-[23rem] md:text-[3rem] md:text-white md:drop-shadow-sm`}
        >
          Qual será sua próxima aventura?
        </MyTypography>
        <MyButton
          variant="default"
          size="md"
          borderRadius="squared"
          className="mt-4 md:absolute md:bottom-24 md:right-12"
        >
          Descobrir agora
        </MyButton>
      </div>
    </section>
  );
}
