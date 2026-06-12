/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useAppContext } from './hooks/useAppContext';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Courses } from './components/Courses';
import { ModuleView } from './components/ModuleView';
import { Leaderboard } from './components/Leaderboard';
import { Profile } from './components/Profile';

const AppContent = () => {
  const { currentView } = useAppContext();

  return (
    <Layout>
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'courses' && <Courses />}
      {currentView === 'module' && <ModuleView />}
      {currentView === 'leaderboard' && <Leaderboard />}
      {currentView === 'profile' && <Profile />}
    </Layout>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
