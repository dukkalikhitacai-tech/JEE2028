import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  ChapterProgress, 
  DailyMissionState, 
  DailyTask, 
  DifficultyLevel, 
  ErrorEntry, 
  Milestone, 
  MockAttempt, 
  PYQItem, 
  UserProfile 
} from '../types';
import { SYLLABUS_CHAPTERS, FOUNDATION_CHECKLIST } from '../data/syllabusData';
import { INITIAL_MILESTONES } from '../data/milestonesData';

interface RoadmapContextType {
  userProfile: UserProfile;
  chapterProgress: Record<string, ChapterProgress>;
  dailyMission: DailyMissionState;
  errorLog: ErrorEntry[];
  mockAttempts: MockAttempt[];
  pyqItems: PYQItem[];
  foundationChecklistState: Record<string, boolean>;
  milestones: Milestone[];
  revisionIntervals: number[];
  activeTab: string;
  isWhereAmIOpen: boolean;
  isOnboardingOpen: boolean;
  selectedPhaseId: string | null;

  // Setters & Actions
  setActiveTab: (tab: string) => void;
  setIsWhereAmIOpen: (open: boolean) => void;
  setIsOnboardingOpen: (open: boolean) => void;
  setSelectedPhaseId: (phaseId: string | null) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  toggleChapterStep: (chapterId: string, step: 'learn' | 'practice' | 'pyqs' | 'revise' | 'test' | 'completed') => void;
  setChapterDifficulty: (chapterId: string, level: DifficultyLevel) => void;
  toggleFoundationItem: (id: string) => void;
  toggleDailyTask: (id: string) => void;
  addDailyTask: (task: { title: string; subject: any; targetMinutes: number; category: any }) => void;
  logStudySession: (minutes: number, questions: number, correct: number) => void;
  addErrorEntry: (entry: Omit<ErrorEntry, 'id' | 'dateAdded' | 'status'>) => void;
  toggleErrorStatus: (id: string) => void;
  deleteErrorEntry: (id: string) => void;
  addMockAttempt: (attempt: Omit<MockAttempt, 'id'>) => void;
  deleteMockAttempt: (id: string) => void;
  updatePYQStatus: (id: string, status: PYQItem['status'], timeTakenSec?: number) => void;
  addCustomPYQ: (pyq: Omit<PYQItem, 'id'>) => void;
  setRevisionIntervals: (intervals: number[]) => void;
  triggerConfetti: () => void;
  exportData: () => string;
  importData: (jsonStr: string) => boolean;
  resetToDemoData: () => void;

  // Computed Metrics
  metrics: {
    overallCompletion: number;
    physicsCompletion: number;
    chemistryCompletion: number;
    mathCompletion: number;
    totalChapters: number;
    completedChaptersCount: number;
    remainingChaptersCount: number;
    advancedModeCount: number;
    totalPYQsAttempted: number;
    totalPYQsCorrect: number;
    pyqAccuracy: number;
    totalMocksCount: number;
    averageMockScore: number;
    currentStreak: number;
    totalQuestionsSolved: number;
    estimatedPhase: { phaseNumber: string; phaseTitle: string; currentFocus: string };
    nextThreePriorities: { type: 'complete' | 'practice' | 'revise'; title: string; subtitle: string }[];
  };
}

const DEFAULT_PROFILE: UserProfile = {
  currentClass: '11',
  prepLevel: 'basic',
  target: 'both',
  dailyStudyTime: '5-7',
  learningStyle: 'combo',
  strengths: {
    physics: 'moderate',
    chemistry: 'strong',
    mathematics: 'moderate',
  },
  isOnboarded: false,
  startedAt: '2026-09-01',
};

