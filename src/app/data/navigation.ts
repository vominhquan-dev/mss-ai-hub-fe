export type PageType =
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

export const workspacesData = [
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

export const breadcrumbMap: Record<PageType, string[]> = {
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

export function getSidebarPage(page: PageType): string {
  if (
    page === "workspace-detail" ||
    page === "project-detail" ||
    page === "test-case-detail"
  ) {
    return "workspaces";
  }
  if (
    page === "test-cases" ||
    page === "test-suites" ||
    page === "executions"
  ) {
    return page.split("-")[0];
  }
  return page;
}
