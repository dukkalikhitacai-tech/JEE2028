import React from 'react';
import { useRoadmap } from '../context/RoadmapContext';
import { Trophy, Check, Lock, Sparkles, Award } from 'lucide-react';

export const MilestoneWall: React.FC = () => {
  const { milestones, triggerConfetti } = useRoadmap();

  const unlockedCount = milestones.filter(m => m.unlocked).length;
  const totalCount = milestones.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            <Trophy className="h-4 w-4" />
            <span>Honest Progression Badges</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            MILESTONE VAULT
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            No empty gamification. Every milestone unlocks only when real, verified preparation milestones are achieved in your database.
          </p>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
          <span className="text-xs text-slate-400 font-mono">Unlocked:</span>
          <span className="text-lg font-black text-cyan-400 font-mono">
            {unlockedCount} / {totalCount}
          </span>
        </div>
      </div>

      {/* 12 Milestones Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {milestones.map(m => {
          const progressPercent = Math.min(100, Math.round((m.progressValue / m.targetValue) * 100));

          return (
            <div
              key={m.id}
              onClick={() => {
                if (m.unlocked) triggerConfetti();
              }}
              className={`p-5 rounded-2xl border transition-all relative flex flex-col justify-between ${
                m.unlocked
                  ? 'border-cyan-500/50 bg-gradient-to-b from-cyan-950/20 via-slate-900 to-slate-950 shadow-md shadow-cyan-950/30'
                  : 'border-slate-800/80 bg-slate-900/40 opacity-70'
              }`}
            >
              <div>
                {/* Header Icon & Phase Tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 text-2xl shadow-inner">
                    {m.icon}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                    {m.phase}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1">
                  {m.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {m.description}
                </p>
              </div>

              {/* Progress or Unlock Badge */}
              <div className="pt-3 border-t border-slate-800/80">
                {m.unlocked ? (
                  <div className="flex items-center justify-between text-xs text-cyan-300 font-mono">
                    <span className="flex items-center gap-1 font-semibold">
                      <Check className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Unlocked</span>
                    </span>
                    <span className="text-slate-500 text-[10px]">Achieved</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                      <span>{m.progressValue} / {m.targetValue}</span>
                      <span>{progressPercent}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-950 overflow-hidden">
                      <div
                        className="h-full bg-slate-600 transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
