import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import type { Stats } from '../types';
import { getAllCheckIns } from './checkIns';
import { differenceInDays } from 'date-fns';

export const calculateStats = async (userId: string, beerPrice: number): Promise<Stats> => {
  const checkIns = await getAllCheckIns(userId);

  if (checkIns.length === 0) {
    return {
      userId,
      currentStreak: 0,
      longestStreak: 0,
      totalDaysCompleted: 0,
      totalBeersAvoided: 0,
      totalMoneySaved: 0,
      lastCheckInDate: null,
      lastUpdated: Timestamp.now(),
    };
  }

  // Sort by date ascending
  const sortedCheckIns = [...checkIns].sort(
    (a, b) => a.date.toMillis() - b.date.toMillis()
  );

  // Calculate streaks
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let previousDate: Date | null = null;

  for (const checkIn of sortedCheckIns) {
    const checkInDate = checkIn.date.toDate();

    if (checkIn.status === 'success') {
      if (previousDate === null) {
        tempStreak = 1;
      } else {
        const daysDiff = differenceInDays(checkInDate, previousDate);
        if (daysDiff === 1) {
          tempStreak++;
        } else {
          tempStreak = 1;
        }
      }

      longestStreak = Math.max(longestStreak, tempStreak);
      previousDate = checkInDate;
    } else {
      // Slip - reset streak
      tempStreak = 0;
      previousDate = checkInDate;
    }
  }

  // Check if current streak is still active
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastCheckIn = sortedCheckIns[sortedCheckIns.length - 1];
  const lastDate = lastCheckIn.date.toDate();
  const daysSinceLastCheckIn = differenceInDays(today, lastDate);

  if (daysSinceLastCheckIn <= 1 && lastCheckIn.status === 'success') {
    currentStreak = tempStreak;
  } else {
    currentStreak = 0;
  }

  // Calculate totals
  const successCheckIns = checkIns.filter((c) => c.status === 'success');
  const totalDaysCompleted = successCheckIns.length;
  const totalBeersAvoided = checkIns.reduce((sum, c) => sum + c.beersAvoided, 0);
  const totalMoneySaved = totalBeersAvoided * beerPrice;

  const stats: Stats = {
    userId,
    currentStreak,
    longestStreak,
    totalDaysCompleted,
    totalBeersAvoided,
    totalMoneySaved,
    lastCheckInDate: lastCheckIn.date,
    lastUpdated: Timestamp.now(),
  };

  // Update Firestore
  await setDoc(doc(db, 'stats', userId), stats);

  return stats;
};

export const getStats = async (userId: string): Promise<Stats | null> => {
  const statsDoc = await getDoc(doc(db, 'stats', userId));
  if (statsDoc.exists()) {
    return statsDoc.data() as Stats;
  }
  return null;
};

export const updateStatsAfterCheckIn = async (
  userId: string,
  beerPrice: number
): Promise<Stats> => {
  return await calculateStats(userId, beerPrice);
};
