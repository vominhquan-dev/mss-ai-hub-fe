import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
  Link2,
  FolderOpen,
  ClipboardList,
  Play,
  Plus,
  ExternalLink,
  Clock,
  Users,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";
import { Input } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";

const stats = [
  {
    label: "Projects",
    value: "5",
    icon: FolderOpen,
    color: "text-blue-600 bg-blue-50",
  },
  {
    label: "Test Cases",
    value: "412",
    icon: ClipboardList,
    color: "text-violet-600 bg-violet-50",
  },
  {
    label: "Executions",
    value: "1,847",
    icon: Play,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    label: "Members",
    value: "12",
    icon: Users,
    color: "text-orange-600 bg-orange-50",
  },
];

const projects = [
  {
    key: "KAN",
    name: "Kanban Board Core",
    requirements: 28,
    syncStatus: "synced",
    lastSync: "2 min ago",
  },
  {
    key: "SHOP",
    name: "E-Commerce Checkout",
    requirements: 45,
    syncStatus: "synced",
    lastSync: "1h ago",
  },
  {
    key: "AUTH",
    name: "Authentication Service",
    requirements: 19,
    syncStatus: "synced",
    lastSync: "30 min ago",
  },
  {
    key: "INFRA",
    name: "Infrastructure Monitoring",
    requirements: 12,
    syncStatus: "pending",
    lastSync: "6h ago",
  },
  {
    key: "DASH",
    name: "Analytics Dashboard",
    requirements: 31,
    syncStatus: "synced",
    lastSync: "15 min ago",
  },
];

const members = [
  {
    name: "Alex Johnson",
    role: "Admin",
    email: "alex@company.com",
    joined: "Jan 2024",
  },
  {
    name: "Sarah Kim",
    role: "QA Lead",
    email: "sarah@company.com",
    joined: "Feb 2024",
  },
  {
    name: "Mike Rodriguez",
    role: "Developer",
    email: "mike@company.com",
    joined: "Mar 2024",
  },
  {
    name: "Lisa Martinez",
    role: "Tester",
    email: "lisa@company.com",
    joined: "Mar 2024",
  },
  {
    name: "Tom Brown",
    role: "Tester",
    email: "tom@company.com",
    joined: "Apr 2024",
  },
];

const activities = [
  {
    text: "Jira sync completed — 14 new requirements added",
    time: "2 min ago",
    type: "sync",
  },
  {
    text: "Test suite 'Auth Flow' passed 42/42 cases",
    time: "1h ago",
    type: "pass",
  },
  { text: "New project DASH added from Jira", time: "3h ago", type: "info" },
  {
    text: "TC-0891 marked as blocked by Mike R.",
    time: "5h ago",
    type: "warn",
  },
  {
    text: "Execution Run #228 completed with 87% pass rate",
    time: "8h ago",
    type: "pass",
  },
  {
    text: "Sarah K. added 12 test cases to AUTH suite",
    time: "1d ago",
    type: "info",
  },
];

interface WorkspaceDetailProps {
  workspaceName: string;
  workspaceStatus: "connected" | "pending" | "error";
  onBack: () => void;
  onOpenProject: (projectKey: string) => void;
}

