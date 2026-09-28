import React, { useState } from 'react';
import { useRoadmap } from '../context/RoadmapContext';
import { X, Target, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { SYLLABUS_CHAPTERS } from '../data/syllabusData';

interface WhereAmIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToRoadmap: (phaseId: string) => void;
}

export const WhereAmIModal: React.FC<WhereAmIModalProps> = ({ isOpen, onClose, onNavigateToRoadmap }) => {
  const { metrics, chapterProgress } = useRoadmap();

  const [inputClass, setInputClass] = useState<'10' | '11' | '12' | 'dropper'>('11');
  const [inputMonth, setInputMonth] = useState('September 2026');
  const [completedChaptersCount, setCompletedChaptersCount] = useState(metrics.completedChaptersCount || 6);
  const [dailyHours, setDailyHours] = useState('4-6');
  const [latestMockScore, setLatestMockScore] = useState('180');
  const [pyqsDone, setPyqsDone] = useState(metrics.totalPYQsAttempted || 40);

  const [analyzed, setAnalyzed] = useState(true);

  if (!isOpen) return null;

  // Calculate phase based on chapters completed and class
  let calculatedPhaseId = 'phase-1';
  let calculatedPhaseNumber = '1';
  let phaseName = 'PHASE 1 — CLASS 11 FOUNDATION';
  let phaseStatus = 'Building deep Mechanics, GOC & Coordinate fundamentals.';

  if (completedChaptersCount < 4) {
    calculatedPhaseId = 'phase-0';
    calculatedPhaseNumber = '0';
    phaseName = 'PHASE 0 — FOUNDATION & HABITS';
    phaseStatus = 'Establishing mathematical tools, note-making, and daily solving rhythm.';
  } else if (completedChaptersCount >= 4 && completedChaptersCount < 12) {
    calculatedPhaseId = 'phase-1';
    calculatedPhaseNumber = '1';
    phaseName = 'PHASE 1 — CLASS 11 FOUNDATION';
    phaseStatus = 'Core Class 11 mechanics and physical/organic fundamentals underway.';
  } else if (completedChaptersCount >= 12 && completedChaptersCount < 20) {
    calculatedPhaseId = 'phase-2';
    calculatedPhaseNumber = '2';
    phaseName = 'PHASE 2 — CLASS 11 ADVANCED DEVELOPMENT';
    phaseStatus = 'Elevating concepts to multi-concept JEE Advanced problem-solving.';
  } else if (completedChaptersCount >= 20 && completedChaptersCount < 30) {
    calculatedPhaseId = 'phase-3';
    calculatedPhaseNumber = '3';
    phaseName = 'PHASE 3 — CLASS 12 CORE';
    phaseStatus = 'Electrodynamics, Advanced Organic & Calculus mastery.';
  } else if (completedChaptersCount >= 30 && completedChaptersCount < 35) {
    calculatedPhaseId = 'phase-4';
    calculatedPhaseNumber = '4';
    phaseName = 'PHASE 4 — SYLLABUS COMPLETION';
    phaseStatus = 'Closing syllabus gaps, formula consolidation, and final review.';
  } else {
    calculatedPhaseId = 'phase-5';
    calculatedPhaseNumber = '5 & 6';
    phaseName = 'PHASE 5/6 — PYQ ERA & MOCK ARENA';
    phaseStatus = 'Full test immersion, timed exam triage, and surgical error logs.';
  }

  // Dynamic next 3 priorities based on real syllabus
  const pendingChapters = SYLLABUS_CHAPTERS.filter(c => !chapterProgress[c.id]?.completed);
  const nextToComplete = pendingChapters[0]?.title || 'Rotational Motion & System of Particles';
  const nextToPractice = pendingChapters[1]?.title || 'Chemical Bonding & MOT';
  const nextToRevise = pendingChapters[2]?.title || 'Kinematics & Newton Laws of Motion';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="whereami-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          aria-label="Close diagnostic modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
          <Target className="h-4 w-4" />
          <span>Diagnostic Radar</span>
        </div>
        <h2 id="whereami-title" className="text-xl sm:text-2xl font-bold text-white mb-2">
          Where Am I in the Journey?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          Calibrate your exact position on the 2-Year Road to IIT 2028 roadmap. No guesswork, no false promises.
        </p>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Current Class</label>
            <select
              value={inputClass}
              onChange={(e) => setInputClass(e.target.value as any)}
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="10">Class 10 (Early Prep)</option>
              <option value="11">Class 11 (2028 Cohort)</option>
              <option value="12">Class 12</option>
              <option value="dropper">Dropper</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Current Month</label>
            <input
              type="text"
              value={inputMonth}
              onChange={(e) => setInputMonth(e.target.value)}
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-cyan-500 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Chapters Mastered</label>
            <input
              type="number"
              min="0"
              max="35"
              value={completedChaptersCount}
              onChange={(e) => setCompletedChaptersCount(Math.min(35, Math.max(0, parseInt(e.target.value) || 0)))}
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-cyan-500 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Daily Study Time</label>
            <select
              value={dailyHours}
              onChange={(e) => setDailyHours(e.target.value)}
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="2-3">2–3 Hours</option>
              <option value="4-6">4–6 Hours</option>
              <option value="6-8">6–8 Hours</option>
              <option value="8+">8+ Hours</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Latest Mock Score</label>
            <input
              type="text"
              value={latestMockScore}
              onChange={(e) => setLatestMockScore(e.target.value)}
              placeholder="e.g. 180 / 300"
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-cyan-500 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">PYQs Completed</label>
            <input
              type="number"
              min="0"
              value={pyqsDone}
              onChange={(e) => setPyqsDone(parseInt(e.target.value) || 0)}
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-cyan-500 focus:outline-none font-mono"
            />
          </div>
        </div>

        {/* Diagnosis Output Card */}
        {analyzed && (
          <div className="rounded-xl border border-cyan-500/40 bg-slate-950/80 p-5 space-y-4 shadow-inner">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider block">
                  YOU ARE HERE →
                </span>
                <span className="text-lg font-bold text-white">
                  You are approximately at {phaseName}
                </span>
              </div>
              <button
                onClick={() => {
                  onNavigateToRoadmap(calculatedPhaseId);
                  onClose();
                }}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950 border border-cyan-700 rounded-lg hover:bg-cyan-900 transition-colors"
              >
                <span>Jump to Phase {calculatedPhaseNumber}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              {phaseStatus} With {completedChaptersCount} chapters completed out of 35, you have approximately{' '}
              <strong className="text-cyan-400 font-mono">{Math.round((completedChaptersCount / 35) * 100)}%</strong> of syllabus breadth established.
            </p>

            {/* Next 3 Specific Priorities */}
            <div>
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2.5">
                Your Next 3 Immediate Priorities:
              </span>
              <div className="space-y-2.5">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-950 text-cyan-400 font-mono text-xs font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <span className="text-xs font-bold text-cyan-300 block">
                      Complete: {nextToComplete}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Finish primary video/text lecture, derive key formulas by hand, and solve 15 basic examples.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-950 text-blue-400 font-mono text-xs font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-300 block">
                      Practice: 30 Previous Year Questions on {nextToPractice}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Solve recent 2022–2025 shift questions with a 2-minute timer per question.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-950 text-purple-400 font-mono text-xs font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <span className="text-xs font-bold text-purple-300 block">
                      Revise: {nextToRevise} + Error Log Audit
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Re-attempt all previously marked calculation/concept errors from the Error Book.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-500">
              <AlertCircle className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              <span>Diagnostic baseline is for study planning and does not predict official ranks or percentiles.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
