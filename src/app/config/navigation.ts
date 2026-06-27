import {
  LayoutDashboard,
  Briefcase,
  BarChart3,
  Users,
  Settings,
  type LucideIcon,
} from "lucide-react";
import type { UserRole } from "../../features/auth/types";

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

export interface NavItem {
  id: PageType;
  label: string;
  icon: LucideIcon;
}

export const roleNavItems: Record<UserRole, NavItem[]> = {
  admin: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ],
  tester: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "workspaces", label: "Workspaces", icon: Briefcase },
    { id: "reports", label: "Reports", icon: BarChart3 },
  ],
};

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

export const workspacesData = [
  { name: "Kanban Platform", status: "connected" as const },
  { name: "E-Commerce Suite", status: "connected" as const },
  { name: "Infrastructure Team", status: "connected" as const },
  { name: "Mobile App QA", status: "pending" as const },
  { name: "Analytics Platform", status: "connected" as const },
  { name: "Security & Compliance", status: "error" as const },
  { name: "Data Engineering", status: "connected" as const },
  { name: "Frontend Guild", status: "pending" as const },
  { name: "DevOps Team", status: "pending" as const },
  { name: "QA Automation", status: "pending" as const },
  { name: "Product Management", status: "pending" as const },
];
