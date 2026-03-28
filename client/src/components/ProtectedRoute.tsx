import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Redirect } from "wouter";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "student" | "admin";
  allowOwnData?: boolean; // For student accessing their own data
  ownDataIdentifier?: string; // Username or ID to check against
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  allowOwnData = false, 
  ownDataIdentifier 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user, hasRole } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/auth" />;
  }

  // Check role-based access
  if (requiredRole && !hasRole(requiredRole)) {
    // If it's a student trying to access admin content, deny
    if (requiredRole === "admin") {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Access Denied</h2>
            <p className="text-slate-600 dark:text-slate-400">You need admin privileges to access this page.</p>
          </div>
        </div>
      );
    }

    // For student role requirement, check if they can access their own data
    if (requiredRole === "student" && allowOwnData && ownDataIdentifier) {
      const canAccess = user?.role === "admin" || 
        (user?.role === "student" && user?.leetcodeUsername === ownDataIdentifier);
      
      if (!canAccess) {
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Access Denied</h2>
              <p className="text-slate-600 dark:text-slate-400">You can only access your own data.</p>
            </div>
          </div>
        );
      }
    }
  }

  return <>{children}</>;
}