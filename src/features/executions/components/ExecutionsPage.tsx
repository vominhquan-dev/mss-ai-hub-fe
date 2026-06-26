import { Play, CheckCircle2, XCircle, AlertCircle, Search } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { allExecutions, trendData, statusMap } from "../api";

interface ExecutionsPageProps {
  selectedProject: string;
  onSelectProject: (project: string) => void;
}

export function ExecutionsPage({
  selectedProject,
  onSelectProject,
}: ExecutionsPageProps) {
  const filteredExecutions =
    selectedProject === "ALL"
      ? allExecutions
      : allExecutions.filter((e) => e.project === selectedProject);

  const totals = filteredExecutions.reduce(
    (acc, e) => ({
      passed: acc.passed + e.passed,
      failed: acc.failed + e.failed,
      blocked: acc.blocked + e.blocked,
    }),
    { passed: 0, failed: 0, blocked: 0 },
  );

  const projects = ["KAN", "SHOP", "AUTH", "INFRA", "DASH"];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground">Executions</h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">
            Test execution runs and results
          </p>
        </div>
        <button className="flex items-center gap-1.5 text-[13px] bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">
          <Play className="w-3.5 h-3.5" />
          New Execution Run
        </button>
      </div>

      {/* Project Filter */}
      <div className="bg-card border border-border rounded-lg p-3">
        <p className="text-[12px] font-semibold text-muted-foreground mb-2">
          Filter by Project
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onSelectProject("ALL")}
            className={`px-3 py-1.5 text-[12px] rounded-md font-medium transition-colors ${
              selectedProject === "ALL"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All Projects
          </button>
          {projects.map((key) => (
            <button
              key={key}
              onClick={() => onSelectProject(key)}
              className={`px-3 py-1.5 text-[12px] rounded-md font-medium transition-colors ${
                selectedProject === key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: "Total Passed",
            value: totals.passed,
            icon: CheckCircle2,
            cls: "text-emerald-600 bg-emerald-50",
            barCls: "bg-emerald-500",
          },
          {
            label: "Total Failed",
            value: totals.failed,
            icon: XCircle,
            cls: "text-red-600 bg-red-50",
            barCls: "bg-red-500",
          },
          {
            label: "Total Blocked",
            value: totals.blocked,
            icon: AlertCircle,
            cls: "text-amber-600 bg-amber-50",
            barCls: "bg-amber-500",
          },
          {
            label: "Total Runs",
            value: filteredExecutions.length,
            icon: Play,
            cls: "text-blue-600 bg-blue-50",
            barCls: "bg-blue-500",
          },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="bg-card border border-border rounded-lg p-4"
            >
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center mb-3 ${s.cls}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-[24px] font-semibold text-foreground">
                {s.value}
              </p>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                {s.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-foreground">Execution Results — Last 6 Days</h3>
            <p className="text-[12px] text-muted-foreground">
              Daily pass / fail counts
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={trendData}
            margin={{ left: -24, right: 4, top: 4, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#6B778C" }} />
            <YAxis tick={{ fontSize: 10, fill: "#6B778C" }} />
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 6,
                border: "1px solid #DFE1E6",
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11, color: "#6B778C" }} />
            <Bar
              dataKey="passed"
              fill="#36B37E"
              name="Passed"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              dataKey="failed"
              fill="#DE350B"
              name="Failed"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              dataKey="blocked"
              fill="#FF991F"
              name="Blocked"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* History table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h3 className="text-foreground">Execution History</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
              <input
                placeholder="Search runs..."
                className="pl-7 pr-3 py-1 text-[12px] bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring/30 w-48"
              />
            </div>
            <select className="text-[12px] bg-muted border border-border rounded-md px-2 py-1 text-muted-foreground focus:outline-none">
              <option>All Status</option>
              <option>Passed</option>
              <option>Partial</option>
              <option>Failed</option>
            </select>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {[
                "Run ID",
                "Suite",
                "Project",
                "Executor",
                "Started",
                "Duration",
                "Results",
                "Status",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredExecutions.map((ex) => {
              const sc = statusMap[ex.status as keyof typeof statusMap];
              const total = ex.passed + ex.failed + ex.blocked;
              const pct = Math.round((ex.passed / total) * 100);
              return (
                <tr
                  key={ex.runId}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3 text-[12px] font-mono font-semibold text-foreground whitespace-nowrap">
                    {ex.runId}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-foreground">
                    {ex.suite}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] font-mono font-bold text-primary bg-blue-50 px-1.5 py-0.5 rounded">
                      {ex.project}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary">
                        {ex.executor === "CI/CD Pipeline"
                          ? "CI"
                          : ex.executor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                      </div>
                      <span className="text-[12px] text-muted-foreground whitespace-nowrap">
                        {ex.executor}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground whitespace-nowrap">
                    {ex.started}
                  </td>
                  <td className="px-4 py-3 text-[12px] font-mono text-muted-foreground">
                    {ex.duration}
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="text-emerald-600 font-medium">
                          {ex.passed}P
                        </span>
                        <span className="text-red-600 font-medium">
                          {ex.failed}F
                        </span>
                        {ex.blocked > 0 && (
                          <span className="text-amber-600 font-medium">
                            {ex.blocked}B
                          </span>
                        )}
                      </div>
                      <div className="w-24 bg-muted rounded-full h-1">
                        <div
                          className="h-1 rounded-full bg-emerald-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${sc?.cls}`}
                    >
                      {sc?.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
