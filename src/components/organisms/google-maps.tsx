"use client";

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import MyTypography from "../atoms/my-typography";

export default function GoogleMaps({ location }: { location: { lat: number; lng: number } }) {
  const mapContainerStyle = {
    width: "100%",
    height: "250px",
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!}>
      <div className="rounded-xl overflow-hidden">
      <MyTypography variant="subtitle3" weight="bold" className="my-2">
        Mapa da Localização 
      </MyTypography>
      <GoogleMap 
      mapContainerStyle={mapContainerStyle} 
      center={location} 
      zoom={17}
      options={{
        // mapTypeControl: false, // Desativa a opção "Mapa / Satélite"
        // fullscreenControl: false, // (Opcional) Remove o botão de tela cheia
        // streetViewControl: false, // (Opcional) Remove o boneco do Street View
        disableDefaultUI: true, // (Opcional) Remove todos os controles padrão
      }}
      >
        {<Marker position={location} />}
      </GoogleMap>
        </div>
    </LoadScript>
  );
}
