import React from 'react';
import { Flame, Trophy, Calendar, DollarSign } from 'lucide-react';
import Card from '../shared/Card';
import type { Stats } from '../../types';

interface HeroStatsProps {
  stats: Stats;
}

const HeroStats: React.FC<HeroStatsProps> = ({ stats }) => {
  const statCards = [
    {
      icon: Flame,
      label: 'Current Streak',
      value: stats.currentStreak,
      unit: 'days',
      color: 'text-achievement',
      bgColor: 'bg-amber-50',
    },
    {
      icon: Trophy,
      label: 'Longest Streak',
      value: stats.longestStreak,
      unit: 'days',
      color: 'text-primary',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Calendar,
      label: 'Days Completed',
      value: stats.totalDaysCompleted,
      unit: 'days',
      color: 'text-success',
      bgColor: 'bg-green-50',
    },
    {
      icon: DollarSign,
      label: 'Money Saved',
      value: `$${stats.totalMoneySaved.toFixed(2)}`,
      unit: '',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-20 h-20 ${stat.bgColor} rounded-bl-full opacity-50`} />
          <div className="relative">
            <div className={`inline-flex p-2 rounded-lg ${stat.bgColor} mb-3`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">
              {stat.value}
              {stat.unit && <span className="text-lg text-gray-600 ml-1">{stat.unit}</span>}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default HeroStats;
