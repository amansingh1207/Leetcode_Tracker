import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Trophy, Users, TrendingUp, Award, Medal, Star, Crown } from "lucide-react";
import { BADGE_TYPES } from "@/lib/constants";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Badge as BadgeType } from "@shared/schema";

interface BadgeWithStudent extends BadgeType {
  student: {
    id: string;
    name: string;
    leetcodeUsername: string;
  };
}

interface BadgesPageData {
  allBadges: BadgeWithStudent[];
  badgeStats: {
    totalBadges: number;
    totalRecipients: number;
    mostPopularBadge: string;
    recentBadges: BadgeWithStudent[];
  };
}

export default function BadgesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBadgeType, setSelectedBadgeType] = useState<string>("all");

  const { data, isLoading, error } = useQuery<BadgesPageData>({
    queryKey: ['/api/badges/all'],
  });

  const getBadgeIcon = (badgeType: string) => {
    switch (badgeType) {
      case 'STREAK_MILESTONE': return <Award className="h-6 w-6" />;
      case 'PROBLEM_SOLVER': return <Trophy className="h-6 w-6" />;
      case 'CONSISTENCY': return <Star className="h-6 w-6" />;
      case 'ACHIEVEMENT': return <Medal className="h-6 w-6" />;
      case 'SPECIAL': return <Crown className="h-6 w-6" />;
      default: return <Badge className="h-6 w-6" />;
    }
  };

  const getBadgeColor = (badgeType: string) => {
    switch (badgeType) {
      case 'STREAK_MILESTONE': return 'from-orange-400 to-red-500';
      case 'PROBLEM_SOLVER': return 'from-yellow-400 to-yellow-600';
      case 'CONSISTENCY': return 'from-blue-400 to-blue-600';
      case 'ACHIEVEMENT': return 'from-purple-400 to-purple-600';
      case 'SPECIAL': return 'from-pink-400 to-pink-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Error loading badges</h3>
          <p className="text-red-600 text-sm mt-1">Failed to load badge data.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-slate-200 rounded-2xl loading-shimmer"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-slate-200 rounded-xl loading-shimmer"></div>
              ))}
            </div>
            <div className="h-96 bg-slate-200 rounded-2xl loading-shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative px-6 py-16">
            <div className="text-center animate-fade-in">
              <div className="mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm mx-auto">
                  <Medal className="text-white" size={32} />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">Badge System</h1>
              <p className="text-white/90 text-xl max-w-2xl mx-auto">
                No badges available yet - start achieving to unlock rewards!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const badgeTypes = Object.keys(BADGE_TYPES) as Array<keyof typeof BADGE_TYPES>;
  
  const filteredBadges = data.allBadges.filter(badge => {
    const matchesSearch = badge.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         badge.student.leetcodeUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         badge.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedBadgeType === "all" || badge.badgeType === selectedBadgeType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-6 py-16">
          <div className="text-center animate-fade-in">
            <div className="mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm mx-auto">
                <Medal className="text-white" size={32} />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">Badge Collection</h1>
            <p className="text-white/90 text-xl max-w-2xl mx-auto">
              Celebrate achievements and milestones with our comprehensive badge system
            </p>
            <div className="text-white/80 text-sm mt-2">
              {data.badgeStats.totalBadges} badges awarded to {data.badgeStats.totalRecipients} students
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8 -mt-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="modern-card hover-lift bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-0 shadow-xl animate-fade-in">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 mx-auto mb-3 text-purple-500" />
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{data.badgeStats.totalBadges}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Badges</p>
            </CardContent>
          </Card>

          <Card className="modern-card hover-lift bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-0 shadow-xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-3 text-blue-500" />
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{data.badgeStats.totalRecipients}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Badge Recipients</p>
            </CardContent>
          </Card>

          <Card className="modern-card hover-lift bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-0 shadow-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-3 text-emerald-500" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{data.badgeStats.mostPopularBadge}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Most Popular Badge</p>
            </CardContent>
          </Card>
        </div>

        {/* Badges Content */}
        <Card className="modern-card border-0 shadow-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-t-2xl border-b border-purple-200 dark:border-purple-800">
            <CardTitle className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center">
                <Medal className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              All Badges
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs value={selectedBadgeType} onValueChange={setSelectedBadgeType} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search badges, students, or achievements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 text-lg bg-white dark:bg-slate-800 border-0 shadow-lg rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <TabsList className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-1">
                  <TabsTrigger value="all" className="rounded-lg">All Types</TabsTrigger>
                  {badgeTypes.map((type) => (
                    <TabsTrigger key={type} value={type} className="rounded-lg">
                      {BADGE_TYPES[type as keyof typeof BADGE_TYPES]?.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value={selectedBadgeType} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBadges.map((badge, index) => (
                    <Card 
                      key={badge.id} 
                      className="modern-card hover-lift bg-white/80 dark:bg-slate-800/80 border-0 shadow-lg animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${getBadgeColor(badge.badgeType)} flex items-center justify-center shadow-lg`}>
                            <div className="text-white">
                              {getBadgeIcon(badge.badgeType)}
                            </div>
                          </div>
                          <Badge className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            badge.badgeType === 'SPECIAL' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300' :
                            badge.badgeType === 'STREAK_MILESTONE' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
                            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          }`}>
                            {BADGE_TYPES[badge.badgeType as keyof typeof BADGE_TYPES]?.title || badge.badgeType}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white">{badge.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{badge.description}</p>
                        </div>
                        
                        <div className="flex items-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                          <Avatar className="w-10 h-10 ring-2 ring-white dark:ring-slate-700 shadow-md">
                            <AvatarFallback className="bg-gradient-primary text-white font-bold text-sm">
                              {badge.student.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-900 dark:text-white">{badge.student.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">@{badge.student.leetcodeUsername}</p>
                          </div>
                        </div>
                        
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Earned on {badge.earnedAt ? new Date(badge.earnedAt).toLocaleDateString() : 'Unknown date'}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredBadges.length === 0 && (
                  <div className="text-center py-12">
                    <Medal className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                    <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">No badges found</h3>
                    <p className="text-slate-500 dark:text-slate-500">
                      {searchTerm ? 'Try adjusting your search criteria' : 'No badges match the selected filters'}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}