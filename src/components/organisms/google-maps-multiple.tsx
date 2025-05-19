"use client";

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useGoogleMaps } from "@/providers/google-provider";

type Props = {
  locations: { lat: number; lng: number }[];
  selectedIndex?: number;
};

export default function GoogleMapsMultiple({
  locations,
  selectedIndex,
}: Props) {
  const mapContainerStyle = {
    width: "100%",
    height: "22rem",
  };

  const mapRef = React.useRef<google.maps.Map | null>(null);
  // Centraliza no primeiro item do array (caso exista)
  const center = locations.length > 0 ? locations[1] : { lat: 0, lng: 0 };

  const { isLoaded } = useGoogleMaps();

  // Quando selectedIndex mudar, centraliza o mapa no local correspondente
  React.useEffect(() => {
    if (
      selectedIndex !== undefined &&
      mapRef.current &&
      locations[selectedIndex]
    ) {
      mapRef.current.panTo(locations[selectedIndex]);
    }
  }, [selectedIndex]);

  if (!isLoaded) return <p>Carregando mapa...</p>;
  return (
    <div className="rounded-xl overflow-hidden max-sm:mt-4">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={14}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        options={{
          disableDefaultUI: true, // Remove controles padrão para um design mais limpo
        }}
      >
        {locations.map((pos, index) => (
          <Marker key={index} position={pos} />
        ))}
      </GoogleMap>
    </div>
  );
}
