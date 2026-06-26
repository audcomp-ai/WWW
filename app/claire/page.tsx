"use client";

import { useState } from "react";
import ClaireChat from "./components/ClaireChat";
import ContentCalendar from "./components/ContentCalendar";
import SEOAuditPanel from "./components/SEOAuditPanel";
import AgentStatus from "./components/AgentStatus";

type Tab = "chat" | "calendar" | "audit" | "agents";

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "chat", label: "Chat with Claire", icon: "fa-comments" },
  { id: "calendar", label: "Content Calendar", icon: "fa-calendar-alt" },
  { id: "audit", label: "SEO / AEO Audit", icon: "fa-chart-line" },
  { id: "agents", label: "Agent Status", icon: "fa-robot" },
];

export default function ClaireCommandCenter() {
  const [activeTab, setActiveTab] = useState<Tab>("chat");

  return (
    <div className="min-h-screen bg-[#040e1a]">
      {/* Header */}
      <div className="border-b border-white/[0.08] bg-[#071e3d]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#0071e3] flex items-center justify-center">
                <i className="fas fa-pen-nib text-white text-lg" />
              </div>
              <div>
                <h1 className="text-white font-semibold text-lg tracking-tight">Claire Command Center</h1>
                <p className="text-white/40 text-xs">Content Marketing Specialist AI Agent</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-white/[0.06] bg-[#071e3d]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-[#06b6d4] text-[#06b6d4]"
                    : "border-transparent text-white/40 hover:text-white/70"
                }`}
              >
                <i className={`fas ${tab.icon} text-xs`} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "chat" && <ClaireChat />}
        {activeTab === "calendar" && <ContentCalendar />}
        {activeTab === "audit" && <SEOAuditPanel />}
        {activeTab === "agents" && <AgentStatus />}
      </div>
    </div>
  );
}
