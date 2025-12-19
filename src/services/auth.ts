import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import type { User } from '../types';

const googleProvider = new GoogleAuthProvider();

// Generate a cryptographically secure unique 6-character friend code
export const generateFriendCode = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const array = new Uint32Array(6);
  crypto.getRandomValues(array);

  let code = '';
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(array[i] % characters.length);
  }
  return code;
};

export const signUp = async (
  email: string,
  password: string,
  displayName: string,
  beerPrice: number,
  startDate: Date
): Promise<FirebaseUser> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Create user document in Firestore
  const userData: Omit<User, 'uid'> = {
    displayName,
    email: user.email!,
    beerPrice,
    startDate: Timestamp.fromDate(startDate),
    createdAt: Timestamp.now(),
    friendCode: generateFriendCode(),
    privacy: {
      showOnLeaderboard: true,
      shareAchievements: true,
    },
  };

  await setDoc(doc(db, 'users', user.uid), userData);

  // Initialize stats document
  await setDoc(doc(db, 'stats', user.uid), {
    userId: user.uid,
    currentStreak: 0,
    longestStreak: 0,
    totalDaysCompleted: 0,
    totalBeersAvoided: 0,
    totalMoneySaved: 0,
    lastCheckInDate: null,
    lastUpdated: Timestamp.now(),
  });

  return user;
};

export const signIn = async (email: string, password: string): Promise<FirebaseUser> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const signInWithGoogle = async (): Promise<FirebaseUser> => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  const user = userCredential.user;

  // Check if user document exists
  const userDoc = await getDoc(doc(db, 'users', user.uid));

  if (!userDoc.exists()) {
    // New user, create profile with defaults
    const userData: Omit<User, 'uid'> = {
      displayName: user.displayName || 'Anonymous',
      email: user.email!,
      photoURL: user.photoURL || undefined,
      beerPrice: 5, // Default value
      startDate: Timestamp.fromDate(new Date(new Date().getFullYear(), 0, 1)), // Jan 1
      createdAt: Timestamp.now(),
      friendCode: generateFriendCode(),
      privacy: {
        showOnLeaderboard: true,
        shareAchievements: true,
      },
    };

    await setDoc(doc(db, 'users', user.uid), userData);

    // Initialize stats
    await setDoc(doc(db, 'stats', user.uid), {
      userId: user.uid,
      currentStreak: 0,
      longestStreak: 0,
      totalDaysCompleted: 0,
      totalBeersAvoided: 0,
      totalMoneySaved: 0,
      lastCheckInDate: null,
      lastUpdated: Timestamp.now(),
    });
  }

  return user;
};

export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

export const resetPassword = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

export const getUserData = async (uid: string): Promise<User | null> => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    return { uid, ...userDoc.data() } as User;
  }
  return null;
};
