import { Trophy, Medal, Award, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { StudentDashboardData } from "@shared/schema";

interface RankingOverviewProps {
  data: StudentDashboardData;
}

export default function RankingOverview({ data }: RankingOverviewProps) {
  const getBatchRankBadge = (rank: number, total: number) => {
    const percentile = (rank / total) * 100;
    if (percentile <= 10) return { variant: "default" as const, label: "Top 10%" };
    if (percentile <= 25) return { variant: "secondary" as const, label: "Top 25%" };
    if (percentile <= 50) return { variant: "outline" as const, label: "Top 50%" };
    return { variant: "destructive" as const, label: "Bottom 50%" };
  };

  const getUniversityRankBadge = (rank: number, total: number) => {
    const percentile = (rank / total) * 100;
    if (percentile <= 5) return { variant: "default" as const, label: "Top 5%" };
    if (percentile <= 15) return { variant: "secondary" as const, label: "Top 15%" };
    if (percentile <= 30) return { variant: "outline" as const, label: "Top 30%" };
    return { variant: "destructive" as const, label: "Bottom 70%" };
  };

  const batchBadge = getBatchRankBadge(data.batchRank, data.batchSize);
  const universityBadge = getUniversityRankBadge(data.universityRank, data.universitySize);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Batch Ranking */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Batch {data.student.batch} Ranking</CardTitle>
          <Medal className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">#{data.batchRank}</div>
              <p className="text-xs text-muted-foreground">
                out of {data.batchSize} students
              </p>
            </div>
            <Badge variant={batchBadge.variant} className="ml-2">
              {batchBadge.label}
            </Badge>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${100 - ((data.batchRank - 1) / data.batchSize) * 100}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* University Ranking */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">University Ranking</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">#{data.universityRank}</div>
              <p className="text-xs text-muted-foreground">
                out of {data.universitySize} students
              </p>
            </div>
            <Badge variant={universityBadge.variant} className="ml-2">
              {universityBadge.label}
            </Badge>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${100 - ((data.universityRank - 1) / data.universitySize) * 100}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}