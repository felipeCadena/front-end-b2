"use client";

import customErrorMap from "@/libs/zod/customErrorMap";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { z } from "zod";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const Provider = ({ children }: { children: React.ReactNode }) => {
  z.setErrorMap(customErrorMap);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
