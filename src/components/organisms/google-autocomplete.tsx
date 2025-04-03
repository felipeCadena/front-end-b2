import React, { useState, useEffect } from "react";
import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../atoms/my-command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/my-popover";
import Button from "../atoms/my-button";
import { autocomplete, getPlaceDetails } from "@/libs/google";
import { useDebounce } from "@/hooks/useDebounce";
import MyIcon from "../atoms/my-icon";
import { cn } from "@/utils/cn";
import { StandaloneSearchBox, useLoadScript } from "@react-google-maps/api";
import MyTextInput from "../atoms/my-text-input";

interface LocationData {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  } | null;
}

export default function AutocompleteCombobox({
  icon = true,
  className,
  onLocationSelected,
}: {
  icon?: boolean;
  className?: string;
  onLocationSelected?: (location: LocationData) => void;
}) {
  const [predictions, setPredictions] = useState<PlaceAutocompleteResult[]>([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const debouncedInput = useDebounce(input, 500);

  // useEffect(() => {
  //   if (debouncedInput) {
  //     const fetchPredictions = async () => {
  //       const results = await autocomplete(debouncedInput);

  //       if (results) {
  //         console.log(results);
  //         setPredictions(results ?? []);
  //         setOpen(results.length > 0);
  //       }
  //     };
  //     fetchPredictions();
  //   } else {
  //     setPredictions([]);
  //     setOpen(false);
  //   }
  // }, [debouncedInput]);

  const handlePlaceSelect = async (prediction: PlaceAutocompleteResult) => {
    setInput(prediction.description);
    setOpen(false);

    const coordinates = await getPlaceDetails(prediction.place_id);

    onLocationSelected?.({
      address: prediction.description,
      coordinates: coordinates,
    });
  };

  const inputref = React.useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!,
    libraries: ["places"],
  });

  return (
    // <Popover open={open} onOpenChange={setOpen}>
    //   <PopoverTrigger asChild>
    //     <Button
    //       variant="input"
    //       role="combobox"
    //       borderRadius="squared"
    //       aria-expanded={open}
    //       className={cn(
    //         "w-full py-6 border-gray-300 text-sm justify-start",
    //         className
    //       )}
    //       leftIcon={icon && <MyIcon name="localizacao" />}
    //     >
    //       {(input && input.slice(0, 25).concat("...")) || "Digite um endereço"}
    //     </Button>
    //   </PopoverTrigger>
    //   <PopoverContent className=" p-0">
    //     <Command className="">
    //       <CommandInput
    //         placeholder="Digite um endereço"
    //         value={input}
    //         onValueChange={setInput}
    //         className="p-2 w-full border rounded bg-white"
    //       />
    //       <CommandList className="bg-white max-h-60 overflow-y-auto">
    //         {predictions.length === 0 ? (
    //           <CommandEmpty>Iniciando a busca...</CommandEmpty>
    //         ) : (
    //           <CommandGroup>
    //             {predictions.map((prediction) => (
    //               <CommandItem
    //                 key={prediction.place_id}
    //                 onSelect={() => {
    //                   setInput(prediction.description);
    //                   setOpen(false);
    //                   handlePlaceSelect(prediction);
    //                 }}
    //                 className="hover:bg-primary-500"
    //               >
    //                 {prediction.description}
    //               </CommandItem>
    //             ))}
    //           </CommandGroup>
    //         )}
    //       </CommandList>
    //     </Command>
    //   </PopoverContent>
    // </Popover>
    <div>
      {isLoaded && (
        <StandaloneSearchBox
          onLoad={(ref) => (inputref.current = ref)}
          onPlacesChanged={() => {
            if (inputref.current) {
              const places = inputref.current.getPlaces();
              console.log(places);
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
