"use client";

import { useProfile } from "@/hooks/use-profile";
import { SidebarTrigger } from "./ui/sidebar";
import { Skeleton } from "./ui/skeleton";

export default function Welcome() {
  const { data: user, isLoading } = useProfile();

  return (
    <div className="flex items-center gap-2 overflow-hidden mobile:w-full justify-between tablet:justify-center">
      <SidebarTrigger className="mobile:self-start" />
      <div className="shrink-0 bg-sub w-[1px] mr-1 h-4 mobile:hidden" />
      {!isLoading ? (
        <h2 className="text-xl truncate tracking-tight w-full">
          Bem-vindo, <span className="font-bold">{user?.nome}!</span> &#128075;
        </h2>
      ) : (
        <Skeleton className="h-6 w-36" />
      )}
    </div>
  );
}
