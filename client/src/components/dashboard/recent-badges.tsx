import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { BADGE_TYPES } from "@/lib/constants";
import type { StudentDashboardData } from "@shared/schema";

interface RecentBadgesProps {
  data: StudentDashboardData;
}

export default function RecentBadges({ data }: RecentBadgesProps) {
  const allBadgeTypes = Object.keys(BADGE_TYPES) as Array<keyof typeof BADGE_TYPES>;
  const earnedBadgeTypes = new Set(data.badges.map(badge => badge.badgeType));

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <CardTitle>Recent Badges</CardTitle>
          <Link href="/badges">
            <a className="text-sm text-leetcode-primary hover:text-blue-700 font-medium">
              View All
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allBadgeTypes.map((badgeType) => {
            const badgeInfo = BADGE_TYPES[badgeType];
            const isEarned = earnedBadgeTypes.has(badgeType);
            
            return (
              <div 
                key={badgeType}
                className={`flex flex-col items-center p-4 rounded-lg border transition-all ${
                  isEarned 
                    ? `bg-gradient-to-br ${badgeInfo.gradient} bg-opacity-10 border-current` 
                    : 'bg-slate-50 border-slate-200 opacity-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  isEarned 
                    ? `bg-gradient-to-br ${badgeInfo.gradient} text-white`
                    : 'bg-slate-300 text-slate-500'
                }`}>
                  <i className={`${badgeInfo.icon} text-lg`}></i>
                </div>
                <span className="text-sm font-semibold text-slate-900 text-center">
                  {badgeInfo.title}
                </span>
                <span className="text-xs text-slate-500 text-center">
                  {isEarned ? 'Earned!' : 'Not earned yet'}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
