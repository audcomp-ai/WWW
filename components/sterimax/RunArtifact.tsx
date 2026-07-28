"use client";

import type { RunArtifact } from "@/data/sterimax-runs";

export function ArtifactView({ artifact }: { artifact: RunArtifact }) {
  return (
    <div className="rounded-2xl bg-[#071e3d] border border-white/[0.1] overflow-hidden">
      <div className="px-6 py-5 border-b border-white/[0.08]">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h4 className="text-white text-lg font-black tracking-tight">{artifact.title}</h4>
            <p className="text-[#4a6785] text-xs font-medium mt-1">{artifact.subtitle}</p>
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#06b6d4]/15 border border-[#06b6d4]/30 text-[#06b6d4] text-[10px] font-black uppercase tracking-widest shrink-0">
            <i className="fas fa-user-check text-[9px]" /> {artifact.reviewState}
          </span>
        </div>
      </div>

      <div className="p-6">
        {artifact.kind === "table" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  {(artifact.columns ?? []).map((c) => (
                    <th
                      key={c}
                      className="text-[10px] font-black uppercase tracking-widest text-[#4a6785] pb-3 pr-4 whitespace-nowrap"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(artifact.rows ?? []).map((row) => (
                  <tr key={row[0]} className="border-t border-white/[0.06]">
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className={`py-3 pr-4 text-[13px] font-medium align-top ${
                          i === 0 ? "text-white" : "text-slate-400"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {artifact.fields.map((f) => (
              <div key={f.label}>
                <dt className="text-[10px] font-black uppercase tracking-widest text-[#4a6785] mb-1">
                  {f.label}
                </dt>
                <dd className="text-[13px] font-medium text-white leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="px-6 py-4 border-t border-white/[0.08] bg-white/[0.02]">
        <p className="text-[11px] font-medium text-[#4a6785] flex items-start gap-2">
          <i className="fas fa-shield-halved text-[10px] mt-0.5 text-[#06b6d4]" />
          {artifact.auditNote}
        </p>
      </div>
    </div>
  );
}
