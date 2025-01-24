import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Logo } from "@/lib/getters/get-logo-theme";
import { ChartSpline, Layers2, LayoutDashboard, Sun } from "lucide-react";
import Link from "next/link";
import AppSidebarFooter from "./app-sidebar-footer";
import { ToggleTheme } from "./toggle-theme";

const items = [
  {
    title: "Dashboard",
    url: "/app/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transações",
    url: "/app/transacoes",
    icon: ChartSpline,
  },
  {
    title: "Categorias",
    url: "/app/categorias",
    icon: Layers2,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size={"lg"}>
                    <Link href={item.url}>
                      <item.icon />
                      <span className="font-semibold">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center">
                <SidebarMenuButton asChild size={"lg"} variant={"outline"}>
                  <div>
                    <Sun />
                    <span className="font-semibold">Light Mode</span>
                  </div>
                </SidebarMenuButton>
                <SidebarMenuAction asChild>
                  <ToggleTheme />
                </SidebarMenuAction>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <AppSidebarFooter />
    </Sidebar>
  );
}
