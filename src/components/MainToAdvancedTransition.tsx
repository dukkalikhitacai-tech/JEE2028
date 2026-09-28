import React from 'react';
import { MAIN_TO_ADVANCED_STEPS } from '../data/timelineData';
import { ArrowDown, AlertCircle, ShieldAlert, Award, Compass, Zap } from 'lucide-react';

export const MainToAdvancedTransition: React.FC = () => {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-950/20 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl">
          {/* Header */}
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 font-bold uppercase tracking-wider mb-2">
              <Zap className="h-4 w-4" />
              <span>The Mindset & Analytical Pivot</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              MAIN IS NOT THE END.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              JEE Main secures your national NIT/IIIT benchmark. But the dream of walking into an Indian Institute of Technology requires a fundamental pivot from speed to uncompromising analytical depth.
            </p>
          </div>

          {/* Vertical Transition Flowchart */}
          <div className="relative max-w-3xl mx-auto space-y-4">
            {MAIN_TO_ADVANCED_STEPS.map((item, idx) => (
              <React.Fragment key={item.step}>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 transition-colors shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950 text-purple-300 border border-purple-800 font-mono font-bold text-sm shrink-0">
                    0{item.step}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {idx < MAIN_TO_ADVANCED_STEPS.length - 1 && (
                  <div className="flex justify-center my-1">
                    <ArrowDown className="h-5 w-5 text-purple-400/70" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Official Rule & Eligibility Disclaimer */}
          <div className="mt-8 p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
            <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-300 font-semibold block mb-0.5">
                Official Eligibility & Regulatory Rule
              </strong>
              <span>
                Eligibility criteria, top 2,50,000 category cutoff ranks, number of permissible attempts (maximum two consecutive years for JEE Advanced), and board percentage criteria (e.g. 75% aggregate or top 20 percentile) depend strictly on the official Joint Admission Board (JAB) and organizing IIT rules published in the official JEE Advanced 2028 Information Brochure.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
