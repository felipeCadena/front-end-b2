"use client";

import MyButton from "@/components/atoms/my-button";
import MyTypography from "@/components/atoms/my-typography";
import { useFinishPayment } from "@/store/useFinishPayment";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Finalizar = () => {
  const { paymentResponse } = useFinishPayment();
  const [copyMessage, setCopyMessage] = useState<string>("");

  const handleCopy = async (pixCopiaCola: string) => {
    await navigator.clipboard.writeText(pixCopiaCola);
    setCopyMessage("Código copiado!");
    setTimeout(() => {
      setCopyMessage("");
    }, 1300);
  };

  console.log(paymentResponse);

  return (
    <section className="px-4 mb-8">
      <div className="w-60% flex flex-col justify-center items-center">
        {paymentResponse?.paymentMethod === "BOLETO" && (
          <div className="my-16 flex flex-col items-center gap-4">
            <MyTypography variant="subtitle2" weight="bold">
              Valor total:{" "}
              <span className="text-primary-600">{`${paymentResponse?.total?.toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                }
              )}`}</span>
            </MyTypography>
            <Link
              href={paymentResponse?.bankSlipUrl as string}
              target="_blank"
              className="text-blue-500 underline"
            >
              Clique aqui para acessar seu boleto!
            </Link>
          </div>
        )}
        <div className="flex flex-col max-sm:text-center justify-center items-center gap-2 mt-8">
          {paymentResponse?.paymentMethod === "PIX" && (
            <div className="flex flex-col items-center gap-2">
              <MyTypography variant="body" weight="regular">
                {`Esse código ficará válido até: ${new Date(
                  paymentResponse?.pixDueDate ?? ""
                ).toLocaleDateString()} as ${new Date(
                  paymentResponse.pixDueDate ?? ""
                ).toLocaleTimeString("pt-BR", {
                  timeZone: "America/Sao_Paulo",
                })}`}
              </MyTypography>
              <MyTypography variant="subtitle2" weight="bold">
                Valor total:{" "}
                <span className="text-primary-600">{`${paymentResponse?.total?.toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                )}`}</span>
              </MyTypography>
              <Image
                src={`data:image/png;base64,${paymentResponse.qrCode}`}
                alt="Pix Q R Code"
                width={300}
                height={300}
                className="w-[300px] -mt-2"
              />
            </div>
          )}
          {paymentResponse?.paymentMethod === "PIX" && (
            <>
              <MyButton
                borderRadius="squared"
                size="lg"
                onClick={() =>
                  handleCopy(paymentResponse.pixCopyPaste as string)
                }
                className="w-[200px]"
              >
                {copyMessage === "" ? "Pix copia e cola" : copyMessage}
              </MyButton>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Finalizar;
