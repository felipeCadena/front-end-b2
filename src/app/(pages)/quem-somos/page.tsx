"use client";

import MyTypography from "@/components/atoms/my-typography";
import SearchActivity from "@/components/organisms/search-activity";
import Image from "next/image";
import React from "react";

export default function QuemSomos() {
  return (
    <section className="my-8 space-y-8 md:space-y-16 text-center md:w-full">
      <div className="grid md:grid-cols-2 gap-8 md:gap-16 max-sm:mx-4">
        <div className="space-y-6 text-left">
          <MyTypography
            variant="heading2"
            weight="bold"
            className="text-center"
          >
            Quem Somos
          </MyTypography>
          <MyTypography variant="label" className="">
            Nascida no Rio de Janeiro, a B2 Adventure é o resultado do espírito
            aventureiro e desportista de sua idealizadora, que sempre gostou de
            misturar adrenalina em meio a natureza.
          </MyTypography>

          <MyTypography variant="label" className="">
            A B2 Adventure é uma plataforma que oferece uma variedade gigantesca
            de atividades esportivas em meio à natureza, com os melhores
            profissionais do assunto.
          </MyTypography>

          <MyTypography variant="label" className="">
            Nosso foco é permitir que os clientes desfrutem o que a de mais
            incrível em cada lugar desse mundão.
          </MyTypography>

          <MyTypography variant="label" className="">
            Com entusiasmo e dedicação, criamos essa empresa para inspirar,
            motivar e direcionar aqueles que desejam explorar o desconhecido e
            viver intensamente cada momento da sua vida.
          </MyTypography>

          <MyTypography variant="label" className="">
            Junte-se a nós e descubra um mundo de possibilidades, não importa se
            vc é um iniciante ou experiente, aqui tem espaço para você se
            divertir.
          </MyTypography>
        </div>

        <div className="flex flex-col justify-around ">
          <div>
            <MyTypography variant="body-big" weight="bold" className="mt-4">
              Missão:
            </MyTypography>
            <MyTypography variant="label" className="mt-2">
              Facilitar a conexão entre clientes e parceiros para proporcionar
              experiências de esportes de aventura inesquecíveis.
            </MyTypography>
          </div>
          <div>
            <MyTypography variant="body-big" weight="bold" className="mt-4">
              Visão:
            </MyTypography>
            <MyTypography variant="label" className="mt-2">
              Ser referência no mercado de intermediação de atividades de
              esportes de aventura, promovendo aventuras seguras e emocionantes.
            </MyTypography>
          </div>
          <div>
            <MyTypography variant="body-big" weight="bold" className="mt-4">
              Valores:
            </MyTypography>
            <MyTypography variant="label" className="mt-2">
              Segurança, aventura, parceria, responsabilidade com o meio
              ambiente, inovação e excelência no atendimento.
            </MyTypography>
          </div>
        </div>
      </div>

      {/* <Image
        src="/images/quem-somos.webp"
        alt="Quem Somos"
        width={342}
        height={412}
        className="md:hidden"
      /> */}
      <Image
        src="/images/quem-somos.webp"
        alt="Quem Somos"
        width={342}
        height={390}
        className="w-full h-[280px] md:h-[500px] object-cover object-bottom md:rounded-xl"
      />
    </section>
  );
}
