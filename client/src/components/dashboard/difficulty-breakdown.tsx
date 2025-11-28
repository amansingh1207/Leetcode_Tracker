import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { StudentDashboardData } from "@shared/schema";

interface DifficultyBreakdownProps {
  data: StudentDashboardData;
}

const TOTAL_PROBLEMS = {
  easy: 724,
  medium: 1541,  
  hard: 634,
};

export default function DifficultyBreakdown({ data }: DifficultyBreakdownProps) {
  const difficulties = [
    {
      label: "Easy",
      solved: data.stats.easySolved,
      total: TOTAL_PROBLEMS.easy,
      color: "bg-leetcode-easy",
      dotColor: "bg-green-500",
    },
    {
      label: "Medium", 
      solved: data.stats.mediumSolved,
      total: TOTAL_PROBLEMS.medium,
      color: "bg-leetcode-medium",
      dotColor: "bg-yellow-500",
    },
    {
      label: "Hard",
      solved: data.stats.hardSolved,
      total: TOTAL_PROBLEMS.hard,
      color: "bg-leetcode-hard",
      dotColor: "bg-red-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Problem Difficulty Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {difficulties.map((difficulty) => {
          const percentage = (difficulty.solved / difficulty.total) * 100;
          
          return (
            <div key={difficulty.label}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${difficulty.dotColor} rounded-full`}></div>
                  <span className="text-sm font-medium text-slate-700">{difficulty.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-slate-900">{difficulty.solved}</span>
                  <span className="text-xs text-slate-500">/ {difficulty.total}</span>
                </div>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
