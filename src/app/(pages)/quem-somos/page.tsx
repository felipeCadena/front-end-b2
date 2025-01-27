"use client";

import MyTypography from "@/components/atoms/my-typography";
import SearchActivity from "@/components/organisms/search-activity";
import Image from "next/image";
import React from "react";

export default function QuemSomos() {
  return (
    <section className="mx-4 space-y-6">
      <div className="md:hidden">
        <SearchActivity />
      </div>
      <div className="md:w-1/2 md:mx-auto text-center space-y-4">
        <MyTypography variant="heading2" weight="bold" className="text-center">
          Quem Somos
        </MyTypography>
        <MyTypography variant="label" className="text-center">
          Somos uma empresa que atua no mercado de turismo desde 2010, com o
          objetivo de proporcionar experiências inesquecíveis para nossos
          clientes.
        </MyTypography>
      </div>

      <Image
        src="/images/quem-somos-mobile.png"
        alt="Quem Somos"
        width={342}
        height={412}
        className="md:hidden"
      />
      <Image
        src="/images/quem-somos.png"
        alt="Quem Somos"
        width={342}
        height={412}
        className="max-sm:hidden md:w-full"
      />
    </section>
  );
}
