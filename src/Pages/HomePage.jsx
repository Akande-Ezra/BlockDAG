import { ChartAreaInteractive } from "@/Components/chart-area";
import { DataTable } from "@/Components/data-table";
import { SectionCards } from "@/Components/section-cards";
import { SiteHeader } from "@/Components/site-header";
import { SidebarInset } from "@/Components/ui/sidebar";
import WhatWeOffer from "@/Components/WhatWeOffer";
import React from "react";

export default function HomePage() {
  return (
    <SidebarInset>
      <SiteHeader />
      {/* ✅ Gradient background added here */}
      <div className="flex flex-1 flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <WhatWeOffer />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
