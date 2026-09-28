import React, { useState } from 'react';
import { useRoadmap } from '../context/RoadmapContext';
import { TIMELINE_PHASES, PhaseInfo } from '../data/timelineData';
import { FOUNDATION_CHECKLIST } from '../data/syllabusData';
import { 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  BookOpen, 
  Flag, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  Flame,
  Zap,
  Target
} from 'lucide-react';

interface RoadmapTimelineProps {
  onNavigateToSubjects: (filterGrade?: 11 | 12) => void;
  onNavigateToPYQs: () => void;
  onNavigateToTests: () => void;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ 
  onNavigateToSubjects, 
  onNavigateToPYQs, 
  onNavigateToTests 
}) => {
  const { 
    metrics, 
    foundationChecklistState, 
    toggleFoundationItem, 
    chapterProgress,
    selectedPhaseId,
    setSelectedPhaseId
  } = useRoadmap();

  const [activePhaseIndex, setActivePhaseIndex] = useState(1);
  const activePhase = TIMELINE_PHASES[activePhaseIndex] || TIMELINE_PHASES[0];

  // Foundation completion count
  const foundationCompletedCount = Object.values(foundationChecklistState).filter(Boolean).length;
  const foundationTotal = FOUNDATION_CHECKLIST.length;

  return (
    <section id="roadmap-section" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase mb-2">
              <Target className="h-4 w-4" />
              <span>Interactive 2-Year Progression Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              THE JEE 2028 JOURNEY
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              From Phase 0 ground fundamentals to the final gates of JEE Advanced. Click each phase to inspect objectives, tactical workflows, and milestone requirements.
            </p>
          </div>

          {/* Quick status summary */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block">Current Focus Phase:</span>
              <span className="font-bold text-cyan-400">{metrics.estimatedPhase.phaseTitle}</span>
            </div>
          </div>
        </div>

        {/* Horizontal Timeline Journey Rail */}
        <div className="mb-12 overflow-x-auto pb-4 pt-2">
          <div className="flex items-center min-w-[920px] justify-between relative px-4">
            {/* Connecting Track Line */}
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-800 -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-8 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 -translate-y-1/2 z-0 transition-all duration-500" 
              style={{ width: `${Math.min(100, Math.max(8, (activePhaseIndex / (TIMELINE_PHASES.length - 1)) * 95))}%` }}
            />

            {TIMELINE_PHASES.map((phase, idx) => {
              const isSelected = activePhaseIndex === idx;
              const isPast = idx < activePhaseIndex;
              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhaseIndex(idx)}
                  className="flex flex-col items-center group relative z-10 focus:outline-none"
                >
                  {/* Phase Node Circle */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full font-mono text-sm font-bold border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950 text-cyan-300 scale-110 shadow-lg shadow-cyan-500/25 ring-4 ring-cyan-500/20'
                        : isPast
                        ? 'border-blue-500 bg-slate-900 text-blue-400'
                        : 'border-slate-700 bg-slate-950 text-slate-500 hover:border-slate-500 hover:text-slate-300'
                    }`}
                  >
                    P{phase.number}
                  </div>

                  {/* Title Label */}
                  <div className="mt-2 text-center max-w-[110px]">
                    <span className={`text-[11px] font-semibold block leading-tight ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                      {phase.title.replace('PHASE ', '')}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                      {phase.period.split(' ')[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Phase Detail Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm">
          {/* Column 1: Phase Identity & Tagline */}
          <div className="lg:col-span-1 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-md bg-slate-950 border border-slate-800 text-cyan-400">
              <Clock className="h-3.5 w-3.5" />
              <span>{activePhase.period}</span>
            </div>

            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                {activePhase.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {activePhase.title}
              </h3>
              <p className="text-sm font-medium text-cyan-300 mt-2">
                “{activePhase.tagline}”
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activePhase.description}
            </p>

            {/* Warning Advice Box */}
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-900/50 text-xs text-amber-200/90 flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-300 font-semibold mb-0.5">Critical Pitfall Warning</strong>
                <span>{activePhase.warningAdvice}</span>
              </div>
            </div>

            {/* Action buttons corresponding to phase */}
            <div className="pt-2 flex flex-col gap-2">
              {activePhaseIndex === 0 && (
                <button
                  onClick={() => onNavigateToSubjects(11)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all"
                >
                  <span>Open Class 11 Foundation Chapters</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
              {activePhaseIndex === 1 && (
                <button
                  onClick={() => onNavigateToSubjects(11)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all"
                >
                  <span>Track Class 11 Checklist & Steps</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
              {activePhaseIndex === 2 && (
                <button
                  onClick={() => onNavigateToSubjects(11)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-all"
                >
                  <span>Open Advanced Problem Mode</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
              {activePhaseIndex === 3 && (
                <button
                  onClick={() => onNavigateToSubjects(12)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all"
                >
                  <span>Explore Class 12 Core Syllabus</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
              {activePhaseIndex === 5 && (
                <button
                  onClick={onNavigateToPYQs}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all"
                >
                  <span>Launch PYQ Era Matrix</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
              {activePhaseIndex === 6 && (
                <button
                  onClick={onNavigateToTests}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all"
                >
                  <span>Enter Mock Test Arena</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Column 2: Phase Strategic Goals */}
          <div className="lg:col-span-1 space-y-4">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Core Milestones & Goals</span>
            </h4>
            <div className="space-y-2.5">
              {activePhase.goals.map((goal, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-slate-300 font-mono text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-xs text-slate-200 leading-relaxed">{goal}</span>
                </div>
              ))}
            </div>

            {/* Special Phase 2: Difficulty Progression Indicator */}
            {activePhaseIndex === 2 && (
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 mt-4 space-y-3">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block">
                  Difficulty Progression Spectrum
                </span>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800 text-[11px] text-emerald-300 font-semibold">
                    🟢 Foundation
                  </div>
                  <div className="p-2 rounded-lg bg-yellow-950/60 border border-yellow-800 text-[11px] text-yellow-300 font-semibold">
                    🟡 JEE Main
                  </div>
                  <div className="p-2 rounded-lg bg-orange-950/60 border border-orange-800 text-[11px] text-orange-300 font-semibold">
                    🟠 Advanced
                  </div>
                  <div className="p-2 rounded-lg bg-rose-950/60 border border-rose-800 text-[11px] text-rose-300 font-semibold">
                    🔴 Challenge
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Column 3: Tactical Key Actions & Interactive Phase-Specific Module */}
          <div className="lg:col-span-1 space-y-4">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Zap className="h-4 w-4 text-cyan-400" />
              <span>Tactical Directives</span>
            </h4>
            <div className="space-y-2.5">
              {activePhase.keyActions.map((action, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="h-2 w-2 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                  <span className="text-xs text-slate-300 leading-relaxed">{action}</span>
                </div>
              ))}
            </div>

            {/* Phase 0 Checklist Integration */}
            {activePhaseIndex === 0 && (
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 mt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                    Phase 0 Foundation Checklist
                  </span>
                  <span className="font-mono text-xs text-cyan-400">
                    {foundationCompletedCount}/{foundationTotal}
                  </span>
                </div>
                <div className="space-y-2">
                  {FOUNDATION_CHECKLIST.map(item => {
                    const isDone = foundationChecklistState[item.id];
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleFoundationItem(item.id)}
                        className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left text-xs transition-colors ${
                          isDone 
                            ? 'bg-cyan-950/40 text-cyan-200 border border-cyan-800/40 line-through opacity-80' 
                            : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
                        )}
                        <span>{item.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Phase 4 Syllabus Complete Audit Ring */}
            {activePhaseIndex === 4 && (
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    Syllabus Audit Status
                  </span>
                  <span className="font-mono text-xs text-emerald-400">
                    {metrics.completedChaptersCount} / {metrics.totalChapters} Chapters
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                      <span>Physics ({metrics.physicsCompletion}%)</span>
                      <span>Chemistry ({metrics.chemistryCompletion}%)</span>
                      <span>Maths ({metrics.mathCompletion}%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden flex">
                      <div className="bg-blue-500 h-full" style={{ width: `${metrics.physicsCompletion / 3}%` }} />
                      <div className="bg-cyan-500 h-full" style={{ width: `${metrics.chemistryCompletion / 3}%` }} />
                      <div className="bg-purple-500 h-full" style={{ width: `${metrics.mathCompletion / 3}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
