import { Link, useLocation } from "wouter";
import { Code, Users, Trophy, Medal, Calendar, LogOut, BarChart3, TrendingUp, Building2, BookOpen, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const getNavigation = (userRole: "student" | "admin" | null) => {
  const baseNavigation = [
    {
      name: "Leaderboard",
      href: "/leaderboard",
      icon: Trophy,
      roles: ["student", "admin"],
    },
  ];

  const adminNavigation = [
    {
      name: "Admin Dashboard",
      href: "/admin",
      icon: Code,
      roles: ["admin"],
    },
    {
      name: "All Students",
      href: "/",
      icon: Users,
      roles: ["admin"],
    },
    {
      name: "University Dashboard",
      href: "/university",
      icon: Building2,
      roles: ["admin"],
    },
    {
      name: "Batch 2027",
      href: "/batch/2027",
      icon: BookOpen,
      roles: ["admin"],
    },
    {
      name: "Batch 2028",
      href: "/batch/2028",
      icon: BookOpen,
      roles: ["admin"],
    },
    {
      name: "Weekly Progress",
      href: "/weekly-progress",
      icon: TrendingUp,
      roles: ["admin"],
    },
    {
      name: "Badges",
      href: "/badges",
      icon: Medal,
      roles: ["admin"],
    },
    {
      name: "Export Data",
      href: "/export",
      icon: FileDown,
      roles: ["admin"],
    },
  ];

  const allNavigation = [...adminNavigation, ...baseNavigation];
  
  return allNavigation.filter(item => 
    !userRole || item.roles.includes(userRole)
  );
};

export default function Sidebar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const navigation = getNavigation(user?.role || null);

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="w-64 md:w-64 lg:w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700 flex flex-col shadow-2xl min-h-screen sticky top-0">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
            <Code className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">LeetCode Tracker</h1>
            <p className="text-sm text-slate-400">Batch Analytics Platform</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {user?.role === "student" && user?.leetcodeUsername && (
          <Link href={`/student/${user.leetcodeUsername}`}>
            <div className={cn(
              "flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer group animate-fade-in hover-lift mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
            )}>
              <Users size={18} />
              <span className="font-semibold">My Dashboard</span>
            </div>
          </Link>
        )}
        
        {navigation.map((item, index) => {
          const Icon = item.icon;
          const isActive = location === item.href || (item.href === "/" && location === "/");
          
          return (
            <Link key={item.name} href={item.href}>
              <div className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer group animate-fade-in hover-lift",
                isActive 
                  ? "bg-gradient-primary text-white shadow-lg" 
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              )} style={{ animationDelay: `${index * 0.1}s` }}>
                <Icon size={18} className={cn(
                  "transition-transform duration-200",
                  isActive ? "scale-110" : "group-hover:scale-110"
                )} />
                <span className="font-semibold">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors duration-200">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {user?.username?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">{user?.username || 'User'}</p>
            <p className="text-xs text-slate-400 capitalize">{user?.role || 'Guest'}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="text-slate-400 hover:text-white transition-colors duration-200"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
