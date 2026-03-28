import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface User {
  id: string;
  username: string;
  role: "student" | "admin";
  leetcodeUsername?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: "student" | "admin") => boolean;
}

interface RegisterData {
  username: string;
  password: string;
  confirmPassword: string;
  role: "student";
  leetcodeUsername: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("auth_token")
  );
  const queryClient = useQueryClient();

  // Fetch current user if token exists
  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["/api/auth/me"],
    queryFn: async () => {
      if (!token) return null;
      
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token is invalid, clear it
          setToken(null);
          localStorage.removeItem("auth_token");
          return null;
        }
        throw new Error("Failed to fetch user");
      }
      
      const data = await response.json();
      return data.user;
    },
    enabled: !!token,
    retry: false, // Don't retry on auth failures
  });

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Login failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setToken(data.token);
      localStorage.setItem("auth_token", data.token);
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Registration failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setToken(data.token);
      localStorage.setItem("auth_token", data.token);
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    },
  });

  const login = async (username: string, password: string) => {
    const result = await loginMutation.mutateAsync({ username, password });
    // Redirect based on user role
    setTimeout(() => {
      if (result.user.role === 'student') {
        window.location.href = `/student/${result.user.leetcodeUsername}`;
      } else {
        window.location.href = '/admin';
      }
    }, 100);
    return result;
  };

  const register = async (data: RegisterData) => {
    const result = await registerMutation.mutateAsync(data);
    // Redirect based on user role
    setTimeout(() => {
      if (result.user.role === 'student') {
        window.location.href = `/student/${result.user.leetcodeUsername}`;
      } else {
        window.location.href = '/admin';
      }
    }, 100);
    return result;
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("auth_token");
    queryClient.clear();
  };

  const hasRole = (role: "student" | "admin") => {
    return user?.role === role;
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        token,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}