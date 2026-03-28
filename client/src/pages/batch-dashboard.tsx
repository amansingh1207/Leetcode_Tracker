import { useState } from 'react';
import { useParams } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { BatchDashboardData } from '@shared/schema';
import { Search, ExternalLink, Flame, Activity, Trophy, Users } from 'lucide-react';
import { Link } from 'wouter';

export default function BatchDashboard() {
  const { batch } = useParams<{ batch: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<BatchDashboardData>({
    queryKey: [`/api/dashboard/batch/${batch}`],
    enabled: !!batch && ['2027', '2028'].includes(batch)
  });

  const syncMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/sync/all'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/dashboard/batch/${batch}`] });
      toast({
        title: "Sync completed",
        description: `All Batch ${batch} student data has been updated.`,
      });
    },
    onError: () => {
      toast({
        title: "Sync failed",
        description: "Failed to sync student data. Please try again.",
        variant: "destructive",
      });
    },
  });

  const initBatch2027Mutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/init-batch-2027'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/batch', batch] });
      toast({
        title: "Batch 2027 initialized",
        description: "Batch 2027 students have been imported successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Import failed",
        description: "Failed to import Batch 2027 students.",
        variant: "destructive",
      });
    },
  });

  if (!batch || !['2027', '2028'].includes(batch)) {
    return (
      <div className="flex-1 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Invalid Batch</h3>
          <p className="text-red-600 text-sm mt-1">
            Please select a valid batch (2027 or 2028).
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Error loading batch dashboard</h3>
          <p className="text-red-600 text-sm mt-1">
            Failed to load Batch {batch} data. Please try refreshing or initialize students first.
          </p>
          {batch === '2027' && (
            <Button 
              onClick={() => initBatch2027Mutation.mutate()} 
              className="mt-3" 
              variant="outline"
              disabled={initBatch2027Mutation.isPending}
            >
              {initBatch2027Mutation.isPending ? 'Initializing...' : 'Initialize Batch 2027'}
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.totalStudents === 0) {
    return (
      <div className="flex-1 p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-yellow-800 font-medium">No students found in Batch {batch}</h3>
          <p className="text-yellow-600 text-sm mt-1">
            {batch === '2027' 
              ? 'Please initialize the Batch 2027 student database first.'
              : 'No students found in this batch.'
            }
          </p>
          {batch === '2027' && (
            <Button 
              onClick={() => initBatch2027Mutation.mutate()} 
              className="mt-3" 
              variant="outline"
              disabled={initBatch2027Mutation.isPending}
            >
              {initBatch2027Mutation.isPending ? 'Initializing...' : 'Initialize Batch 2027'}
            </Button>
          )}
        </div>
      </div>
    );
  }

  const filteredStudents = data.students?.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.leetcodeUsername.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Good': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300';
      case 'Active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Underperforming': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-6 py-12">
          <div className="flex justify-between items-center">
            <div className="animate-fade-in">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Trophy className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white">Batch {batch}</h1>
                  <p className="text-white/80 text-lg">
                    Performance Dashboard & Analytics
                  </p>
                </div>
              </div>
              <div className="text-white/90 text-sm">
                Track progress, analyze performance, and celebrate achievements
              </div>
            </div>
            <div className="flex gap-3 animate-slide-up">
              <div className="flex flex-col items-end justify-center mr-2 text-right">
                <span className="text-white/70 text-[10px] uppercase tracking-wider font-bold">Data Freshness</span>
                <span className="text-white text-xs font-medium">
                  {data?.students?.[0]?.lastUpdated 
                    ? `Updated ${new Date(data.students[0].lastUpdated).toLocaleTimeString()}`
                    : 'Live Data'}
                </span>
              </div>
              <Button
                onClick={() => syncMutation.mutate()}
                disabled={syncMutation.isPending}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                variant="outline"
              >
                {syncMutation.isPending ? 'Syncing...' : 'Sync All Data'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-8">
          <Card className="modern-card hover-lift bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-700 border-0 shadow-lg animate-bounce-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Students</CardTitle>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">{data.totalStudents}</div>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ {data.activeStudents} Active
              </p>
            </CardContent>
          </Card>

          <Card className="modern-card hover-lift bg-gradient-to-br from-white to-emerald-50 dark:from-slate-800 dark:to-slate-700 border-0 shadow-lg animate-bounce-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">Average Problems</CardTitle>
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                <Activity className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">{Math.round(data.avgProblems)}</div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Per student
              </p>
            </CardContent>
          </Card>

          <Card className="modern-card hover-lift bg-gradient-to-br from-white to-orange-50 dark:from-slate-800 dark:to-slate-700 border-0 shadow-lg animate-bounce-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">Max Streak</CardTitle>
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                <Flame className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">{data.maxStreakOverall}</div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Avg: {Math.round(data.avgMaxStreak)}
              </p>
            </CardContent>
          </Card>

          <Card className="modern-card hover-lift bg-gradient-to-br from-white to-red-50 dark:from-slate-800 dark:to-slate-700 border-0 shadow-lg animate-bounce-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">Need Attention</CardTitle>
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <Trophy className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">{data.underperforming}</div>
              <p className="text-sm text-red-500 dark:text-red-400 font-medium">
                Underperforming
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="relative animate-slide-up">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            placeholder={`Search Batch ${batch} students by name or LeetCode username...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-3 text-lg bg-white dark:bg-slate-800 border-0 shadow-lg rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Students Table */}
        <Card className="modern-card border-0 shadow-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-t-xl border-b border-slate-200 dark:border-slate-600">
            <CardTitle className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              Batch {batch} Students ({filteredStudents.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700">
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Student</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">LeetCode Profile</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Total Solved</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Easy/Medium/Hard</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">LeetCode Ranking</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">This Week</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Current Streak</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Max Streak</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Active Days</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student, index) => (
                    <TableRow key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200 animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <Avatar className="w-12 h-12 ring-2 ring-white dark:ring-slate-700 shadow-lg">
                              {student.profilePhoto && (
                                <AvatarImage src={student.profilePhoto} alt={student.name} />
                              )}
                              <AvatarFallback className="bg-gradient-primary text-white text-sm font-bold">
                                {student.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                          </div>
                          <div>
                            <Link href={`/student/${student.leetcodeUsername}`}>
                              <span className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-200 text-lg">
                                {student.name}
                              </span>
                            </Link>
                            <div className="text-sm text-slate-500 dark:text-slate-400">Batch {batch}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <a 
                          href={student.leetcodeProfileLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors duration-200"
                        >
                          @{student.leetcodeUsername}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">
                          {student.stats?.totalSolved || 0}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-md">
                              <span className="text-xs font-bold text-green-700 dark:text-green-300">E: {student.stats?.easySolved || 0}</span>
                            </div>
                            <div className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded-md">
                              <span className="text-xs font-bold text-yellow-700 dark:text-yellow-300">M: {student.stats?.mediumSolved || 0}</span>
                            </div>
                            <div className="px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded-md">
                              <span className="text-xs font-bold text-red-700 dark:text-red-300">H: {student.stats?.hardSolved || 0}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-bold">
                          #{student.stats?.ranking?.toLocaleString() || 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-bold">
                          +{student.weeklyProgress || 0}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full font-bold">
                          <Flame className="h-4 w-4" />
                          <span className="text-lg font-extrabold">{student.streak || 0}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-bold">
                          <span className="text-lg font-extrabold">{student.maxStreak || 0}</span>
                          <span className="text-xs">days</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full font-bold">
                          <span className="text-lg font-extrabold">{student.totalActiveDays || 0}</span>
                          <span className="text-xs">days</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge className={`${getStatusColor(student.status)} px-3 py-1 rounded-full font-semibold`}>
                          {student.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Batch Leaderboard */}
        <Card className="modern-card border-0 shadow-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-yellow-50 dark:from-slate-700 dark:to-slate-600 rounded-t-xl border-b border-slate-200 dark:border-slate-600">
            <CardTitle className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                <Trophy className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              Batch {batch} Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {data.leaderboard.map((entry, index) => (
                <div key={entry.student.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-xl hover:shadow-lg transition-all duration-200 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg ${
                      entry.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white' :
                      entry.rank === 2 ? 'bg-gradient-to-r from-slate-300 to-slate-400 text-white' :
                      entry.rank === 3 ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white' :
                      'bg-gradient-to-r from-blue-400 to-blue-500 text-white'
                    }`}>
                      {entry.rank}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">{entry.student.name}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">@{entry.student.leetcodeUsername}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-2xl text-slate-900 dark:text-white">{entry.weeklyScore}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">problems solved</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}