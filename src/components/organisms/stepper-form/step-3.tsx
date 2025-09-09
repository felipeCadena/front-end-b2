"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import { useStepperStore } from "@/store/useStepperStore";
import { formatCEP, formatCpfCnpj } from "@/utils/formatters";
import { getAddress } from "@/utils/getAddress";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

export default function Sobre({
  handleNext,
  handleBack,
}: {
  handleNext: () => void;
  handleBack: () => void;
}) {
  const {
    setStepData,
    fantasyName,
    cnpjOrCpf,
    addressPostalCode,
    addressStreet,
    addressNumber,
    addressNeighborhood,
    addressComplement,
    addressCity,
    addressState,
  } = useStepperStore();

  const handleNextStep = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      !fantasyName ||
      !cnpjOrCpf ||
      !addressPostalCode ||
      !addressStreet ||
      !addressNumber ||
      !addressNeighborhood ||
      !addressCity ||
      !addressState
    ) {
      toast.error("Todos os campos são obrigatórios!");
      return;
    }

    setStepData(3, {
      fantasyName,
      cnpjOrCpf,
      addressPostalCode,
      addressStreet,
      addressNumber,
      addressNeighborhood,
      addressCity,
      addressState,
      addressComplement,
    });

    handleNext();
  };

  useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const onBlurCep = async () => {
    if (!addressPostalCode) return;
    const cep = addressPostalCode.replace(/\D/g, "");
    if (cep?.length !== 8) return;

    const response = await getAddress(cep);

    if (response) {
      setStepData(3, {
        addressPostalCode: addressPostalCode,
        addressStreet: response.logradouro || "",
        addressNumber: response.numero || "",
        addressNeighborhood: response.bairro || "",
        addressComplement: "",
        addressCity: response.localidade || "",
        addressState: response.uf || "",
      });
    } else {
      setStepData(3, {
        addressPostalCode: addressPostalCode,
        addressStreet: addressStreet,
        addressNumber: addressNumber,
        addressNeighborhood: addressNeighborhood,
        addressComplement: addressComplement,
        addressCity: addressCity,
        addressState: addressState,
      });
      toast.error("CEP não encontrado. Preencha o endereço manualmente.");
    }
  };

  return (
    <>
      <section className="md:border-2 md:border-gray-200 md:rounded-xl md:p-12 md:my-4">
        <div className="space-y-2">
          <MyTypography variant="heading2" weight="bold">
            Agora nos conte um pouco sobre a sua empresas!
          </MyTypography>
          <MyTypography variant="subtitle3" weight="regular" lightness={400}>
            Só precisa preencher alguns dados antes.
          </MyTypography>
        </div>
        <div className="space-y-2 mt-4">
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
          {/* <MultiSelectLanguages
            state={{ languages: languages ?? [""] }}
            setState={setStepData}
            step={3}
          /> */}
        </div>
        <div className="space-y-2 mt-6">
          <MyTextInput
            label="CEP"
            classNameLabel="text-left"
            placeholder="Digite o CEP"
            className="mt-1"
            value={addressPostalCode}
            onChange={(e) =>
              setStepData(3, { addressPostalCode: formatCEP(e.target.value) })
            }
            onBlur={onBlurCep}
            noHintText
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MyTextInput
              label="Endereço"
              classNameLabel="text-left"
              placeholder="Digite seu endereço"
              className="mt-1"
              value={addressStreet}
              onChange={(e) => setStepData(3, { addressStreet: e.target.value })}
              noHintText
            />
            <MyTextInput
              label="Número"
              classNameLabel="text-left"
              placeholder="Digite o número"
              className="mt-1"
              value={addressNumber}
              onChange={(e) =>
                setStepData(3, { addressNumber: e.target.value })
              }
              noHintText
            />
            <MyTextInput
              label="Complemento"
              classNameLabel="text-left"
              placeholder="Digite o complemento"
              className="mt-1"
              value={addressComplement}
              onChange={(e) =>
                setStepData(3, { addressComplement: e.target.value })
              }
              noHintText
            />
            <MyTextInput
              label="Bairro"
              classNameLabel="text-left"
              placeholder="Digite o bairro"
              className="mt-1"
              value={addressNeighborhood}
              onChange={(e) =>
                setStepData(3, { addressNeighborhood: e.target.value })
              }
              noHintText
            />
            <MyTextInput
              label="Cidade"
              placeholder="Digite a cidade"
              classNameLabel="text-left"
              className="mt-1"
              value={addressCity}
              onChange={(e) => setStepData(3, { addressCity: e.target.value })}
              noHintText
            />
            <MyTextInput
              label="Estado"
              classNameLabel="text-left"
              placeholder="Digite o estado"
              className="mt-1"
              value={addressState}
              onChange={(e) => setStepData(3, { addressState: e.target.value })}
              noHintText
            />
          </div>
        </div>
      </section>
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
          onClick={(e) => handleNextStep(e)}
          rightIcon={<MyIcon name="seta-direita" />}
        >
          Próximo
        </MyButton>
      </div>
    </>
  );
}
