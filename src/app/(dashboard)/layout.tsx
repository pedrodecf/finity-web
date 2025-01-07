import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="flex">
      <AppSidebar />
      <main className="w-full mx-auto px-12 pt-6 max-w-screen-xl flex flex-col gap-6 h-screen overflow-hidden tablet:h-full tablet:px-4 tablet:gap-4">
        {children}
      </main>
    </SidebarProvider>
  );
}
