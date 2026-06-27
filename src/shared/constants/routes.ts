export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/",
  PROJECTS: "/projects",
  WORKSPACES: "/workspaces",
  WORKSPACE_DETAIL: "/workspaces/:name",
  PROJECT_DETAIL: "/workspaces/:name/projects/:key",
  TEST_CASES: "/test-cases",
  TEST_CASE_DETAIL: "/test-cases/:id",
  TEST_SUITES: "/test-suites",
  EXECUTIONS: "/executions",
  REPORTS: "/reports",
  USERS: "/users",
  SETTINGS: "/settings",
  REQUIREMENTS: "/requirements",
  USER_STORIES: "/user-stories",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
