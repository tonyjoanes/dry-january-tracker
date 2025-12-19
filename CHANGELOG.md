# Changelog

All notable changes to the Dry January Tracker project will be documented in this file.

## [1.0.0] - 2025-12-19

### Added - Currency Update
- ✅ Changed all currency symbols from $ (USD) to £ (GBP)
- ✅ Updated PoundSterling icons throughout the application
- ✅ Modified all financial displays to use British Pounds
  - Profile page beer price display
  - Signup form beer price input
  - Dashboard money saved statistics
  - Check-in modal money saved calculation
  - Landing page average savings
  - Cost calculator displays

### Added - Security Enhancements
- ✅ **Firestore Security Rules** - Comprehensive server-side validation and authorization
  - Users can only access their own data
  - Display names: 2-50 characters
  - Beer prices: £0-£1000
  - Input validation on all operations
  - Critical field protection (email, friendCode immutable)

- ✅ **Cryptographically Secure Friend Codes**
  - Changed from `Math.random()` to `crypto.getRandomValues()`
  - Prevents brute force attacks

- ✅ **Strong Password Requirements**
  - Minimum 8 characters (was 6)
  - Requires uppercase, lowercase, number, and special character
  - Blocks common passwords

- ✅ **Input Sanitization**
  - HTML/script tag stripping from all text inputs
  - Length limits enforced (display name: 50 chars, notes: 500 chars)
  - Protection against XSS and injection attacks

- ✅ **Numeric Input Validation**
  - Range validation on all numeric fields
  - Beer price: £0-£1000
  - Beers avoided: 0-100
  - Mood: 0-4

- ✅ **User-Friendly Error Messages**
  - Firebase error codes mapped to helpful messages
  - No technical jargon exposed to users

### Added - Security Monitoring
- ✅ **Snyk Security Integration**
  - Created dedicated security workflow (`.github/workflows/security.yml`)
  - Automated vulnerability scanning on push, PR, and weekly schedule
  - SARIF report upload to GitHub Security tab
  - Snyk badge in README
  - Comprehensive setup guide (`SNYK_SETUP.md`)
  - npm audit integration

- ✅ **GitHub Actions Updates**
  - Added Snyk scan to deployment workflow
  - Security scan before production deployment
  - Continue deployment on low/medium severity issues

- ✅ **README Enhancements**
  - Added status badges (build, security, license, tech stack)
  - Added Security section with overview
  - Links to security documentation

### Added - New Features
- ✅ **Coming Soon Page** (`/coming-soon`)
  - Beautiful showcase of upcoming features
  - Feature cards with status badges (In Development, Coming Soon, Planned)
  - Estimated release dates
  - Links to GitHub for feature suggestions
  - Achievement System preview
  - Friend System preview
  - Leaderboard preview
  - Achievement Sharing preview
  - Push Notifications preview
  - PWA Support preview

- ✅ **Navigation Updates**
  - Added "Coming Soon" link to navbar (visible to all users)
  - Added footer link on landing page
  - Sparkles icon for visual appeal

### Added - Utilities
- ✅ Created `src/utils/validation.ts` with:
  - `validatePassword()` - Password strength validation
  - `sanitizeTextInput()` - HTML/script tag removal
  - `validateNumericInput()` - Range validation for numbers
  - `validateEmail()` - Email format validation
  - `getFirebaseErrorMessage()` - Error message mapping

### Modified Files
- `firestore.rules` - Complete rewrite with comprehensive security
- `src/services/auth.ts` - Secure friend code generation
- `src/components/auth/SignupForm.tsx` - Validation & sanitization
- `src/components/auth/LoginForm.tsx` - Error message mapping
- `src/pages/ProfilePage.tsx` - Input validation & currency
- `src/components/checkin/CheckInModal.tsx` - Input validation & currency
- `src/components/dashboard/HeroStats.tsx` - Currency symbols
- `src/components/dashboard/CostCalculator.tsx` - Currency symbols
- `src/pages/LandingPage.tsx` - Currency symbols & Coming Soon link
- `src/components/shared/Navbar.tsx` - Coming Soon link
- `src/App.tsx` - Coming Soon route

### Documentation
- ✅ Created `SECURITY_FIXES.md` - Comprehensive security audit report
- ✅ Created `CHANGELOG.md` - This file

### Deployment
- ✅ Firestore security rules deployed to production
- ✅ Application builds successfully without errors
- ✅ All TypeScript compilation passing

### Security Grade
- **Before:** D (Poor) - 14 vulnerabilities
- **After:** A- (Excellent) - 2 minor issues (console logs, App Check)

---

## Upcoming Features (Planned)

### Phase 2 - Q1 2025
- 🔄 Achievement System
- 🔄 Friend System
- 🔄 Enhanced profile features

### Phase 3 - Q2 2025
- 🔄 Leaderboards
- 🔄 Achievement Sharing
- 🔄 Push Notifications
- 🔄 PWA Support

---

## Version History

### Version 1.0.0 (Current)
**Release Date:** December 19, 2025
**Status:** ✅ Production Ready

**Core Features:**
- User authentication (Email/Password + Google OAuth)
- User profile management
- Daily check-ins with mood tracking
- Dashboard with statistics
- Interactive calendar view
- Cost calculator with comparisons
- Mood trends chart
- Streak tracking
- Currency: British Pounds (£)

**Security:**
- Comprehensive Firestore security rules
- Strong password requirements
- Input sanitization
- Cryptographically secure friend codes
- User-friendly error messages

**Pages:**
- Landing Page
- Login/Signup Pages
- Dashboard
- Profile Page
- Coming Soon Page
- Reset Password Page

---

## Notes

### Breaking Changes
None - this is the initial production release.

### Known Issues
None critical. See `SECURITY_FIXES.md` for optional enhancements.

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance
- Build size: ~1MB (gzipped: ~309KB)
- Lighthouse score: Not yet measured

---

**Maintained by:** Tony Joanes
**License:** MIT
**Last Updated:** December 19, 2025
