import { useState } from "react";
import { FolderOpen, Search, ChevronRight, ChevronDown } from "lucide-react";

const workspaces = [
  { id: "kanban-platform", name: "Kanban Platform" },
  { id: "ecommerce-suite", name: "E-Commerce Suite" },
  { id: "infra-team", name: "Infrastructure Team" },
  { id: "mobile-qa", name: "Mobile App QA" },
  { id: "analytics-platform", name: "Analytics Platform" },
  { id: "security-compliance", name: "Security & Compliance" },
  { id: "data-eng", name: "Data Engineering" },
  { id: "frontend-guild", name: "Frontend Guild" },
];

const allProjects = [
  // Kanban Platform
  { key: "KAN", name: "Kanban Board Core", workspace: "kanban-platform", requirements: 28, testCases: 112, suites: 5, lastSync: "2 min ago" },
  { key: "KAN-API", name: "Kanban API Service", workspace: "kanban-platform", requirements: 15, testCases: 78, suites: 3, lastSync: "45 min ago" },
  { key: "KAN-UI", name: "Kanban UI Components", workspace: "kanban-platform", requirements: 22, testCases: 95, suites: 4, lastSync: "1h ago" },
  { key: "KAN-PERF", name: "Performance & Scaling", workspace: "kanban-platform", requirements: 18, testCases: 67, suites: 3, lastSync: "3h ago" },
  { key: "KAN-SEC", name: "Security Testing", workspace: "kanban-platform", requirements: 12, testCases: 56, suites: 2, lastSync: "5h ago" },
  
  // E-Commerce Suite
  { key: "SHOP", name: "E-Commerce Checkout", workspace: "ecommerce-suite", requirements: 45, testCases: 234, suites: 8, lastSync: "1h ago" },
  { key: "SHOP-PAY", name: "Payment Gateway", workspace: "ecommerce-suite", requirements: 31, testCases: 156, suites: 6, lastSync: "30 min ago" },
  { key: "SHOP-CART", name: "Shopping Cart", workspace: "ecommerce-suite", requirements: 24, testCases: 118, suites: 5, lastSync: "2h ago" },
  
  // Authentication Service & Infrastructure
  { key: "AUTH", name: "Authentication Service", workspace: "infra-team", requirements: 19, testCases: 87, suites: 4, lastSync: "30 min ago" },
  { key: "INFRA", name: "Infrastructure Monitoring", workspace: "infra-team", requirements: 12, testCases: 56, suites: 3, lastSync: "6h ago" },
  { key: "INFRA-LOG", name: "Logging & Observability", workspace: "infra-team", requirements: 14, testCases: 62, suites: 3, lastSync: "4h ago" },
  { key: "INFRA-DB", name: "Database Management", workspace: "infra-team", requirements: 16, testCases: 74, suites: 3, lastSync: "2h ago" },
  
  // Mobile App QA
  { key: "MOBILE", name: "iOS App Testing", workspace: "mobile-qa", requirements: 35, testCases: 189, suites: 7, lastSync: "1h ago" },
  { key: "MOBILE-AND", name: "Android App Testing", workspace: "mobile-qa", requirements: 38, testCases: 201, suites: 7, lastSync: "50 min ago" },
  { key: "MOBILE-API", name: "Mobile Backend API", workspace: "mobile-qa", requirements: 20, testCases: 98, suites: 4, lastSync: "1h 30 min ago" },
  { key: "MOBILE-SYNC", name: "Sync & Offline Mode", workspace: "mobile-qa", requirements: 25, testCases: 124, suites: 5, lastSync: "2h ago" },
  { key: "MOBILE-PERF", name: "Mobile Performance", workspace: "mobile-qa", requirements: 18, testCases: 76, suites: 3, lastSync: "45 min ago" },
  { key: "MOBILE-PUSH", name: "Push Notifications", workspace: "mobile-qa", requirements: 12, testCases: 54, suites: 2, lastSync: "3h ago" },
  
  // Analytics Platform
  { key: "DASH", name: "Analytics Dashboard", workspace: "analytics-platform", requirements: 31, testCases: 145, suites: 6, lastSync: "15 min ago" },
  { key: "DASH-REPORT", name: "Reporting Engine", workspace: "analytics-platform", requirements: 28, testCases: 132, suites: 5, lastSync: "40 min ago" },
  
  // Data Engineering
  { key: "DATA", name: "Data Pipeline", workspace: "data-eng", requirements: 22, testCases: 98, suites: 4, lastSync: "2h ago" },
  { key: "DATA-ETL", name: "ETL Processes", workspace: "data-eng", requirements: 19, testCases: 87, suites: 3, lastSync: "1h ago" },
  { key: "DATA-WAREHOUSE", name: "Data Warehouse", workspace: "data-eng", requirements: 26, testCases: 112, suites: 4, lastSync: "3h ago" },
];

