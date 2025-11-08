import { AppSidebar } from "@/Components/app-sider";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";
import { useAccount } from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from "react";

export default function AppLayout() {
  const { isConnected, isConnecting } = useAccount();
  const navigate = useNavigate();

  // Redirect to start screen when wallet is disconnected
  useEffect(() => {
    // Add a small delay to avoid immediate redirect on page load
    const timer = setTimeout(() => {
      if (!isConnecting && !isConnected) {
        navigate('/');
      }
    }, 500); // Increased delay to allow for wallet connection check

    return () => clearTimeout(timer);
  }, [isConnected, isConnecting, navigate]);

  // Show loading while checking wallet connection
  if (isConnecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking wallet connection...</p>
        </div>
      </div>
    );
  }

  // Don't render layout if not connected (will redirect)
  if (!isConnected) {
    return null;
  }

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
        {/* Sticky Header with Wallet */}
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

            {/* RainbowKit Wallet Connection */}
            <div className="ml-auto flex items-center gap-3 bg-gray-100 p-2 rounded">
              
              <div className="min-w-[100px]">
                <ConnectButton />
              </div>
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
