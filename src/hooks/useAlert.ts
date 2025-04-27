"use client";

import useSearchQueryService from "@/services/use-search-query-service";
import React from "react";

export function useAlert() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { params, clear } = useSearchQueryService();

  React.useEffect(() => {
    if (params.openModal === "true") {
      setIsModalOpen(true);
    }
  }, [params]);

  const handleClose = () => {
    setIsModalOpen(false);
    clear();
  };

  return { handleClose, isModalOpen, setIsModalOpen };
}