interface ProjectListProps {
  onSelectProject: (projectKey: string) => void;
}

export function ProjectList({ onSelectProject }: ProjectListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(null);
  const [showWorkspaceDropdown, setShowWorkspaceDropdown] = useState(false);

  const filteredProjects = allProjects
    .filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.key.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesWorkspace = !selectedWorkspace || p.workspace === selectedWorkspace;
      return matchesSearch && matchesWorkspace;
    });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-foreground">Projects</h1>
        <p className="text-muted-foreground text-[13px] mt-0.5">Select a project to manage test cases and executions</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        {/* Workspace Filter */}
        <div className="relative">
          <button
            onClick={() => setShowWorkspaceDropdown(!showWorkspaceDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-md text-[13px] text-foreground hover:bg-muted transition-colors"
          >
            <span className="font-medium">{selectedWorkspace ? workspaces.find(w => w.id === selectedWorkspace)?.name || "Select Workspace" : "All Workspaces"}</span>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
          
          {showWorkspaceDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded-md shadow-lg z-10 min-w-[200px]">
              <button
                onClick={() => {
                  setSelectedWorkspace(null);
                  setShowWorkspaceDropdown(false);
                }}
                className="w-full text-left px-3 py-2 text-[13px] hover:bg-muted transition-colors"
              >
                All Workspaces
              </button>
              {workspaces.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => {
                    setSelectedWorkspace(ws.id);
                    setShowWorkspaceDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-[13px] transition-colors ${
                    selectedWorkspace === ws.id ? "bg-accent text-primary font-medium" : "hover:bg-muted"
                  }`}
                >
                  {ws.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-3 py-1.5 w-full text-[13px] bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredProjects.map((project) => {
          const workspace = workspaces.find(w => w.id === project.workspace);
          return (
            <button
              key={project.key}
              onClick={() => onSelectProject(project.key)}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-md hover:border-primary/50 transition-all text-left group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-[13px] font-bold text-primary">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono font-semibold text-muted-foreground block">{project.key}</span>
                  <span className="text-[9px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded mt-1 inline-block">{workspace?.name}</span>
                </div>
              </div>

              {/* Name */}
              <h3 className="text-[13px] font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {project.name}
              </h3>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 mb-3 pt-3 border-t border-border">
                <div>
                  <p className="text-[10px] text-muted-foreground">Requirements</p>
                  <p className="text-[13px] font-semibold text-foreground">{project.requirements}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Test Cases</p>
                  <p className="text-[13px] font-semibold text-foreground">{project.testCases}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Suites</p>
                  <p className="text-[13px] font-semibold text-foreground">{project.suites}</p>
                </div>
              </div>

              {/* Last Sync */}
              <p className="text-[11px] text-muted-foreground">Last sync: {project.lastSync}</p>

              {/* Arrow */}
              <div className="mt-3 flex items-center justify-end">
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </button>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground">No projects found</p>
        </div>
      )}
    </div>
  );
}
