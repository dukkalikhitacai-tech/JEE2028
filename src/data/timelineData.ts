export interface PhaseInfo {
  id: string;
  number: number | string;
  title: string;
  period: string;
  badge: string;
  tagline: string;
  description: string;
  goals: string[];
  keyActions: string[];
  warningAdvice: string;
  colorScheme: {
    primary: string;
    border: string;
    glow: string;
    accent: string;
  };
}

export const TIMELINE_PHASES: PhaseInfo[] = [
  {
    id: 'phase-0',
    number: '0',
    title: 'PHASE 0 — FOUNDATION',
    period: 'Early Preparation (Now → Class 11 Start)',
    badge: 'Ground Zero',
    tagline: 'Build fundamental habits, mathematical intuition, and study stamina.',
    description: 'Transitioning from board exams to JEE requires a fundamental mindset shift. You are shifting from rote memorization to rigorous first-principles reasoning.',
    goals: [
      'Build mathematical fundamentals (Logarithms, Basic Calculus, Inequalities, Vectors)',
      'Learn basic physics concepts and dimensional analysis',
      'Build chemistry fundamentals (Mole Concept, Redox balancing, Periodic properties)',
      'Develop consistent daily study habits without distractions',
      'Learn how to make concise, useful short notes',
      'Start solving 25-30 quality questions every single day',
    ],
    keyActions: [
      'Eliminate social media and random content scrolling during study blocks.',
      'Maintain one separate formula summary diary right from day one.',
      'Treat mistakes as valuable data, not failures.',
    ],
    warningAdvice: 'Do not jump directly to Irodov or advanced books before school-level concepts and basic algebra are rock solid.',
    colorScheme: {
      primary: 'text-cyan-400',
      border: 'border-cyan-500/30',
      glow: 'glow-cyan',
      accent: 'bg-cyan-500',
    },
  },
  {
    id: 'phase-1',
    number: '1',
    title: 'PHASE 1 — CLASS 11 FOUNDATION',
    period: 'Mid 2026 — End 2026',
    badge: 'Core Mechanics & Fundamentals',
    tagline: 'The heavy lifting: Mechanics, General Organic Chemistry, and Coordinate Geometry.',
    description: 'Class 11 comprises approximately 45-50% of the entire JEE syllabus and establishes the analytical bedrock for all Class 12 concepts.',
    goals: [
      'Master Newtonian Mechanics (NLM, Friction, WEP, Rotational Motion)',
      'Internalize General Organic Chemistry (GOC) & Isomerism mechanisms',
      'Command Coordinate Geometry (Straight Lines & Circles)',
      'For every single chapter execute: Learn → Practice → PYQs → Revise → Test',
    ],
    keyActions: [
      'Draw Free Body Diagrams for every single force problem without exception.',
      'Never skip Rotational Motion; break it into MI, Torque, and Pure Rolling sub-blocks.',
      'Finish NCERT Chemistry chapter reading within 48 hours of classroom lectures.',
    ],
    warningAdvice: 'The #1 trap in Class 11 is "Class 11 Wasted" syndrome. Falling behind by even 2 weeks compounds rapidly.',
    colorScheme: {
      primary: 'text-blue-400',
      border: 'border-blue-500/30',
      glow: 'glow-blue',
      accent: 'bg-blue-500',
    },
  },
  {
    id: 'phase-2',
    number: '2',
    title: 'PHASE 2 — CLASS 11 ADVANCED DEVELOPMENT',
    period: 'Late 2026 — Early 2027',
    badge: 'Advanced Problem Mode',
    tagline: 'Move from understanding formulas to solving multi-concept JEE Advanced problems.',
    description: 'JEE Advanced does not test isolated formula recall. It combines two or three distinct concepts into single multi-step challenges.',
    goals: [
      'Transition across 4 distinct problem tiers: Foundation → JEE Main → JEE Advanced → Challenge',
      'Solve previous 10-year JEE Advanced subjective and multi-correct problems',
      'Tackle mixed-concept problems (e.g., Rotational Dynamics + Simple Harmonic Motion)',
      'Develop elimination skills and dimensional check instincts',
    ],
    keyActions: [
      'Engage "Advanced Problem Mode": spend 15-20 focused minutes on hard questions before seeing solutions.',
      'Maintain an active Error Log for every multi-concept failure.',
      'Practice subjective proof-style problems to clarify boundary conditions.',
    ],
    warningAdvice: 'Do not look at solutions within 2 minutes. The struggle of problem-solving is where actual neural synapses form.',
    colorScheme: {
      primary: 'text-purple-400',
      border: 'border-purple-500/30',
      glow: 'glow-purple',
      accent: 'bg-purple-500',
    },
  },
  {
    id: 'phase-3',
    number: '3',
    title: 'PHASE 3 — CLASS 12 CORE',
    period: 'Early 2027 — Late 2027',
    badge: 'Electrodynamics & Calculus',
    tagline: 'Balancing board expectations with aggressive JEE Advanced mastery.',
    description: 'Class 12 introduces abstract electrodynamics, modern physics, calculus, and comprehensive organic synthesis pathways.',
    goals: [
      'Master Electrodynamics (Electrostatics, Gauss Law, EMI, AC)',
      'Achieve fluent mastery over Differential & Integral Calculus',
      'Memorize all named organic reaction mechanisms & reagents',
      'High-scoring modern physics (Atoms, Nuclei, Semiconductors)',
    ],
    keyActions: [
      'Run parallel weekend revision blocks for Class 11 topics to prevent knowledge decay.',
      'Synchronize Board syllabus milestones with JEE Main requirements.',
      'Maintain short summary sheets for Organic Conversions & Inorganic qualitative trends.',
    ],
    warningAdvice: 'Do not let board exam anxiety paralyze your problem-solving rhythm. A strong JEE foundation guarantees high board marks.',
    colorScheme: {
      primary: 'text-indigo-400',
      border: 'border-indigo-500/30',
      glow: 'glow-blue',
      accent: 'bg-indigo-500',
    },
  },
  {
    id: 'phase-4',
    number: '4',
    title: 'PHASE 4 — SYLLABUS COMPLETION',
    period: 'Target: October — November 2027',
    badge: 'Milestone Zero Deficit',
    tagline: '100% syllabus coverage. The foundation is poured; now the real race begins.',
    description: 'A pivotal milestone where all Class 11 and Class 12 chapters are checked off. No chapter left untouched; zero blanks.',
    goals: [
      'Verify 100% completion of both Class 11 and Class 12 syllabus checkpoints',
      'Conduct a thorough audit of weak chapters vs strong chapters',
      'Consolidate personal formula notes into a single master binder',
      'Finalize full-length test calendar for the upcoming test season',
    ],
    keyActions: [
      'Use the progress audit ring to spot subject imbalance.',
      'Patch any lingering gaps in high-yield chapters (e.g. Modern Physics, Coordination Compounds, Vectors/3D).',
    ],
    warningAdvice: 'Finishing the syllabus is not victory. It is merely reaching the starting line of competitive scoring.',
    colorScheme: {
      primary: 'text-emerald-400',
      border: 'border-emerald-500/30',
      glow: '',
      accent: 'bg-emerald-500',
    },
  },
  {
    id: 'phase-5',
    number: '5',
    title: 'PHASE 5 — PYQ ERA',
    period: 'November 2027 — January 2028',
    badge: 'Real Exam Benchmark',
    tagline: 'Now the game changes. Concepts are half the preparation; PYQs teach how NTA tests them.',
    description: 'Previous Year Questions reveal the exact traps, question formats, calculations, and subtleties demanded by the exam setters.',
    goals: [
      'Solve previous 5 years (2020-2025/2026) shift-wise papers for JEE Main',
      'Identify recurring question archetypes and high-frequency problem structures',
      'Benchmark speed: target <2.2 minutes average per JEE Main question',
      'Catalog repeated calculation errors and trick pitfalls in the Error Book',
    ],
    keyActions: [
      'Solve PYQs strictly in timed blocks with OMR / screen simulation.',
      'Re-attempt all previously marked "Incorrect" and "Reattempt Required" questions.',
    ],
    warningAdvice: 'Never treat PYQ solving as casual homework. Treat every 30-question set as an actual examination block.',
    colorScheme: {
      primary: 'text-amber-400',
      border: 'border-amber-500/30',
      glow: '',
      accent: 'bg-amber-500',
    },
  },
  {
    id: 'phase-6',
    number: '6',
    title: 'PHASE 6 — MOCK TEST SEASON',
    period: 'December 2027 — Exam Eve 2028',
    badge: 'Arena Testing',
    tagline: 'Full 3-hour exam simulations. Conditioning mind, speed, and question triage.',
    description: 'Knowledge without test temperament fails on D-Day. Mock tests train your question selection, stamina, and anxiety tolerance.',
    goals: [
      'Take at least 20-25 full syllabus mock tests under strict 3-hour exam conditions',
      'Master the 3-Round Strategy: Round 1 (Speed run, easy), Round 2 (Moderate, calculation), Round 3 (Challenging)',
      'Analyze every mock test for at least 3 hours: Error, Unattempted, and Silly Mistakes breakdown',
      'Maintain consistent circadian rhythm aligned with 9:00 AM - 12:00 PM and 2:30 PM - 5:30 PM exam shifts',
    ],
    keyActions: [
      'Never take a mock test without completing post-test post-mortem analysis.',
      'Observe your score progression curve without attaching ego to single fluctuations.',
    ],
    warningAdvice: 'Do not take mocks without analyzing them. Taking 10 analyzed tests beats taking 50 unreviewed tests every time.',
    colorScheme: {
      primary: 'text-rose-400',
      border: 'border-rose-500/30',
      glow: '',
      accent: 'bg-rose-500',
    },
  },
];

