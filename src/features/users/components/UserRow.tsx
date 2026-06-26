import type { User } from "../types/user";

const roleColors: Record<string, string> = {
  Admin: "bg-purple-100 text-purple-700",
  "QA Lead": "bg-blue-100 text-blue-700",
  Developer: "bg-indigo-100 text-indigo-700",
  Tester: "bg-teal-100 text-teal-700",
  Viewer: "bg-gray-100 text-gray-600",
};

interface UserRowProps {
  user: User;
}

export function UserRow({ user }: UserRowProps) {
  const rc = roleColors[user.role] ?? roleColors.Viewer;

  return (
    <tr className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <span className="text-[13px] font-medium text-foreground">
            {user.name}
          </span>
        </div>
      </td>
      <td className="px-4 py-3 text-[12px] text-muted-foreground">
        {user.email}
      </td>
      <td className="px-4 py-3">
        <span
          className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${rc}`}
        >
          {user.role}
        </span>
      </td>
      <td className="px-4 py-3 text-[13px] text-foreground">
        {user.workspaces}
      </td>
      <td className="px-4 py-3 text-[13px] text-foreground">
        {user.casesAssigned}
      </td>
      <td className="px-4 py-3 text-[12px] text-muted-foreground">
        {user.lastActive}
      </td>
      <td className="px-4 py-3">
        <span
          className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
            user.status === "active"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {user.status === "active" ? "Active" : "Inactive"}
        </span>
      </td>
    </tr>
  );
}
