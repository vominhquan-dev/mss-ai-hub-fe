import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  FolderOpen,
  Users,
} from "lucide-react";
import { Input } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../shared/ui/dialog";

const workspaces = [
  {
    name: "Kanban Platform",
    key: "KAN",
    projects: 5,
    members: 12,
    status: "connected",
    jiraUrl: "kanban.atlassian.net",
  },
  {
    name: "E-Commerce Suite",
    key: "SHOP",
    projects: 3,
    members: 8,
    status: "connected",
    jiraUrl: "shop.atlassian.net",
  },
  {
    name: "Infrastructure Team",
    key: "INFRA",
    projects: 4,
    members: 6,
    status: "connected",
    jiraUrl: "infra.atlassian.net",
  },
  {
    name: "Mobile App QA",
    key: "MOB",
    projects: 2,
    members: 5,
    status: "pending",
    jiraUrl: "",
  },
  {
    name: "Analytics Platform",
    key: "ANL",
    projects: 3,
    members: 4,
    status: "connected",
    jiraUrl: "analytics.atlassian.net",
  },
  {
    name: "Security & Compliance",
    key: "SEC",
    projects: 2,
    members: 3,
    status: "error",
    jiraUrl: "sec.atlassian.net",
  },
  {
    name: "Data Engineering",
    key: "DATA",
    projects: 3,
    members: 6,
    status: "connected",
    jiraUrl: "data.atlassian.net",
  },
  {
    name: "Frontend Guild",
    key: "FE",
    projects: 1,
    members: 4,
    status: "pending",
    jiraUrl: "",
  },
  {
    name: "DevOps Team",
    key: "DEVOPS",
    projects: 2,
    members: 5,
    status: "pending",
    jiraUrl: "",
  },
  {
    name: "QA Automation",
    key: "QA",
    projects: 1,
    members: 3,
    status: "pending",
    jiraUrl: "",
  },
  {
    name: "Product Management",
    key: "PM",
    projects: 1,
    members: 4,
    status: "pending",
    jiraUrl: "",
  },
];

type WorkspaceStatus = "connected" | "pending" | "error";

const statusConfig: Record<
  WorkspaceStatus,
  { label: string; cls: string; icon: typeof CheckCircle2 }
> = {
  connected: {
    label: "Connected",
    cls: "bg-emerald-50 text-emerald-600",
    icon: CheckCircle2,
  },
  pending: {
    label: "Not Connected",
    cls: "bg-amber-50 text-amber-600",
    icon: Clock,
  },
  error: { label: "Error", cls: "bg-red-50 text-red-600", icon: AlertCircle },
};

export function WorkspaceList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showNewWorkspace, setShowNewWorkspace] = useState(false);
  const [newName, setNewName] = useState("");

  const filtered = workspaces.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleOpenWorkspace = (name: string) => {
    navigate(`/workspaces/${encodeURIComponent(name)}`);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground">Workspaces</h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">
            Manage your Jira-connected workspaces and projects
          </p>
        </div>
        <Button onClick={() => setShowNewWorkspace(true)}>
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          New Workspace
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search workspaces..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Workspace Cards */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map((ws) => {
          const sc = statusConfig[ws.status as WorkspaceStatus];
          const StatusIcon = sc.icon;
          return (
            <div
              key={ws.name}
              onClick={() =>
                ws.status === "connected" && handleOpenWorkspace(ws.name)
              }
              className={`bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-all ${
                ws.status === "connected"
                  ? "cursor-pointer hover:border-primary/30"
                  : "opacity-70"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-[13px] font-bold text-primary">
                    {ws.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-foreground">
                      {ws.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {ws.jiraUrl || "No connection"}
                    </p>
                  </div>
                </div>
                <button className="p-1 hover:bg-muted rounded transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div className="flex items-center gap-4 text-[12px] text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <FolderOpen className="w-3.5 h-3.5" />
                  {ws.projects} projects
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {ws.members} members
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${sc.cls}`}
                >
                  <StatusIcon className="w-3 h-3" />
                  {sc.label}
                </span>
                {ws.status === "connected" && (
                  <span className="flex items-center gap-0.5 text-[11px] text-primary font-medium">
                    Open <ExternalLink className="w-3 h-3" />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Workspace Dialog */}
      <Dialog open={showNewWorkspace} onOpenChange={setShowNewWorkspace}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Workspace</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="block text-[12px] font-medium text-foreground mb-2">
              Workspace Name
            </label>
            <Input
              placeholder="Enter workspace name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewWorkspace(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setShowNewWorkspace(false)}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