const DEFAULT_DAILY_TASKS: DailyTask[] = [
  { id: 'dt-1', title: 'Rotational Motion — Pure Rolling & Angular Momentum', subject: 'physics', targetMinutes: 90, completedMinutes: 90, isCompleted: true, category: 'lecture' },
  { id: 'dt-2', title: 'Chemical Bonding — MOT & Hybridization Practice', subject: 'chemistry', targetMinutes: 60, completedMinutes: 60, isCompleted: true, category: 'practice' },
  { id: 'dt-3', title: 'Quadratic Equations — Location of Roots Deep Dive', subject: 'mathematics', targetMinutes: 90, completedMinutes: 45, isCompleted: false, category: 'practice' },
  { id: 'dt-4', title: 'Solve 20 JEE Main 2024 Kinematics PYQs', subject: 'physics', targetMinutes: 45, completedMinutes: 0, isCompleted: false, category: 'pyq' },
  { id: 'dt-5', title: 'Review Organic GOC Reaction Intermediates Notes', subject: 'chemistry', targetMinutes: 30, completedMinutes: 0, isCompleted: false, category: 'revision' },
  { id: 'dt-6', title: '15-Question Timed Mini Test: Straight Lines', subject: 'mathematics', targetMinutes: 35, completedMinutes: 0, isCompleted: false, category: 'test' },
];

const DEFAULT_ERRORS: ErrorEntry[] = [
  {
    id: 'err-1',
    questionTitle: 'JEE Advanced 2022 Paper 1: Rolling on a Moving Plank',
    subject: 'physics',
    chapterTitle: 'Rotational Motion',
    mistakeDescription: 'Forgot to take pseudo force torque about the accelerating plank contact point.',
    correctApproach: 'When applying torque about an accelerated frame point, include torque of pseudo force passing through COM.',
    conceptInvolved: 'Torque equation in non-inertial reference frame (tau_p = I_com * alpha + r_com x m*a_frame).',
    mistakeType: 'concept',
    dateAdded: '2026-09-22',
    reattemptDate: '2026-10-02',
    status: 'pending',
  },
  {
    id: 'err-2',
    questionTitle: 'JEE Main 2023 Jan Shift: Buffer Solution pH Calculation',
    subject: 'chemistry',
    chapterTitle: 'Chemical & Ionic Equilibrium',
    mistakeDescription: 'Took volume change into account for ratio but made a calculation error in log(0.05/0.1).',
    correctApproach: 'Henderson equation: pH = pKa + log([Conjugate Base]/[Weak Acid]). Double-check logs of simple fractions.',
    conceptInvolved: 'Henderson-Hasselbalch equation and decimal arithmetic under timed exam stress.',
    mistakeType: 'calculation',
    dateAdded: '2026-09-24',
    reattemptDate: '2026-09-29',
    status: 'pending',
  },
  {
    id: 'err-3',
    questionTitle: 'JEE Main 2024 April Shift: Number of Integral Solutions in P&C',
    subject: 'mathematics',
    chapterTitle: 'Permutations & Combinations (P&C)',
    mistakeDescription: 'Misread the question constraint: missed "x1, x2, x3 > 1" and assumed non-negative integers >= 0.',
    correctApproach: 'Substitute y_i = x_i - 2 before applying Stars and Bars multinomial expansion.',
    conceptInvolved: 'Beggar method / Stars and Bars with minimum positive integer bounds.',
    mistakeType: 'misread',
    dateAdded: '2026-09-26',
    reattemptDate: '2026-10-05',
    status: 'resolved',
  },
];

