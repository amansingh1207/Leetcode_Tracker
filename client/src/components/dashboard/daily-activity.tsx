import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { StudentDashboardData } from "@shared/schema";

interface DailyActivityProps {
  data: StudentDashboardData;
}

export default function DailyActivity({ data }: DailyActivityProps) {
  // Generate last 30 days for the heatmap
  const generateDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const activity = data.dailyActivity.find(a => a.date === dateStr);
      const count = activity?.count || 0;
      
      days.push({
        date: dateStr,
        count,
        level: count === 0 ? 0 : count < 3 ? 1 : count < 7 ? 2 : count < 12 ? 3 : 4
      });
    }
    
    return days;
  };

  const days = generateDays();
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getLevelColor = (level: number) => {
    const colors = [
      'bg-slate-200',
      'bg-green-200', 
      'bg-green-300',
      'bg-green-400',
      'bg-green-500'
    ];
    return colors[level];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map(day => (
            <div key={day} className="text-xs text-slate-500 font-medium text-center">
              {day}
            </div>
          ))}
        </div>
        
        <TooltipProvider>
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => (
              <Tooltip key={day.date}>
                <TooltipTrigger asChild>
                  <div 
                    className={`aspect-square ${getLevelColor(day.level)} rounded hover:ring-2 hover:ring-green-400 transition-all cursor-pointer`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{day.count} problems solved</p>
                  <p className="text-xs text-muted-foreground">{day.date}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
        
        <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
          <span>Less</span>
          <div className="flex items-center space-x-1">
            {[0, 1, 2, 3, 4].map(level => (
              <div key={level} className={`w-3 h-3 ${getLevelColor(level)} rounded`}></div>
            ))}
          </div>
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}
