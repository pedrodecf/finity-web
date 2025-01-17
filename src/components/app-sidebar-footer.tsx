"use client";

import { useProfile } from "@/hooks/use-profile";
import { getFirstLetter } from "@/lib/getters/get-first-letter";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { SidebarFooter } from "./ui/sidebar";
import { Skeleton } from "./ui/skeleton";

export default function AppSidebarFooter() {
  const { data: user, isLoading } = useProfile();
  return (
    <SidebarFooter className="flex flex-row items-center px-6">
      {!isLoading ? (
        <>
          <Avatar>
            <AvatarFallback>{getFirstLetter(user?.nome || "?")}</AvatarFallback>
          </Avatar>
          <div className="w-full overflow-hidden">
            <p className="font-semibold truncate">{user?.nome}</p>
            <p className="font-light text-xs truncate">{user?.email}</p>
          </div>
        </>
      ) : (
        <>
          <Avatar>
            <Skeleton className="flex h-full w-full items-center justify-center rounded-lg" />
          </Avatar>
          <div className="w-full flex flex-col gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-36" />
          </div>
        </>
      )}
    </SidebarFooter>
  );
}
