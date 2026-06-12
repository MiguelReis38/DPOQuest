export interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  department: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  xpReward: number;
  videoUrl: string;
  content: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Progress {
  userId: string;
  moduleId: string;
  status: 'locked' | 'available' | 'completed';
  score?: number;
}

export interface ResponseRecord {
  id: string;
  userId: string;
  moduleId: string;
  questionId: string;
  selectedOptionIndex: number;
  isCorrect: boolean;
  timestamp: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
}

export interface UserBadge {
  userId: string;
  badgeId: string;
  earnedAt: string;
}

export interface DailyMission {
  id: string;
  title: string;
  xpReward: number;
  progress: number;
  total: number;
}
