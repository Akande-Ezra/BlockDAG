import { AppSidebar } from "@/Components/app-sider";
import { ChartAreaInteractive } from "@/components/chart-area";
// import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

// import data from "./data.json"

export default function AppLayout() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <Outlet />
    </SidebarProvider>
  );
}
