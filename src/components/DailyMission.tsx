import React, { useState, useEffect } from 'react';
import { useRoadmap } from '../context/RoadmapContext';
import { 
  Flame, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  Sparkles,
  Zap,
  Target
} from 'lucide-react';
import { DailyTask } from '../types';

export const DailyMission: React.FC = () => {
  const { 
    dailyMission, 
    toggleDailyTask, 
    addDailyTask, 
    logStudySession, 
    triggerConfetti 
  } = useRoadmap();

  // Stopwatch state for focused deep work blocks
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeTaskLabel, setActiveTaskLabel] = useState('Deep Work Block');

  // New task modal/inputs
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState<'physics' | 'chemistry' | 'mathematics' | 'general'>('physics');
  const [newMinutes, setNewMinutes] = useState(60);
  const [newCategory, setNewCategory] = useState<'lecture' | 'practice' | 'pyq' | 'revision' | 'test'>('practice');

  // Quick session logger
  const [logQuestions, setLogQuestions] = useState(10);
  const [logCorrect, setLogCorrect] = useState(8);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleFinishTimer = () => {
    setIsTimerRunning(false);
    const completedMins = Math.max(1, Math.round(timerSeconds / 60));
    setTimerSeconds(0);
    triggerConfetti();
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addDailyTask({
      title: newTitle.trim(),
      subject: newSubject,
      targetMinutes: newMinutes,
      category: newCategory,
    });
    setNewTitle('');
    setShowAddModal(false);
  };

  const completedTasks = dailyMission.tasks.filter(t => t.isCompleted).length;
  const totalTasks = dailyMission.tasks.length;
  const completionPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const totalStudyMinutes = dailyMission.tasks.reduce((sum, t) => sum + (t.isCompleted ? t.targetMinutes : t.completedMinutes), 0);
  const totalTargetMinutes = dailyMission.tasks.reduce((sum, t) => sum + t.targetMinutes, 0);

  const accuracy = dailyMission.questionsSolvedToday > 0 
    ? Math.round((dailyMission.questionsCorrectToday / dailyMission.questionsSolvedToday) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            <Target className="h-4 w-4" />
            <span>High-Yield Daily Discipline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            TODAY'S MISSION
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            “Win the morning. Win the afternoon. Win the day.”
          </p>
        </div>

        {/* Vital Stats Cards */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-950/40 border border-amber-800/40">
            <Flame className="h-5 w-5 text-amber-400 animate-pulse" />
            <div>
              <span className="text-[10px] text-amber-300 uppercase block font-semibold">Streak</span>
              <span className="font-mono text-base font-bold text-white tabular-nums">{dailyMission.streakCount} Days</span>
            </div>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">Study Time</span>
            <span className="font-mono text-base font-bold text-cyan-400 tabular-nums">{totalStudyMinutes} min</span>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">Questions</span>
            <span className="font-mono text-base font-bold text-white tabular-nums">{dailyMission.questionsSolvedToday}</span>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">Accuracy</span>
            <span className="font-mono text-base font-bold text-emerald-400 tabular-nums">{accuracy}%</span>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">Completed</span>
            <span className="font-mono text-base font-bold text-cyan-300 tabular-nums">{completionPercent}%</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Tasks & Stopwatch */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Tasks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Daily Target Checklist</h3>
              <span className="text-xs font-mono text-slate-400">
                ({completedTasks}/{totalTasks} done)
              </span>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/70 border border-cyan-800 rounded-lg hover:bg-cyan-900 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Custom Target</span>
            </button>
          </div>

          {/* Task Items List */}
          <div className="space-y-2.5">
            {dailyMission.tasks.map(task => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  task.isCompleted
                    ? 'bg-slate-950/40 border-slate-800/60 opacity-80'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleDailyTask(task.id)}
                    className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                      task.isCompleted
                        ? 'border-emerald-500 bg-emerald-500 text-slate-950'
                        : 'border-slate-700 bg-slate-950 hover:border-slate-500'
                    }`}
                    aria-label={`Toggle ${task.title}`}
                  >
                    {task.isCompleted && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </button>

                  <div>
                    <span className={`text-xs sm:text-sm font-semibold block ${task.isCompleted ? 'text-slate-400 line-through' : 'text-white'}`}>
                      {task.title}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-0.5">
                      <span className="capitalize text-cyan-400">{task.subject}</span>
                      <span>·</span>
                      <span className="capitalize">{task.category}</span>
                      <span>·</span>
                      <span>{task.targetMinutes} min allocated</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveTaskLabel(task.title);
                      setIsTimerRunning(true);
                    }}
                    className="p-1.5 text-slate-400 hover:text-cyan-400 rounded-md hover:bg-slate-800"
                    title="Start timer for this task"
                  >
                    <Play className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex justify-between text-xs text-slate-400 mb-2">
              <span>Today's Target Completion</span>
              <span className="font-mono text-cyan-400">{completionPercent}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Col: Deep Work Stopwatch & Question Logger */}
        <div className="space-y-6">
          {/* Deep Work Timer */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
              <Clock className="h-4 w-4" />
              <span>Deep Work Stopwatch</span>
            </div>

            <div className="text-xs text-slate-400 font-medium truncate max-w-xs mx-auto">
              {activeTaskLabel}
            </div>

            <div className="font-mono text-5xl font-extrabold text-white tracking-wider tabular-nums py-2">
              {formatTimer(timerSeconds)}
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${
                  isTimerRunning
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950'
                }`}
              >
                {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isTimerRunning ? 'Pause' : 'Start Focus'}</span>
              </button>

              <button
                onClick={handleFinishTimer}
                disabled={timerSeconds === 0}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-xl transition-all"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Log Block</span>
              </button>
            </div>
          </div>

          {/* Quick Problem Logging Deck */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Log Solved Questions
              </span>
              <Zap className="h-4 w-4 text-cyan-400" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Attempted</label>
                <input
                  type="number"
                  min="1"
                  value={logQuestions}
                  onChange={(e) => setLogQuestions(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Correct</label>
                <input
                  type="number"
                  min="0"
                  max={logQuestions}
                  value={logCorrect}
                  onChange={(e) => setLogCorrect(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                />
              </div>
            </div>

            <button
              onClick={() => {
                logStudySession(30, logQuestions, logCorrect);
                triggerConfetti();
              }}
              className="w-full py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors"
            >
              Add To Today's Tally
            </button>
          </div>
        </div>
      </div>

      {/* Add Custom Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Add Custom Study Target</h3>
            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Target Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rotational Motion 20 Advanced PYQs"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
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
                    <option value="general">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Minutes</label>
                  <input
                    type="number"
                    min="15"
                    step="15"
                    value={newMinutes}
                    onChange={(e) => setNewMinutes(parseInt(e.target.value) || 30)}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                >
                  <option value="lecture">Lecture & Theory</option>
                  <option value="practice">Basic & Advanced Practice</option>
                  <option value="pyq">PYQs Solving</option>
                  <option value="revision">Formula & Notes Revision</option>
                  <option value="test">Timed Mock / Chapter Test</option>
                </select>
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
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg"
                >
                  Save Target
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
