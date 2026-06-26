import { useState } from "react";
import { Bell, Search, ChevronRight } from "lucide-react";
import { useAuth, AuthProvider } from "../features/auth";
import { Sidebar } from "../shared";
import { LoginPage } from "../features/auth";
import { Dashboard } from "../features/dashboard";
import { WorkspaceList, WorkspaceDetail } from "../features/workspaces";
import { ProjectDetail } from "../features/projects";
import { ReportsPage } from "../features/reports";
import { UsersPage } from "../features/users";
import { SettingsPage } from "../features/settings";
import { TestCasesPage, TestCaseDetail } from "../features/test-cases";
import { TestSuitesPage } from "../features/test-suites";
import { ExecutionsPage } from "../features/executions";

const workspacesData = [
  { name: "Kanban Platform", status: "connected" },
  { name: "E-Commerce Suite", status: "connected" },
  { name: "Infrastructure Team", status: "connected" },
  { name: "Mobile App QA", status: "pending" },
  { name: "Analytics Platform", status: "connected" },
  { name: "Security & Compliance", status: "error" },
  { name: "Data Engineering", status: "connected" },
  { name: "Frontend Guild", status: "pending" },
  { name: "DevOps Team", status: "pending" },
  { name: "QA Automation", status: "pending" },
  { name: "Product Management", status: "pending" },
];

type PageType =
  | "dashboard"
  | "workspaces"
  | "workspace-detail"
  | "project-detail"
  | "test-cases"
  | "test-case-detail"
  | "test-suites"
  | "executions"
  | "reports"
  | "users"
  | "settings";

const breadcrumbMap: Record<PageType, string[]> = {
  dashboard: ["Dashboard"],
  workspaces: ["Workspaces"],
  "workspace-detail": ["Workspaces", "Workspace Detail"],
  "project-detail": ["Workspaces", "Workspace Detail", "Project Detail"],
  "test-cases": ["Workspaces", "Test Cases"],
  "test-case-detail": ["Workspaces", "Test Cases", "Test Case Detail"],
  "test-suites": ["Workspaces", "Test Suites"],
  executions: ["Executions"],
  reports: ["Reports"],
  users: ["Users"],
  settings: ["Settings"],
};

function AppContent() {
  const { user } = useAuth();
  const [page, setPage] = useState<PageType>("dashboard");
  const [workspaceName, setWorkspaceName] = useState("Kanban Platform");
  const [workspaceStatus, setWorkspaceStatus] = useState<
    "connected" | "pending" | "error"
  >("connected");
  const [projectKey, setProjectKey] = useState("KAN");
  const [testCaseId, setTestCaseId] = useState("");
  const [selectedProject, setSelectedProject] = useState("ALL");

  if (!user) {
    return <LoginPage />;
  }

  const sidebarPage =
    page === "workspace-detail" ||
    page === "project-detail" ||
    page === "test-case-detail"
      ? "workspaces"
      : page === "test-cases" || page === "test-suites" || page === "executions"
        ? page.split("-")[0]
        : page;

  const handleNavigate = (id: string) => {
    setPage(id as PageType);
  };

  const handleOpenWorkspace = (name: string) => {
    setWorkspaceName(name);
    const workspace = workspacesData.find((w) => w.name === name);
    setWorkspaceStatus(
      (workspace?.status as "connected" | "pending" | "error") || "pending",
    );
    setPage("workspace-detail");
  };

  const handleOpenProject = (key: string) => {
    setProjectKey(key);
    setPage("project-detail");
  };

  const handleOpenTestCase = (id: string) => {
    setTestCaseId(id);
    setPage("test-case-detail");
  };

  const breadcrumbs = breadcrumbMap[page] ?? [];

  return (
    <div
      className="flex h-screen bg-background overflow-hidden"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}
    >
      <Sidebar activePage={sidebarPage} onNavigate={handleNavigate} />

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-56 min-w-0">
        {/* Top bar */}
        <header className="h-12 bg-card border-b border-border flex items-center px-5 gap-4 flex-shrink-0">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && (
                  <ChevronRight className="w-3 h-3 text-muted-foreground/50 flex-shrink-0" />
                )}
                <span
                  className={`text-[12px] truncate ${
                    i === breadcrumbs.length - 1
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {crumb}
                </span>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[{ id: "dashboard", label: "Dashboard" }].map((q) => (
                <button
                  key={q.id}
                  onClick={() => setPage(q.id as PageType)}
                  className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${
                    page === q.id
                      ? "bg-accent text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>

            <div className="relative hidden lg:block">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                placeholder="Search..."
                className="pl-8 pr-3 py-1.5 w-48 text-[12px] bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>

            <button className="relative p-1.5 hover:bg-muted rounded-md transition-colors">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-[11px] text-white font-semibold cursor-pointer">
              {user.avatar}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {page === "dashboard" && <Dashboard />}
          {page === "workspaces" && (
            <WorkspaceList onOpenWorkspace={handleOpenWorkspace} />
          )}
          {page === "workspace-detail" && (
            <WorkspaceDetail
              workspaceName={workspaceName}
              workspaceStatus={workspaceStatus}
              onBack={() => setPage("workspaces")}
              onOpenProject={handleOpenProject}
            />
          )}
          {page === "project-detail" && (
            <ProjectDetail
              projectKey={projectKey}
              onBack={() => setPage("workspace-detail")}
              onOpenTestCase={handleOpenTestCase}
            />
          )}
          {page === "test-cases" && (
            <TestCasesPage
              selectedProject={selectedProject}
              onSelectProject={setSelectedProject}
            />
          )}
          {page === "test-case-detail" && (
            <TestCaseDetail
              testCaseId={testCaseId}
              onBack={() => setPage("project-detail")}
            />
          )}
          {page === "test-suites" && (
            <TestSuitesPage
              selectedProject={selectedProject}
              onSelectProject={setSelectedProject}
            />
          )}
          {page === "executions" && (
            <ExecutionsPage
              selectedProject={selectedProject}
              onSelectProject={setSelectedProject}
            />
          )}
          {page === "reports" && <ReportsPage />}
          {page === "users" && <UsersPage />}
          {page === "settings" && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
