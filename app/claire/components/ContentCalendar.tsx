"use client";

import { useState } from "react";

type ContentStatus = "draft" | "scheduled" | "published" | "review";
type ContentType = "blog" | "newsletter" | "landing-page";

interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  date: string;
  keyword?: string;
  funnelStage: "TOFU" | "MOFU" | "BOFU";
  notes?: string;
}

const SAMPLE_ITEMS: ContentItem[] = [
  {
    id: "1",
    title: "Why Zero Trust Architecture Matters for Canadian SMBs",
    type: "blog",
    status: "published",
    date: "2026-06-23",
    keyword: "zero trust architecture Canada",
    funnelStage: "TOFU",
  },
  {
    id: "2",
    title: "5 Signs Your Business Needs a Virtual CIO",
    type: "blog",
    status: "scheduled",
    date: "2026-06-30",
    keyword: "virtual CIO services Hamilton",
    funnelStage: "MOFU",
  },
  {
    id: "3",
    title: "June Newsletter, Cybersecurity Awareness",
    type: "newsletter",
    status: "scheduled",
    date: "2026-06-27",
    funnelStage: "MOFU",
  },
  {
    id: "4",
    title: "Microsoft Copilot ROI Calculator Landing Page",
    type: "landing-page",
    status: "draft",
    date: "2026-07-02",
    keyword: "Microsoft Copilot ROI",
    funnelStage: "BOFU",
  },
  {
    id: "5",
    title: "Azure Cloud Migration Checklist for Healthcare",
    type: "blog",
    status: "review",
    date: "2026-07-07",
    keyword: "Azure migration healthcare",
    funnelStage: "MOFU",
  },
  {
    id: "6",
    title: "July Newsletter, AI in the Workplace",
    type: "newsletter",
    status: "draft",
    date: "2026-07-10",
    funnelStage: "TOFU",
  },
];

const statusConfig: Record<ContentStatus, { label: string; color: string; bg: string }> = {
  draft: { label: "Draft", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
  scheduled: { label: "Scheduled", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
  published: { label: "Published", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  review: { label: "In Review", color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/20" },
};

const typeConfig: Record<ContentType, { label: string; icon: string }> = {
  blog: { label: "Blog Post", icon: "fa-file-alt" },
  newsletter: { label: "Newsletter", icon: "fa-envelope" },
  "landing-page": { label: "Landing Page", icon: "fa-window-maximize" },
};

const funnelColors: Record<string, string> = {
  TOFU: "text-sky-400 bg-sky-400/10",
  MOFU: "text-violet-400 bg-violet-400/10",
  BOFU: "text-rose-400 bg-rose-400/10",
};

export default function ContentCalendar() {
  const [items, setItems] = useState<ContentItem[]>(SAMPLE_ITEMS);
  const [filter, setFilter] = useState<ContentStatus | "all">("all");
  const [showCreate, setShowCreate] = useState(false);
  const [newItem, setNewItem] = useState<Partial<ContentItem>>({
    type: "blog",
    status: "draft",
    funnelStage: "TOFU",
  });

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);

  function handleCreate() {
    if (!newItem.title || !newItem.date) return;
    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: newItem.title!,
        type: newItem.type as ContentType,
        status: newItem.status as ContentStatus,
        date: newItem.date!,
        keyword: newItem.keyword,
        funnelStage: newItem.funnelStage as "TOFU" | "MOFU" | "BOFU",
        notes: newItem.notes,
      },
    ]);
    setNewItem({ type: "blog", status: "draft", funnelStage: "TOFU" });
    setShowCreate(false);
  }

  function handleStatusChange(id: string, status: ContentStatus) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
  }

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div>
      {/* Header bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {(["all", "draft", "scheduled", "review", "published"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === s
                  ? "bg-[#06b6d4]/20 text-[#06b6d4] border border-[#06b6d4]/30"
                  : "bg-white/[0.04] text-white/40 border border-white/[0.06] hover:text-white/70"
              }`}
            >
              {s === "all" ? "All" : statusConfig[s].label}
              <span className="ml-1.5 text-[10px] opacity-60">
                {s === "all" ? items.length : items.filter((i) => i.status === s).length}
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#06b6d4] to-[#0071e3] text-white px-4 py-2 rounded-lg text-xs font-medium hover:opacity-90 transition-all"
        >
          <i className="fas fa-plus text-[10px]" />
          New Content
        </button>
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 mb-6">
          <h3 className="text-white text-sm font-medium mb-3">Create Content Item</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Title"
              value={newItem.title || ""}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#06b6d4]/50 col-span-full"
            />
            <select
              value={newItem.type}
              onChange={(e) => setNewItem({ ...newItem, type: e.target.value as ContentType })}
              className="bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white/70 focus:outline-none"
            >
              <option value="blog">Blog Post</option>
              <option value="newsletter">Newsletter</option>
              <option value="landing-page">Landing Page</option>
            </select>
            <input
              type="date"
              value={newItem.date || ""}
              onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
              className="bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white/70 focus:outline-none"
            />
            <select
              value={newItem.funnelStage}
              onChange={(e) => setNewItem({ ...newItem, funnelStage: e.target.value as "TOFU" | "MOFU" | "BOFU" })}
              className="bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white/70 focus:outline-none"
            >
              <option value="TOFU">TOFU</option>
              <option value="MOFU">MOFU</option>
              <option value="BOFU">BOFU</option>
            </select>
            <input
              type="text"
              placeholder="Target keyword (optional)"
              value={newItem.keyword || ""}
              onChange={(e) => setNewItem({ ...newItem, keyword: e.target.value })}
              className="bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none col-span-full sm:col-span-1 lg:col-span-2"
            />
          </div>
          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={() => setShowCreate(false)}
              className="px-4 py-2 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!newItem.title || !newItem.date}
              className="px-4 py-2 bg-[#06b6d4] text-white rounded-lg text-xs font-medium hover:opacity-90 disabled:opacity-30 transition-all"
            >
              Create
            </button>
          </div>
        </div>
      )}

      {/* Content list */}
      <div className="space-y-2">
        {filtered.sort((a, b) => a.date.localeCompare(b.date)).map((item) => (
          <div
            key={item.id}
            className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:bg-white/[0.05] transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <i className={`fas ${typeConfig[item.type].icon} text-[10px] text-white/30`} />
                  <span className="text-[10px] text-white/30 uppercase tracking-wider">{typeConfig[item.type].label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${funnelColors[item.funnelStage]}`}>
                    {item.funnelStage}
                  </span>
                </div>
                <h4 className="text-white text-sm font-medium truncate">{item.title}</h4>
                {item.keyword && (
                  <p className="text-white/30 text-xs mt-1">
                    <i className="fas fa-key text-[8px] mr-1" /> {item.keyword}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-white/30 text-xs">
                  {new Date(item.date + "T00:00:00").toLocaleDateString("en-CA", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item.id, e.target.value as ContentStatus)}
                  className={`text-xs px-2 py-1 rounded-lg border ${statusConfig[item.status].bg} ${statusConfig[item.status].color} bg-transparent focus:outline-none cursor-pointer`}
                >
                  <option value="draft">Draft</option>
                  <option value="review">In Review</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                </select>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-white/10 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <i className="fas fa-trash text-xs" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-white/20">
          <i className="fas fa-calendar-times text-3xl mb-3" />
          <p className="text-sm">No content items found</p>
        </div>
      )}
    </div>
  );
}
