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
      <div className="relative">
        <MyTypography
          variant="heading1"
          weight="extrabold"
          className="text-left md:text-right md:w-1/2 max-sm:hidden"
        >
          Quem Somos
        </MyTypography>
        <Image
          src="/images/quem-somos/quem01.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full h-[200px] md:h-[500px] object-cover object-top md:rounded-lg"
        />

        <div className="p-[4px] rounded-full absolute -bottom-[3rem] md:-bottom-[4.2rem] left-[40%] md:left-[46%] w-[90px] h-[90px] md:w-[100px] md:h-[100px]">
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

      <div className="mt-20 mb-6 md:mb-10 px-4 md:px-20 flex max-sm:flex-col gap-4 md:gap-48">
        <MyTypography
          variant="heading3"
          weight="extrabold"
          className="text-left text-primary-600 md:text-right md:w-1/2 md:hidden"
        >
          Quem Somos
        </MyTypography>
        <MyTypography
          variant="heading3"
          weight="bold"
          className="text-left md:w-[80%] text-[1rem] md:text-[1.3rem]"
        >
          A B2 Adventure é o ponto de partida para quem quer viver o melhor do
          turismo de aventura no Brasil.
        </MyTypography>

        <MyTypography
          variant="heading3"
          weight="regular"
          className="text-left md:w-[80%] text-[1rem] md:text-[1.3rem]"
        >
          Reunimos, em um só lugar, a maior variedade de esportes ao ar livre em
          meio à natureza — sempre com profissionais que entendem do assunto e
          cuidam de cada detalhe.
        </MyTypography>
      </div>

        <div className="px-4 flex gap-4">
          <Image
            src="/images/quem-somos/quem02.jpeg"
            width={1200}
            height={800}
            alt="Image de um passeio"
            className="w-full h-[250px] md:h-[400px] object-cover rounded-l-xl rounded-tr-xl"
            style={{ borderBottomRightRadius: "80px" }}
          />
        <Image
          src="/images/quem-somos/quem04.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full h-[250px] md:h-[400px] object-cover rounded-r-xl rounded-tl-xl max-sm:hidden"
          style={{ borderBottomLeftRadius: "80px" }}
        />
        </div>
      {/* <div className="mt-8 w-[100px] h-[4px] opacity-60 mx-auto rounded-full bg-gradient-to-r from-[#1fa9e0] to-[#62bb46]" /> */}

      <div className="mt-10">
        <MyTypography
          variant="subtitle2"
          weight="medium"
          className="max-sm:text-left max-sm:px-4 max-sm:mb-4 text-[1rem] md:text-[1.3rem]"
        >
          <span className="font-extrabold max-sm:block">
            Nascemos do desejo de facilitar o acesso a experiências que fazem a
            vida pulsar:
          </span>{" "}
          trilhas que levam a vistas inesquecíveis, voos que tiram o fôlego,
          mergulhos que revelam um novo mundo, remadas, pedaladas, saltos e
          muitas outras formas de se sentir vivo.
        </MyTypography>
        <MyTypography
          variant="subtitle2"
          weight="medium"
          className="max-sm:text-left mt-6 max-sm:px-4 max-sm:mb-4 text-[1rem] md:text-[1.3rem]"
        >
          Aqui, você encontra uma curadoria de aventuras com praticidade,
          segurança e liberdade para escolher como e onde se conectar com a
          natureza.
        </MyTypography>
        <MyTypography
          variant="subtitle2"
          weight="medium"
          className="text-primary-600 max-sm:text-left mt-6 max-sm:px-4 max-sm:mb-4 text-[1rem] md:text-[1.3rem]"
        >
          Acreditamos que cada experiência ao ar livre é uma chance de descobrir
          o novo, se superar e criar memórias que ficam pra sempre.
        </MyTypography>
      </div>

      <div className="mt-8">
        <div className="max-sm:px-4">
          <Image
            src="/images/quem-somos/quem03.jpeg"
            width={1200}
            height={800}
            alt="Image de um passeio"
            className="w-full h-[250px] md:h-[700px] object-cover rounded-r-xl rounded-tl-xl"
            style={{ borderBottomLeftRadius: "80px" }}
          />
        </div>
        <MyTypography
          variant="subtitle2"
          weight="extrabold"
          className="max-sm:text-left mt-6 max-sm:px-10 max-sm:mb-4 md:w-2/3 md:mx-auto text-[1rem] md:text-[1.3rem]"
        >
          A B2 é isso: uma plataforma que te aproxima do que realmente importa —
          com leveza, confiança e emoção.
        </MyTypography>
      </div>

      <div className="px-4">
        <Image
          src="/images/quem-somos/quem04.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full h-[250px] md:h-[400px] object-cover rounded-l-xl rounded-tr-xl md:hidden"
          style={{ borderBottomRightRadius: "80px" }}
        />
      </div>

      <div className="space-y-12 mt-12">
        <div className="relative w-full md:w-2/3 mx-auto my-8 px-4">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-12 rounded-full bg-white border border-primary-600 flex items-center justify-center">
              <MyIcon name="mountains" />
            </div>
          </div>

          <div className="rounded-xl border-opacity-90 border-2 border-transparent bg-white bg-gradient-to-r from-[#1fa9e0] to-[#62bb46]">
            <div className="rounded-xl bg-white p-6 text-center">
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

        <div className="relative w-full md:w-2/3 mx-auto my-8 px-4">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-12 rounded-full bg-white border border-primary-600 flex items-center justify-center">
              <MyIcon name="binoculars" />
            </div>
          </div>

          <div className="rounded-xl border-opacity-90 border-2 border-transparent bg-white bg-gradient-to-r from-[#1fa9e0] to-[#62bb46]">
            <div className="rounded-xl bg-white p-6 text-center">
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

        <div className="relative w-full md:w-2/3 mx-auto my-8 px-4">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-12 rounded-full bg-white border border-primary-600 flex items-center justify-center">
              <MyIcon name="sketch" />
            </div>
          </div>

          <div className="rounded-xl border-opacity-90 border-2 border-transparent bg-white bg-gradient-to-r from-[#1fa9e0] to-[#62bb46]">
            <div className="rounded-xl bg-white p-6 text-center">
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
          variant="heading3"
          weight="extrabold"
          className="text-primary-600"
        >
          VENHA SE AVENTURAR!
        </MyTypography>
        <MyButton
          variant="default"
          size="lg"
          borderRadius="squared"
          className="mt-6 mb-10"
          onClick={() => router.push(PATHS.atividades)}
        >
          Ver passeios
        </MyButton>
      </div>
    </section>
  );
}
