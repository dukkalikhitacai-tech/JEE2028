import React, { useState } from 'react';
import { useRoadmap } from '../context/RoadmapContext';
import { SYLLABUS_CHAPTERS } from '../data/syllabusData';
import { RotateCcw, CheckCircle2, Clock, Calendar, Settings, Sparkles, AlertCircle } from 'lucide-react';

export const RevisionSystem: React.FC = () => {
  const { 
    chapterProgress, 
    revisionIntervals, 
    setRevisionIntervals, 
    toggleChapterStep, 
    triggerConfetti 
  } = useRoadmap();

  const [showConfig, setShowConfig] = useState(false);
  const [tempIntervals, setTempIntervals] = useState<number[]>([...revisionIntervals]);

  // Find all chapters that have been marked completed or in progress
  const activeChapters = SYLLABUS_CHAPTERS.filter(ch => {
    const p = chapterProgress[ch.id];
    return p?.completed || p?.learn;
  });

  const handleSaveIntervals = (e: React.FormEvent) => {
    e.preventDefault();
    setRevisionIntervals(tempIntervals);
    setShowConfig(false);
    triggerConfetti();
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            <RotateCcw className="h-4 w-4" />
            <span>Spaced Repetition Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            SPACED REVISION SYSTEM
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Defeat the Ebbinghaus forgetting curve with algorithmic intervals: 1d → 7d → 21d → 45d → Final Review.
          </p>
        </div>

        <button
          onClick={() => setShowConfig(!showConfig)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors shrink-0"
        >
          <Settings className="h-4 w-4 text-cyan-400" />
          <span>Configure Intervals</span>
        </button>
      </div>

      {/* Interval Configuration Drawer */}
      {showConfig && (
        <div className="p-5 rounded-2xl border border-cyan-800/50 bg-cyan-950/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-cyan-300">Configurable Repetition Intervals (Days)</h3>
            <span className="text-[11px] text-slate-400">Customized to your retention speed</span>
          </div>

          <form onSubmit={handleSaveIntervals} className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {tempIntervals.map((interval, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <label className="block text-[11px] text-slate-400 mb-1">
                  Revision {idx + 1}
                </label>
                <div className="flex items-center gap-1 font-mono">
                  <input
                    type="number"
                    min="1"
                    value={interval}
                    onChange={(e) => {
                      const copy = [...tempIntervals];
                      copy[idx] = Math.max(1, parseInt(e.target.value) || 1);
                      setTempIntervals(copy);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                  />
                  <span className="text-xs text-slate-500">days</span>
                </div>
              </div>
            ))}
            <div className="col-span-2 sm:col-span-5 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowConfig(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg"
              >
                Save Intervals
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Revision Chapter Matrix */}
      <div className="space-y-3">
        {activeChapters.map(ch => {
          const prog = chapterProgress[ch.id];
          const revCount = prog?.revisionCount || (prog?.revise ? 2 : 0);

          return (
            <div
              key={ch.id}
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1 font-mono">
                  <span className="capitalize text-cyan-400">{ch.subject}</span>
                  <span>·</span>
                  <span>Class {ch.classGrade}</span>
                  <span>·</span>
                  <span>{ch.category}</span>
                </div>
                <h4 className="text-base font-bold text-white">
                  {ch.title}
                </h4>
              </div>

              {/* 5-Revision Step Tracker */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {revisionIntervals.map((days, idx) => {
                  const revNum = idx + 1;
                  const isDone = revCount >= revNum;

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        // Toggle revision level
                        toggleChapterStep(ch.id, 'revise');
                      }}
                      className={`flex flex-col items-center p-2 rounded-lg border text-xs min-w-[72px] transition-all ${
                        isDone
                          ? 'border-emerald-700 bg-emerald-950/40 text-emerald-300'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-semibold text-[11px]">Rev {revNum}</span>
                      <span className="font-mono text-[10px] text-slate-500">+{days}d</span>
                      {isDone && <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {activeChapters.length === 0 && (
          <div className="p-10 text-center rounded-xl border border-slate-800 bg-slate-900/40 text-slate-400 text-xs">
            Mark chapters "Learned" or "Completed" in the Syllabus Tracker to schedule spaced revisions.
          </div>
        )}
      </div>
    </div>
  );
};
