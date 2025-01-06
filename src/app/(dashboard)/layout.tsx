import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="flex">
      <AppSidebar />
      <main className="w-full mx-auto px-12 py-6 max-w-screen-2xl">
        {children}
      </main>
    </SidebarProvider>
  );
}
