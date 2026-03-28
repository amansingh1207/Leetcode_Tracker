import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Flame, Trophy, Medal } from "lucide-react";
import type { StudentDashboardData } from "@shared/schema";

interface StatsOverviewProps {
  data: StudentDashboardData;
}

export default function StatsOverview({ data }: StatsOverviewProps) {
  const acceptanceRate = data.stats.acceptanceRate || 0;
  const totalSubmissions = data.stats.totalSubmissions || 0;
  
  const stats = [
    {
      label: "Total Solved",
      value: data.stats.totalSolved,
      change: `+${data.weeklyProgress.slice(-1)[0] || 0}`,
      changeLabel: "this week",
      icon: CheckCircle,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      label: "LeetCode Rank",
      value: data.stats.ranking > 0 ? `#${data.stats.ranking.toLocaleString()}` : 'Not ranked',
      change: "Global",
      changeLabel: "ranking",
      icon: Trophy,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-500",
    },
    {
      label: "Acceptance Rate",
      value: `${(acceptanceRate / 100).toFixed(1)}%`,
      change: totalSubmissions > 0 ? `${totalSubmissions}` : "0",
      changeLabel: "submissions",
      icon: CheckCircle,
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      label: "Max Streak",
      value: `${data.maxStreak} days`,
      change: `${data.currentStreak}`,
      changeLabel: "current",
      icon: Flame,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      label: "Active Days",
      value: data.totalActiveDays,
      change: `${((data.totalActiveDays / 365) * 100).toFixed(1)}%`,
      changeLabel: "yearly rate",
      icon: Trophy,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
    {
      label: "Badges Earned",
      value: data.badges.length,
      change: "+1",
      changeLabel: "this week",
      icon: Medal,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`${stat.iconColor}`} size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 font-medium">{stat.change}</span>
                {stat.changeLabel && (
                  <span className="text-slate-500 ml-1">{stat.changeLabel}</span>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
