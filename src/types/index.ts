export type SubjectId = 'physics' | 'chemistry' | 'mathematics';

export type ExamTarget = 'main' | 'advanced' | 'both';

export type DifficultyLevel = 'foundation' | 'main' | 'advanced' | 'challenge';

export interface Chapter {
  id: string;
  title: string;
  subject: SubjectId;
  classGrade: 11 | 12;
  category: string;
  weightage: 'High' | 'Very High' | 'Medium';
  estimatedHours: number;
  subtopics: string[];
  officialSyllabusTag: string;
}

export interface ChapterProgress {
  id: string;
  learn: boolean;
  practice: boolean;
  pyqs: boolean;
  revise: boolean;
  test: boolean;
  completed: boolean;
  difficultyLevel: DifficultyLevel;
  lastStudiedDate?: string;
  notes?: string;
  revisionCount: number;
}

export interface UserProfile {
  currentClass: '10' | '11' | '12' | 'dropper';
  prepLevel: 'zero' | 'basic' | 'intermediate' | 'advanced';
  target: ExamTarget;
  dailyStudyTime: '2-3' | '3-5' | '5-7' | '7+';
  learningStyle: 'video' | 'books' | 'notes' | 'combo';
  strengths: {
    physics: 'strong' | 'moderate' | 'weak';
    chemistry: 'strong' | 'moderate' | 'weak';
    mathematics: 'strong' | 'moderate' | 'weak';
  };
  isOnboarded: boolean;
  startedAt: string;
}

export interface DailyTask {
  id: string;
  title: string;
  subject: SubjectId | 'general';
  targetMinutes: number;
  completedMinutes: number;
  isCompleted: boolean;
  category: 'lecture' | 'practice' | 'pyq' | 'revision' | 'test';
}

export interface DailyMissionState {
  date: string;
  streakCount: number;
  lastStreakDate: string;
  questionsSolvedToday: number;
  questionsCorrectToday: number;
  tasks: DailyTask[];
  notes: string;
}

export type MistakeType = 
  | 'concept' 
  | 'calculation' 
  | 'formula' 
  | 'misread' 
  | 'time' 
  | 'guessing';

export interface ErrorEntry {
  id: string;
  questionTitle: string;
  subject: SubjectId;
  chapterTitle: string;
  mistakeDescription: string;
  correctApproach: string;
  conceptInvolved: string;
  mistakeType: MistakeType;
  dateAdded: string;
  reattemptDate: string;
  status: 'pending' | 'resolved';
}

export interface MockAttempt {
  id: string;
  testName: string;
  testType: 'Full Syllabus JEE Main' | 'JEE Advanced Paper 1' | 'JEE Advanced Paper 2' | 'Part Test';
  date: string;
  durationMinutes: number;
  physicsScore: number;
  chemistryScore: number;
  mathScore: number;
  totalScore: number;
  maxScore: number;
  accuracyPercent: number;
  attemptedCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  analysisNotes: string;
}

export interface PYQItem {
  id: string;
  subject: SubjectId;
  chapterTitle: string;
  exam: 'JEE Main' | 'JEE Advanced';
  year: number;
  difficulty: 'easy' | 'medium' | 'hard';
  questionSummary: string;
  status: 'unattempted' | 'correct' | 'incorrect' | 'reattempt';
  timeTakenSec: number;
  userNote?: string;
}

export interface ResourceItem {
  id: string;
  name: string;
  subject: SubjectId;
  category: 'Lectures' | 'Notes' | 'Books' | 'PYQs' | 'Practice' | 'Mock Tests';
  difficulty: 'Foundation' | 'JEE Main' | 'JEE Advanced' | 'All Levels';
  isPaid: boolean;
  recommendedStage: string;
  description: string;
  verifiedUrl: string;
  recommendedRole: string;
}

export interface BookRecommendation {
  id: string;
  title: string;
  author: string;
  subject: SubjectId;
  category: 'NCERT / Foundation' | 'JEE Main Practice' | 'JEE Advanced Practice' | 'PYQ Books' | 'Reference Books';
  difficulty: 'Foundation' | 'JEE Main' | 'JEE Advanced' | 'Mastery';
  recommendedStage: string;
  purpose: 'Concept building' | 'Problem solving' | 'Advanced problem solving' | 'PYQ practice' | 'Revision';
  ruleAdvice: string;
}

export interface YouTubeRecommendation {
  id: string;
  channelName: string;
  teacherName: string;
  subject: SubjectId;
  level: 'Foundation' | 'JEE Main' | 'JEE Advanced' | 'Revision';
  recommendedFor: string;
  playlistDescription: string;
  verifiedLink: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: string;
  phase: string;
  unlocked: boolean;
  unlockedAt?: string;
  progressValue: number;
  targetValue: number;
  metricLabel: string;
}
