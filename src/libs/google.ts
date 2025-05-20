"use server";

import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client();
export const autocomplete = async (input: string) => {
  if (!input) return [];

  try {
    const response = await client.placeAutocomplete({
      params: {
        input,
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!,
        language: "pt-BR", // Define o idioma como português do Brasil
        components: ["country:br"], // Restringe resultados ao Brasil
      },
    });

    return response.data.predictions;
  } catch (error) {
    console.error(error);
  }
};

// Função para buscar detalhes de um local pelo place_id
export const getPlaceDetails = async (placeId: string) => {
  if (!placeId) return null;

  try {
    const response = await client.placeDetails({
      params: {
        place_id: placeId,
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!,
        // fields: ["geometry"], // Removido o .location pois deve ser acessado depois
        fields: [
          "formatted_address",
          "geometry",
          "address_components",
          "name",
          "vicinity",
        ],
      },
    });

    // Verifica se temos a geometria e localização
    if (response.data.result?.geometry?.location) {
      const { lat, lng } = response.data.result.geometry.location;
      return { lat, lng };
    }

    return null;
  } catch (error) {
    console.error("Erro ao buscar detalhes do lugar:", error);
    return null;
  }
};
