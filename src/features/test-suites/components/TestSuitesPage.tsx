import { Plus, FlaskConical, Play, Edit2, Search, TrendingUp } from "lucide-react";

const allSuites = [
  { id: "TS-01", name: "Authentication Flow", project: "KAN", tests: 42, passRate: 95, lastRun: "Today, 09:30", status: "passed", owner: "Sarah K." },
  { id: "TS-02", name: "User Management", project: "KAN", tests: 38, passRate: 87, lastRun: "Today, 08:45", status: "partial", owner: "Mike R." },
  { id: "TS-03", name: "Payment Processing", project: "SHOP", tests: 56, passRate: 91, lastRun: "Yesterday", status: "passed", owner: "Alex J." },
  { id: "TS-04", name: "Search & Discovery", project: "SHOP", tests: 24, passRate: 75, lastRun: "2 days ago", status: "partial", owner: "Tom B." },
  { id: "TS-05", name: "Notification Service", project: "KAN", tests: 18, passRate: 100, lastRun: "Today, 07:15", status: "passed", owner: "Lisa M." },
  { id: "TS-06", name: "Regression Suite", project: "KAN", tests: 124, passRate: 82, lastRun: "Yesterday", status: "partial", owner: "CI/CD" },
  { id: "TS-07", name: "API Gateway Tests", project: "INFRA", tests: 31, passRate: 68, lastRun: "3 days ago", status: "failed", owner: "Tom B." },
  { id: "TS-08", name: "SSO Login Flow", project: "AUTH", tests: 22, passRate: 95, lastRun: "Today, 11:00", status: "passed", owner: "Sarah K." },
  { id: "TS-09", name: "Analytics Events", project: "DASH", tests: 45, passRate: 89, lastRun: "Yesterday", status: "partial", owner: "Lisa M." },
];

const projectNames: Record<string, string> = {
  KAN: "Kanban Board Core",
  SHOP: "E-Commerce Checkout",
  AUTH: "Authentication Service",
  INFRA: "Infrastructure Monitoring",
  DASH: "Analytics Dashboard",
};

interface TestSuitesPageProps {
  selectedProject: string;
  onSelectProject: (project: string) => void;
}

export function TestSuitesPage({ selectedProject, onSelectProject }: TestSuitesPageProps) {
  const filteredSuites = selectedProject === "ALL" ? allSuites : allSuites.filter(s => s.project === selectedProject);
  
  const totalTests = filteredSuites.reduce((sum, s) => sum + s.tests, 0);
  const avgPassRate = filteredSuites.length > 0 
    ? Math.round(filteredSuites.reduce((sum, s) => sum + s.passRate, 0) / filteredSuites.length * 10) / 10
    : 0;
  const runsToday = filteredSuites.filter(s => s.lastRun.includes("Today")).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground">Test Suites</h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">Manage and organize your test suites</p>
        </div>
        <button className="flex items-center gap-1.5 text-[13px] bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">
          <Plus className="w-3.5 h-3.5" />
          Create Suite
        </button>
      </div>

      {/* Project Filter */}
      <div className="bg-card border border-border rounded-lg p-3">
        <p className="text-[12px] font-semibold text-muted-foreground mb-2">Filter by Project</p>
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
          {Object.entries(projectNames).map(([key, name]) => (
            <button
              key={key}
              onClick={() => onSelectProject(key)}
              className={`px-3 py-1.5 text-[12px] rounded-md font-medium transition-colors ${
                selectedProject === key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {key}: {name}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Suites", value: filteredSuites.length.toString() },
          { label: "Total Test Cases", value: totalTests.toString() },
          { label: "Avg Pass Rate", value: `${avgPassRate}%` },
          { label: "Runs Today", value: runsToday.toString() },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-lg px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[20px] font-semibold text-foreground">{s.value}</p>
              <p className="text-[12px] text-muted-foreground">{s.label}</p>
            </div>
            <TrendingUp className="w-5 h-5 text-muted-foreground/40" />
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input placeholder="Search suites..." className="pl-8 pr-3 py-1.5 w-full text-[13px] bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring/30" />
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-3 gap-4">
        {filteredSuites.map((s) => (
          <div key={s.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-violet-50 flex items-center justify-center">
                  <FlaskConical className="w-4 h-4 text-violet-600" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-muted-foreground">{s.id}</p>
                  <span className="text-[10px] font-semibold text-primary bg-blue-50 px-1 py-0.5 rounded">{s.project}</span>
                </div>
              </div>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${s.status === "passed" ? "bg-emerald-50 text-emerald-700" : s.status === "failed" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>
                {s.status === "passed" ? "Passed" : s.status === "failed" ? "Failed" : "Partial"}
              </span>
            </div>

            <p className="text-[13px] font-semibold text-foreground mb-0.5">{s.name}</p>
            <p className="text-[11px] text-muted-foreground mb-3">Owner: {s.owner}</p>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-muted/50 rounded-md p-2 text-center">
                <p className="text-[16px] font-semibold text-foreground">{s.tests}</p>
                <p className="text-[10px] text-muted-foreground">Cases</p>
              </div>
              <div className="bg-muted/50 rounded-md p-2 text-center">
                <p className={`text-[16px] font-semibold ${s.passRate >= 90 ? "text-emerald-600" : s.passRate >= 75 ? "text-amber-600" : "text-red-600"}`}>{s.passRate}%</p>
                <p className="text-[10px] text-muted-foreground">Pass Rate</p>
              </div>
            </div>

            <div className="w-full bg-muted rounded-full h-1.5 mb-3">
              <div
                className={`h-1.5 rounded-full transition-all ${s.passRate >= 90 ? "bg-emerald-500" : s.passRate >= 75 ? "bg-amber-500" : "bg-red-500"}`}
                style={{ width: `${s.passRate}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[11px] text-muted-foreground">Last: {s.lastRun}</p>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 hover:bg-muted rounded-md transition-colors text-muted-foreground">
                  <Edit2 className="w-3 h-3" />
                </button>
                <button className="p-1.5 hover:bg-accent rounded-md transition-colors text-primary">
                  <Play className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
