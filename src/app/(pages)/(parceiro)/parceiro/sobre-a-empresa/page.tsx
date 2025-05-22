"use client";

import { bankList } from "@/common/constants/constants";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyLogo from "@/components/atoms/my-logo";
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
import {
  formatCNPJ,
  formatCpfCnpj,
  formatPhoneNumber,
} from "@/utils/formatters";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

export default function SobreAEmpresa() {
  const {
    setStepData,
    fantasyName,
    cnpjOrCpf,
    bankAccount,
    bankAgency,
    bankName,
    bankCode,
    bankAccountDigit,
    bankAccountType,
    payday,
    pixAddressKeyType,
    pixKey,
    bankOwnerName,
    bankOwnerDocument,
    typePayment,
  } = useStepperStore();

  const router = useRouter();

  const handleNextStep = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (typePayment == "bank") {
      if (
        !bankAccount ||
        !bankAgency ||
        !bankName ||
        !bankAccountDigit ||
        !bankAccountType ||
        !bankOwnerName ||
        !bankOwnerDocument ||
        !bankCode
      ) {
        toast.error("Todos os campos são obrigatórios!");
        return;
      }
    } else if (typePayment == "pix") {
      if (!pixKey || !pixAddressKeyType) {
        toast.error("Todos os campos são obrigatórios!");
        return;
      }
    }

    if (!fantasyName || !cnpjOrCpf || !payday) {
      toast.error("Todos os campos são obrigatórios!");
      return;
    }

    router.push(PATHS["cadastro-atividade"]);
  };

  useEffect(() => {
    const bank = bankList.find((b) =>
      b.name.toLowerCase().includes(bankName.toLowerCase())
    );
    if (bank) {
      setStepData(4, { bankCode: bank.code });
    }
  }, [bankName]);

  return (
    <section className="m-6 space-y-4 md:space-y-8 md:max-w-screen-md md:mx-auto md:mt-12 md:border-2 md:border-gray-200 md:rounded-xl md:py-16">
      <div className="relative md:hidden">
        <MyLogo variant="mobile" width={100} height={100} className="mx-auto" />
        <MyIcon
          name="voltar"
          className="absolute top-1/3 left-0 md:hidden"
          onClick={() => router.back()}
        />
      </div>

      <div className={cn("space-y-4 md:space-y-8 md:w-2/3 md:mx-auto")}>
        <div className="space-y-2">
          <MyTypography variant="heading2" weight="bold">
            Agora nos conte um pouco sobre a sua empresa!
          </MyTypography>
          <MyTypography variant="subtitle3" weight="regular" lightness={400}>
            Só precisa preencher alguns dados antes.
          </MyTypography>
        </div>

        <div className="space-y-2">
          <MyTextInput
            onChange={(e) => setStepData(3, { fantasyName: e.target.value })}
            value={fantasyName}
            label="Nome fantasia empresa"
            placeholder="Nome fantasia"
            className="mt-2"
          />
          <MyTextInput
            onChange={(e) =>
              setStepData(3, { cnpjOrCpf: formatCpfCnpj(e.target.value) })
            }
            value={cnpjOrCpf}
            label="CNPJ ou CPF"
            placeholder="Digite o CNPJ ou CPF"
            className="mt-2"
          />
        </div>
      </div>

      <div className={cn("md:space-y-8 md:w-2/3 md:mx-auto")}>
        <div className="hidden md:block space-y-2">
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
              <div className="grid grid-cols-2 gap-2">
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
                <div className="col-span-2">
                  <MySelect
                    value={bankAccountType}
                    onValueChange={(value) =>
                      setStepData(4, { bankAccountType: value })
                    }
                    label="Tipo de conta"
                    className=""
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
              </div>

              <div className="grid grid-cols-2 gap-x-2">
                <div className="col-span-2">
                  <MySelect
                    value={bankName}
                    onValueChange={(value) =>
                      setStepData(4, { bankName: value })
                    }
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
                </div>

                <MyTextInput
                  label="Código do banco"
                  placeholder="001"
                  className="mt-2"
                  noHintText
                  value={bankCode}
                  disabled
                />
                <MyTextInput
                  label="Agência"
                  placeholder="Digite sua agência"
                  className="mt-2"
                  value={bankAgency}
                  onChange={(e) =>
                    setStepData(4, { bankAgency: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-2 mt-4">
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
            <div className="my-2">
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
                placeholder="Digite sua chave pix"
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
        <MyButton
          className="w-full"
          variant="default"
          borderRadius="squared"
          size="lg"
          onClick={(e) => handleNextStep(e)}
        >
          Cadastrar Atividades
        </MyButton>
      </div>
    </section>
  );
}
