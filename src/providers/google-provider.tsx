"use client";

import React, { createContext, useContext } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const libraries: ("places" | "marker")[] = ["places", "marker"];

const GoogleMapsContext = createContext<{ isLoaded: boolean }>({
  isLoaded: false,
});

export function GoogleMapsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!,
    libraries,
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  );
}

export function useGoogleMaps() {
  return useContext(GoogleMapsContext);
}
