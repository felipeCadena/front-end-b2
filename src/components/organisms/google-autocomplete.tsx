"use client";

import { useState, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import MyTextInput from "../atoms/my-text-input";
import MyIcon from "../atoms/my-icon";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface AutocompleteInputProps {
  onLocationSelected: (location: Location) => void;
  isLoaded: boolean; // Adicionando verificação de carregamento
}

export default function AutocompleteInput({
  onLocationSelected,
  isLoaded,
}: AutocompleteInputProps) {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!isLoaded) return;
    if (typeof google === "undefined") {
      console.error("Google Maps API ainda não carregou.");
    }
  }, [isLoaded]);

  const onLoad = (auto: google.maps.places.Autocomplete) => {
    setAutocomplete(auto);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const locationData: Location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: place.formatted_address || "",
        };
        setInputValue(locationData.address);
        onLocationSelected(locationData);
      }
    }
  };

  if (!isLoaded) return <p>Carregando Google Maps...</p>;

  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <MyTextInput
        noHintText
        placeholder="Localização"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        className="placeholder:text-black"
        leftIcon={<MyIcon name="localizacao" className="ml-3" />}
      />
    </Autocomplete>
  );
}
