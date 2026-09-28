import React from 'react';
import { FINAL_100_DAYS_DATA } from '../data/timelineData';
import { Flame, AlertTriangle, ShieldCheck, Heart, Moon, BookOpen, Check } from 'lucide-react';

export const Final100Days: React.FC = () => {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-rose-500/40 bg-gradient-to-b from-rose-950/30 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle top glow bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600" />

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-rose-400 font-bold uppercase tracking-wider mb-2">
                <Flame className="h-4 w-4 text-rose-500 animate-pulse" />
                <span>The Crucible Phase</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                THE FINAL 100 DAYS
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
                When time compresses, strategy overtakes raw effort. The Final 100 days is not the time to accumulate new books — it is the time to synthesize and master what you already possess.
              </p>
            </div>

            {/* Crucial Emphases Card */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 max-w-xs space-y-2 text-xs text-slate-300">
              <span className="font-bold text-amber-400 block uppercase tracking-wider text-[11px]">
                The Final 100 Law:
              </span>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                “A calm, well-rested mind with 80% syllabus mastery will always outperform an anxious, sleep-deprived mind with 100% incomplete coverage.”
              </p>
            </div>
          </div>

          {/* Timeline Blocks: 100-70, 70-40, 40-20, 20-7, Final 7 */}
          <div className="space-y-4">
            {FINAL_100_DAYS_DATA.map((block, idx) => (
              <div
                key={block.range}
                className="p-5 rounded-2xl border border-slate-800/90 bg-slate-900/80 hover:border-rose-500/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-black text-rose-400 px-2.5 py-1 rounded bg-rose-950/60 border border-rose-800/60">
                      {block.range}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {block.focus}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Phase Execution Directive #{idx + 1}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {block.keyDirectives.map((directive, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
                      <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{directive}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 6 Commandments of Final 100 */}
          <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-rose-400 block mb-1">01</span>
              <span className="text-slate-300 font-medium">No New Books</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-amber-400 block mb-1">02</span>
              <span className="text-slate-300 font-medium">Revise Errors</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-cyan-400 block mb-1">03</span>
              <span className="text-slate-300 font-medium">Master Formulas</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-blue-400 block mb-1">04</span>
              <span className="text-slate-300 font-medium">Shift PYQs Only</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-purple-400 block mb-1">05</span>
              <span className="text-slate-300 font-medium">Realistic Mocks</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-emerald-400 block mb-1">06</span>
              <span className="text-slate-300 font-medium">7h Sleep Rhythm</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
