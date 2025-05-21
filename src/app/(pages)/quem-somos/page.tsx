"use client";

import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import PATHS from "@/utils/paths";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function QuemSomos() {
  const router = useRouter();
  return (
    <section className="my-8 space-y-8 md:space-y-12 md:max-w-4xl md:mx-auto">
      <div className="max-sm:mx-4 space-y-8">
        <div className="space-y-6">
          <div className="flex gap-1 items-center">
            <MyIcon
              name="voltar-black"
              className="cursor-pointer"
              onClick={() => router.push(PATHS.initial)}
            />
            <MyTypography variant="heading2" weight="bold" className="">
              Quem somos
            </MyTypography>
          </div>
          <MyTypography variant="body-big" className="text-justify">
            Nascida no Rio de Janeiro, a B2 Adventure é o resultado do espírito
            aventureiro e desportista de sua idealizadora, que sempre gostou de
            misturar adrenalina em meio a natureza.
          </MyTypography>

          <MyTypography variant="body-big" className="text-justify">
            A B2 Adventure é uma plataforma que oferece uma variedade gigantesca
            de atividades esportivas em meio à natureza, com os melhores
            profissionais do assunto.
          </MyTypography>

          <MyTypography variant="body-big" className="text-justify">
            Nosso foco é permitir que os clientes desfrutem o que há de mais
            incrível em cada lugar desse mundão.
          </MyTypography>

          <MyTypography variant="body-big" className="text-justify">
            Com entusiasmo e dedicação, criamos essa empresa para inspirar,
            motivar e direcionar aqueles que desejam explorar o desconhecido e
            viver intensamente cada momento da sua vida.
          </MyTypography>

          <MyTypography variant="body-big" className="text-justify">
            Junte-se a nós e descubra um mundo de possibilidades, não importa se
            vc é um iniciante ou experiente, aqui tem espaço para você se
            divertir.
          </MyTypography>
        </div>

        <div className="flex flex-col justify-around">
          <div>
            <MyTypography variant="subtitle3" weight="bold" className="mt-4">
              Missão:
            </MyTypography>
            <MyTypography variant="body-big" className="mt-2 text-justify">
              Facilitar a conexão entre clientes e parceiros para proporcionar
              experiências de esportes de aventura inesquecíveis.
            </MyTypography>
          </div>
          <div>
            <MyTypography variant="subtitle3" weight="bold" className="mt-4">
              Visão:
            </MyTypography>
            <MyTypography variant="body-big" className="mt-2 text-justify">
              Ser referência no mercado de intermediação de atividades de
              esportes de aventura, promovendo aventuras seguras e emocionantes.
            </MyTypography>
          </div>
          <div>
            <MyTypography variant="subtitle3" weight="bold" className="mt-4">
              Valores:
            </MyTypography>
            <MyTypography variant="body-big" className="mt-2 text-justify">
              Segurança, aventura, parceria, responsabilidade com o meio
              ambiente, inovação e excelência no atendimento.
            </MyTypography>
          </div>
        </div>
      </div>
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
