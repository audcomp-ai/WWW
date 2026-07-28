"use client";

import { osSpend } from "@/data/sterimax-os";

export function SpendTab() {
  const remaining = osSpend.cap - osSpend.monthToDate;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { label: "Month to date", value: `$${osSpend.monthToDate.toLocaleString("en-CA")}` },
          { label: "Monthly cap", value: `$${osSpend.cap.toLocaleString("en-CA")}` },
          { label: "Projected", value: `$${osSpend.projected.toLocaleString("en-CA")}` },
          { label: "Remaining", value: `$${remaining.toLocaleString("en-CA")}` },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#4a6785] mb-2">
              {s.label}
            </div>
            <div className="text-2xl font-black text-white tracking-tight">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white/[0.04] border border-white/[0.1] overflow-hidden">
        <div className="px-6 py-5 border-b border-white/[0.08]">
          <h3 className="text-white text-sm font-bold">Spend by agent · July ({osSpend.currency})</h3>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr>
              {["Agent", "Spend", "Share of total"].map((c) => (
                <th
                  key={c}
                  className="text-[10px] font-black uppercase tracking-widest text-[#4a6785] px-6 py-3"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {osSpend.byAgent.map((row) => (
              <tr key={row.agentId} className="border-t border-white/[0.06]">
                <td className="px-6 py-3 text-[13px] font-semibold text-white">{row.label}</td>
                <td className="px-6 py-3 text-[13px] font-black text-white">${row.amount}</td>
                <td className="px-6 py-3 text-[13px] font-medium text-slate-400">
                  {Math.round((row.amount / osSpend.monthToDate) * 100)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[12px] font-medium text-[#4a6785] leading-relaxed max-w-3xl">
        The cap is enforced, not advisory. When projected spend approaches $
        {osSpend.cap.toLocaleString("en-CA")}, Wilfred rebalances model routing to cheaper models
        for low-stakes work before any agent is throttled. All processing runs on Canadian
        infrastructure.
      </p>
    </div>
  );
}
