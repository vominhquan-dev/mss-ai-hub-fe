import type { User } from "../types/user";
import { UserRow } from "./UserRow";

interface UserTableProps {
  users: User[];
}

const columns = [
  "User",
  "Email",
  "Role",
  "Workspaces",
  "Assigned Cases",
  "Last Active",
  "Status",
];

export function UserTable({ users }: UserTableProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            {columns.map((h) => (
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
          {users.map((u) => (
            <UserRow key={u.email} user={u} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
