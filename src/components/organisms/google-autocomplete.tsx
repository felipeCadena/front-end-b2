import React, { useState } from "react";
import { autocomplete, getPlaceDetails } from "@/libs/google";
import { useDebounce } from "@/hooks/useDebounce";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useGoogleMaps } from "@/providers/google-provider";
import MyTextInput from "../atoms/my-text-input";
import MyIcon from "../atoms/my-icon";
import { useAdventureStore } from "@/store/useAdventureStore";
import { useEditAdventureStore } from "@/store/useEditAdventureStore";

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

export default function AutocompleteCombobox({
  edit,
  onLocationSelected,
}: {
  edit?: boolean;
  onLocationSelected?: (location: LocationData) => void;
}) {
  const { isLoaded } = useGoogleMaps();
  const { address, setAdventureData } = useAdventureStore();
  const { addressEdit, setEditData } = useEditAdventureStore();

  function extractAddressComponents(data: any) {
    const components = data.address_components;
    const address: AddressData = {
      addressStreet: "",
      addressPostalCode: "",
      addressNumber: "",
      addressComplement: "",
      addressNeighborhood: "",
      addressCity: "",
      addressState: "",
      addressCountry: "",
    };

    components.forEach((comp: any) => {
      if (comp.types.includes("street_number"))
        address.addressNumber = comp.long_name;
      if (comp.types.includes("route")) address.addressStreet = comp.long_name;
      if (comp.types.includes("sublocality"))
        address.addressNeighborhood = comp.long_name;
      if (comp.types.includes("administrative_area_level_2"))
        address.addressCity = comp.long_name;
      if (comp.types.includes("administrative_area_level_1"))
        address.addressState = comp.short_name;
      if (comp.types.includes("country"))
        address.addressCountry = comp.long_name;
      if (comp.types.includes("postal_code"))
        address.addressPostalCode = comp.long_name;
    });

    return address;
  }

  const handlePlaceSelect = async (prediction: any) => {
    const addressComponents = extractAddressComponents(prediction);
    const formattedAddress = prediction.formatted_address;

    const { lat, lng } = prediction.geometry?.location;
    const coordinates = { lat: lat(), lng: lng() };

    if (edit) {
      setEditData({
        addressEdit: formattedAddress,
      });

      onLocationSelected?.({
        address: prediction.formatted_address,
        coordinates: coordinates,
        completeAddress: addressComponents,
      });
    } else {
      setAdventureData({
        address: formattedAddress,
      });

      onLocationSelected?.({
        address: prediction.formatted_address,
        coordinates: coordinates,
        completeAddress: addressComponents,
      });
    }
  };

  const inputref = React.useRef<google.maps.places.SearchBox | null>(null);
  return (
    <div>
      {isLoaded && (
        <StandaloneSearchBox
          onLoad={(ref) => (inputref.current = ref)}
          onPlacesChanged={() => {
            if (inputref.current) {
              const places = inputref.current.getPlaces();
              if (places) {
                handlePlaceSelect(places[0] as any);
              }
            }
          }}
        >
          {edit ? (
            <MyTextInput
              type="text"
              placeholder="Digite um endereço"
              noHintText
              leftIcon={<MyIcon name="localizacao" />}
              value={addressEdit} // Exibe o endereço salvo
              onChange={(e) => setEditData({ addressEdit: e.target.value })}
            />
          ) : (
            <MyTextInput
              type="text"
              placeholder="Digite um endereço"
              noHintText
              leftIcon={<MyIcon name="localizacao" />}
              value={address} // Exibe o endereço salvo
              onChange={(e) => setAdventureData({ address: e.target.value })}
            />
          )}
        </StandaloneSearchBox>
      )}
    </div>
  );
}
