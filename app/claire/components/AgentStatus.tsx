"use client";

import { useState } from "react";

interface AgentInfo {
  id: string;
  name: string;
  role: string;
  status: "online" | "working" | "idle" | "offline";
  icon: string;
  gradient: string;
  lastActivity: string;
  currentTask?: string;
  stats: { label: string; value: string }[];
  scheduledTasks: { task: string; schedule: string; nextRun: string }[];
}

const agents: AgentInfo[] = [
  {
    id: "claire",
    name: "Claire",
    role: "Content Marketing Specialist",
    status: "online",
    icon: "fa-pen-nib",
    gradient: "from-[#06b6d4] to-[#0071e3]",
    lastActivity: "2 min ago",
    currentTask: "Drafting blog post: 5 Signs Your Business Needs a Virtual CIO",
    stats: [
      { label: "Blog posts", value: "12" },
      { label: "Newsletters", value: "8" },
      { label: "Landing pages", value: "3" },
      { label: "Avg SEO score", value: "84" },
    ],
    scheduledTasks: [
      { task: "Weekly blog draft", schedule: "Every Monday 9:00 AM", nextRun: "Jun 30, 2026" },
      { task: "Newsletter draft", schedule: "Every Thursday 10:00 AM", nextRun: "Jun 27, 2026" },
      { task: "Monthly content calendar", schedule: "1st of month 8:00 AM", nextRun: "Jul 1, 2026" },
      { task: "SEO audit, all pages", schedule: "Every Friday 6:00 AM", nextRun: "Jun 27, 2026" },
    ],
  },
  {
    id: "sentinel",
    name: "Sentinel",
    role: "Cybersecurity Analyst",
    status: "idle",
    icon: "fa-shield-alt",
    gradient: "from-red-500 to-orange-500",
    lastActivity: "1 hour ago",
    stats: [
      { label: "Scans run", value: "47" },
      { label: "Threats blocked", value: "3" },
      { label: "Compliance", value: "98%" },
    ],
    scheduledTasks: [
      { task: "Vulnerability scan", schedule: "Daily 2:00 AM", nextRun: "Jun 27, 2026" },
    ],
  },
  {
    id: "atlas",
    name: "Atlas",
    role: "Infrastructure & Cloud Ops",
    status: "offline",
    icon: "fa-server",
    gradient: "from-violet-500 to-indigo-500",
    lastActivity: "3 days ago",
    stats: [
      { label: "Uptime", value: "99.9%" },
      { label: "Deployments", value: "26" },
    ],
    scheduledTasks: [],
  },
];

const statusConfig = {
  online: { label: "Online", color: "text-emerald-400", dot: "bg-emerald-400" },
  working: { label: "Working", color: "text-blue-400", dot: "bg-blue-400 animate-pulse" },
  idle: { label: "Idle", color: "text-amber-400", dot: "bg-amber-400" },
  offline: { label: "Offline", color: "text-white/30", dot: "bg-white/30" },
};

export default function AgentStatus() {
  const [expanded, setExpanded] = useState<string | null>("claire");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-sm font-medium">Agent Fleet</h2>
          <p className="text-white/30 text-xs mt-0.5">Monitor and manage all AI agents</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-white/30">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {agents.filter((a) => a.status === "online" || a.status === "working").length} active
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" /> {agents.filter((a) => a.status === "offline").length} offline
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === agent.id ? null : agent.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center`}>
                  <i className={`fas ${agent.icon} text-white text-sm`} />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white text-sm font-medium">{agent.name}</h4>
                    <span className={`flex items-center gap-1 text-[10px] ${statusConfig[agent.status].color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[agent.status].dot}`} />
                      {statusConfig[agent.status].label}
                    </span>
                  </div>
                  <p className="text-white/30 text-xs">{agent.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white/20 text-xs">{agent.lastActivity}</span>
                <i className={`fas fa-chevron-down text-white/20 text-xs transition-transform ${expanded === agent.id ? "rotate-180" : ""}`} />
              </div>
            </button>

            {expanded === agent.id && (
              <div className="border-t border-white/[0.06] p-4 space-y-4">
                {agent.currentTask && (
                  <div className="bg-blue-400/5 border border-blue-400/10 rounded-lg px-3 py-2 flex items-center gap-2">
                    <i className="fas fa-spinner animate-spin text-blue-400 text-xs" />
                    <span className="text-sm text-blue-400">{agent.currentTask}</span>
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {agent.stats.map((stat) => (
                    <div key={stat.label} className="bg-white/[0.03] rounded-lg px-3 py-2 text-center">
                      <div className="text-white font-semibold text-lg">{stat.value}</div>
                      <div className="text-white/30 text-[10px] uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Scheduled tasks */}
                {agent.scheduledTasks.length > 0 && (
                  <div>
                    <h5 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">Scheduled Tasks</h5>
                    <div className="space-y-1">
                      {agent.scheduledTasks.map((task, i) => (
                        <div key={i} className="flex items-center justify-between px-3 py-2 bg-white/[0.02] rounded-lg">
                          <div className="flex items-center gap-2">
                            <i className="fas fa-clock text-white/20 text-[10px]" />
                            <span className="text-sm text-white/60">{task.task}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-white/20">{task.schedule}</span>
                            <span className="text-[#06b6d4]">Next: {task.nextRun}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  {agent.id === "claire" && (
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-[#06b6d4]/10 border border-[#06b6d4]/20 text-[#06b6d4] rounded-lg text-xs hover:bg-[#06b6d4]/20 transition-all">
                      <i className="fas fa-comments text-[10px]" /> Open Chat
                    </button>
                  )}
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] text-white/50 rounded-lg text-xs hover:text-white/70 transition-all">
                    <i className="fas fa-cog text-[10px]" /> Settings
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] text-white/50 rounded-lg text-xs hover:text-white/70 transition-all">
                    <i className="fas fa-history text-[10px]" /> Activity Log
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
