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
import {
  ChartSpline,
  ClipboardPenLine,
  Layers2,
  LayoutDashboard,
  PiggyBank,
  RefreshCcw,
  Sun,
} from "lucide-react";
import Link from "next/link";
import AppSidebarFooter from "./app-sidebar-footer";
import { ToggleTheme } from "./toggle-theme";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transações",
    url: "/transacoes",
    icon: ChartSpline,
  },
  {
    title: "Categorias",
    url: "/categorias",
    icon: Layers2,
  },
  {
    title: "Recorrências",
    url: "#",
    icon: RefreshCcw,
    soon: true,
  },
  {
    title: "Relatórios",
    url: "#",
    icon: ClipboardPenLine,
    soon: true,
  },
  {
    title: "Investimentos",
    url: "#",
    icon: PiggyBank,
    soon: true,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <a href="/" className="w-fit">
          <Logo />
        </a>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={item.soon ? "opacity-30" : ""}
                >
                  <SidebarMenuButton
                    asChild
                    size={"lg"}
                    className={
                      item.soon ? "cursor-not-allowed hover:bg-transparent" : ""
                    }
                  >
                    {!item.soon ? (
                      <Link href={item.url}>
                        <item.icon />
                        <span className="font-semibold">{item.title}</span>
                      </Link>
                    ) : (
                      <span>
                        <item.icon />
                        <span className="font-semibold">{item.title}</span>
                      </span>
                    )}
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
