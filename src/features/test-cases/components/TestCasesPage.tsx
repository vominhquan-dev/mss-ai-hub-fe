import { Plus, Search, Edit2, ChevronDown } from "lucide-react";

const allTestCases = [
  { id: "TC-1001", title: "Valid login with correct credentials", suite: "Authentication Flow", linked: "KAN-9", priority: "High", status: "passed", assignee: "Sarah K." },
  { id: "TC-1002", title: "Login fails with wrong password (400 response)", suite: "Authentication Flow", linked: "KAN-9", priority: "High", status: "passed", assignee: "Sarah K." },
  { id: "TC-1003", title: "JWT token expiry triggers auto refresh", suite: "Authentication Flow", linked: "KAN-9", priority: "High", status: "failed", assignee: "Mike R." },
  { id: "TC-1004", title: "OAuth2 Google login — full PKCE flow", suite: "Authentication Flow", linked: "KAN-9", priority: "Critical", status: "passed", assignee: "Sarah K." },
  { id: "TC-1005", title: "Create user with valid payload returns 201", suite: "User Management", linked: "KAN-16", priority: "High", status: "passed", assignee: "Mike R." },
  { id: "TC-1006", title: "Delete user — restricted to admin role", suite: "User Management", linked: "KAN-16", priority: "Medium", status: "blocked", assignee: "Lisa M." },
  { id: "TC-1007", title: "Assign multiple roles to single user", suite: "User Management", linked: "KAN-16", priority: "Medium", status: "pending", assignee: "Tom B." },
  { id: "TC-1008", title: "Page view event tracked in analytics", suite: "Analytics Events", linked: "KAN-18", priority: "Medium", status: "passed", assignee: "Lisa M." },
  { id: "TC-1009", title: "Dashboard metrics aggregation — 30d window", suite: "Analytics Events", linked: "KAN-18", priority: "Low", status: "pending", assignee: "Tom B." },
  { id: "TC-1010", title: "Rate limit enforced at 100 req/min per API key", suite: "API Gateway Tests", linked: "KAN-37", priority: "High", status: "failed", assignee: "Alex J." },
  { id: "TC-1011", title: "Stripe payment success — webhook received", suite: "Payment Processing", linked: "SHOP-24", priority: "Critical", status: "passed", assignee: "Alex J." },
  { id: "TC-1012", title: "PayPal checkout — cancel flow returns gracefully", suite: "Payment Processing", linked: "SHOP-24", priority: "High", status: "passed", assignee: "Mike R." },
  { id: "TC-1013", title: "Email notification sent on order confirmation", suite: "Notification Service", linked: "KAN-22", priority: "Medium", status: "passed", assignee: "Sarah K." },
  { id: "TC-1014", title: "SAML 2.0 SSO handshake — Okta provider", suite: "SSO Login Flow", linked: "AUTH-41", priority: "Critical", status: "passed", assignee: "Alex J." },
];

const priorityConfig = {
  Critical: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-gray-100 text-gray-600",
};

const statusConfig = {
  passed: "bg-emerald-50 text-emerald-700",
  failed: "bg-red-50 text-red-700",
  blocked: "bg-amber-50 text-amber-700",
  pending: "bg-gray-100 text-gray-600",
};

const statusLabel = {
  passed: "Passed",
  failed: "Failed",
  blocked: "Blocked",
  pending: "Pending",
};

interface TestCasesPageProps {
  selectedProject: string;
  onSelectProject: (project: string) => void;
}

export function TestCasesPage({ selectedProject, onSelectProject }: TestCasesPageProps) {
  const getProjectFromLinked = (linked: string) => linked.split("-")[0];
  
  const filteredTestCases = selectedProject === "ALL" 
    ? allTestCases 
    : allTestCases.filter(tc => getProjectFromLinked(tc.linked) === selectedProject);
  
  const counts = {
    passed: filteredTestCases.filter(t => t.status === "passed").length,
    failed: filteredTestCases.filter(t => t.status === "failed").length,
    blocked: filteredTestCases.filter(t => t.status === "blocked").length,
    pending: filteredTestCases.filter(t => t.status === "pending").length,
  };

  const projects = ["KAN", "SHOP", "AUTH", "INFRA", "DASH"];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground">Test Cases</h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">All test cases across projects</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-[13px] border border-border bg-card text-foreground px-3 py-1.5 rounded-md hover:bg-muted/50 transition-colors">
            <Edit2 className="w-3.5 h-3.5" />
            Edit Test Case
          </button>
          <button className="flex items-center gap-1.5 text-[13px] bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" />
            Create Test Case
          </button>
        </div>
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

      {/* Status summary */}
      <div className="grid grid-cols-4 gap-3">
        {(["passed", "failed", "blocked", "pending"] as const).map(s => (
          <div key={s} className={`rounded-lg border px-4 py-3 ${s === "passed" ? "border-emerald-200 bg-emerald-50" : s === "failed" ? "border-red-200 bg-red-50" : s === "blocked" ? "border-amber-200 bg-amber-50" : "border-gray-200 bg-gray-50"}`}>
            <p className={`text-[22px] font-semibold ${s === "passed" ? "text-emerald-700" : s === "failed" ? "text-red-700" : s === "blocked" ? "text-amber-700" : "text-gray-600"}`}>{counts[s]}</p>
            <p className={`text-[12px] font-medium capitalize ${s === "passed" ? "text-emerald-600" : s === "failed" ? "text-red-600" : s === "blocked" ? "text-amber-600" : "text-gray-500"}`}>{statusLabel[s]}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input placeholder="Search test cases..." className="pl-8 pr-3 py-1.5 w-full text-[13px] bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring/30" />
        </div>
        {["All Suite", "All Priority", "All Status"].map(f => (
          <div key={f} className="flex items-center gap-1 text-[13px] bg-card border border-border rounded-md px-2.5 py-1.5 text-muted-foreground cursor-pointer hover:bg-muted/40 transition-colors">
            {f}
            <ChevronDown className="w-3 h-3" />
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Test Case ID", "Title", "Suite", "Linked Req.", "Priority", "Status", "Assignee", ""].map(h => (
                <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTestCases.map((tc) => {
              const sc = statusConfig[tc.status as keyof typeof statusConfig];
              const sl = statusLabel[tc.status as keyof typeof statusLabel];
              const pc = priorityConfig[tc.priority as keyof typeof priorityConfig];
              return (
                <tr key={tc.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 text-[12px] font-mono font-semibold text-foreground whitespace-nowrap">{tc.id}</td>
                  <td className="px-4 py-3 text-[13px] text-foreground max-w-[220px]">
                    <span className="line-clamp-1">{tc.title}</span>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground whitespace-nowrap">{tc.suite}</td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] font-mono text-primary bg-blue-50 px-1.5 py-0.5 rounded">{tc.linked}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded whitespace-nowrap ${pc}`}>{tc.priority}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${sc}`}>{sl}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary">
                        {tc.assignee.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-[12px] text-muted-foreground whitespace-nowrap">{tc.assignee}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-[12px] text-primary hover:bg-accent px-2 py-0.5 rounded transition-colors font-medium">Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-[12px] text-muted-foreground">{filteredTestCases.length} test cases</p>
    </div>
  );
}
