import { Plus, Search, AlertCircle, BookOpen } from "lucide-react";
import { useState } from "react";

const allUserStories = [
  // KAN Project
  {
    key: "KAN-US-1",
    title: "As a user, I want to login with OAuth2 so that I don't need to manage passwords",
    project: "KAN",
    priority: "High",
    status: "Done",
    assignee: "Sarah K.",
    points: 5,
    acceptanceCount: 4,
  },
  {
    key: "KAN-US-2",
    title: "As an admin, I want to manage user roles so that I can control permissions",
    project: "KAN",
    priority: "High",
    status: "In Progress",
    assignee: "Mike R.",
    points: 8,
    acceptanceCount: 3,
  },
  {
    key: "KAN-US-3",
    title: "As a user, I want to receive notifications so that I stay updated on important events",
    project: "KAN",
    priority: "Medium",
    status: "In Review",
    assignee: "Lisa M.",
    points: 5,
    acceptanceCount: 2,
  },
  {
    key: "KAN-US-4",
    title: "As a developer, I want rate limiting so that the API is protected from abuse",
    project: "KAN",
    priority: "Medium",
    status: "In Progress",
    assignee: "Alex J.",
    points: 3,
    acceptanceCount: 2,
  },
  // SHOP Project
  {
    key: "SHOP-US-1",
    title: "As a customer, I want to add items to my cart so that I can purchase multiple items",
    project: "SHOP",
    priority: "Critical",
    status: "Done",
    assignee: "Tom B.",
    points: 5,
    acceptanceCount: 5,
  },
  {
    key: "SHOP-US-2",
    title: "As a customer, I want a mobile-optimized checkout so that I can buy on the go",
    project: "SHOP",
    priority: "High",
    status: "In Progress",
    assignee: "Sarah K.",
    points: 8,
    acceptanceCount: 3,
  },
  {
    key: "SHOP-US-3",
    title: "As a seller, I want to manage inventory so that I can track stock levels",
    project: "SHOP",
    priority: "High",
    status: "To Do",
    assignee: "Mike R.",
    points: 13,
    acceptanceCount: 4,
  },
  // AUTH Project
  {
    key: "AUTH-US-1",
    title: "As a user, I want MFA so that my account is more secure",
    project: "AUTH",
    priority: "Critical",
    status: "In Progress",
    assignee: "Sarah K.",
    points: 8,
    acceptanceCount: 3,
  },
  {
    key: "AUTH-US-2",
    title: "As an enterprise user, I want SAML SSO so that I can use my corporate credentials",
    project: "AUTH",
    priority: "High",
    status: "To Do",
    assignee: "Mike R.",
    points: 13,
    acceptanceCount: 2,
  },
  // INFRA Project
  {
    key: "INFRA-US-1",
    title: "As an ops team, I want Kubernetes deployment so that I can scale applications easily",
    project: "INFRA",
    priority: "Critical",
    status: "In Progress",
    assignee: "Tom B.",
    points: 21,
    acceptanceCount: 5,
  },
  {
    key: "INFRA-US-2",
    title: "As an ops team, I want monitoring and alerting so that I can detect issues early",
    project: "INFRA",
    priority: "High",
    status: "In Review",
    assignee: "Alex J.",
    points: 8,
    acceptanceCount: 4,
  },
  // DASH Project
  {
    key: "DASH-US-1",
    title: "As an analyst, I want real-time dashboard so that I can see metrics instantly",
    project: "DASH",
    priority: "High",
    status: "In Progress",
    assignee: "Lisa M.",
    points: 13,
    acceptanceCount: 5,
  },
];

const priorityConfig = {
  Critical: { color: "bg-red-50 text-red-700 border-red-200", bg: "bg-red-100" },
  High: { color: "bg-orange-50 text-orange-700 border-orange-200", bg: "bg-orange-100" },
  Medium: { color: "bg-blue-50 text-blue-700 border-blue-200", bg: "bg-blue-100" },
  Low: { color: "bg-slate-50 text-slate-700 border-slate-200", bg: "bg-slate-100" },
};

