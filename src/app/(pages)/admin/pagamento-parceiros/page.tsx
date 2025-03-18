"use client";

import React from "react";
import MyTypography from "@/components/atoms/my-typography";
import MyIcon from "@/components/atoms/my-icon";
import { useRouter } from "next/navigation";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import PartnerPaymentCard from "@/components/molecules/partner-payment";

export default function PagamentosParceiros() {
  const router = useRouter();

  // Mock data - substituir por dados reais
  const paid = [
    {
      id: 1,
      name: "Luciana Bianco",
      amount: 1200,
      avatar: "/images/avatar1.png",
      status: "paid",
    },
    {
      id: 2,
      name: "Patricia Nogue",
      amount: 1200,
      avatar: "/images/avatar2.png",
      status: "paid",
    },
    {
      id: 3,
      name: "Rogerio Alves",
      amount: 1200,
      avatar: "/images/avatar3.png",
      status: "paid",
    },
  ];

  const pending = [
    {
      id: 1,
      name: "Luciana Bianco",
      amount: 1200,
      avatar: "/images/avatar1.png",
      status: "pending",
    },
    {
      id: 2,
      name: "Patricia Nogue",
      amount: 1200,
      avatar: "/images/avatar2.png",
      status: "pending",
    },
  ];

  const totalPagamentos = paid.length + pending.length;
  const valorTotal =
    paid.reduce((acc, curr) => acc + curr.amount, 0) +
    pending.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 p-2 bg-white">
        <MyIcon
          name="voltar-black"
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle2" weight="bold">
          Pagamentos de Parceiros
        </MyTypography>
      </div>

      <div className="w-full p-4 max-w-lg mx-auto space-y-6">
        {/* Pagos */}
        <div>
          <div className="flex justify-between items-center gap-48 mb-4">
            <MyTypography
              variant="subtitle3"
              weight="bold"
              className="text-nowrap"
            >
              Pagos
            </MyTypography>
            <MySelect
              //   value={}
              //   onValueChange={}
              value="Mensal"
            >
              <SelectTrigger className="rounded-2xl text-[#848A9C] text-xs">
                <SelectValue placeholder="Mensal" />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                <SelectItem value="Mensal">Mensal</SelectItem>
                <SelectItem value="Semanal">Semanal</SelectItem>
              </SelectContent>
            </MySelect>
          </div>

          <div className="space-y-3">
            {paid.map((payment) => (
              <PartnerPaymentCard
                key={payment.id}
                name={payment.name}
                amount={payment.amount}
                avatar={payment.avatar}
                onPay={() => console.log(`Pagar ${payment.name}`)}
                status={payment.status}
              />
            ))}
          </div>
        </div>

        {/* Aguardando Pagamento */}
        <div>
          <div className="flex justify-between gap-12 items-center mb-4">
            <MyTypography
              variant="subtitle3"
              weight="bold"
              className="text-nowrap"
            >
              Aguardando Pagamento
            </MyTypography>
            <MySelect
              //   value={}
              //   onValueChange={}
              value="Mensal"
            >
              <SelectTrigger className="rounded-2xl text-[#848A9C] text-xs">
                <SelectValue placeholder="Mensal" />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                <SelectItem value="Mensal">Mensal</SelectItem>
                <SelectItem value="Semanal">Semanal</SelectItem>
              </SelectContent>
            </MySelect>
          </div>

          <div className="space-y-3">
            {pending.map((parceiro) => (
              <PartnerPaymentCard
                key={parceiro.id}
                name={parceiro.name}
                amount={parceiro.amount}
                avatar={parceiro.avatar}
                onPay={() => console.log(`Pagar ${parceiro.name}`)}
                status={parceiro.status}
              />
            ))}
          </div>
        </div>

        {/* Resumo */}
        <div className="bg-primary-900 p-4 rounded-lg flex justify-between items-center">
          <div>
            <MyTypography variant="body-big" weight="bold">
              Pagamentos
            </MyTypography>
            <MyTypography variant="body-big" weight="bold">
              {totalPagamentos} parceiros esse mês
            </MyTypography>
          </div>
          <div className="flex flex-col items-center">
            <MyTypography
              variant="body-big"
              weight="bold"
              className="text-primary-600 self-end"
            >
              Total:
            </MyTypography>
            <MyTypography
              variant="body-big"
              weight="bold"
              className="text-primary-600"
            >
              R$ {valorTotal.toFixed(2)}
            </MyTypography>
          </div>
        </div>
      </div>
    </div>
  );
}
