import { ReactNode } from "react";
import { useAuth, UserRole } from "../contexts/AuthContext";
import { hasPermission, Permission } from "../utils/permissions";

interface ProtectedProps {
  requiredRole?: UserRole[];
  requiredPermission?: Permission[];
  requireAll?: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Protected component that conditionally renders children based on user role and permissions
 * 
 * @param requiredRole - Array of roles that can access (if user role is not in this array, access denied)
 * @param requiredPermission - Array of permissions needed
 * @param requireAll - If true, user must have ALL permissions. If false, user needs ANY permission
 * @param children - Component to render if access granted
 * @param fallback - Component to render if access denied
 */
export function Protected({
  requiredRole,
  requiredPermission,
  requireAll = false,
  children,
  fallback = null,
}: ProtectedProps) {
  const { user } = useAuth();

  if (!user) {
    return fallback;
  }

  // Check role
  if (requiredRole && !requiredRole.includes(user.role)) {
    return fallback;
  }

  // Check permissions
  if (requiredPermission && requiredPermission.length > 0) {
    const hasAccess = requireAll
      ? requiredPermission.every((perm) => hasPermission(user.role, perm))
      : requiredPermission.some((perm) => hasPermission(user.role, perm));

    if (!hasAccess) {
      return fallback;
    }
  }

  return children;
}

/**
 * Utility hook to check if user has access
 */
export function useHasAccess(
  requiredRole?: UserRole[],
  requiredPermission?: Permission[],
  requireAll?: boolean
): boolean {
  const { user } = useAuth();

  if (!user) return false;

  if (requiredRole && !requiredRole.includes(user.role)) {
    return false;
  }

  if (requiredPermission && requiredPermission.length > 0) {
    return requireAll
      ? requiredPermission.every((perm) => hasPermission(user.role, perm))
      : requiredPermission.some((perm) => hasPermission(user.role, perm));
  }

  return true;
}
