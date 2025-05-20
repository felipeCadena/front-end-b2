"use client";

import { bankList } from "@/common/constants/constants";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import { useStepperStore } from "@/store/useStepperStore";
import { cn } from "@/utils/cn";
import { formatCpfCnpj, formatPhoneNumber } from "@/utils/formatters";
import React, { useEffect } from "react";

export default function Informacoes({
  handleNext,
  handleBack,
}: {
  handleNext: () => void;
  handleBack: () => void;
}) {
  const {
    setStepData,
    bankAccount,
    bankAgency,
    bankName,
    bankAccountDigit,
    bankAccountType,
    payday,
    bankCode,
    pixAddressKeyType,
    pixKey,
    bankOwnerName,
    bankOwnerDocument,
    typePayment,
  } = useStepperStore();

  const handleNextStep = () => {
    handleNext();
  };

  useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const bank = bankList.find((b) =>
      b.name.toLowerCase().includes(bankName.toLowerCase())
    );
    if (bank) {
      setStepData(4, { bankCode: bank.code });
    }
  }, [bankName]);

  return (
    <>
      <div
        className={cn(
          "md:border-2 md:border-gray-200 md:rounded-xl md:p-12 md:my-4"
        )}
      >
        <div className="hidden md:block">
          <MyTypography variant="heading2" weight="bold">
            Precisamos de só mais algumas informações
          </MyTypography>
          <MyTypography variant="subtitle3" weight="regular" lightness={400}>
            Precisamos de seus dados bancários agora.
          </MyTypography>
        </div>

        <div className="mt-4">
          <MySelect
            value={typePayment}
            onValueChange={(value) => setStepData(4, { typePayment: value })}
            label="Escolha o tipo de pagamento"
          >
            <SelectTrigger className="py-6 mt-1 mb-4">
              <SelectValue placeholder="Digite o tipo de pagamento" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="bank">Conta Bancária</SelectItem>
              <SelectItem value="pix">PIX</SelectItem>
            </SelectContent>
          </MySelect>
        </div>

        <div className="">
          {typePayment == "bank" ? (
            <div className="mb-4">
              <div className="flex gap-2">
                <MyTextInput
                  label="Número da conta"
                  placeholder="09874"
                  className="mt-2"
                  value={bankAccount}
                  onChange={(e) =>
                    setStepData(4, { bankAccount: e.target.value })
                  }
                />

                <MyTextInput
                  label="Digito da conta"
                  placeholder="0"
                  className="mt-2"
                  value={bankAccountDigit}
                  onChange={(e) =>
                    setStepData(4, { bankAccountDigit: e.target.value })
                  }
                />

                <MySelect
                  value={bankAccountType}
                  onValueChange={(value) =>
                    setStepData(4, { bankAccountType: value })
                  }
                  label="Tipo de conta"
                >
                  <SelectTrigger className="py-6 mt-1 mb-4">
                    <SelectValue placeholder="Digite seu tipo de conta" />
                  </SelectTrigger>
                  <SelectContent className="">
                    <SelectItem value="CONTA_CORRENTE">
                      Conta Corrente
                    </SelectItem>
                    <SelectItem value="CONTA_POUPANCA">
                      Conta Poupança
                    </SelectItem>
                  </SelectContent>
                </MySelect>
              </div>

              <div className="flex gap-2">
                <MyTextInput
                  label="Agência"
                  placeholder="Digite sua agência"
                  className="mt-2"
                  value={bankAgency}
                  onChange={(e) =>
                    setStepData(4, { bankAgency: e.target.value })
                  }
                />

                <MySelect
                  value={bankName}
                  onValueChange={(value) => setStepData(4, { bankName: value })}
                  label="Nome do banco"
                >
                  <SelectTrigger className="py-6 mt-1 mb-4">
                    <SelectValue placeholder="Seleciona o nome do banco" />
                  </SelectTrigger>
                  <SelectContent className="">
                    {bankList.map((bank) => (
                      <SelectItem key={bank.code} value={bank.name}>
                        {bank.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </MySelect>
                <MyTextInput
                  label="Código do banco"
                  placeholder="001"
                  className="mt-2"
                  value={bankCode}
                  disabled
                />
              </div>

              <div className="flex gap-2">
                <MyTextInput
                  label="Dono da conta"
                  placeholder="Digite o nome do dono da conta"
                  className="mt-2"
                  value={bankOwnerName}
                  onChange={(e) =>
                    setStepData(4, { bankOwnerName: e.target.value })
                  }
                />

                <MyTextInput
                  label="Documento do dono da conta"
                  placeholder="CPF ou CNPJ"
                  className="mt-2"
                  value={bankOwnerDocument}
                  onChange={(e) =>
                    setStepData(4, {
                      bankOwnerDocument: formatCpfCnpj(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          ) : (
            <div className="flex gap-2 mt-2">
              <MySelect
                value={pixAddressKeyType}
                onValueChange={(value) =>
                  setStepData(4, { pixAddressKeyType: value })
                }
                label="Tipo da chave pix"
              >
                <SelectTrigger className="py-6 mt-1 mb-4">
                  <SelectValue placeholder="Digite seu tipo de chave" />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectItem value="EVP">Código aleatório</SelectItem>
                  <SelectItem value="CNPJ">CNPJ</SelectItem>
                  <SelectItem value="CPF">CPF</SelectItem>
                  <SelectItem value="EMAIL">E-mail</SelectItem>
                  <SelectItem value="PHONE">Telefone</SelectItem>
                </SelectContent>
              </MySelect>

              <MyTextInput
                label="Chave pix"
                placeholder={
                  pixAddressKeyType == "PHONE"
                    ? "(00) 00000-0000"
                    : "Digite sua chave pix"
                }
                className="mt-2"
                value={pixKey}
                onChange={(e) =>
                  setStepData(4, {
                    pixKey:
                      pixAddressKeyType == "PHONE"
                        ? formatPhoneNumber(e.target.value)
                        : e.target.value,
                  })
                }
              />
            </div>
          )}

          <div>
            <MySelect
              value={String(payday) == "5" ? "05" : String(payday)}
              onValueChange={(value) => setStepData(4, { payday: +value })}
              label="Data de Pagamento"
            >
              <SelectTrigger className="py-6 mt-1 mb-4">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="05">Todo dia 05</SelectItem>
                <SelectItem value="10">Todo dia 10</SelectItem>
                <SelectItem value="15">Todo dia 15</SelectItem>
              </SelectContent>
            </MySelect>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center w-full max-w-3xl mx-auto p-4">
        <MyButton
          variant="default"
          borderRadius="squared"
          onClick={handleBack}
          leftIcon={<MyIcon name="seta-direita" className="rotate-180" />}
        >
          Voltar
        </MyButton>
        <MyButton
          variant="default"
          borderRadius="squared"
          onClick={handleNextStep}
          rightIcon={<MyIcon name="seta-direita" />}
        >
          Próximo
        </MyButton>
      </div>
    </>
  );
}
