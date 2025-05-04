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
import { format } from "date-fns";

export default function SearchInfoActivity() {
  const router = useRouter();

  const [selectedLocation, setSelectedLocation] =
    React.useState<LocationData | null>(null);
  const [hour, setHour] = React.useState("");
  const [date, setDate] = React.useState<Date>();

  const [adults, setAdults] = React.useState(1);
  const [children, setChildren] = React.useState(0);

  const handleLocationSelected = (location: any) => {
    console.log("Localização escolhida:", location);
    setSelectedLocation(location);
  };

  const handleSearch = () => {
    console.log("Localização:", selectedLocation);
    console.log("Data:", format(date ?? "", "yyyy-MM-dd"));
    console.log("Duração:", hour);
    console.log("Adultos:", adults);
    console.log("Crianças:", children);

    if (!selectedLocation || !date || !hour || !adults) {
      toast.error("Por favor, preencha os campos obrigatórios.");
      return;
    }

    const state = selectedLocation.completeAddress.addressState;
    const formattedDate = format(date, "yyyy-MM-dd");

    const total = adults + (children ?? 0);

    router.push(
      PATHS.atividades +
        `?state=${state}&date=${formattedDate}&hour=${hour}&limitPersons=${String(total)}`
    );
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
          <GoogleAutoComplete
            setFormData={setSelectedLocation}
            formData={selectedLocation}
            onLocationSelected={handleLocationSelected}
          />
        </div>

        <OneDay date={date} setDate={setDate} />

        <TimePickerModal
          selectedTime={hour}
          setSelectedTime={setHour}
          availableActivityTimes={hours.map((hour) => hour.value)}
        />

        <PublicPeopleSelector
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
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
