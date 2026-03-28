import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, Calendar, Users, TrendingUp, TrendingDown, ExternalLink, RefreshCw, Info } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

interface WeekMeta {
  weekNum: number;
  label: string;
  shortLabel: string;
  startDate: string;
  endDate: string;
  isHistorical: boolean;
  isCurrent: boolean;
}

interface StudentRow {
  student: {
    id: string;
    name: string;
    leetcodeUsername: string;
    leetcodeProfileLink: string;
    batch: string;
  };
  weekScores: (number | null)[];
  weekIncrements: (number | null)[];
  weekCumulative: (number | null)[];
  currentTotal: number;
  totalGrowth: number;
  lastSyncDate: string | null;
  hasHistoricalData: boolean;
}

interface TableData {
  weeks: WeekMeta[];
  students: StudentRow[];
  programStartDate: string;
  generatedAt: string;
}

type SortKey = "name" | "total" | "growth" | number;

export default function WeeklyProgressPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [batchFilter, setBatchFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("total");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const { toast } = useToast();

  const { data, isLoading, error, refetch, isFetching } = useQuery<TableData>({
    queryKey: [`/api/weekly-progress/table?batch=${batchFilter}`],
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const filteredAndSorted = (() => {
    if (!data) return [];
    let rows = data.students.filter(r =>
      r.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.student.leetcodeUsername.toLowerCase().includes(searchTerm.toLowerCase())
    );
    rows = [...rows].sort((a, b) => {
      let va: number, vb: number;
      if (sortKey === "name") {
        return sortDir === "asc"
          ? a.student.name.localeCompare(b.student.name)
          : b.student.name.localeCompare(a.student.name);
      }
      if (sortKey === "total") { va = a.currentTotal; vb = b.currentTotal; }
      else if (sortKey === "growth") { va = a.totalGrowth; vb = b.totalGrowth; }
      else {
        va = a.weekScores[sortKey as number] ?? -1;
        vb = b.weekScores[sortKey as number] ?? -1;
      }
      return sortDir === "asc" ? va - vb : vb - va;
    });
    return rows;
  })();

  const summaryStats = data ? {
    total: data.students.length,
    withData: data.students.filter(s => s.hasHistoricalData).length,
    avgTotal: Math.round(data.students.reduce((s, r) => s + r.currentTotal, 0) / (data.students.length || 1)),
    topSolver: data.students[0],
    weekCount: data.weeks.length,
  } : null;

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 opacity-50 text-xs">
      {sortKey === col ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
    </span>
  );

  if (error) {
    return (
      <div className="flex-1 p-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <h3 className="text-red-800 font-semibold text-lg">Failed to load weekly progress</h3>
          <p className="text-red-600 text-sm mt-2">Please check the server or try again.</p>
          <Button onClick={() => refetch()} className="mt-4">Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Calendar className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Week-wise Progress</h1>
                  <p className="text-white/80 text-sm">
                    {data ? `Program started ${new Date(data.programStartDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} · ${data.weeks.length} weeks tracked` : "Loading..."}
                  </p>
                </div>
              </div>
            </div>
            <Button
              onClick={() => refetch()}
              disabled={isFetching}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm self-start md:self-auto"
              variant="outline"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
              {isFetching ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6 -mt-4">
        {/* Summary cards */}
        {summaryStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{summaryStats.total}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Total Students</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-cyan-500" />
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{summaryStats.weekCount}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Weeks Tracked</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-emerald-500" />
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{summaryStats.avgTotal}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Avg Problems Solved</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{summaryStats.topSolver?.currentTotal ?? 0}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate" title={summaryStats.topSolver?.student.name}>
                  🏆 {summaryStats.topSolver?.student.name ?? "—"}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search student name or username..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={batchFilter} onValueChange={setBatchFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="All Batches" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Batches</SelectItem>
                  <SelectItem value="2027">Batch 2027</SelectItem>
                  <SelectItem value="2028">Batch 2028</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button variant={sortKey === "total" ? "default" : "outline"} size="sm" onClick={() => handleSort("total")}>
                  By Total <SortIcon col="total" />
                </Button>
                <Button variant={sortKey === "growth" ? "default" : "outline"} size="sm" onClick={() => handleSort("growth")}>
                  By Growth <SortIcon col="growth" />
                </Button>
                <Button variant={sortKey === "name" ? "default" : "outline"} size="sm" onClick={() => handleSort("name")}>
                  A–Z <SortIcon col="name" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* The big table */}
        <Card className="border-0 shadow-xl bg-white dark:bg-slate-800 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border-b pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Weekly Problems Solved (per week) + Cumulative Total
                <Badge variant="secondary">{filteredAndSorted.length} students</Badge>
              </CardTitle>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Info className="h-3 w-3" />
                <span>Scroll right to see all weeks →</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3" />
                <p className="text-slate-500 dark:text-slate-400">Loading week-wise data...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse" style={{ minWidth: `${Math.max(800, 200 + (data?.weeks.length ?? 0) * 110)}px` }}>
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
                      {/* Sticky student column */}
                      <th
                        className="sticky left-0 z-20 bg-slate-100 dark:bg-slate-700 text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-200 border-r border-slate-200 dark:border-slate-600 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 min-w-[180px]"
                        onClick={() => handleSort("name")}
                      >
                        Student <SortIcon col="name" />
                      </th>
                      <th className="sticky left-[180px] z-20 bg-slate-100 dark:bg-slate-700 text-center px-3 py-3 font-semibold text-slate-600 dark:text-slate-300 border-r border-slate-200 dark:border-slate-600 min-w-[70px]">
                        Batch
                      </th>
                      {/* Week columns */}
                      {data?.weeks.map((week, idx) => (
                        <th
                          key={week.weekNum}
                          className={`text-center px-2 py-2 font-semibold cursor-pointer whitespace-nowrap min-w-[100px] border-r border-slate-200 dark:border-slate-600
                            ${week.isCurrent
                              ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300"
                              : week.isHistorical
                              ? "text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              : "text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
                            }`}
                          onClick={() => handleSort(idx)}
                        >
                          <div className="text-xs font-bold">
                            {week.isCurrent ? "📍 " : ""}Week {week.weekNum}
                          </div>
                          <div className="text-[10px] font-normal opacity-80 mt-0.5">
                            {new Date(week.startDate + "T00:00:00Z").toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                            {" – "}
                            {new Date(week.endDate + "T00:00:00Z").toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                          </div>
                          <div className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5 leading-tight">+solved · total</div>
                          {week.isCurrent && <div className="text-[10px] text-emerald-600 dark:text-emerald-400">current</div>}
                          <SortIcon col={idx} />
                        </th>
                      ))}
                      {/* Total & Growth */}
                      <th
                        className="text-center px-3 py-3 font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/40 min-w-[90px] border-r border-slate-200 dark:border-slate-600"
                        onClick={() => handleSort("total")}
                      >
                        <div className="text-xs font-bold">LeetCode Total</div>
                        <div className="text-[10px] font-normal opacity-80">since account creation</div>
                        <SortIcon col="total" />
                      </th>
                      <th
                        className="text-center px-3 py-3 font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/40 min-w-[90px]"
                        onClick={() => handleSort("growth")}
                      >
                        <div className="text-xs font-bold">Program Total</div>
                        <div className="text-[10px] font-normal opacity-80">since Jul 28</div>
                        <SortIcon col="growth" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSorted.map((row, rowIdx) => (
                      <tr
                        key={row.student.id}
                        className={`border-b border-slate-100 dark:border-slate-700 hover:bg-blue-50/50 dark:hover:bg-slate-700/50 transition-colors
                          ${rowIdx % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-slate-50/50 dark:bg-slate-800/50"}`}
                      >
                        {/* Sticky name column */}
                        <td className="sticky left-0 z-10 bg-inherit px-4 py-2.5 border-r border-slate-200 dark:border-slate-700 min-w-[180px]">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                              {rowIdx + 1}
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-slate-900 dark:text-white text-xs leading-tight truncate max-w-[130px]" title={row.student.name}>
                                {row.student.name}
                              </div>
                              <a
                                href={row.student.leetcodeProfileLink || `https://leetcode.com/u/${row.student.leetcodeUsername}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] text-blue-500 hover:text-blue-700 flex items-center gap-0.5"
                              >
                                @{row.student.leetcodeUsername}
                                <ExternalLink className="h-2.5 w-2.5" />
                              </a>
                            </div>
                          </div>
                        </td>
                        {/* Batch */}
                        <td className="sticky left-[180px] z-10 bg-inherit text-center px-3 py-2.5 border-r border-slate-200 dark:border-slate-700 min-w-[70px]">
                          <Badge
                            variant="outline"
                            className={`text-[10px] px-1.5 py-0 ${row.student.batch === "2027" ? "border-purple-400 text-purple-600 dark:text-purple-400" : "border-blue-400 text-blue-600 dark:text-blue-400"}`}
                          >
                            {row.student.batch}
                          </Badge>
                        </td>
                        {/* Week score cells */}
                        {row.weekScores.map((score, wIdx) => {
                          const inc = row.weekIncrements[wIdx];
                          const cumulative = row.weekCumulative?.[wIdx] ?? null;
                          const week = data?.weeks[wIdx];
                          const hasData = score !== null;
                          const isNoData = !hasData && !week?.isCurrent;
                          return (
                            <td
                              key={wIdx}
                              className={`text-center px-2 py-2 border-r border-slate-100 dark:border-slate-700 min-w-[110px]
                                ${week?.isCurrent ? "bg-emerald-50/50 dark:bg-emerald-900/10" : ""}`}
                            >
                              {hasData ? (
                                <div className="flex flex-col items-center gap-0.5">
                                  {/* Questions solved this week — shown as +N in green */}
                                  <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
                                    +{score}
                                  </span>
                                  {/* Cumulative from program start */}
                                  {cumulative !== null && (
                                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                                      {cumulative}
                                    </span>
                                  )}
                                </div>
                              ) : isNoData ? (
                                <span className="text-slate-300 dark:text-slate-600 text-xs">—</span>
                              ) : (
                                <span className="text-slate-400 text-xs">pending</span>
                              )}
                            </td>
                          );
                        })}
                        {/* Total */}
                        <td className="text-center px-3 py-2.5 bg-emerald-50/30 dark:bg-emerald-900/10 border-r border-slate-200 dark:border-slate-700 min-w-[90px]">
                          <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">{row.currentTotal}</span>
                        </td>
                        {/* Growth */}
                        <td className="text-center px-3 py-2.5 bg-purple-50/30 dark:bg-purple-900/10 min-w-[90px]">
                          <span className={`font-bold text-sm ${row.totalGrowth > 0 ? "text-purple-700 dark:text-purple-400" : "text-slate-400"}`}>
                            {row.totalGrowth > 0 ? `+${row.totalGrowth}` : row.totalGrowth}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filteredAndSorted.length === 0 && !isLoading && (
                      <tr>
                        <td colSpan={100} className="text-center py-12 text-slate-400">
                          No students found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Legend */}
        {data && (
          <Card className="border-0 shadow bg-white/70 dark:bg-slate-800/70">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-600 border border-slate-400" />
                  <span><strong>Each week cell — <span className="text-emerald-600">+N</span> (top):</strong> Questions solved in that week · <strong>number below:</strong> Cumulative total from program start through that week</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-300" />
                  <span><strong>Current week (Week {data.weeks.length}):</strong> Questions solved so far this week</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">+N</span>
                  <span>Solved more questions this week vs previous week (improvement)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-bold">-N</span>
                  <span>Solved fewer questions this week vs previous week</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700 font-bold">LeetCode Total</span>
                  <span>Cumulative problems solved since account creation (includes problems solved before the program)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-700 font-bold">Program Total</span>
                  <span>Problems solved since program start (Jul 28, 2025)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
