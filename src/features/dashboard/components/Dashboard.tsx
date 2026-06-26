import { ArrowUpRight } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import { kpis, trendData, pieData, coverageData, activities } from "../api";

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">
            Overview of your test management platform
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-muted-foreground border border-border rounded-md px-3 py-1.5 bg-card">
            Last 30 days
          </span>
          <button className="flex items-center gap-1.5 text-[13px] bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">
            <ArrowUpRight className="w-3.5 h-3.5" />
            View Reports
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4 xl:grid-cols-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-card border border-border rounded-lg p-4 col-span-1"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-8 h-8 rounded-md flex items-center justify-center ${kpi.color}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <p className="text-[22px] font-semibold text-foreground leading-none mb-1">
                {kpi.value}
              </p>
              <p className="text-[11px] text-muted-foreground">{kpi.label}</p>
              <p className="text-[10px] text-emerald-600 mt-1.5 font-medium">
                {kpi.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-12 gap-4">
        {/* Execution Trend */}
        <div className="col-span-7 bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-foreground">Execution Trend</h3>
              <p className="text-[12px] text-muted-foreground">Last 11 days</p>
            </div>
            <div className="flex items-center gap-3">
              {[
                { color: "bg-emerald-500", label: "Passed" },
                { color: "bg-red-500", label: "Failed" },
                { color: "bg-amber-400", label: "Blocked" },
              ].map((d) => (
                <div key={d.label} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${d.color}`} />
                  <span className="text-[11px] text-muted-foreground">
                    {d.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={trendData}
              margin={{ top: 4, right: 4, bottom: 0, left: -24 }}
            >
              <defs>
                <linearGradient id="passed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#36B37E" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#36B37E" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="failed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DE350B" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#DE350B" stopOpacity={0} />
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="passed"
                stroke="#36B37E"
                strokeWidth={2}
                fill="url(#passed)"
              />
              <Area
                type="monotone"
                dataKey="failed"
                stroke="#DE350B"
                strokeWidth={2}
                fill="url(#failed)"
              />
              <Area
                type="monotone"
                dataKey="blocked"
                stroke="#FF991F"
                strokeWidth={1.5}
                fill="none"
                strokeDasharray="4 2"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pass vs Fail Pie */}
        <div className="col-span-5 bg-card border border-border rounded-lg p-4">
          <div className="mb-4">
            <h3 className="text-foreground">Pass vs Fail</h3>
            <p className="text-[12px] text-muted-foreground">
              All executions this month
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 6,
                    border: "1px solid #DFE1E6",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-2.5 h-2.5 rounded-sm"
                      style={{ background: d.color }}
                    />
                    <span className="text-[12px] text-muted-foreground">
                      {d.name}
                    </span>
                  </div>
                  <span className="text-[12px] font-medium text-foreground">
                    {d.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Coverage + Activities */}
      <div className="grid grid-cols-12 gap-4">
        {/* Project Coverage */}
        <div className="col-span-5 bg-card border border-border rounded-lg p-4">
          <div className="mb-4">
            <h3 className="text-foreground">Project Coverage</h3>
            <p className="text-[12px] text-muted-foreground">
              % of requirements with test cases
            </p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={coverageData}
              layout="vertical"
              margin={{ left: -8, right: 12, top: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#DFE1E6"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: "#6B778C" }}
                unit="%"
              />
              <YAxis
                type="category"
                dataKey="project"
                tick={{ fontSize: 11, fill: "#6B778C" }}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 6,
                  border: "1px solid #DFE1E6",
                }}
                formatter={(v) => `${v}%`}
              />
              <Bar
                dataKey="covered"
                stackId="a"
                fill="#0052CC"
                radius={[0, 0, 0, 0]}
                name="Covered"
              />
              <Bar
                dataKey="uncovered"
                stackId="a"
                fill="#DEEBFF"
                radius={[0, 2, 2, 0]}
                name="Uncovered"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="col-span-7 bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-foreground">Recent Activity</h3>
              <p className="text-[12px] text-muted-foreground">
                Latest platform events
              </p>
            </div>
            <button className="text-[12px] text-primary hover:underline">
              View all
            </button>
          </div>
          <div className="space-y-1">
            {activities.map((a, i) => {
              const Icon = a.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 py-2 border-b border-border last:border-0"
                >
                  <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${a.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-foreground leading-snug">
                      {a.text}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {a.user} · {a.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
