import { Dashboard } from "../../features/dashboard";
import { WorkspaceList, WorkspaceDetail } from "../../features/workspaces";
import { ProjectDetail } from "../../features/projects";
import { ReportsPage } from "../../features/reports";
import { UsersPage } from "../../features/users";
import { SettingsPage } from "../../features/settings";
import { TestCasesPage, TestCaseDetail } from "../../features/test-cases";
import { TestSuitesPage } from "../../features/test-suites";
import { ExecutionsPage } from "../../features/executions";
import { PageType } from "../data/navigation";

interface PageRendererProps {
  page: PageType;
  workspaceName: string;
  workspaceStatus: "connected" | "pending" | "error";
  projectKey: string;
  testCaseId: string;
  selectedProject: string;
  onNavigate: (page: PageType) => void;
  onOpenWorkspace: (name: string) => void;
  onOpenProject: (key: string) => void;
  onOpenTestCase: (id: string) => void;
  onSelectProject: (project: string) => void;
}

export function PageRenderer({
  page,
  workspaceName,
  workspaceStatus,
  projectKey,
  testCaseId,
  selectedProject,
  onNavigate,
  onOpenWorkspace,
  onOpenProject,
  onOpenTestCase,
  onSelectProject,
}: PageRendererProps) {
  switch (page) {
    case "dashboard":
      return <Dashboard />;
    case "workspaces":
      return <WorkspaceList onOpenWorkspace={onOpenWorkspace} />;
    case "workspace-detail":
      return (
        <WorkspaceDetail
          workspaceName={workspaceName}
          workspaceStatus={workspaceStatus}
          onBack={() => onNavigate("workspaces")}
          onOpenProject={onOpenProject}
        />
      );
    case "project-detail":
      return (
        <ProjectDetail
          projectKey={projectKey}
          onBack={() => onNavigate("workspace-detail")}
          onOpenTestCase={onOpenTestCase}
        />
      );
    case "test-cases":
      return (
        <TestCasesPage
          selectedProject={selectedProject}
          onSelectProject={onSelectProject}
        />
      );
    case "test-case-detail":
      return (
        <TestCaseDetail
          testCaseId={testCaseId}
          onBack={() => onNavigate("project-detail")}
        />
      );
    case "test-suites":
      return (
        <TestSuitesPage
          selectedProject={selectedProject}
          onSelectProject={onSelectProject}
        />
      );
    case "executions":
      return (
        <ExecutionsPage
          selectedProject={selectedProject}
          onSelectProject={onSelectProject}
        />
      );
    case "reports":
      return <ReportsPage />;
    case "users":
      return <UsersPage />;
    case "settings":
      return <SettingsPage />;
    default:
      return null;
  }
}
