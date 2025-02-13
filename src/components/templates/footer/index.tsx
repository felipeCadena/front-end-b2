"use client";

import MyIcon from "@/components/atoms/my-icon";
import MyLogo from "@/components/atoms/my-logo";
import MyTypography from "@/components/atoms/my-typography";
import { cn } from "@/utils/cn";
import PATHS from "@/utils/paths";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Footer() {
  const pathname = usePathname();

  const withFooter = () => {
    return (
      pathname == PATHS.initial ||
      pathname == PATHS.atividades
    );
  };

  return (
    <footer className={cn("bg-[#F1F0F5] text-center px-4 pb-8", !withFooter() && "max-sm:hidden")}>
      <div className="md:w-4/5 md:mx-auto">
      <MyLogo
        variant="mobile"
        width={150}
        height={150}
        className="mx-auto py-8"
      />
      <MyTypography variant="subtitle2" weight="semibold">
        B2 Adventure
      </MyTypography>
      <MyTypography variant="body-big" weight="regular" className="mt-4 mb-6 md:mt-8 md:w-2/3 md:mx-auto">
        Entre em contato com nosso atendimento por emal e confira nossas
        novidades em nossas redes sociais:
      </MyTypography>

      <div className="flex justify-center py-1 gap-4 bg-primary-900 rounded-md md:w-1/3 md:mx-auto">
        <MyIcon name="email" />
        <MyTypography variant="body-big">
          {process.env.NEXT_PUBLIC_EMAIL_B2 ?? "contato@b2adventure.com"}
        </MyTypography>
      </div>
      <div className="flex justify-center gap-4 my-10 relative">
        <MyIcon name="linkedin" className="bg-primary-900 rounded-md" />
        <MyIcon name="messenger" className="bg-primary-900 rounded-md" />
        <MyIcon name="youtube" className="bg-primary-900 rounded-md" />
        <MyIcon name="instagram" className="bg-primary-900 rounded-md" />
        <MyIcon name="facebookGray" className="bg-primary-900 rounded-md" />
        <MyIcon 
        name="scroll-mouse" 
        className="max-sm:hidden absolute bottom-1/2 right-6 cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      </div>


    <div className="md:flex md:gap-4 md:justify-center md:items-center">
      <MyTypography
        variant="body"
        weight="regular"
        lightness={400}
        className="max-sm:mt-10 px-4"
      >
        © 2025 Todos os direitos reservados
      </MyTypography>
      <Link href="/termos-de-uso">
        <MyTypography
          variant="body"
          weight="regular"
          lightness={400}
          className="max-sm:mt-6 px-4"
        >
          Termos de Uso
        </MyTypography>
      </Link>

      <Link href="/quem-somos">
        <MyTypography
          variant="body"
          weight="regular"
          lightness={400}
          className="max-sm:mt-4 px-4"
        >
          Quem Somos
        </MyTypography>
      </Link>

      <Link href="/fale-conosco">
        <MyTypography
          variant="body"
          weight="regular"
          lightness={400}
          className="max-sm:mt-4 px-4"
        >
          Fale Conosco
        </MyTypography>
      </Link>

      <Link href="/politica-de-privacidade">
        <MyTypography
          variant="body"
          weight="regular"
          lightness={400}
          className="max-sm:mt-4 px-4"
        >
          Politica de Privacidade
        </MyTypography>
      </Link>
    </div>
    </div>

    </footer>
  );
}
