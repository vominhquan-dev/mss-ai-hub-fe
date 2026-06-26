import {
  LayoutDashboard,
  Briefcase,
  BarChart3,
  Users,
  Settings,
  ChevronRight,
  Zap,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../features/auth";
import { UserRole } from "../../features/auth/types";

type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
};

const roleNavItems: Record<UserRole, NavItem[]> = {
  admin: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ],
  tester: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "workspaces", label: "Workspaces", icon: Briefcase },
    { id: "reports", label: "Reports", icon: BarChart3 },
  ],
};

const roleLabels: Record<UserRole, string> = {
  admin: "Administrator",
  tester: "Tester",
};

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const { user, logout } = useAuth();

  if (!user) return null;

  const navItems = roleNavItems[user.role];

  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-card border-r border-border flex flex-col z-40">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-[13px] font-semibold text-foreground tracking-tight">
              AIHUB
            </span>
            <p className="text-[10px] text-muted-foreground leading-none mt-0.5">
              Test Management
            </p>
          </div>
        </div>
      </div>

      {/* Role Badge */}
      <div className="px-4 py-3 border-b border-border">
        <div className="px-2.5 py-1.5 rounded-md bg-muted/50 border border-border">
          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
            Role
          </p>
          <p className="text-[12px] text-foreground font-medium mt-0.5">
            {roleLabels[user.role]}
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        <p className="px-2 pt-1 pb-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Navigation
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activePage === item.id || activePage.startsWith(item.id);
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] transition-all duration-150 group ${
                isActive
                  ? "bg-accent text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon
                className={`w-4 h-4 flex-shrink-0 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              />
              <span className="flex-1 text-left">{item.label}</span>
              {isActive && <ChevronRight className="w-3 h-3 text-primary" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-border space-y-3">
        <div className="flex items-center gap-2.5 px-1">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-[11px] text-white font-semibold">
            {user.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-foreground truncate">
              {user.name}
            </p>
            <p className="text-[10px] text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[12px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
