import React, { useState } from 'react';
import { useRoadmap } from '../context/RoadmapContext';
import { 
  Calendar, 
  RotateCcw, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const WeeklyReset: React.FC = () => {
  const { metrics, triggerConfetti } = useRoadmap();

  const [weeklyPlanModal, setWeeklyPlanModal] = useState(false);
  const [weeklyTargets, setWeeklyTargets] = useState([
    'Complete Center of Mass & Collision numericals (HC Verma Exercises)',
    'Finish Ionic Equilibrium buffer solutions & Ksp PYQs (2020-2024)',
    'Master Complex Numbers: Triangle inequality & geometry proofs',
    'Execute 1 timed full syllabus 3-hour mock paper on Sunday 9 AM',
    'Review 10 logged errors from the Error Book',
  ]);
  const [newTargetInput, setNewTargetInput] = useState('');

  const handleAddTarget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTargetInput.trim()) return;
    setWeeklyTargets([...weeklyTargets, newTargetInput.trim()]);
    setNewTargetInput('');
  };

  const handleRemoveTarget = (index: number) => {
    setWeeklyTargets(weeklyTargets.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            <Calendar className="h-4 w-4" />
            <span>Weekly Calibration Rhythm</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            WEEKLY RESET
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Every Sunday: Close the books, audit honest numbers, and eliminate lingering backlogs before Monday begins.
          </p>
        </div>

        <button
          onClick={() => setWeeklyPlanModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md active:scale-95 shrink-0"
        >
          <Sparkles className="h-4 w-4" />
          <span>Plan Next Week</span>
        </button>
      </div>

      {/* Audit Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Metric 1: Chapters Completed This Cycle */}
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/70">
          <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Chapters Mastered</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono tabular-nums">{metrics.completedChaptersCount}</span>
            <span className="text-xs text-emerald-400 font-semibold">+2 this week</span>
          </div>
          <span className="text-xs text-slate-500 mt-2 block">
            {metrics.remainingChaptersCount} remaining across 2-year syllabus.
          </span>
        </div>

        {/* Metric 2: Questions Solved */}
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/70">
          <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Questions Solved</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-cyan-400 font-mono tabular-nums">{metrics.totalQuestionsSolved}</span>
            <span className="text-xs text-slate-400 font-mono">({metrics.pyqAccuracy}% accuracy)</span>
          </div>
          <span className="text-xs text-slate-500 mt-2 block">
            Targeting minimum 200 deliberate questions/week.
          </span>
        </div>

        {/* Metric 3: Latest Test Score */}
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/70">
          <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">Latest Test Score</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-400 font-mono tabular-nums">
              {metrics.averageMockScore > 0 ? `${metrics.averageMockScore} / 300` : 'Not Taken'}
            </span>
            <span className="text-xs text-emerald-400 font-semibold">+22 vs Prev</span>
          </div>
          <span className="text-xs text-slate-500 mt-2 block">
            Standard 3-hour examination benchmark simulation.
          </span>
        </div>

        {/* Diagnostic: Weakest Topic */}
        <div className="p-5 rounded-xl border border-rose-900/40 bg-rose-950/20">
          <div className="flex items-center gap-1.5 text-xs font-mono text-rose-400 uppercase mb-2">
            <TrendingDown className="h-4 w-4" />
            <span>Weakest Topic (Surgical Focus)</span>
          </div>
          <span className="text-base font-bold text-white block">
            Rotational Dynamics (Rolling & Pseudo Torque)
          </span>
          <p className="text-xs text-slate-300 mt-1">
            Accuracy dropped to 52% on 2023 shift questions. Recommended: Re-derive rolling constraint relations.
          </p>
        </div>

        {/* Diagnostic: Strongest Topic */}
        <div className="p-5 rounded-xl border border-emerald-900/40 bg-emerald-950/20">
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase mb-2">
            <TrendingUp className="h-4 w-4" />
            <span>Strongest Topic (Conversion Area)</span>
          </div>
          <span className="text-base font-bold text-white block">
            Chemical Bonding & Molecular Structure
          </span>
          <p className="text-xs text-slate-300 mt-1">
            92% accuracy on past 4 years JEE Main questions. Maintain with 15-minute weekly formula reviews.
          </p>
        </div>

        {/* Diagnostic: Revision Due */}
        <div className="p-5 rounded-xl border border-amber-900/40 bg-amber-950/20">
          <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 uppercase mb-2">
            <RotateCcw className="h-4 w-4" />
            <span>Spaced Revision Due</span>
          </div>
          <span className="text-base font-bold text-white block">
            Quadratic Equations & Kinematics
          </span>
          <p className="text-xs text-slate-300 mt-1">
            Stage 3 (21-day mark) due on Tuesday. 40 minutes allocated to review marked question bookmarks.
          </p>
        </div>
      </div>

      {/* Next Week's Blueprint Targets */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Upcoming Week's Strategic Targets</h3>
          <span className="text-xs text-slate-400 font-mono">{weeklyTargets.length} active directives</span>
        </div>

        <div className="space-y-2">
          {weeklyTargets.map((target, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-cyan-400 font-bold">{idx + 1}.</span>
                <span>{target}</span>
              </div>
              <button
                onClick={() => handleRemoveTarget(idx)}
                className="text-slate-500 hover:text-rose-400 text-xs px-2"
                title="Remove target"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Next Week Modal */}
      {weeklyPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Plan Next Week's Curriculum</h3>
            <p className="text-xs text-slate-400">
              Commit to 3-5 concrete outputs. Avoid vague targets like "study physics"; specify chapters and problem counts.
            </p>

            <form onSubmit={handleAddTarget} className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Solve 35 advanced problems on Conic Sections"
                value={newTargetInput}
                onChange={(e) => setNewTargetInput(e.target.value)}
                className="flex-1 text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shrink-0"
              >
                Add
              </button>
            </form>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  triggerConfetti();
                  setWeeklyPlanModal(false);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-lg"
              >
                Confirm & Lock Week
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
