import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import HeroStats from './HeroStats';
import CalendarView from './CalendarView';
import CostCalculator from './CostCalculator';
import MoodChart from './MoodChart';
import CheckInButton from '../checkin/CheckInButton';
import { getStats } from '../../services/stats';
import type { Stats } from '../../types';

const Dashboard: React.FC = () => {
  const { currentUser, userData } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      loadStats();
    }
  }, [currentUser]);

  const loadStats = async () => {
    if (!currentUser) return;

    setLoading(true);
    setError(null);

    try {
      let statsData = await getStats(currentUser.uid);

      // If stats don't exist, create default stats
      if (!statsData) {
        statsData = {
          userId: currentUser.uid,
          currentStreak: 0,
          longestStreak: 0,
          totalDaysCompleted: 0,
          totalBeersAvoided: 0,
          totalMoneySaved: 0,
          lastCheckInDate: null,
          lastUpdated: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
        };
      }

      setStats(statsData);
    } catch (err: any) {
      console.error('Error loading stats:', err);
      setError(err.message || 'Failed to load stats');

      // Set default stats on error so the page can still load
      setStats({
        userId: currentUser.uid,
        currentStreak: 0,
        longestStreak: 0,
        totalDaysCompleted: 0,
        totalBeersAvoided: 0,
        totalMoneySaved: 0,
        lastCheckInDate: null,
        lastUpdated: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckInSuccess = () => {
    loadStats(); // Refresh stats after check-in
  };

  if (loading || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load dashboard</p>
          <button onClick={loadStats} className="px-4 py-2 bg-primary text-white rounded">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
            <p className="text-amber-800">
              <strong>Note:</strong> Some features may not work properly. Firebase indexes are still building.
              This usually takes 1-2 minutes. Try refreshing in a moment.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {userData.displayName}! 👋
          </h1>
          <p className="text-gray-600">
            Keep up the great work on your Dry January journey!
          </p>
        </div>

        {/* Check-in Button */}
        <div className="mb-8">
          <CheckInButton
            userId={currentUser!.uid}
            beerPrice={userData.beerPrice}
            onSuccess={handleCheckInSuccess}
          />
        </div>

        {/* Hero Stats */}
        <div className="mb-8">
          <HeroStats stats={stats} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Calendar - Takes 2 columns */}
          <div className="lg:col-span-2">
            <CalendarView userId={currentUser!.uid} />
          </div>

          {/* Cost Calculator - Takes 1 column */}
          <div className="lg:col-span-1">
            <CostCalculator stats={stats} beerPrice={userData.beerPrice} />
          </div>
        </div>

        {/* Mood Chart */}
        <div>
          <MoodChart userId={currentUser!.uid} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
