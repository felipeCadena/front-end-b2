"use client";

import MyTypography from "@/components/atoms/my-typography";
import SearchActivity from "@/components/organisms/search-activity";
import Image from "next/image";
import React from "react";

export default function QuemSomos() {
  return (
    <section className="m-4 space-y-6">
      <div className="md:hidden">
        <SearchActivity />
      </div>
      <div className="md:w-1/2 md:mx-auto text-center space-y-4">
        <MyTypography variant="heading2" weight="bold" className="text-center">
          Quem Somos
        </MyTypography>
        <MyTypography variant="label" className="text-center">
          Nascida no Rio de Janeiro, a B2 Adventure é o resultado do espírito
          aventureiro e desportista de sua idealizadora, que sempre gostou de
          misturar adrenalina em meio a natureza. A B2 Adventure é uma
          plataforma que oferece uma variedade gigantesca de atividades
          esportivas em meio à natureza, com os melhores profissionais do
          assunto. Nosso foco é permitir que os clientes desfrutem o que a de
          mais incrível em cada lugar desse mundão. Com entusiasmo e dedicação,
          criamos essa empresa para inspirar, motivar e direcionar aqueles que
          desejam explorar o desconhecido e viver intensamente cada momento da
          sua vida. Junte-se a nós e descubra um mundo de possibilidades, não
          importa se vc é um iniciante ou experiente, aqui tem espaço para você
          se divertir.
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
