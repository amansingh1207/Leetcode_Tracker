import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Trophy, Calendar, Target, Flame, Users, ExternalLink, Filter } from 'lucide-react';
import { Link } from 'wouter';

type Student = {
  id: string;
  name: string;
  leetcodeUsername: string;
  leetcodeProfileLink: string;
  profilePhoto?: string;
  batch: string;
  status: string;
  stats?: {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking: number;
    acceptanceRate: number;
    totalSubmissions: number;
    totalAccepted: number;
  };
  streak: number;
  maxStreak: number;
  totalActiveDays: number;
  weeklyProgress: number;
  lastSubmissionDate?: string;
};

export default function StudentDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [batchFilter, setBatchFilter] = useState<string>('all');

  const { data: students, isLoading, error } = useQuery<Student[]>({
    queryKey: ['/api/students', { batch: batchFilter !== 'all' ? batchFilter : undefined }],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Good': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300';
      case 'Active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Underperforming': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Error loading students</h3>
          <p className="text-red-600 text-sm mt-1">
            Failed to load student data. Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  const filteredStudents = students?.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.leetcodeUsername.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-6 py-16">
          <div className="text-center animate-fade-in">
            <div className="mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm mx-auto">
                <Users className="text-white" size={32} />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">Student Directory</h1>
            <p className="text-white/90 text-xl max-w-2xl mx-auto">
              Browse all {students?.length || 0} talented students and track their LeetCode journey
            </p>
            <div className="text-white/80 text-sm mt-2">
              Comprehensive performance analytics and progress tracking
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8 -mt-8">
        {/* Search & Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 animate-slide-up">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search students by name or LeetCode username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg bg-white dark:bg-slate-800 border-0 shadow-xl rounded-2xl focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            />
          </div>
          
          <div className="w-full md:w-48">
            <Select value={batchFilter} onValueChange={setBatchFilter}>
              <SelectTrigger className="w-full py-6 bg-white dark:bg-slate-800 border-0 shadow-xl rounded-2xl focus:ring-2 focus:ring-purple-500">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-slate-400" />
                  <SelectValue placeholder="All Batches" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                <SelectItem value="2027">Batch 2027</SelectItem>
                <SelectItem value="2028">Batch 2028</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end text-xs text-slate-500 dark:text-slate-400 -mt-6 mb-4">
          Last Updated: {students?.[0] ? new Date().toLocaleString() : 'Just now'}
        </div>

        {/* Students Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStudents.map((student, index) => (
            <Link key={student.id} href={`/student/${student.leetcodeUsername}`}>
              <Card className="h-full modern-card hover-lift bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="w-14 h-14 ring-2 ring-white dark:ring-slate-700 shadow-lg">
                          {student.profilePhoto && (
                            <AvatarImage src={student.profilePhoto} alt={student.name} />
                          )}
                          <AvatarFallback className="bg-gradient-primary text-white font-bold text-lg">
                            {student.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">{student.name}</CardTitle>
                        <CardDescription className="text-sm flex items-center gap-1 text-slate-600 dark:text-slate-400">
                          <ExternalLink className="h-3 w-3" />
                          @{student.leetcodeUsername}
                        </CardDescription>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Batch {student.batch || '2028'}
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(student.status)} px-3 py-1 rounded-full font-semibold`}>
                      {student.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl">
                      <Trophy className="h-5 w-5 mx-auto mb-1 text-blue-600 dark:text-blue-400" />
                      <div className="text-xl font-bold text-slate-900 dark:text-white">{student.stats?.totalSolved || 0}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">Total Solved</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl">
                      <Flame className="h-5 w-5 mx-auto mb-1 text-orange-600 dark:text-orange-400" />
                      <div className="text-xl font-bold text-slate-900 dark:text-white">{student.streak || 0}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">Current Streak</div>
                    </div>
                  </div>

                  {/* Difficulty Breakdown */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Problem Breakdown</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-green-100 dark:bg-green-900/30 rounded-full px-3 py-1">
                        <span className="text-xs font-bold text-green-700 dark:text-green-300">
                          E: {student.stats?.easySolved || 0}
                        </span>
                      </div>
                      <div className="flex-1 bg-yellow-100 dark:bg-yellow-900/30 rounded-full px-3 py-1">
                        <span className="text-xs font-bold text-yellow-700 dark:text-yellow-300">
                          M: {student.stats?.mediumSolved || 0}
                        </span>
                      </div>
                      <div className="flex-1 bg-red-100 dark:bg-red-900/30 rounded-full px-3 py-1">
                        <span className="text-xs font-bold text-red-700 dark:text-red-300">
                          H: {student.stats?.hardSolved || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">{student.maxStreak || 0}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Max Streak</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">{student.totalActiveDays || 0}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Active Days</div>
                      </div>
                    </div>
                  </div>

                  {/* Last Submission */}
                  {student.lastSubmissionDate && (
                    <div className="text-center py-2">
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Last active: {new Date(student.lastSubmissionDate).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">No students found</h3>
            <p className="text-slate-500 dark:text-slate-500">
              {searchTerm ? 'Try adjusting your search criteria' : 'No students available in the directory'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}