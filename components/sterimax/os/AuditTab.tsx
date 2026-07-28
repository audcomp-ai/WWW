"use client";

import { osAuditLog } from "@/data/sterimax-os";
import { getSteriMaxAgent } from "@/data/sterimax-agents";

export function AuditTab() {
  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/[0.1] overflow-hidden">
      <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between gap-4 flex-wrap">
        <h3 className="text-white text-sm font-bold">Audit log · today</h3>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#4a6785]">
          Every agent action · immutable · exportable
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              {["Time", "Agent", "Action", "Detail", "Review state"].map((c) => (
                <th
                  key={c}
                  className="text-[10px] font-black uppercase tracking-widest text-[#4a6785] px-6 py-3 whitespace-nowrap"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {osAuditLog.map((e) => (
              <tr key={`${e.time}-${e.agentId}`} className="border-t border-white/[0.06]">
                <td className="px-6 py-3 text-[12px] font-black text-[#4a6785] whitespace-nowrap">
                  {e.time}
                </td>
                <td className="px-6 py-3 text-[13px] font-semibold text-white whitespace-nowrap">
                  {getSteriMaxAgent(e.agentId)?.name ?? e.agentId}
                </td>
                <td className="px-6 py-3 text-[13px] font-medium text-white">{e.action}</td>
                <td className="px-6 py-3 text-[12px] font-medium text-slate-400">{e.detail}</td>
                <td className="px-6 py-3 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#06b6d4]/15 border border-[#06b6d4]/30 text-[#06b6d4] text-[9px] font-black uppercase tracking-widest">
                    {e.review}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
