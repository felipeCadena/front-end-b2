"use client";

import MyButton from "@/components/atoms/my-button";
import MyCheckbox from "@/components/atoms/my-checkbox";
import MyTypography from "@/components/atoms/my-typography";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import React from "react";

export default function TermosParceiro() {
  const router = useRouter();
  return (
    <section className="m-6 space-y-4">
      <MyTypography variant="heading2" weight="extrabold">
        Termos de aceite e regras da plataforma.
      </MyTypography>
      <p className="">
        Estes Termos de Serviço ("Termos") são um acordo legal vinculante entre
        você e a <strong>B2 Adventure</strong>, que regem seu direito de uso dos
        sites, aplicativos e outras ofertas da B2 Adventure.
      </p>
      <p className="">
        Quando usados nestes Termos, "B2", "nós", "nosso" ou "nossos" referem-se
        à entidade B2 Adventure estabelecida no documento que você está
        contratando.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Uso da Plataforma</h2>
      <p className="">
        A Plataforma B2 Adventure permite que os usuários ("Membros") publiquem,
        ofereçam, busquem e reservem serviços. Os Membros que publicam e
        oferecem serviços são chamados de "Parceiros" e os Membros que buscam,
        reservam ou usam os serviços são chamados de "Clientes".
      </p>
      <p className="">
        Os Parceiros oferecem suas atividades esportivas ("Experiências") e têm
        a B2 Adventure como plataforma de divulgação. A B2 Adventure não se
        responsabiliza pela atividade exercida pelo Parceiro, sendo de total
        responsabilidade dele toda e qualquer informação e acontecimentos
        ocorridos durante a atividade.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">
        2. Taxas e Divulgação
      </h2>
      <p className="">
        A B2 Adventure retém 30% do valor cobrado pela atividade oferecida pelos
        Parceiros. Os valores são estipulados pelos Parceiros sem intervenção da
        B2 Adventure, desde que sejam condizentes com aqueles praticados fora da
        plataforma.
      </p>
      <p className="">
        A B2 Adventure exige acesso às imagens feitas durante o passeio para
        fins de divulgação da plataforma e das atividades oferecidas. Caso seja
        identificada uma diferenciação de valores dentro e fora da plataforma, a
        atividade pode ser removida.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Pagamentos</h2>
      <p className="">
        Todo pagamento deve ser realizado exclusivamente dentro da plataforma B2
        Adventure. Nenhum valor pode ser cobrado diretamente pelo Parceiro ao
        Cliente.
      </p>
      <p className="">
        O repasse ao Parceiro é feito mensalmente, de acordo com os passeios
        realizados no mês anterior. O Parceiro pode escolher a data e conta
        bancária para o recebimento durante seu cadastro.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">
        4. Descrição da Experiência
      </h2>
      <p className="">
        A descrição da experiência deve ser clara, completa e precisa. O Cliente
        deve saber exatamente o que esperar ao comprar a experiência.
      </p>
      <h3 className="text-xl font-semibold mt-4 mb-2">
        Dicas para uma boa descrição:
      </h3>
      <ul className="list-disc pl-6 ">
        <li>Informe o que os participantes vão fazer;</li>
        <li>Endereço e instruções sobre o ponto de encontro com o Parceiro;</li>
        <li>
          O que está incluído no preço (exemplo: equipamentos fornecidos pelo
          Parceiro);
        </li>
        <li>
          O que os participantes precisam levar (exemplo: água, roupa leve,
          repelente etc.);
        </li>
        <li>Especificar se as fotos estão incluídas;</li>
        <li>Informar quais idiomas o Parceiro domina.</li>
      </ul>
      <h3 className="text-xl font-semibold mt-4 mb-2">
        O que não é permitido na descrição:
      </h3>
      <ul className="list-disc pl-6 mb-4 text-red-500">
        <li>Mencionar qualquer link;</li>
        <li>Mencionar valores extras cobrados fora da plataforma.</li>
      </ul>
      <p className="mb-4">
        O valor da atividade deve incluir todos os custos e lucros necessários
        para sua realização, pois nenhum valor adicional pode ser cobrado do
        Cliente no momento do passeio.
      </p>

      <MyCheckbox
        label="Li e aceito os termos de serviço"
        labelStyle="text-sm opacity-60"
        className="my-2"
      />

      <MyButton
        variant="default"
        borderRadius="squared"
        size="lg"
        className="w-full"
        onClick={() => router.push(PATHS["cadastro-parceiro"])}
      >
        Cadastrar Empresa
      </MyButton>
    </section>
  );
}
