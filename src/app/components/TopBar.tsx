import { Bell, Search } from "lucide-react";
import { useAuth } from "../../features/auth";
import { Breadcrumb } from "./Breadcrumb";
import { PageType } from "../data/navigation";

interface TopBarProps {
  currentPage: PageType;
}

export function TopBar({ currentPage }: TopBarProps) {
  const { user } = useAuth();

  return (
    <header className="h-12 bg-card border-b border-border flex items-center px-5 gap-4 flex-shrink-0">
      <Breadcrumb currentPage={currentPage} />

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <button className="text-[11px] px-2.5 py-1 rounded-md transition-colors bg-accent text-primary font-medium">
            Dashboard
          </button>
        </div>

        <div className="relative hidden lg:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            placeholder="Search..."
            className="pl-8 pr-3 py-1.5 w-48 text-[12px] bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>

        <button className="relative p-1.5 hover:bg-muted rounded-md transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-[11px] text-white font-semibold cursor-pointer">
          {user?.avatar}
        </div>
      </div>
    </header>
  );
}
