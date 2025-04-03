import { useLoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import React, { useRef } from "react";

export default function GoogleTeste() {
  const inputref = useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!,
    libraries: ["places"],
  });

  return (
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
            placeholder="Search a place"
            className="w-full h-10 px-4 border border-gray-300 rounded"
          />
        </StandaloneSearchBox>
      )}
    </div>
  );
}
