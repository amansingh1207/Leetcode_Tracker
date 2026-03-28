import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { TrendingUp, TrendingDown, Minus, Download, Upload, RefreshCw, BarChart3, PieChart, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface AnalyticsData {
  summaryStats: {
    totalStudents: number;
    improved: number;
    declined: number;
    same: number;
    averageImprovement: number;
  };
  top10Students: any[];
  top15Improvers: any[];
  progressCategories: {
    improved: number;
    declined: number;
    same: number;
  };
  classAverageProgression: any[];
  allStudentsData: any[];
}

const COLORS = {
  improved: '#10B981', // Green
  declined: '#EF4444', // Red  
  same: '#6B7280', // Gray
  primary: '#3B82F6', // Blue
  secondary: '#8B5CF6' // Purple
};

const PIE_COLORS = [COLORS.improved, COLORS.declined, COLORS.same];

export default function AnalyticsDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [autoRefresh, setAutoRefresh] = useState(false);

  const { data: analyticsData, isLoading, error, refetch } = useQuery<AnalyticsData>({
    queryKey: ['/api/analytics'],
    refetchInterval: autoRefresh ? 30000 : false, // Auto-refresh every 30 seconds if enabled
  });

  const importMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/import/csv'),
    onSuccess: (result: any) => {
      queryClient.invalidateQueries({ queryKey: ['/api/analytics'] });
      toast({
        title: "Import successful",
        description: result.message || "CSV data imported successfully",
      });
    },
    onError: () => {
      toast({
        title: "Import failed",
        description: "Failed to import CSV data. Please try again.",
        variant: "destructive",
      });
    },
  });

  const syncMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/sync/all'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/analytics'] });
      toast({
        title: "Sync completed",
        description: "All student data has been synchronized.",
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

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Error loading analytics</h3>
          <p className="text-red-600 text-sm mt-1">Failed to load analytics data.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-slate-200 rounded-2xl loading-shimmer"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-slate-200 rounded-xl loading-shimmer"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-96 bg-slate-200 rounded-2xl loading-shimmer"></div>
              <div className="h-96 bg-slate-200 rounded-2xl loading-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative px-6 py-16">
            <div className="text-center animate-fade-in">
              <div className="mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm mx-auto">
                  <BarChart3 className="text-white" size={32} />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">Analytics Dashboard</h1>
              <p className="text-white/90 text-xl max-w-2xl mx-auto">
                No analytics data available yet
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-6 py-16">
          <div className="flex justify-between items-center animate-fade-in">
            <div>
              <div className="mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <BarChart3 className="text-white" size={32} />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">Advanced Analytics</h1>
              <p className="text-white/90 text-xl max-w-2xl">
                Comprehensive data insights and performance analytics across all batches
              </p>
              <div className="text-white/80 text-sm mt-2">
                Real-time tracking of {analyticsData.summaryStats.totalStudents} students with detailed progress metrics
              </div>
            </div>
            
            <div className="flex gap-3 animate-slide-in-right">
              <Button 
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm ${autoRefresh ? 'ring-2 ring-white/50' : ''}`}
                variant="outline"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
                Auto Refresh
              </Button>
              <Button 
                onClick={() => refetch()}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                variant="outline"
              >
                <Activity className="mr-2 h-4 w-4" />
                Refresh Now
              </Button>
              <Button 
                onClick={() => syncMutation.mutate()}
                disabled={syncMutation.isPending}
                className="bg-white text-blue-600 hover:bg-white/90 font-semibold"
              >
                <Upload className="mr-2 h-4 w-4" />
                Sync Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8 -mt-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="modern-card hover-lift bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-0 shadow-xl animate-fade-in">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-3 text-emerald-500" />
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{analyticsData.summaryStats.improved}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Students Improved</p>
              <div className="mt-2 text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                +{Math.round(analyticsData.summaryStats.averageImprovement)}% avg
              </div>
            </CardContent>
          </Card>

          <Card className="modern-card hover-lift bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-0 shadow-xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6 text-center">
              <TrendingDown className="h-12 w-12 mx-auto mb-3 text-red-500" />
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{analyticsData.summaryStats.declined}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Students Declined</p>
              <div className="mt-2 text-lg font-semibold text-red-600 dark:text-red-400">
                Need Support
              </div>
            </CardContent>
          </Card>

          <Card className="modern-card hover-lift bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-700 dark:to-gray-700 border-0 shadow-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6 text-center">
              <Minus className="h-12 w-12 mx-auto mb-3 text-slate-500" />
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{analyticsData.summaryStats.same}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Students Same</p>
              <div className="mt-2 text-lg font-semibold text-slate-600 dark:text-slate-400">
                Steady Progress
              </div>
            </CardContent>
          </Card>

          <Card className="modern-card hover-lift bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-0 shadow-xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-3 text-blue-500" />
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{analyticsData.summaryStats.totalStudents}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Students</p>
              <div className="mt-2 text-lg font-semibold text-blue-600 dark:text-blue-400">
                Active Tracking
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Progress Distribution */}
          <Card className="modern-card border-0 shadow-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-t-2xl border-b border-purple-200 dark:border-purple-800">
              <CardTitle className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center">
                  <PieChart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                Progress Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={[
                      { name: 'Improved', value: analyticsData.progressCategories.improved, fill: COLORS.improved },
                      { name: 'Declined', value: analyticsData.progressCategories.declined, fill: COLORS.declined },
                      { name: 'Same', value: analyticsData.progressCategories.same, fill: COLORS.same }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {PIE_COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Class Average Progression */}
          <Card className="modern-card border-0 shadow-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-t-2xl border-b border-blue-200 dark:border-blue-800">
              <CardTitle className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                Class Average Progression
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analyticsData.classAverageProgression}>
                  <defs>
                    <linearGradient id="colorAverage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="week" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Area type="monotone" dataKey="average" stroke={COLORS.primary} fillOpacity={1} fill="url(#colorAverage)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top 10 Students */}
          <Card className="modern-card border-0 shadow-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-t-2xl border-b border-yellow-200 dark:border-yellow-800">
              <CardTitle className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-xl flex items-center justify-center">
                  <Download className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                Top 10 Students
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analyticsData.top10Students.slice(0, 10).map((student, index) => (
                    <TableRow key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      <TableCell>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          index === 0 ? 'bg-yellow-100 text-yellow-800' :
                          index === 1 ? 'bg-slate-100 text-slate-800' :
                          index === 2 ? 'bg-amber-100 text-amber-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {index + 1}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{student.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">@{student.leetcodeUsername}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          {student.totalSolved || 0}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Top 15 Improvers */}
          <Card className="modern-card border-0 shadow-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-t-2xl border-b border-emerald-200 dark:border-emerald-800">
              <CardTitle className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                Most Improved Students
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead className="text-right">Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analyticsData.top15Improvers.slice(0, 10).map((student, index) => (
                    <TableRow key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      <TableCell>
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{student.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">@{student.leetcodeUsername}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300">
                          +{student.improvement || 0}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}