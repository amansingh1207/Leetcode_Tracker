import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Link } from "wouter";
import { RefreshCw, ArrowLeft, ExternalLink, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import StatsOverview from "@/components/dashboard/stats-overview";
import DifficultyBreakdown from "@/components/dashboard/difficulty-breakdown";
import WeeklyProgress from "@/components/dashboard/weekly-progress";
import RecentBadges from "@/components/dashboard/recent-badges";
import DailyActivity from "@/components/dashboard/daily-activity";
import SubmissionStats from "@/components/dashboard/submission-stats";
import ActivityHeatmap from "@/components/dashboard/activity-heatmap";
import RankingOverview from "@/components/dashboard/ranking-overview";
import type { StudentDashboardData } from "@shared/schema";

export default function StudentDashboard() {
  const { username } = useParams();
  const { toast } = useToast();

  const { data, isLoading, error, refetch } = useQuery<StudentDashboardData>({
    queryKey: [`/api/dashboard/student/${username}`],
    enabled: !!username,
  });

  const handleSync = async () => {
    try {
      if (data?.student) {
        await apiRequest('POST', `/api/sync/student/${data.student.id}`);
        await refetch();
        toast({
          title: "Sync successful",
          description: "Your LeetCode data has been updated.",
        });
      }
    } catch (error) {
      toast({
        title: "Sync failed",
        description: "Failed to sync LeetCode data. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!username) {
    return (
      <div className="flex-1 p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-yellow-800">No student selected</h3>
          <p className="text-yellow-700">Please go back and select a student from the directory.</p>
          <Link href="/">
            <Button className="mt-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Student Directory
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Error loading dashboard</h3>
          <p className="text-red-600 text-sm mt-1">
            Failed to load student data. Please check if the student exists or try refreshing.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex-1 p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-yellow-800 font-medium">No data available</h3>
          <p className="text-yellow-600 text-sm mt-1">
            No student data found. Please initialize the students first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-6 py-16">
          <div className="flex justify-between items-center">
            <div className="animate-fade-in">
              <div className="flex items-center gap-6 mb-4">
                <div className="relative">
                  <Avatar className="w-20 h-20 ring-4 ring-white/30 shadow-2xl">
                    {data?.student?.profilePhoto && (
                      <AvatarImage src={data.student.profilePhoto} alt={data.student.name} />
                    )}
                    <AvatarFallback className="bg-white/20 text-white text-2xl font-bold backdrop-blur-sm">
                      {data?.student?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {data?.student?.name || username}
                  </h1>
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>@{username}</span>
                    </div>
                    {data?.student?.leetcodeProfileLink && (
                      <a 
                        href={data.student.leetcodeProfileLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-white transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>LeetCode Profile</span>
                      </a>
                    )}
                  </div>
                  <div className="text-white/80 text-sm mt-1">
                    Personal LeetCode analytics and progress tracking
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 animate-slide-up">
              <Link href="/">
                <Button 
                  variant="outline"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  All Students
                </Button>
              </Link>
              <Button 
                onClick={handleSync} 
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                variant="outline"
              >
                <RefreshCw className="mr-2" size={16} />
                Sync Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6 space-y-8 -mt-8">
        <StatsOverview data={data} />
        
        <RankingOverview data={data} />
        
        <SubmissionStats data={data} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DifficultyBreakdown data={data} />
          <WeeklyProgress data={data} />
        </div>
        
        <ActivityHeatmap data={data} />
        <RecentBadges data={data} />
      </div>
    </div>
  );
}
