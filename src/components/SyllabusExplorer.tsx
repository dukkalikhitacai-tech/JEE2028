import React, { useState } from 'react';
import { useRoadmap } from '../context/RoadmapContext';
import { SYLLABUS_CHAPTERS } from '../data/syllabusData';
import { Chapter, DifficultyLevel, SubjectId } from '../types';
import { 
  Check, 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Flame, 
  ShieldAlert
} from 'lucide-react';

interface SyllabusExplorerProps {
  initialGrade?: 11 | 12;
}

export const SyllabusExplorer: React.FC<SyllabusExplorerProps> = ({ initialGrade }) => {
  const { chapterProgress, toggleChapterStep, setChapterDifficulty, metrics } = useRoadmap();

  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [selectedGrade, setSelectedGrade] = useState<11 | 12 | 'all'>(initialGrade || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in_progress' | 'unstarted'>('all');

  const filteredChapters = SYLLABUS_CHAPTERS.filter(ch => {
    if (selectedSubject !== 'all' && ch.subject !== selectedSubject) return false;
    if (selectedGrade !== 'all' && ch.classGrade !== selectedGrade) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = ch.title.toLowerCase().includes(q);
      const matchCategory = ch.category.toLowerCase().includes(q);
      const matchSubtopics = ch.subtopics.some(s => s.toLowerCase().includes(q));
      if (!matchTitle && !matchCategory && !matchSubtopics) return false;
    }
    const prog = chapterProgress[ch.id];
    if (statusFilter === 'completed' && !prog?.completed) return false;
    if (statusFilter === 'unstarted' && (prog?.learn || prog?.practice || prog?.pyqs || prog?.completed)) return false;
    if (statusFilter === 'in_progress' && (prog?.completed || (!prog?.learn && !prog?.practice && !prog?.pyqs))) return false;

    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedChapterId(prev => prev === id ? null : id);
  };

  const getDifficultyBadge = (level: DifficultyLevel) => {
    switch (level) {
      case 'foundation':
        return { label: '🟢 Foundation', bg: 'bg-emerald-950/40 text-emerald-300 border-emerald-800' };
      case 'main':
        return { label: '🟡 JEE Main', bg: 'bg-yellow-950/40 text-yellow-300 border-yellow-800' };
      case 'advanced':
        return { label: '🟠 JEE Advanced', bg: 'bg-orange-950/40 text-orange-300 border-orange-800' };
      case 'challenge':
        return { label: '🔴 Challenge', bg: 'bg-rose-950/40 text-rose-300 border-rose-800' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Complete JEE 2028 Syllabus Tracker
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Standard 5-step verification per chapter: Learn · Practice · PYQs · Revise · Test.
          </p>
        </div>

        {/* Quick summary numbers */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Mastered: </span>
            <span className="font-bold text-cyan-400">{metrics.completedChaptersCount}</span>
            <span className="text-slate-500"> / {metrics.totalChapters}</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-purple-950/40 border border-purple-800/40 text-xs font-mono text-purple-300">
            <span>Advanced Mode: </span>
            <strong className="text-white">{metrics.advancedModeCount}</strong>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search chapter, subtopic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Subject Filter */}
        <div className="flex gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
          {(['all', 'physics', 'chemistry', 'mathematics'] as const).map(s => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s)}
              className={`flex-1 py-1 text-xs font-medium rounded capitalize transition-colors ${
                selectedSubject === s 
                  ? 'bg-slate-800 text-cyan-400 shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {s === 'all' ? 'All Subjects' : s.slice(0, 4)}
            </button>
          ))}
        </div>

        {/* Grade Filter */}
        <div className="flex gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
          {([
            { id: 'all', label: 'All Classes' },
            { id: 11, label: 'Class 11' },
            { id: 12, label: 'Class 12' },
          ] as const).map(g => (
            <button
              key={g.id}
              onClick={() => setSelectedGrade(g.id as any)}
              className={`flex-1 py-1 text-xs font-medium rounded transition-colors ${
                selectedGrade === g.id 
                  ? 'bg-slate-800 text-cyan-400 shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="text-xs bg-slate-950 text-slate-300 border border-slate-800 rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500"
        >
          <option value="all">All Statuses</option>
          <option value="completed">Completed Only</option>
          <option value="in_progress">In Progress</option>
          <option value="unstarted">Unstarted</option>
        </select>
      </div>

      {/* Chapters Table / Card Grid */}
      <div className="space-y-3">
        {filteredChapters.map(chapter => {
          const prog = chapterProgress[chapter.id] || {
            id: chapter.id,
            learn: false,
            practice: false,
            pyqs: false,
            revise: false,
            test: false,
            completed: false,
            difficultyLevel: 'foundation' as DifficultyLevel,
            revisionCount: 0,
          };

          const isExpanded = expandedChapterId === chapter.id;
          const diffBadge = getDifficultyBadge(prog.difficultyLevel || 'foundation');

          return (
            <div
              key={chapter.id}
              className={`rounded-xl border transition-all ${
                prog.completed
                  ? 'bg-slate-900/40 border-slate-800 hover:border-emerald-700/50'
                  : 'bg-slate-900/80 border-slate-800/90 hover:border-slate-700'
              }`}
            >
              {/* Main Chapter Summary Row */}
              <div className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left: Title, Class, Category */}
                <div className="flex items-start gap-3 flex-1">
                  <button
                    onClick={() => toggleChapterStep(chapter.id, 'completed')}
                    className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border transition-colors shrink-0 ${
                      prog.completed
                        ? 'border-emerald-500 bg-emerald-500 text-slate-950 shadow-sm'
                        : 'border-slate-700 bg-slate-950 hover:border-slate-500'
                    }`}
                    title={prog.completed ? 'Mark incomplete' : 'Mark completed'}
                    aria-label={`Mark ${chapter.title} ${prog.completed ? 'incomplete' : 'complete'}`}
                  >
                    {prog.completed && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </button>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                      <span className="font-semibold uppercase tracking-wider text-cyan-400">
                        Class {chapter.classGrade}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{chapter.subject}</span>
                      <span aria-hidden="true">·</span>
                      <span>{chapter.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className={`font-medium ${chapter.weightage === 'Very High' ? 'text-amber-400' : 'text-slate-400'}`}>
                        {chapter.weightage} Weightage
                      </span>
                    </div>

                    <h3 className={`text-base font-bold transition-colors ${prog.completed ? 'text-slate-300 line-through' : 'text-white'}`}>
                      {chapter.title}
                    </h3>
                  </div>
                </div>

                {/* Center: 5-Step Pipeline Checkboxes */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 py-1 px-3 rounded-lg bg-slate-950/70 border border-slate-800">
                  {(['learn', 'practice', 'pyqs', 'revise', 'test'] as const).map(step => {
                    const isChecked = !!prog[step];
                    return (
                      <button
                        key={step}
                        onClick={() => toggleChapterStep(chapter.id, step)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
                          isChecked
                            ? 'text-cyan-300 bg-cyan-950/70 border border-cyan-800/60'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'
                        }`}
                      >
                        {isChecked ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                        ) : (
                          <Circle className="h-3.5 w-3.5 text-slate-600" />
                        )}
                        <span className="capitalize">{step}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Right: Difficulty Mode & Expand */}
                <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                  {/* Difficulty selector dropdown */}
                  <select
                    value={prog.difficultyLevel || 'foundation'}
                    onChange={(e) => setChapterDifficulty(chapter.id, e.target.value as DifficultyLevel)}
                    className="text-[11px] bg-slate-950 border border-slate-800 rounded-md px-2 py-1 text-slate-300 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="foundation">🟢 Foundation</option>
                    <option value="main">🟡 JEE Main</option>
                    <option value="advanced">🟠 Advanced</option>
                    <option value="challenge">🔴 Challenge</option>
                  </select>

                  <button
                    onClick={() => toggleExpand(chapter.id)}
                    className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                    aria-label="Toggle subtopics details"
                  >
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Subtopics & Syllabus Specs */}
              {isExpanded && (
                <div className="px-5 pb-4 pt-2 border-t border-slate-800/80 bg-slate-950/40 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 font-mono text-cyan-400">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Estimated Mastery Time: ~{chapter.estimatedHours} Hours</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      Official Source: {chapter.officialSyllabusTag}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Core Syllabus Subtopics:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {chapter.subtopics.map((sub, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800/70 text-xs text-slate-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                          <span className="truncate">{sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredChapters.length === 0 && (
          <div className="p-8 text-center rounded-xl border border-slate-800 bg-slate-900/40 text-slate-400 text-sm">
            No chapters match your search or filter criteria.
          </div>
        )}
      </div>
    </div>
  );
};
