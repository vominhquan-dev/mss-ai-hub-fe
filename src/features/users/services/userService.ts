import type { User } from "../types/user";
import { users } from "../api/userApi";

export function getUsers(): User[] {
  return users;
}

export function getUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

export function getUsersByRole(role: string): User[] {
  return users.filter((u) => u.role === role);
}

export function getActiveUsers(): User[] {
  return users.filter((u) => u.status === "active");
}
