"use client";

import React from "react";
import MyTypography from "@/components/atoms/my-typography";
import MyIcon from "@/components/atoms/my-icon";
import SearchInfoActivity from "@/components/organisms/search-with-info";
import MyButton from "@/components/atoms/my-button";
import GoogleMapsMultiple from "@/components/organisms/google-maps-multiple";
import { useQuery } from "@tanstack/react-query";
import { users } from "@/services/api/users";
import { adventures } from "@/services/api/adventures";

const FourthSection = () => {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const { data: userStateFromIp = "" } = useQuery({
    queryKey: ["user_state-from-ip"],
    queryFn: () => users.getStateFromIP(),
  });

  const { data: adventuresState = [] } = useQuery({
    queryKey: ["user_state-from-ip", userStateFromIp],
    queryFn: () =>
      adventures.filterAdventures({
        city: userStateFromIp ?? "",
        limit: 3,
        // orderBy: "createdAt desc",
      }),
    enabled: !!userStateFromIp,
  });

  const transformCoordinates = (
    coordinateString: string
  ): { lat: number; lng: number } => {
    const [lat, lng] = coordinateString.split(":").map(Number); // Divide e converte para número
    return { lat, lng };
  };

  const transformedCoordinates = adventuresState
    ?.map((coor) => coor.coordinates)
    .map(transformCoordinates);

  return (
    <section className="max-sm:px-4">
      <div className="max-sm:hidden space-y-1 my-4">
        <MyTypography variant="subtitle3" weight="bold">
          Sugestões de atividades perto de você!
        </MyTypography>
        <MyTypography variant="label" weight="regular" lightness={400}>
          Procure pelos passeios mais próximos a você
        </MyTypography>
      </div>
      <div className="flex flex-col max-sm:space-y-4 md:flex-row md:gap-4 md:justify-between items-stretch">
        <div className="max-sm:hidden w-1/3 md:max-h-[30rem] md:bg-gray-500 border border-primary-900 rounded-lg">
          <SearchInfoActivity />
        </div>

        {/* List of Locations */}
        <div className="w-full max-sm:max-w-md md:max-h-[30rem]  space-y-3 md:bg-gray-500 md:flex md:p-6 md:w-2/3 md:items-center md:gap-4 md:rounded-lg md:h-full md:border md:border-primary-900">
          {/* Header */}
          <div className="max-sm:space-y-4 md:w-1/2 md:flex md:flex-col md:p-4 md:justify-evenly space-y-4">
            <div className="max-sm:bg-primary-900 max-sm:px-8 max-sm:py-2 max-sm:rounded-full max-sm:mt-6 max-sm:mb-2">
              <MyTypography
                variant="subtitle4"
                weight="bold"
                className="text-center"
              >
                Atividades mais próximas de você
              </MyTypography>
            </div>
            {adventuresState &&
              adventuresState?.length > 0 &&
              adventuresState?.map((location, index) => (
                <div
                  key={index}
                  className="flex items-center md:gap-8 md:justify-between p-2 bg-gray-500 border border-primary-600/30 md:border-black border-opacity-80 rounded-lg shadow-sm hover:bg-gray-100 relative"
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
                  <div
                    className="ml-3 md:ml-16 text-nowrap cursor-pointer"
                    onClick={() => setSelectedIndex(index)}
                  >
                    <MyTypography
                      variant="body-big"
                      weight="regular"
                      className="md:font-semibold text-wrap capitalize"
                    >
                      {location?.title?.length > 40
                        ? location?.title
                            .toLowerCase()
                            .slice(0, 40)
                            .concat("...")
                        : location?.title.toLowerCase()}
                      <span className="md:hidden">
                        - {location?.addressState}
                      </span>
                    </MyTypography>
                    <MyTypography
                      variant="body"
                      weight="regular"
                      lightness={400}
                      className="max-sm:hidden"
                    >
                      {location?.addressCity}
                    </MyTypography>
                  </div>
                </div>
              ))}
            <MyButton
              variant="text"
              borderRadius="squared"
              size="lg"
              className="w-full max-sm:hidden cursor-default"
              leftIcon={<MyIcon name="localizacao" className="" />}
            >
              Onde você quer se aventurar hoje?
            </MyButton>
          </div>

          <div className="max-sm:hidden w-full md:h-full md:flex-1">
            <GoogleMapsMultiple
              locations={transformedCoordinates}
              selectedIndex={selectedIndex ?? 0}
            />
          </div>
        </div>

        {/* Map */}
        <div className="w-full md:hidden">
          <GoogleMapsMultiple
            locations={transformedCoordinates}
            selectedIndex={selectedIndex ?? 0}
          />
        </div>
      </div>
    </section>
  );
};

export default FourthSection;
