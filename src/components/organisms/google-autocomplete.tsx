import React, { useState } from "react";
import { autocomplete, getPlaceDetails } from "@/libs/google";
import { useDebounce } from "@/hooks/useDebounce";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useGoogleMaps } from "@/providers/google-provider";
import MyTextInput from "../atoms/my-text-input";
import MyIcon from "../atoms/my-icon";
import { useAdventureStore } from "@/store/useAdventureStore";
import { useEditAdventureStore } from "@/store/useEditAdventureStore";
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
export interface LocationData {
  address: string;
  completeAddress: AddressData;
  coordinates: {
    lat: number;
    lng: number;
  } | null;
}
function extractAddressComponents(data: any) {
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

  if (!data.address_components) {
    console.error("No address components found");
    toast.error("Endereço não encontrado. Preencha o endereço completo.");
    return address;
  }
  const components = data.address_components;

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
    if (comp.types.includes("country")) address.addressCountry = comp.long_name;
    if (comp.types.includes("postal_code"))
      address.addressPostalCode = comp.long_name;
  });

  return address;
}

export default function AutocompleteCombobox({
  title = "Digite um endereço",
  onLocationSelected,
  setFormData,
  formData,
  editAdventure = false,
}: {
  title?: string;
  onLocationSelected?: (location: LocationData) => void;
  setFormData: (formData: any) => void;
  formData: any;
  editAdventure?: boolean;
}) {
  const { isLoaded } = useGoogleMaps();
  const [searchBoxRef, setSearchBoxRef] =
    useState<google.maps.places.SearchBox | null>(null);

  // Garantir que o componente só renderize quando o Google Maps estiver carregado
  if (!isLoaded) return null;

  const handlePlaceSelect = async (place: google.maps.places.PlaceResult) => {
    if (!place.geometry || !place.geometry.location) return;

    const addressComponents = extractAddressComponents(place);
    const coordinates = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    // Atualizar o formulário
    // setFormData({
    //   ...formData,
    //   address: place.formatted_address,
    // });

    // Notificar o componente pai
    onLocationSelected?.({
      address: place.formatted_address || "",
      coordinates: coordinates,
      completeAddress: addressComponents,
    });
  };

  return (
    <div className="relative">
      <StandaloneSearchBox
        onLoad={(ref) => setSearchBoxRef(ref)}
        onPlacesChanged={() => {
          if (searchBoxRef) {
            const places = searchBoxRef.getPlaces();
            if (places && places.length > 0) {
              handlePlaceSelect(places[0]);
            }
          }
        }}
      >
        {!editAdventure ? (
          <MyTextInput
            type="text"
            placeholder={title}
            noHintText
            className="placeholder:text-gray-400"
            leftIcon={<MyIcon name="localizacao" className="ml-3" />}
            value={formData}
            onChange={(e) =>
              setFormData({
                address: e.target.value,
              })
            }
          />
        ) : (
          <MyTextInput
            type="text"
            placeholder={title}
            noHintText
            className="placeholder:text-gray-400"
            leftIcon={<MyIcon name="localizacao" className="ml-3" />}
            value={formData}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                address: e.target.value,
              }))
            }
          />
        )}
      </StandaloneSearchBox>
    </div>
  );
}