const DEFAULT_MOCKS: MockAttempt[] = [
  {
    id: 'mock-1',
    testName: 'Full Syllabus Mock 1 (Class 11 Diagnostic)',
    testType: 'Full Syllabus JEE Main',
    date: '2026-08-15',
    durationMinutes: 180,
    physicsScore: 52,
    chemistryScore: 68,
    mathScore: 40,
    totalScore: 160,
    maxScore: 300,
    accuracyPercent: 74,
    attemptedCount: 54,
    incorrectCount: 14,
    unattemptedCount: 21,
    analysisNotes: 'Struggled with time in Maths. Physics Mechanics had 4 silly calculation errors. Chemistry was high scoring.',
  },
  {
    id: 'mock-2',
    testName: 'Full Syllabus Mock 2 (NTA Abhyas Pattern)',
    testType: 'Full Syllabus JEE Main',
    date: '2026-09-02',
    durationMinutes: 180,
    physicsScore: 64,
    chemistryScore: 76,
    mathScore: 48,
    totalScore: 188,
    maxScore: 300,
    accuracyPercent: 81,
    attemptedCount: 58,
    incorrectCount: 11,
    unattemptedCount: 17,
    analysisNotes: 'Noticeable improvement in question triage! Chemistry finished in 38 minutes, leaving 85 minutes for Maths.',
  },
  {
    id: 'mock-3',
    testName: 'Full Syllabus Mock 3 (Rigorous Shift Simulation)',
    testType: 'Full Syllabus JEE Main',
    date: '2026-09-20',
    durationMinutes: 180,
    physicsScore: 72,
    chemistryScore: 82,
    mathScore: 56,
    totalScore: 210,
    maxScore: 300,
    accuracyPercent: 86,
    attemptedCount: 61,
    incorrectCount: 8,
    unattemptedCount: 14,
    analysisNotes: 'Best score so far. Maintained Round 1/2 discipline. Modern Physics and Coordinate Geometry gave 100% conversion.',
  },
];

const DEFAULT_PYQS: PYQItem[] = [
  { id: 'pyq-1', subject: 'physics', chapterTitle: 'Kinematics', exam: 'JEE Main', year: 2024, difficulty: 'medium', questionSummary: 'A particle moves with deceleration a = -k*sqrt(v). Find time to come to rest if initial velocity is v0.', status: 'correct', timeTakenSec: 95 },
  { id: 'pyq-2', subject: 'physics', chapterTitle: 'Rotational Motion', exam: 'JEE Advanced', year: 2023, difficulty: 'hard', questionSummary: 'Hollow cylinder rolling without slipping on a wedge which itself accelerates on a smooth floor.', status: 'reattempt', timeTakenSec: 240, userNote: 'Re-analyze constraint relation for contact points.' },
  { id: 'pyq-3', subject: 'chemistry', chapterTitle: 'Chemical Bonding', exam: 'JEE Main', year: 2024, difficulty: 'easy', questionSummary: 'Determine the bond order and magnetic behavior of O2, O2+, O2- and O2(2-) using MOT.', status: 'correct', timeTakenSec: 65 },
  { id: 'pyq-4', subject: 'chemistry', chapterTitle: 'General Organic Chemistry', exam: 'JEE Advanced', year: 2022, difficulty: 'hard', questionSummary: 'Comparison of acidic strength among ortho-substituted benzoic acid derivatives (ortho effect vs resonance).', status: 'incorrect', timeTakenSec: 180, userNote: 'Review Steric Inhibition of Resonance (SIR).' },
  { id: 'pyq-5', subject: 'mathematics', chapterTitle: 'Quadratic Equations', exam: 'JEE Main', year: 2024, difficulty: 'medium', questionSummary: 'If alpha and beta are roots of x^2 - 6x - 2 = 0, find the value of (a10 - 2*a8) / (2*a9) where an = alpha^n - beta^n.', status: 'correct', timeTakenSec: 75 },
  { id: 'pyq-6', subject: 'mathematics', chapterTitle: 'Complex Numbers', exam: 'JEE Advanced', year: 2023, difficulty: 'hard', questionSummary: 'Locus of z such that |z - 1| / |z + 2i| = 2 with arg((z - 1)/(z + 1)) = pi/4.', status: 'reattempt', timeTakenSec: 320 },
];

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

