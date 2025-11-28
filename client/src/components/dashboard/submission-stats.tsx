import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Code, Target, Languages, TrendingUp } from "lucide-react";
import type { StudentDashboardData } from "@shared/schema";

interface SubmissionStatsProps {
  data: StudentDashboardData;
}

export default function SubmissionStats({ data }: SubmissionStatsProps) {
  const { stats } = data;
  const acceptanceRate = (stats.acceptanceRate || 0) / 100;
  const totalSubmissions = stats.totalSubmissions || 0;
  const totalAccepted = stats.totalAccepted || 0;
  const languageStats = stats.languageStats || {};

  // Get top 5 programming languages
  const topLanguages = Object.entries(languageStats)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 5);

  const languageColors = {
    'Python': 'bg-blue-100 text-blue-800',
    'Java': 'bg-orange-100 text-orange-800',
    'C++': 'bg-purple-100 text-purple-800',
    'JavaScript': 'bg-yellow-100 text-yellow-800',
    'C': 'bg-gray-100 text-gray-800',
    'Python3': 'bg-blue-100 text-blue-800',
    'Go': 'bg-cyan-100 text-cyan-800',
    'Rust': 'bg-red-100 text-red-800',
    'TypeScript': 'bg-indigo-100 text-indigo-800',
    'Swift': 'bg-orange-100 text-orange-800',
  };

  const getLanguageColor = (lang: string) => {
    return (languageColors as any)[lang] || 'bg-slate-100 text-slate-800';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Submission Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-500" />
            Submission Statistics
          </CardTitle>
          <CardDescription>
            Overall submission performance and acceptance rate
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalSubmissions.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Total Submissions</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{totalAccepted.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Accepted</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Acceptance Rate</span>
              <span className="text-sm text-gray-600">{acceptanceRate.toFixed(1)}%</span>
            </div>
            <Progress value={acceptanceRate} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs pt-2">
            <div className="text-center p-2 bg-green-50 rounded">
              <div className="font-semibold text-green-700">{stats.easySolved}</div>
              <div className="text-green-600">Easy</div>
            </div>
            <div className="text-center p-2 bg-yellow-50 rounded">
              <div className="font-semibold text-yellow-700">{stats.mediumSolved}</div>
              <div className="text-yellow-600">Medium</div>
            </div>
            <div className="text-center p-2 bg-red-50 rounded">
              <div className="font-semibold text-red-700">{stats.hardSolved}</div>
              <div className="text-red-600">Hard</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Programming Languages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-purple-500" />
            Programming Languages
          </CardTitle>
          <CardDescription>
            Top languages used for solving problems
          </CardDescription>
        </CardHeader>
        <CardContent>
          {topLanguages.length > 0 ? (
            <div className="space-y-3">
              {topLanguages.map(([language, count]) => (
                <div key={language} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Code className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{language}</span>
                  </div>
                  <Badge className={getLanguageColor(language)} variant="secondary">
                    {count as number} problems
                  </Badge>
                </div>
              ))}
              
              {Object.keys(languageStats).length > 5 && (
                <div className="text-sm text-gray-500 text-center pt-2">
                  +{Object.keys(languageStats).length - 5} more languages
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Languages className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p>No language data available</p>
              <p className="text-xs">Start solving problems to see your language breakdown</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}