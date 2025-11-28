import { Link, useLocation } from "wouter";
import { Code, Users, Trophy, Medal, Calendar, LogOut, Activity, BarChart3, TrendingUp, Building2, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "All Students",
    href: "/",
    icon: Users,
  },
  {
    name: "University Dashboard",
    href: "/university",
    icon: Building2,
  },
  {
    name: "Batch 2027",
    href: "/batch/2027",
    icon: BookOpen,
  },
  {
    name: "Batch 2028",
    href: "/batch/2028",
    icon: BookOpen,
  },
  {
    name: "Real-Time Tracker",
    href: "/tracker",
    icon: Activity,
  },
  {
    name: "Admin Dashboard",
    href: "/admin",
    icon: Code,
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    name: "Badges",
    href: "/badges",
    icon: Medal,
  },
  {
    name: "Analytics Dashboard",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Weekly Progress",
    href: "/weekly-progress",
    icon: TrendingUp,
  },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-leetcode-primary rounded-lg flex items-center justify-center">
            <Code className="text-white" size={16} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">LeetCode Tracker</h1>
            <p className="text-xs text-slate-500">Batch Monitoring</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href || (item.href === "/" && location === "/");
          
          return (
            <Link key={item.name} href={item.href}>
              <div className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer",
                isActive 
                  ? "bg-leetcode-primary text-white" 
                  : "text-slate-600 hover:bg-slate-100"
              )}>
                <Icon size={16} />
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40" 
            alt="User profile" 
            className="w-8 h-8 rounded-full object-cover" 
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900">Student</p>
            <p className="text-xs text-slate-500">View Mode</p>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
