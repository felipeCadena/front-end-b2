"use client";

import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import GoogleMaps from "@/components/organisms/google-maps";
import React from "react";
import AutocompleteCombobox from "../google-autocomplete";
import { useAdventureStore } from "@/store/useAdventureStore";

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

export default function Step4() {
  const { setAdventureData, pointRefAddress, coordinates, address } =
    useAdventureStore();

  const formData = {
    address,
  };

  const handleLocationSelected = (locationData: LocationData) => {
    console.log("Location Data Received:", locationData);

    if (locationData.coordinates) {
      // Atualiza o store com o endereço
      setAdventureData({
        address: locationData.address,
        addressStreet: locationData.completeAddress.addressStreet,
        coordinates: {
          lat: locationData.coordinates.lat,
          lng: locationData.coordinates.lng,
        },
        addressPostalCode: locationData.completeAddress.addressPostalCode,
        addressNumber: locationData.completeAddress.addressNumber,
        addressNeighborhood: locationData.completeAddress.addressNeighborhood,
        addressCity: locationData.completeAddress.addressCity,
        addressState: locationData.completeAddress.addressState,
      });
    }
  };

  return (
    <section className="space-y-4">
      <div className="">
        <MyTypography variant="subtitle4" weight="bold" className="mb-2">
          Local
        </MyTypography>
        <AutocompleteCombobox
          formData={formData}
          setFormData={setAdventureData}
          onLocationSelected={handleLocationSelected}
        />
      </div>
      <MyTextInput
        label="Ponto de referência"
        placeholder="Próximo ao centro"
        classNameLabel="text-base text-black"
        className="mt-2"
        onChange={(e) =>
          setAdventureData({
            pointRefAddress: e.target.value,
          })
        }
        value={pointRefAddress}
      />

      <GoogleMaps
        location={{
          lat: coordinates?.lat ?? -22.9519,
          lng: coordinates?.lng ?? -43.2105,
        }}
      />
    </section>
  );
}