export const FINAL_100_DAYS_DATA = [
  {
    range: 'Days 100 — 70',
    focus: 'Consolidation & Full PYQ Loops',
    keyDirectives: [
      'Finish secondary syllabus revision for all Class 11 chapters.',
      'Take 2 full-length syllabus mock tests every week (timed 9am-12pm).',
      'Resolve all pending errors logged in the Error Book.',
      'Stop starting any brand-new reference books or supplementary course modules.',
    ],
  },
  {
    range: 'Days 70 — 40',
    focus: 'Mixed Practice & Test Stamina',
    keyDirectives: [
      'Increase test frequency to 3 full mocks per week.',
      'Solve mixed problem sets combining Coordinate Geometry with Calculus.',
      'Perform dedicated 45-minute daily formula and Inorganic reaction speed-drills.',
      'Track question accuracy percentage: strive for >85% accuracy on attempted questions.',
    ],
  },
  {
    range: 'Days 40 — 20',
    focus: 'High-Frequency Chapters & Weakness Surgery',
    keyDirectives: [
      'Dedicate mornings to high-yield scoring chapters: Modern Physics, Semiconductors, Vectors/3D, Coordination Compounds.',
      'Conduct targeted 2-hour surgery blocks on identified weak topics.',
      'Practice skipping traps: identifying unrewarding time-sink problems in under 30 seconds.',
    ],
  },
  {
    range: 'Days 20 — 7',
    focus: 'Full Mock Calibration & Master Formula Binder',
    keyDirectives: [
      'Take 3 final full mocks at the exact expected exam slot (9 AM - 12 PM).',
      'Revise your personal Formula Book from cover to cover.',
      'Re-read NCERT Inorganic lines, qualitative analysis tables, and biomolecules structures.',
      'Solidify exam-day triage protocol: Physics first (45m) → Chemistry (35m) → Maths (80m) → Buffer (20m).',
    ],
  },
  {
    range: 'Final 7 Days',
    focus: 'Mental Equanimity, Sleep Rhythm & Execution',
    keyDirectives: [
      'NO NEW QUESTIONS. Review only your Error Notebook and verified summary formula sheets.',
      'Reset sleep schedule strictly to 10:30 PM sleep and 6:30 AM wake up.',
      'Verify admit card requirements, exam center location, and identification documents.',
      'Trust the systematic 2-year preparation: calm execution under pressure is your ultimate edge.',
    ],
  },
];

export const MAIN_TO_ADVANCED_STEPS = [
  {
    step: '1',
    title: 'JEE Main Execution & Baseline Audit',
    desc: 'Complete JEE Main session(s). Audit your percentile, qualify for JEE Advanced eligibility, and celebrate briefly.',
  },
  {
    step: '2',
    title: 'Shift from Speed to Analytical Depth',
    desc: 'JEE Main demands rapid 2-minute formula recall. JEE Advanced demands multi-step conceptual proofs, multiple correct choices, and paragraph matrices.',
  },
  {
    step: '3',
    title: 'Advanced PYQ Immersion (2010 — Present)',
    desc: 'Solve every single official JEE Advanced question paper with full analytical rigor. Study multi-correct negative marking discipline (+4, -2).',
  },
  {
    step: '4',
    title: 'Dual 3-Hour Paper Conditioning (Paper 1 & Paper 2)',
    desc: 'Condition the brain for 6 grueling hours of cognitive strain with a 2-hour midday interval in between.',
  },
  {
    step: '5',
    title: 'The Gateway to IIT',
    desc: 'Walk into JEE Advanced with complete clarity. Your performance reflects two years of structured, honest daily labor.',
  },
];
