import {
  Briefcase,
  Link2,
  FolderOpen,
  ClipboardList,
  Play,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const kpis: {
  label: string;
  value: string;
  icon: LucideIcon;
  change: string;
  color: string;
}[] = [
  {
    label: "Total Workspaces",
    value: "8",
    icon: Briefcase,
    change: "+2 this month",
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Connected Workspaces",
    value: "6",
    icon: Link2,
    change: "75% connected",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    label: "Total Projects",
    value: "24",
    icon: FolderOpen,
    change: "+5 this month",
    color: "bg-violet-50 text-violet-600",
  },
  {
    label: "Total Test Cases",
    value: "1,842",
    icon: ClipboardList,
    change: "+148 this week",
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    label: "Total Executions",
    value: "9,231",
    icon: Play,
    change: "+312 today",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Pass Rate",
    value: "87.4%",
    icon: TrendingUp,
    change: "+2.1% vs last week",
    color: "bg-green-50 text-green-600",
  },
];

export const trendData = [
  { date: "May 27", passed: 42, failed: 8, blocked: 3 },
  { date: "May 28", passed: 58, failed: 12, blocked: 2 },
  { date: "May 29", passed: 71, failed: 9, blocked: 4 },
  { date: "May 30", passed: 65, failed: 15, blocked: 6 },
  { date: "May 31", passed: 84, failed: 11, blocked: 2 },
  { date: "Jun 1", passed: 92, failed: 8, blocked: 5 },
  { date: "Jun 2", passed: 78, failed: 14, blocked: 3 },
  { date: "Jun 3", passed: 105, failed: 10, blocked: 1 },
  { date: "Jun 4", passed: 118, failed: 13, blocked: 4 },
  { date: "Jun 5", passed: 134, failed: 7, blocked: 2 },
  { date: "Jun 6", passed: 98, failed: 11, blocked: 3 },
];

export const pieData = [
  { name: "Passed", value: 874, color: "#36B37E" },
  { name: "Failed", value: 112, color: "#DE350B" },
  { name: "Blocked", value: 54, color: "#FF991F" },
  { name: "Not Run", value: 802, color: "#DFE1E6" },
];

export const coverageData = [
  { project: "KAN", covered: 92, uncovered: 8 },
  { project: "SHOP", covered: 78, uncovered: 22 },
  { project: "AUTH", covered: 65, uncovered: 35 },
  { project: "INFRA", covered: 45, uncovered: 55 },
  { project: "API", covered: 88, uncovered: 12 },
];

export const activities: {
  icon: LucideIcon;
  color: string;
  text: string;
  time: string;
  user: string;
}[] = [
  {
    icon: CheckCircle2,
    color: "text-emerald-500",
    text: "Test Suite 'Authentication Flow' passed all 42 cases",
    time: "2 min ago",
    user: "Sarah K.",
  },
  {
    icon: XCircle,
    color: "text-red-500",
    text: "TC-1042 'Login with invalid token' failed in staging",
    time: "15 min ago",
    user: "Mike R.",
  },
  {
    icon: Play,
    color: "text-blue-500",
    text: "Execution Run #234 started for 'User Management Suite'",
    time: "32 min ago",
    user: "Alex J.",
  },
  {
    icon: AlertCircle,
    color: "text-amber-500",
    text: "TC-0891 'Checkout flow' marked as blocked",
    time: "1h ago",
    user: "Lisa M.",
  },
  {
    icon: ClipboardList,
    color: "text-violet-500",
    text: "28 new test cases created from KAN sprint requirements",
    time: "2h ago",
    user: "Tom B.",
  },
  {
    icon: Link2,
    color: "text-indigo-500",
    text: "Jira sync completed for SHOP project — 14 new stories",
    time: "3h ago",
    user: "System",
  },
  {
    icon: CheckCircle2,
    color: "text-emerald-500",
    text: "Test Suite 'Checkout Flow' passed 97% (58/60 cases)",
    time: "4h ago",
    user: "Sarah K.",
  },
];
