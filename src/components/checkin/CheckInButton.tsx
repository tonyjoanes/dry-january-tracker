import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import Button from '../shared/Button';
import CheckInModal from './CheckInModal';
import { canCheckInToday } from '../../services/checkIns';

interface CheckInButtonProps {
  userId: string;
  beerPrice: number;
  onSuccess: () => void;
}

const CheckInButton: React.FC<CheckInButtonProps> = ({ userId, beerPrice, onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canCheckIn, setCanCheckIn] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkCanCheckIn();
  }, [userId]);

  const checkCanCheckIn = async () => {
    setLoading(true);
    const can = await canCheckInToday(userId);
    setCanCheckIn(can);
    setLoading(false);
  };

  const handleSuccess = () => {
    setCanCheckIn(false);
    onSuccess();
  };

  if (loading) {
    return null;
  }

  if (!canCheckIn) {
    return (
      <div className="bg-green-50 border border-success rounded-lg p-4 flex items-center gap-3">
        <CheckCircle className="text-success" size={24} />
        <div>
          <p className="font-semibold text-success">Already checked in today!</p>
          <p className="text-sm text-gray-600">Come back tomorrow for your next check-in</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Button
        variant="success"
        size="lg"
        fullWidth
        onClick={() => setIsModalOpen(true)}
        className="text-lg"
      >
        <CheckCircle size={24} />
        Check In Today
      </Button>

      <CheckInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={userId}
        beerPrice={beerPrice}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default CheckInButton;
