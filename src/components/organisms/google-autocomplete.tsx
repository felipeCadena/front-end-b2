import React, { useState } from "react";
import { autocomplete, getPlaceDetails } from "@/libs/google";
import { useDebounce } from "@/hooks/useDebounce";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useGoogleMaps } from "@/providers/google-provider";

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
  onLocationSelected,
}: {
  icon?: boolean;
  className?: string;
  onLocationSelected?: (location: LocationData) => void;
}) {
  const { isLoaded } = useGoogleMaps();
  const [predictions, setPredictions] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const debouncedInput = useDebounce(input, 500);

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

  React.useEffect(() => {
    if (debouncedInput) {
      const fetchPredictions = async () => {
        const results = await autocomplete(debouncedInput);

        if (results) {
          setPredictions(results ?? []);
          setOpen(results.length > 0);
        }
      };
      fetchPredictions();
    } else {
      setPredictions([]);
      setOpen(false);
    }
  }, [debouncedInput]);

  const handlePlaceSelect = async (prediction: any) => {
    setInput(prediction.formatted_address);
    setOpen(false);

    const coordinates = await getPlaceDetails(prediction.place_id);
    const addressComponents = extractAddressComponents(prediction);

    onLocationSelected?.({
      address: prediction.formatted_address,
      coordinates: coordinates,
      completeAddress: addressComponents,
    });
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
          <input
            type="text"
            placeholder="Digite um endereço"
            className="w-full h-12 px-4 border border-gray-300 rounded"
          />
        </StandaloneSearchBox>
      )}
    </div>
  );
}
