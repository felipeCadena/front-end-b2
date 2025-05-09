"use client";

import React from "react";

export default function Privacidade() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        Política de Privacidade – B2 Adventure
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        Última atualização: 19 de maio de 2025.
      </p>

      <p className="mb-4">
        A B2 Adventure valoriza a sua confiança e, por isso, se compromete a
        proteger a privacidade e os dados pessoais de todos os usuários da nossa
        plataforma — tanto clientes quanto parceiros.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Coleta de dados</h2>
      <p className="mb-2">
        Coletamos apenas os dados essenciais para que sua experiência na B2
        Adventure seja segura e eficiente. As informações podem ser fornecidas
        diretamente por você ao:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Criar uma conta na plataforma;</li>
        <li>Cadastrar uma atividade (no caso dos parceiros);</li>
        <li>
          Solicitar uma reserva ou entrar em contato com um parceiro (no caso
          dos clientes);
        </li>
        <li>Navegar pelo site e interagir com nossas páginas.</li>
      </ul>
      <p className="mb-4">
        Dados que podemos coletar incluem: nome, e-mail, telefone, CPF/CNPJ,
        localização, dados bancários (apenas para repasses aos parceiros),
        preferências de atividade, entre outros.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Uso dos dados</h2>
      <p className="mb-2">Utilizamos os dados coletados para:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Intermediar a comunicação entre clientes e parceiros;</li>
        <li>Processar reservas, pagamentos e repasses;</li>
        <li>
          Enviar atualizações, lembretes e informações relevantes sobre suas
          atividades;
        </li>
        <li>Aprimorar nossa plataforma e oferecer conteúdos personalizados;</li>
        <li>Garantir segurança e prevenir fraudes.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        3. Compartilhamento de dados
      </h2>
      <p className="mb-4">
        A B2 Adventure não vende e não compartilha seus dados com terceiros para
        fins comerciais. As informações poderão ser compartilhadas apenas com:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Parceiros responsáveis pelas atividades reservadas;</li>
        <li>
          Fornecedores que atuam na operacionalização da plataforma (como
          serviços de pagamento ou hospedagem de dados), sempre sob cláusulas de
          confidencialidade;
        </li>
        <li>Autoridades públicas, quando exigido por lei.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        4. Segurança das informações
      </h2>
      <p className="mb-4">
        Adotamos medidas técnicas e administrativas adequadas para proteger os
        dados pessoais contra acessos não autorizados, vazamentos, alterações ou
        destruição.
      </p>
      <p className="mb-4">
        Toda a navegação na B2 Adventure é protegida por criptografia e nossos
        sistemas seguem boas práticas de segurança digital.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        5. Cookies e tecnologias similares
      </h2>
      <p className="mb-4">
        Utilizamos cookies para melhorar sua experiência, entender seu
        comportamento de navegação e personalizar conteúdos e anúncios. Você
        pode gerenciar ou desabilitar os cookies nas configurações do seu
        navegador.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Seus direitos</h2>
      <p className="mb-2">Você pode, a qualquer momento:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Acessar, corrigir ou excluir seus dados pessoais;</li>
        <li>Revogar o consentimento para o uso de informações;</li>
        <li>Solicitar a portabilidade dos dados;</li>
        <li>Esclarecer dúvidas sobre o tratamento das informações.</li>
      </ul>
      <p className="mb-4">
        Para isso, entre em contato pelo e-mail:{" "}
        <a
          href="mailto:contato@b2adventure.com.br"
          className="text-blue-600 underline"
        >
          {process.env.NEXT_PUBLIC_EMAIL_B2 ?? "contato@b2adventure.com"}
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        7. Alterações nesta política
      </h2>
      <p>
        A presente Política de Privacidade pode ser atualizada a qualquer
        momento para refletir mudanças legais, operacionais ou relacionadas aos
        nossos serviços. Recomendamos que você revise este conteúdo
        periodicamente.
      </p>
    </div>
  );
}
