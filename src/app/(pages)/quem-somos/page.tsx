"use client";

import MyTypography from "@/components/atoms/my-typography";
import SearchActivity from "@/components/organisms/search-activity";
import Image from "next/image";
import React from "react";

export default function QuemSomos() {
  return (
    <section className="mx-4 my-8 space-y-6 text-center">
      <div className="md:hidden">
        <SearchActivity />
      </div>
      <div className="md:w-1/2 md:mx-auto space-y-4">
        <MyTypography variant="heading2" weight="bold" className="">
          Quem Somos
        </MyTypography>
        <MyTypography variant="label" className="">
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

        <div className="flex flex-col gap-2 justify-center md:w-1/2 md:mx-auto">
          <MyTypography variant="body-big" weight="bold" className="mt-4">
            Missão:
          </MyTypography>
          <MyTypography variant="label" className="">
            Facilitar a conexão entre clientes e parceiros para proporcionar
            experiências de esportes de aventura inesquecíveis.
          </MyTypography>

          <MyTypography variant="body-big" weight="bold" className="mt-4">
            Visão:
          </MyTypography>
          <MyTypography variant="label" className="">
            Ser referência no mercado de intermediação de atividades de esportes
            de aventura, promovendo aventuras seguras e emocionantes.
          </MyTypography>

          <MyTypography variant="body-big" weight="bold" className="mt-4">
            Valores:
          </MyTypography>
          <MyTypography variant="label" className="">
            Segurança, aventura, parceria, responsabilidade com o meio ambiente,
            inovação e excelência no atendimento.
          </MyTypography>
        </div>
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
