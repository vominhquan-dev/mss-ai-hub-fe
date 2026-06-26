import { UserRole } from "../contexts/AuthContext";

export type Permission =
  | "manage_users"
  | "manage_workspaces"
  | "connect_jira"
  | "sync_projects"
  | "sync_requirements"
  | "view_requirements"
  | "generate_test_cases"
  | "create_test_cases"
  | "edit_test_cases"
  | "create_test_suites"
  | "run_test_suites"
  | "view_executions"
  | "manage_settings"
  | "view_reports"
  | "manage_members";

const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    "manage_users",
    "manage_settings",
    "view_reports",
  ],
  
  tester: [
    "manage_workspaces",
    "connect_jira",
    "sync_projects",
    "sync_requirements",
    "view_requirements",
    "manage_members",
    "generate_test_cases",
    "create_test_cases",
    "edit_test_cases",
    "create_test_suites",
    "run_test_suites",
    "view_executions",
    "view_reports",
  ],
};

export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  return rolePermissions[role]?.includes(permission) ?? false;
};

export const hasAnyPermission = (
  role: UserRole,
  permissions: Permission[]
): boolean => {
  return permissions.some((permission) => hasPermission(role, permission));
};

export const hasAllPermissions = (
  role: UserRole,
  permissions: Permission[]
): boolean => {
  return permissions.every((permission) => hasPermission(role, permission));
};
