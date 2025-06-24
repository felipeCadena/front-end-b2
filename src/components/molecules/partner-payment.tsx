import React from "react";
import Image from "next/image";
import MyTypography from "@/components/atoms/my-typography";
import MyButton from "@/components/atoms/my-button";
import MySpinner from "../atoms/my-spinner";

interface PartnerPaymentCardProps {
  name: string;
  amount: number;
  avatar: string;
  payday: number;
  onPay: () => void;
  status?: string;
  loading?: boolean;
}

export default function PartnerPaymentCard({
  name,
  amount,
  avatar,
  payday,
  onPay,
  status,
  loading,
}: PartnerPaymentCardProps) {
  return (
    <div className="flex items-center justify-between bg-[#F1F0F5] py-3 px-4 rounded-lg relative my-4">
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12">
          <Image
            src={avatar ?? "/user.png"}
            alt={name ?? "avatar"}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <MyTypography variant="body-big" weight="semibold">
            {name}
          </MyTypography>
          <MyTypography
            variant="body-big"
            lightness={500}
            className="text-gray-600"
          >
            R$ {amount && amount.toFixed(2)}
          </MyTypography>
          <MyTypography
            variant="label"
            weight="semibold"
            className="text-gray-600"
          >
            Pagamento: {payday}
          </MyTypography>
        </div>
      </div>
      {status == "paid" ? (
        <MyButton
          variant="secondary-muted"
          size="sm"
          borderRadius="squared"
          className="text-sm px-6 py-1 font-normal cursor-default"
        >
          Pago
        </MyButton>
      ) : (
        <MyButton
          variant="red"
          size="sm"
          borderRadius="squared"
          className="text-sm px-6 py-1 w-20"
          disabled={loading}
          onClick={onPay}
        >
          {loading ? <MySpinner /> : "Pagar"}
        </MyButton>
      )}
    </div>
  );
}
