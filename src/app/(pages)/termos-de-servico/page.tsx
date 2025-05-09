"use client";

import React from "react";
import MyTypography from "@/components/atoms/my-typography";
import useLogin from "@/store/useLogin";
import { useAuthStore } from "@/store/useAuthStore";
import PartnerTerms from "@/components/templates/termos-parceiro";
import TermosCliente from "@/components/templates/termos-cliente";

export default function TermosCondicoes() {
  const { user } = useAuthStore();

  return (
    <section>
      {user?.role == "customer" || !user ? <TermosCliente /> : <PartnerTerms />}
    </section>
  );
}
