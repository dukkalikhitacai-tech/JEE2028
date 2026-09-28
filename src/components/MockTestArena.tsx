import React, { useState } from 'react';
import { useRoadmap } from '../context/RoadmapContext';
import { MockAttempt } from '../types';
import { 
  ClipboardCheck, 
  Plus, 
  TrendingUp, 
  Clock, 
  Target, 
  AlertCircle, 
  Trash2, 
  BarChart3,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

export const MockTestArena: React.FC = () => {
  const { mockAttempts, addMockAttempt, deleteMockAttempt, metrics, triggerConfetti } = useRoadmap();

  const [showAddModal, setShowAddModal] = useState(false);
  const [testName, setTestName] = useState('');
  const [testType, setTestType] = useState<MockAttempt['testType']>('Full Syllabus JEE Main');
  const [durationMinutes, setDurationMinutes] = useState(180);
  const [physicsScore, setPhysicsScore] = useState(70);
  const [chemistryScore, setChemistryScore] = useState(75);
  const [mathScore, setMathScore] = useState(55);
  const [maxScore, setMaxScore] = useState(300);
  const [attemptedCount, setAttemptedCount] = useState(62);
  const [incorrectCount, setIncorrectCount] = useState(10);
  const [analysisNotes, setAnalysisNotes] = useState('');

  const handleLogMock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName.trim()) return;

    const total = physicsScore + chemistryScore + mathScore;
    const accuracy = attemptedCount > 0 ? Math.round(((attemptedCount - incorrectCount) / attemptedCount) * 100) : 0;
    const unattempted = 75 - attemptedCount; // for JEE Main standard

    addMockAttempt({
      testName: testName.trim(),
      testType,
      date: new Date().toISOString().split('T')[0],
      durationMinutes,
      physicsScore,
      chemistryScore,
      mathScore,
      totalScore: total,
      maxScore,
      accuracyPercent: accuracy,
      attemptedCount,
      incorrectCount,
      unattemptedCount: Math.max(0, unattempted),
      analysisNotes: analysisNotes.trim(),
    });

    setTestName('');
    setAnalysisNotes('');
    setShowAddModal(false);
    triggerConfetti();
  };

  // SVG Line Chart points calculation
  const chartHeight = 160;
  const chartWidth = 560;
  const padding = 30;

  const points = mockAttempts.map((m, idx) => {
    const x = padding + (idx / Math.max(1, mockAttempts.length - 1)) * (chartWidth - 2 * padding);
    const y = chartHeight - padding - ((m.totalScore / (m.maxScore || 300)) * (chartHeight - 2 * padding));
    return { x, y, score: m.totalScore, name: m.testName };
  });

  const polylineStr = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-950/30 via-slate-900 to-slate-950 p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider mb-2 font-bold">
          <Target className="h-4 w-4" />
          <span>Phase 6 Full Simulation</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          MOCK TEST ARENA
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Full 3-hour exam simulations. Build speed triage, stamina, and zero-panic test temperament under realistic exam constraints.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-rose-400 hover:bg-rose-300 rounded-xl transition-all shadow-md active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Record Full Mock Test</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Official Policy: No fabricated rank predictions. Focus strictly on score calibration.</span>
          </div>
        </div>
      </div>

      {/* Mock Progression Graph (Mock 1 → Mock 2 → Mock 3 ...) */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
              Trajectory Progression
            </span>
            <h3 className="text-lg font-bold text-white">
              Mock 1 → Mock 2 → Mock 3 Total Score Trend
            </h3>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <span>Total Score</span>
            </span>
            <span>Average: {metrics.averageMockScore} / 300</span>
          </div>
        </div>

        {/* Responsive SVG Chart */}
        {mockAttempts.length > 1 ? (
          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full max-w-2xl mx-auto overflow-visible"
            >
              {/* Background horizontal grid lines */}
              <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="#1e293b" strokeDasharray="3 3" />
              <line x1={padding} y1={chartHeight / 2} x2={chartWidth - padding} y2={chartHeight / 2} stroke="#1e293b" strokeDasharray="3 3" />
              <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#334155" />

              {/* Area Gradient fill */}
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <polygon
                points={`${padding},${chartHeight - padding} ${polylineStr} ${points[points.length - 1].x},${chartHeight - padding}`}
                fill="url(#scoreGrad)"
              />

              {/* Main Line */}
              <polyline
                fill="none"
                stroke="#06b6d4"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={polylineStr}
              />

              {/* Data points */}
              {points.map((p, idx) => (
                <g key={idx}>
                  <circle cx={p.x} cy={p.y} r="5" fill="#030712" stroke="#06b6d4" strokeWidth="2.5" />
                  <text
                    x={p.x}
                    y={p.y - 10}
                    textAnchor="middle"
                    fill="#38bdf8"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {p.score}
                  </text>
                  <text
                    x={p.x}
                    y={chartHeight - 12}
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    M{idx + 1}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 text-xs">
            Log at least 2 mock attempts to generate the progression curve.
          </div>
        )}
      </div>

      {/* Attempt History Deck */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white">Full Syllabus Mock Log History</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockAttempts.map((mock, idx) => (
            <div
              key={mock.id}
              className="p-5 rounded-xl border border-slate-800 bg-slate-900/90 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                  <span>Mock #{idx + 1} · {mock.date}</span>
                  <button
                    onClick={() => deleteMockAttempt(mock.id)}
                    className="text-slate-600 hover:text-rose-400 p-1"
                    title="Delete mock"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <h4 className="text-base font-bold text-white mb-2">{mock.testName}</h4>

                {/* Score Big Display */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-mono text-3xl font-black text-cyan-400 tabular-nums">
                    {mock.totalScore}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">/ {mock.maxScore || 300}</span>
                  <span className="ml-auto text-xs font-mono font-bold text-emerald-400">
                    {mock.accuracyPercent}% Acc
                  </span>
                </div>

                {/* Subject-Wise breakdown */}
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs p-2 rounded-lg bg-slate-950 border border-slate-800 font-mono mb-3">
                  <div>
                    <span className="text-[10px] text-slate-500 block">PHY</span>
                    <span className="font-bold text-blue-400">{mock.physicsScore}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">CHEM</span>
                    <span className="font-bold text-cyan-400">{mock.chemistryScore}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">MATH</span>
                    <span className="font-bold text-purple-400">{mock.mathScore}</span>
                  </div>
                </div>

                {/* Triage Stats */}
                <div className="flex justify-between text-[11px] text-slate-400 font-mono border-t border-slate-800/80 pt-2">
                  <span>Att: {mock.attemptedCount}</span>
                  <span className="text-rose-400">Inc: {mock.incorrectCount}</span>
                  <span>Unatt: {mock.unattemptedCount}</span>
                </div>

                {/* Analysis Notes */}
                {mock.analysisNotes && (
                  <p className="text-xs text-slate-300 mt-2 p-2 rounded bg-slate-950/60 border border-slate-800 italic">
                    “{mock.analysisNotes}”
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Record Mock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">Record Full Mock Test Result</h3>
            <p className="text-xs text-slate-400">
              Honest data produces real score breakthroughs. Record scores immediately after test review.
            </p>

            <form onSubmit={handleLogMock} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Test Name / Series</label>
                <input
                  type="text"
                  placeholder="e.g. Allen Leader Test 4 / MathonGo Mock 3"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-blue-400 mb-1">Physics Score</label>
                  <input
                    type="number"
                    value={physicsScore}
                    onChange={(e) => setPhysicsScore(parseInt(e.target.value) || 0)}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-cyan-400 mb-1">Chem Score</label>
                  <input
                    type="number"
                    value={chemistryScore}
                    onChange={(e) => setChemistryScore(parseInt(e.target.value) || 0)}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-purple-400 mb-1">Maths Score</label>
                  <input
                    type="number"
                    value={mathScore}
                    onChange={(e) => setMathScore(parseInt(e.target.value) || 0)}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Attempted Questions</label>
                  <input
                    type="number"
                    min="1"
                    max="75"
                    value={attemptedCount}
                    onChange={(e) => setAttemptedCount(parseInt(e.target.value) || 0)}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-rose-400 mb-1">Incorrect Questions</label>
                  <input
                    type="number"
                    min="0"
                    max={attemptedCount}
                    value={incorrectCount}
                    onChange={(e) => setIncorrectCount(parseInt(e.target.value) || 0)}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Post-Exam Mistake Analysis Notes</label>
                <textarea
                  rows={3}
                  placeholder="Where did time leak? Which round yielded maximum marks? Which traps caught you?"
                  value={analysisNotes}
                  onChange={(e) => setAnalysisNotes(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-rose-500"
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
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-rose-400 hover:bg-rose-300 rounded-lg"
                >
                  Save Mock Attempt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
