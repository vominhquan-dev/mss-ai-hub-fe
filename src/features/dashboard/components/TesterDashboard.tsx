import { CheckCircle2, XCircle, Clock, AlertCircle, Play, ClipboardList } from "lucide-react";

const assignedCases = [
  { id: "TC-1003", title: "JWT token expiry triggers auto refresh", suite: "Auth Flow", priority: "High", status: "in-progress" },
  { id: "TC-1006", title: "Delete user — restricted to admin role", suite: "User Mgmt", priority: "Medium", status: "blocked" },
  { id: "TC-1007", title: "Assign multiple roles to single user", suite: "User Mgmt", priority: "Medium", status: "pending" },
  { id: "TC-1009", title: "Dashboard metrics aggregation — 30d window", suite: "Analytics", priority: "Low", status: "pending" },
  { id: "TC-1010", title: "Rate limit enforced at 100 req/min", suite: "API Gateway", priority: "High", status: "in-progress" },
];

const pendingExecutions = [
  { runId: "RUN-235", suite: "User Management Suite", due: "Today, EOD", cases: 38, priority: "High" },
  { runId: "RUN-236", suite: "API Gateway Tests", due: "Tomorrow", cases: 31, priority: "Medium" },
  { runId: "RUN-237", suite: "Analytics Events", due: "Jun 8", cases: 45, priority: "Low" },
];

const recentResults = [
  { id: "TC-1001", title: "Valid login with correct credentials", result: "passed", time: "Today 09:31", duration: "12s" },
  { id: "TC-1002", title: "Login fails with wrong password", result: "passed", time: "Today 09:29", duration: "8s" },
  { id: "TC-1004", title: "OAuth2 Google login — full PKCE flow", result: "passed", time: "Today 09:24", duration: "34s" },
  { id: "TC-1005", title: "Create user with valid payload", result: "passed", time: "Today 08:50", duration: "15s" },
  { id: "TC-1008", title: "Page view event tracked in analytics", result: "passed", time: "Today 08:42", duration: "9s" },
];

const priorityConfig = {
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-gray-100 text-gray-600",
};

const caseStatusConfig = {
  "in-progress": { label: "In Progress", cls: "bg-blue-50 text-blue-700" },
  blocked: { label: "Blocked", cls: "bg-amber-50 text-amber-700" },
  pending: { label: "Pending", cls: "bg-gray-100 text-gray-600" },
  passed: { label: "Passed", cls: "bg-emerald-50 text-emerald-700" },
  failed: { label: "Failed", cls: "bg-red-50 text-red-700" },
};

export function TesterDashboard() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground">My Dashboard</h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">Welcome back, Sarah Kim — QA Lead</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[11px] font-bold text-primary">SK</div>
          <div>
            <p className="text-[12px] font-medium text-foreground">Sarah Kim</p>
            <p className="text-[10px] text-muted-foreground">QA Lead · Kanban Platform</p>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Assigned Cases", value: "5", icon: ClipboardList, color: "text-blue-600 bg-blue-50" },
          { label: "Pending Runs", value: "3", icon: Play, color: "text-violet-600 bg-violet-50" },
          { label: "Passed Today", value: "5", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
          { label: "Blocked", value: "1", icon: AlertCircle, color: "text-amber-600 bg-amber-50" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-card border border-border rounded-lg p-4">
              <div className={`w-8 h-8 rounded-md flex items-center justify-center mb-2 ${s.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-[22px] font-semibold text-foreground">{s.value}</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Assigned Cases */}
        <div className="col-span-7 space-y-4">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-foreground">Assigned Test Cases</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["ID", "Title", "Suite", "Priority", "Status"].map(h => (
                    <th key={h} className="text-left px-4 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {assignedCases.map((tc) => {
                  const sc = caseStatusConfig[tc.status as keyof typeof caseStatusConfig];
                  const pc = priorityConfig[tc.priority as keyof typeof priorityConfig];
                  return (
                    <tr key={tc.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                      <td className="px-4 py-2.5 text-[11px] font-mono font-semibold text-foreground">{tc.id}</td>
                      <td className="px-4 py-2.5 text-[12px] text-foreground max-w-[160px]">
                        <span className="line-clamp-1">{tc.title}</span>
                      </td>
                      <td className="px-4 py-2.5 text-[11px] text-muted-foreground whitespace-nowrap">{tc.suite}</td>
                      <td className="px-4 py-2.5">
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${pc}`}>{tc.priority}</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${sc?.cls}`}>{sc?.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pending Executions */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-foreground">Pending Executions</h3>
            </div>
            <div className="divide-y divide-border">
              {pendingExecutions.map((ex) => (
                <div key={ex.runId} className="px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-violet-50 flex items-center justify-center flex-shrink-0">
                    <Play className="w-4 h-4 text-violet-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[12px] font-mono font-semibold text-muted-foreground">{ex.runId}</p>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${priorityConfig[ex.priority as keyof typeof priorityConfig]}`}>{ex.priority}</span>
                    </div>
                    <p className="text-[13px] font-medium text-foreground">{ex.suite}</p>
                    <p className="text-[11px] text-muted-foreground">{ex.cases} cases · Due: {ex.due}</p>
                  </div>
                  <button className="flex items-center gap-1 text-[12px] bg-primary text-primary-foreground px-2.5 py-1.5 rounded-md hover:opacity-90 transition-opacity flex-shrink-0">
                    <Play className="w-3 h-3" />
                    Run
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Results */}
        <div className="col-span-5">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-foreground">Recent Results</h3>
            </div>
            <div className="divide-y divide-border">
              {recentResults.map((r) => (
                <div key={r.id} className="px-4 py-3 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-mono text-muted-foreground">{r.id}</p>
                    <p className="text-[12px] text-foreground line-clamp-1">{r.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{r.time} · {r.duration}</p>
                  </div>
                  <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full flex-shrink-0">Pass</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
