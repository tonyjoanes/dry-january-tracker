import { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  beerPrice: number;
  startDate: Timestamp;
  createdAt: Timestamp;
  friendCode: string;
  privacy: {
    showOnLeaderboard: boolean;
    shareAchievements: boolean;
  };
}

export interface CheckIn {
  id: string;
  userId: string;
  date: Timestamp;
  dateString: string; // YYYY-MM-DD format
  status: 'success' | 'slip';
  mood: number; // 1-5
  moodEmoji: string;
  beersAvoided: number;
  notes?: string;
  createdAt: Timestamp;
}

export interface Achievement {
  id: string;
  userId: string;
  achievementType: string;
  achievementName: string;
  earnedAt: Timestamp;
  metadata?: Record<string, any>;
}

export interface Stats {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  totalDaysCompleted: number;
  totalBeersAvoided: number;
  totalMoneySaved: number;
  lastCheckInDate: Timestamp | null;
  lastUpdated: Timestamp;
}

export interface Friend {
  id: string;
  user1Id: string;
  user2Id: string;
  createdAt: Timestamp;
  status: 'pending' | 'accepted';
}

export const MOOD_EMOJIS = ['😔', '😐', '😊', '😤', '🎉'] as const;

export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'mood' | 'savings' | 'special';
  requirement: number | ((data: any) => boolean);
}
