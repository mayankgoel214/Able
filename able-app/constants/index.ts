export * from './colors';
export * from './typography';
export * from './spacing';

// App-specific constants
export const APP_NAME = 'ABLE';
export const APP_TAGLINE = 'Support for every child. Clarity for every parent.';

export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
] as const;

export const AGE_GROUPS = [
  { id: '0-2', label: '0-2 years', description: 'Infant/Toddler' },
  { id: '3-5', label: '3-5 years', description: 'Preschool' },
  { id: '6-10', label: '6-10 years', description: 'Primary School' },
  { id: '11+', label: '11+ years', description: 'Secondary & Above' },
] as const;

export const CONCERNS = [
  { id: 'speech', label: 'Speech & Language', icon: 'message-circle' },
  { id: 'learning', label: 'Learning Difficulties', icon: 'book-open' },
  { id: 'focus', label: 'Focus & Attention', icon: 'target' },
  { id: 'behavior', label: 'Behavior', icon: 'users' },
] as const;

export const DAILY_CHALLENGES = [
  { id: 'school', label: 'School Difficulty', icon: 'graduation-cap' },
  { id: 'social', label: 'Social Interactions', icon: 'users' },
  { id: 'routines', label: 'Daily Routines', icon: 'clock' },
  { id: 'emotions', label: 'Managing Emotions', icon: 'heart' },
] as const;

export const STRESS_LEVELS = [
  { id: 'okay', label: 'Managing okay', color: '#22c55e' },
  { id: 'somewhat', label: 'Somewhat stressed', color: '#f59e0b' },
  { id: 'overwhelmed', label: 'Very overwhelmed', color: '#ef4444' },
] as const;

export const SCHOOL_TYPES = [
  { id: 'regular', label: 'Regular School' },
  { id: 'special', label: 'Special Needs School' },
  { id: 'homeschool', label: 'Homeschool' },
  { id: 'not-enrolled', label: 'Not in School' },
] as const;

export const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: 'smartphone' },
  { id: 'card', label: 'Credit/Debit Card', icon: 'credit-card' },
  { id: 'netbanking', label: 'Net Banking', icon: 'landmark' },
] as const;
