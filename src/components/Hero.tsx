import React, { useState, useEffect } from 'react';
import { useRoadmap } from '../context/RoadmapContext';
import { ArrowRight, Compass, Target, Calendar, Clock, AlertCircle } from 'lucide-react';
import heroCampusImg from '../assets/images/hero_iit_path_1790602868684.jpg';

interface HeroProps {
  onStartJourney: () => void;
  onExploreRoadmap: () => void;
  onOpenWhereAmI: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartJourney, onExploreRoadmap, onOpenWhereAmI }) => {
  const { metrics, userProfile } = useRoadmap();
  const [imageError, setImageError] = useState(false);

  // Countdown timer to tentative JEE Main 2028 (approx Jan 24, 2028)
  const targetDate = new Date('2028-01-24T09:00:00');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-slate-800/80 bg-slate-950">
      {/* Background visual asset with measured scrim */}
      <div className="absolute inset-0 z-0">
        {!imageError ? (
          <img
            src={heroCampusImg}
            alt="Pathway to Indian Institute of Technology campus at twilight"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center opacity-30 scale-105 transform motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        )}
        {/* Measured dark scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/60" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 text-center">
        {/* Quiet, unboxed metadata */}
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400/90 mb-6 tracking-wider uppercase">
          <span>Target JEE Main & Advanced</span>
          <span aria-hidden="true">·</span>
          <span>Class of 2028</span>
          <span aria-hidden="true">·</span>
          <span>Tentative Exam Window</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.08] mb-4 text-balance">
          ROAD TO IIT <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">2028</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-2xl font-semibold text-slate-200 mb-4 max-w-2xl mx-auto">
          A 2-Year System for JEE Main + JEE Advanced
        </p>

        {/* Supporting Text */}
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed text-balance">
          “From your first chapter to the final paper — know what to study, when to study it, and how to measure your progress.”
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
          <button
            onClick={onStartJourney}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-lg hover:shadow-cyan-500/20 active:scale-[0.99]"
          >
            <span>START MY JOURNEY</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={onExploreRoadmap}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-xl transition-all active:scale-[0.99]"
          >
            <Compass className="h-4 w-4 text-cyan-400" />
            <span>EXPLORE ROADMAP</span>
          </button>

          <button
            onClick={onOpenWhereAmI}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-purple-300 bg-purple-950/40 hover:bg-purple-900/40 border border-purple-800/60 rounded-xl transition-all active:scale-[0.99]"
          >
            <Target className="h-4 w-4 text-purple-400" />
            <span>WHERE AM I NOW?</span>
          </button>
        </div>

        {/* Countdown to Expected JEE 2028 */}
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-6 backdrop-blur-sm shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3 mb-4 text-left">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <Calendar className="h-4 w-4 text-cyan-400" />
              <span>Tentative Countdown to JEE Main 2028 Session 1</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-amber-400/90">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>Dates subject to official NTA notifications</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            <div className="flex flex-col items-center justify-center rounded-xl bg-slate-950/60 p-2 sm:p-3 border border-slate-800">
              <span className="font-mono text-2xl sm:text-4xl font-bold text-white tabular-nums">
                {timeLeft.days}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1">Days</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl bg-slate-950/60 p-2 sm:p-3 border border-slate-800">
              <span className="font-mono text-2xl sm:text-4xl font-bold text-cyan-300 tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1">Hours</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl bg-slate-950/60 p-2 sm:p-3 border border-slate-800">
              <span className="font-mono text-2xl sm:text-4xl font-bold text-slate-200 tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1">Mins</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl bg-slate-950/60 p-2 sm:p-3 border border-slate-800">
              <span className="font-mono text-2xl sm:text-4xl font-bold text-slate-400 tabular-nums">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1">Secs</span>
            </div>
          </div>

          {/* Realistic disclaimer inline */}
          <p className="text-[11px] text-slate-500 mt-3 text-center sm:text-left">
            Expected JEE Main 2028: Late January 2028 · JEE Advanced 2028: Late May 2028. This system structures the complete 24 months preceding the exam.
          </p>
        </div>
      </div>
    </section>
  );
};
