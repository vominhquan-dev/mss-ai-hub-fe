import { Plus, Search, Filter, Tag, TrendingUp, AlertCircle } from "lucide-react";
import { useState } from "react";

const allRequirements = [
  // KAN Project
  { 
    key: "KAN-9", 
    summary: "Authentication Service — OAuth2 + JWT token flow", 
    type: "Story", 
    priority: "High", 
    status: "In Progress", 
    assignee: "Sarah K.",
    project: "KAN"
  },
  { 
    key: "KAN-16", 
    summary: "User Management Service — CRUD operations & roles", 
    type: "Story", 
    priority: "High", 
    status: "In Progress", 
    assignee: "Mike R.",
    project: "KAN"
  },
  { 
    key: "KAN-18", 
    summary: "Analytics Service — Event tracking & dashboard data", 
    type: "Story", 
    priority: "Medium", 
    status: "To Do", 
    assignee: "Tom B.",
    project: "KAN"
  },
  { 
    key: "KAN-22", 
    summary: "Notification System — Email + in-app push alerts", 
    type: "Story", 
    priority: "Medium", 
    status: "In Review", 
    assignee: "Lisa M.",
    project: "KAN"
  },
  { 
    key: "KAN-24", 
    summary: "Payment Gateway Integration — Stripe & PayPal", 
    type: "Epic", 
    priority: "Critical", 
    status: "In Progress", 
    assignee: "Alex J.",
    project: "KAN"
  },
  { 
    key: "KAN-27", 
    summary: "Search & Indexing — Full-text search with Elasticsearch", 
    type: "Story", 
    priority: "Low", 
    status: "To Do", 
    assignee: "Tom B.",
    project: "KAN"
  },
  // SHOP Project
  { 
    key: "SHOP-5", 
    summary: "Shopping Cart Optimization — Performance & UX", 
    type: "Epic", 
    priority: "High", 
    status: "In Progress", 
    assignee: "Alex J.",
    project: "SHOP"
  },
  { 
    key: "SHOP-12", 
    summary: "Checkout Flow Redesign — Mobile-first UI", 
    type: "Story", 
    priority: "Critical", 
    status: "In Review", 
    assignee: "Sarah K.",
    project: "SHOP"
  },
  { 
    key: "SHOP-19", 
    summary: "Inventory Management System", 
    type: "Story", 
    priority: "High", 
    status: "In Progress", 
    assignee: "Mike R.",
    project: "SHOP"
  },
  // AUTH Project
  { 
    key: "AUTH-8", 
    summary: "Multi-factor Authentication (MFA)", 
    type: "Story", 
    priority: "Critical", 
    status: "In Progress", 
    assignee: "Sarah K.",
    project: "AUTH"
  },
  { 
    key: "AUTH-14", 
    summary: "SAML 2.0 SSO Integration", 
    type: "Epic", 
    priority: "High", 
    status: "To Do", 
    assignee: "Mike R.",
    project: "AUTH"
  },
  // INFRA Project
  { 
    key: "INFRA-6", 
    summary: "Kubernetes Cluster Migration", 
    type: "Epic", 
    priority: "Critical", 
    status: "In Progress", 
    assignee: "Tom B.",
    project: "INFRA"
  },
  { 
    key: "INFRA-11", 
    summary: "Monitoring & Alerting System", 
    type: "Story", 
    priority: "High", 
    status: "In Review", 
    assignee: "Alex J.",
    project: "INFRA"
  },
  // DASH Project
  { 
    key: "DASH-4", 
    summary: "Real-time Dashboard Data Pipeline", 
    type: "Epic", 
    priority: "High", 
    status: "In Progress", 
    assignee: "Lisa M.",
    project: "DASH"
  },
];

const priorityConfig = {
  Critical: { color: "bg-red-50 text-red-700 border-red-200" },
  High: { color: "bg-orange-50 text-orange-700 border-orange-200" },
  Medium: { color: "bg-blue-50 text-blue-700 border-blue-200" },
  Low: { color: "bg-slate-50 text-slate-700 border-slate-200" },
};

const statusConfig = {
  "To Do": { color: "bg-slate-100 text-slate-700", icon: null },
  "In Progress": { color: "bg-blue-100 text-blue-700", icon: "🔵" },
  "In Review": { color: "bg-purple-100 text-purple-700", icon: "👀" },
  Done: { color: "bg-green-100 text-green-700", icon: "✅" },
};

interface RequirementsPageProps {
  selectedProject: string;
  onSelectProject: (project: string) => void;
}

export function RequirementsPage({ selectedProject, onSelectProject }: RequirementsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRequirements = allRequirements.filter(req => {
    const matchesProject = selectedProject === "ALL" || req.project === selectedProject;
    const matchesSearch = req.summary.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.key.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesProject && matchesSearch;
  });

  const projects = ["KAN", "SHOP", "AUTH", "INFRA", "DASH"];

  const stats = {
    total: filteredRequirements.length,
    inProgress: filteredRequirements.filter(r => r.status === "In Progress").length,
    critical: filteredRequirements.filter(r => r.priority === "Critical").length,
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground">Requirements</h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">All project requirements and features</p>
        </div>
        <button className="flex items-center gap-1.5 text-[13px] bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">
          <Plus className="w-3.5 h-3.5" />
          New Requirement
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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-[24px] font-semibold text-foreground">{stats.total}</p>
          <p className="text-[12px] text-muted-foreground mt-0.5">Total Requirements</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-[24px] font-semibold text-blue-600">{stats.inProgress}</p>
          <p className="text-[12px] text-muted-foreground mt-0.5">In Progress</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-[24px] font-semibold text-red-600">{stats.critical}</p>
          <p className="text-[12px] text-muted-foreground mt-0.5">Critical Priority</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search requirements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-[13px] placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Requirements List */}
      <div className="space-y-2">
        {filteredRequirements.map((req) => {
          const priorityConfig_ = priorityConfig[req.priority as keyof typeof priorityConfig];
          const statusConfig_ = statusConfig[req.status as keyof typeof statusConfig];
          return (
            <div key={req.key} className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-all group cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <Tag className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] font-mono font-bold text-primary">{req.key}</p>
                    <p className="text-[13px] font-medium text-foreground mt-0.5">{req.summary}</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-primary bg-blue-50 px-2 py-1 rounded">{req.project}</span>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <span className={`text-[11px] font-medium px-2 py-1 rounded border ${priorityConfig_?.color}`}>
                  {req.priority}
                </span>
                <span className={`text-[11px] font-medium px-2 py-1 rounded ${statusConfig_?.color}`}>
                  {req.status}
                </span>
                <span className="text-[11px] px-2 py-1 rounded bg-muted text-muted-foreground">{req.type}</span>
                <span className="text-[11px] text-muted-foreground ml-auto">Assigned: {req.assignee}</span>
              </div>
            </div>
          );
        })}
        {filteredRequirements.length === 0 && (
          <div className="bg-card border border-dashed border-border rounded-lg p-12 text-center">
            <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-[13px] text-muted-foreground">No requirements found</p>
          </div>
        )}
      </div>
    </div>
  );
}
