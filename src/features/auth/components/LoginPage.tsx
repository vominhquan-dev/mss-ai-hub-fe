import { useState } from "react";
import { Zap, Loader } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const { login, isLoading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<"admin" | "tester" | null>(
    null,
  );

  const roles = [
    {
      id: "admin",
      label: "Admin",
      description: "System Administrator",
      email: "admin@aihub.com",
      icon: "🔧",
      color: "bg-red-50 border-red-200 hover:border-red-400",
    },
    {
      id: "tester",
      label: "Tester",
      description: "Workspace & Test Management",
      email: "tester@aihub.com",
      icon: "🧪",
      color: "bg-green-50 border-green-200 hover:border-green-400",
    },
  ];

  const handleLogin = async () => {
    if (selectedRole) {
      const role = roles.find((r) => r.id === selectedRole);
      if (role) {
        await login(role.email, "");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-[24px] font-bold text-foreground">AIHUB</h1>
            <p className="text-[12px] text-muted-foreground">
              Test Management Platform
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-[32px] font-bold text-foreground mb-2">
            Welcome to AIHUB
          </h2>
          <p className="text-[14px] text-muted-foreground">
            Select your role to continue
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id as any)}
              className={`p-6 rounded-lg border-2 transition-all ${
                selectedRole === role.id
                  ? `${role.color.replace("hover:", "")} border-current ring-2 ring-primary/50`
                  : `${role.color} border-transparent`
              }`}
            >
              <div className="text-[32px] mb-3 text-center">{role.icon}</div>
              <h3 className="text-[14px] font-semibold text-foreground mb-1">
                {role.label}
              </h3>
              <p className="text-[12px] text-muted-foreground">
                {role.description}
              </p>
            </button>
          ))}
        </div>

        {/* Selected Role Info */}
        {selectedRole && (
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <p className="text-[12px] text-muted-foreground mb-1">
              Logging in as:
            </p>
            <p className="text-[13px] font-semibold text-foreground">
              {roles.find((r) => r.id === selectedRole)?.label}
            </p>
            <p className="text-[12px] text-muted-foreground mt-1">
              {roles.find((r) => r.id === selectedRole)?.email}
            </p>
          </div>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={!selectedRole || isLoading}
          className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-[14px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && <Loader className="w-4 h-4 animate-spin" />}
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        {/* Footer */}
        <p className="text-center text-[12px] text-muted-foreground mt-6">
          Demo Environment • Click a role to login
        </p>
      </div>
    </div>
  );
}
