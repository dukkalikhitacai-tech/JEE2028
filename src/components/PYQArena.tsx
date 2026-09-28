import React, { useState } from 'react';
import { useRoadmap } from '../context/RoadmapContext';
import { PYQItem, SubjectId } from '../types';
import { 
  HelpCircle, 
  Check, 
  X, 
  RotateCcw, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Zap,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export const PYQArena: React.FC = () => {
  const { pyqItems, updatePYQStatus, addCustomPYQ, metrics, triggerConfetti } = useRoadmap();

  const [filterSubject, setFilterSubject] = useState<SubjectId | 'all'>('all');
  const [filterExam, setFilterExam] = useState<'all' | 'JEE Main' | 'JEE Advanced'>('all');
  const [filterYear, setFilterYear] = useState<number | 'all'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [filterStatus, setFilterStatus] = useState<PYQItem['status'] | 'all'>('all');

  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubject, setNewSubject] = useState<SubjectId>('physics');
  const [newChapter, setNewChapter] = useState('');
  const [newExam, setNewExam] = useState<'JEE Main' | 'JEE Advanced'>('JEE Main');
  const [newYear, setNewYear] = useState(2024);
  const [newDiff, setNewDiff] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [newSummary, setNewSummary] = useState('');

  const filteredPYQs = pyqItems.filter(p => {
    if (filterSubject !== 'all' && p.subject !== filterSubject) return false;
    if (filterExam !== 'all' && p.exam !== filterExam) return false;
    if (filterYear !== 'all' && p.year !== filterYear) return false;
    if (filterDifficulty !== 'all' && p.difficulty !== filterDifficulty) return false;
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    return true;
  });

  const handleAddPYQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSummary.trim() || !newChapter.trim()) return;
    addCustomPYQ({
      subject: newSubject,
      chapterTitle: newChapter.trim(),
      exam: newExam,
      year: newYear,
      difficulty: newDiff,
      questionSummary: newSummary.trim(),
      status: 'unattempted',
      timeTakenSec: 0,
    });
    setNewSummary('');
    setNewChapter('');
    setShowAddModal(false);
    triggerConfetti();
  };

  // Calculate average time
  const attemptedPYQs = pyqItems.filter(p => p.status !== 'unattempted');
  const avgTimeSec = attemptedPYQs.length > 0
    ? Math.round(attemptedPYQs.reduce((acc, p) => acc + (p.timeTakenSec || 120), 0) / attemptedPYQs.length)
    : 110;

  return (
    <div className="space-y-6">
      {/* Visual Identity Hero */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-950 p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-2 font-bold">
          <Zap className="h-4 w-4" />
          <span>Phase 5 Battleground</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          NOW THE GAME CHANGES
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
          “Learning concepts is only half the preparation. Previous Year Questions show you how JEE actually tests those concepts.”
        </p>

        {/* Real PYQ Statistics Deck */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block font-mono">Attempted</span>
            <span className="text-xl sm:text-2xl font-black text-white font-mono tabular-nums">
              {metrics.totalPYQsAttempted}
            </span>
            <span className="text-[10px] text-slate-500 block">Logged questions</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block font-mono">Accuracy</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono tabular-nums">
              {metrics.pyqAccuracy}%
            </span>
            <span className="text-[10px] text-slate-500 block">Target: &gt;80%</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block font-mono">Avg Time / Question</span>
            <span className="text-xl sm:text-2xl font-black text-cyan-400 font-mono tabular-nums">
              {Math.floor(avgTimeSec / 60)}m {avgTimeSec % 60}s
            </span>
            <span className="text-[10px] text-slate-500 block">NTA benchmark: &lt;2.2m</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block font-mono">Reattempt Queue</span>
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono tabular-nums">
              {pyqItems.filter(p => p.status === 'reattempt').length}
            </span>
            <span className="text-[10px] text-slate-500 block">Marked for retry</span>
          </div>
        </div>
      </div>

      {/* Filter Matrix */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Subject */}
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value as any)}
            className="bg-slate-950 text-slate-300 border border-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            <option value="all">All Subjects</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="mathematics">Mathematics</option>
          </select>

          {/* Exam */}
          <select
            value={filterExam}
            onChange={(e) => setFilterExam(e.target.value as any)}
            className="bg-slate-950 text-slate-300 border border-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            <option value="all">All Exams</option>
            <option value="JEE Main">JEE Main</option>
            <option value="JEE Advanced">JEE Advanced</option>
          </select>

          {/* Year */}
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            className="bg-slate-950 text-slate-300 border border-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none font-mono"
          >
            <option value="all">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>

          {/* Difficulty */}
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value as any)}
            className="bg-slate-950 text-slate-300 border border-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy (JEE Main Direct)</option>
            <option value="medium">Medium (Standard Multi-Step)</option>
            <option value="hard">Hard (Advanced Proofs)</option>
          </select>

          {/* Status */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="bg-slate-950 text-slate-300 border border-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="correct">Correct</option>
            <option value="incorrect">Incorrect</option>
            <option value="reattempt">Reattempt Required</option>
            <option value="unattempted">Unattempted</option>
          </select>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/60 border border-amber-800 rounded-lg hover:bg-amber-900 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add PYQ Log</span>
        </button>
      </div>

      {/* Questions Matrix List */}
      <div className="space-y-3">
        {filteredPYQs.map(pyq => {
          return (
            <div
              key={pyq.id}
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span className="font-bold text-cyan-400 uppercase">{pyq.exam} {pyq.year}</span>
                  <span>·</span>
                  <span className="capitalize">{pyq.subject}</span>
                  <span>·</span>
                  <span className="text-slate-300 font-semibold">{pyq.chapterTitle}</span>
                  <span>·</span>
                  <span className={`capitalize ${
                    pyq.difficulty === 'hard' ? 'text-rose-400' : pyq.difficulty === 'medium' ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {pyq.difficulty}
                  </span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {pyq.questionSummary}
                </p>

                {pyq.userNote && (
                  <p className="text-xs text-amber-300/90 font-mono bg-amber-950/20 p-2 rounded border border-amber-900/40">
                    Note: {pyq.userNote}
                  </p>
                )}
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => updatePYQStatus(pyq.id, 'correct')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                    pyq.status === 'correct'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Correct</span>
                </button>

                <button
                  onClick={() => updatePYQStatus(pyq.id, 'incorrect')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                    pyq.status === 'incorrect'
                      ? 'bg-rose-950 text-rose-300 border border-rose-700'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <X className="h-3.5 w-3.5" />
                  <span>Incorrect</span>
                </button>

                <button
                  onClick={() => updatePYQStatus(pyq.id, 'reattempt')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                    pyq.status === 'reattempt'
                      ? 'bg-amber-950 text-amber-300 border border-amber-700'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reattempt</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom PYQ Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Log PYQ Problem</h3>
            <form onSubmit={handleAddPYQ} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Subject</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value as any)}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  >
                    <option value="physics">Physics</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="mathematics">Mathematics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Chapter</label>
                  <input
                    type="text"
                    placeholder="e.g. Rotational Motion"
                    value={newChapter}
                    onChange={(e) => setNewChapter(e.target.value)}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Exam</label>
                  <select
                    value={newExam}
                    onChange={(e) => setNewExam(e.target.value as any)}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  >
                    <option value="JEE Main">JEE Main</option>
                    <option value="JEE Advanced">JEE Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Year</label>
                  <input
                    type="number"
                    value={newYear}
                    onChange={(e) => setNewYear(parseInt(e.target.value) || 2024)}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Difficulty</label>
                  <select
                    value={newDiff}
                    onChange={(e) => setNewDiff(e.target.value as any)}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Question Summary / Concept</label>
                <textarea
                  rows={3}
                  placeholder="Summarize the core premise and trap of the question..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
                >
                  Save PYQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
