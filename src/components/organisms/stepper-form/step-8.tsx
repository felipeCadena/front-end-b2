"use client";

import MyTextInput from "@/components/atoms/my-text-input";
import GoogleMaps from "@/components/organisms/google-maps";
import React from "react";

export default function Step8() {
  const locations = [
    {
      name: "Monte Cristo Redentor",
      city: "Rio de Janeiro",
      coords: { lat: -22.9519, lng: -43.2105 },
    },
    {
      name: "Praia de Copacabana",
      city: "Rio de Janeiro",
      coords: { lat: -22.9711, lng: -43.1822 },
    },
    {
      name: "Praia de Ipanema",
      city: "Rio de Janeiro",
      coords: { lat: -22.9839, lng: -43.2045 },
    },
  ];

  return (
    <section className="md:border-2 md:border-gray-200 md:rounded-xl md:p-16">
      <MyTextInput
        classNameLabel="text-base text-black"
        label="Local"
        placeholder="Rio de Janeiro, Cristo Redentor"
        className="mt-2"
      />

      <MyTextInput
        classNameLabel="text-base text-black"
        label="Ponto de referência"
        placeholder="Ao lado da Cinelândia"
        className="mt-2"
      />

      <GoogleMaps location={{ lat: -22.9519, lng: -43.2105 }} />
    </section>
  );
}
