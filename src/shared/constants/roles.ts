export const ROLES = {
  ADMIN: "admin" as const,
  TESTER: "tester" as const,
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABELS: Record<Role, string> = {
  [ROLES.ADMIN]: "Administrator",
  [ROLES.TESTER]: "Tester",
};
