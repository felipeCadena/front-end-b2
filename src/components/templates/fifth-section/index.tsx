"use client";

import React from "react";
import MyTypography from "@/components/atoms/my-typography";
import MyIcon from "@/components/atoms/my-icon";
import GoogleMaps from "@/components/organisms/google-maps";
import Image from "next/image";

const FifithSection = () => {
  const locations = [
    {
      name: "Monte Cristo Redentor - Rio de Janeiro",
      coords: { lat: -22.9519, lng: -43.2105 },
    },
    {
      name: "Praia de Copacabana - Rio de Janeiro",
      coords: { lat: -22.9711, lng: -43.1822 },
    },
    {
      name: "Praia de Ipanema - Rio de Janeiro",
      coords: { lat: -22.9839, lng: -43.2045 },
    },
  ];

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Header */}
      <div className="bg-primary-900 px-8 py-2 rounded-full mt-6 mb-2">
        <MyTypography variant="subtitle3" weight="bold" className="text-center">
          Temos atividades perto de você!
        </MyTypography>
      </div>

      {/* List of Locations */}
      <div className="w-full max-w-md space-y-3">
        {locations.map((location, index) => (
          <div
            key={index}
            className="flex items-center p-3 bg-[#F1F0F587] border border-primary-600/30 border-opacity-80 rounded-lg shadow-sm hover:bg-gray-100 relative"
          >
            <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>
            <MyIcon
              name="localizacaoRedonda"
              className="w-6 h-6 text-primary-900 ml-3"
            />
            <div className="ml-3">
              <MyTypography
                variant="body-big"
                weight="regular"
                className="text-center"
              >
                {location.name}
              </MyTypography>
            </div>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="w-full max-w-2xl">
        <Image
          src="/images/mapa-inicial.png"
          alt="mapa"
          width={400}
          height={400}
          className="border border-[#F1F0F587] rounded-xl mt-2"
        />
        {/* <GoogleMaps locations={locations} /> */}
      </div>
    </div>
  );
};

export default FifithSection;
