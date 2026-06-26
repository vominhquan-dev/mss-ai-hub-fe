export interface User {
  name: string;
  email: string;
  role: "Admin" | "QA Lead" | "Developer" | "Tester" | "Viewer";
  workspaces: number;
  casesAssigned: number;
  lastActive: string;
  status: "active" | "inactive";
}

export type UserRole = User["role"];

export interface RoleSummary {
  role: UserRole;
  count: number;
  color: string;
}
