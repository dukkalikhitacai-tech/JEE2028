import React, { useState } from 'react';
import { useRoadmap } from '../context/RoadmapContext';
import { MistakeType, SubjectId } from '../types';
import { 
  AlertTriangle, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Filter, 
  BookOpen, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export const ErrorBook: React.FC = () => {
  const { errorLog, addErrorEntry, toggleErrorStatus, deleteErrorEntry, triggerConfetti } = useRoadmap();

  const [filterSubject, setFilterSubject] = useState<SubjectId | 'all'>('all');
  const [filterType, setFilterType] = useState<MistakeType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'resolved'>('all');

  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [questionTitle, setQuestionTitle] = useState('');
  const [subject, setSubject] = useState<SubjectId>('physics');
  const [chapterTitle, setChapterTitle] = useState('');
  const [mistakeDescription, setMistakeDescription] = useState('');
  const [correctApproach, setCorrectApproach] = useState('');
  const [conceptInvolved, setConceptInvolved] = useState('');
  const [mistakeType, setMistakeType] = useState<MistakeType>('concept');
  const [reattemptDate, setReattemptDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionTitle.trim()) return;

    addErrorEntry({
      questionTitle: questionTitle.trim(),
      subject,
      chapterTitle: chapterTitle.trim() || 'General Problem',
      mistakeDescription: mistakeDescription.trim(),
      correctApproach: correctApproach.trim(),
      conceptInvolved: conceptInvolved.trim(),
      mistakeType,
      reattemptDate,
    });

    setQuestionTitle('');
    setMistakeDescription('');
    setCorrectApproach('');
    setConceptInvolved('');
    setShowAddModal(false);
    triggerConfetti();
  };

  // Tally repeated mistakes
  const mistakeCounts: Record<MistakeType, number> = {
    concept: 0,
    calculation: 0,
    formula: 0,
    misread: 0,
    time: 0,
    guessing: 0,
  };

  errorLog.forEach(e => {
    if (mistakeCounts[e.mistakeType] !== undefined) {
      mistakeCounts[e.mistakeType]++;
    }
  });

  const filteredErrors = errorLog.filter(e => {
    if (filterSubject !== 'all' && e.subject !== filterSubject) return false;
    if (filterType !== 'all' && e.mistakeType !== filterType) return false;
    if (filterStatus !== 'all' && e.status !== filterStatus) return false;
    return true;
  });

  const getMistakeTypeBadge = (type: MistakeType) => {
    switch (type) {
      case 'concept':
        return { label: 'Concept Mistake', color: 'text-rose-400 bg-rose-950/40 border-rose-800' };
      case 'calculation':
        return { label: 'Calculation Error', color: 'text-amber-400 bg-amber-950/40 border-amber-800' };
      case 'formula':
        return { label: 'Formula Recall', color: 'text-yellow-400 bg-yellow-950/40 border-yellow-800' };
      case 'misread':
        return { label: 'Misread Question', color: 'text-blue-400 bg-blue-950/40 border-blue-800' };
      case 'time':
        return { label: 'Time Management', color: 'text-purple-400 bg-purple-950/40 border-purple-800' };
      case 'guessing':
        return { label: 'Blind Guessing', color: 'text-red-400 bg-red-950/40 border-red-800' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider mb-1">
            <AlertTriangle className="h-4 w-4" />
            <span>Surgical Defect Registry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            THE ERROR LOG
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            “Your rank is not determined by the problems you already know how to solve. It is determined by the mistakes you never repeat.”
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-rose-400 hover:bg-rose-300 rounded-xl transition-all shadow-md active:scale-95 shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Log New Mistake</span>
        </button>
      </div>

      {/* Repeated Mistakes Dashboard */}
      <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80">
        <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
          Root-Cause Mistake Distribution
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {(Object.keys(mistakeCounts) as MistakeType[]).map(type => {
            const count = mistakeCounts[type];
            const badge = getMistakeTypeBadge(type);
            return (
              <div
                key={type}
                onClick={() => setFilterType(filterType === type ? 'all' : type)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  filterType === type 
                    ? 'border-cyan-500 bg-cyan-950/40 text-white' 
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <span className="text-[11px] font-medium text-slate-400 block truncate">
                  {badge.label}
                </span>
                <span className="font-mono text-xl font-black text-white tabular-nums mt-1 block">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Subject Filter */}
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

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="bg-slate-950 text-slate-300 border border-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            <option value="all">All Error Types</option>
            <option value="concept">Concept Mistake</option>
            <option value="calculation">Calculation Error</option>
            <option value="formula">Formula Mistake</option>
            <option value="misread">Misread Question</option>
            <option value="time">Time Management</option>
            <option value="guessing">Guessing</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="bg-slate-950 text-slate-300 border border-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending Reattempt</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <span className="text-slate-400 font-mono">
          Showing {filteredErrors.length} logged entries
        </span>
      </div>

      {/* Error Entries List */}
      <div className="space-y-3">
        {filteredErrors.map(entry => {
          const badge = getMistakeTypeBadge(entry.mistakeType);
          const isResolved = entry.status === 'resolved';

          return (
            <div
              key={entry.id}
              className={`p-5 rounded-xl border transition-all ${
                isResolved
                  ? 'bg-slate-900/30 border-slate-800/60 opacity-75'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-sm'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] mb-1.5">
                    <span className={`px-2 py-0.5 rounded border text-[10px] font-semibold uppercase ${badge.color}`}>
                      {badge.label}
                    </span>
                    <span className="text-slate-400 font-mono capitalize">
                      {entry.subject} · {entry.chapterTitle}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-500 font-mono">Logged: {entry.dateAdded}</span>
                  </div>

                  <h4 className="text-base font-bold text-white">
                    {entry.questionTitle}
                  </h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleErrorStatus(entry.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                      isResolved
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{isResolved ? 'Resolved' : 'Mark Resolved'}</span>
                  </button>

                  <button
                    onClick={() => deleteErrorEntry(entry.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                    title="Delete log entry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Anatomy of Mistake Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-3 border-t border-slate-800/80">
                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/70">
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                    What I Did Wrong:
                  </span>
                  <p className="text-slate-300 leading-relaxed">{entry.mistakeDescription}</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/70">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    Correct Approach:
                  </span>
                  <p className="text-slate-300 leading-relaxed">{entry.correctApproach}</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/70">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                    Concept Trigger Involved:
                  </span>
                  <p className="text-slate-300 leading-relaxed">{entry.conceptInvolved}</p>
                  <div className="mt-2 text-[10px] text-amber-400/90 font-mono">
                    Reattempt target: {entry.reattemptDate}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredErrors.length === 0 && (
          <div className="p-10 text-center rounded-xl border border-slate-800 bg-slate-900/40 text-slate-400 text-xs">
            No errors match your active filter. Keep logging mistakes as you solve questions!
          </div>
        )}
      </div>

      {/* Add Error Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">Log a Problem Mistake</h3>
            <p className="text-xs text-slate-400">
              Be mercilessly specific. Identifying the exact false assumption is how you permanently fix it.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Question / Exam Shift</label>
                <input
                  type="text"
                  placeholder="e.g. JEE Main 2024 Jan Shift 1 — Rotational Dynamics"
                  value={questionTitle}
                  onChange={(e) => setQuestionTitle(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value as any)}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  >
                    <option value="physics">Physics</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="mathematics">Mathematics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Chapter Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rotational Motion"
                    value={chapterTitle}
                    onChange={(e) => setChapterTitle(e.target.value)}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Why I Made the Mistake</label>
                <select
                  value={mistakeType}
                  onChange={(e) => setMistakeType(e.target.value as any)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                >
                  <option value="concept">Concept Mistake (didn't understand boundary condition)</option>
                  <option value="calculation">Calculation Mistake (algebra / arithmetic slip)</option>
                  <option value="formula">Formula Mistake (forgot or misapplied formula)</option>
                  <option value="misread">Misread Question (missed a constraint or word)</option>
                  <option value="time">Time Management (rushed under timer panic)</option>
                  <option value="guessing">Guessing Mistake (gambled on negative marks)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">What I Did Wrong</label>
                <textarea
                  rows={2}
                  placeholder="Explain exactly what wrong equation or reasoning step you took..."
                  value={mistakeDescription}
                  onChange={(e) => setMistakeDescription(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Correct Approach</label>
                <textarea
                  rows={2}
                  placeholder="What was the clean, accurate solution path?"
                  value={correctApproach}
                  onChange={(e) => setCorrectApproach(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Concept Trigger / Takeaway Rule</label>
                <input
                  type="text"
                  placeholder="e.g. Always write pseudo force torque about point in accelerated frame"
                  value={conceptInvolved}
                  onChange={(e) => setConceptInvolved(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-rose-400 hover:bg-rose-300 rounded-lg"
                >
                  Save to Error Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
