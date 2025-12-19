# Dry January Tracker 🍺❌

[![Deploy to Firebase Hosting](https://github.com/tonyjoanes/dry-january-tracker/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/tonyjoanes/dry-january-tracker/actions/workflows/firebase-hosting-merge.yml)
[![Security Scan](https://github.com/tonyjoanes/dry-january-tracker/actions/workflows/security.yml/badge.svg)](https://github.com/tonyjoanes/dry-january-tracker/actions/workflows/security.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/tonyjoanes/dry-january-tracker/badge.svg)](https://snyk.io/test/github/tonyjoanes/dry-january-tracker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Powered-orange.svg)](https://firebase.google.com/)

A fun, engaging web application to help users track their Dry January journey, monitor their progress, celebrate achievements, and optionally compete with friends.

## Features

### MVP Features (Phase 1)
- ✅ User authentication (Email/Password + Google OAuth)
- ✅ User profile creation and management
- ✅ Daily check-in functionality with mood tracking
- ✅ Dashboard with hero stats (streak, days completed, money saved)
- ✅ Interactive calendar view
- ✅ Cost calculator with fun comparisons
- ✅ Mood trends chart
- ✅ Streak tracking

### Coming Soon (Phase 2+)
- 🔄 Achievements system
- 🔄 Friend system and social features
- 🔄 Leaderboard
- 🔄 Achievement sharing
- 🔄 Push notifications
- 🔄 PWA support

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Hosting**: Firebase Hosting
- **Security**: Snyk vulnerability scanning

## Security

This application implements comprehensive security measures:

- 🔒 **Firestore Security Rules** - Server-side validation and authorization
- 🔐 **Strong Password Requirements** - 8+ characters with complexity requirements
- 🛡️ **Input Sanitization** - Protection against XSS and injection attacks
- 🔑 **Cryptographically Secure** - Friend codes use `crypto.getRandomValues()`
- ✅ **Continuous Monitoring** - Automated Snyk security scans
- 📊 **Security Grade: A-**

See [SECURITY_FIXES.md](SECURITY_FIXES.md) for detailed security audit report.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account
- (Optional) Vercel account for deployment

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dry-january-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Email/Password and Google authentication
   - Create a Firestore database
   - Copy your Firebase config

4. Create environment file:
```bash
cp .env.example .env.local
```

5. Update `.env.local` with your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

6. Deploy Firestore security rules:
```bash
# Install Firebase CLI if you haven't
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init firestore

# Deploy security rules
firebase deploy --only firestore:rules
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Deployment

#### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

#### Firebase Hosting (Alternative)

1. Initialize Firebase Hosting:
```bash
firebase init hosting
```

2. Deploy:
```bash
npm run build
firebase deploy --only hosting
```

## Project Structure

```
src/
├── components/
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard widgets
│   ├── checkin/           # Check-in components
│   ├── achievements/      # Achievement components (coming soon)
│   ├── social/            # Social features (coming soon)
│   ├── profile/           # Profile components
│   └── shared/            # Shared UI components
├── contexts/              # React contexts
├── hooks/                 # Custom hooks
├── services/              # Firebase services
├── types/                 # TypeScript types
├── utils/                 # Utility functions
├── pages/                 # Page components
├── App.tsx                # Main app component
└── main.tsx               # Entry point
```

## Firebase Collections

### users
- User profile information
- Beer price preferences
- Friend code
- Privacy settings

### checkIns
- Daily check-in records
- Mood tracking
- Beers avoided count
- Optional notes

### stats
- Calculated user statistics
- Streaks
- Total savings
- Days completed

### achievements (coming soon)
- Earned achievements
- Achievement metadata

### friends (coming soon)
- Friend relationships
- Friendship status

## Documentation

- 📖 [Security Audit Report](SECURITY_FIXES.md) - Comprehensive security review and fixes
- 🔒 [Snyk Setup Guide](SNYK_SETUP.md) - How to configure Snyk security scanning
- 📝 [Changelog](CHANGELOG.md) - Version history and updates

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Before Contributing

1. Run security scan: `npm audit`
2. Check for vulnerabilities with Snyk (if installed): `snyk test`
3. Ensure all tests pass
4. Follow TypeScript best practices

## License

MIT License - feel free to use this project for your own Dry January tracking!

## Support

If you encounter any issues or have questions:
- 🐛 [Open an issue](https://github.com/tonyjoanes/dry-january-tracker/issues)
- 💡 [Suggest a feature](https://github.com/tonyjoanes/dry-january-tracker/issues/new)
- 🔒 [Report security issue](https://github.com/tonyjoanes/dry-january-tracker/security)

---

Built with ❤️ for a healthier January!
