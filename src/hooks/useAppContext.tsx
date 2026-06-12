import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { db } from '../data/db';
import { User, Module, Progress, Badge, UserBadge, DailyMission } from '../types';

interface AppState {
  user: User | null;
  modules: Module[];
  progress: Progress[];
  badges: Badge[];
  userBadges: UserBadge[];
  dailyMissions: DailyMission[];
  currentView: 'dashboard' | 'courses' | 'module' | 'leaderboard' | 'profile';
  activeModuleId: string | null;
  refreshDb: () => void;
  navigate: (view: 'dashboard' | 'courses' | 'module' | 'leaderboard' | 'profile', moduleId?: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
  const [dailyMissions, setDailyMissions] = useState<DailyMission[]>([]);
  const [currentView, setCurrentView] = useState<AppState['currentView']>('dashboard');
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  const refreshDb = () => {
    db.init(); // ensure init
    setUser(db.getUser('u1') || null);
    setModules(db.getModules());
    setProgress(db.getUserProgress('u1'));
    setBadges(db.getBadges());
    setUserBadges(db.getUserBadges('u1'));
    setDailyMissions(db.getDailyMissions());
  };

  useEffect(() => {
    refreshDb();
  }, []);

  const navigate = (view: AppState['currentView'], moduleId?: string) => {
    setCurrentView(view);
    if (moduleId) {
      setActiveModuleId(moduleId);
    }
  };

  return (
    <AppContext.Provider value={{
      user, modules, progress, badges, userBadges, dailyMissions,
      currentView, activeModuleId, refreshDb, navigate
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
