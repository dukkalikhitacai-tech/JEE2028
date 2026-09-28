import React, { useState } from 'react';
import { useRoadmap } from '../context/RoadmapContext';
import { 
  Flame, 
  Compass, 
  LayoutDashboard, 
  BookOpen, 
  Library, 
  HelpCircle, 
  ClipboardCheck, 
  RotateCcw, 
  AlertTriangle, 
  Trophy, 
  ChevronRight,
  Menu,
  X,
  Target
} from 'lucide-react';

interface NavbarProps {
  onOpenWhereAmI: () => void;
  onOpenOnboarding: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWhereAmI, onOpenOnboarding }) => {
  const { activeTab, setActiveTab, metrics, userProfile } = useRoadmap();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'roadmap', label: 'Roadmap', icon: Compass },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'subjects', label: 'Syllabus', icon: BookOpen },
    { id: 'resources', label: 'Resources', icon: Library },
    { id: 'pyqs', label: 'PYQ Era', icon: HelpCircle },
    { id: 'tests', label: 'Mock Arena', icon: ClipboardCheck },
    { id: 'revision', label: 'Revision', icon: RotateCcw },
    { id: 'errors', label: 'Error Log', icon: AlertTriangle },
    { id: 'milestones', label: 'Milestones', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand title, single line */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('roadmap')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-black text-base shadow-sm group-hover:scale-105 transition-transform">
              IIT
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-white text-base leading-none">
                ROAD TO IIT
              </span>
              <span className="text-[10px] text-cyan-400 font-mono tracking-wider leading-tight">
                JEE 2028 SYSTEM
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Medium screens secondary nav dropdown or compact tabs */}
        <div className="hidden lg:flex xl:hidden items-center gap-1">
          {navItems.slice(0, 5).map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === item.id ? 'text-cyan-400 bg-cyan-950/50' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
          <select 
            value={activeTab} 
            onChange={(e) => setActiveTab(e.target.value)}
            className="text-xs bg-slate-900 text-slate-300 border border-slate-700 rounded px-2 py-1 focus:outline-none"
          >
            <option value="" disabled>More...</option>
            {navItems.slice(5).map(item => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </div>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          {/* Quick diagnostic button */}
          <button
            onClick={onOpenWhereAmI}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-700/60 rounded-lg hover:bg-cyan-900/50 transition-colors whitespace-nowrap shadow-sm"
          >
            <Target className="h-3.5 w-3.5 text-cyan-400" />
            <span>Where Am I?</span>
          </button>

          {/* Streak indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-amber-300 bg-amber-950/40 border border-amber-800/40 rounded-lg whitespace-nowrap">
            <Flame className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span className="font-mono tabular-nums">{metrics.currentStreak}d</span>
          </div>

          {/* Progress pill button */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg shadow-sm transition-all whitespace-nowrap"
          >
            <span>{metrics.overallCompletion}% Done</span>
            <ChevronRight className="h-3 w-3" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => {
                onOpenWhereAmI();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-800 rounded-lg"
            >
              <Target className="h-4 w-4" />
              <span>Where Am I?</span>
            </button>
            <button
              onClick={() => {
                onOpenOnboarding();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-700 rounded-lg"
            >
              <span>Reconfigure Plan</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
