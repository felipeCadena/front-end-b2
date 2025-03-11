"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import Check from "@/components/atoms/my-icon/elements/check";
import Dollar from "@/components/atoms/my-icon/elements/dollar";
import Lock from "@/components/atoms/my-icon/elements/lock";
import MyTypography from "@/components/atoms/my-typography";
import PATHS from "@/utils/paths";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function AreaParceiros() {
  const router = useRouter();

  return (
    <section className="text-center my-6">
      <div className="my-6">
        {/* <Image
          src="/images/atividades/ar/ar-3.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full md:max-h-[400px] object-cover object-top rounded-lg"
        /> */}
        <MyTypography variant="heading1" weight="bold" className="text-[5rem]">
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
          variant="heading3"
          weight="bold"
          className="text-right w-1/2"
        >
          A B2 ADVENTURE É A MAIOR REDE DE ATIVIDADES ESPORTIVAS NA NATUREZA DO
          MUNDO!
        </MyTypography>
        <MyTypography
          variant="heading3"
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

        <div className="absolute -top-14 left-[33%] p-10 bg-primary-600 z-50 w-1/3">
          <MyTypography variant="heading3" weight="bold" className="text-white">
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
          className="w-full md:h-[500px]"
        />

        <div className="absolute text-white top-4 left-12 z-50 w-1/3 dropShadow-sm">
          <span className="text-[3rem] font-bold">☆ ☆ ☆</span>
          <MyTypography
            variant="heading3"
            weight="regular"
            className="text-white"
          >
            POR AQUI, TEMOS SÓ
          </MyTypography>
          <MyTypography
            variant="heading3"
            weight="bold"
            className="text-white mt-1"
          >
            OS MELHORES.
          </MyTypography>
          <MyTypography
            variant="subtitle1"
            weight="bold"
            className="text-white mt-5"
          >
            Se você oferece um serviço de excelência, o seu lugar é com a gente!
          </MyTypography>
        </div>
      </div>

      <MyButton
        variant="default"
        borderRadius="squared"
        size="md"
        className="w-full md:w-1/4 h-14 my-10"
        onClick={() => router.push(PATHS["termos-parceiro"])}
      >
        Começar agora
      </MyButton>

      <div className="grid grid-cols-2 gap-36 my-12 relative">
        <Image
          src="/images/atividades/mar/mar-92.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full md:h-[500px] object-cover "
        />

        <Image
          src="/images/mobile.png"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-[380px] object-cover absolute z-50 left-[25%] -top-[10%]"
        />

        <div className="text-left">
          <MyTypography variant="heading3" weight="extrabold" className="">
            Como funciona?
          </MyTypography>
          <MyTypography variant="subtitle1" weight="regular" className="mt-5">
            Na plataforma, nossos <span className="font-bold">Parceiros</span>{" "}
            podem divulgar à vontade os seus pacotes, descrevendo em detalhes
            toda a experiência, definindo condições e estipulando valores.
          </MyTypography>
          <MyTypography variant="subtitle1" weight="regular" className="mt-5">
            Já os <span className="font-bold">Clientes</span> acessam um
            catálogo de serviços disponíveis, onde diretamente pesquisam,
            descobrem e contratam suas atividades preferidas!
          </MyTypography>
          <MyTypography variant="subtitle1" weight="regular" className="mt-5">
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
          className="w-full md:h-[600px] object-cover"
        />

        <div className="space-y-12 pl-12 pr-6 py-10 bg-white opacity-90 absolute top-16 right-[60%] w-[40%] text-left rounded-r-xl">
          <div>
            <MyTypography variant="subtitle1" weight="bold" className="">
              Parceiro, você conhece a sua experiência como ninguém!
            </MyTypography>
            <MyTypography variant="subtitle1" weight="regular" className="">
              Por isso, você tem total autonomia e responsabilidade pelo
              funcionamento da sua atividade.
            </MyTypography>
          </div>
          <div>
            <MyTypography variant="subtitle1" weight="bold" className="">
              Agora, a parte burocrática pode deixar com a gente!
            </MyTypography>
            <MyTypography variant="subtitle1" weight="regular" className="">
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
          className="w-full md:h-[550px] object-cover"
        />

        <div className="absolute top-10 left-[25%] w-1/2 dropShadow-sm">
          <MyTypography
            variant="heading3"
            weight="bold"
            className="uppercase text-white"
          >
            Veja todos os nossos diferenciais:
          </MyTypography>
        </div>

        <div className="absolute bottom-10 left-28 dropShadow-sm">
          <div className="flex">
            <div className="flex flex-col items-center justify-center gap-2">
              <MyIcon name="contract" className="text-primary-600" />
              <MyTypography
                variant="body-big"
                weight="bold"
                className="text-white w-[60%]"
              >
                Praticidade de contratação
              </MyTypography>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MyIcon name="connections" className="text-primary-600" />
              <MyTypography
                variant="body-big"
                weight="bold"
                className="text-white w-[70%]"
              >
                Conexão entre pessoas
              </MyTypography>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MyIcon name="speaker" className="text-primary-600" />
              <MyTypography
                variant="body-big"
                weight="bold"
                className="text-white w-[70%]"
              >
                Divulgação de serviços
              </MyTypography>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MyIcon name="hiking" className="text-primary-600" />
              <MyTypography
                variant="body-big"
                weight="bold"
                className="text-white w-[60%]"
              >
                Variedade de atividades
              </MyTypography>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MyIcon name="lock" className="text-primary-600" />
              <MyTypography
                variant="body-big"
                weight="bold"
                className="text-white w-[60%]"
              >
                Pagamentos seguros
              </MyTypography>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-center">
        <div className="space-y-4 my-8">
          <Image
            src="/images/atividades/mar/mar-7.jpeg"
            width={1200}
            height={800}
            alt="Image de um passeio"
            className="w-full md:h-[250px] object-cover"
          />
          <Image
            src="/images/atividades/mar/mar-1.jpeg"
            width={1200}
            height={800}
            alt="Image de um passeio"
            className="w-full md:h-[250px] object-cover"
          />
          <Image
            src="/images/atividades/terra/terra-6.jpeg"
            width={1200}
            height={800}
            alt="Image de um passeio"
            className="w-full md:h-[250px] object-cover"
          />
        </div>

        <div className="text-left px-16">
          <MyTypography variant="heading3" weight="bold" className="">
            Quais atividades estão na B2?
          </MyTypography>
          <MyTypography variant="subtitle1" weight="regular" className="mt-6">
            Trilha, Escalada, Rapel, Surf, Stand Up Paddle, Mergulho, Ciclismo
            de montanha, Canoagem, Arvorismo, Cavalgada, Pesca, Passeio de
            veleiro, Wakeboard, Kite surf, Passeio de balão, Canoas havaianas,
            Paraquedas, Asa delta, Parapente, Paramotor, Motocross e muito mais!
          </MyTypography>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 my-6 items-center">
        <Image
          src="/images/atividades/mar/mar-5.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full md:h-[600px] object-cover"
        />

        <div className="text-left space-y-6">
          <MyTypography variant="heading3" weight="bold" className="">
            Aproveite para incluir aquelas fotos mais bonitas e uma descrição
            clara, completa e precisa:
          </MyTypography>

          <div className="px-6 space-y-4">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary-600" />
              <MyTypography variant="subtitle1" weight="regular" className="">
                Descreva o que os participantes vão fazer;
              </MyTypography>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary-600" />
              <MyTypography variant="subtitle1" weight="regular" className="">
                Combine endereços e pontos de encontro;
              </MyTypography>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary-600" />
              <MyTypography variant="subtitle1" weight="regular" className="">
                Detalhe o que está incluído no valor;
              </MyTypography>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary-600" />
              <MyTypography variant="subtitle1" weight="regular" className="">
                Informe o que precisa ser levado;
              </MyTypography>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary-600" />
              <MyTypography variant="subtitle1" weight="regular" className="">
                Especifique se fotos estão incluídas.
              </MyTypography>
            </div>
          </div>
        </div>
      </div>

      <div className="relative my-8">
        <Image
          src="/images/atividades/ar/ar-1.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full md:h-[550px] object-cover "
        />

        <div className="absolute text-white top-1/3 left-[25%] z-50 w-1/2 dropShadow-sm">
          <span className="text-[3rem] font-bold">☆ ☆ ☆</span>
          <MyTypography variant="heading3" weight="bold" className="text-white">
            O cliente quer saber exatamente o que esperar ao comprar a
            experiência com você!
          </MyTypography>
        </div>
      </div>

      <MyButton
        variant="default"
        borderRadius="squared"
        size="md"
        className="w-full md:w-1/4 h-14 my-10"
        onClick={() => router.push(PATHS["termos-parceiro"])}
      >
        Começar agora
      </MyButton>

      <div className="my-8 grid grid-cols-2 gap-8 items-center">
        <Image
          src="/images/atividades/mar/mar-2.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full md:h-[600px] object-cover"
        />

        <div className="text-left">
          <MyTypography
            variant="heading3"
            weight="bold"
            className="flex gap-2 items-center"
          >
            E o pagamento?
            <Dollar className="w-8 h-8 bg-primary-600 rounded-full p-1" />
          </MyTypography>

          <div className="mt-6 space-y-8">
            <MyTypography variant="subtitle1" weight="regular" className="">
              O parceiro que determina os valores, claro.
            </MyTypography>
            <MyTypography variant="subtitle1" weight="regular" className="">
              Você é quem mais entende o valor do seu trabalho! Por isso, cabe
              ao Parceiro o preço de cada atividade, que precisa estar divulgado
              na descrição e ser igual ao cobrado fora da plataforma.
            </MyTypography>
            <MyTypography variant="subtitle1" weight="regular" className="">
              Assim mantemos uma parceria justa diante dos benefícios que
              entregamos!
            </MyTypography>
          </div>
        </div>
      </div>

      <div className="relative mt-8">
        <Image
          src="/images/atividades/mar/mar-4.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full md:h-[600px] object-cover object-left"
        />

        <div className="absolute top-16 left-16 z-50 w-1/4 dropShadow-sm text-left space-y-6">
          <Lock className="w-16 h-16" />
          <MyTypography
            variant="subtitle1"
            weight="regular"
            className="text-white"
          >
            Para garantir toda a segurança, o pagamento dos{" "}
            <span className="font-bold">Clientes</span> acontece completamente
            dentro da plataforma, sendo vedada qualquer cobrança extra por fora.
          </MyTypography>
          <MyTypography
            variant="subtitle1"
            weight="regular"
            className="text-white"
          >
            O repasse para o <span className="font-bold">Parceiro</span> é
            mensal, mas é só quando o Cliente paga que a B2 retém um percentual
            de 30% do que foi cobrado. Ou seja, a gente sempre ganha junto!
          </MyTypography>
        </div>
      </div>

      <div className=" grid grid-cols-2 gap-36 items-center text-left relative">
        <Image
          src="/images/mobile-2.png"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-[380px] object-cover"
        />

        <Image
          src="/images/mobile-3.png"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-[380px] object-cover absolute z-50 top-16 left-[25%]"
        />

        <div className="space-y-6">
          <MyTypography variant="heading3" weight="regular" className="">
            A nossa nova plataforma vai inaugurar em Maio de 2025!
          </MyTypography>
          <MyTypography variant="heading3" weight="bold" className="">
            Se você topar embarcar nessa desde antes do lançamento, vai ganhar
            de cara esses benefícios:
          </MyTypography>

          <div className="mt-4 px-4 space-y-2">
            <MyTypography
              variant="subtitle1"
              weight="regular"
              className="flex gap-2"
            >
              <Check className="w-8 h-8 text-primary-600" />
              <div>
                2 meses de tarifas B2 gratuitas
                <span className="block">
                  (aqueles 30% que a nossa plataforma retém, sabe?)
                </span>
              </div>
            </MyTypography>

            <MyTypography
              variant="subtitle1"
              weight="regular"
              className="flex gap-2 items-center"
            >
              <Check className="w-6 h-6 text-primary-600" />
              Preferência na busca pela sua atividade
            </MyTypography>
          </div>
        </div>
      </div>

      <div className="my-8 relative">
        <Image
          src="/images/atividades/terra/terra-5.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full md:h-[550px] object-cover"
        />

        <div className="absolute text-white top-[25%] left-[30%] z-50 w-1/2 dropShadow-sm">
          <MyTypography variant="heading3" weight="bold" className="">
            E aí, vamos nessa?
          </MyTypography>
          <MyTypography variant="heading3" weight="regular" className="">
            Vem com a gente viver essa aventura!
          </MyTypography>
        </div>

        <div className="absolute text-left bottom-10 right-24 z-50 dropShadow-sm">
          <MyTypography
            variant="subtitle3"
            weight="bold"
            className="text-white"
          >
            @b2adventure
          </MyTypography>
          <MyTypography
            variant="subtitle3"
            weight="regular"
            className="text-white"
          >
            contato@b2adventure.com
          </MyTypography>
          <MyTypography
            variant="subtitle3"
            weight="regular"
            className="text-white"
          >
            www.b2adventure.com
          </MyTypography>
          <MyTypography
            variant="subtitle3"
            weight="regular"
            className="text-white"
          >
            www.b2adventure.com.br
          </MyTypography>
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
