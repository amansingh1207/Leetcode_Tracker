import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { Search, Trophy, TrendingUp } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  leetcodeUsername: string;
  leetcodeProfileLink: string;
  profilePhoto?: string;
  createdAt: string;
}

interface StudentWithStats extends Student {
  stats: {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking: number;
  };
  weeklyProgress: number;
  status: string;
  streak: number;
}

export default function StudentDirectory() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: students, isLoading } = useQuery<StudentWithStats[]>({
    queryKey: ['/api/students/all'],
  });

  const filteredStudents = students?.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.leetcodeUsername.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Underperforming': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Student Directory</h1>
          <p className="text-muted-foreground">Loading students...</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Student Directory</h1>
        <p className="text-muted-foreground">
          Browse all {students?.length || 0} students and their progress
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search students by name or LeetCode username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => (
          <Link key={student.id} href={`/student/${student.leetcodeUsername}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/20">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      {student.profilePhoto && (
                        <AvatarImage src={student.profilePhoto} alt={student.name} />
                      )}
                      <AvatarFallback className="bg-primary/10">
                        {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{student.name}</CardTitle>
                      <CardDescription className="text-sm">
                        @{student.leetcodeUsername}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(student.status)}>
                    {student.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                      Total Solved
                    </span>
                    <span className="font-semibold">{student.stats.totalSolved}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                      Weekly Progress
                    </span>
                    <span className="font-semibold">{student.weeklyProgress}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                      LeetCode Rank
                    </span>
                    <span className="font-semibold text-xs">
                      {student.stats.ranking > 0 ? `#${student.stats.ranking.toLocaleString()}` : 'Not ranked'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                      <div className="font-semibold text-green-700 dark:text-green-300">
                        {student.stats.easySolved}
                      </div>
                      <div className="text-green-600 dark:text-green-400">Easy</div>
                    </div>
                    <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                      <div className="font-semibold text-yellow-700 dark:text-yellow-300">
                        {student.stats.mediumSolved}
                      </div>
                      <div className="text-yellow-600 dark:text-yellow-400">Medium</div>
                    </div>
                    <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
                      <div className="font-semibold text-red-700 dark:text-red-300">
                        {student.stats.hardSolved}
                      </div>
                      <div className="text-red-600 dark:text-red-400">Hard</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredStudents.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">No students found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search term or browse all students
          </p>
        </div>
      )}
    </div>
  );
}