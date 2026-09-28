import React, { useState } from 'react';
import { 
  BOOKS_DATA, 
  YOUTUBE_CHANNELS, 
  GENERAL_RESOURCES, 
  RESOURCE_DISCLAIMER, 
  GOLDEN_BOOK_RULE 
} from '../data/resourcesData';
import { SubjectId } from '../types';
import { 
  BookOpen, 
  Youtube, 
  ExternalLink, 
  ShieldCheck, 
  Library, 
  Check, 
  AlertCircle,
  Award,
  Sparkles
} from 'lucide-react';

export const ResourceHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'books' | 'youtube' | 'curated'>('books');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [selectedBookCategory, setSelectedBookCategory] = useState<string>('all');

  const filteredBooks = BOOKS_DATA.filter(b => {
    if (selectedSubject !== 'all' && b.subject !== selectedSubject) return false;
    if (selectedBookCategory !== 'all' && b.category !== selectedBookCategory) return false;
    return true;
  });

  const filteredYouTube = YOUTUBE_CHANNELS.filter(y => {
    if (selectedSubject !== 'all' && y.subject !== selectedSubject) return false;
    return true;
  });

  const filteredCurated = GENERAL_RESOURCES.filter(r => {
    if (selectedSubject !== 'all' && r.subject !== selectedSubject) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            <Library className="h-4 w-4" />
            <span>Curated Arsenal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            RESOURCE ARCHIVE & BOOK VAULT
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Only battle-tested, verified reference materials and pedagogical channels. No fabricated links or unverified courses.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('books')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'books'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Book Library
          </button>
          <button
            onClick={() => setActiveTab('youtube')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'youtube'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            YouTube Hub
          </button>
          <button
            onClick={() => setActiveTab('curated')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'curated'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Official Portals
          </button>
        </div>
      </div>

      {/* Mandatory Resource Disclaimer Box */}
      <div className="p-4 rounded-xl border border-amber-800/40 bg-amber-950/20 text-xs text-amber-200/90 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300 font-semibold block mb-0.5">
            Resource Discipline Disclaimer
          </strong>
          <span>{RESOURCE_DISCLAIMER}</span>
        </div>
      </div>

      {/* Golden Book Rule Banner (for Books Tab) */}
      {activeTab === 'books' && (
        <div className="p-4 rounded-xl border border-cyan-800/40 bg-cyan-950/20 flex items-center justify-between gap-4 text-xs">
          <span className="font-mono text-cyan-300 font-bold uppercase tracking-wider">
            {GOLDEN_BOOK_RULE}
          </span>
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            Finish all solved illustrations before moving to back exercises.
          </span>
        </div>
      )}

      {/* Subject Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 font-mono">Subject:</span>
          {(['all', 'physics', 'chemistry', 'mathematics'] as const).map(subj => (
            <button
              key={subj}
              onClick={() => setSelectedSubject(subj)}
              className={`px-3 py-1 rounded-lg capitalize transition-colors font-medium ${
                selectedSubject === subj
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {subj}
            </button>
          ))}
        </div>

        {activeTab === 'books' && (
          <select
            value={selectedBookCategory}
            onChange={(e) => setSelectedBookCategory(e.target.value)}
            className="bg-slate-950 text-slate-300 border border-slate-800 rounded-lg px-2.5 py-1 focus:outline-none"
          >
            <option value="all">All Book Categories</option>
            <option value="NCERT / Foundation">NCERT / Foundation</option>
            <option value="JEE Main Practice">JEE Main Practice</option>
            <option value="JEE Advanced Practice">JEE Advanced Practice</option>
            <option value="PYQ Books">PYQ Books</option>
            <option value="Reference Books">Reference Books</option>
          </select>
        )}
      </div>

      {/* TAB 1: Books */}
      {activeTab === 'books' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBooks.map(book => (
            <div
              key={book.id}
              className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 font-mono mb-2">
                  <span className="capitalize text-cyan-400 font-bold">{book.subject}</span>
                  <span>·</span>
                  <span>{book.category}</span>
                  <span>·</span>
                  <span className="text-slate-300 font-semibold">{book.difficulty}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {book.title}
                </h3>
                <span className="text-xs text-slate-400 block mb-3">
                  Author: <strong className="text-slate-300">{book.author}</strong>
                </span>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">Purpose & Stage</span>
                    <span className="text-cyan-300 font-semibold">{book.purpose}</span>
                    <span className="text-slate-400 text-[11px] block mt-0.5">{book.recommendedStage}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300 italic">
                    “{book.ruleAdvice}”
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: YouTube Channels */}
      {activeTab === 'youtube' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredYouTube.map(yt => (
            <div
              key={yt.id}
              className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-2">
                  <div className="flex items-center gap-2">
                    <Youtube className="h-4 w-4 text-rose-500" />
                    <span className="capitalize text-cyan-400 font-bold">{yt.subject}</span>
                    <span>·</span>
                    <span>{yt.level}</span>
                  </div>
                  <a
                    href={yt.verifiedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-slate-400 hover:text-white"
                  >
                    <span>Visit Channel</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {yt.channelName}
                </h3>
                <span className="text-xs text-slate-400 block mb-3">
                  Educator: <strong className="text-slate-300">{yt.teacherName}</strong>
                </span>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">Recommended For</span>
                    <p className="text-slate-300">{yt.recommendedFor}</p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {yt.playlistDescription}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Curated Official Portals */}
      {activeTab === 'curated' && (
        <div className="space-y-3">
          {filteredCurated.map(res => (
            <div
              key={res.id}
              className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <span className="capitalize text-cyan-400">{res.category}</span>
                  <span>·</span>
                  <span className="text-emerald-400 font-semibold">{res.isPaid ? 'Paid' : 'Free / Public'}</span>
                  <span>·</span>
                  <span>{res.recommendedStage}</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  {res.name}
                </h3>
                <p className="text-xs text-slate-300">
                  {res.description}
                </p>
                <span className="text-[11px] text-slate-500 font-mono block">
                  Recommended Role: {res.recommendedRole}
                </span>
              </div>

              <a
                href={res.verifiedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors shrink-0 self-start sm:self-auto"
              >
                <span>Official Link</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
