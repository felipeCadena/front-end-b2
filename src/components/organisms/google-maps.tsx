"use client";

import React, { useEffect, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import MyTypography from "../atoms/my-typography";
import { useGoogleMaps } from "@/providers/google-provider";

export default function GoogleMaps({
  location,
  height = "250px",
}: {
  location: { lat: number; lng: number };
  height?: string;
}) {
  const { isLoaded } = useGoogleMaps(); // Usa o contexto global
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );

  useEffect(() => {
    async function loadMarker() {
      if (isLoaded && mapRef.current) {
        // Importa corretamente a biblioteca de marcadores avançados
        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          "marker"
        )) as unknown as {
          AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement;
        };

        // Remove o marcador antigo, se existir
        if (markerRef.current) {
          markerRef.current.map = null;
        }

        // Cria um novo marcador
        markerRef.current = new AdvancedMarkerElement({
          position: location,
          map: mapRef.current,
        });
      }
    }

    loadMarker();
  }, [isLoaded, location]); // Agora o efeito roda sempre que `location` mudar!

  if (!isLoaded) return <p>Carregando mapa...</p>;

  return (
    <div className="rounded-xl overflow-hidden">
      <MyTypography variant="subtitle3" weight="bold" className="my-2">
        Mapa da Localização
      </MyTypography>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height }}
        center={location}
        zoom={17}
        options={{
          disableDefaultUI: true,
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
          keyboardShortcuts: false,
        }}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      />
    </div>
  );
}
