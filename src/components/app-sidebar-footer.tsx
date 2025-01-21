"use client";

import { useLogout } from "@/hooks/use-logout";
import { useProfile } from "@/hooks/use-profile";
import { getFirstLetter } from "@/lib/getters/get-first-letter";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { SidebarFooter } from "./ui/sidebar";
import { Skeleton } from "./ui/skeleton";

export default function AppSidebarFooter() {
  const { data: user, isLoading } = useProfile();
  const { logout } = useLogout();
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
          <Button
            className="rounded-full shrink-0"
            size="icon"
            onClick={logout}
          >
            <LogOut />
          </Button>
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
          <Skeleton className="rounded-full h-9 w-9 shrink-0" />
        </>
      )}
    </SidebarFooter>
  );
}
