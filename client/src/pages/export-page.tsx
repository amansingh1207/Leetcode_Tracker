import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FileDown, Database, Users, TrendingUp, Calendar, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ExportPage() {
  const { toast } = useToast();
  const [selectedBatches, setSelectedBatches] = useState<string[]>(["2027", "2028"]);
  const [exportFormat, setExportFormat] = useState<"csv" | "excel">("csv");
  const [exportType, setExportType] = useState<"students" | "progress" | "complete">("complete");

  const exportMutation = useMutation({
    mutationFn: async ({ type, format, batches }: { type: string; format: string; batches: string[] }) => {
      const token = localStorage.getItem("auth_token");
      const response = await fetch("/api/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type, format, batches }),
      });

      if (!response.ok) {
        throw new Error("Export failed");
      }

      // Get filename from response headers
      const contentDisposition = response.headers.get("content-disposition");
      const filename = contentDisposition?.split("filename=")[1]?.replace(/"/g, "") || `export.${format}`;

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      return { filename };
    },
    onSuccess: (data) => {
      toast({
        title: "Export successful",
        description: `File ${data.filename} has been downloaded`,
      });
    },
    onError: (error) => {
      toast({
        title: "Export failed",
        description: error instanceof Error ? error.message : "Failed to export data",
        variant: "destructive",
      });
    },
  });

  const handleExport = () => {
    exportMutation.mutate({
      type: exportType,
      format: exportFormat,
      batches: selectedBatches,
    });
  };

  const handleBatchToggle = (batch: string) => {
    setSelectedBatches(prev =>
      prev.includes(batch)
        ? prev.filter(b => b !== batch)
        : [...prev, batch]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FileDown className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Data Export Center</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">Export comprehensive student data and analytics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Export Configuration */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Database className="h-6 w-6 text-blue-600" />
                  Export Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block">
                    Data Type
                  </label>
                  <Select value={exportType} onValueChange={(value: "students" | "progress" | "complete") => setExportType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="students">Student Profiles Only</SelectItem>
                      <SelectItem value="progress">Progress Data Only</SelectItem>
                      <SelectItem value="complete">Complete Dataset</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block">
                    Export Format
                  </label>
                  <Select value={exportFormat} onValueChange={(value: "csv" | "excel") => setExportFormat(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV (.csv)</SelectItem>
                      <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block">
                    Select Batches
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="batch-2027"
                        checked={selectedBatches.includes("2027")}
                        onCheckedChange={() => handleBatchToggle("2027")}
                      />
                      <label htmlFor="batch-2027" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Batch 2027
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="batch-2028"
                        checked={selectedBatches.includes("2028")}
                        onCheckedChange={() => handleBatchToggle("2028")}
                      />
                      <label htmlFor="batch-2028" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Batch 2028
                      </label>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleExport}
                  disabled={exportMutation.isPending || selectedBatches.length === 0}
                  className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-3 text-lg"
                >
                  {exportMutation.isPending ? (
                    <>
                      <Download className="mr-2 h-5 w-5 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <FileDown className="mr-2 h-5 w-5" />
                      Export Data
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Export Options Info */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Users className="h-5 w-5 text-green-600" />
                  Student Profiles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Basic student information, usernames, and contact details
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Progress Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Weekly progress, daily increments, and performance metrics
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Database className="h-5 w-5 text-purple-600" />
                  Complete Dataset
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  All student data, progress history, badges, and analytics
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}