import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import BatchStats from "@/components/admin/batch-stats";
import StudentTable from "@/components/admin/student-table";
import type { AdminDashboardData } from "@shared/schema";

export default function AdminDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<AdminDashboardData>({
    queryKey: ['/api/dashboard/admin'],
  });

  const syncMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/sync/all'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/admin'] });
      toast({
        title: "Sync completed",
        description: "All student data has been updated.",
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

  const syncProfilePhotosMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/sync/profile-photos'),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/admin'] });
      toast({
        title: "Profile photos synced",
        description: `Updated ${data.success} profile photos successfully.`,
      });
    },
    onError: () => {
      toast({
        title: "Sync failed",
        description: "Failed to sync profile photos. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleExportCSV = () => {
    window.open('/api/export/csv', '_blank');
  };

  const handleInitStudents = async () => {
    try {
      await apiRequest('POST', '/api/init-students');
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/admin'] });
      toast({
        title: "Students initialized",
        description: "Student data has been imported successfully.",
      });
    } catch (error) {
      toast({
        title: "Import failed",
        description: "Failed to import student data.",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Error loading dashboard</h3>
          <p className="text-red-600 text-sm mt-1">
            Failed to load admin data. Please try refreshing or initialize students first.
          </p>
          <Button onClick={handleInitStudents} className="mt-3" variant="outline">
            Initialize Students
          </Button>
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
          <h3 className="text-yellow-800 font-medium">No students found</h3>
          <p className="text-yellow-600 text-sm mt-1">
            Please initialize the student database first.
          </p>
          <Button onClick={handleInitStudents} className="mt-3">
            Initialize Students
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Admin Dashboard</h2>
            <p className="text-sm text-slate-500">Monitor batch performance and manage students</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              onClick={handleExportCSV}
              variant="outline"
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              <Download className="mr-2" size={16} />
              Export CSV
            </Button>
            <Button 
              onClick={() => syncProfilePhotosMutation.mutate()}
              disabled={syncProfilePhotosMutation.isPending}
              variant="outline"
              className="text-purple-600 border-purple-600 hover:bg-purple-50"
            >
              <RefreshCw className={`mr-2 ${syncProfilePhotosMutation.isPending ? 'animate-spin' : ''}`} size={16} />
              {syncProfilePhotosMutation.isPending ? 'Syncing Photos...' : 'Sync Photos'}
            </Button>
            <Button 
              onClick={() => syncMutation.mutate()}
              disabled={syncMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className={`mr-2 ${syncMutation.isPending ? 'animate-spin' : ''}`} size={16} />
              {syncMutation.isPending ? 'Syncing...' : 'Sync All'}
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Batch Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <BatchStats data={data} />
            <StudentTable data={data} />
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.leaderboard.slice(0, 5).map((entry, index) => (
                <div 
                  key={entry.student.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-slate-400' : 'bg-amber-600'
                    }`}>
                      {entry.rank}
                    </div>
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32"
                      alt="Student" 
                      className="w-8 h-8 rounded-full object-cover" 
                    />
                    <div>
                      <p className="font-medium text-slate-900">{entry.student.name}</p>
                      <p className="text-xs text-slate-500">@{entry.student.leetcodeUsername}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">+{entry.weeklyScore}</p>
                    <p className="text-xs text-slate-500">this week</p>
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
