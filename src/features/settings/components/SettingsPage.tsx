import { Bell, Shield, Link2, Globe, Key, CheckCircle2 } from "lucide-react";

export function SettingsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-foreground">Settings</h1>
        <p className="text-muted-foreground text-[13px] mt-0.5">Platform configuration and preferences</p>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Sidebar nav */}
        <div className="col-span-3">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {[
              { label: "General", icon: Globe, active: true },
              { label: "Notifications", icon: Bell, active: false },
              { label: "Integrations", icon: Link2, active: false },
              { label: "Security", icon: Shield, active: false },
              { label: "API Keys", icon: Key, active: false },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-[13px] border-b border-border last:border-0 transition-colors ${item.active ? "bg-accent text-primary font-medium" : "text-muted-foreground hover:bg-muted/40"}`}
                >
                  <Icon className={`w-4 h-4 ${item.active ? "text-primary" : ""}`} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="col-span-9 space-y-4">
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-foreground mb-4">General Settings</h3>
            <div className="space-y-4">
              {[
                { label: "Platform Name", value: "AIHUB Test Management" },
                { label: "Organization", value: "Acme Corporation" },
                { label: "Default Timezone", value: "UTC+0 (London)" },
                { label: "Date Format", value: "YYYY-MM-DD" },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-4">
                  <label className="text-[13px] text-foreground w-44 flex-shrink-0">{f.label}</label>
                  <input
                    defaultValue={f.value}
                    className="flex-1 px-3 py-1.5 text-[13px] bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary"
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button className="text-[13px] border border-border bg-card text-foreground px-3 py-1.5 rounded-md hover:bg-muted/50 transition-colors">Cancel</button>
              <button className="text-[13px] bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">Save Changes</button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-foreground mb-1">Jira Integration</h3>
            <p className="text-[12px] text-muted-foreground mb-4">Global Jira configuration for all workspaces</p>
            <div className="space-y-3">
              {[
                { label: "Connected Accounts", value: "6 active", icon: CheckCircle2, good: true },
                { label: "Sync Frequency", value: "Every 15 minutes" },
                { label: "Webhook URL", value: "https://aihub.app/api/jira/webhook" },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-4">
                  <label className="text-[13px] text-foreground w-44 flex-shrink-0">{f.label}</label>
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      defaultValue={f.value}
                      readOnly={"icon" in f}
                      className={`flex-1 px-3 py-1.5 text-[13px] border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring/30 ${"icon" in f ? "bg-muted text-muted-foreground" : "bg-input-background focus:border-primary"}`}
                    />
                    {"icon" in f && f.good && <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
