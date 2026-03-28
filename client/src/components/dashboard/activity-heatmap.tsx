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
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    
    // Start from the Sunday of the week containing one year ago
    const startDate = new Date(oneYearAgo);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    // End at the Saturday of the week containing today
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    
    const days = [];
    const currentDate = new Date(startDate);
    
    // Generate all dates in proper calendar weeks
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const activity = data.yearlyActivity.find(a => a.date === dateStr);
      const count = activity?.count || 0;
      
      days.push({
        date: dateStr,
        count,
        level: count === 0 ? 0 : count < 2 ? 1 : count < 5 ? 2 : count < 8 ? 3 : 4,
        isInRange: currentDate >= oneYearAgo && currentDate <= today
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const heatmapData = generateHeatmapData();
  
  // Group by calendar weeks (Sunday to Saturday)
  const weeks: Array<Array<{ date: string; count: number; level: number; isInRange?: boolean }>> = [];
  for (let i = 0; i < heatmapData.length; i += 7) {
    weeks.push(heatmapData.slice(i, i + 7));
  }

  const getLevelColor = (level: number, isInRange: boolean = true) => {
    const colors = [
      'bg-slate-100 dark:bg-slate-800',    // 0 problems
      'bg-green-100 dark:bg-green-900',    // 1-2 problems
      'bg-green-300 dark:bg-green-700',    // 3-5 problems
      'bg-green-500 dark:bg-green-500',    // 6-8 problems
      'bg-green-700 dark:bg-green-300'     // 9+ problems
    ];
    
    // Make squares outside the year range very subtle
    if (!isInRange) {
      return 'bg-slate-50 dark:bg-slate-900 opacity-30';
    }
    
    return colors[level];
  };

  const monthLabels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate month positions - show month when first Sunday of month appears
  const getMonthLabels = () => {
    const labels: Array<{ month: string; position: number }> = [];
    let currentMonth = -1;
    
    weeks.forEach((week, weekIndex) => {
      // Check if this week contains the first few days of a new month
      const relevantDays = week.filter(day => day.isInRange);
      if (relevantDays.length === 0) return;
      
      for (const day of week) {
        const date = new Date(day.date);
        const month = date.getMonth();
        const dayOfMonth = date.getDate();
        
        // Show month label if it's a new month and we're in the first week of that month
        if (month !== currentMonth && dayOfMonth <= 7) {
          labels.push({
            month: monthLabels[month],
            position: weekIndex
          });
          currentMonth = month;
          break;
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
                            className={`w-3 h-3 rounded-sm ${getLevelColor(day.level, day.isInRange)} 
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