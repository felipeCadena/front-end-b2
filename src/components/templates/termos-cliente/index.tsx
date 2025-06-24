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
            plataforma B2 Adventure, que intermedia atividades e experiências de
            aventura entre Clientes e Parceiros. Doravante referida apenas como
            “B2 Adventure”.
          </li>
          <li>
            <strong>Cliente</strong>: pessoa física ou jurídica que adquire,
            agenda ou reserva atividades de aventura por meio da plataforma B2
            Adventure.
          </li>
          <li>
            <strong>Parceiro</strong>: prestador de serviços que oferece
            atividades de aventura disponibilizadas na plataforma B2 Adventure,
            sendo o responsável direto pela execução das mesmas.
          </li>
        </ul>
      </Section>

      <Section title="2. Serviços da Plataforma">
        <p>
          A B2 Adventure atua exclusivamente como intermediadora entre Clientes
          e Parceiros, possibilitando a busca, agendamento, reserva e pagamento
          de atividades de aventura. A execução das atividades é de
          responsabilidade exclusiva dos Parceiros.
        </p>
      </Section>

      <Section title="3. Pagamentos">
        <ul className="list-disc list-inside space-y-2">
          <li>
            Todos os pagamentos devem ser realizados exclusivamente através da
            plataforma B2 Adventure.
          </li>
          <li>
            Não são permitidos pagamentos diretos entre Clientes e Parceiros.
          </li>
          <li>
            Eventuais reembolsos ou estornos serão processados pela B2
            Adventure, utilizando a mesma forma de pagamento da compra original.
          </li>
        </ul>
      </Section>

      <Section title="4. Buscas e Reservas na B2 Adventure">
        <p>
          <strong>Buscas:</strong> Clientes podem buscar Atividades utilizando
          filtros como tipo de serviço, tipo de atividade, localização, data
          desejada e número de participantes. Os resultados são organizados com
          base em critérios de relevância, como preço, disponibilidade,
          avaliações, histórico de atendimento, popularidade, entre outros.
        </p>
        <p className="mt-4">
          <strong>Reservas:</strong> Ao reservar uma Atividade, o Cliente
          concorda em pagar o Valor Total, que inclui o valor do serviço, taxas
          aplicáveis (como a taxa de serviço da B2 Adventure), impostos e outros
          encargos indicados no momento da reserva. Reservas realizadas em moeda
          diferente do Real (BRL) terão o preço ajustado conforme taxa de
          conversão determinada pela B2 Adventure.
        </p>
        <p>
          Com a confirmação da reserva, estabelece-se um contrato de prestação
          de serviço diretamente entre Cliente e Parceiro, regido por este
          Termo, pelas condições específicas da atividade, pela política de
          cancelamento e por todas as regras e requisitos informados no anúncio.
          É responsabilidade do Cliente ler e compreender todas essas condições
          antes de efetuar a reserva.
        </p>
      </Section>

      <Section title="5. Regras de Cancelamento e Reembolso">
        <p>
          Cada Experiência oferecida na plataforma possui suas regras
          específicas de cancelamento, descritas na página da atividade. Essas
          regras devem ser respeitadas em caso de desistência. Caso o
          cancelamento ocorra por motivo de força maior, como condições
          climáticas, problemas técnicos ou impedimentos do Parceiro, o Cliente
          terá direito ao reembolso automático do valor pago.
        </p>
      </Section>

      <Section title="6. Utilização de Imagens">
        <p>
          Ao aceitar este Termo, o Cliente autoriza a B2 Adventure a utilizar
          imagens captadas durante a execução das atividades — fornecidas pelos
          Parceiros ou produzidas no decorrer da experiência — para fins de
          divulgação da plataforma e promoção da marca B2 Adventure, em canais
          como site, redes sociais, newsletters e materiais de publicidade, sem
          que isso gere qualquer direito de remuneração ou indenização.
        </p>
      </Section>

      <Section title="7. Responsabilidades do Cliente">
        <ul className="list-disc list-inside space-y-2">
          <li>
            O Cliente declara estar em condições físicas e psicológicas
            adequadas para a prática da atividade adquirida.
          </li>
          <li>
            O Cliente reconhece que atividades de aventura envolvem riscos,
            assumindo total responsabilidade por sua participação.
          </li>
          <li>
            Em caso de menores de idade, é obrigatória a presença de um
            responsável maior de idade durante a execução da atividade.
          </li>
          <li>
            A B2 Adventure não se responsabiliza por danos físicos, materiais ou
            quaisquer consequências decorrentes da prática das atividades.
          </li>
        </ul>
      </Section>

      <Section title="8. Responsabilidades da Plataforma">
        <ul className="list-disc list-inside space-y-2">
          <li>
            A B2 Adventure compromete-se a intermediar as relações com
            transparência e segurança.
          </li>
          <li>
            A execução, qualidade, alterações e segurança das atividades são de
            responsabilidade exclusiva do Parceiro.
          </li>
        </ul>
      </Section>

      <Section title="9. Seguro e Riscos">
        <ul className="list-disc list-inside space-y-2">
          <li>
            A prática de atividades de aventura pode envolver riscos naturais e
            imprevisíveis.
          </li>
          <li>
            Recomenda-se que o Cliente contrate seguro pessoal se desejar
            proteção adicional para as atividades adquiridas.
          </li>
        </ul>
      </Section>

      <Section title="10. Modificações no Termo">
        <p>
          A B2 Adventure poderá atualizar estes Termos de Serviço a qualquer
          momento, mediante publicação da nova versão na plataforma. O uso
          contínuo da plataforma após a publicação implica na aceitação dos
          novos termos.
        </p>
      </Section>

      <Section title="11. Foro">
        <p>
          Para dirimir quaisquer dúvidas ou litígios oriundos deste Termo, fica
          eleito o foro da comarca do Rio de Janeiro/RJ, com exclusão de
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
