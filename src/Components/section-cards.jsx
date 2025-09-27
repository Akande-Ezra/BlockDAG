import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/Components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-6 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Trending Illness */}
      <Card className="relative overflow-hidden border border-teal-200 bg-white hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] rounded-2xl">
        <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-br from-teal-200/20 via-transparent to-indigo-200/20 pointer-events-none" />
        <CardHeader>
          <CardDescription>Trending Illness</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums text-slate-800">
            Over 1M+
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="border-teal-300 text-teal-700 bg-teal-50"
            >
              <IconTrendingUp className="text-teal-600" />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium text-teal-700">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-slate-500">Increase in the last 6 months</div>
        </CardFooter>
      </Card>

      {/* New Customers */}
      <Card className="relative overflow-hidden border border-rose-200 bg-white hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] rounded-2xl">
        <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-br from-rose-200/20 via-transparent to-orange-200/20 pointer-events-none" />
        <CardHeader>
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums text-slate-800">
            1,234
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="border-rose-300 text-rose-700 bg-rose-50"
            >
              <IconTrendingDown className="text-rose-600" />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium text-rose-700">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div>
          <div className="text-slate-500">Acquisition needs attention</div>
        </CardFooter>
      </Card>

      {/* Active Accounts */}
      <Card className="relative overflow-hidden border border-emerald-200 bg-white hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] rounded-2xl">
        <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-br from-emerald-200/20 via-transparent to-teal-200/20 pointer-events-none" />
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums text-slate-800">
            45,678
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="border-emerald-300 text-emerald-700 bg-emerald-50"
            >
              <IconTrendingUp className="text-emerald-600" />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium text-emerald-700">
            Strong retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-slate-500">Engagement exceeded targets</div>
        </CardFooter>
      </Card>

      {/* Growth Rate */}
      <Card className="relative overflow-hidden border border-indigo-200 bg-white hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] rounded-2xl">
        <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-br from-indigo-200/20 via-transparent to-cyan-200/20 pointer-events-none" />
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums text-slate-800">
            4.5%
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="border-indigo-300 text-indigo-700 bg-indigo-50"
            >
              <IconTrendingUp className="text-indigo-600" />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium text-indigo-700">
            Steady increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-slate-500">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}
