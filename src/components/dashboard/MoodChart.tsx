import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../shared/Card';
import { getAllCheckIns } from '../../services/checkIns';
import { format } from 'date-fns';

interface MoodChartProps {
  userId: string;
}

const MoodChart: React.FC<MoodChartProps> = ({ userId }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMoodData();
  }, [userId]);

  const loadMoodData = async () => {
    setLoading(true);
    const checkIns = await getAllCheckIns(userId);

    // Get last 14 days of data
    const recentCheckIns = checkIns.slice(0, 14).reverse();

    const data = recentCheckIns.map((checkIn) => ({
      date: format(checkIn.date.toDate(), 'MM/dd'),
      mood: checkIn.mood + 1, // Convert 0-4 to 1-5 for display
      moodEmoji: checkIn.moodEmoji,
      fullDate: format(checkIn.date.toDate(), 'MMM d, yyyy'),
    }));

    setChartData(data);
    setLoading(false);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{data.fullDate}</p>
          <p className="text-2xl my-1">{data.moodEmoji}</p>
          <p className="text-sm text-gray-600">Mood: {data.mood}/5</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Mood Trends</h2>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Mood Trends</h2>
        <div className="h-64 flex items-center justify-center text-gray-500">
          <p>No mood data yet. Start checking in to see your trends!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Mood Trends</h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="date"
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              domain={[0, 5]}
              ticks={[1, 2, 3, 4, 5]}
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: '#3B82F6', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex justify-between text-xs text-gray-600 px-2">
        <span>😔 Bad</span>
        <span>😐 Neutral</span>
        <span>😊 Good</span>
        <span>😤 Great</span>
        <span>🎉 Amazing</span>
      </div>
    </Card>
  );
};

export default MoodChart;
