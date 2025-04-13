"use client";

import MyButton from "@/components/atoms/my-button";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import { ModalProps } from "@/components/organisms/edit-modal";
import AutocompleteCombobox from "@/components/organisms/google-autocomplete";
import GoogleMaps from "@/components/organisms/google-maps";
import { formatAddress } from "@/utils/formatters";
import React, { useEffect } from "react";

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

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="">
            <MyTypography variant="subtitle4" weight="bold" className="mb-2">
              Local
            </MyTypography>
            <AutocompleteCombobox
              onLocationSelected={handleLocationSelected}
              formData={formData}
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

      <div className="flex justify-end gap-2">
        <MyButton
          borderRadius="squared"
          size="lg"
          variant="outline-neutral"
          className="max-sm:w-full"
          onClick={onClose}
          //   disabled={isLoading}
        >
          Cancelar
        </MyButton>
        <MyButton
          type="submit"
          borderRadius="squared"
          size="lg"
          className="max-sm:w-full"
          //   onClick={handleSubmit}
          //   isLoading={isLoading}
        >
          Salvar
        </MyButton>
      </div>
    </section>
  );
}
