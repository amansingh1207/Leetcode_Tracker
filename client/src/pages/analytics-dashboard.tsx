import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { TrendingUp, TrendingDown, Minus, Download, Upload, RefreshCw } from "lucide-react";
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
  PieChart,
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
    onError: (error) => {
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
        description: "All student data has been updated with real-time LeetCode data.",
      });
    },
    onError: () => {
      toast({
        title: "Sync failed",
        description: "Failed to sync with LeetCode. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="mx-auto h-8 w-8 animate-spin text-blue-600 mb-4" />
          <p className="text-lg font-medium">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error || !analyticsData) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-red-600 mb-4">Failed to load analytics data</p>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const formatTrendData = () => {
    return analyticsData.top10Students.map((student) => {
      const weeklyData: any = {};
      student.weeklyTrends.forEach((trend: any, index: number) => {
        weeklyData[`Week ${index + 1}`] = trend?.totalProblems || 0;
      });
      weeklyData['Current'] = student.currentSolved;
      weeklyData['student'] = student.student.name;
      return weeklyData;
    });
  };

  const formatImprovementData = () => {
    return analyticsData.top15Improvers.map((student) => ({
      name: student.student.name.split(' ').slice(0, 2).join(' '), // Shortened name
      improvement: student.improvement,
      improvementPercent: student.improvementPercent
    }));
  };

  const formatPieData = () => {
    return [
      { name: 'Improved', value: analyticsData.progressCategories.improved, color: COLORS.improved },
      { name: 'Declined', value: analyticsData.progressCategories.declined, color: COLORS.declined },
      { name: 'Same', value: analyticsData.progressCategories.same, color: COLORS.same }
    ];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'improved':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'declined':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      improved: 'bg-green-100 text-green-800',
      declined: 'bg-red-100 text-red-800',
      same: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || colors.same;
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Real-Time Analytics Dashboard</h2>
            <p className="text-sm text-slate-500">Historical trends and current LeetCode progress analysis</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setAutoRefresh(!autoRefresh)}
              variant={autoRefresh ? "default" : "outline"}
              size="sm"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              {autoRefresh ? 'Auto-Refresh ON' : 'Auto-Refresh OFF'}
            </Button>
            <Button 
              onClick={() => importMutation.mutate()}
              disabled={importMutation.isPending}
              variant="outline"
              className="text-purple-600 border-purple-600 hover:bg-purple-50"
            >
              <Upload className="mr-2 h-4 w-4" />
              {importMutation.isPending ? 'Importing...' : 'Import CSV'}
            </Button>
            <Button 
              onClick={() => syncMutation.mutate()}
              disabled={syncMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${syncMutation.isPending ? 'animate-spin' : ''}`} />
              {syncMutation.isPending ? 'Syncing...' : 'Sync Real-time'}
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Summary Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{analyticsData.summaryStats.totalStudents}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-600">Improved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{analyticsData.summaryStats.improved}</div>
              <p className="text-xs text-slate-500">
                {((analyticsData.summaryStats.improved / analyticsData.summaryStats.totalStudents) * 100).toFixed(1)}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-600">Declined</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{analyticsData.summaryStats.declined}</div>
              <p className="text-xs text-slate-500">
                {((analyticsData.summaryStats.declined / analyticsData.summaryStats.totalStudents) * 100).toFixed(1)}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Unchanged</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{analyticsData.summaryStats.same}</div>
              <p className="text-xs text-slate-500">
                {((analyticsData.summaryStats.same / analyticsData.summaryStats.totalStudents) * 100).toFixed(1)}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">Avg Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${analyticsData.summaryStats.averageImprovement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {analyticsData.summaryStats.averageImprovement >= 0 ? '+' : ''}{analyticsData.summaryStats.averageImprovement}
              </div>
              <p className="text-xs text-slate-500">problems solved</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Progress Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Top 10 Students Progress Trend</CardTitle>
              <p className="text-sm text-slate-500">Historical progress across all weeks including current data</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={formatTrendData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {analyticsData.top10Students.map((_, index) => (
                    <Line
                      key={index}
                      type="monotone"
                      dataKey={`Week ${index + 1}`}
                      stroke={`hsl(${(index * 360) / 10}, 70%, 50%)`}
                      strokeWidth={2}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Improvement Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Top 15 Students with Most Improvement</CardTitle>
              <p className="text-sm text-slate-500">Students with highest problem count increases since Week 3</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={formatImprovementData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value} problems`,
                      name === 'improvement' ? 'Improvement' : 'Percentage'
                    ]}
                  />
                  <Bar dataKey="improvement" fill={COLORS.primary} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Progress Categories Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Progress Categories Distribution</CardTitle>
              <p className="text-sm text-slate-500">Breakdown of students by improvement status</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={formatPieData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {formatPieData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Class Average Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Class Average Progress Over Time</CardTitle>
              <p className="text-sm text-slate-500">Overall class performance progression</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analyticsData.classAverageProgression}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} problems`, 'Class Average']} />
                  <Area 
                    type="monotone" 
                    dataKey="average" 
                    stroke={COLORS.secondary} 
                    fill={COLORS.secondary}
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Comparison Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Student Comparison Table</CardTitle>
            <p className="text-sm text-slate-500">Comprehensive view of all students with historical and current data</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>LeetCode Username</TableHead>
                    <TableHead>Week 1</TableHead>
                    <TableHead>Week 2</TableHead>
                    <TableHead>Week 3</TableHead>
                    <TableHead>Current</TableHead>
                    <TableHead>Total Change</TableHead>
                    <TableHead>Improvement %</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analyticsData.allStudentsData.map((student, index) => {
                    const week1 = student.weeklyTrends[0]?.totalProblems || 0;
                    const week2 = student.weeklyTrends[1]?.totalProblems || 0;
                    const week3 = student.weeklyTrends[2]?.totalProblems || 0;
                    const current = student.currentSolved;
                    
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{student.student.name}</TableCell>
                        <TableCell className="text-blue-600">
                          <a 
                            href={student.student.leetcodeProfileLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {student.student.leetcodeUsername}
                          </a>
                        </TableCell>
                        <TableCell>{week1}</TableCell>
                        <TableCell>{week2}</TableCell>
                        <TableCell>{week3}</TableCell>
                        <TableCell className="font-semibold">{current}</TableCell>
                        <TableCell className={`font-medium ${student.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {student.improvement >= 0 ? '+' : ''}{student.improvement}
                        </TableCell>
                        <TableCell className={student.improvementPercent >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {student.improvementPercent >= 0 ? '+' : ''}{student.improvementPercent}%
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(student.status)}
                            <Badge className={getStatusBadge(student.status)} variant="secondary">
                              {student.status}
                            </Badge>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}