"use client";

import React from "react";
import MyTypography from "@/components/atoms/my-typography";
import MyIcon from "@/components/atoms/my-icon";
import Image from "next/image";
import SearchInfoActivity from "@/components/organisms/search-with-info";
import MyButton from "@/components/atoms/my-button";

const FourthSection = () => {
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
    <section>
      <div className="max-sm:hidden space-y-1 my-4">
        <MyTypography variant="subtitle3" weight="bold">
          Sugestões de atividades perto de você!
        </MyTypography>
        <MyTypography variant="label" weight="regular" lightness={400}>
          Procure por passeios que fiquem onde você está
        </MyTypography>
      </div>
      <div className="flex flex-col items-center max-sm:space-y-4 md:flex-row md:gap-4 md:justify-between">
        <div className="max-sm:hidden w-1/3 h-full items-stretch border border-primary-900 rounded-lg">
          <SearchInfoActivity />
        </div>

        {/* List of Locations */}
        <div className="w-full max-sm:max-w-md space-y-3 md:bg-gray-500 md:flex md:gap-8 md:w-2/3 md:items-stretch md:rounded-lg md:h-full md:border md:border-primary-900">
          {/* Header */}
          <div className="max-sm:space-y-4 md:w-1/2 md:flex md:flex-col md:p-5 md:justify-evenly md:space-y-6">
            <div className="max-sm:bg-primary-900 max-sm:px-8 max-sm:py-2 max-sm:rounded-full max-sm:mt-6 max-sm:mb-2">
              <MyTypography
                variant="subtitle3"
                weight="bold"
                className="text-center"
              >
                Temos atividades perto de você!
              </MyTypography>
            </div>
            {locations.map((location, index) => (
              <div
                key={index}
                className="flex items-center md:justify-between p-3 bg-[#F1F0F587] border border-primary-600/30 md:border-black border-opacity-80 rounded-lg shadow-sm hover:bg-gray-100 relative"
              >
                <div className="absolute inset-y-0 left-0 w-3 md:w-16 bg-primary-900 rounded-l-lg">
                  <MyIcon
                    name="localizacaoRedonda"
                    className="absolute left-5 top-5 w-6 h-6 text-primary-900 max-sm:hidden"
                  />
                </div>
                <MyIcon
                  name="localizacaoRedonda"
                  className="w-6 h-6 text-primary-900 ml-3 md:hidden"
                />
                <div className="ml-3 md:ml-16 max-sm:text-nowrap">
                  <MyTypography
                    variant="body-big"
                    weight="regular"
                    className="text-center md:font-semibold"
                  >
                    {location.name} <span className="md:hidden">- {location?.city}</span>
                  </MyTypography>
                  <MyTypography
                    variant="body"
                    weight="regular"
                    lightness={400}
                    className="max-sm:hidden"
                  >
                    {location?.city}
                  </MyTypography>
                </div>
                <MyIcon name="seta" className="w-6 h-6 md:mr-3 max-sm:hidden" />
              </div>
            ))}
            <MyButton
              variant="default"
              borderRadius="squared"
              size="lg"
              className="w-full max-sm:hidden"
              leftIcon={<MyIcon name="localizao-branca" className="" />}
            >
              Onde quer se aventurar hoje?
            </MyButton>
          </div>

          <div className="max-sm:hidden sm:w-full h-full md:max-h-[410px]">
            <Image
              src="/images/mapa-inicial.png"
              alt="mapa"
              width={400}
              height={400}
              className="border border-gray rounded-xl md:max-h-[410px] "
            />
          </div>
        </div>

        {/* Map */}
        <div className="w-full max:sm:max-w-2xl md:hidden">
          <Image
            src="/images/mapa-inicial.png"
            alt="mapa"
            width={400}
            height={400}
            className="border border-[#F1F0F587] rounded-xl mt-2"
          />
        </div>
      </div>
    </section>
  );
};

export default FourthSection;
