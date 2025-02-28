"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import PATHS from "@/utils/paths";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function AreaParceiros() {
  const router = useRouter();

  return (
    <section className="text-center my-6">
      <div className="relative my-6">
        <Image
          src="/images/atividades/ar/ar-3.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full md:max-h-[400px] object-cover object-top rounded-lg"
        />
        <MyTypography
          variant="heading1"
          weight="bold"
          className="text-white absolute z-50 top-[20%] left-[30%] text-[5rem]"
        >
          bem-vindo
        </MyTypography>
      </div>

      <div className="relative">
        <Image
          src="/images/atividades/terra/terra-1.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full md:max-h-[400px] object-cover rounded-lg"
        />

        <div className="bg-white p-2 rounded-full absolute -bottom-[4.2rem] left-[46%]">
          <Image
            src="/images/rose-wind.png"
            width={1200}
            height={800}
            alt="Rosa dos ventos"
            className="w-[100px] object-cover object-top rounded-full"
          />
        </div>
      </div>

      <div className="mt-20 mb-10 px-20 flex gap-8 justify-center">
        <MyTypography
          variant="heading1"
          weight="bold"
          className="text-right w-1/2"
        >
          A B2 ADVENTURE É A MAIOR REDE DE ATIVIDADES ESPORTIVAS NA NATUREZA DO
          MUNDO!
        </MyTypography>
        <MyTypography
          variant="heading1"
          weight="regular"
          className="text-left w-1/2"
        >
          Somos uma plataforma digital que conecta{" "}
          <span className="font-bold">clientes aventureiros</span> a
          <span className="font-bold"> parceiros especializados</span>,
          facilitando a divulgação e contratação de atividades.
        </MyTypography>
      </div>

      <div className="relative">
        <div className="grid grid-cols-2 gap-4 mt-28 mb-10">
          <div>
            <Image
              src="/images/atividades/terra/terra-3.jpeg"
              width={1200}
              height={800}
              alt="Image de um passeio"
              className="w-full md:h-[400px] object-cover"
            />
            <MyTypography
              variant="heading2"
              weight="bold"
              className="uppercase my-1"
            >
              CLIENTES
            </MyTypography>
            <MyTypography
              variant="subtitle3"
              weight="regular"
              className="w-2/3 mx-auto"
            >
              Do turista que busca uma experiência única ao morador local que
              procura um exercício diferenciado no quintal de casa.
            </MyTypography>
          </div>
          <div>
            <Image
              src="/images/atividades/ar/ar-2.jpeg"
              width={1200}
              height={800}
              alt="Image de um passeio"
              className="w-full md:h-[400px] object-cover"
            />
            <MyTypography
              variant="heading2"
              weight="bold"
              className="uppercase my-1"
            >
              PARCEIROS
            </MyTypography>
            <MyTypography
              variant="subtitle3"
              weight="regular"
              className="w-2/3 mx-auto"
            >
              Apenas os melhores profissionais especializados em modalidades
              esportivas ao ar livre.
            </MyTypography>
          </div>
        </div>

        <div className="absolute -top-14 left-[33%] p-8 bg-primary-600 z-50 w-1/3">
          <MyTypography variant="heading1" weight="bold" className="text-white">
            A B2 É PARA QUALQUER AVENTUREIRO!
          </MyTypography>
        </div>
      </div>

      <div className="my-6 relative">
        <Image
          src="/images/atividades/ar/ar-4.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full md:h-[600px] object-cover object-left-top"
        />

        <div className="absolute top-16 left-12 z-50 w-1/3 dropShadow-sm">
          <span className="text-[3rem]">☆ ☆ ☆</span>
          <MyTypography variant="heading2" weight="regular" className="">
            POR AQUI, TEMOS SÓ
          </MyTypography>
          <MyTypography variant="heading2" weight="bold" className=" mt-1">
            OS MELHORES.
          </MyTypography>
          <MyTypography variant="heading3" weight="bold" className=" mt-5">
            Se você oferece um serviço de excelência, o seu lugar é com a gente!
          </MyTypography>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-16 my-12">
        <Image
          src="/images/atividades/mar/mar-92.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full md:h-[650px] object-cover"
        />

        <div className="text-left">
          <MyTypography variant="heading1" weight="extrabold" className="">
            Como funciona?
          </MyTypography>
          <MyTypography variant="heading2" weight="regular" className="mt-5">
            Na plataforma, nossos <span className="font-bold">Parceiros</span>{" "}
            podem divulgar à vontade os seus pacotes, descrevendo em detalhes
            toda a experiência, definindo condições e estipulando valores.
          </MyTypography>
          <MyTypography variant="heading2" weight="regular" className="mt-5">
            Já os <span className="font-bold">Clientes</span> acessam um
            catálogo de serviços disponíveis, onde diretamente pesquisam,
            descobrem e contratam suas atividades preferidas!
          </MyTypography>
          <MyTypography variant="heading2" weight="regular" className="mt-5">
            Nesse momento, estamos convidando os primeiros Parceiros. Se você
            está recebendo o nosso contato, pode se sentir honrado porque faz
            parte de um seleto grupo escolhido por nós.
          </MyTypography>
        </div>
      </div>

      <div className="my-10 relative">
        <Image
          src="/images/atividades/mar/mar-3.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full md:h-[650px] object-cover"
        />

        <div className="space-y-4 pl-12 pr-6 py-10 bg-white opacity-90 absolute top-16 right-[60%] w-[40%] text-left rounded-r-xl">
          <div>
            <MyTypography variant="heading3" weight="bold" className="">
              Parceiro, você conhece a sua experiência como ninguém!
            </MyTypography>
            <MyTypography variant="heading3" weight="regular" className="">
              Por isso, você tem total autonomia e responsabilidade pelo
              funcionamento da sua atividade.
            </MyTypography>
          </div>
          <div>
            <MyTypography variant="heading3" weight="bold" className="">
              Agora, a parte burocrática pode deixar com a gente!
            </MyTypography>
            <MyTypography variant="heading3" weight="regular" className="">
              Aqui você encontra toda a organização, praticidade e publicidade
              que o seu negócio precisa. Desde a divulgação, agendamento ao
              pagamento, tudo é direto na plataforma de forma simples e rápida.
            </MyTypography>
          </div>
        </div>
      </div>

      <div className="my-10 relative">
        <Image
          src="/images/atividades/mar/mar-9.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full md:h-[650px] object-cover"
        />

        <div className="absolute top-10 left-[25%] w-1/2 dropShadow-sm">
          <MyTypography
            variant="heading1"
            weight="bold"
            className="uppercase text-white"
          >
            Veja todos os nossos diferenciais:
          </MyTypography>
        </div>

        <div className="absolute bottom-10 left-16 dropShadow-sm">
          <div className="flex">
            <div className="flex flex-col items-center justify-center gap-2">
              <MyIcon name="contract" className="text-primary-600" />
              <MyTypography
                variant="subtitle3"
                weight="bold"
                className="text-white w-[60%]"
              >
                Praticidade de contratação
              </MyTypography>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MyIcon name="connections" className="text-primary-600" />
              <MyTypography
                variant="subtitle3"
                weight="bold"
                className="text-white w-[70%]"
              >
                Conexão entre pessoas
              </MyTypography>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MyIcon name="speaker" className="text-primary-600" />
              <MyTypography
                variant="subtitle3"
                weight="bold"
                className="text-white w-[70%]"
              >
                Divulgação de serviços
              </MyTypography>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MyIcon name="hiking" className="text-primary-600" />
              <MyTypography
                variant="subtitle3"
                weight="bold"
                className="text-white w-[60%]"
              >
                Variedade de atividades
              </MyTypography>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MyIcon name="lock" className="text-primary-600" />
              <MyTypography
                variant="subtitle3"
                weight="bold"
                className="text-white w-[60%]"
              >
                Pagamentos seguros
              </MyTypography>
            </div>
          </div>
        </div>
      </div>

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
