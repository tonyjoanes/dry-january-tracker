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

  useEffect(() => {
    if (currentUser) {
      loadStats();
    }
  }, [currentUser]);

  const loadStats = async () => {
    if (!currentUser) return;

    setLoading(true);
    const statsData = await getStats(currentUser.uid);
    setStats(statsData);
    setLoading(false);
  };

  const handleCheckInSuccess = () => {
    loadStats(); // Refresh stats after check-in
  };

  if (loading || !userData || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
