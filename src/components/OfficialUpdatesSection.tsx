import React from 'react';
import { OFFICIAL_UPDATES, MANDATORY_LEGAL_DISCLAIMER } from '../data/officialUpdatesData';
import { ShieldCheck, ExternalLink, AlertTriangle, FileText, Globe } from 'lucide-react';

export const OfficialUpdatesSection: React.FC = () => {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2">
              <Globe className="h-4 w-4" />
              <span>Authoritative Regulatory Sources</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              OFFICIAL UPDATES & SYLLABUS DIRECTORY
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              We strictly separate verified official government & organizing IIT notices from community consensus and pedagogical recommendations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 max-w-md">
            <span className="font-bold text-white block mb-1">Clear Distinction Legend:</span>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                Official Information
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800">
                Community Recommendations
              </span>
              <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">
                Study Strategy
              </span>
            </div>
          </div>
        </div>

        {/* Directory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OFFICIAL_UPDATES.map(item => {
            const isOfficial = item.sourceType === 'Official Information';
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold ${
                        isOfficial
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : item.sourceType === 'Community Recommendations'
                          ? 'bg-blue-950 text-blue-300 border border-blue-800'
                          : 'bg-purple-950 text-purple-300 border border-purple-800'
                      }`}
                    >
                      {item.sourceType}
                    </span>
                    <span className="text-slate-500 font-mono text-[11px]">{item.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Authority: {item.officialAuthority}
                  </span>

                  {item.verifiedLink && (
                    <a
                      href={item.verifiedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
                    >
                      <span>Visit Portal</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mandatory Policy Disclaimer */}
        <div className="mt-8 p-5 rounded-2xl border border-amber-900/40 bg-amber-950/20 text-xs text-amber-200/90 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-300 uppercase tracking-wider">
            <AlertTriangle className="h-4 w-4" />
            <span>Mandatory Official Exam Disclaimers</span>
          </div>
          <p className="leading-relaxed">
            {MANDATORY_LEGAL_DISCLAIMER.general}
          </p>
          <p className="leading-relaxed text-amber-300/80">
            {MANDATORY_LEGAL_DISCLAIMER.educational}
          </p>
        </div>
      </div>
    </section>
  );
};
