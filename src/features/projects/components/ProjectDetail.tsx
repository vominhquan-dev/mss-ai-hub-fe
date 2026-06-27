import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";
import {
  ArrowLeft,
  RefreshCw,
  Search,
  Filter,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Play,
  FlaskConical,
  ClipboardList,
  TrendingUp,
  ChevronDown,
  Link2,
  Tag,
  FolderOpen,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../shared/ui/dialog";
import { Input } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";
import { Label } from "../../../shared/ui/label";
import { Checkbox } from "../../../shared/ui/checkbox";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const requirements = [
  {
    key: "KAN-9",
    summary: "Authentication Service — OAuth2 + JWT token flow",
    type: "Story",
    priority: "High",
    status: "In Progress",
    assignee: "Sarah K.",
    acceptanceCriteria: [
      "User can login with OAuth2 provider (Google, GitHub)",
      "JWT token is issued after successful login",
      "Token expires after 24 hours",
      "Refresh token can be used to get new access token",
    ],
  },
  {
    key: "KAN-16",
    summary: "User Management Service — CRUD operations & roles",
    type: "Story",
    priority: "High",
    status: "In Progress",
    assignee: "Mike R.",
    acceptanceCriteria: [
      "Admin can create new users",
      "Users can update their own profile",
      "Admin can assign roles to users",
      "Deleted users cannot login",
    ],
  },
  {
    key: "KAN-18",
    summary: "Analytics Service — Event tracking & dashboard data",
    type: "Story",
    priority: "Medium",
    status: "To Do",
    assignee: "Tom B.",
    acceptanceCriteria: [
      "Events are tracked and stored",
      "Dashboard displays real-time metrics",
      "Data is aggregated by time periods",
    ],
  },
  {
    key: "KAN-22",
    summary: "Notification System — Email + in-app push alerts",
    type: "Story",
    priority: "Medium",
    status: "In Review",
    assignee: "Lisa M.",
    acceptanceCriteria: [
      "Email notifications are sent",
      "In-app notifications are displayed",
      "Users can opt-in/out of notifications",
    ],
  },
  {
    key: "KAN-24",
    summary: "Payment Gateway Integration — Stripe & PayPal",
    type: "Epic",
    priority: "Critical",
    status: "In Progress",
    assignee: "Alex J.",
    acceptanceCriteria: [
      "Payment can be processed via Stripe",
      "Payment can be processed via PayPal",
      "Transaction is recorded",
    ],
  },
  {
    key: "KAN-27",
    summary: "Search & Indexing — Full-text search with Elasticsearch",
    type: "Story",
    priority: "Low",
    status: "To Do",
    assignee: "Tom B.",
    acceptanceCriteria: [
      "Users can search by keywords",
      "Results are ranked by relevance",
      "Search is fast (< 1 second)",
    ],
  },
  {
    key: "KAN-31",
    summary: "File Upload Service — S3 storage with CDN delivery",
    type: "Story",
    priority: "Medium",
    status: "Done",
    assignee: "Sarah K.",
    acceptanceCriteria: [
      "Files can be uploaded to S3",
      "Files are served via CDN",
      "File size limit is enforced",
    ],
  },
  {
    key: "KAN-33",
    summary: "Audit Logging — Compliance-grade event logging",
    type: "Story",
    priority: "High",
    status: "To Do",
    assignee: "Mike R.",
    acceptanceCriteria: [
      "All user actions are logged",
      "Logs cannot be deleted",
      "Logs include timestamp and user ID",
    ],
  },
  {
    key: "KAN-37",
    summary: "Rate Limiting & Throttling — API gateway configuration",
    type: "Task",
    priority: "Medium",
    status: "In Progress",
    assignee: "Alex J.",
    acceptanceCriteria: [
      "API requests are limited to 100/min per user",
      "Requests exceeding limit are rejected",
      "Rate limit info is in response headers",
    ],
  },
  {
    key: "KAN-41",
    summary: "SSO Integration — SAML 2.0 & Active Directory",
    type: "Epic",
    priority: "Critical",
    status: "In Review",
    assignee: "Sarah K.",
    acceptanceCriteria: [
      "Users can login via SAML",
      "Users can login via Active Directory",
      "User attributes are synced",
    ],
  },
];

const suites = [
  {
    id: "TS-01",
    name: "Authentication Flow",
    tests: 42,
    passRate: 95,
    lastRun: "Today, 09:30",
    status: "passed",
  },
  {
    id: "TS-02",
    name: "User Management",
    tests: 38,
    passRate: 87,
    lastRun: "Today, 08:45",
    status: "partial",
  },
  {
    id: "TS-03",
    name: "Payment Processing",
    tests: 56,
    passRate: 91,
    lastRun: "Yesterday",
    status: "passed",
  },
  {
    id: "TS-04",
    name: "Search & Discovery",
    tests: 24,
    passRate: 75,
    lastRun: "2 days ago",
    status: "partial",
  },
  {
    id: "TS-05",
    name: "Notification Service",
    tests: 18,
    passRate: 100,
    lastRun: "Today, 07:15",
    status: "passed",
  },
  {
    id: "TS-06",
    name: "Regression Suite",
    tests: 124,
    passRate: 82,
    lastRun: "Yesterday",
    status: "partial",
  },
];

const testCases = [
  {
    id: "TC-1001",
    title: "Valid login with correct credentials",
    linked: "KAN-9",
    priority: "High",
    status: "passed",
    suiteId: "TS-01",
  },
  {
    id: "TC-1002",
    title: "Login fails with wrong password",
    linked: "KAN-9",
    priority: "High",
    status: "passed",
    suiteId: "TS-01",
  },
  {
    id: "TC-1003",
    title: "JWT token expiry — auto refresh",
    linked: "KAN-9",
    priority: "High",
    status: "failed",
    suiteId: "TS-01",
  },
  {
    id: "TC-1004",
    title: "OAuth2 flow with Google provider",
    linked: "KAN-9",
    priority: "Critical",
    status: "passed",
    suiteId: "TS-01",
  },
  {
    id: "TC-1005",
    title: "Create user with valid payload",
    linked: "KAN-16",
    priority: "High",
    status: "passed",
    suiteId: "TS-02",
  },
  {
    id: "TC-1006",
    title: "Delete user — admin role only",
    linked: "KAN-16",
    priority: "Medium",
    status: "blocked",
    suiteId: "TS-02",
  },
  {
    id: "TC-1007",
    title: "Role assignment — multiple roles",
    linked: "KAN-16",
    priority: "Medium",
    status: "pending",
    suiteId: "TS-02",
  },
  {
    id: "TC-1008",
    title: "Event tracking — page view event",
    linked: "KAN-18",
    priority: "Medium",
    status: "passed",
    suiteId: "TS-03",
  },
  {
    id: "TC-1009",
    title: "Dashboard metrics aggregation",
    linked: "KAN-18",
    priority: "Low",
    status: "pending",
    suiteId: "TS-03",
  },
  {
    id: "TC-1010",
    title: "Rate limit — 100 req/min enforced",
    linked: "KAN-37",
    priority: "High",
    status: "failed",
    suiteId: "TS-06",
  },
];

const executions = [
  {
    runId: "RUN-234",
    suite: "Authentication Flow",
    executor: "Sarah K.",
    started: "Today 09:30",
    duration: "4m 12s",
    status: "passed",
    passed: 42,
    failed: 0,
  },
  {
    runId: "RUN-233",
    suite: "User Management",
    executor: "Mike R.",
    started: "Today 08:45",
    duration: "6m 38s",
    status: "partial",
    passed: 33,
    failed: 5,
  },
  {
    runId: "RUN-232",
    suite: "Regression Suite",
    executor: "CI/CD Pipeline",
    started: "Yesterday 22:00",
    duration: "18m 44s",
    status: "partial",
    passed: 102,
    failed: 22,
  },
  {
    runId: "RUN-231",
    suite: "Payment Processing",
    executor: "Alex J.",
    started: "Yesterday 16:20",
    duration: "9m 05s",
    status: "passed",
    passed: 56,
    failed: 0,
  },
  {
    runId: "RUN-230",
    suite: "Search & Discovery",
    executor: "Tom B.",
    started: "2 days ago",
    duration: "3m 51s",
    status: "failed",
    passed: 18,
    failed: 6,
  },
];

const trendData = [
  { date: "May 27", passed: 38, failed: 6 },
  { date: "May 30", passed: 45, failed: 9 },
  { date: "Jun 1", passed: 62, failed: 8 },
  { date: "Jun 3", passed: 71, failed: 12 },
  { date: "Jun 5", passed: 84, failed: 7 },
  { date: "Jun 6", passed: 75, failed: 11 },
];

const priorityConfig = {
  Critical: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-gray-100 text-gray-600",
};

const statusConfig = {
  passed: { label: "Passed", cls: "bg-emerald-50 text-emerald-700" },
  failed: { label: "Failed", cls: "bg-red-50 text-red-700" },
  blocked: { label: "Blocked", cls: "bg-amber-50 text-amber-700" },
  pending: { label: "Pending", cls: "bg-gray-100 text-gray-600" },
  partial: { label: "Partial", cls: "bg-blue-50 text-blue-700" },
  "In Progress": { label: "In Progress", cls: "bg-blue-50 text-blue-700" },
  "In Review": { label: "In Review", cls: "bg-violet-50 text-violet-700" },
  "To Do": { label: "To Do", cls: "bg-gray-100 text-gray-600" },
  Done: { label: "Done", cls: "bg-emerald-50 text-emerald-700" },
  reviewing: { label: "Reviewing", cls: "bg-yellow-50 text-yellow-700" },
  accepted: { label: "Accepted", cls: "bg-emerald-50 text-emerald-700" },
  rejected: { label: "Rejected", cls: "bg-red-50 text-red-700" },
};

export function ProjectDetail() {
  const { key: projectKey } = useParams<{ name: string; key: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isTester = user?.role === "tester";
  const projectKeyValue = projectKey ?? "";
  const projectNames: Record<string, string> = {
    KAN: "Kanban Board Core",
    SHOP: "E-Commerce Checkout",
    AUTH: "Authentication Service",
    INFRA: "Infrastructure Monitoring",
    DASH: "Analytics Dashboard",
  };
  const projectName = projectKeyValue
    ? (projectNames[projectKeyValue] ?? projectKeyValue)
    : "Unknown Project";

  const [tab, setTab] = useState<
    "overview" | "requirements" | "suites" | "cases" | "executions"
  >("overview");
  const [syncing, setSyncing] = useState(false);
  const [searchReqs, setSearchReqs] = useState("");
  const [searchTestCases, setSearchTestCases] = useState("");
  const [filterStatusReqs, setFilterStatusReqs] = useState("All Status");
  const [filterPriorityReqs, setFilterPriorityReqs] = useState("All Priority");
  const [filterStatusTestCases, setFilterStatusTestCases] =
    useState("All Status");
  const [selectedSuite, setSelectedSuite] = useState<(typeof suites)[0] | null>(
    null,
  );
  const [showCreateSuite, setShowCreateSuite] = useState(false);
  const [suiteName, setSuiteName] = useState("");
  const [selectedTestCases, setSelectedTestCases] = useState<string[]>([]);

  // Test Cases AI Generation
  const [testCasesList, setTestCasesList] = useState<any[]>(testCases);
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [generatedTestCases, setGeneratedTestCases] = useState<any[]>([]);
  const [selectedRequirement, setSelectedRequirement] = useState<string>("");

  // New Run Dialog
  const [showNewRunDialog, setShowNewRunDialog] = useState(false);
  const [selectedSuiteForRun, setSelectedSuiteForRun] = useState<string>("");

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  const handleCreateSuite = () => {
    // Reset form
    setSuiteName("");
    setSelectedTestCases([]);
    setShowCreateSuite(false);
    // Here you would typically send this data to your backend
    console.log("Create suite:", {
      name: suiteName,
      projectKey,
      testCases: selectedTestCases,
    });
  };

  const toggleTestCase = (testCaseId: string) => {
    setSelectedTestCases((prev) =>
      prev.includes(testCaseId)
        ? prev.filter((id) => id !== testCaseId)
        : [...prev, testCaseId],
    );
  };

  const handleGenerateTestCases = () => {
    if (!selectedRequirement) return;

    const req = requirements.find((r) => r.key === selectedRequirement);
    if (!req) return;

    // Simulate AI generating test cases from AC
    const generated = req.acceptanceCriteria.map((ac, idx) => ({
      id: `TC-GEN-${Date.now()}-${idx}`,
      title: `Test: ${ac}`,
      acceptanceCriteria: ac,
      linkedRequirement: selectedRequirement,
      priority: req.priority,
      status: "reviewing",
      generatedAt: new Date().toLocaleString(),
    }));

    setGeneratedTestCases(generated);
  };

  const handleAcceptTestCase = (testCaseId: string) => {
    setGeneratedTestCases((prev) =>
      prev.map((tc) =>
        tc.id === testCaseId ? { ...tc, status: "accepted" } : tc,
      ),
    );
  };

  const handleRejectTestCase = (testCaseId: string) => {
    setGeneratedTestCases((prev) =>
      prev.map((tc) =>
        tc.id === testCaseId ? { ...tc, status: "rejected" } : tc,
      ),
    );
  };

  const handleConfirmGenerated = () => {
    const accepted = generatedTestCases.filter(
      (tc) => tc.status === "accepted",
    );
    setTestCasesList((prev) => [...prev, ...accepted]);
    setGeneratedTestCases([]);
    setShowGenerateDialog(false);
    setSelectedRequirement("");
  };

  const filteredReqs = requirements.filter((r) => {
    const matchesSearch =
      r.summary.toLowerCase().includes(searchReqs.toLowerCase()) ||
      r.key.toLowerCase().includes(searchReqs.toLowerCase());
    const matchesStatus =
      filterStatusReqs === "All Status" || r.status === filterStatusReqs;
    const matchesPriority =
      filterPriorityReqs === "All Priority" ||
      r.priority === filterPriorityReqs;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const filteredTestCases = testCasesList.filter((tc) => {
    const matchesSearch =
      tc.title.toLowerCase().includes(searchTestCases.toLowerCase()) ||
      tc.id.toLowerCase().includes(searchTestCases.toLowerCase());
    const statusMap: Record<string, string> = {
      Passed: "passed",
      Failed: "failed",
      Blocked: "blocked",
      Pending: "pending",
      Reviewing: "reviewing",
      Accepted: "accepted",
      "All Status": "",
    };
    const filterValue = statusMap[filterStatusTestCases] || "";
    const matchesStatus =
      filterStatusTestCases === "All Status" || tc.status === filterValue;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground mb-3 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Workspace
        </button>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <FolderOpen
              className="w-4.5 h-4.5 text-white"
              style={{ width: 18, height: 18 }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-foreground">
                {projectNames[projectKeyValue] ?? projectKeyValue}
              </h1>
              <span className="text-[11px] font-mono font-bold text-primary bg-blue-50 px-2 py-0.5 rounded">
                {projectKey}
              </span>
            </div>
            <p className="text-muted-foreground text-[13px]">
              Kanban Platform workspace
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border flex gap-0">
        {(
          [
            { id: "overview", label: "Overview", icon: TrendingUp },
            { id: "requirements", label: "Requirements", icon: Link2 },
            { id: "suites", label: "Test Suites", icon: FlaskConical },
            { id: "cases", label: "Test Cases", icon: ClipboardList },
            { id: "executions", label: "Executions", icon: Play },
          ] as const
        )
          .filter((t) => {
            // All users can see all tabs
            return true;
          })
          .map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-[13px] border-b-2 -mb-px transition-colors ${
                  tab === t.id
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div className="space-y-5">
          <div className="grid grid-cols-4 gap-4">
            {[
              {
                label: "Requirements",
                value: "28",
                sub: "Synced from Jira",
                color: "text-blue-600 bg-blue-50",
              },
              {
                label: "Test Suites",
                value: "6",
                sub: "Active suites",
                color: "text-violet-600 bg-violet-50",
              },
              {
                label: "Test Cases",
                value: "156",
                sub: "Across all suites",
                color: "text-cyan-600 bg-cyan-50",
              },
              {
                label: "Pass Rate",
                value: "87%",
                sub: "Last 30 days",
                color: "text-emerald-600 bg-emerald-50",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-card border border-border rounded-lg p-4"
              >
                <p className="text-[24px] font-semibold text-foreground">
                  {s.value}
                </p>
                <p className="text-[13px] font-medium text-foreground mt-1">
                  {s.label}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {s.sub}
                </p>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-foreground mb-4">
              Execution Trend — Last 6 Days
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart
                data={trendData}
                margin={{ top: 4, right: 4, bottom: 0, left: -24 }}
              >
                <defs>
                  <linearGradient id="p2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#36B37E" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#36B37E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "#6B778C" }}
                />
                <YAxis tick={{ fontSize: 10, fill: "#6B778C" }} />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 6,
                    border: "1px solid #DFE1E6",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="passed"
                  stroke="#36B37E"
                  strokeWidth={2}
                  fill="url(#p2)"
                  name="Passed"
                />
                <Area
                  type="monotone"
                  dataKey="failed"
                  stroke="#DE350B"
                  strokeWidth={1.5}
                  fill="none"
                  strokeDasharray="4 2"
                  name="Failed"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Requirements */}
      {tab === "requirements" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={searchReqs}
                  onChange={(e) => setSearchReqs(e.target.value)}
                  placeholder="Search requirements..."
                  className="pl-8 pr-3 py-1.5 text-[13px] bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring/30 w-56"
                />
              </div>
              <select
                value={filterStatusReqs}
                onChange={(e) => setFilterStatusReqs(e.target.value)}
                className="text-[13px] bg-card border border-border rounded-md px-2.5 py-1.5 text-muted-foreground focus:outline-none"
              >
                <option>All Status</option>
                <option>In Progress</option>
                <option>In Review</option>
                <option>To Do</option>
                <option>Done</option>
              </select>
              <select
                value={filterPriorityReqs}
                onChange={(e) => setFilterPriorityReqs(e.target.value)}
                className="text-[13px] bg-card border border-border rounded-md px-2.5 py-1.5 text-muted-foreground focus:outline-none"
              >
                <option>All Priority</option>
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                <Link2 className="w-3 h-3" />
                Synced from Jira
              </span>
              {isTester && (
                <button
                  onClick={handleSync}
                  className="flex items-center gap-1.5 text-[13px] bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`}
                  />
                  Sync Requirements
                </button>
              )}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {[
                    "Jira Key",
                    "Summary",
                    "Type",
                    "Priority",
                    "Status",
                    "Assignee",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredReqs.map((r) => {
                  const sc =
                    statusConfig[r.status as keyof typeof statusConfig];
                  const pc =
                    priorityConfig[r.priority as keyof typeof priorityConfig];
                  return (
                    <tr
                      key={r.key}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <span className="text-[12px] font-mono font-bold text-primary bg-blue-50 px-1.5 py-0.5 rounded">
                          {r.key}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[13px] text-foreground max-w-xs">
                        <span className="line-clamp-1">{r.summary}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[11px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                          {r.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-[11px] font-medium px-1.5 py-0.5 rounded ${pc}`}
                        >
                          {r.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${sc?.cls}`}
                        >
                          {sc?.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary">
                            {r.assignee
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span className="text-[12px] text-muted-foreground">
                            {r.assignee}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-[12px] text-muted-foreground">
            {filteredReqs.length} requirements
          </p>
        </div>
      )}

      {/* Test Suites */}
      {tab === "suites" && isTester && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-muted-foreground">
              {suites.length} test suites
            </p>
            <button
              onClick={() => setShowCreateSuite(true)}
              className="flex items-center gap-1.5 text-[13px] bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity"
            >
              <Plus className="w-3.5 h-3.5" />
              Create Suite
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {suites.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelectedSuite(s)}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer hover:border-primary/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-8 h-8 rounded-md bg-violet-50 flex items-center justify-center">
                    <FlaskConical className="w-4 h-4 text-violet-600" />
                  </div>
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${s.status === "passed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                  >
                    {s.status === "passed" ? "All Passed" : "Partial"}
                  </span>
                </div>
                <p className="text-[13px] font-semibold text-foreground mb-1">
                  {s.name}
                </p>
                <p className="text-[11px] text-muted-foreground mb-3">{s.id}</p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-[18px] font-semibold text-foreground">
                      {s.tests}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Test Cases
                    </p>
                  </div>
                  <div>
                    <p className="text-[18px] font-semibold text-foreground">
                      {s.passRate}%
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Pass Rate
                    </p>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 mb-3">
                  <div
                    className={`h-1.5 rounded-full ${s.passRate >= 90 ? "bg-emerald-500" : s.passRate >= 75 ? "bg-amber-500" : "bg-red-500"}`}
                    style={{ width: `${s.passRate}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-muted-foreground">
                    Last: {s.lastRun}
                  </p>
                  <button
                    onClick={() => setSelectedSuite(s)}
                    className="text-[12px] text-primary hover:underline font-medium"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Test Cases */}
      {tab === "cases" && isTester && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={searchTestCases}
                  onChange={(e) => setSearchTestCases(e.target.value)}
                  placeholder="Search test cases..."
                  className="pl-8 pr-3 py-1.5 text-[13px] bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring/30 w-56"
                />
              </div>
              <select
                value={filterStatusTestCases}
                onChange={(e) => setFilterStatusTestCases(e.target.value)}
                className="text-[13px] bg-card border border-border rounded-md px-2.5 py-1.5 text-muted-foreground focus:outline-none"
              >
                <option>All Status</option>
                <option>Passed</option>
                <option>Failed</option>
                <option>Blocked</option>
                <option>Pending</option>
                <option>Reviewing</option>
                <option>Accepted</option>
              </select>
            </div>
            <button
              onClick={() => setShowGenerateDialog(true)}
              className="flex items-center gap-1.5 text-[13px] bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity"
            >
              <Plus className="w-3.5 h-3.5" />
              Generate Test Cases (AI)
            </button>
          </div>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {[
                    "Test Case ID",
                    "Title",
                    "Linked Requirement",
                    "Priority",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTestCases.map((tc) => {
                  const sc =
                    statusConfig[tc.status as keyof typeof statusConfig];
                  const pc =
                    priorityConfig[tc.priority as keyof typeof priorityConfig];
                  return (
                    <tr
                      key={tc.id}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors cursor-pointer"
                      onClick={() => navigate(`/test-cases/${tc.id}`)}
                    >
                      <td className="px-4 py-3">
                        <span className="text-[12px] font-mono font-semibold text-foreground">
                          {tc.id}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[13px] text-foreground max-w-xs">
                        <span className="line-clamp-1 hover:underline">
                          {tc.title}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[12px] font-mono text-primary bg-blue-50 px-1.5 py-0.5 rounded">
                          {tc.linked || tc.linkedRequirement}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-[11px] font-medium px-1.5 py-0.5 rounded ${pc}`}
                        >
                          {tc.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${sc?.cls}`}
                        >
                          {sc?.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          className="text-[12px] text-primary hover:bg-accent px-2 py-0.5 rounded transition-colors font-medium"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/test-cases/${tc.id}`);
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Executions */}
      {tab === "executions" && isTester && (
        <div className="space-y-5">
          {/* Summary cards */}
          <div className="grid grid-cols-4 gap-4">
            {[
              {
                label: "Passed",
                value: "75",
                icon: CheckCircle2,
                color: "text-emerald-600 bg-emerald-50",
              },
              {
                label: "Failed",
                value: "11",
                icon: XCircle,
                color: "text-red-600 bg-red-50",
              },
              {
                label: "Blocked",
                value: "3",
                icon: AlertCircle,
                color: "text-amber-600 bg-amber-50",
              },
              {
                label: "Not Run",
                value: "67",
                icon: Clock,
                color: "text-gray-500 bg-gray-50",
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="bg-card border border-border rounded-lg p-4"
                >
                  <div
                    className={`w-8 h-8 rounded-md flex items-center justify-center mb-2 ${s.color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-[24px] font-semibold text-foreground">
                    {s.value}
                  </p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* History */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h3 className="text-foreground">Execution History</h3>
              <button
                onClick={() => setShowNewRunDialog(true)}
                className="flex items-center gap-1.5 text-[13px] bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity"
              >
                <Play className="w-3.5 h-3.5" />
                New Run
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {[
                    "Run ID",
                    "Suite",
                    "Executor",
                    "Started",
                    "Duration",
                    "Results",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {executions.map((ex) => {
                  const sc =
                    statusConfig[ex.status as keyof typeof statusConfig];
                  return (
                    <tr
                      key={ex.runId}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-4 py-3 text-[12px] font-mono font-semibold text-foreground">
                        {ex.runId}
                      </td>
                      <td className="px-4 py-3 text-[13px] text-foreground">
                        {ex.suite}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary">
                            {ex.executor === "CI/CD Pipeline"
                              ? "CI"
                              : ex.executor
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                          </div>
                          <span className="text-[12px] text-muted-foreground">
                            {ex.executor}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-muted-foreground">
                        {ex.started}
                      </td>
                      <td className="px-4 py-3 text-[12px] font-mono text-muted-foreground">
                        {ex.duration}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-emerald-600 font-medium">
                            {ex.passed}P
                          </span>
                          <span className="text-red-600 font-medium">
                            {ex.failed}F
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${sc?.cls}`}
                        >
                          {sc?.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* New Run Dialog */}
      {showNewRunDialog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-foreground font-semibold">
                New Test Execution
              </h2>
              <button
                onClick={() => {
                  setShowNewRunDialog(false);
                  setSelectedSuiteForRun("");
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              <div>
                <label className="text-[12px] font-semibold text-muted-foreground mb-2 block">
                  Select Test Suite
                </label>
                <select
                  value={selectedSuiteForRun}
                  onChange={(e) => setSelectedSuiteForRun(e.target.value)}
                  className="w-full text-[13px] bg-card border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                >
                  <option value="">-- Choose a suite --</option>
                  {suites.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.tests} tests)
                    </option>
                  ))}
                </select>
              </div>

              {selectedSuiteForRun && (
                <div className="bg-muted/40 rounded-lg p-3 border border-border">
                  {suites.find((s) => s.id === selectedSuiteForRun) && (
                    <div className="space-y-2">
                      <div>
                        <p className="text-[11px] text-muted-foreground font-semibold">
                          SUITE DETAILS
                        </p>
                        <p className="text-[13px] font-medium text-foreground mt-1">
                          {
                            suites.find((s) => s.id === selectedSuiteForRun)
                              ?.name
                          }
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
                        <div>
                          <p className="text-[11px] text-muted-foreground">
                            Test Cases
                          </p>
                          <p className="text-[13px] font-semibold text-foreground">
                            {
                              suites.find((s) => s.id === selectedSuiteForRun)
                                ?.tests
                            }
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] text-muted-foreground">
                            Pass Rate
                          </p>
                          <p className="text-[13px] font-semibold text-foreground">
                            {
                              suites.find((s) => s.id === selectedSuiteForRun)
                                ?.passRate
                            }
                            %
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 p-5 border-t border-border bg-muted/20">
              <button
                onClick={() => {
                  setShowNewRunDialog(false);
                  setSelectedSuiteForRun("");
                }}
                className="text-[13px] px-3 py-1.5 rounded-md border border-border text-foreground hover:bg-muted/50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                disabled={!selectedSuiteForRun}
                onClick={() => {
                  console.log("Running test suite:", selectedSuiteForRun);
                  setShowNewRunDialog(false);
                  setSelectedSuiteForRun("");
                }}
                className="text-[13px] px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" />
                Run Suite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fallback - if no tab is selected, show overview */}
      {!["overview", "requirements", "suites", "cases", "executions"].includes(
        tab,
      ) && (
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <p className="text-muted-foreground">Select a tab to view content</p>
        </div>
      )}

      {/* Test Suite Detail Modal */}
      {selectedSuite && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-violet-50 flex items-center justify-center">
                  <FlaskConical className="w-4 h-4 text-violet-600" />
                </div>
                <div>
                  <h2 className="text-foreground font-semibold">
                    {selectedSuite.name}
                  </h2>
                  <p className="text-[12px] text-muted-foreground">
                    {selectedSuite.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSuite(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Project Info */}
              <div className="bg-muted/40 border border-border rounded-lg p-4">
                <p className="text-[12px] font-semibold text-muted-foreground uppercase mb-2">
                  Project
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                    <FolderOpen className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-foreground">
                      {projectNames[projectKeyValue] ?? projectKeyValue}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {projectKeyValue} workspace
                    </p>
                  </div>
                </div>
              </div>

              {/* Suite Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/40 rounded-lg p-4">
                  <p className="text-[11px] text-muted-foreground mb-1">
                    Test Cases
                  </p>
                  <p className="text-[24px] font-semibold text-foreground">
                    {selectedSuite.tests}
                  </p>
                </div>
                <div className="bg-muted/40 rounded-lg p-4">
                  <p className="text-[11px] text-muted-foreground mb-1">
                    Pass Rate
                  </p>
                  <p className="text-[24px] font-semibold text-foreground">
                    {selectedSuite.passRate}%
                  </p>
                </div>
                <div className="bg-muted/40 rounded-lg p-4">
                  <p className="text-[11px] text-muted-foreground mb-1">
                    Last Run
                  </p>
                  <p className="text-[13px] font-medium text-foreground">
                    {selectedSuite.lastRun}
                  </p>
                </div>
              </div>

              {/* Test Cases in Suite */}
              <div>
                <h3 className="text-foreground font-semibold mb-3">
                  Test Cases in Suite
                </h3>
                <div className="space-y-2">
                  {testCases.filter((tc) => tc.suiteId === selectedSuite.id)
                    .length > 0 ? (
                    testCases
                      .filter((tc) => tc.suiteId === selectedSuite.id)
                      .map((tc) => (
                        <div
                          key={tc.id}
                          className="bg-muted/40 border border-border rounded-lg p-3"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[11px] font-mono font-bold text-primary">
                                  {tc.id}
                                </span>
                                <span
                                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${priorityConfig[tc.priority as keyof typeof priorityConfig]}`}
                                >
                                  {tc.priority}
                                </span>
                              </div>
                              <p className="text-[13px] text-foreground">
                                {tc.title}
                              </p>
                              <p className="text-[11px] text-muted-foreground mt-1">
                                Linked to {tc.linked}
                              </p>
                            </div>
                            <span
                              className={`ml-2 text-[11px] font-medium px-2 py-1 rounded-full flex-shrink-0 ${statusConfig[tc.status as keyof typeof statusConfig]?.cls}`}
                            >
                              {
                                statusConfig[
                                  tc.status as keyof typeof statusConfig
                                ]?.label
                              }
                            </span>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="text-[12px] text-muted-foreground text-center py-4">
                      No test cases found
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Suite Dialog */}
      <Dialog open={showCreateSuite} onOpenChange={setShowCreateSuite}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Create Test Suite</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Suite Name */}
            <div className="space-y-2">
              <Label htmlFor="suite-name">Suite Name</Label>
              <Input
                id="suite-name"
                placeholder="e.g., Authentication Flow"
                value={suiteName}
                onChange={(e) => setSuiteName(e.target.value)}
              />
            </div>

            {/* Project */}
            <div className="space-y-2">
              <Label>Project</Label>
              <div className="bg-muted/40 border border-border rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                    <FolderOpen className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-foreground">
                      {projectNames[projectKeyValue] ?? projectKeyValue}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {projectKeyValue} workspace
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Cases Selection */}
            <div className="space-y-2">
              <Label>Test Cases (from Requirements)</Label>
              <div className="border border-border rounded-lg p-3 max-h-64 overflow-y-auto space-y-2">
                {testCases.length > 0 ? (
                  testCases.map((tc) => (
                    <div
                      key={tc.id}
                      className="flex items-start gap-3 p-2 hover:bg-muted/40 rounded transition-colors"
                    >
                      <Checkbox
                        id={`tc-${tc.id}`}
                        checked={selectedTestCases.includes(tc.id)}
                        onCheckedChange={() => toggleTestCase(tc.id)}
                        className="mt-1"
                      />
                      <label
                        htmlFor={`tc-${tc.id}`}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-mono font-bold text-primary">
                            {tc.id}
                          </span>
                          <span
                            className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${priorityConfig[tc.priority as keyof typeof priorityConfig]}`}
                          >
                            {tc.priority}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {tc.linked}
                          </span>
                        </div>
                        <p className="text-[13px] text-foreground">
                          {tc.title}
                        </p>
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-[12px] text-muted-foreground text-center py-4">
                    No test cases available
                  </p>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground">
                {selectedTestCases.length} test case
                {selectedTestCases.length !== 1 ? "s" : ""} selected
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateSuite(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSuite} disabled={!suiteName.trim()}>
              Create Suite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generate Test Cases Dialog */}
      <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Generate Test Cases from AI</DialogTitle>
          </DialogHeader>

          {generatedTestCases.length === 0 ? (
            // Step 1: Select Requirement
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>Select Requirement</Label>
                <select
                  value={selectedRequirement}
                  onChange={(e) => setSelectedRequirement(e.target.value)}
                  className="w-full text-[13px] bg-card border border-border rounded-md px-3 py-2.5 text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                >
                  <option value="">Choose a requirement...</option>
                  {requirements.map((req) => (
                    <option key={req.key} value={req.key}>
                      {req.key} - {req.summary}
                    </option>
                  ))}
                </select>
              </div>

              {selectedRequirement && (
                <div className="space-y-3">
                  <div className="bg-muted/40 border border-border rounded-lg p-4">
                    <p className="text-[12px] font-semibold text-muted-foreground uppercase mb-3">
                      Acceptance Criteria
                    </p>
                    <div className="space-y-2">
                      {requirements
                        .find((r) => r.key === selectedRequirement)
                        ?.acceptanceCriteria.map((ac, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-[13px] text-foreground"
                          >
                            <span className="text-primary font-semibold">
                              •
                            </span>
                            <span>{ac}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowGenerateDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleGenerateTestCases}
                  disabled={!selectedRequirement}
                >
                  Generate Test Cases
                </Button>
              </DialogFooter>
            </div>
          ) : (
            // Step 2: Review Generated Test Cases
            <div className="space-y-6 py-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-[13px] text-blue-700 font-medium">
                  Review the AI-generated test cases. Accept or reject each one
                  before confirming.
                </p>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {generatedTestCases.map((tc) => {
                  const sc =
                    statusConfig[tc.status as keyof typeof statusConfig];
                  const pc =
                    priorityConfig[tc.priority as keyof typeof priorityConfig];
                  return (
                    <div
                      key={tc.id}
                      className="bg-card border border-border rounded-lg p-4"
                    >
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono font-bold text-primary">
                              {tc.linkedRequirement}
                            </span>
                            <span
                              className={`text-[11px] font-medium px-1.5 py-0.5 rounded ${pc}`}
                            >
                              {tc.priority}
                            </span>
                            <span
                              className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${sc?.cls}`}
                            >
                              {sc?.label}
                            </span>
                          </div>
                        </div>
                        <div className="bg-muted/40 rounded p-2">
                          <p className="text-[12px] text-muted-foreground">
                            AC:
                          </p>
                          <p className="text-[13px] text-foreground font-medium">
                            {tc.acceptanceCriteria}
                          </p>
                        </div>
                        <p className="text-[13px] text-foreground">
                          {tc.title}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRejectTestCase(tc.id)}
                          className={
                            tc.status === "rejected"
                              ? "bg-red-50 border-red-200"
                              : ""
                          }
                        >
                          ✕ Not Accept
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleAcceptTestCase(tc.id)}
                          className={
                            tc.status === "accepted"
                              ? "bg-emerald-600 hover:bg-emerald-700"
                              : ""
                          }
                        >
                          ✓ Accept
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-muted/40 rounded-lg p-3">
                <p className="text-[12px] text-muted-foreground">
                  Accepted:{" "}
                  <span className="font-semibold text-foreground">
                    {
                      generatedTestCases.filter(
                        (tc) => tc.status === "accepted",
                      ).length
                    }
                  </span>{" "}
                  / {generatedTestCases.length}
                </p>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setGeneratedTestCases([]);
                    setSelectedRequirement("");
                  }}
                >
                  Back
                </Button>
                <Button
                  onClick={handleConfirmGenerated}
                  disabled={generatedTestCases.every(
                    (tc) => tc.status !== "accepted",
                  )}
                >
                  Confirm & Add to Test Cases
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
