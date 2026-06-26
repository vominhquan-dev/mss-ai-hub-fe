export type UserRole = "admin" | "tester";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
  status: "active" | "inactive";
}
