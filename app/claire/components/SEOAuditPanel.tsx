"use client";

import { useState } from "react";

interface AuditResult {
  url: string;
  timestamp: string;
  scores: {
    seo: number;
    aeo: number;
    content: number;
    technical: number;
  };
  issues: { severity: "high" | "medium" | "low"; message: string; category: string }[];
  suggestions: string[];
}

const SAMPLE_AUDITS: AuditResult[] = [
  {
    url: "/managed-it-services",
    timestamp: "2026-06-25T14:30:00",
    scores: { seo: 78, aeo: 62, content: 85, technical: 91 },
    issues: [
      { severity: "high", message: "Missing FAQ schema markup for AEO", category: "AEO" },
      { severity: "medium", message: "Meta description exceeds 155 characters", category: "SEO" },
      { severity: "medium", message: "No internal links to blog content", category: "Content" },
      { severity: "low", message: "Image alt text could be more descriptive", category: "SEO" },
    ],
    suggestions: [
      "Add FAQ structured data with 5-8 common questions for AI answer engine visibility",
      "Shorten meta description to 145-155 characters with primary keyword",
      "Add 2-3 contextual links to related blog posts",
      "Add a 'People Also Ask' section to target featured snippets",
    ],
  },
  {
    url: "/cloud-solutions",
    timestamp: "2026-06-25T14:32:00",
    scores: { seo: 84, aeo: 71, content: 79, technical: 88 },
    issues: [
      { severity: "high", message: "No HowTo or FAQ schema for AEO optimization", category: "AEO" },
      { severity: "medium", message: "H2 headings don't target question-based queries", category: "AEO" },
      { severity: "low", message: "Page could benefit from comparison table markup", category: "Content" },
    ],
    suggestions: [
      "Restructure H2s as questions (e.g., 'What is hybrid cloud?' for AEO)",
      "Add comparison table: On-Premise vs Cloud vs Hybrid",
      "Include client-specific ROI data points for social proof",
    ],
  },
];

function ScoreRing({ score, label, size = 60 }: { score: number; label: string; size?: number }) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "#34d399" : score >= 60 ? "#fbbf24" : "#f87171";

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.06)" strokeWidth="4" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute flex items-center justify-center" style={{ width: size, height: size }}>
        <span className="text-white font-semibold text-sm">{score}</span>
      </div>
      <span className="text-white/40 text-[10px] uppercase tracking-wider">{label}</span>
    </div>
  );
}

const severityConfig = {
  high: { color: "text-red-400", bg: "bg-red-400/10", icon: "fa-exclamation-circle" },
  medium: { color: "text-amber-400", bg: "bg-amber-400/10", icon: "fa-exclamation-triangle" },
  low: { color: "text-blue-400", bg: "bg-blue-400/10", icon: "fa-info-circle" },
};

export default function SEOAuditPanel() {
  const [audits, setAudits] = useState<AuditResult[]>(SAMPLE_AUDITS);
  const [auditUrl, setAuditUrl] = useState("");
  const [isAuditing, setIsAuditing] = useState(false);
  const [expandedAudit, setExpandedAudit] = useState<string | null>(SAMPLE_AUDITS[0]?.url ?? null);

  async function runAudit() {
    if (!auditUrl.trim()) return;
    setIsAuditing(true);

    try {
      const res = await fetch("/api/claire/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: auditUrl }),
      });

      if (res.ok) {
        const data = await res.json();
        setAudits((prev) => [data, ...prev]);
        setExpandedAudit(data.url);
      }
    } catch {
      // Audit failed
    } finally {
      setIsAuditing(false);
      setAuditUrl("");
    }
  }

  return (
    <div>
      {/* Audit runner */}
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 mb-6">
        <h3 className="text-white text-sm font-medium mb-3">Run SEO / AEO Audit</h3>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter page path (e.g., /managed-it-services)"
            value={auditUrl}
            onChange={(e) => setAuditUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runAudit()}
            className="flex-1 bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#06b6d4]/50"
          />
          <button
            onClick={runAudit}
            disabled={!auditUrl.trim() || isAuditing}
            className="bg-gradient-to-r from-[#06b6d4] to-[#0071e3] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-30 transition-all flex items-center gap-2"
          >
            {isAuditing ? (
              <>
                <i className="fas fa-spinner animate-spin text-xs" /> Auditing...
              </>
            ) : (
              <>
                <i className="fas fa-search text-xs" /> Run Audit
              </>
            )}
          </button>
        </div>
        <div className="flex gap-2 mt-2">
          {["/managed-it-services", "/cloud-solutions", "/security-services", "/ai-services"].map((path) => (
            <button
              key={path}
              onClick={() => setAuditUrl(path)}
              className="text-[10px] text-white/30 hover:text-white/60 bg-white/[0.03] px-2 py-1 rounded transition-colors"
            >
              {path}
            </button>
          ))}
        </div>
      </div>

      {/* Audit results */}
      <div className="space-y-3">
        {audits.map((audit) => (
          <div key={audit.url + audit.timestamp} className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedAudit(expandedAudit === audit.url ? null : audit.url)}
              className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex gap-3">
                  {(["seo", "aeo", "content", "technical"] as const).map((key) => (
                    <div key={key} className="relative flex flex-col items-center">
                      <ScoreRing score={audit.scores[key]} label={key} size={48} />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <h4 className="text-white text-sm font-medium">{audit.url}</h4>
                  <p className="text-white/30 text-xs">
                    {new Date(audit.timestamp).toLocaleDateString("en-CA", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {" · "}
                    {audit.issues.length} issues found
                  </p>
                </div>
              </div>
              <i className={`fas fa-chevron-down text-white/20 text-xs transition-transform ${expandedAudit === audit.url ? "rotate-180" : ""}`} />
            </button>

            {expandedAudit === audit.url && (
              <div className="border-t border-white/[0.06] p-4 space-y-4">
                {/* Issues */}
                <div>
                  <h5 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">Issues</h5>
                  <div className="space-y-1.5">
                    {audit.issues.map((issue, i) => (
                      <div key={i} className={`flex items-start gap-2 px-3 py-2 rounded-lg ${severityConfig[issue.severity].bg}`}>
                        <i className={`fas ${severityConfig[issue.severity].icon} ${severityConfig[issue.severity].color} text-xs mt-0.5`} />
                        <div className="flex-1">
                          <span className={`text-sm ${severityConfig[issue.severity].color}`}>{issue.message}</span>
                          <span className="text-white/20 text-[10px] ml-2">{issue.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggestions */}
                <div>
                  <h5 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">Recommendations</h5>
                  <div className="space-y-1.5">
                    {audit.suggestions.map((s, i) => (
                      <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-lg bg-emerald-400/5">
                        <i className="fas fa-lightbulb text-emerald-400 text-xs mt-0.5" />
                        <span className="text-sm text-white/60">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-[#06b6d4]/10 border border-[#06b6d4]/20 text-[#06b6d4] rounded-lg text-xs hover:bg-[#06b6d4]/20 transition-all">
                    <i className="fas fa-magic text-[10px]" /> Ask Claire to Fix
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] text-white/50 rounded-lg text-xs hover:text-white/70 transition-all">
                    <i className="fas fa-download text-[10px]" /> Export Report
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
