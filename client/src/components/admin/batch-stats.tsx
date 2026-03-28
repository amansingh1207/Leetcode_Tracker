import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, Calculator, AlertTriangle, Flame, Target } from "lucide-react";
import type { AdminDashboardData } from "@shared/schema";

interface BatchStatsProps {
  data: AdminDashboardData;
}

export default function BatchStats({ data }: BatchStatsProps) {
  const stats = [
    {
      label: "Total Students",
      value: data.totalStudents,
      icon: Users,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-400",
    },
    {
      label: "Active This Week",
      value: data.activeStudents,
      icon: TrendingUp,
      bgColor: "bg-green-50",
      iconColor: "text-green-400",
    },
    {
      label: "Avg Problems/Week",
      value: data.avgProblems,
      icon: Calculator,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-400",
    },
    {
      label: "Underperforming",
      value: data.underperforming,
      icon: AlertTriangle,
      bgColor: "bg-red-50",
      iconColor: "text-red-400",
    },
    {
      label: "Max Streak Overall",
      value: `${data.maxStreakOverall} days`,
      icon: Flame,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-400",
    },
    {
      label: "Avg Max Streak",
      value: `${Math.round(data.avgMaxStreak)} days`,
      icon: Target,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className={stat.bgColor}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: stat.iconColor.replace('text-', '').replace('-400', '') }}>
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold" style={{ color: stat.iconColor.replace('text-', '').replace('-400', '-900') }}>
                    {stat.value}
                  </p>
                </div>
                <Icon className={stat.iconColor} size={20} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
