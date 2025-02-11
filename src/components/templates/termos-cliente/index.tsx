import MyTypography from "@/components/atoms/my-typography";
import React from "react";

export default function TermosCliente() {
  return (
    <div className="max-w-3xl mx-auto">
      <MyTypography
        variant="heading2"
        weight="bold"
        className="text-center my-4"
      >
        Termos de Serviço
      </MyTypography>
      <p className="mb-4">
        Estes Termos de Serviço ("Termos") são um acordo legal vinculante entre
        você e a <strong>B2 Adventure</strong>, que regem seu direito de uso dos
        sites, aplicativos e outras ofertas da B2 Adventure.
      </p>
      <p className="mb-4">
        Quando usados nestes Termos, "B2", "nós", "nosso" ou "nossos" referem-se
        à entidade B2 Adventure estabelecida no documento que você está
        contratando.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Uso da Plataforma</h2>
      <p className="mb-4">
        A Plataforma B2 Adventure permite que os usuários ("Membros") publiquem,
        ofereçam, busquem e reservem serviços. Os Membros que publicam e
        oferecem serviços são chamados de "Parceiros" e os Membros que buscam,
        reservam ou usam os serviços são chamados de "Clientes".
      </p>
      <p className="mb-4">
        Os Parceiros oferecem suas atividades esportivas ("Experiências") e têm
        a B2 Adventure como plataforma de divulgação. A B2 Adventure não se
        responsabiliza pela atividade exercida pelo Parceiro, sendo de total
        responsabilidade dele toda e qualquer informação e acontecimentos
        ocorridos durante a atividade.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">
        2. Uso de Imagens e Divulgação
      </h2>
      <p className="mb-4">
        A B2 Adventure pode utilizar qualquer material fornecido pelos Parceiros
        durante as Experiências contratadas pelos Clientes, incluindo imagens
        feitas durante essas atividades, para divulgação em suas plataformas.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Pagamentos</h2>
      <p className="mb-4">
        Todo e qualquer pagamento deve ser feito exclusivamente através da
        plataforma B2 Adventure. Nenhum valor deve ser pago diretamente ao
        Parceiro.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">
        4. Regras de Cancelamento
      </h2>
      <p className="mb-4">
        Cada Experiência oferecida possui regras específicas de cancelamento,
        que devem ser respeitadas em caso de desistência.
      </p>
      <p className="mb-4">
        Em caso de cancelamento com reembolso, este será feito na mesma forma de
        pagamento utilizada para a compra da atividade.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">
        5. Informações Importantes
      </h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Descrição detalhada da atividade;</li>
        <li>O que está incluído na experiência;</li>
        <li>Endereço e instruções do ponto de encontro com o Parceiro;</li>
        <li>
          O que os participantes precisam levar (por exemplo: água, roupa leve,
          repelente, etc.);
        </li>
        <li>Se as fotos estão incluídas;</li>
        <li>Pontualidade nos passeios.</li>
      </ul>
      <p className="mb-4">
        Nenhum valor extra será cobrado no dia da atividade além do que foi pago
        pela plataforma.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Feedback</h2>
      <p className="mb-4">
        Após a realização da atividade, ficaremos felizes em receber seu
        feedback sobre sua experiência!
      </p>
    </div>
  );
}
