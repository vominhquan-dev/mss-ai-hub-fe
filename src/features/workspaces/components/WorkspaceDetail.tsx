import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  Link2,
  FolderKanban,
} from "lucide-react";
import { Input } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../shared/ui/tabs";

const projects = [
  {
    key: "KAN",
    name: "Kanban Platform",
    requirements: 127,
    syncStatus: "synced",
    lastSync: "2 min ago",
  },
  {
    key: "AUTH",
    name: "Authentication Service",
    requirements: 42,
    syncStatus: "synced",
    lastSync: "5 min ago",
  },
  {
    key: "DASH",
    name: "Dashboard Analytics",
    requirements: 18,
    syncStatus: "synced",
    lastSync: "10 min ago",
  },
  {
    key: "INFRA",
    name: "Infrastructure & DevOps",
    requirements: 34,
    syncStatus: "synced",
    lastSync: "1 hour ago",
  },
  {
    key: "MOB",
    name: "Mobile App",
    requirements: 56,
    syncStatus: "pending",
    lastSync: "N/A",
  },
];

const workspaceData: Record<
  string,
  { name: string; key: string; status: string }
> = {
  "Kanban Platform": {
    name: "Kanban Platform",
    key: "KAN",
    status: "connected",
  },
  "E-Commerce Suite": {
    name: "E-Commerce Suite",
    key: "SHOP",
    status: "connected",
  },
  "Infrastructure Team": {
    name: "Infrastructure Team",
    key: "INFRA",
    status: "connected",
  },
};

export function WorkspaceDetail() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const decodedName = decodeURIComponent(name || "");
  const ws = workspaceData[decodedName];
  const [tab, setTab] = useState("projects");
  const [jiraUrl, setJiraUrl] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [email, setEmail] = useState("");
  const [connecting, setConnecting] = useState(false);

  const workspaceStatus = ws?.status ?? "pending";

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
    }, 1000);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/workspaces")}
            className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; Back to Workspaces
          </button>
        </div>
        <h1 className="text-foreground">{decodedName}</h1>
        <div />
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="projects">
            <FolderKanban className="w-3.5 h-3.5 mr-1.5" />
            Projects
          </TabsTrigger>
          <TabsTrigger value="jira">
            <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
            Jira Integration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          {/* Search */}
          <div className="relative max-w-md mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search projects..." className="pl-9" />
          </div>

          {/* Projects Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Key
                  </th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Requirements
                  </th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Sync Status
                  </th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Last Sync
                  </th>
                  <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr
                    key={p.key}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="text-[12px] font-mono font-bold text-primary bg-blue-50 px-2 py-0.5 rounded">
                        {p.key}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[13px] font-medium text-foreground">
                      {p.name}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-foreground">
                      {p.requirements}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                          p.syncStatus === "synced"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {p.syncStatus === "synced" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {p.syncStatus.charAt(0).toUpperCase() +
                          p.syncStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-muted-foreground">
                      {p.lastSync}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() =>
                          navigate(
                            `/workspaces/${encodeURIComponent(decodedName)}/projects/${p.key}`,
                          )
                        }
                        className="text-[12px] text-primary hover:bg-accent px-2.5 py-1 rounded-md transition-colors font-medium"
                      >
                        Open Project
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="jira">
          {workspaceStatus === "pending" ? (
            <div className="bg-card border border-border rounded-lg p-8 max-w-2xl">
              <div className="mb-6">
                <h2 className="text-foreground text-lg font-semibold mb-2">
                  Connect to Jira
                </h2>
                <p className="text-muted-foreground text-[13px]">
                  Enter your Jira credentials to connect this workspace and sync
                  projects
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] font-medium text-foreground mb-2">
                    Jira URL
                  </label>
                  <Input
                    type="url"
                    placeholder="https://your-domain.atlassian.net"
                    value={jiraUrl}
                    onChange={(e) => setJiraUrl(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-foreground mb-2">
                    API Token
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter your API token"
                    value={apiToken}
                    onChange={(e) => setApiToken(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="your-email@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleConnect}
                  disabled={
                    !jiraUrl.trim() ||
                    !apiToken.trim() ||
                    !email.trim() ||
                    connecting
                  }
                  className="w-full"
                >
                  <Link2 className="w-3.5 h-3.5 mr-2" />
                  {connecting ? "Connecting..." : "Connect Jira"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-5">
                  <h3 className="text-foreground mb-4">Connection Details</h3>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Jira URL",
                        value: "https://kanban.atlassian.net",
                        icon: ExternalLink,
                      },
                      {
                        label: "Connection Status",
                        value: "Active & Healthy",
                        icon: CheckCircle2,
                      },
                      {
                        label: "Last Full Sync",
                        value: "June 6, 2026 — 09:42 AM",
                        icon: Clock,
                      },
                      {
                        label: "API Version",
                        value: "Jira REST API v3",
                        icon: Link2,
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.label}
                          className="flex items-start gap-3"
                        >
                          <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-[11px] text-muted-foreground">
                              {item.label}
                            </p>
                            <p className="text-[13px] text-foreground font-medium">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="text-foreground mb-4">Sync History</h3>
                <div className="space-y-3">
                  {[
                    {
                      event: "Incremental Sync",
                      items: "14 issues updated",
                      time: "Today, 09:42",
                      status: "success",
                    },
                    {
                      event: "Full Sync",
                      items: "142 issues processed",
                      time: "Today, 06:00",
                      status: "success",
                    },
                    {
                      event: "Incremental Sync",
                      items: "3 issues updated",
                      time: "Yesterday, 18:30",
                      status: "success",
                    },
                    {
                      event: "Incremental Sync",
                      items: "Failed — timeout",
                      time: "Yesterday, 12:15",
                      status: "error",
                    },
                    {
                      event: "Full Sync",
                      items: "138 issues processed",
                      time: "Yesterday, 06:00",
                      status: "success",
                    },
                  ].map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-2 border-b border-border last:border-0"
                    >
                      <div
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${h.status === "success" ? "bg-emerald-500" : "bg-red-500"}`}
                      />
                      <div className="flex-1">
                        <p className="text-[12px] font-medium text-foreground">
                          {h.event}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {h.items}
                        </p>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        {h.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
