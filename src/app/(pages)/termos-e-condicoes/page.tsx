"use client";

import React from "react";
import useLogin from "../(acesso)/login/login-store";
import MyTypography from "@/components/atoms/my-typography";

export default function TermosCondicoes() {
  const { email } = useLogin();

  return (
    <section>
      <MyTypography
        variant="heading2"
        weight="bold"
        className="text-center my-10"
      >
        Termos de Serviço
      </MyTypography>
      {email.includes("cliente") ? (
        <MyTypography
          variant="subtitle3"
          weight="bold"
          className=""
        >
          Estes Termos de Serviço ("Termos") são um acordo legal vinculante
          entre você e a B2 Adventure, que regem seu direito de uso dos sites,
          aplicativos e outras ofertas da B2 Adventure. Quando usados nestes
          Termos, "B2", "nós", "nosso" ou "nossos" referem-se à entidade B2
          Adventure estabelecida no documento que você está contratando. A
          Plataforma B2 Adventure permite que os usuários ("Membros") publiquem,
          ofereçam, busquem e reservem serviços. Os Membros que publicam e
          oferecem serviços são chamados de "Parceiros" e os Membros que buscam,
          reservam ou usam os serviços são chamados de "Clientes". Os Parceiros
          oferecem suas atividades esportivas ("Experiências") e tem a B2
          Adventure como plataforma de divulgação das suas atividades
          esportivas. Como provedor da Plataforma B2 Adventure, a B2 não se
          responsabiliza pela atividade exercida pelo Parceiro, sendo de total
          responsabilidade dele, Parceiro, toda e qualquer informação e
          acontecimentos ocorridos durante a atividade. Tirando da B2 Adventure
          quaisquer responsabilidade jurídica sobre a atividade exercida. É de
          responsabilidade da B2 Adventure intermediar os interesses das duas
          partes no que diz respeito a divulgação e compra da atividade, sendo
          uma que busca aquela experiência, denominado como Cliente, e o que
          oferece aquela atividade, denominado Parceiro. Essa função de
          intermediador e divulgador das atividades dos Parceiros, permite a B2
          Adventure utilizar todo e qualquer material fornecido pelos nossos
          Parceiros durante a experiência contratada pelos nossos Clientes,
          permitindo o uso das imagens feitas durante essas Experiências
          contratadas, para a divulgação das mesmas em nossas plataformas de
          publicidade da marca B2 Adventure. Todo e qualquer pagamento é feito
          exclusivamente em nossa plataforma. Não existe nenhum valor a ser pago
          diretamente ao parceiro, sem que seja através da plataforma B2
          Adventure. Regras de cancelamento: Cada Experiência oferecida em nossa
          plataforma possui informações específicas sobre suas regras de
          cancelamento, devendo ser respeitadas em caso de desistência da mesma.
          Em caso de cancelamento com reembolso, o reembolso será feito na mesma
          forma em que foi realizado o pagamento da atividade. Antes de reservar
          e pagar sua atividade, leia atentamente todas as suas informações e
          regras. Itens importantes ler com atenção: * Descrição da atividade; *
          O que está incluído; * Endereço e instruções sobre o ponto de encontro
          com o Parceiro; * O que os participantes precisam levar (por exemplo:
          dinheiro para comprar comida, água, roupa leve, repelente e etc) *
          Atentar-se se fotos estão incluídas * Pontualidade nos passeios Nenhum
          valor extra ao feito através da nossa plataforma será cobrado ao
          cliente no dia da atividade. Após a atividade realizada, adoraremos
          receber o seu feedback sobre sua experiência com a gente!
        </MyTypography>
      ) : (
        <MyTypography
          variant="subtitle3"
          weight="bold"
          className=""
        >
          Estes Termos de Serviço ("Termos") são um acordo legal vinculante
          entre você e a B2 Adventure, que regem seu direito de uso dos sites,
          aplicativos e outras ofertas da B2 Adventure. Quando usados nestes
          Termos, "B2", "nós", "nosso" ou "nossos" referem-se à entidade B2
          Adventure estabelecida no documento que você está contratando. A
          Plataforma B2 Adventure permite que os usuários ("Membros") publiquem,
          ofereçam, busquem e reservem serviços. Os Membros que publicam e
          oferecem serviços são chamados de "Parceiros" e os Membros que buscam,
          reservam ou usam os serviços são chamados de "Clientes". Os Parceiros
          oferecem suas atividades esportivas ("Experiências") e tem a B2
          Adventure como plataforma de divulgação das suas atividades
          esportivas. Como provedor da Plataforma B2 Adventure, a B2 não se
          responsabiliza pela atividade exercida pelo Parceiro, sendo de total
          responsabilidade dele, Parceiro, toda e qualquer informação e
          acontecimentos ocorridos durante a atividade. Tirando da B2 Adventure
          quaisquer responsabilidade jurídica sobre a atividade exercida. É de
          responsabilidade da B2 Adventure intermediar os interesses das duas
          partes no que diz respeito a divulgação e compra da atividade, sendo
          uma que busca aquela experiência, denominado como Cliente, e o que
          oferece aquela atividade, denominado Parceiro. Essa função de
          intermediador e divulgador das atividades dos Parceiros, permite a B2
          Adventure reter 30% do valor cobrado pela atividade oferecida pelos
          Parceiros, da qual os valores são estipulados pelos mesmo, sem
          qualquer intervenção da B2 Adventure quanto a isso. A B2 Adventure
          apenas exige que os valores sejam condizentes com o oferecido pelos
          parceiros também fora da plataforma, de forma que não haja
          diferenciação dos valores da atividade oferecida dentro e fora da
          plataforma e também exige acesso as imagens feitas durante o passeio,
          para fins de divulgação da plataforma e suas atividades ali
          oferecidas. Caso essa diferenciação de valores seja identificada, o
          Parceiro pode ter sua atividade removida da plataforma. Quanto ao
          pagamento das atividades pelos Clientes, é todo realizado dentro da
          plataforma B2, sendo proibida qualquer cobrança por fora do Parceiro
          ao Cliente, e o repasse para o Parceiro da sua devida parte é feito de
          forma mensal de acordo com a quantidade de passeios feitos no mês
          anterior, podendo o Parceiro escolher uma das nossas opções de dias,
          para o recebimento da sua parte, na data e conta bancária pré
          selecionadas e informadas no momento do seu cadastro em nossa
          plataforma. A descrição da experiência deve ser clara, completa e
          precisa. O cliente deve saber exatamente o que esperar ao comprar a
          experiência com você. Dicas para ajudar na elaboração da descrição: *
          Informe o que os participantes vão fazer; * Endereço e instruções
          sobre o ponto de encontro com o Parceiro; * O que está incluído no
          preço (por exemplo, o que o parceiro fornece aos participantes) * O
          que os participantes precisam levar (por exemplo, dinheiro para
          comprar comida, água, roupa leve e etc) * Especificar se as fotos
          estão incluídas * Informar quais idiomas o parceiro tem domínio O que
          não é permitido na descrição da atividade: - Mencionar qualquer link -
          Mencionar valores extras cobrados por fora para compor aquela
          atividade É fundamental que no valor da sua atividade esteja incluído
          todo o seu custo e lucro para que a atividade aconteça, pois nenhum
          valor pode ser cobrado do cliente no momento do passeio.
        </MyTypography>
      )}
    </section>
  );
}
