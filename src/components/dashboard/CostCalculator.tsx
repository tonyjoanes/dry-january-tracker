import React from 'react';
import { DollarSign, TrendingUp, Beer } from 'lucide-react';
import Card from '../shared/Card';
import type { Stats } from '../../types';

interface CostCalculatorProps {
  stats: Stats;
  beerPrice: number;
}

const CostCalculator: React.FC<CostCalculatorProps> = ({ stats }) => {
  const totalSaved = stats.totalMoneySaved;
  const beersAvoided = stats.totalBeersAvoided;

  // Fun comparisons
  const comparisons = [
    { item: 'Coffees ☕', amount: Math.floor(totalSaved / 4) },
    { item: 'Movie Tickets 🎬', amount: Math.floor(totalSaved / 12) },
    { item: 'Nice Meals 🍽️', amount: Math.floor(totalSaved / 15) },
    { item: 'Concert Tickets 🎵', amount: Math.floor(totalSaved / 50) },
  ];

  // Calculate percentage toward goal ($200 saved)
  const savingsGoal = 200;
  const progressPercent = Math.min((totalSaved / savingsGoal) * 100, 100);

  return (
    <Card>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Money Saved</h2>

      {/* Main savings display */}
      <div className="text-center mb-6 p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-success rounded-full mb-4">
          <DollarSign className="text-white" size={32} />
        </div>
        <p className="text-5xl font-bold text-success mb-2">
          ${totalSaved.toFixed(2)}
        </p>
        <p className="text-gray-600">Total Money Saved</p>
      </div>

      {/* Beers avoided */}
      <div className="flex items-center justify-center gap-3 mb-6 p-4 bg-blue-50 rounded-lg">
        <Beer className="text-primary" size={32} />
        <div>
          <p className="text-2xl font-bold text-gray-900">{beersAvoided}</p>
          <p className="text-sm text-gray-600">Beers Avoided</p>
        </div>
      </div>

      {/* Progress toward goal */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Progress to ${savingsGoal}</span>
          <span className="font-semibold text-primary">{progressPercent.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-success to-emerald-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Fun comparisons */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="text-achievement" size={20} />
          <h3 className="font-semibold text-gray-900">That's enough for...</h3>
        </div>
        <div className="space-y-2">
          {comparisons.map((comp, index) => (
            comp.amount > 0 && (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-gray-700">{comp.item}</span>
                <span className="font-semibold text-gray-900">{comp.amount}</span>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Projection */}
      {stats.currentStreak > 0 && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Keep it up!</span> If you continue your current streak
            for 31 days, you could save <span className="font-bold text-success">
              ${((31 / stats.currentStreak) * totalSaved).toFixed(2)}
            </span>
          </p>
        </div>
      )}
    </Card>
  );
};

export default CostCalculator;
