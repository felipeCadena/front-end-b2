"use client";

import React, { useEffect } from "react";
import {
    MySelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/atoms/my-select";
import MyTextInput from "@/components/atoms/my-text-input";
import { adventures } from "@/services/api/adventures";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MyButton from "@/components/atoms/my-button";
import { ModalProps } from "@/components/organisms/edit-activity";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import { cn } from "@/utils/cn";
import { partnerService } from "@/services/api/partner";
import { useSession } from "next-auth/react";
import { brlToApiNumberString } from "@/utils/formatters";
import ModalAlert from "@/components/molecules/modal-alert";
import { calculateAdventurePrice } from "@/app/helpers/calculateAdventurePrice";
import { formatCurrency } from "@/app/helpers/utils";

export default function Pricing({
    formData,
    setFormData,
    onClose,
    isApproved,
}: ModalProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [showWarning, setShowWarning] = React.useState(false);
    const { data: session } = useSession();

    const { data: partner } = useQuery({
        queryKey: ["partner-tag"],
        queryFn: () => partnerService.getPartnerLogged(),
        enabled: !!session?.user,
    });

    const queryClient = useQueryClient();

    const handleSubmit = async () => {
        // Validações de preço - usar adultPartnerValue ou fallback para priceAdult
        const priceAdultValue = brlToApiNumberString(formData?.adultPartnerValue ?? formData?.priceAdult);
        const priceChildrenValue = brlToApiNumberString(formData?.childrenPartnerValue ?? formData?.priceChildren);

        if (!priceAdultValue || Number(priceAdultValue) <= 0) {
            toast.error("O preço por adulto deve ser maior que zero.");
            return;
        }

        if (formData?.isChildrenAllowed) {
            if (!priceChildrenValue || Number(priceChildrenValue) <= 0) {
                toast.error("O preço por criança deve ser maior que zero quando crianças são permitidas.");
                return;
            }
        }

        if (isApproved && !showWarning) {
            setShowWarning(true);
            return;
        }

        setIsLoading(true);

        const data = {
            isInGroup: formData?.isInGroup,
            isChildrenAllowed: formData?.isChildrenAllowed,
            personsLimit: formData?.personsLimit,
            priceAdult: priceAdultValue, // Envia adultPartnerValue como priceAdult
            priceChildren: priceChildrenValue, // Envia childrenPartnerValue como priceChildren
        };

        try {
            await adventures.updateAdventureById(formData?.id, data);

            queryClient.invalidateQueries({ queryKey: ["activity"] });
            toast.success(
                isApproved
                    ? "Alterações enviadas para aprovação!"
                    : "Atividade atualizada com sucesso!"
            );
            setShowWarning(false);
            onClose();
        } catch (error) {
            toast.error("Erro ao atualizar atividade");
            console.error("Error updating adventure:", error);
        }
        setIsLoading(false);
    };

    const [pricesAdult, setPricesAdult] = React.useState(
        calculateAdventurePrice(formData?.adultPartnerValue ?? formData?.priceAdult)
    );
    const [pricesChildren, setPricesChildren] = React.useState(
        (formData?.childrenPartnerValue ?? formData?.priceChildren)
            ? calculateAdventurePrice(formData?.childrenPartnerValue ?? formData?.priceChildren)
            : null
    );

    useEffect(() => {
        const adultValue = formData?.adultPartnerValue ?? formData?.priceAdult;
        const childrenValue = formData?.childrenPartnerValue ?? formData?.priceChildren;
        
        setPricesAdult(calculateAdventurePrice(adultValue));
        if (childrenValue) {
            setPricesChildren(calculateAdventurePrice(childrenValue));
        }
    }, [formData?.adultPartnerValue, formData?.priceAdult, formData?.childrenPartnerValue, formData?.priceChildren]);

    return (
        <section>
            <ModalAlert
                open={showWarning}
                onClose={() => setShowWarning(false)}
                onAction={handleSubmit}
                iconName="warning"
                title="Alteração em atividade aprovada"
                descrition="Esta atividade já está aprovada e online. As alterações que você fizer precisarão ser validadas pelo administrador da B2 Adventure antes de serem publicadas no site."
                button="Continuar"
                isLoading={isLoading}
            />

            <div className="flex gap-4 items-center mb-8">
                <MyIcon
                    name="voltar-black"
                    className="-ml-2"
                    onClick={onClose}
                />
                <MyTypography variant="subtitle1" weight="bold" className="">
                    Editar Valores
                </MyTypography>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                <MySelect
                    label="Atividade em grupo"
                    className="text-base text-black"
                    value={formData?.isInGroup ? "true" : "false"}
                    onValueChange={(value) =>
                        setFormData({
                            ...formData,
                            isInGroup: value == "true",
                        })
                    }
                >
                    <SelectTrigger className="py-6 ">
                        <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem key="Em grupo" value="true">
                            Em grupo
                        </SelectItem>
                        <SelectItem key="Individual" value="false">
                            Individual
                        </SelectItem>
                    </SelectContent>
                </MySelect>

                <MySelect
                    label="Permite Crianças"
                    className="text-base text-black"
                    value={formData?.isChildrenAllowed ? "true" : "false"}
                    onValueChange={(value) =>
                        setFormData({
                            ...formData,
                            isChildrenAllowed: value == "true",
                        })
                    }
                >
                    <SelectTrigger className="py-6">
                        <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem key="Com crianças" value="true">
                            Com crianças
                        </SelectItem>
                        <SelectItem key="Sem crianças" value="false">
                            Sem crianças
                        </SelectItem>
                    </SelectContent>
                </MySelect>

                <MyTextInput
                    label="Quantidade de pessoas"
                    placeholder="Digite a quantidade de pessoas"
                    classNameLabel="font-bold text-black text-base"
                    noHintText
                    className="mt-1"
                    value={formData?.personsLimit}
                    onChange={(e) =>
                        setFormData({
                            ...formData,

                            personsLimit: formData?.isInGroup
                                ? Number(e.target.value)
                                : 1,
                        })
                    }
                />

                <MyTextInput
                    label="Valor por adulto"
                    placeholder="R$ 200"
                    className="mt-1"
                    classNameLabel="font-bold text-black text-base"
                    noHintText
                    value={formData?.adultPartnerValue ?? formData?.priceAdult}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            adultPartnerValue: formatCurrency(e.target.value),
                        })
                    }
                />

                {formData?.isChildrenAllowed && (
                    <MyTextInput
                        label="Valor por criança"
                        placeholder="R$ 100"
                        className="mt-1"
                        classNameLabel="font-bold text-black text-base"
                        noHintText
                        value={formData?.childrenPartnerValue ?? formData?.priceChildren}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                childrenPartnerValue: formatCurrency(e.target.value),
                            })
                        }
                    />
                )}
            </div>

            <div className="flex flex-col my-8">
                <div className="flex justify-between mt-4">
                    <MyTypography
                        variant="subtitle3"
                        weight="bold"
                        className="mb-1"
                    >
                        Valor do Parceiro
                    </MyTypography>
                    <MyTypography
                        variant="subtitle3"
                        weight="bold"
                        className="mb-1"
                    >
                        R$ {formData?.adultPartnerValue ?? formData?.priceAdult ?? "0,00"}
                    </MyTypography>
                </div>

                <div className="flex justify-between">
                    <MyTypography
                        variant="label"
                        weight="regular"
                        className={cn("mb-1")}
                    >
                        Tarifa B2
                    </MyTypography>
                    <MyTypography
                        variant="label"
                        weight="regular"
                        className={cn("mb-1")}
                    >
                        R$ {formatCurrency(String(pricesAdult.b2Fee)) ?? "0,00"}
                        {/* <span className="text-xs text-gray-400">
                            {" "}
                            ({pricesAdult.b2FeePercentage ?? "0"}%)
                        </span> */}
                    </MyTypography>
                </div>

                <div className="flex justify-between">
                    <MyTypography
                        variant="label"
                        weight="regular"
                        className={cn("mb-1")}
                    >
                        Imposto
                    </MyTypography>
                    <MyTypography
                        variant="label"
                        weight="regular"
                        className={cn("mb-1")}
                    >
                        R$ {formatCurrency(String(pricesAdult.tax)) ?? "0,00"}
                    </MyTypography>
                </div>

                <div className="flex justify-between mt-1">
                    <MyTypography
                        variant="subtitle3"
                        weight="bold"
                        className="text-primary-600"
                    >
                        Valor total da Atividade
                    </MyTypography>
                    <MyTypography
                        variant="subtitle3"
                        weight="bold"
                        className="text-primary-600"
                    >
                        R$ {formatCurrency(String(pricesAdult.totalCliente)) ?? "0,00"}
                    </MyTypography>
                </div>

                <MyTypography
                    variant="button"
                    weight="regular"
                    lightness={500}
                    className="my-2"
                >
                    * Baseado no valor unitário adulto
                </MyTypography>
            </div>

            <div className="md:w-1/2 md:mx-auto mt-12 ">
                <MyButton
                    type="submit"
                    borderRadius="squared"
                    size="lg"
                    className="w-full"
                    onClick={handleSubmit}
                    isLoading={isLoading}
                >
                    Salvar
                </MyButton>
            </div>
        </section>
    );
}
