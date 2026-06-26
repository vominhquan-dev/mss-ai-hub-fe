import { useState } from "react";
import type { User } from "../types/user";

interface UserFormProps {
  onSubmit: (user: Omit<User, "lastActive" | "status">) => void;
  onCancel: () => void;
}

export function UserForm({ onSubmit, onCancel }: UserFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>("Tester");
  const [workspaces, setWorkspaces] = useState(1);
  const [casesAssigned, setCasesAssigned] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, role, workspaces, casesAssigned } as Omit<
      User,
      "lastActive" | "status"
    >);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-lg p-4 space-y-3"
    >
      <h3 className="text-[13px] font-medium text-foreground">Invite User</h3>
      <div>
        <label className="text-[11px] text-muted-foreground block mb-1">
          Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-1.5 text-[13px] bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring/30"
          required
        />
      </div>
      <div>
        <label className="text-[11px] text-muted-foreground block mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-1.5 text-[13px] bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring/30"
          required
        />
      </div>
      <div>
        <label className="text-[11px] text-muted-foreground block mb-1">
          Role
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3 py-1.5 text-[13px] bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring/30"
        >
          <option>Admin</option>
          <option>QA Lead</option>
          <option>Developer</option>
          <option>Tester</option>
          <option>Viewer</option>
        </select>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 text-[13px] bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity"
        >
          Invite
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 text-[13px] bg-muted text-muted-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
