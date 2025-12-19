import React, { useState } from 'react';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import { MOOD_EMOJIS } from '../../types';
import { submitCheckIn, type CheckInData } from '../../services/checkIns';
import { updateStatsAfterCheckIn } from '../../services/stats';
import { sanitizeTextInput, validateNumericInput, getFirebaseErrorMessage } from '../../utils/validation';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  beerPrice: number;
  onSuccess: () => void;
}

const CheckInModal: React.FC<CheckInModalProps> = ({
  isOpen,
  onClose,
  userId,
  beerPrice,
  onSuccess,
}) => {
  const [status, setStatus] = useState<'success' | 'slip'>('success');
  const [mood, setMood] = useState(2); // Default to middle mood (😊)
  const [beersAvoided, setBeersAvoided] = useState(2);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    // Validate inputs
    const beersError = validateNumericInput(beersAvoided, 0, 100, 'Beers avoided');
    if (beersError) {
      setError(beersError);
      setLoading(false);
      return;
    }

    const moodError = validateNumericInput(mood, 0, 4, 'Mood');
    if (moodError) {
      setError(moodError);
      setLoading(false);
      return;
    }

    // Sanitize notes
    const sanitizedNotes = sanitizeTextInput(notes, 500);

    try {
      const checkInData: CheckInData = {
        status,
        mood,
        moodEmoji: MOOD_EMOJIS[mood],
        beersAvoided: status === 'success' ? beersAvoided : 0,
        notes: sanitizedNotes,
      };

      await submitCheckIn(userId, checkInData);
      await updateStatsAfterCheckIn(userId, beerPrice);

      setStatus('success');
      setMood(2);
      setBeersAvoided(2);
      setNotes('');
      onSuccess();
      onClose();
    } catch (err: any) {
      const errorMessage = getFirebaseErrorMessage(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Daily Check-In" size="md">
      <div className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Status Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How did today go?
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setStatus('success')}
              className={`p-4 rounded-lg border-2 transition-all ${
                status === 'success'
                  ? 'border-success bg-green-50 text-success'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="text-3xl mb-1">✅</div>
              <div className="font-semibold">Success</div>
              <div className="text-xs text-gray-600">Stayed alcohol-free</div>
            </button>
            <button
              type="button"
              onClick={() => setStatus('slip')}
              className={`p-4 rounded-lg border-2 transition-all ${
                status === 'slip'
                  ? 'border-warning bg-red-50 text-warning'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="text-3xl mb-1">❌</div>
              <div className="font-semibold">Slip</div>
              <div className="text-xs text-gray-600">Had a drink</div>
            </button>
          </div>
        </div>

        {/* Mood Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How are you feeling?
          </label>
          <div className="flex justify-between gap-2">
            {MOOD_EMOJIS.map((emoji, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setMood(index)}
                className={`flex-1 p-3 text-3xl rounded-lg border-2 transition-all hover:scale-110 ${
                  mood === index
                    ? 'border-primary bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2 px-1">
            <span>Bad</span>
            <span>Neutral</span>
            <span>Good</span>
            <span>Great</span>
            <span>Amazing</span>
          </div>
        </div>

        {/* Beers Avoided (only for success) */}
        {status === 'success' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Beers you would have had: {beersAvoided}
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={beersAvoided}
              onChange={(e) => setBeersAvoided(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>0</span>
              <span>10</span>
              <span>20+</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Money saved today: ${(beersAvoided * beerPrice).toFixed(2)}
            </p>
          </div>
        )}

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="How was your day? Any challenges or wins?"
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} fullWidth disabled={loading}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit} fullWidth loading={loading}>
            Submit Check-In
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CheckInModal;
