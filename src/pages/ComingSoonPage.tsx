import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, Share2, Bell, Rocket, Sparkles, Star, Target } from 'lucide-react';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';

const ComingSoonPage: React.FC = () => {
  const upcomingFeatures = [
    {
      icon: Trophy,
      title: 'Achievement System',
      description: 'Unlock badges and trophies as you hit milestones. From "First Day" to "Dry January Champion" - earn them all!',
      status: 'In Development',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      estimatedRelease: 'Q1 2025',
    },
    {
      icon: Users,
      title: 'Friend System',
      description: 'Add friends using unique friend codes, see their progress, and motivate each other throughout the journey.',
      status: 'Coming Soon',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      estimatedRelease: 'Q1 2025',
    },
    {
      icon: Target,
      title: 'Leaderboards',
      description: 'Compete with friends and the community. See who has the longest streaks, most days completed, and highest savings!',
      status: 'Coming Soon',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      estimatedRelease: 'Q2 2025',
    },
    {
      icon: Share2,
      title: 'Achievement Sharing',
      description: 'Share your wins on social media! Let the world know about your achievements and inspire others.',
      status: 'Planned',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      estimatedRelease: 'Q2 2025',
    },
    {
      icon: Bell,
      title: 'Push Notifications',
      description: 'Stay on track with daily reminders, streak alerts, and friend activity notifications.',
      status: 'Planned',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      estimatedRelease: 'Q2 2025',
    },
    {
      icon: Rocket,
      title: 'PWA Support',
      description: 'Install the app on your phone for a native app experience. Use offline, add to home screen, and more!',
      status: 'Planned',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      estimatedRelease: 'Q2 2025',
    },
  ];

  const statusBadgeColors = {
    'In Development': 'bg-amber-100 text-amber-800 border-amber-300',
    'Coming Soon': 'bg-blue-100 text-blue-800 border-blue-300',
    'Planned': 'bg-gray-100 text-gray-800 border-gray-300',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="text-primary" size={32} />
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Coming Soon</h1>
            <Sparkles className="text-primary" size={32} />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're constantly working to make your Dry January journey even better.
            Here's what we have in the pipeline!
          </p>
        </div>

        {/* Current Features Banner */}
        <Card className="mb-12 bg-gradient-to-r from-success to-emerald-600 text-white border-0">
          <div className="text-center py-6">
            <Star className="mx-auto mb-4" size={48} />
            <h2 className="text-2xl font-bold mb-2">Already Available</h2>
            <p className="text-lg opacity-90 mb-4">
              Track your progress, log daily check-ins, view your stats, and monitor your savings!
            </p>
            <Link to="/dashboard">
              <Button variant="outline" className="bg-white text-success hover:bg-gray-50 border-white">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </Card>

        {/* Upcoming Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {upcomingFeatures.map((feature, index) => (
            <Card
              key={index}
              className={`relative border-2 ${feature.borderColor} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusBadgeColors[feature.status as keyof typeof statusBadgeColors]}`}>
                  {feature.status}
                </span>
              </div>

              {/* Icon */}
              <div className={`inline-flex p-4 rounded-lg ${feature.bgColor} mb-4 mt-2`}>
                <feature.icon className={feature.color} size={32} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 pr-24">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>

              {/* Estimated Release */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Estimated Release:</span>
                  <span className={`text-sm font-semibold ${feature.color}`}>
                    {feature.estimatedRelease}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Newsletter/Updates Section */}
        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white border-0">
          <div className="text-center py-8">
            <Bell className="mx-auto mb-4" size={48} />
            <h2 className="text-3xl font-bold mb-4">Want to Stay Updated?</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              We'll announce new features right in the app! Keep checking your dashboard
              for the latest updates and improvements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button variant="outline" className="bg-white text-primary hover:bg-gray-50 border-white min-w-[200px]">
                  Go to Dashboard
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" className="bg-transparent text-white hover:bg-white hover:text-primary border-white min-w-[200px]">
                  View Profile
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Have Ideas Section */}
        <div className="mt-12 text-center">
          <Card className="inline-block bg-amber-50 border-2 border-amber-200">
            <div className="px-8 py-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Have Ideas for New Features?
              </h3>
              <p className="text-gray-600 mb-4">
                We'd love to hear your suggestions! Your feedback helps us build better features.
              </p>
              <a
                href="https://github.com/tonyjoanes/dry-january-tracker/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                Share Your Ideas on GitHub →
              </a>
            </div>
          </Card>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link to="/">
            <Button variant="secondary">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
