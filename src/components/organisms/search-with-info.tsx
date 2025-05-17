"use client";
import React from "react";
import MyButton from "../atoms/my-button";
import MyTypography from "../atoms/my-typography";
import TimePickerModal from "../molecules/time-picker";
import { OneDay } from "../molecules/one-day";
import GoogleAutoComplete, { LocationData } from "./google-autocomplete";
import PublicPeopleSelector from "./public-people-selector";
import { hours } from "@/common/constants/constants";
import { useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import { toast } from "react-toastify";
import useSearchQueryService from "@/services/use-search-query-service";
import TimePickerOptional from "../molecules/time-optional-picker";

export default function SearchInfoActivity() {
  const { set } = useSearchQueryService();

  const [selectedLocation, setSelectedLocation] =
    React.useState<LocationData | null>(null);
  const [hour, setHour] = React.useState("");
  const [date, setDate] = React.useState<Date>();

  const [adults, setAdults] = React.useState(0);
  const [children, setChildren] = React.useState(0);

  const handleLocationSelected = (location: any) => {
    // console.log("Localização escolhida:", location);
    setSelectedLocation(location);
  };

  const handleSearch = () => {
    const formattedDate = date && date?.toISOString().split("T")[0];
    const limitPersons = (adults || 0) + (children || 0);
    const state = selectedLocation?.completeAddress?.addressState;
    const city = selectedLocation?.completeAddress?.addressCity;

    // Cria o objeto de forma dinâmica
    const filters: any = {};

    if (state) filters.state = state;
    if (city) filters.city = city;
    if (limitPersons > 0) filters.limitPersons = limitPersons;
    if (formattedDate) filters.date = formattedDate;
    if (hour && hour !== "00:00") filters.hour = hour;

    set(filters);
    setSelectedLocation({
      address: "",
      completeAddress: {
        addressStreet: "",
        addressPostalCode: "",
        addressNumber: "",
        addressComplement: "",
        addressNeighborhood: "",
        addressCity: "",
        addressState: "",
        addressCountry: "",
      },
      coordinates: null,
    });
    setHour("");
    setDate(undefined);
    setAdults(0);
    setChildren(0);
  };

  return (
    <section className="space-y-4 max-sm:mt-4 md:space-y-6 md:bg-gray-500 md:p-4 md:rounded-lg">
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
          <GoogleAutoComplete
            title="Cidade"
            setFormData={setSelectedLocation}
            formData={selectedLocation?.address}
            onLocationSelected={handleLocationSelected}
          />
        </div>

        <OneDay date={date} setDate={setDate} />

        <TimePickerOptional
          className="text-base "
          selectedTime={hour}
          setSelectedTime={setHour}
          availableActivityTimes={hours.map((hour) => hour.value)}
        />

        <PublicPeopleSelector
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
          className="text-gray-400"
        />
      </div>

      <MyButton
        variant="default"
        borderRadius="squared"
        size="lg"
        className="w-full"
        onClick={handleSearch}
      >
        Procurar atividades
      </MyButton>
    </section>
  );
}
