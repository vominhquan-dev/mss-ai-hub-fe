import { BarChart2, Download, TrendingUp, TrendingDown } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

const qualityTrend = [
  { week: "W18", passRate: 81, coverage: 72 },
  { week: "W19", passRate: 83, coverage: 75 },
  { week: "W20", passRate: 80, coverage: 74 },
  { week: "W21", passRate: 85, coverage: 78 },
  { week: "W22", passRate: 87, coverage: 80 },
  { week: "W23", passRate: 87, coverage: 82 },
];

const projectMatrix = [
  { project: "KAN", passRate: 92, cases: 412, coverage: 89 },
  { project: "SHOP", passRate: 84, cases: 156, coverage: 76 },
  { project: "AUTH", passRate: 95, cases: 88, coverage: 91 },
  { project: "INFRA", passRate: 71, cases: 62, coverage: 58 },
  { project: "DASH", passRate: 88, cases: 124, coverage: 81 },
];

const radarData = [
  { metric: "Coverage", value: 82 },
  { metric: "Pass Rate", value: 87 },
  { metric: "Automation", value: 74 },
  { metric: "Maintenance", value: 68 },
  { metric: "Defect Density", value: 91 },
  { metric: "Velocity", value: 79 },
];

export function ReportsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground">Reports</h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">Quality metrics and test analytics</p>
        </div>
        <button className="flex items-center gap-1.5 text-[13px] border border-border bg-card text-foreground px-3 py-1.5 rounded-md hover:bg-muted/50 transition-colors">
          <Download className="w-3.5 h-3.5" />
          Export PDF
        </button>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Avg Pass Rate", value: "87.4%", delta: "+2.1%", up: true },
          { label: "Test Coverage", value: "82%", delta: "+4%", up: true },
          { label: "Defect Escape Rate", value: "1.8%", delta: "-0.3%", up: true },
          { label: "Automation Ratio", value: "74%", delta: "+6%", up: true },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-4">
            <p className="text-[22px] font-semibold text-foreground">{s.value}</p>
            <p className="text-[12px] text-muted-foreground mt-0.5">{s.label}</p>
            <div className={`flex items-center gap-1 mt-1.5 ${s.up ? "text-emerald-600" : "text-red-600"}`}>
              {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span className="text-[11px] font-medium">{s.delta} vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Quality trend */}
        <div className="col-span-8 bg-card border border-border rounded-lg p-4">
          <h3 className="text-foreground mb-1">Quality Trend — Weekly</h3>
          <p className="text-[12px] text-muted-foreground mb-4">Pass rate & coverage over last 6 weeks</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={qualityTrend} margin={{ left: -24, right: 4, top: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#6B778C" }} />
              <YAxis tick={{ fontSize: 10, fill: "#6B778C" }} unit="%" domain={[60, 100]} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid #DFE1E6" }} formatter={(v) => `${v}%`} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#6B778C" }} />
              <Line type="monotone" dataKey="passRate" stroke="#0052CC" strokeWidth={2} dot={{ r: 3 }} name="Pass Rate" />
              <Line type="monotone" dataKey="coverage" stroke="#36B37E" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="4 2" name="Coverage" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quality radar */}
        <div className="col-span-4 bg-card border border-border rounded-lg p-4">
          <h3 className="text-foreground mb-1">Quality Matrix</h3>
          <p className="text-[12px] text-muted-foreground mb-4">Overall quality health</p>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#DFE1E6" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9, fill: "#6B778C" }} />
              <Radar dataKey="value" stroke="#0052CC" fill="#0052CC" fillOpacity={0.15} strokeWidth={1.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Project matrix table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-foreground">Project Quality Matrix</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Project", "Pass Rate", "Test Cases", "Coverage", "Status"].map(h => (
                <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projectMatrix.map((p) => (
              <tr key={p.project} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3">
                  <span className="text-[12px] font-mono font-bold text-primary bg-blue-50 px-2 py-0.5 rounded">{p.project}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 max-w-[100px] bg-muted rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${p.passRate >= 90 ? "bg-emerald-500" : p.passRate >= 80 ? "bg-blue-500" : "bg-amber-500"}`} style={{ width: `${p.passRate}%` }} />
                    </div>
                    <span className="text-[12px] font-medium text-foreground">{p.passRate}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[13px] text-foreground">{p.cases}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 max-w-[100px] bg-muted rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-indigo-500" style={{ width: `${p.coverage}%` }} />
                    </div>
                    <span className="text-[12px] font-medium text-foreground">{p.coverage}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${p.passRate >= 90 ? "bg-emerald-50 text-emerald-700" : p.passRate >= 80 ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>
                    {p.passRate >= 90 ? "Excellent" : p.passRate >= 80 ? "Good" : "Needs Work"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
