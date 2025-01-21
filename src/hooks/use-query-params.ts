"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type TQueries = {
  name?: string;
  page?: number;
  ordination?: string;
  orderBy?: string;
  periodoDe?: string;
  periodoAte?: string;
};

export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queries = useMemo(() => {
    return {
      name: searchParams.get("name") ?? "",
      page: Number(searchParams.get("page") ?? "1"),
      ordination: searchParams.get("ordination") ?? "desc",
      orderBy: searchParams.get("orderBy") ?? "data",
      periodoDe: searchParams.get("periodoDe") ?? "",
      periodoAte: searchParams.get("periodoAte") ?? "",
    };
  }, [searchParams]);

  function setQueries(newQueries: Partial<TQueries>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newQueries).forEach(([key, value]) => {
      if (!value && value !== 0) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  }

  return { queries, setQueries };
}
