"use client";

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import MyTypography from "../atoms/my-typography";

export default function GoogleMapsMultiple({ locations }: { locations: { lat: number; lng: number }[] }) {
  const mapContainerStyle = {
    width: "100%",
    height: "380px",
  };

  // Centraliza no primeiro item do array (caso exista)
  const center = locations.length > 0 ? locations[1] : { lat: 0, lng: 0 };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!}>
      <div className="rounded-xl overflow-hidden">
        <GoogleMap 
          mapContainerStyle={mapContainerStyle} 
          center={center} 
          zoom={12}
          options={{
            disableDefaultUI: true, // Remove controles padrão para um design mais limpo
          }}
        >
          {locations.map((pos, index) => (
            <Marker key={index} position={pos} />
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}
