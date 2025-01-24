"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

function formatDateToDDMMYYYY(date = new Date()) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}${month}${year}`;
}

function getCurrentMonthRange() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  return { firstDay, lastDay };
}

type TQueries = {
  name?: string;
  page?: number;
  ordination?: string;
  orderBy?: string;
  periodoDe?: string;
  periodoAte?: string;
  quantity?: number;
};

export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { firstDay, lastDay } = getCurrentMonthRange();

  const setQueries = useCallback(
    (newQueries: Partial<TQueries>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newQueries).forEach(([key, value]) => {
        if (!value && value !== 0) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  useEffect(() => {
    const periodoDe = searchParams.get("periodoDe");
    const periodoAte = searchParams.get("periodoAte");

    if (!periodoDe || !periodoAte) {
      setQueries({
        periodoDe: periodoDe ?? formatDateToDDMMYYYY(firstDay),
        periodoAte: periodoAte ?? formatDateToDDMMYYYY(lastDay),
      });
    }
  }, [searchParams, firstDay, lastDay, setQueries]);

  const queries = useMemo(() => {
    return {
      name: searchParams.get("name") ?? "",
      ordination: searchParams.get("ordination") ?? "desc",
      orderBy: searchParams.get("orderBy") ?? "data",
      periodoDe:
        searchParams.get("periodoDe") ?? formatDateToDDMMYYYY(firstDay),
      periodoAte:
        searchParams.get("periodoAte") ?? formatDateToDDMMYYYY(lastDay),
    };
  }, [searchParams, firstDay, lastDay]);

  return { queries, setQueries };
}
