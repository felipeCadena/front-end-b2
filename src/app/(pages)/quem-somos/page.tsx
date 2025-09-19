"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import Check from "@/components/atoms/my-icon/elements/check";
import Connections from "@/components/atoms/my-icon/elements/connection";
import Contract from "@/components/atoms/my-icon/elements/contract";
import Dollar from "@/components/atoms/my-icon/elements/dollar";
import Hiking from "@/components/atoms/my-icon/elements/hiking";
import Lock from "@/components/atoms/my-icon/elements/lock";
import LoudsSpeaker from "@/components/atoms/my-icon/elements/loudspeaker";
import MyTypography from "@/components/atoms/my-typography";
import PATHS from "@/utils/paths";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function QuemSomos() {
  const router = useRouter();

  return (
    <section className="text-center my-6 max-sm:overflow-x-hidden">
      <div className="relative ">
        <MyTypography
          variant="heading1"
          weight="bold"
          className="text-center text-[2.5rem] md:text-[5rem] my-4 md:my-6"
        >
          Quem somos
        </MyTypography>
        <Image
          src="/images/quem-somos/quem01.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full h-[200px] md:h-[400px] object-cover md:rounded-lg"
        />

        <div className="p-[4px] rounded-full absolute -bottom-[3rem] md:-bottom-[4.2rem] left-[40%] md:left-[46%] w-[90px] h-[90px] md:w-[120px] md:h-[120px]">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
            <Image
              src="/logo.png"
              width={1200}
              height={800}
              alt="Logo b2"
              className="w-full h-full object-cover object-top rounded-full scale-110"
            />
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-20 mb-6 md:mb-10 px-4 flex max-sm:flex-col gap-6 md:justify-center">
        <MyTypography
          variant="heading3"
          weight="bold"
          className="text-left md:text-right md:w-1/2 text-[1rem] md:text-[1.3rem] uppercase"
        >
          A B2 Adventure é o ponto de partida para quem quer viver o melhor do
          turismo de aventura no Brasil.
        </MyTypography>

        <MyTypography
          variant="heading3"
          weight="regular"
          className="text-left md:w-1/2 text-[1rem] md:text-[1.3rem]"
        >
          Criada no Rio de Janeiro e com a missão de se expandir por todo o
          Brasil, a plataforma conecta pessoas que buscam viver momentos únicos
          a profissionais que dominam cada atividade e conhecem a fundo os
          lugares onde elas acontecem.
        </MyTypography>
      </div>

      <div className="relative mt-6 md:mt-24">
        <div className="grid md:grid-cols-2 gap-6 justify-center">
          <Image
            src="/images/quem-somos/quem02.jpeg"
            width={1200}
            height={800}
            alt="Image de um passeio"
            className="w-full h-[250px] md:h-[400px] object-cover"
          />
          <Image
            src="/images/quem-somos/quem04.jpeg"
            width={1200}
            height={800}
            alt="Image de um passeio"
            className="w-full h-[250px] md:h-[400px] object-cover max-sm:hidden"
          />
        </div>

        <div className="absolute -top-14 left-[33%] p-6 bg-primary-600 z-50 w-1/3 max-sm:hidden">
          <MyTypography
            variant="heading3"
            weight="bold"
            className="text-white text-[1rem] md:text-[1.3rem] uppercase"
          >
            Nossos parceiros são parte fundamental dessa jornada.
          </MyTypography>
        </div>
      </div>

      {/* <div className="mt-8 w-[100px] h-[4px] opacity-60 mx-auto rounded-full bg-gradient-to-r from-[#1fa9e0] to-[#62bb46]" /> */}

      <div className="mt-8 md:mt-10">
        <MyTypography
          variant="heading3"
          weight="regular"
          className="text-left max-sm:px-4 max-sm:mb-4 text-[1rem] md:text-[1.3rem]"
        >
          Aqui você encontra, em um só espaço, uma variedade de esportes de
          aventura: desde trilhas que revelam paisagens surpreendentes até
          mergulhos que abrem as portas para um mundo subaquático cheio de vida;
          de voos de paraquedas que fazem o coração disparar até remadas,
          escaladas, saltos de wakeboard, passeios de veleiro e muito mais. A
          cada escolha, uma nova forma de sentir a energia da natureza e
          descobrir o que ela tem de mais fascinante.
        </MyTypography>
        <MyTypography
          variant="subtitle2"
          weight="medium"
          className="text-left mt-6 max-sm:px-4 max-sm:mb-4 text-[1rem] md:text-[1.3rem]"
        >
          Acreditamos que se aventurar é muito mais do que praticar um esporte.
          É viver uma experiência transformadora, criar memórias duradouras e se
          conectar com pessoas, culturas e histórias. Por isso, trabalhamos para
          que cada detalhe seja pensado com praticidade e segurança, garantindo
          liberdade na hora de escolher quando, onde e como se aventurar..
        </MyTypography>
        <MyTypography
          variant="subtitle2"
          weight="medium"
          className="text-left mt-6 max-sm:px-4 max-sm:mb-4 text-[1rem] md:text-[1.3rem] md:hidden"
        >
          Nossos parceiros são parte fundamental dessa jornada.
        </MyTypography>
        <MyTypography
          variant="subtitle2"
          weight="bold"
          className="text-primary-600 text-left mt-6 max-sm:px-4 max-sm:mb-4 text-[1rem] md:text-[1.3rem]"
        >
          Selecionamos profissionais experientes e apaixonados, que estão
          preparados para guiar cada cliente com responsabilidade, cuidado e
          entusiasmo. Essa união nos permite oferecer aventuras que unem emoção,
          confiança e qualidade.
        </MyTypography>
      </div>

      <div className="mt-10 md:mt-16">
        <div className="">
          <Image
            src="/images/quem-somos/quem03.jpeg"
            width={1200}
            height={800}
            alt="Image de um passeio"
            className="w-full h-[250px] md:h-[600px] object-cover max-sm:hidden"
          />
          <Image
            src="/images/quem-somos/quem04.jpeg"
            width={1200}
            height={800}
            alt="Image de um passeio"
            className="w-full h-[250px] md:h-[400px] object-cover md:hidden"
          />
        </div>
        <MyTypography
          variant="subtitle2"
          weight="extrabold"
          className="text-left mt-10 md:mt-16 px-4 max-sm:mb-4 text-[1rem] md:text-[1.3rem]"
        >
          A B2 Adventure é, acima de tudo, um convite: sair da rotina, explorar
          o novo e sentir a natureza de perto. Uma ponte entre você e
          experiências que fazem sentido, criadas para serem lembradas e
          compartilhadas.
        </MyTypography>
      </div>

      <div className="mt-10">
        <div className="">
          <Image
            src="/images/quem-somos/quem03.jpeg"
            width={1200}
            height={800}
            alt="Image de um passeio"
            className="w-full h-[250px] md:h-[600px] object-cover md:hidden"
          />
        </div>
      </div>

      <div className="max-sm:space-y-12 mt-20 md:flex items-stretch gap-4">
        <div className="relative w-full md:w-2/3 mx-auto max-sm:my-8 px-4 ">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 ">
            <div className="w-12 h-12 rounded-full bg-white border border-primary-600 flex items-center justify-center">
              <MyIcon name="mountains" />
            </div>
          </div>

          <div className="rounded-xl  border-opacity-90 border-2 border-transparent bg-white bg-gradient-to-r from-[#1fa9e0] to-[#62bb46]">
            <div className="rounded-xl bg-white p-6 text-center md:min-h-[230px]">
              <MyTypography
                variant="subtitle2"
                weight="regular"
                className="text-[0.9rem] md:text-[1.2rem] mt-2"
              >
                <span className="font-bold block">Missão:</span>
                Conectar pessoas à maior variedade de esportes de aventura em
                meio à natureza, com segurança e praticidade.
              </MyTypography>
            </div>
          </div>
        </div>

        <div className="relative w-full md:w-2/3 mx-auto max-sm:my-8 px-4 ">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-12 rounded-full bg-white border border-primary-600 flex items-center justify-center">
              <MyIcon name="binoculars" />
            </div>
          </div>

          <div className="rounded-xl border-opacity-90 border-2 border-transparent bg-white bg-gradient-to-r from-[#1fa9e0] to-[#62bb46]">
            <div className="rounded-xl bg-white p-6 text-center md:min-h-[230px]">
              <MyTypography
                variant="subtitle2"
                weight="regular"
                className="text-[0.9rem] md:text-[1.2rem] mt-2"
              >
                <span className="font-bold block">Visão:</span>
                Ser referência no Brasil como o melhor lugar para encontrar e
                reservar experiências de aventura, de forma prática, segura e
                rápida.
              </MyTypography>
            </div>
          </div>
        </div>

        <div className="relative w-full md:w-2/3 mx-auto max-sm:my-8 px-4">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-12 rounded-full bg-white border border-primary-600 flex items-center justify-center">
              <MyIcon name="sketch" />
            </div>
          </div>

          <div className="rounded-xl border-opacity-90 border-2 border-transparent bg-white bg-gradient-to-r from-[#1fa9e0] to-[#62bb46]">
            <div className="rounded-xl bg-white p-6 text-center md:min-h-[230px]">
              <MyTypography
                variant="subtitle2"
                weight="regular"
                className="text-[0.9rem] md:text-[1.2rem] mt-2"
              >
                <span className="font-bold block">Valores:</span>
                Segurança, natureza, inovação, parceria, confiança, foco no
                cliente e excelência em cada detalhe.
              </MyTypography>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <MyTypography
          variant="heading1"
          weight="extrabold"
          className="text-primary-600 mt-16 mb-12 text-[1.5rem] md:text-[2rem]"
        >
          VENHA SE AVENTURAR!
        </MyTypography>
        <MyButton
          variant="default"
          size="lg"
          borderRadius="squared"
          className="mt-4 mb-10"
          onClick={() => router.push(PATHS.atividades)}
        >
          Ver passeios
        </MyButton>
      </div>
    </section>
  );
}
