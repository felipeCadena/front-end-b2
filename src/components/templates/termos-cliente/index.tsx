import MyTypography from "@/components/atoms/my-typography";
import React from "react";

export default function TermosCliente() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        Termo de Serviço da Plataforma B2 Adventure
      </h1>
      <p className="text-sm text-gray-400 mb-8">
        Última atualização: 19 de maio de 2025
      </p>

      <p className="mb-6">
        Seja bem-vindo(a) à B2 Adventure Sports Ltda, doravante denominada
        apenas <strong>B2 Adventure</strong>. Ao utilizar nossa plataforma, você
        concorda com estes Termos de Serviço. Leia-os atentamente.
      </p>

      <Section title="1. Definições">
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>B2 Adventure Sports Ltda</strong>: empresa responsável pela
            plataforma B2 Adventure, que intermedia atividades entre Clientes e
            Parceiros.
          </li>
          <li>
            <strong>Cliente</strong>: pessoa física ou jurídica que agenda ou
            reserva atividades de aventura por meio da plataforma.
          </li>
          <li>
            <strong>Parceiro</strong>: prestador de serviços responsável pela
            execução das atividades ofertadas na plataforma.
          </li>
        </ul>
      </Section>

      <Section title="2. Serviços da Plataforma">
        <p>
          A B2 Adventure atua exclusivamente como intermediadora entre Clientes
          e Parceiros, permitindo busca, agendamento, reserva e pagamento de
          atividades. A execução das atividades é responsabilidade exclusiva dos
          Parceiros.
        </p>
      </Section>

      <Section title="3. Pagamentos">
        <ul className="list-disc list-inside space-y-2">
          <li>
            Pagamentos devem ser realizados exclusivamente pela plataforma.
          </li>
          <li>Pagamentos diretos entre Cliente e Parceiro são proibidos.</li>
          <li>
            Reembolsos e estornos serão processados pela B2 Adventure, pela
            mesma forma de pagamento usada na compra.
          </li>
        </ul>
      </Section>

      <Section title="4. Buscas e Reservas na B2 Adventure">
        <p>
          <strong>Buscas:</strong> Os Clientes podem buscar atividades usando
          filtros como tipo, localização, data e número de participantes.
          Resultados são organizados com base em critérios como preço,
          avaliações, disponibilidade, entre outros.
        </p>
        <p className="mt-4">
          <strong>Reservas:</strong> Ao reservar uma atividade, o Cliente
          concorda com o valor total, incluindo taxas e impostos. Reservas em
          outras moedas serão convertidas com base na taxa de câmbio da B2
          Adventure.
        </p>
        <p>
          Com a confirmação da reserva, estabelece-se um contrato direto entre
          Cliente e Parceiro. É responsabilidade do Cliente ler todas as
          condições antes da reserva.
        </p>
      </Section>

      <Section title="5. Regras de Cancelamento e Reembolso">
        <p>
          Cada atividade tem suas próprias regras de cancelamento. Em caso de
          força maior (ex: clima, problemas técnicos ou impedimentos do
          Parceiro), o Cliente tem direito a reembolso automático.
        </p>
      </Section>

      <Section title="6. Utilização de Imagens">
        <p>
          O Cliente autoriza o uso de imagens captadas durante as atividades,
          para divulgação da plataforma e promoção da marca B2 Adventure, sem
          direito a remuneração ou indenização.
        </p>
      </Section>

      <Section title="7. Responsabilidades do Cliente">
        <ul className="list-disc list-inside space-y-2">
          <li>
            Estar em condições físicas e psicológicas adequadas para a
            atividade.
          </li>
          <li>Assumir os riscos inerentes à prática da atividade.</li>
          <li>Menores de idade devem estar acompanhados por um responsável.</li>
          <li>
            A B2 Adventure não se responsabiliza por danos decorrentes da
            atividade.
          </li>
        </ul>
      </Section>

      <Section title="8. Responsabilidades da Plataforma">
        <ul className="list-disc list-inside space-y-2">
          <li>Intermediar as relações com transparência e segurança.</li>
          <li>
            A execução e qualidade das atividades são responsabilidade do
            Parceiro.
          </li>
        </ul>
      </Section>

      <Section title="9. Seguro e Riscos">
        <p>
          Atividades de aventura envolvem riscos naturais e imprevisíveis.
          Recomenda-se a contratação de seguro pessoal por parte do Cliente.
        </p>
      </Section>

      <Section title="10. Modificações no Termo">
        <p>
          A B2 Adventure pode atualizar os Termos a qualquer momento. O uso
          contínuo da plataforma implica aceitação das versões atualizadas.
        </p>
      </Section>

      <Section title="11. Foro">
        <p>
          Fica eleito o foro da comarca do Rio de Janeiro/RJ, com exclusão de
          qualquer outro, por mais privilegiado que seja.
        </p>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="text-base space-y-2">{children}</div>
    </section>
  );
}