export function WorkspaceDetail({
  workspaceName,
  workspaceStatus,
  onBack,
  onOpenProject,
}: WorkspaceDetailProps) {
  const [tab, setTab] = useState<"overview" | "members" | "projects" | "jira">(
    workspaceStatus === "pending" ? "jira" : "overview",
  );
  const [syncing, setSyncing] = useState(false);
  const [jiraUrl, setJiraUrl] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [email, setEmail] = useState("");
  const [connecting, setConnecting] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  const handleConnect = () => {
    if (!jiraUrl.trim() || !apiToken.trim() || !email.trim()) return;
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      alert("Workspace connected successfully!");
    }, 2000);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground mb-3 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Workspaces
        </button>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-[13px] font-bold text-primary">
              {workspaceName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-foreground">{workspaceName}</h1>
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                    workspaceStatus === "connected"
                      ? "text-emerald-600 bg-emerald-50"
                      : workspaceStatus === "pending"
                        ? "text-amber-600 bg-amber-50"
                        : "text-red-600 bg-red-50"
                  }`}
                >
                  {workspaceStatus === "connected" ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" /> Connected
                    </>
                  ) : workspaceStatus === "pending" ? (
                    <>
                      <Clock className="w-3 h-3" /> Not Connected
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3" /> Error
                    </>
                  )}
                </span>
              </div>
              <p className="text-muted-foreground text-[13px]">
                {workspaceStatus === "connected"
                  ? "kanban.atlassian.net"
                  : "No Jira connection"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border flex gap-0">
        {(["overview", "members", "projects", "jira"] as const).map((t) => {
          const isDisabled = workspaceStatus !== "connected" && t !== "jira";
          return (
            <button
              key={t}
              onClick={() => !isDisabled && setTab(t)}
              disabled={isDisabled}
              className={`px-4 py-2.5 text-[13px] capitalize border-b-2 -mb-px transition-colors ${
                isDisabled
                  ? "border-transparent text-muted-foreground/50 cursor-not-allowed opacity-50"
                  : tab === t
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "jira"
                ? "Jira Integration"
                : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {tab === "overview" && (
        <div className="space-y-5">
          <div className="grid grid-cols-4 gap-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="bg-card border border-border rounded-lg p-4"
                >
                  <div
                    className={`w-8 h-8 rounded-md flex items-center justify-center mb-3 ${s.color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-[24px] font-semibold text-foreground leading-none">
                    {s.value}
                  </p>
                  <p className="text-[12px] text-muted-foreground mt-1">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground">Activity Feed</h3>
              <button className="text-[12px] text-primary hover:underline">
                View all
              </button>
            </div>
            <div className="space-y-1">
              {activities.map((a, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-2.5 border-b border-border last:border-0"
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${a.type === "pass" ? "bg-emerald-500" : a.type === "warn" ? "bg-amber-500" : a.type === "sync" ? "bg-blue-500" : "bg-gray-400"}`}
                  />
                  <div className="flex-1">
                    <p className="text-[12px] text-foreground">{a.text}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {a.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Members Tab */}
      {tab === "members" && (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <p className="text-[13px] font-medium text-foreground">
              {members.length} members
            </p>
            <button className="flex items-center gap-1.5 text-[12px] bg-primary text-primary-foreground px-2.5 py-1.5 rounded-md hover:opacity-90 transition-opacity">
              <Plus className="w-3 h-3" /> Invite Member
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Email
                </th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Role
                </th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr
                  key={m.name}
                  className="border-b border-border last:border-0 hover:bg-muted/20"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                        {m.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-[13px] font-medium text-foreground">
                        {m.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground">
                    {m.email}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${m.role === "Admin" ? "bg-purple-50 text-purple-600" : m.role === "QA Lead" ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-600"}`}
                    >
                      {m.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground">
                    {m.joined}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Projects Tab */}
      {tab === "projects" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-muted-foreground">
              {projects.length} projects synced from Jira
            </p>
            <button
              onClick={handleSync}
              className="flex items-center gap-1.5 text-[13px] bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`}
              />
              Sync Projects
            </button>
          </div>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Project Key
                  </th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Project Name
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
                        className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${p.syncStatus === "synced" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}
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
                        onClick={() => onOpenProject(p.key)}
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
        </div>
      )}

      {/* Jira Integration Tab */}
      {tab === "jira" && (
        <>
          {workspaceStatus === "pending" ? (
            // Not connected - show connection form
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
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Enter your Jira Cloud instance URL
                  </p>
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
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Generate from Jira settings
                    (account.atlassian.net/manage/api-tokens)
                  </p>
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
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Your Jira account email
                  </p>
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
            // Connected - show connection details
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
                <div className="flex gap-2">
                  <button className="w-full flex items-center justify-center gap-1.5 text-[13px] border border-border bg-card text-foreground px-3 py-2 rounded-md hover:bg-muted/50 transition-colors">
                    <Link2 className="w-3.5 h-3.5" />
                    Reconnect Jira
                  </button>
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
        </>
      )}
    </div>
  );
}
