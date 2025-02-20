"use client";

import MyButton from "@/components/atoms/my-button";
import MyTypography from "@/components/atoms/my-typography";
import PATHS from "@/utils/paths";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function AreaParceiros() {
  const router = useRouter();
  
  return (
    <section className="px-4 my-6 space-y-6 text-center">
      <MyTypography variant="heading2" weight="medium">
        Sua jornada como parceiro B2 começa aqui!
      </MyTypography>
      <MyTypography variant="subtitle2" className="font-medium">
        Toda experiência fornecida na nossa plataforma precisa que o parceiro
        tenha total conhecimento e habilidades para oferecer aquela atividade.{" "}
      </MyTypography>
      <Image
        src="/images/parceiro/parceiro.jpeg"
        width={1200}
        height={800}
        alt="Image de um passeio"
        className="w-full max-sm:h-[310px] object-cover rounded-lg"
      />
      <MyTypography variant="subtitle2" className="font-medium">
        É importante que os nossos clientes sintam a paixão que o nosso parceiro
        tem pela atividade que está oferecendo.
      </MyTypography>
      <MyTypography variant="heading2" weight="bold">
        Venha fazer parte dessa parceria surreal!
      </MyTypography>

      <MyTypography variant="subtitle2" className="font-medium">
        Enviei sua atividade para avaliarmos se ela atende nossos padrões e
        requisitos. A aprovação de uma experiência depende de vários fatores.
      </MyTypography>
      <div className="md:w-1/2 md:mx-auto">
        <Image
          src="/images/thumb.png"
          alt="image-lp"
          width={400}
          height={400}
          className="mt-6 w-full"
        />
      </div>

      <MyTypography variant="subtitle2" className="font-medium">
        Torne a sua atividade uma experiência inesquecível e mostre que feita
        com você ela pode ser ainda mais especial.
      </MyTypography>
      <MyTypography variant="subtitle2" className="font-medium">
        Vamos começar!
      </MyTypography>

      <MyButton
        variant="default"
        borderRadius="squared"
        size="md"
        className="w-full md:w-1/4 h-14"
        onClick={() => router.push(PATHS["termos-parceiro"])}
      >
        Começar agora
      </MyButton>
    </section>
  );
}
