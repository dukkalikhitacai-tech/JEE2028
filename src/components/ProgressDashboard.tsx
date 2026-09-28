import React from 'react';
import { useRoadmap } from '../context/RoadmapContext';
import { 
  Flame, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  RotateCcw, 
  Trophy, 
  HelpCircle, 
  ClipboardCheck, 
  Zap,
  ArrowRight
} from 'lucide-react';

interface ProgressDashboardProps {
  onNavigateToSubjects: () => void;
  onNavigateToPYQs: () => void;
  onNavigateToTests: () => void;
  onNavigateToMilestones: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  onNavigateToSubjects,
  onNavigateToPYQs,
  onNavigateToTests,
  onNavigateToMilestones,
}) => {
  const { metrics, milestones, userProfile } = useRoadmap();

  // Find next locked milestone
  const nextMilestone = milestones.find(m => !m.unlocked) || milestones[milestones.length - 1];

  // SVG Progress Ring calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (metrics.overallCompletion / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Overview Metric Banner */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Overall Ring + Phase */}
        <div className="flex items-center gap-6">
          {/* Circular Progress Gauge */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="#1e293b"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="#06b6d4"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="font-mono text-2xl font-black text-white tabular-nums">
                {metrics.overallCompletion}%
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Mastery</span>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              <span>Class {userProfile.currentClass} Track</span>
              <span>·</span>
              <span>Target: {userProfile.target.toUpperCase()}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {metrics.estimatedPhase.phaseTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              {metrics.estimatedPhase.currentFocus}
            </p>
          </div>
        </div>

        {/* Right: Next Milestone Callout */}
        {nextMilestone && (
          <div 
            onClick={onNavigateToMilestones}
            className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 hover:border-cyan-500/50 cursor-pointer transition-colors max-w-xs space-y-1.5 shrink-0"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-cyan-400 uppercase">Next Milestone</span>
              <span className="text-base">{nextMilestone.icon}</span>
            </div>
            <span className="text-sm font-bold text-white block">
              {nextMilestone.title}
            </span>
            <p className="text-xs text-slate-400">
              {nextMilestone.description}
            </p>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/80">
              <span>{nextMilestone.progressValue} / {nextMilestone.targetValue}</span>
              <span className="text-cyan-400 flex items-center gap-0.5">
                Inspect <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Subject-Wise Progress Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Physics Card */}
        <div className="p-5 rounded-xl border border-blue-900/40 bg-slate-900/90 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400 uppercase font-mono">Physics</span>
            <span className="font-mono text-lg font-black text-white">{metrics.physicsCompletion}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-700" style={{ width: `${metrics.physicsCompletion}%` }} />
          </div>
          <p className="text-xs text-slate-400">
            Mechanics, Electrodynamics & Modern Physics.
          </p>
        </div>

        {/* Chemistry Card */}
        <div className="p-5 rounded-xl border border-cyan-900/40 bg-slate-900/90 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 uppercase font-mono">Chemistry</span>
            <span className="font-mono text-lg font-black text-white">{metrics.chemistryCompletion}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden">
            <div className="h-full bg-cyan-500 transition-all duration-700" style={{ width: `${metrics.chemistryCompletion}%` }} />
          </div>
          <p className="text-xs text-slate-400">
            Physical calculations, Organic mechanisms & Inorganic NCERT.
          </p>
        </div>

        {/* Mathematics Card */}
        <div className="p-5 rounded-xl border border-purple-900/40 bg-slate-900/90 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-400 uppercase font-mono">Mathematics</span>
            <span className="font-mono text-lg font-black text-white">{metrics.mathCompletion}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden">
            <div className="h-full bg-purple-500 transition-all duration-700" style={{ width: `${metrics.mathCompletion}%` }} />
          </div>
          <p className="text-xs text-slate-400">
            Calculus, Coordinate Geometry, Vectors & Algebra.
          </p>
        </div>
      </div>

      {/* Vital KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/70">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <HelpCircle className="h-4 w-4 text-cyan-400" />
            <span>PYQs Solved</span>
          </div>
          <span className="text-2xl font-black text-white font-mono tabular-nums">
            {metrics.totalPYQsAttempted}
          </span>
          <span className="text-[10px] text-slate-500 block mt-1 font-mono">
            {metrics.pyqAccuracy}% accuracy
          </span>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/70">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <ClipboardCheck className="h-4 w-4 text-rose-400" />
            <span>Mocks Taken</span>
          </div>
          <span className="text-2xl font-black text-white font-mono tabular-nums">
            {metrics.totalMocksCount}
          </span>
          <span className="text-[10px] text-slate-500 block mt-1 font-mono">
            Avg: {metrics.averageMockScore} / 300
          </span>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/70">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Zap className="h-4 w-4 text-emerald-400" />
            <span>Questions Solved</span>
          </div>
          <span className="text-2xl font-black text-white font-mono tabular-nums">
            {metrics.totalQuestionsSolved}
          </span>
          <span className="text-[10px] text-slate-500 block mt-1 font-mono">
            All deliberate practice
          </span>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/70">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Flame className="h-4 w-4 text-amber-400" />
            <span>Study Streak</span>
          </div>
          <span className="text-2xl font-black text-white font-mono tabular-nums">
            {metrics.currentStreak} Days
          </span>
          <span className="text-[10px] text-emerald-400 block mt-1 font-mono font-semibold">
            Active streak
          </span>
        </div>
      </div>

      {/* Strategic Priorities Deck */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-4">
        <h3 className="text-base font-bold text-white">Your Next 3 Immediate Study Directives</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {metrics.nextThreePriorities.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                Priority 0{idx + 1}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
