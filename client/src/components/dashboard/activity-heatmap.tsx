import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Calendar, Flame, Clock } from "lucide-react";

interface ActivityHeatmapProps {
  data: {
    yearlyActivity: { date: string; count: number }[];
    maxStreak: number;
    totalActiveDays: number;
    currentStreak: number;
  };
}

export default function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  const generateHeatmapData = () => {
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    
    const days = [];
    const currentDate = new Date(oneYearAgo);
    
    // Generate all dates for the past year
    while (currentDate <= today) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const activity = data.yearlyActivity.find(a => a.date === dateStr);
      const count = activity?.count || 0;
      
      days.push({
        date: dateStr,
        count,
        level: count === 0 ? 0 : count < 2 ? 1 : count < 5 ? 2 : count < 8 ? 3 : 4
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const heatmapData = generateHeatmapData();
  
  // Group by weeks for proper display
  const weeks: Array<Array<{ date: string; count: number; level: number }>> = [];
  for (let i = 0; i < heatmapData.length; i += 7) {
    weeks.push(heatmapData.slice(i, i + 7));
  }

  const getLevelColor = (level: number) => {
    const colors = [
      'bg-slate-100 dark:bg-slate-800',    // 0 problems
      'bg-green-100 dark:bg-green-900',    // 1-2 problems
      'bg-green-300 dark:bg-green-700',    // 3-5 problems
      'bg-green-500 dark:bg-green-500',    // 6-8 problems
      'bg-green-700 dark:bg-green-300'     // 9+ problems
    ];
    return colors[level];
  };

  const monthLabels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate month positions
  const getMonthLabels = () => {
    const labels: Array<{ month: string; position: number }> = [];
    let currentMonth = -1;
    
    weeks.forEach((week, weekIndex) => {
      const firstDay = week[0];
      if (firstDay) {
        const date = new Date(firstDay.date);
        const month = date.getMonth();
        
        if (month !== currentMonth && weekIndex % 4 === 0) {
          labels.push({
            month: monthLabels[month],
            position: weekIndex
          });
          currentMonth = month;
        }
      }
    });
    
    return labels;
  };

  const monthLabelPositions = getMonthLabels();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔥 Activity Heatmap
        </CardTitle>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Calendar className="h-4 w-4" />
            <span className="font-medium">{data.totalActiveDays}</span>
            <span>Total Active Days</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="font-medium">{data.maxStreak}</span>
            <span>Maximum Streak</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="font-medium">{data.currentStreak}</span>
            <span>Current Streak</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="overflow-x-auto">
            {/* Month labels */}
            <div className="flex mb-2 ml-8" style={{ width: `${weeks.length * 12}px` }}>
              {monthLabelPositions.map((label, index) => (
                <div
                  key={index}
                  className="text-xs text-slate-500 dark:text-slate-400"
                  style={{ marginLeft: `${label.position * 12}px` }}
                >
                  {label.month}
                </div>
              ))}
            </div>
            
            {/* Heatmap grid */}
            <div className="flex gap-1">
              {/* Day labels */}
              <div className="flex flex-col gap-1 mr-2">
                {weekDays.map((day, index) => (
                  <div
                    key={day}
                    className={`text-xs text-slate-500 dark:text-slate-400 h-3 flex items-center ${
                      index % 2 === 1 ? '' : 'opacity-0'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Activity squares */}
              <div className="flex gap-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <Tooltip key={day.date}>
                        <TooltipTrigger asChild>
                          <div
                            className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)} 
                              hover:ring-2 hover:ring-blue-400 transition-all cursor-pointer`}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-center">
                            <p className="font-medium">
                              {day.count} {day.count === 1 ? 'problem' : 'problems'} solved
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(day.date).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-between mt-4 text-xs text-slate-500 dark:text-slate-400">
              <span>Less</span>
              <div className="flex items-center space-x-1">
                {[0, 1, 2, 3, 4].map(level => (
                  <div key={level} className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}></div>
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}