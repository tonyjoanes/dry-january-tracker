import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../shared/Card';
import { getCheckInsForMonth } from '../../services/checkIns';
import type { CheckIn } from '../../types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isFuture } from 'date-fns';

interface CalendarViewProps {
  userId: string;
}

const CalendarView: React.FC<CalendarViewProps> = ({ userId }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [selectedDay, setSelectedDay] = useState<CheckIn | null>(null);

  useEffect(() => {
    loadCheckIns();
  }, [currentDate, userId]);

  const loadCheckIns = async () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const data = await getCheckInsForMonth(userId, year, month);
    setCheckIns(data);
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDayOfWeek = monthStart.getDay();
  const emptyDays = Array.from({ length: startDayOfWeek }, (_, i) => i);

  const getCheckInForDay = (day: Date) => {
    return checkIns.find((checkIn) =>
      isSameDay(checkIn.date.toDate(), day)
    );
  };

  const getDayClass = (day: Date) => {
    const checkIn = getCheckInForDay(day);
    const future = isFuture(day);
    const today = isToday(day);

    let baseClass = 'aspect-square flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all ';

    if (future) {
      return baseClass + 'bg-gray-50 text-gray-400 cursor-not-allowed';
    }

    if (today) {
      baseClass += 'ring-2 ring-primary ';
    }

    if (checkIn) {
      if (checkIn.status === 'success') {
        return baseClass + 'bg-success text-white hover:bg-emerald-600';
      } else {
        return baseClass + 'bg-warning text-white hover:bg-red-600';
      }
    }

    return baseClass + 'bg-gray-100 text-gray-600 hover:bg-gray-200';
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {/* Week day headers */}
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}

        {/* Empty cells for days before month starts */}
        {emptyDays.map((i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Days of the month */}
        {daysInMonth.map((day) => {
          const checkIn = getCheckInForDay(day);
          return (
            <div
              key={day.toISOString()}
              className={getDayClass(day)}
              onClick={() => checkIn && setSelectedDay(checkIn)}
            >
              <span className="text-sm font-semibold">{format(day, 'd')}</span>
              {checkIn && (
                <span className="text-xl mt-1">{checkIn.moodEmoji}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-success rounded" />
          <span>Success</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-warning rounded" />
          <span>Slip</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 rounded" />
          <span>No check-in</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-50 rounded" />
          <span>Future</span>
        </div>
      </div>

      {/* Selected day details */}
      {selectedDay && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-semibold text-gray-900">
                {format(selectedDay.date.toDate(), 'MMMM d, yyyy')}
              </p>
              <p className="text-sm text-gray-600">
                Status: <span className={selectedDay.status === 'success' ? 'text-success' : 'text-warning'}>
                  {selectedDay.status}
                </span>
              </p>
            </div>
            <button
              onClick={() => setSelectedDay(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <p className="text-2xl mb-2">{selectedDay.moodEmoji}</p>
          {selectedDay.beersAvoided > 0 && (
            <p className="text-sm text-gray-700">
              Beers avoided: {selectedDay.beersAvoided}
            </p>
          )}
          {selectedDay.notes && (
            <p className="text-sm text-gray-700 mt-2 italic">"{selectedDay.notes}"</p>
          )}
        </div>
      )}
    </Card>
  );
};

export default CalendarView;
