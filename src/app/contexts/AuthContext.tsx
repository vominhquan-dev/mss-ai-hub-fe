import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "tester";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
  status: "active" | "inactive";
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: Record<string, AuthUser> = {
  admin: {
    id: "usr-001",
    email: "admin@aihub.com",
    name: "Admin User",
    role: "admin",
    avatar: "AU",
    status: "active",
  },
  tester: {
    id: "usr-003",
    email: "tester@aihub.com",
    name: "Mike R.",
    role: "tester",
    avatar: "MR",
    status: "active",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - find user by email or role
      const userKey = Object.keys(MOCK_USERS).find(
        (key) => MOCK_USERS[key].email === email || key === email
      );

      if (userKey) {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setUser(MOCK_USERS[userKey]);
      } else {
        throw new Error("User not found");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
