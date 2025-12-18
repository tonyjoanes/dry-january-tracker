import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { CheckIn } from '../types';
import { format } from 'date-fns';

export interface CheckInData {
  status: 'success' | 'slip';
  mood: number;
  moodEmoji: string;
  beersAvoided: number;
  notes?: string;
}

export const submitCheckIn = async (userId: string, data: CheckInData): Promise<string> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateString = format(today, 'yyyy-MM-dd');

  // Check if already checked in today
  const existing = await getCheckInForDate(userId, today);
  if (existing) {
    throw new Error('Already checked in today');
  }

  const checkInData = {
    userId,
    date: Timestamp.fromDate(today),
    dateString,
    status: data.status,
    mood: data.mood,
    moodEmoji: data.moodEmoji,
    beersAvoided: data.beersAvoided,
    notes: data.notes || '',
    createdAt: Timestamp.now(),
  };

  const docRef = await addDoc(collection(db, 'checkIns'), checkInData);

  return docRef.id;
};

export const getCheckInForDate = async (
  userId: string,
  date: Date
): Promise<CheckIn | null> => {
  const dateString = format(date, 'yyyy-MM-dd');

  const q = query(
    collection(db, 'checkIns'),
    where('userId', '==', userId),
    where('dateString', '==', dateString)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const doc = querySnapshot.docs[0];
  return { id: doc.id, ...doc.data() } as CheckIn;
};

export const getCheckInsForMonth = async (
  userId: string,
  year: number,
  month: number
): Promise<CheckIn[]> => {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  const q = query(
    collection(db, 'checkIns'),
    where('userId', '==', userId),
    where('date', '>=', Timestamp.fromDate(startDate)),
    where('date', '<=', Timestamp.fromDate(endDate)),
    orderBy('date', 'asc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CheckIn[];
};

export const getAllCheckIns = async (userId: string): Promise<CheckIn[]> => {
  const q = query(
    collection(db, 'checkIns'),
    where('userId', '==', userId),
    orderBy('date', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CheckIn[];
};

export const canCheckInToday = async (userId: string): Promise<boolean> => {
  const today = new Date();
  const existing = await getCheckInForDate(userId, today);
  return !existing;
};
