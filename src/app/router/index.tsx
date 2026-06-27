import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../../features/auth";
import { MainLayout } from "../layouts/MainLayout";
import { Dashboard } from "../../features/dashboard";
import { WorkspaceList, WorkspaceDetail } from "../../features/workspaces";
import { ProjectDetail } from "../../features/projects";
import { ReportsPage } from "../../features/reports";
import { UsersPage } from "../../features/users";
import { SettingsPage } from "../../features/settings";
import { TestCasesPage, TestCaseDetail } from "../../features/test-cases";
import { TestSuitesPage } from "../../features/test-suites";
import { ExecutionsPage } from "../../features/executions";
import { RequirementsPage } from "../../features/requirements";
import { UserStoriesPage } from "../../features/user-stories";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { ROUTES } from "../../shared/constants/routes";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="workspaces" element={<WorkspaceList />} />
          <Route path="workspaces/:name" element={<WorkspaceDetail />} />
          <Route
            path="workspaces/:name/projects/:key"
            element={<ProjectDetail />}
          />
          <Route path="test-cases" element={<TestCasesPage />} />
          <Route path="test-cases/:id" element={<TestCaseDetail />} />
          <Route path="test-suites" element={<TestSuitesPage />} />
          <Route path="executions" element={<ExecutionsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="requirements" element={<RequirementsPage />} />
          <Route path="user-stories" element={<UserStoriesPage />} />
        </Route>
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
