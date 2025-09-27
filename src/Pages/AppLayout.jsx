import { AppSidebar } from "@/Components/app-sider";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { Brain } from "lucide-react";

export default function AppLayout() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />

      {/* Main layout container */}
      <div className="flex flex-col flex-1">
        {/* Sticky Weather Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
            <SidebarTrigger />
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">HealthPredict</h1>
              <p className="text-sm text-gray-600">
                AI-Powered Health Insights
              </p>
            </div>

            {/* Right user: Weather info */}
            <div className="ml-auto flex items-center gap-2 text-sm text-gray-700">
              <span className="font-medium">Welcome,</span>
              <span className="hidden sm:inline">| {"USER"}</span>
            </div>
          </div>
        </header>

        {/* Routed pages */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
