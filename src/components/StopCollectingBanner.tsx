import React from 'react';
import { ArrowRight, Check, AlertOctagon, Zap } from 'lucide-react';

export const StopCollectingBanner: React.FC = () => {
  const workflowSteps = [
    { num: '01', title: 'LECTURE', desc: 'Single teacher/course' },
    { num: '02', title: 'NOTES', desc: 'Handwritten concise summary' },
    { num: '03', title: 'EXAMPLES', desc: 'Classroom solved illustrations' },
    { num: '04', title: 'BASIC QUESTIONS', desc: 'Foundation level drills (HCV)' },
    { num: '05', title: 'JEE MAIN PYQs', desc: 'Last 5 years shift papers' },
    { num: '06', title: 'JEE ADVANCED PYQs', desc: 'Multi-concept problems' },
    { num: '07', title: 'TEST', desc: 'Timed chapter test (45 min)' },
    { num: '08', title: 'ERROR LOG', desc: 'Log mistakes & root cause' },
    { num: '09', title: 'REVISION', desc: 'Spaced review (1, 7, 21 days)' },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-b from-rose-950/20 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle accent border line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-80" />

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-rose-400 font-semibold uppercase tracking-wider mb-2">
                <AlertOctagon className="h-4 w-4" />
                <span>The Anti-Hoarding Protocol</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                STOP COLLECTING. START SOLVING.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
                The biggest trap in JEE preparation is accumulating 10 Telegram channels, 8 reference books, and 5 video courses. 
                Switching teachers resets your momentum to zero. Stick to <strong className="text-white">one verified lecture source</strong> and <strong className="text-white">one problem book</strong>, then run this exact 9-stage workflow for every chapter.
              </p>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 shrink-0">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-rose-950 text-rose-400 border border-rose-800/60 font-mono text-lg font-bold">
                1:1
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">The Golden Rule</span>
                <span className="text-slate-400">1 Primary Lecture + 1 Primary Book</span>
              </div>
            </div>
          </div>

          {/* 9-Step Linear Chapter Workflow */}
          <div className="relative">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">
              Standard 9-Stage Chapter Execution Pipeline
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
              {workflowSteps.map((step, idx) => (
                <div
                  key={step.num}
                  className="flex flex-col justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-colors group relative"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
                      <span>{step.num}</span>
                      {idx < workflowSteps.length - 1 && (
                        <ArrowRight className="h-3 w-3 text-slate-600 group-hover:text-cyan-400 hidden lg:block" />
                      )}
                    </div>
                    <div className="font-bold text-xs text-white group-hover:text-cyan-300 transition-colors">
                      {step.title}
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-2 leading-tight">
                    {step.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-800/80 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" />
              <span>Applied systematically to all 35 chapters in the Road to IIT syllabus tracker.</span>
            </div>
            <div className="font-mono text-cyan-400/90">
              Pipeline Rule: Never jump to Step 06 without logging Step 05.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
