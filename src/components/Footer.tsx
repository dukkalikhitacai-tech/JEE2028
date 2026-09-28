import React, { useRef, useState } from 'react';
import { useRoadmap } from '../context/RoadmapContext';
import { MANDATORY_LEGAL_DISCLAIMER } from '../data/officialUpdatesData';
import { Download, Upload, RotateCcw, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  const { exportData, importData, resetToDemoData, triggerConfetti } = useRoadmap();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleDownloadBackup = () => {
    const jsonStr = exportData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `road_to_iit_2028_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    triggerConfetti();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importData(content);
      if (success) {
        setImportStatus('Backup restored successfully!');
        triggerConfetti();
        setTimeout(() => setImportStatus(null), 4000);
      } else {
        setImportStatus('Failed to parse backup file. Please check JSON format.');
        setTimeout(() => setImportStatus(null), 4000);
      }
    };
    reader.readAsText(file);
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Core Taglines */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-black text-xs">
                IIT
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                Road to IIT 2028
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-200">
              “Plan the journey. Do the work. Track the progress.”
            </p>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed italic">
              “You don't need to see the entire staircase. You just need to know the next step.”
            </p>

            {/* Backup & Data Sovereignty Controls */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                onClick={handleDownloadBackup}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                title="Export complete progress data as JSON file"
              >
                <Download className="h-3.5 w-3.5 text-cyan-400" />
                <span>Export Progress</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                title="Restore from JSON file"
              >
                <Upload className="h-3.5 w-3.5 text-blue-400" />
                <span>Import Progress</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />

              <button
                onClick={() => {
                  if (window.confirm('Reset all progress to default sample data?')) {
                    resetToDemoData();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-slate-700 transition-colors"
                title="Reset local storage"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Demo</span>
              </button>
            </div>

            {importStatus && (
              <span className="text-[11px] text-cyan-400 font-mono block">
                {importStatus}
              </span>
            )}
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <span className="font-bold text-white text-xs uppercase tracking-wider block mb-2 font-mono">
              Roadmap Navigation
            </span>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onNavigateTab('roadmap')} className="hover:text-cyan-400 transition-colors">
                  The JEE 2028 Journey
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('dashboard')} className="hover:text-cyan-400 transition-colors">
                  Progress Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('subjects')} className="hover:text-cyan-400 transition-colors">
                  Syllabus Explorer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('pyqs')} className="hover:text-cyan-400 transition-colors">
                  PYQ Era Matrix
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('tests')} className="hover:text-cyan-400 transition-colors">
                  Mock Test Arena
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('revision')} className="hover:text-cyan-400 transition-colors">
                  Spaced Revision
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Portals */}
          <div className="space-y-2">
            <span className="font-bold text-white text-xs uppercase tracking-wider block mb-2 font-mono">
              Official Portals
            </span>
            <ul className="space-y-1.5">
              <li>
                <a href="https://jeemain.nta.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                  NTA JEE Main Official
                </a>
              </li>
              <li>
                <a href="https://jeeadv.ac.in" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                  JEE Advanced Official
                </a>
              </li>
              <li>
                <a href="https://nta.ac.in" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                  National Testing Agency
                </a>
              </li>
              <li>
                <a href="https://josaa.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                  JoSAA Counselling Authority
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Independent Disclaimers */}
        <div className="pt-8 border-t border-slate-800 space-y-3 text-[11px] text-slate-500">
          <p className="leading-relaxed">
            {MANDATORY_LEGAL_DISCLAIMER.general}
          </p>
          <p className="leading-relaxed">
            {MANDATORY_LEGAL_DISCLAIMER.educational}
          </p>
          <p className="leading-relaxed">
            {MANDATORY_LEGAL_DISCLAIMER.independent}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-900 text-slate-600 font-mono">
            <span>© 2026-2028 Road to IIT. All rights reserved.</span>
            <span>Independent Academic Preparation Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