export const RoadmapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage with fallbacks
  const [userProfile, setUserProfileState] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('road_to_iit_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [chapterProgress, setChapterProgressState] = useState<Record<string, ChapterProgress>>(() => {
    try {
      const saved = localStorage.getItem('road_to_iit_chapters');
      if (saved) return JSON.parse(saved);
      // Initialize with default state
      const initial: Record<string, ChapterProgress> = {};
      SYLLABUS_CHAPTERS.forEach((ch, idx) => {
        // Seed first 7 chapters with partial realistic progress
        const isDoneEarly = idx < 6;
        const isLearning = idx >= 6 && idx <= 10;
        initial[ch.id] = {
          id: ch.id,
          learn: isDoneEarly || isLearning,
          practice: isDoneEarly,
          pyqs: isDoneEarly,
          revise: idx < 4,
          test: idx < 3,
          completed: isDoneEarly,
          difficultyLevel: isDoneEarly ? (idx < 2 ? 'advanced' : 'main') : 'foundation',
          revisionCount: isDoneEarly ? 2 : 0,
        };
      });
      return initial;
    } catch {
      return {};
    }
  });

  const [dailyMission, setDailyMissionState] = useState<DailyMissionState>(() => {
    try {
      const saved = localStorage.getItem('road_to_iit_daily');
      if (saved) return JSON.parse(saved);
      return {
        date: new Date().toISOString().split('T')[0],
        streakCount: 14,
        lastStreakDate: new Date().toISOString().split('T')[0],
        questionsSolvedToday: 42,
        questionsCorrectToday: 36,
        tasks: DEFAULT_DAILY_TASKS,
        notes: 'Priority: Rotational motion pure rolling formulas + Chemistry MOT bond order table.',
      };
    } catch {
      return {
        date: new Date().toISOString().split('T')[0],
        streakCount: 14,
        lastStreakDate: new Date().toISOString().split('T')[0],
        questionsSolvedToday: 42,
        questionsCorrectToday: 36,
        tasks: DEFAULT_DAILY_TASKS,
        notes: '',
      };
    }
  });

  const [errorLog, setErrorLogState] = useState<ErrorEntry[]>(() => {
    try {
      const saved = localStorage.getItem('road_to_iit_errors');
      return saved ? JSON.parse(saved) : DEFAULT_ERRORS;
    } catch {
      return DEFAULT_ERRORS;
    }
  });

  const [mockAttempts, setMockAttemptsState] = useState<MockAttempt[]>(() => {
    try {
      const saved = localStorage.getItem('road_to_iit_mocks');
      return saved ? JSON.parse(saved) : DEFAULT_MOCKS;
    } catch {
      return DEFAULT_MOCKS;
    }
  });

  const [pyqItems, setPYQItemsState] = useState<PYQItem[]>(() => {
    try {
      const saved = localStorage.getItem('road_to_iit_pyqs');
      return saved ? JSON.parse(saved) : DEFAULT_PYQS;
    } catch {
      return DEFAULT_PYQS;
    }
  });

  const [foundationChecklistState, setFoundationChecklistState] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('road_to_iit_foundation');
      if (saved) return JSON.parse(saved);
      const initial: Record<string, boolean> = {};
      FOUNDATION_CHECKLIST.forEach((item, idx) => {
        initial[item.id] = idx < 4;
      });
      return initial;
    } catch {
      return {};
    }
  });

  const [revisionIntervals, setRevisionIntervalsState] = useState<number[]>([1, 7, 21, 45, 90]);
  const [activeTab, setActiveTab] = useState<string>('roadmap');
  const [isWhereAmIOpen, setIsWhereAmIOpen] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>(null);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('road_to_iit_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('road_to_iit_chapters', JSON.stringify(chapterProgress));
  }, [chapterProgress]);

  useEffect(() => {
    localStorage.setItem('road_to_iit_daily', JSON.stringify(dailyMission));
  }, [dailyMission]);

  useEffect(() => {
    localStorage.setItem('road_to_iit_errors', JSON.stringify(errorLog));
  }, [errorLog]);

  useEffect(() => {
    localStorage.setItem('road_to_iit_mocks', JSON.stringify(mockAttempts));
  }, [mockAttempts]);

  useEffect(() => {
    localStorage.setItem('road_to_iit_pyqs', JSON.stringify(pyqItems));
  }, [pyqItems]);

  useEffect(() => {
    localStorage.setItem('road_to_iit_foundation', JSON.stringify(foundationChecklistState));
  }, [foundationChecklistState]);

  // Actions
  const updateUserProfile = (newVals: Partial<UserProfile>) => {
    setUserProfileState(prev => ({ ...prev, ...newVals }));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#3b82f6', '#a855f7', '#10b981'],
      });
    } catch {
      // safe fallback
    }
  };

  const toggleChapterStep = (chapterId: string, step: 'learn' | 'practice' | 'pyqs' | 'revise' | 'test' | 'completed') => {
    setChapterProgressState(prev => {
      const current = prev[chapterId] || {
        id: chapterId,
        learn: false,
        practice: false,
        pyqs: false,
        revise: false,
        test: false,
        completed: false,
        difficultyLevel: 'foundation',
        revisionCount: 0,
      };

      const updated = { ...current };
      updated[step] = !current[step];

      // If all 5 sub-steps are done, auto-mark completed
      if (step !== 'completed') {
        if (updated.learn && updated.practice && updated.pyqs && updated.revise && updated.test) {
          updated.completed = true;
          triggerConfetti();
        }
      } else {
        if (updated.completed) {
          triggerConfetti();
        }
      }

      return {
        ...prev,
        [chapterId]: updated,
      };
    });
  };

  const setChapterDifficulty = (chapterId: string, level: DifficultyLevel) => {
    setChapterProgressState(prev => ({
      ...prev,
      [chapterId]: {
        ...(prev[chapterId] || {
          id: chapterId,
          learn: false,
          practice: false,
          pyqs: false,
          revise: false,
          test: false,
          completed: false,
          revisionCount: 0,
        }),
        difficultyLevel: level,
      },
    }));
  };

  const toggleFoundationItem = (id: string) => {
    setFoundationChecklistState(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleDailyTask = (id: string) => {
    setDailyMissionState(prev => {
      const newTasks = prev.tasks.map(t => {
        if (t.id === id) {
          const nextState = !t.isCompleted;
          return {
            ...t,
            isCompleted: nextState,
            completedMinutes: nextState ? t.targetMinutes : 0,
          };
        }
        return t;
      });
      return {
        ...prev,
        tasks: newTasks,
      };
    });
  };

  const addDailyTask = (task: { title: string; subject: any; targetMinutes: number; category: any }) => {
    const newTask: DailyTask = {
      id: `task-${Date.now()}`,
      title: task.title,
      subject: task.subject,
      targetMinutes: task.targetMinutes,
      completedMinutes: 0,
      isCompleted: false,
      category: task.category,
    };
    setDailyMissionState(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
    }));
  };

  const logStudySession = (minutes: number, questions: number, correct: number) => {
    setDailyMissionState(prev => ({
      ...prev,
      questionsSolvedToday: prev.questionsSolvedToday + questions,
      questionsCorrectToday: prev.questionsCorrectToday + correct,
    }));
  };

  const addErrorEntry = (entry: Omit<ErrorEntry, 'id' | 'dateAdded' | 'status'>) => {
    const newEntry: ErrorEntry = {
      ...entry,
      id: `err-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setErrorLogState(prev => [newEntry, ...prev]);
  };

  const toggleErrorStatus = (id: string) => {
    setErrorLogState(prev => prev.map(e => e.id === id ? { ...e, status: e.status === 'pending' ? 'resolved' : 'pending' } : e));
  };

  const deleteErrorEntry = (id: string) => {
    setErrorLogState(prev => prev.filter(e => e.id !== id));
  };

  const addMockAttempt = (attempt: Omit<MockAttempt, 'id'>) => {
    const newAttempt: MockAttempt = {
      ...attempt,
      id: `mock-${Date.now()}`,
    };
    setMockAttemptsState(prev => [...prev, newAttempt]);
    triggerConfetti();
  };

  const deleteMockAttempt = (id: string) => {
    setMockAttemptsState(prev => prev.filter(m => m.id !== id));
  };

  const updatePYQStatus = (id: string, status: PYQItem['status'], timeTakenSec?: number) => {
    setPYQItemsState(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          status,
          timeTakenSec: timeTakenSec ?? p.timeTakenSec,
        };
      }
      return p;
    }));
  };

  const addCustomPYQ = (pyq: Omit<PYQItem, 'id'>) => {
    const newItem: PYQItem = {
      ...pyq,
      id: `pyq-${Date.now()}`,
    };
    setPYQItemsState(prev => [newItem, ...prev]);
  };

  const setRevisionIntervals = (intervals: number[]) => {
    setRevisionIntervalsState(intervals);
  };

  const exportData = () => {
    const bundle = {
      userProfile,
      chapterProgress,
      dailyMission,
      errorLog,
      mockAttempts,
      pyqItems,
      foundationChecklistState,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(bundle, null, 2);
  };

  const importData = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.userProfile) setUserProfileState(parsed.userProfile);
      if (parsed.chapterProgress) setChapterProgressState(parsed.chapterProgress);
      if (parsed.dailyMission) setDailyMissionState(parsed.dailyMission);
      if (parsed.errorLog) setErrorLogState(parsed.errorLog);
      if (parsed.mockAttempts) setMockAttemptsState(parsed.mockAttempts);
      if (parsed.pyqItems) setPYQItemsState(parsed.pyqItems);
      if (parsed.foundationChecklistState) setFoundationChecklistState(parsed.foundationChecklistState);
      return true;
    } catch {
      return false;
    }
  };

  const resetToDemoData = () => {
    localStorage.clear();
    setUserProfileState(DEFAULT_PROFILE);
    const initial: Record<string, ChapterProgress> = {};
    SYLLABUS_CHAPTERS.forEach((ch, idx) => {
      const isDoneEarly = idx < 6;
      initial[ch.id] = {
        id: ch.id,
        learn: isDoneEarly,
        practice: isDoneEarly,
        pyqs: isDoneEarly,
        revise: idx < 4,
        test: idx < 3,
        completed: isDoneEarly,
        difficultyLevel: isDoneEarly ? 'main' : 'foundation',
        revisionCount: isDoneEarly ? 2 : 0,
      };
    });
    setChapterProgressState(initial);
    setDailyMissionState({
      date: new Date().toISOString().split('T')[0],
      streakCount: 14,
      lastStreakDate: new Date().toISOString().split('T')[0],
      questionsSolvedToday: 42,
      questionsCorrectToday: 36,
      tasks: DEFAULT_DAILY_TASKS,
      notes: '',
    });
    setErrorLogState(DEFAULT_ERRORS);
    setMockAttemptsState(DEFAULT_MOCKS);
    setPYQItemsState(DEFAULT_PYQS);
    window.location.reload();
  };

  // Compute live metrics
  const metrics = useMemo(() => {
    const totalChapters = SYLLABUS_CHAPTERS.length;
    let completedCount = 0;
    let physicsCompleted = 0;
    let physicsTotal = 0;
    let chemistryCompleted = 0;
    let chemistryTotal = 0;
    let mathCompleted = 0;
    let mathTotal = 0;
    let advancedModeCount = 0;

    SYLLABUS_CHAPTERS.forEach(ch => {
      const prog = chapterProgress[ch.id];
      const isDone = prog?.completed;

      if (ch.subject === 'physics') {
        physicsTotal++;
        if (isDone) physicsCompleted++;
      } else if (ch.subject === 'chemistry') {
        chemistryTotal++;
        if (isDone) chemistryCompleted++;
      } else if (ch.subject === 'mathematics') {
        mathTotal++;
        if (isDone) mathCompleted++;
      }

      if (isDone) completedCount++;
      if (prog?.difficultyLevel === 'advanced' || prog?.difficultyLevel === 'challenge') {
        advancedModeCount++;
      }
    });

    const overallCompletion = Math.round((completedCount / totalChapters) * 100) || 0;
    const physicsCompletion = Math.round((physicsCompleted / Math.max(1, physicsTotal)) * 100) || 0;
    const chemistryCompletion = Math.round((chemistryCompleted / Math.max(1, chemistryTotal)) * 100) || 0;
    const mathCompletion = Math.round((mathCompleted / Math.max(1, mathTotal)) * 100) || 0;

    // PYQs
    const totalPYQsAttempted = pyqItems.filter(p => p.status !== 'unattempted').length;
    const totalPYQsCorrect = pyqItems.filter(p => p.status === 'correct').length;
    const pyqAccuracy = totalPYQsAttempted > 0 ? Math.round((totalPYQsCorrect / totalPYQsAttempted) * 100) : 0;

    // Mocks
    const totalMocksCount = mockAttempts.length;
    const avgScore = totalMocksCount > 0 
      ? Math.round(mockAttempts.reduce((acc, m) => acc + m.totalScore, 0) / totalMocksCount) 
      : 0;

    // Determine current phase accurately based on completion
    let phaseNumber = '0';
    let phaseTitle = 'PHASE 0 — FOUNDATION';
    let currentFocus = 'Build core mathematical tools and foundational habits.';

    if (overallCompletion >= 85) {
      phaseNumber = '5 & 6';
      phaseTitle = 'PHASE 5/6 — PYQ ERA & MOCK ARENA';
      currentFocus = 'Rigorous timed full mocks, speed triage, and error notebook surgery.';
    } else if (overallCompletion >= 50) {
      phaseNumber = '3';
      phaseTitle = 'PHASE 3 — CLASS 12 CORE';
      currentFocus = 'Electrodynamics, Advanced Organic Synthesis & Integral Calculus.';
    } else if (overallCompletion >= 25) {
      phaseNumber = '2';
      phaseTitle = 'PHASE 2 — ADVANCED PROBLEM DEVELOPMENT';
      currentFocus = 'Transitioning from JEE Main to JEE Advanced multi-concept problem sets.';
    } else if (overallCompletion >= 8) {
      phaseNumber = '1';
      phaseTitle = 'PHASE 1 — CLASS 11 FOUNDATION';
      currentFocus = 'Newtonian Mechanics, GOC & Coordinate Geometry.';
    }

    // Next 3 actionable priorities
    const uncompletedChapters = SYLLABUS_CHAPTERS.filter(ch => !chapterProgress[ch.id]?.completed);
    const firstUnfinished = uncompletedChapters[0]?.title || 'Class 12 Core Revision';
    const secondUnfinished = uncompletedChapters[1]?.title || 'Advanced Multi-Concept Integration';

    const nextThreePriorities = [
      {
        type: 'complete' as const,
        title: `Complete: ${firstUnfinished}`,
        subtitle: 'Watch master lectures and finish class illustrations with full written derivations.',
      },
      {
        type: 'practice' as const,
        title: `Practice: 30 PYQs for ${secondUnfinished}`,
        subtitle: 'Solve under strict 2.5 min/question timed conditions without looking at solutions.',
      },
      {
        type: 'revise' as const,
        title: 'Revise: Error Book & Formula Notebook',
        subtitle: 'Resolve pending marked mistakes in torque equations and ionic equilibrium buffer pH.',
      },
    ];

    return {
      overallCompletion,
      physicsCompletion,
      chemistryCompletion,
      mathCompletion,
      totalChapters,
      completedChaptersCount: completedCount,
      remainingChaptersCount: totalChapters - completedCount,
      advancedModeCount,
      totalPYQsAttempted,
      totalPYQsCorrect,
      pyqAccuracy,
      totalMocksCount,
      averageMockScore: avgScore,
      currentStreak: dailyMission.streakCount,
      totalQuestionsSolved: 240 + dailyMission.questionsSolvedToday,
      estimatedPhase: { phaseNumber, phaseTitle, currentFocus },
      nextThreePriorities,
    };
  }, [chapterProgress, pyqItems, mockAttempts, dailyMission]);

  // Compute dynamic milestones
  const milestones = useMemo(() => {
    return INITIAL_MILESTONES.map(m => {
      let currentVal = 0;
      let unlocked = m.unlocked;

      if (m.id === 'ms-start') {
        currentVal = 1;
        unlocked = true;
      } else if (m.id === 'ms-10-chapters') {
        currentVal = metrics.completedChaptersCount;
        unlocked = currentVal >= 10;
      } else if (m.id === 'ms-1000-questions') {
        currentVal = metrics.totalQuestionsSolved;
        unlocked = currentVal >= 1000;
      } else if (m.id === 'ms-first-mock') {
        currentVal = metrics.totalMocksCount;
        unlocked = currentVal >= 1;
      } else if (m.id === 'ms-50-percent') {
        currentVal = metrics.completedChaptersCount;
        unlocked = metrics.overallCompletion >= 50;
      } else if (m.id === 'ms-class-11') {
        const class11Count = SYLLABUS_CHAPTERS.filter(c => c.classGrade === 11 && chapterProgress[c.id]?.completed).length;
        currentVal = class11Count;
        unlocked = class11Count >= 18;
      } else if (m.id === 'ms-pyq-cycle') {
        currentVal = metrics.totalPYQsAttempted;
        unlocked = currentVal >= 200;
      } else if (m.id === 'ms-syllabus-done') {
        currentVal = metrics.completedChaptersCount;
        unlocked = metrics.overallCompletion >= 100;
      } else if (m.id === 'ms-10-mocks') {
        currentVal = metrics.totalMocksCount;
        unlocked = currentVal >= 10;
      } else if (m.id === 'ms-advanced-mode') {
        currentVal = metrics.advancedModeCount;
        unlocked = currentVal >= 15;
      } else if (m.id === 'ms-jee-main') {
        currentVal = metrics.totalMocksCount >= 5 && metrics.pyqAccuracy >= 80 ? 1 : 0;
        unlocked = currentVal === 1;
      } else if (m.id === 'ms-jee-advanced') {
        currentVal = metrics.overallCompletion >= 95 && metrics.advancedModeCount >= 15 ? 1 : 0;
        unlocked = currentVal === 1;
      }

      return {
        ...m,
        progressValue: currentVal,
        unlocked,
      };
    });
  }, [metrics, chapterProgress]);

  return (
    <RoadmapContext.Provider
      value={{
        userProfile,
        chapterProgress,
        dailyMission,
        errorLog,
        mockAttempts,
        pyqItems,
        foundationChecklistState,
        milestones,
        revisionIntervals,
        activeTab,
        isWhereAmIOpen,
        isOnboardingOpen,
        selectedPhaseId,
        setActiveTab,
        setIsWhereAmIOpen,
        setIsOnboardingOpen,
        setSelectedPhaseId,
        updateUserProfile,
        toggleChapterStep,
        setChapterDifficulty,
        toggleFoundationItem,
        toggleDailyTask,
        addDailyTask,
        logStudySession,
        addErrorEntry,
        toggleErrorStatus,
        deleteErrorEntry,
        addMockAttempt,
        deleteMockAttempt,
        updatePYQStatus,
        addCustomPYQ,
        setRevisionIntervals,
        triggerConfetti,
        exportData,
        importData,
        resetToDemoData,
        metrics,
      }}
    >
      {children}
    </RoadmapContext.Provider>
  );
};

export const useRoadmap = () => {
  const context = useContext(RoadmapContext);
  if (!context) {
    throw new Error('useRoadmap must be used within a RoadmapProvider');
  }
  return context;
};
