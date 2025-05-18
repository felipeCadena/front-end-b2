"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import { ModalProps } from "@/components/organisms/edit-activity";
import AutocompleteCombobox from "@/components/organisms/google-autocomplete";
import GoogleMaps from "@/components/organisms/google-maps";
import { adventures } from "@/services/api/adventures";
import { formatAddress } from "@/utils/formatters";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

interface AddressData {
  addressStreet: string;
  addressPostalCode: string;
  addressNumber: string;
  addressComplement: string;
  addressNeighborhood: string;
  addressCity: string;
  addressState: string;
  addressCountry: string;
}

interface LocationData {
  address: string;
  completeAddress: AddressData;
  coordinates: {
    lat: number;
    lng: number;
  } | null;
}

export default function Location({
  formData,
  setFormData,
  onClose,
}: ModalProps) {
  const [formattedCoordinates, setFormattedCoordinates] = React.useState({
    lat: formData.coordinates?.lat ?? -22.9519,
    lng: formData.coordinates?.lng ?? 43.2105,
  });
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLocationSelected = (locationData: LocationData) => {
    console.log("Location Data Received:", locationData);

    if (locationData.coordinates) {
      setFormData({
        ...formData,
        address: locationData.address,
        addressStreet: locationData.completeAddress.addressStreet,
        coordinates: `${locationData.coordinates.lat}:${locationData.coordinates.lng}`,
        addressPostalCode: locationData.completeAddress.addressPostalCode,
        addressNumber: locationData.completeAddress.addressNumber,
        addressNeighborhood: locationData.completeAddress.addressNeighborhood,
        addressCity: locationData.completeAddress.addressCity,
        addressState: locationData.completeAddress.addressState,
      });

      setFormattedCoordinates({
        ...formattedCoordinates,
        lat: locationData.coordinates?.lat,
        lng: locationData.coordinates?.lng,
      });
    }
  };

  const handleSubmit = async () => {
    const data = {
      addressStreet: formData.addressStreet,
      coordinates: `${formattedCoordinates?.lat}:${formattedCoordinates?.lng}`,
      addressPostalCode: formData.addressPostalCode,
      addressNumber: formData.addressNumber,
      addressNeighborhood: formData.addressNeighborhood,
      addressCity: formData.addressCity,
      addressState: formData.addressState,
      addressCountry: formData.addressCountry,
      pointRefAddress: formData.pointRefAddress,
    };

    setIsLoading(true);

    try {
      await adventures.updateAdventureById(formData.id, data);

      queryClient.invalidateQueries({ queryKey: ["activity"] });
      toast.success("Atividade atualizada com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar atividade");
      console.error("Error updating adventure:", error);
    }
    setIsLoading(false);
    onClose();

    console.log("Form Data Updated:", data);
  };

  return (
    <section className="space-y-12">
      <div className="flex gap-4 items-center mb-8">
        <MyIcon name="voltar-black" className="-ml-2" onClick={onClose} />
        <MyTypography variant="subtitle1" weight="bold" className="">
          Editar Localização
        </MyTypography>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <div className="">
            <MyTypography variant="subtitle4" weight="bold" className="mb-2">
              Local
            </MyTypography>
            <AutocompleteCombobox
              onLocationSelected={handleLocationSelected}
              formData={formData?.address}
              setFormData={setFormData}
            />
          </div>
          <MyTextInput
            label="Ponto de referência"
            placeholder="Próximo ao centro"
            classNameLabel="text-base text-black"
            className="mt-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                pointRefAddress: e.target.value,
              })
            }
            value={formData.pointRefAddress}
          />
        </div>
        <GoogleMaps
          location={{
            lat: formattedCoordinates.lat ?? -22.9519,
            lng: formattedCoordinates.lng ?? 43.2105,
          }}
          height="400px"
        />
      </div>

      <div className="md:w-1/2 md:mx-auto">
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
