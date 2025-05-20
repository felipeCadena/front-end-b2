"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useSearchQueryService() {
  const [isReadyToFetch, setIsReadyToFetch] = useState(false);
  const [params, setParams] = useState<Record<string, string>>({});
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    setParams(params);

    setIsReadyToFetch(true);
  }, [searchParams]);

  const set = (fields: Record<string, any>) => {
    const query = new URLSearchParams();

    Object.entries(fields).forEach(([value, key]) => {
      query.append(value, String(key));
    });

    router.push(`${path}?${query}`, { scroll: false });
  };

  const clear = () => {
    router.push(path, { scroll: false });
  };

  return {
    params,
    isReadyToFetch,
    set,
    clear,
  };
}
