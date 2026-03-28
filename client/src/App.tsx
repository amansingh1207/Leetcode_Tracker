import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Sidebar from "@/components/sidebar";
import AuthPage from "@/pages/auth-page";
import { Code } from "lucide-react";
import ExportPage from "@/pages/export-page";
import StudentDashboard from "@/pages/student-dashboard";
import AdminDashboard from "@/pages/admin-dashboard";
import Leaderboard from "@/pages/leaderboard";
import StudentDirectory from "@/pages/student-directory";

import BadgesPage from "@/pages/badges";
import AnalyticsDashboard from "@/pages/analytics-dashboard";
import WeeklyProgressPage from "@/pages/WeeklyProgressPage";
import BatchDashboard from "@/pages/batch-dashboard";
import UniversityDashboard from "@/pages/university-dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      
      <Route path="/">
        <ProtectedRoute>
          <StudentDirectory />
        </ProtectedRoute>
      </Route>
      
      <Route path="/student/:username">
        {(params) => (
          <ProtectedRoute allowOwnData ownDataIdentifier={params.username}>
            <StudentDashboard />
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/admin">
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      </Route>
      
      <Route path="/university">
        <ProtectedRoute requiredRole="admin">
          <UniversityDashboard />
        </ProtectedRoute>
      </Route>
      
      <Route path="/batch/:batch">
        <ProtectedRoute requiredRole="admin">
          <BatchDashboard />
        </ProtectedRoute>
      </Route>
      
      <Route path="/leaderboard">
        <ProtectedRoute>
          <Leaderboard />
        </ProtectedRoute>
      </Route>
      
      <Route path="/badges">
        <ProtectedRoute>
          <BadgesPage />
        </ProtectedRoute>
      </Route>
      

      
      <Route path="/weekly-progress">
        <ProtectedRoute>
          <WeeklyProgressPage />
        </ProtectedRoute>
      </Route>
      
      <Route path="/export">
        <ProtectedRoute requiredRole="admin">
          <ExportPage />
        </ProtectedRoute>
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <AppContent />
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function AppContent() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route>
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
          <Sidebar />
          <main className="flex-1 overflow-x-hidden">
            <Router />
          </main>
        </div>
      </Route>
    </Switch>
  );
}

export default App;