const statusConfig = {
  "To Do": { color: "bg-slate-100 text-slate-700", icon: "📋" },
  "In Progress": { color: "bg-blue-100 text-blue-700", icon: "🔵" },
  "In Review": { color: "bg-purple-100 text-purple-700", icon: "👀" },
  Done: { color: "bg-green-100 text-green-700", icon: "✅" },
};

interface UserStoriesPageProps {
  selectedProject: string;
  onSelectProject: (project: string) => void;
}

export function UserStoriesPage({ selectedProject, onSelectProject }: UserStoriesPageProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStories = allUserStories.filter(story => {
    const matchesProject = selectedProject === "ALL" || story.project === selectedProject;
    const matchesSearch =
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.key.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesProject && matchesSearch;
  });

  const projects = ["KAN", "SHOP", "AUTH", "INFRA", "DASH"];

  const stats = {
    total: filteredStories.length,
    done: filteredStories.filter(s => s.status === "Done").length,
    inProgress: filteredStories.filter(s => s.status === "In Progress").length,
    totalPoints: filteredStories.reduce((sum, s) => sum + s.points, 0),
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground">User Stories</h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">Track and manage user stories across projects</p>
        </div>
        <button className="flex items-center gap-1.5 text-[13px] bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">
          <Plus className="w-3.5 h-3.5" />
          New Story
        </button>
      </div>

      {/* Project Filter */}
      <div className="bg-card border border-border rounded-lg p-3">
        <p className="text-[12px] font-semibold text-muted-foreground mb-2">Filter by Project</p>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onSelectProject("ALL")}
            className={`px-3 py-1.5 text-[12px] rounded-md font-medium transition-colors ${
              selectedProject === "ALL"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All Projects
          </button>
          {projects.map((key) => (
            <button
              key={key}
              onClick={() => onSelectProject(key)}
              className={`px-3 py-1.5 text-[12px] rounded-md font-medium transition-colors ${
                selectedProject === key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-[24px] font-semibold text-foreground">{stats.total}</p>
          <p className="text-[12px] text-muted-foreground mt-0.5">Total Stories</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-[24px] font-semibold text-green-600">{stats.done}</p>
          <p className="text-[12px] text-muted-foreground mt-0.5">Completed</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-[24px] font-semibold text-blue-600">{stats.inProgress}</p>
          <p className="text-[12px] text-muted-foreground mt-0.5">In Progress</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-[24px] font-semibold text-orange-600">{stats.totalPoints}</p>
          <p className="text-[12px] text-muted-foreground mt-0.5">Total Story Points</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search user stories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-[13px] placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* User Stories List */}
      <div className="space-y-3">
        {filteredStories.map((story) => {
          const priorityConfig_ = priorityConfig[story.priority as keyof typeof priorityConfig];
          const statusConfig_ = statusConfig[story.status as keyof typeof statusConfig];
          return (
            <div key={story.key} className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-all group cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-[12px] font-mono font-bold text-primary">{story.key}</p>
                    <span className="text-[10px] font-semibold text-primary bg-blue-50 px-2 py-0.5 rounded">{story.project}</span>
                  </div>
                  <p className="text-[13px] font-medium text-foreground leading-relaxed">{story.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[11px] font-medium px-2 py-1 rounded border ${priorityConfig_?.color}`}>
                  {story.priority}
                </span>
                <span className={`text-[11px] font-medium px-2 py-1 rounded ${statusConfig_?.color}`}>
                  {statusConfig_?.icon} {story.status}
                </span>
                <span className="text-[11px] font-semibold px-2 py-1 rounded bg-amber-100 text-amber-700">
                  {story.points} pts
                </span>
                <span className="text-[11px] text-muted-foreground bg-muted px-2 py-1 rounded">
                  {story.acceptanceCount} AC
                </span>
                <span className="text-[11px] text-muted-foreground ml-auto">Assigned: {story.assignee}</span>
              </div>
            </div>
          );
        })}
        {filteredStories.length === 0 && (
          <div className="bg-card border border-dashed border-border rounded-lg p-12 text-center">
            <BookOpen className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-[13px] text-muted-foreground">No user stories found</p>
          </div>
        )}
      </div>
    </div>
  );
}
