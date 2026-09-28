/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RoadmapProvider, useRoadmap } from './context/RoadmapContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StopCollectingBanner } from './components/StopCollectingBanner';
import { RoadmapTimeline } from './components/RoadmapTimeline';
import { Final100Days } from './components/Final100Days';
import { MainToAdvancedTransition } from './components/MainToAdvancedTransition';
import { SyllabusExplorer } from './components/SyllabusExplorer';
import { DailyMission } from './components/DailyMission';
import { WeeklyReset } from './components/WeeklyReset';
import { ErrorBook } from './components/ErrorBook';
import { RevisionSystem } from './components/RevisionSystem';
import { PYQArena } from './components/PYQArena';
import { MockTestArena } from './components/MockTestArena';
import { ResourceHub } from './components/ResourceHub';
import { ProgressDashboard } from './components/ProgressDashboard';
import { MilestoneWall } from './components/MilestoneWall';
import { OfficialUpdatesSection } from './components/OfficialUpdatesSection';
import { Footer } from './components/Footer';
import { OnboardingModal } from './components/OnboardingModal';
import { WhereAmIModal } from './components/WhereAmIModal';

const AppContent: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    isOnboardingOpen, 
    setIsOnboardingOpen, 
    isWhereAmIOpen, 
    setIsWhereAmIOpen,
    setSelectedPhaseId 
  } = useRoadmap();

  const handleStartJourney = () => {
    setIsOnboardingOpen(true);
  };

  const handleExploreRoadmap = () => {
    setActiveTab('roadmap');
    const el = document.getElementById('roadmap-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJumpToPhase = (phaseId: string) => {
    setActiveTab('roadmap');
    setSelectedPhaseId(phaseId);
    setTimeout(() => {
      const el = document.getElementById('roadmap-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Top Bar Contract Compliant Navigation */}
      <Navbar
        onOpenWhereAmI={() => setIsWhereAmIOpen(true)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {activeTab === 'roadmap' && (
          <div>
            <Hero
              onStartJourney={handleStartJourney}
              onExploreRoadmap={handleExploreRoadmap}
              onOpenWhereAmI={() => setIsWhereAmIOpen(true)}
            />
            <StopCollectingBanner />
            <RoadmapTimeline
              onNavigateToSubjects={(grade) => {
                setActiveTab('subjects');
              }}
              onNavigateToPYQs={() => setActiveTab('pyqs')}
              onNavigateToTests={() => setActiveTab('tests')}
            />
            <Final100Days />
            <MainToAdvancedTransition />
            <OfficialUpdatesSection />
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
            <ProgressDashboard
              onNavigateToSubjects={() => setActiveTab('subjects')}
              onNavigateToPYQs={() => setActiveTab('pyqs')}
              onNavigateToTests={() => setActiveTab('tests')}
              onNavigateToMilestones={() => setActiveTab('milestones')}
            />
            <DailyMission />
            <WeeklyReset />
          </div>
        )}

        {activeTab === 'subjects' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <SyllabusExplorer />
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <ResourceHub />
          </div>
        )}

        {activeTab === 'pyqs' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <PYQArena />
          </div>
        )}

        {activeTab === 'tests' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <MockTestArena />
          </div>
        )}

        {activeTab === 'revision' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <RevisionSystem />
          </div>
        )}

        {activeTab === 'errors' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <ErrorBook />
          </div>
        )}

        {activeTab === 'milestones' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <MilestoneWall />
          </div>
        )}
      </main>

      {/* Global Modals */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={() => {
          setIsOnboardingOpen(false);
          setActiveTab('dashboard');
        }}
      />

      <WhereAmIModal
        isOpen={isWhereAmIOpen}
        onClose={() => setIsWhereAmIOpen(false)}
        onNavigateToRoadmap={handleJumpToPhase}
      />

      {/* Footer */}
      <Footer onNavigateTab={(tab) => setActiveTab(tab)} />
    </div>
  );
};

export default function App() {
  return (
    <RoadmapProvider>
      <AppContent />
    </RoadmapProvider>
  );
}
