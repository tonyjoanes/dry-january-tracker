import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import { User, DollarSign, Calendar, Mail, Key } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { currentUser, userData, refreshUserData } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: userData?.displayName || '',
    beerPrice: userData?.beerPrice.toString() || '5',
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        displayName: formData.displayName,
        beerPrice: parseFloat(formData.beerPrice),
      });

      await refreshUserData();
      setEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditing(false);
    setFormData({
      displayName: userData?.displayName || '',
      beerPrice: userData?.beerPrice.toString() || '5',
    });
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Profile Settings</h1>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 border border-success text-success'
                : 'bg-red-50 border border-warning text-warning'
            }`}
          >
            {message.text}
          </div>
        )}

        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

          {!editing ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <User className="text-gray-400" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Display Name</p>
                  <p className="font-semibold text-gray-900">{userData.displayName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="text-gray-400" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{userData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <DollarSign className="text-gray-400" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Average Beer Price</p>
                  <p className="font-semibold text-gray-900">${userData.beerPrice.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Calendar className="text-gray-400" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Start Date</p>
                  <p className="font-semibold text-gray-900">
                    {userData.startDate.toDate().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Key className="text-gray-400" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Friend Code</p>
                  <p className="font-semibold text-gray-900 font-mono">{userData.friendCode}</p>
                </div>
              </div>

              <Button variant="primary" onClick={() => setEditing(true)} fullWidth>
                Edit Profile
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                  Display Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="displayName"
                    name="displayName"
                    type="text"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="beerPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Average Beer Price ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="beerPrice"
                    name="beerPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.beerPrice}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={cancelEdit} fullWidth>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" loading={loading} fullWidth>
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        </Card>

        {/* Privacy Settings */}
        <Card className="mt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Show on Leaderboard</p>
                <p className="text-sm text-gray-600">Allow others to see your stats</p>
              </div>
              <input
                type="checkbox"
                checked={userData.privacy.showOnLeaderboard}
                className="w-5 h-5 text-primary"
                readOnly
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Share Achievements</p>
                <p className="text-sm text-gray-600">Allow achievement sharing</p>
              </div>
              <input
                type="checkbox"
                checked={userData.privacy.shareAchievements}
                className="w-5 h-5 text-primary"
                readOnly
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
