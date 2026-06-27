import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../features/auth";
import { Sidebar } from "./Sidebar";
import { TopBar } from "../components/TopBar";
import type { PageType } from "../config/navigation";

export function MainLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  if (!user) return null;

  const currentPath = window.location.pathname;

  const getPageType = (): PageType => {
    if (currentPath === "/" || currentPath.startsWith("/dashboard"))
      return "dashboard";
    if (currentPath.startsWith("/workspaces")) {
      if (params.name && params.key) return "project-detail";
      if (params.name) return "workspace-detail";
      return "workspaces";
    }
    if (currentPath.startsWith("/test-cases")) {
      if (params.id) return "test-case-detail";
      return "test-cases";
    }
    if (currentPath.startsWith("/test-suites")) return "test-suites";
    if (currentPath.startsWith("/executions")) return "executions";
    if (currentPath.startsWith("/reports")) return "reports";
    if (currentPath.startsWith("/users")) return "users";
    if (currentPath.startsWith("/settings")) return "settings";
    return "dashboard";
  };

  const currentPage = getPageType();

  const sidebarPage: PageType =
    currentPage === "workspace-detail" ||
    currentPage === "project-detail" ||
    currentPage === "test-case-detail"
      ? "workspaces"
      : currentPage === "test-cases" ||
          currentPage === "test-suites" ||
          currentPage === "executions"
        ? (currentPage.split("-")[0] as PageType)
        : currentPage;

  const handleNavigate = (page: string) => {
    switch (page) {
      case "dashboard":
        navigate("/");
        break;
      case "workspaces":
        navigate("/workspaces");
        break;
      case "reports":
        navigate("/reports");
        break;
      case "users":
        navigate("/users");
        break;
      case "settings":
        navigate("/settings");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div
      className="flex h-screen bg-background overflow-hidden"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}
    >
      <Sidebar activePage={sidebarPage} onNavigate={handleNavigate} />

      <div className="flex-1 flex flex-col ml-56 min-w-0">
        <TopBar currentPage={currentPage} />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
