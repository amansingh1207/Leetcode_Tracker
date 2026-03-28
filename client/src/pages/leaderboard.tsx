import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Trophy, Medal, Award, Crown, Star, Flame, TrendingUp, Target, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AdminDashboardData } from "@shared/schema";

// Pagination Controls Component
const Pagination = ({ 
  pagination, 
  onPageChange 
}: { 
  pagination: any; 
  onPageChange: (offset: number) => void 
}) => {
  if (!pagination || pagination.total <= pagination.limit) return null;

  const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div className="flex items-center justify-center gap-4 py-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(pagination.offset - pagination.limit)}
        disabled={pagination.offset === 0}
        className="gap-2"
      >
        <ChevronLeft size={16} /> Previous
      </Button>
      <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
        Page {currentPage} of {totalPages}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(pagination.offset + pagination.limit)}
        disabled={!pagination.hasMore}
        className="gap-2"
      >
        Next <ChevronRight size={16} />
      </Button>
    </div>
  );
};

// Leaderboard Entry Component
const LeaderboardEntry = ({ entry, index }: { entry: any; index: number }) => {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="text-yellow-500" size={24} />;
    if (rank === 2) return <Medal className="text-slate-400" size={24} />;
    if (rank === 3) return <Award className="text-amber-600" size={24} />;
    return <Star className="text-blue-500" size={20} />;
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-300 dark:border-yellow-600';
    if (rank === 2) return 'bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-700 dark:to-gray-700 border-2 border-slate-300 dark:border-slate-500';
    if (rank === 3) return 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-300 dark:border-amber-600';
    return 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700';
  };

  const getScoreBadgeStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
    if (rank === 2) return 'bg-gradient-to-r from-slate-300 to-slate-400 text-white';
    if (rank === 3) return 'bg-gradient-to-r from-amber-400 to-amber-500 text-white';
    return 'bg-gradient-to-r from-blue-400 to-blue-500 text-white';
  };

  return (
    <div 
      key={entry.student.id}
      className={`flex items-center justify-between p-6 transition-all duration-300 hover:shadow-lg animate-slide-up ${getRankStyle(entry.rank)}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center space-x-6">
        <div className="flex items-center gap-3">
          {getRankIcon(entry.rank)}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg ${
            entry.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white' : 
            entry.rank === 2 ? 'bg-gradient-to-r from-slate-300 to-slate-400 text-white' : 
            entry.rank === 3 ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white' :
            'bg-gradient-to-r from-blue-400 to-blue-500 text-white'
          }`}>
            {entry.rank}
          </div>
        </div>
        
        <Avatar className="w-14 h-14 ring-2 ring-white dark:ring-slate-700 shadow-lg">
          {entry.student.profilePhoto && (
            <AvatarImage src={entry.student.profilePhoto} alt={entry.student.name} />
          )}
          <AvatarFallback className="bg-gradient-primary text-white font-bold text-lg">
            {entry.student.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h3 className="font-bold text-xl text-slate-900 dark:text-white">{entry.student.name}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
            <span>@{entry.student.leetcodeUsername}</span>
            <Badge className={`px-2 py-1 text-xs font-semibold ${
              entry.student.batch === '2027' 
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' 
                : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
            }`}>
              Batch {entry.student.batch}
            </Badge>
            {entry.rank <= 3 && (
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
            )}
          </p>
        </div>
      </div>
      
      <div className="text-right">
        <div className={`px-4 py-2 rounded-full font-bold text-xl shadow-lg ${getScoreBadgeStyle(entry.rank)}`}>
          {entry.weeklyScore}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          solved this week
        </p>
      </div>
    </div>
  );
};

