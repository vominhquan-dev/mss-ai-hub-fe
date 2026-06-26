import type { User, RoleSummary } from "../types/user";

export const users: User[] = [
  {
    name: "Alex Johnson",
    email: "alex.johnson@company.com",
    role: "Admin",
    workspaces: 8,
    casesAssigned: 42,
    lastActive: "Now",
    status: "active",
  },
  {
    name: "Sarah Kim",
    email: "sarah.kim@company.com",
    role: "QA Lead",
    workspaces: 5,
    casesAssigned: 87,
    lastActive: "5 min ago",
    status: "active",
  },
  {
    name: "Mike Rodriguez",
    email: "mike.rodriguez@company.com",
    role: "Developer",
    workspaces: 3,
    casesAssigned: 24,
    lastActive: "30 min ago",
    status: "active",
  },
  {
    name: "Lisa Martinez",
    email: "lisa.martinez@company.com",
    role: "Tester",
    workspaces: 4,
    casesAssigned: 63,
    lastActive: "1h ago",
    status: "active",
  },
  {
    name: "Tom Brown",
    email: "tom.brown@company.com",
    role: "Tester",
    workspaces: 2,
    casesAssigned: 41,
    lastActive: "2h ago",
    status: "active",
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma@company.com",
    role: "QA Lead",
    workspaces: 3,
    casesAssigned: 55,
    lastActive: "3h ago",
    status: "active",
  },
  {
    name: "James Wilson",
    email: "james.wilson@company.com",
    role: "Viewer",
    workspaces: 1,
    casesAssigned: 0,
    lastActive: "2 days ago",
    status: "inactive",
  },
  {
    name: "Emma Davis",
    email: "emma.davis@company.com",
    role: "Tester",
    workspaces: 2,
    casesAssigned: 28,
    lastActive: "1 day ago",
    status: "active",
  },
];

export const roleColors: Record<string, string> = {
  Admin: "bg-purple-100 text-purple-700",
  "QA Lead": "bg-blue-100 text-blue-700",
  Developer: "bg-indigo-100 text-indigo-700",
  Tester: "bg-teal-100 text-teal-700",
  Viewer: "bg-gray-100 text-gray-600",
};

export const roleSummary: RoleSummary[] = [
  { role: "Admin", count: 1, color: "text-purple-600" },
  { role: "QA Lead", count: 2, color: "text-blue-600" },
  { role: "Developer", count: 1, color: "text-indigo-600" },
  { role: "Tester", count: 3, color: "text-teal-600" },
  { role: "Viewer", count: 1, color: "text-gray-500" },
];
