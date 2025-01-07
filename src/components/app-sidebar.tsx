import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Logo } from "@/lib/get-logo-theme";
import { ChartSpline, Layers2, LayoutDashboard, Sun } from "lucide-react";
import { ToggleTheme } from "./toggle-theme";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Transações",
    url: "#",
    icon: ChartSpline,
  },
  {
    title: "Categorias",
    url: "#",
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
                    <a href={item.url}>
                      <item.icon />
                      <span className="font-semibold">{item.title}</span>
                    </a>
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
      <SidebarFooter className="flex flex-row items-center px-6">
        <Avatar>
          <AvatarImage src="" alt="Avatar do Usuário" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="w-full overflow-hidden">
          <p className="font-semibold truncate">
            Pedro de FreitasFreitasFreitasFreitas
          </p>
          <p className="font-light text-xs truncate">
            {" "}
            contato.pedrodecf@gmail.com
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
