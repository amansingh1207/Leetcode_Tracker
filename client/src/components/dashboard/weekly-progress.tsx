import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts";
import { useQuery } from "@tanstack/react-query";
import type { StudentDashboardData } from "@shared/schema";

interface WeeklyProgressProps {
  data: StudentDashboardData;
}

interface WeeklyProgressData {
  student: {
    name: string;
    leetcodeUsername: string;
    leetcodeProfileLink: string;
  };
  weeklyData: {
    week1: number;
    week2: number;
    week3: number;
    week4: number;
  };
  progressIncrements: {
    week2Progress: number;
    week3Progress: number;
    week4Progress: number;
  };
  realTimeData: {
    currentSolved: number;
    newIncrement: number;
    lastUpdated: string;
  };
  summary: {
    totalScore: number;
    averageWeeklyGrowth: number;
  };
}

export default function WeeklyProgress({ data }: WeeklyProgressProps) {
  // Fetch weekly progress data for this specific student
  const { data: weeklyProgressData } = useQuery<WeeklyProgressData[]>({
    queryKey: ['/api/weekly-progress'],
  });

  // Find the current student's weekly progress data
  const studentWeeklyData = weeklyProgressData?.find(
    student => student.student.leetcodeUsername === data.student.leetcodeUsername
  );

  // Create chart data with real weekly scores and current progress
  const chartData = studentWeeklyData ? [
    {
      week: "Week 1",
      problems: studentWeeklyData.weeklyData.week1,
      increment: 0, // No increment for first week
      isRealTime: false
    },
    {
      week: "Week 2", 
      problems: studentWeeklyData.weeklyData.week2,
      increment: studentWeeklyData.progressIncrements.week2Progress,
      isRealTime: false
    },
    {
      week: "Week 3",
      problems: studentWeeklyData.weeklyData.week3,
      increment: studentWeeklyData.progressIncrements.week3Progress,
      isRealTime: false
    },
    {
      week: "Week 4",
      problems: studentWeeklyData.weeklyData.week4,
      increment: studentWeeklyData.progressIncrements.week4Progress,
      isRealTime: false
    },
    {
      week: "Current",
      problems: studentWeeklyData.realTimeData.currentSolved,
      increment: studentWeeklyData.realTimeData.newIncrement,
      isRealTime: true
    }
  ] : [
    // Fallback to original data structure if weekly progress data is not available
    ...data.weeklyProgress.map((value, index) => ({
      week: `Week ${index + 1}`,
      problems: value,
      increment: index === 0 ? 0 : value - (data.weeklyProgress[index - 1] || 0),
      isRealTime: false
    })),
    {
      week: "Current",
      problems: data.stats.totalSolved,
      increment: data.weeklyProgress.length > 0 ? 
        data.stats.totalSolved - (data.weeklyProgress[data.weeklyProgress.length - 1] || 0) : 0,
      isRealTime: true
    }
  ];

  // Custom tooltip to show increments and real-time indicator
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-lg">
          <p className="font-medium text-slate-900">
            {label}
            {data.isRealTime && (
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Live
              </span>
            )}
          </p>
          <p className="text-sm text-slate-600">
            Total Problems: <span className="font-medium">{data.problems}</span>
          </p>
          {data.increment !== 0 && (
            <p className="text-sm text-slate-600">
              Weekly Growth: <span className="font-medium text-green-600">+{data.increment}</span>
            </p>
          )}
          {data.isRealTime && studentWeeklyData && (
            <p className="text-xs text-slate-500 mt-1">
              Last updated: {new Date(studentWeeklyData.realTimeData.lastUpdated).toLocaleString()}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Weekly Progress
          {studentWeeklyData && (
            <div className="text-sm font-normal text-slate-500">
              Avg Growth: +{studentWeeklyData.summary.averageWeeklyGrowth}/week
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="week" 
                stroke="#64748B"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Main progress line */}
              <Line 
                type="monotone" 
                dataKey="problems" 
                stroke="hsl(207, 90%, 54%)"
                strokeWidth={2}
                dot={(props) => {
                  const { payload } = props;
                  return (
                    <circle
                      {...props}
                      fill={payload?.isRealTime ? "hsl(142, 76%, 36%)" : "hsl(207, 90%, 54%)"}
                      stroke={payload?.isRealTime ? "hsl(142, 76%, 36%)" : "hsl(207, 90%, 54%)"}
                      strokeWidth={2}
                      r={payload?.isRealTime ? 5 : 4}
                    />
                  );
                }}
                activeDot={{ r: 6, stroke: 'hsl(207, 90%, 54%)', strokeWidth: 2 }}
              />
              
              {/* Reference line to separate real-time data */}
              <ReferenceLine 
                x="Week 4" 
                stroke="#94a3b8" 
                strokeDasharray="2 2"
                label={{ value: "", position: "top" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Progress summary */}
        {studentWeeklyData && (
          <div className="mt-4 p-3 bg-slate-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Current Total:</span>
                <span className="ml-2 font-medium">{studentWeeklyData.realTimeData.currentSolved}</span>
              </div>
              <div>
                <span className="text-slate-600">New Progress:</span>
                <span className="ml-2 font-medium text-green-600">
                  +{studentWeeklyData.realTimeData.newIncrement}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
