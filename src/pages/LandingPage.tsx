import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, TrendingUp, Users, Award, Calendar, DollarSign } from 'lucide-react';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: CheckCircle,
      title: 'Daily Check-Ins',
      description: 'Track your progress with simple daily check-ins. Log your mood and stay accountable.',
      color: 'text-success',
      bgColor: 'bg-green-50',
    },
    {
      icon: TrendingUp,
      title: 'Track Your Streaks',
      description: 'Build momentum with streak tracking. See your current and longest streaks at a glance.',
      color: 'text-primary',
      bgColor: 'bg-blue-50',
    },
    {
      icon: DollarSign,
      title: 'Money Saved',
      description: 'Visualize exactly how much money you are saving by not drinking. Watch your savings grow!',
      color: 'text-success',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: Calendar,
      title: 'Calendar View',
      description: 'See your entire journey at a glance with a beautiful calendar showing all your check-ins.',
      color: 'text-achievement',
      bgColor: 'bg-amber-50',
    },
    {
      icon: Award,
      title: 'Achievements',
      description: 'Earn achievements as you hit milestones. Celebrate your wins along the way!',
      color: 'text-primary',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Users,
      title: 'Social Features',
      description: 'Connect with friends and compete on leaderboards. Stay motivated together!',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <div className="text-6xl mb-6">🍺❌</div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Dry January Tracker
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your companion for a successful Dry January journey. Track your progress, celebrate
            achievements, and see how much you save!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="primary" size="lg" className="min-w-[200px]">
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="min-w-[200px]">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything you need to succeed
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <div className={`inline-flex p-4 rounded-lg ${feature.bgColor} mb-4`}>
                <feature.icon className={feature.color} size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary py-16 my-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <p className="text-5xl font-bold mb-2">31</p>
              <p className="text-xl opacity-90">Days to Transform</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">$150+</p>
              <p className="text-xl opacity-90">Average Savings</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">100%</p>
              <p className="text-xl opacity-90">Free Forever</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Ready to start your journey?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of others taking on Dry January. It is free, fun, and you have got this! 💪
        </p>
        <Link to="/signup">
          <Button variant="success" size="lg" className="text-xl px-12 py-4">
            Start Tracking Now
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>© 2025 Dry January Tracker. Built with ❤️ for your success.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
