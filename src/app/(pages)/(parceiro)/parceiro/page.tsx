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
    <section className="text-center my-6 max-sm:overflow-x-hidden">
      <div className="my-4 md:my-6">
        {/* <Image
          src="/images/atividades/ar/ar-3.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full md:max-h-[400px] object-cover object-top rounded-lg"
        /> */}
        <MyTypography
          variant="heading1"
          weight="bold"
          className="text-[2.5rem] md:text-[5rem]"
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
          className="w-full h-[200px] md:h-[400px] object-cover md:rounded-lg"
        />

        <div className="bg-white p-2 rounded-full absolute -bottom-[3.5rem] md:-bottom-[4.2rem] left-[40%] md:left-[46%]">
          <Image
            src="/images/rose-wind.png"
            width={1200}
            height={800}
            alt="Rosa dos ventos"
            className="w-[60px] md:w-[100px] object-cover object-top rounded-full"
          />
        </div>
      </div>

      <div className="mt-14 md:mt-20 mb-6 md:mb-10 px-10 md:px-20 flex gap-8 justify-center">
        <MyTypography
          variant="heading3"
          weight="bold"
          className="text-right w-1/2 text-[1rem] md:text-[1.3rem]"
        >
          A B2 ADVENTURE É A MAIOR REDE DE ATIVIDADES ESPORTIVAS NA NATUREZA DO
          MUNDO!
        </MyTypography>
        <MyTypography
          variant="heading3"
          weight="regular"
          className="text-left w-1/2 text-[1rem] md:text-[1.3rem]"
        >
          Somos uma plataforma digital que conecta{" "}
          <span className="font-bold">clientes aventureiros</span> a
          <span className="font-bold"> parceiros especializados</span>,
          facilitando a divulgação e contratação de atividades.
        </MyTypography>
      </div>

      <div className="relative">
        <div className="p-2 bg-primary-600 md:hidden">
          <MyTypography
            variant="heading3"
            weight="bold"
            className="text-white text-[1rem] md:text-[1.3rem]"
          >
            A B2 É PARA QUALQUER AVENTUREIRO!
          </MyTypography>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-1 md:mt-28 mb-10">
          <div>
            <Image
              src="/images/atividades/terra/terra-3.jpeg"
              width={1200}
              height={800}
              alt="Image de um passeio"
              className="w-full h-[200px] md:h-[400px] object-cover"
            />
            <MyTypography
              variant="heading2"
              weight="bold"
              className="uppercase my-1 text-[1.1rem] md:text-[1.5rem]"
            >
              CLIENTES
            </MyTypography>
            <MyTypography
              variant="subtitle3"
              weight="regular"
              className="w-2/3 mx-auto text-[0.9rem] md:text-[1rem]"
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
              className="w-full h-[200px] md:h-[400px] object-cover"
            />
            <MyTypography
              variant="heading2"
              weight="bold"
              className="uppercase my-1 text-[1.1rem] md:text-[1.5rem]"
            >
              PARCEIROS
            </MyTypography>
            <MyTypography
              variant="subtitle3"
              weight="regular"
              className="w-2/3 mx-auto text-[0.9rem] md:text-[1rem]"
            >
              Apenas os melhores profissionais especializados em modalidades
              esportivas ao ar livre.
            </MyTypography>
          </div>
        </div>

        <div className="absolute -top-14 left-[33%] p-10 bg-primary-600 z-50 w-1/3 max-sm:hidden">
          <MyTypography
            variant="heading3"
            weight="bold"
            className="text-white text-[1rem] md:text-[1.3rem]"
          >
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
          className="w-full h-[200px] md:h-[500px]"
        />

        <div className="absolute text-white top-12 md:top-4 left-6 md:left-12 z-50 w-1/3 dropShadow-sm">
          <span className="text-[1.8rem] md:text-[3rem] font-bold">☆ ☆ ☆</span>
          <MyTypography
            variant="heading3"
            weight="regular"
            className="text-white text-[1rem] md:text-[1.3rem]"
          >
            POR AQUI, TEMOS SÓ
          </MyTypography>
          <MyTypography
            variant="heading3"
            weight="bold"
            className="text-white mt-1 text-[1rem] md:text-[1.3rem]"
          >
            OS MELHORES.
          </MyTypography>
          <MyTypography
            variant="subtitle1"
            weight="bold"
            className="text-white mt-5 text-[1rem] md:text-[1.3rem] max-sm:hidden"
          >
            Se você oferece um serviço de excelência, o seu lugar é com a gente!
          </MyTypography>
        </div>
        <MyTypography
          variant="subtitle3"
          weight="bold"
          className="mt-2 md:hidden text-[1rem] md:text-[1rem]"
        >
          Se você oferece um serviço de excelência, o seu lugar é com a gente!
        </MyTypography>
      </div>

      <MyButton
        variant="default"
        borderRadius="squared"
        size="md"
        className="w-1/2 md:w-1/4 h-14 my-2 md:my-10"
        onClick={() => router.push(PATHS["termos-parceiro"])}
      >
        Começar agora
      </MyButton>

      <div className="grid md:grid-cols-2 gap-10 md:gap-36 my-12 relative">
        <Image
          src="/images/atividades/mar/mar-92.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full h-[300px] md:h-[500px] object-cover "
        />

        <Image
          src="/images/mobile.png"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-[260px] md:w-[380px] object-cover absolute z-50 left-[45%] md:left-[25%] -top-8 md:-top-[10%]"
        />

        <div className="text-left mx-4">
          <MyTypography
            variant="heading3"
            weight="extrabold"
            className="text-[1.2rem] md:text-[1.3rem]"
          >
            Como funciona?
          </MyTypography>
          <MyTypography
            variant="subtitle1"
            weight="regular"
            className="mt-5 text-[1rem] md:text-[1.125rem]"
          >
            Na plataforma, nossos <span className="font-bold">Parceiros</span>{" "}
            podem divulgar à vontade os seus pacotes, descrevendo em detalhes
            toda a experiência, definindo condições e estipulando valores.
          </MyTypography>
          <MyTypography
            variant="subtitle1"
            weight="regular"
            className="mt-5 text-[1rem] md:text-[1.125rem]"
          >
            Já os <span className="font-bold">Clientes</span> acessam um
            catálogo de serviços disponíveis, onde diretamente pesquisam,
            descobrem e contratam suas atividades preferidas!
          </MyTypography>
          <MyTypography
            variant="subtitle1"
            weight="regular"
            className="mt-5 text-[1rem] md:text-[1.125rem]"
          >
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

        <div className="max-sm:hidden space-y-12 pl-12 pr-6 py-10 bg-white opacity-90 absolute top-16 right-[60%] w-[40%] text-left rounded-r-xl">
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

        <div className="md:hidden m-4 space-y-8 md:space-y-12 text-left">
          <div>
            <MyTypography
              variant="subtitle1"
              weight="bold"
              className="text-[1rem] md:text-[1.125rem]"
            >
              Parceiro, você conhece a sua experiência como ninguém!
            </MyTypography>
            <MyTypography
              variant="subtitle1"
              weight="regular"
              className="max-sm:mt-2 text-[1rem] md:text-[1.125rem]"
            >
              Por isso, você tem total autonomia e responsabilidade pelo
              funcionamento da sua atividade.
            </MyTypography>
          </div>
          <div>
            <MyTypography
              variant="subtitle1"
              weight="bold"
              className="text-[1rem] md:text-[1.125rem]"
            >
              Agora, a parte burocrática pode deixar com a gente!
            </MyTypography>
            <MyTypography
              variant="subtitle1"
              weight="regular"
              className="max-sm:mt-2 text-[1rem] md:text-[1.125rem]"
            >
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
          className="w-full h-[250px] md:h-[550px] object-cover"
        />

        <div className="absolute top-[48%] md:top-10 left-6 md:left-[25%] md:w-1/2 dropShadow-sm">
          <MyTypography
            variant="heading3"
            weight="bold"
            className="uppercase text-white text-[1.05rem] md:text-[1.3rem]"
          >
            Veja todos os nossos diferenciais:
          </MyTypography>
        </div>

        <div className="max-sm:hidden absolute bottom-4 md:bottom-10 md:left-28 dropShadow-sm">
          <div className="flex">
            <div className="flex flex-col items-center justify-center gap-2">
              <MyIcon name="contract" className="" />
              <MyTypography
                variant="body-big"
                weight="bold"
                className="text-white w-[60%] text-[0.7rem] md:text-[0.9rem]"
              >
                Praticidade de contratação
              </MyTypography>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MyIcon name="connections" className="" />
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

        <div className="md:hidden m-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MyIcon name="check" />
              <MyTypography
                variant="subtitle1"
                weight="regular"
                className="text-[1rem] md:text-[1.125rem]"
              >
                Praticidade de contratação
              </MyTypography>
            </div>
            <div className="flex items-center gap-2">
              <MyIcon name="check" />
              <MyTypography
                variant="subtitle1"
                weight="regular"
                className="text-[1rem] md:text-[1.125rem]"
              >
                Conexão entre pessoas
              </MyTypography>
            </div>
            <div className="flex items-center gap-2">
              <MyIcon name="check" />
              <MyTypography
                variant="subtitle1"
                weight="regular"
                className="text-[1rem] md:text-[1.125rem]"
              >
                Divulgação de serviços
              </MyTypography>
            </div>
            <div className="flex items-center gap-2">
              <MyIcon name="check" />
              <MyTypography
                variant="subtitle1"
                weight="regular"
                className="text-[1rem] md:text-[1.125rem]"
              >
                Variedade de atividades
              </MyTypography>
            </div>
            <div className="flex items-center gap-2">
              <MyIcon name="check" />
              <MyTypography
                variant="subtitle1"
                weight="regular"
                className="text-[1rem] md:text-[1.125rem]"
              >
                Pagamentos seguros
              </MyTypography>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:items-center">
        <div className="space-y-4 md:my-8">
          <Image
            src="/images/atividades/mar/mar-7.jpeg"
            width={1200}
            height={800}
            alt="Image de um passeio"
            className="w-full h-[180px] md:h-[250px] object-cover"
          />
          <Image
            src="/images/atividades/mar/mar-1.jpeg"
            width={1200}
            height={800}
            alt="Image de um passeio"
            className="w-full h-[180px] md:h-[250px] object-cover"
          />
          <Image
            src="/images/atividades/terra/terra-6.jpeg"
            width={1200}
            height={800}
            alt="Image de um passeio"
            className="w-full h-[180px] md:h-[250px] object-cover"
          />
        </div>

        <div className="text-left px-4 md:px-16">
          <MyTypography
            variant="heading3"
            weight="bold"
            className="max-sm:mt-4 text-[1.05rem] md:text-[1.3rem]"
          >
            Quais atividades estão na B2?
          </MyTypography>
          <MyTypography
            variant="subtitle1"
            weight="regular"
            className="mt-2 md:mt-6 text-[1rem] md:text-[1.125rem]"
          >
            Trilha, Escalada, Rapel, Surf, Stand Up Paddle, Mergulho, Ciclismo
            de montanha, Canoagem, Arvorismo, Cavalgada, Pesca, Passeio de
            veleiro, Wakeboard, Kite surf, Passeio de balão, Canoas havaianas,
            Paraquedas, Asa delta, Parapente, Paramotor, Motocross e muito mais!
          </MyTypography>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-8 my-6 items-center">
        <Image
          src="/images/atividades/mar/mar-5.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full h-[200px] md:h-[600px] object-cover"
        />

        <div className="text-left space-y-6 max-sm:mx-4">
          <MyTypography
            variant="heading3"
            weight="bold"
            className="text-[1.05rem] md:text-[1.3rem]"
          >
            Aproveite para incluir aquelas fotos mais bonitas e uma descrição
            clara, completa e precisa:
          </MyTypography>

          <div className="px-6 space-y-2 md:space-y-4">
            <div className="flex md:items-center gap-2">
              <Check className="w-4 h-4 text-primary-600" />
              <MyTypography
                variant="subtitle1"
                weight="regular"
                className="text-[1rem] md:text-[1.125rem]"
              >
                Descreva o que os participantes vão fazer;
              </MyTypography>
            </div>
            <div className="flex md:items-center gap-2">
              <Check className="w-4 h-4 text-primary-600" />
              <MyTypography
                variant="subtitle1"
                weight="regular"
                className="text-[1rem] md:text-[1.125rem]"
              >
                Combine endereços e pontos de encontro;
              </MyTypography>
            </div>
            <div className="flex md:items-center gap-2">
              <Check className="w-4 h-4 text-primary-600" />
              <MyTypography
                variant="subtitle1"
                weight="regular"
                className="text-[1rem] md:text-[1.125rem]"
              >
                Detalhe o que está incluído no valor;
              </MyTypography>
            </div>
            <div className="flex md:items-center gap-2">
              <Check className="w-4 h-4 text-primary-600" />
              <MyTypography
                variant="subtitle1"
                weight="regular"
                className="text-[1rem] md:text-[1.125rem]"
              >
                Informe o que precisa ser levado;
              </MyTypography>
            </div>
            <div className="flex md:items-center gap-2">
              <Check className="w-4 h-4 text-primary-600" />
              <MyTypography
                variant="subtitle1"
                weight="regular"
                className="text-[1rem] md:text-[1.125rem]"
              >
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
          className="w-full h-[250px] md:h-[550px] object-cover "
        />

        <div className="absolute text-white top-1/3 left-[25%] z-50 w-1/2 dropShadow-sm">
          <span className="text-[1.8rem] md:text-[3rem] font-bold">☆ ☆ ☆</span>
          <MyTypography
            variant="heading3"
            weight="bold"
            className="text-white text-[1.05rem] md:text-[1.3rem]"
          >
            O cliente quer saber exatamente o que esperar ao comprar a
            experiência com você!
          </MyTypography>
        </div>
      </div>

      <MyButton
        variant="default"
        borderRadius="squared"
        size="md"
        className="w-1/2 md:w-1/4 h-14 md:my-10"
        onClick={() => router.push(PATHS["termos-parceiro"])}
      >
        Começar agora
      </MyButton>

      <div className="my-8 grid md:grid-cols-2 gap-6 md:gap-8 items-center">
        <Image
          src="/images/atividades/mar/mar-2.jpeg"
          width={1200}
          height={800}
          alt="Image de um passeio"
          className="w-full h-[200px] md:h-[600px] object-cover"
        />

        <div className="text-left max-sm:mx-4">
          <MyTypography
            variant="heading3"
            weight="bold"
            className="flex gap-2 items-center text-[1.05rem] md:text-[1.3rem]"
          >
            E o pagamento?
            <Dollar className="w-6 h-6 md:w-8 md:h-8 bg-primary-600 rounded-full p-1" />
          </MyTypography>

          <div className="mt-6 space-y-4 md:space-y-8">
            <MyTypography
              variant="subtitle1"
              weight="regular"
              className="text-[1rem] md:text-[1.125rem]"
            >
              O parceiro que determina os valores, claro.
            </MyTypography>
            <MyTypography
              variant="subtitle1"
              weight="regular"
              className="text-[1rem] md:text-[1.125rem]"
            >
              Você é quem mais entende o valor do seu trabalho! Por isso, cabe
              ao Parceiro o preço de cada atividade, que precisa estar divulgado
              na descrição e ser igual ao cobrado fora da plataforma.
            </MyTypography>
            <MyTypography
              variant="subtitle1"
              weight="regular"
              className="text-[1rem] md:text-[1.125rem]"
            >
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
          className="w-full h-[200px] md:h-[600px] object-cover object-left"
        />

        <div className="max-sm:hidden absolute top-16 left-16 z-50 w-1/4 dropShadow-sm text-left space-y-6">
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

        <div className="md:hidden m-4 text-left space-y-4 md:space-y-6">
          <Lock className="w-12 md:w-16 h-12 md:h-16" stroke="#000" />
          <MyTypography
            variant="subtitle1"
            weight="regular"
            className="text-[1rem] md:text-[1.125rem]"
          >
            Para garantir toda a segurança, o pagamento dos{" "}
            <span className="font-bold">Clientes</span> acontece completamente
            dentro da plataforma, sendo vedada qualquer cobrança extra por fora.
          </MyTypography>
          <MyTypography
            variant="subtitle1"
            weight="regular"
            className="text-[1rem] md:text-[1.125rem]"
          >
            O repasse para o <span className="font-bold">Parceiro</span> é
            mensal, mas é só quando o Cliente paga que a B2 retém um percentual
            de 30% do que foi cobrado. Ou seja, a gente sempre ganha junto!
          </MyTypography>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-2 md:gap-36 items-center text-left relative">
        <Image
          src="/images/mobile-2.png"
          width={1200}
          height={800}
          alt="Celular com uma imagem de uma atividade"
          className="w-[280px] md:w-[380px] object-cover"
        />

        <Image
          src="/images/mobile-3.png"
          width={1200}
          height={800}
          alt="Celular com uma imagem de uma atividade"
          className="w-[280px] md:w-[380px] object-cover absolute z-50 top-20 md:top-16 left-[30%] md:left-[25%]"
        />

        <div className="space-y-6 max-sm:m-4">
          <MyTypography
            variant="heading3"
            weight="regular"
            className="text-[1.05rem] md:text-[1.3rem]"
          >
            A nossa nova plataforma vai inaugurar em Maio de 2025!
          </MyTypography>
          <MyTypography
            variant="heading3"
            weight="bold"
            className="text-[1.05rem] md:text-[1.3rem]"
          >
            Se você topar embarcar nessa desde antes do lançamento, vai ganhar
            de cara esses benefícios:
          </MyTypography>

          <div className="mt-4 px-4 space-y-2">
            <MyTypography
              variant="subtitle1"
              weight="regular"
              className="flex gap-2 text-[1rem] md:text-[1.125rem]"
            >
              <Check className="w-6 md:w-8 h-6 md:h-8 text-primary-600" />
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
              className="flex gap-2 md:items-center text-[1rem] md:text-[1.125rem]"
            >
              <Check className="w-5 md:w-7 h-5 md:h-7 text-primary-600" />
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
          className="w-full h-[250px] md:h-[550px] object-cover"
        />

        <div className="absolute text-white top-4 md:top-[25%] right-4 md:left-[30%] z-50 w-1/2 dropShadow-sm">
          <MyTypography
            variant="heading3"
            weight="bold"
            className="text-[1.05rem] md:text-[1.3rem]"
          >
            E aí, vamos nessa?
          </MyTypography>
          <MyTypography
            variant="heading3"
            weight="regular"
            className="text-[1.05rem] md:text-[1.3rem]"
          >
            Vem com a gente viver essa aventura!
          </MyTypography>
        </div>

        <div className="absolute text-left bottom-2 md:bottom-10 right-4 md:right-24 z-50 dropShadow-sm">
          <MyTypography
            variant="subtitle3"
            weight="bold"
            className="text-white text-[0.7rem] md:text-[1rem]"
          >
            @b2adventure
          </MyTypography>
          <MyTypography
            variant="subtitle3"
            weight="regular"
            className="text-white text-[0.7rem] md:text-[1rem]"
          >
            contato@b2adventure.com
          </MyTypography>
          <MyTypography
            variant="subtitle3"
            weight="regular"
            className="text-white text-[0.7rem] md:text-[1rem]"
          >
            www.b2adventure.com
          </MyTypography>
          <MyTypography
            variant="subtitle3"
            weight="regular"
            className="text-white text-[0.7rem] md:text-[1rem]"
          >
            www.b2adventure.com.br
          </MyTypography>
        </div>
      </div>

      <MyButton
        variant="default"
        borderRadius="squared"
        size="md"
        className="w-1/2 md:w-1/4 h-14"
        onClick={() => router.push(PATHS["termos-parceiro"])}
      >
        Começar agora
      </MyButton>
    </section>
  );
}
