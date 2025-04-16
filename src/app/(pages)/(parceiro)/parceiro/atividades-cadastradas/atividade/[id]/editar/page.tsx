"use client";
import { EditarAtividadeTemplate } from "@/components/organisms/edit-activity";
import { adventures } from "@/services/api/adventures";
import { formatAddress } from "@/utils/formatters";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export type EditSection =
  | "basic" // título, descrição, tipo
  | "schedule" // horários
  | "location" // localização
  | "pricing" // preços
  | "images"; // imagens

export default function EditarAtividade() {
  const params = useSearchParams();
  const { id } = useParams();
  const router = useRouter();
  const section = params.get("section");
  const queryClient = useQueryClient();

  const { data: activity } = useQuery({
    queryKey: ["activity"],
    queryFn: () => adventures.getAdventureById(Number(id)),
  });

  const formattedActivity = React.useMemo(() => {
    if (!activity) return null;

    const today = new Date();
    const baseYear = today.getFullYear();
    const baseMonth = today.getMonth();

    return {
      id: activity.id,
      title: activity.title,
      addressStreet: activity.addressStreet,
      addressPostalCode: activity.addressPostalCode,
      addressNumber: activity.addressNumber,
      addressComplement: activity.addressComplement,
      addressNeighborhood: activity.addressNeighborhood,
      addressCity: activity.addressCity,
      addressState: activity.addressState,
      addressCountry: activity.addressCountry,
      address: formatAddress({
        addressStreet: activity.addressStreet,
        addressNumber: activity.addressNumber,
        addressNeighborhood: activity.addressNeighborhood,
        addressCity: activity.addressCity,
        addressState: activity.addressState,
        addressPostalCode: activity.addressPostalCode,
        addressCountry: activity.addressCountry,
      }),
      coordinates: {
        lat: Number(activity.coordinates.split(":")[0]),
        lng: Number(activity.coordinates.split(":")[1]),
      },
      pointRefAddress: activity.pointRefAddress,
      description: activity.description,
      itemsIncluded: activity.itemsIncluded,
      duration: activity.duration,
      priceAdult: activity.priceAdult,
      priceChildren: activity.priceChildren,
      transportIncluded: activity.transportIncluded,
      picturesIncluded: activity.picturesIncluded,
      typeAdventure: activity.typeAdventure,
      personsLimit: activity.personsLimit,
      partnerId: activity.partnerId,
      isInGroup: activity.isInGroup,
      isChildrenAllowed: activity.isChildrenAllowed,
      difficult: activity.difficult,
      hoursBeforeSchedule: activity.hoursBeforeSchedule,
      hoursBeforeCancellation: activity.hoursBeforeCancellation,
      isRepeatable: activity.isRepeatable,
      images: activity.images,
      recurrences: activity.recurrence
        ? Object.values(
            activity.recurrence.reduce(
              (acc, rec) => {
                const group = acc[rec.groupId] || {
                  groupId: rec.groupId,
                  recurrenceWeekly: [],
                  dates: [],
                  recurrenceHour: [],
                };

                if (rec.type === "WEEKLY") {
                  group.recurrenceWeekly.push(String(rec.value));
                } else if (rec.type === "MONTHLY") {
                  const day = Number(rec.value);
                  const date = new Date(baseYear, baseMonth, day); // Converte para Date real
                  group.dates.push(date);
                } else if (rec.type === "HOUR") {
                  const hours = Math.floor(rec.value / 100);
                  const minutes = rec.value % 100;
                  group.recurrenceHour.push(
                    `${hours.toString().padStart(2, "0")}:${minutes
                      .toString()
                      .padStart(2, "0")}`
                  );
                }

                acc[rec.groupId] = group;
                return acc;
              },
              {} as Record<
                string,
                {
                  dates: Date[];
                  recurrenceHour: string[];
                  recurrenceWeekly: string[];
                  groupId: string;
                }
              >
            )
          )
        : null,
    };
  }, [activity, activity?.images]);

  const handleBack = () => {
    queryClient.invalidateQueries({ queryKey: ["activity"] });
    router.back();
  };

  return (
    <div>
      {section && (
        <EditarAtividadeTemplate
          section={section as EditSection}
          data={formattedActivity}
          onClose={handleBack}
        />
      )}
    </div>
  );
}
