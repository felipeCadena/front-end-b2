"use client";

import MyBadge from "@/components/atoms/my-badge";
import MyIcon from "@/components/atoms/my-icon";
import MyLogo from "@/components/atoms/my-logo";
import MyTypography from "@/components/atoms/my-typography";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#F1F0F5] text-center px-4 pb-8">
      <MyLogo
        variant="regular"
        width={150}
        height={150}
        className="mx-auto py-8"
      />
      <MyTypography variant="subtitle2" weight="semibold">
        B2 Adventures
      </MyTypography>
      <MyTypography variant="body-big" weight="regular" className="mt-2 pb-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim habitasse
        eu eget ac morbi neque. Tempus, quam pellentesque massa quis. Nisl
        faucibus sagittis tempor, non sit eu.
      </MyTypography>

      <div className="flex justify-center py-1 gap-4 bg-[#97E16933] rounded-md">
        <MyIcon name="email" className="" />
        <MyTypography variant="body-big">
          contatob2adventure@gmail.com
        </MyTypography>
      </div>

      <MyTypography variant="label" weight="regular" className="mt-10 px-4">
        Entre em contato com nosso atendimento por emal e confira nossas
        novidades em nossas redes sociais:
      </MyTypography>
      <div className="flex justify-center gap-4 my-10">
        <MyIcon name="linkedin" className="bg-[#97E16933] rounded-md" />
        <MyIcon name="messenger" className="bg-[#97E16933] rounded-md" />
        <MyIcon name="youtube" className="bg-[#97E16933] rounded-md" />
        <MyIcon name="instagram" className="bg-[#97E16933] rounded-md" />
        <MyIcon name="facebookGray" className="bg-[#97E16933] rounded-md" />
      </div>

      <MyTypography
        variant="body"
        weight="regular"
        lightness={400}
        className="mt-10 px-4"
      >
        © 2025 Todos os direitos reservados
      </MyTypography>
      <Link href="/termos-e-condicoes">
        <MyTypography
          variant="body"
          weight="regular"
          lightness={400}
          className="mt-6 px-4"
        >
          Termos de Uso
        </MyTypography>
      </Link>

      <Link href="/quem-somos">
        <MyTypography
          variant="body"
          weight="regular"
          lightness={400}
          className="mt-4 px-4"
        >
          Quem Somos
        </MyTypography>
      </Link>

      <Link href="/contato">
        <MyTypography
          variant="body"
          weight="regular"
          lightness={400}
          className="mt-4 px-4"
        >
          Contato
        </MyTypography>
      </Link>

      <Link href="/politica-de-privacidade">
        <MyTypography
          variant="body"
          weight="regular"
          lightness={400}
          className="mt-4 px-4"
        >
          Politica de Privacidade
        </MyTypography>
      </Link>
    </footer>
  );
}
