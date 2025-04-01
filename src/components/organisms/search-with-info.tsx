"use client";
import React from "react";
import MyTextInput from "../atoms/my-text-input";
import MyIcon from "../atoms/my-icon";
import MyButton from "../atoms/my-button";
import PeopleSelector from "./people-selector";
import { MyDatePicker } from "../molecules/my-date-picker";
import MyTypography from "../atoms/my-typography";
import TimePickerModal from "../molecules/time-picker";
import { OneDay } from "../molecules/one-day";
import { useLoadScript } from "@react-google-maps/api";
import GoogleMapsAutocomplete from "@/components/organisms/google-autocomplete";

const libraries: "places"[] = ["places"];

export default function SearchInfoActivity() {
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  //

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API || "",
    libraries,
  });

  const handleLocationSelected = (location: any) => {
    console.log("Localização escolhida:", location);
    setSelectedLocation(location);
  };

  return (
    <section className="space-y-4 max-sm:mt-4 md:space-y-6 md:bg-gray-500 md:p-10 md:rounded-lg">
      <div className="md:hidden">
        <MyTypography variant="heading3" weight="semibold">
          Sugestões de atividades perto de você!
        </MyTypography>
        <MyTypography
          variant="label"
          weight="regular"
          lightness={400}
          className="mt-1"
        >
          Procure por passeios que fiquem onde você está
        </MyTypography>
      </div>
      <div className="mx-auto space-y-5 p-4 max-sm:border max-sm:border-gray-300 rounded-lg">
        <div className="max-sm:mt-4">
          {/* <MyTextInput
            noHintText
            placeholder="Localização"
            className="placeholder:text-black"
            leftIcon={<MyIcon name="localizacao" className="ml-3" />}
          /> */}

          <GoogleMapsAutocomplete
            onLocationSelected={handleLocationSelected}
            isLoaded={isLoaded}
          />
        </div>

        <OneDay />

        <TimePickerModal />

        <PeopleSelector />
      </div>

      <MyButton
        variant="default"
        borderRadius="squared"
        size="lg"
        className="w-full"
      >
        Procurar atividades
      </MyButton>
    </section>
  );
}
