import { Plus, Search } from "lucide-react";
import { useUsers } from "../hooks/useUsers";
import { useCreateUser } from "../hooks/useCreateUser";
import { roleSummary } from "../api/userApi";
import { UserTable } from "./UserTable";
import { UserForm } from "./UserForm";

export function UsersPage() {
  const {
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    filteredUsers,
  } = useUsers();
  const { isOpen, open, close, createUser } = useCreateUser();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground">Users</h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">
            Manage team members and roles
          </p>
        </div>
        <button
          onClick={open}
          className="flex items-center gap-1.5 text-[13px] bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity"
        >
          <Plus className="w-3.5 h-3.5" />
          Invite User
        </button>
      </div>

      {/* Role summary */}
      <div className="grid grid-cols-5 gap-3">
        {roleSummary.map((r) => (
          <div
            key={r.role}
            className="bg-card border border-border rounded-lg p-3 text-center"
          >
            <p className={`text-[20px] font-semibold ${r.color}`}>{r.count}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{r.role}</p>
          </div>
        ))}
      </div>

      {/* Invite form */}
      {isOpen && <UserForm onSubmit={createUser} onCancel={close} />}

      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-3 py-1.5 w-full text-[13px] bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="text-[13px] bg-card border border-border rounded-md px-2.5 py-1.5 text-muted-foreground focus:outline-none"
        >
          <option>All Roles</option>
          <option>Admin</option>
          <option>QA Lead</option>
          <option>Developer</option>
          <option>Tester</option>
          <option>Viewer</option>
        </select>
      </div>

      {/* Table */}
      <UserTable users={filteredUsers} />
    </div>
  );
}