// Batch Leaderboard Component
const BatchLeaderboard = ({ data, batchNumber, color }: { data: any[]; batchNumber: string; color: string }) => {
  const colorClasses = {
    blue: {
      header: 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-b border-blue-200 dark:border-blue-800',
      icon: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    },
    purple: {
      header: 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-b border-purple-200 dark:border-purple-800',
      icon: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
      badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
    }
  };

  const classes = colorClasses[color as keyof typeof colorClasses];

  return (
    <Card className="modern-card border-0 shadow-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm animate-fade-in">
      <CardHeader className={`${classes.header} rounded-t-2xl`}>
        <CardTitle className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
          <div className={`w-10 h-10 ${classes.icon} rounded-xl flex items-center justify-center`}>
            <Trophy className="h-6 w-6" />
          </div>
          Batch {batchNumber} Rankings
          <Badge className={classes.badge}>
            {data?.length || 0} Students
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {(data || []).map((entry: any, index: number) => (
            <LeaderboardEntry key={entry.student.id} entry={entry} index={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function Leaderboard() {
  const [offsets, setOffsets] = useState({
    weekly: 0,
    batch2027: 0,
    batch2028: 0,
    university: 0
  });

  const { data: weeklyRes, isLoading, error } = useQuery<{ data: any[], pagination: any }>({
    queryKey: ['/api/leaderboard', { offset: offsets.weekly }],
  });

  const { data: batchRes2027 } = useQuery<{ data: any[], pagination: any }>({
    queryKey: [`/api/leaderboard/batch/2027`, { offset: offsets.batch2027 }],
  });

  const { data: batchRes2028 } = useQuery<{ data: any[], pagination: any }>({
    queryKey: [`/api/leaderboard/batch/2028`, { offset: offsets.batch2028 }],
  });

  const { data: universityRes } = useQuery<{ data: any[], pagination: any }>({
    queryKey: ['/api/leaderboard/university', { offset: offsets.university }],
  });

  const leaderboardData = weeklyRes?.data || [];
  const universityLeaderboard = universityRes?.data || [];
  const batchLeaderboard2027 = batchRes2027?.data || [];
  const batchLeaderboard2028 = batchRes2028?.data || [];

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Error loading leaderboard</h3>
          <p className="text-red-600 text-sm mt-1">Failed to load leaderboard data.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-yellow-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-slate-200 rounded-2xl"></div>
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-20 bg-slate-200 rounded-xl loading-shimmer"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!leaderboardData || leaderboardData.length === 0) {
    return (
      <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-yellow-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="relative overflow-hidden bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative px-6 py-16">
            <div className="text-center animate-fade-in">
              <div className="mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm mx-auto">
                  <Trophy className="text-white" size={32} />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">Leaderboard</h1>
              <p className="text-white/90 text-xl max-w-2xl mx-auto">
                No rankings available yet - compete to see your name here!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-yellow-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-6 py-16">
          <div className="text-center animate-fade-in">
            <div className="mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm mx-auto">
                <Trophy className="text-white" size={32} />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">Hall of Fame</h1>
            <p className="text-white/90 text-xl max-w-2xl mx-auto">
              Weekly performance rankings showcasing our top performers
            </p>
            <div className="text-white/80 text-sm mt-2">
              Compete, excel, and claim your spot among the champions
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Content */}
      <div className="p-6 space-y-8 -mt-8">
        <Tabs defaultValue="weekly" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
            <TabsTrigger value="weekly" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
              Weekly Champions
            </TabsTrigger>
            <TabsTrigger value="batch2027" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Batch 2027
            </TabsTrigger>
            <TabsTrigger value="batch2028" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              Batch 2028
            </TabsTrigger>
            <TabsTrigger value="university" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
              University
            </TabsTrigger>
          </TabsList>

          <div className="flex justify-end text-xs text-slate-500 dark:text-slate-400 -mt-2">
            Last Updated: {weeklyRes?.data?.[0]?.lastUpdated ? new Date(weeklyRes.data[0].lastUpdated).toLocaleString() : 'Just now'}
          </div>

          {/* Weekly Champions */}
          <TabsContent value="weekly">
            <Card className="modern-card border-0 shadow-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-t-2xl border-b border-yellow-200 dark:border-yellow-800">
                <CardTitle className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-xl flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  Weekly Champions
                  <Badge className="ml-auto bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                    {leaderboardData.length} Competitors
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {leaderboardData.map((entry, index) => (
                    <LeaderboardEntry key={entry.student.id} entry={entry} index={index} />
                  ))}
                </div>
                <Pagination 
                  pagination={weeklyRes?.pagination} 
                  onPageChange={(offset) => setOffsets(prev => ({ ...prev, weekly: offset }))} 
                />
              </CardContent>
            </Card>

            {/* Weekly Stats */}
            {leaderboardData.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="modern-card hover-lift bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-0 shadow-xl animate-slide-up">
                  <CardContent className="p-6 text-center">
                    <Crown className="h-12 w-12 mx-auto mb-3 text-yellow-500" />
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{leaderboardData[0]?.student.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Current Champion</p>
                    <div className="mt-2 text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                      +{leaderboardData[0]?.weeklyScore}
                    </div>
                  </CardContent>
                </Card>

                <Card className="modern-card hover-lift bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-0 shadow-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <CardContent className="p-6 text-center">
                    <Trophy className="h-12 w-12 mx-auto mb-3 text-blue-500" />
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{leaderboardData.length}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Competitors</p>
                    <div className="mt-2 text-lg font-semibold text-blue-600 dark:text-blue-400">
                      This Week
                    </div>
                  </CardContent>
                </Card>

                <Card className="modern-card hover-lift bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-0 shadow-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-3 text-emerald-500" />
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {Math.round(leaderboardData.reduce((sum, entry) => sum + entry.weeklyScore, 0) / leaderboardData.length)}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Average Score</p>
                    <div className="mt-2 text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                      Per Student
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Batch 2027 Leaderboard */}
          <TabsContent value="batch2027">
            <div className="space-y-4">
              <BatchLeaderboard data={batchLeaderboard2027 as any[]} batchNumber="2027" color="blue" />
              <Pagination 
                pagination={batchRes2027?.pagination} 
                onPageChange={(offset) => setOffsets(prev => ({ ...prev, batch2027: offset }))} 
              />
            </div>
          </TabsContent>

          {/* Batch 2028 Leaderboard */}
          <TabsContent value="batch2028">
            <div className="space-y-4">
              <BatchLeaderboard data={batchLeaderboard2028 as any[]} batchNumber="2028" color="purple" />
              <Pagination 
                pagination={batchRes2028?.pagination} 
                onPageChange={(offset) => setOffsets(prev => ({ ...prev, batch2028: offset }))} 
              />
            </div>
          </TabsContent>

          {/* University Leaderboard */}
          <TabsContent value="university">
            <Card className="modern-card border-0 shadow-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-t-2xl border-b border-indigo-200 dark:border-indigo-800">
                <CardTitle className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  University Champions
                  <Badge className="ml-auto bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                    All Batches
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {Array.isArray(universityLeaderboard) && universityLeaderboard.map((entry: any, index: number) => (
                    <div 
                      key={entry.student.id}
                      className="flex items-center justify-between p-6 transition-all duration-300 hover:shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <div className="flex items-center space-x-6">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                          {entry.rank}
                        </div>
                        
                        <Avatar className="w-14 h-14 ring-2 ring-white dark:ring-slate-700 shadow-lg">
                          {entry.student.profilePhoto && (
                            <AvatarImage src={entry.student.profilePhoto} alt={entry.student.name} />
                          )}
                          <AvatarFallback className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white font-bold text-lg">
                            {entry.student.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <h3 className="font-bold text-xl text-slate-900 dark:text-white">{entry.student.name}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                            <span>@{entry.student.leetcodeUsername}</span>
                            <Badge className={`text-xs ${
                              entry.batch === '2027' 
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                            }`}>
                              Batch {entry.batch}
                            </Badge>
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="px-4 py-2 rounded-full font-bold text-xl shadow-lg bg-gradient-to-r from-indigo-400 to-purple-500 text-white">
                          {entry.weeklyScore}
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">solved this week</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Pagination 
                  pagination={universityRes?.pagination} 
                  onPageChange={(offset) => setOffsets(prev => ({ ...prev, university: offset }))} 
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}