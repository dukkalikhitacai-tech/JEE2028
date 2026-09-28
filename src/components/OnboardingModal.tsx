import React, { useState } from 'react';
import { useRoadmap } from '../context/RoadmapContext';
import { X, Check, ArrowRight, ArrowLeft, Sparkles, BookOpen, Clock, Target, Compass } from 'lucide-react';
import { UserProfile } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, onComplete }) => {
  const { userProfile, updateUserProfile, triggerConfetti } = useRoadmap();

  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const [formData, setFormData] = useState<UserProfile>({
    currentClass: userProfile.currentClass || '11',
    prepLevel: userProfile.prepLevel || 'basic',
    target: userProfile.target || 'both',
    dailyStudyTime: userProfile.dailyStudyTime || '5-7',
    learningStyle: userProfile.learningStyle || 'combo',
    strengths: {
      physics: userProfile.strengths?.physics || 'moderate',
      chemistry: userProfile.strengths?.chemistry || 'strong',
      mathematics: userProfile.strengths?.mathematics || 'moderate',
    },
    isOnboarded: true,
    startedAt: userProfile.startedAt || new Date().toISOString().split('T')[0],
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      updateUserProfile(formData);
      triggerConfetti();
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          aria-label="Close onboarding modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              Step {step} of {totalSteps}
            </span>
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i + 1 === step
                    ? 'w-6 bg-cyan-400'
                    : i + 1 < step
                    ? 'w-3 bg-cyan-700'
                    : 'w-3 bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[280px]">
          {step === 1 && (
            <div>
              <h2 id="onboarding-title" className="text-xl sm:text-2xl font-bold text-white mb-2">
                What is your current class?
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                This helps us calibrate the timeline between Class 11 foundation and Class 12 core preparation.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: '10', label: 'Class 10', desc: 'Starting early transition' },
                  { value: '11', label: 'Class 11', desc: 'Core 2-year cycle for 2028' },
                  { value: '12', label: 'Class 12', desc: 'High-speed comprehensive run' },
                  { value: 'dropper', label: 'Dropper / Repeater', desc: 'Full syllabus intensive' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, currentClass: opt.value as any })}
                    className={`flex flex-col text-left p-4 rounded-xl border transition-all ${
                      formData.currentClass === opt.value
                        ? 'border-cyan-500 bg-cyan-950/40 text-white shadow-sm ring-1 ring-cyan-500'
                        : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <span className="font-semibold text-sm">{opt.label}</span>
                    <span className="text-xs text-slate-400 mt-1">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                What is your current preparation level?
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Be completely honest with yourself. Ground zero is the standard starting line for champions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { value: 'zero', label: 'Starting from zero', desc: 'No prior JEE exposure, starting fresh' },
                  { value: 'basic', label: 'Basic', desc: 'School NCERT done, starting numericals' },
                  { value: 'intermediate', label: 'Intermediate', desc: 'Consistent coaching & standard PYQs' },
                  { value: 'advanced', label: 'Advanced', desc: 'Comfortable with multi-concept problems' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, prepLevel: opt.value as any })}
                    className={`flex flex-col text-left p-4 rounded-xl border transition-all ${
                      formData.prepLevel === opt.value
                        ? 'border-cyan-500 bg-cyan-950/40 text-white ring-1 ring-cyan-500'
                        : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <span className="font-semibold text-sm">{opt.label}</span>
                    <span className="text-xs text-slate-400 mt-1">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                What is your primary examination target?
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Your target determines whether the system prioritizes speed and formula recall or multi-stage analytical proofs.
              </p>
              <div className="space-y-3">
                {[
                  { value: 'both', label: 'Both (JEE Main + JEE Advanced)', desc: 'Recommended: Full 2-year system leading directly to IIT admission gateway' },
                  { value: 'advanced', label: 'JEE Advanced (IIT Target)', desc: 'Focus on multi-concept subjective proofs and deep Olympiad-grade problem sets' },
                  { value: 'main', label: 'JEE Main (NITs / IIITs)', desc: 'Focus on 100% syllabus breadth, speed solving, and NCERT line-by-line mastery' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, target: opt.value as any })}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                      formData.target === opt.value
                        ? 'border-cyan-500 bg-cyan-950/40 text-white ring-1 ring-cyan-500'
                        : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-sm block">{opt.label}</span>
                      <span className="text-xs text-slate-400">{opt.desc}</span>
                    </div>
                    {formData.target === opt.value && <Check className="h-5 w-5 text-cyan-400 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Daily available self-study time
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Excluding coaching/school hours. Focused deep work hours without mobile distractions.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: '2-3', label: '2–3 hours / day', desc: 'Consistent foundation pace' },
                  { value: '3-5', label: '3–5 hours / day', desc: 'Standard solid JEE trajectory' },
                  { value: '5-7', label: '5–7 hours / day', desc: 'Aggressive top-rank aspirant' },
                  { value: '7+', label: '7+ hours / day', desc: 'Full-time dedicated dropper / holiday' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, dailyStudyTime: opt.value as any })}
                    className={`flex flex-col text-left p-4 rounded-xl border transition-all ${
                      formData.dailyStudyTime === opt.value
                        ? 'border-cyan-500 bg-cyan-950/40 text-white ring-1 ring-cyan-500'
                        : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-semibold text-sm">{opt.label}</span>
                    <span className="text-xs text-slate-400 mt-1">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Preferred learning style
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                How do you grasp difficult analytical concepts most effectively?
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'video', label: 'Video Lectures', desc: 'Structured chalkboard explanations' },
                  { value: 'books', label: 'Standard Books', desc: 'Self-paced textbook reading (HCV/NCERT)' },
                  { value: 'notes', label: 'Class Notes', desc: 'Summarized hand-written revision notes' },
                  { value: 'combo', label: 'Combination (Recommended)', desc: 'Lecture + self-made notes + problem drill' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, learningStyle: opt.value as any })}
                    className={`flex flex-col text-left p-4 rounded-xl border transition-all ${
                      formData.learningStyle === opt.value
                        ? 'border-cyan-500 bg-cyan-950/40 text-white ring-1 ring-cyan-500'
                        : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-semibold text-sm">{opt.label}</span>
                    <span className="text-xs text-slate-400 mt-1">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Subject Strengths & Weaknesses
              </h2>
              <p className="text-sm text-slate-400 mb-5">
                Mark your current confidence in each subject to balance your daily mission targets.
              </p>
              <div className="space-y-4">
                {(['physics', 'chemistry', 'mathematics'] as const).map(subj => (
                  <div key={subj} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-sm font-semibold text-white capitalize">{subj}</span>
                    <div className="flex gap-1.5">
                      {(['weak', 'moderate', 'strong'] as const).map(level => {
                        const isSelected = formData.strengths[subj] === level;
                        return (
                          <button
                            key={level}
                            type="button"
                            onClick={() => setFormData({
                              ...formData,
                              strengths: { ...formData.strengths, [subj]: level }
                            })}
                            className={`px-3 py-1 text-xs font-medium rounded-lg capitalize transition-colors ${
                              isSelected
                                ? level === 'strong'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                                  : level === 'moderate'
                                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                                  : 'bg-rose-950 text-rose-300 border border-rose-700'
                                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
                            }`}
                          >
                            {level}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md active:scale-95"
          >
            <span>{step === totalSteps ? 'Generate My Dashboard' : 'Next Question'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
