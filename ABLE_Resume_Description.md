# ABLE - Special Needs Parent Support Platform

## Project Summary

**ABLE** is a full-stack mobile application designed to revolutionize support for parents of children with special needs in India. The platform connects families with qualified therapists, provides AI-powered guidance, and offers comprehensive tools for tracking child development progress.

---

## Role & Duration

**Role:** Full-Stack Mobile Developer
**Type:** End-to-End Development
**Platform:** Cross-Platform (iOS, Android, Web)

---

## Technical Description

Designed and developed a comprehensive React Native mobile application using Expo framework, implementing a scalable architecture with TypeScript for type safety. Built a complete ecosystem featuring dual authentication systems, AI-powered chat support, therapist marketplace with intelligent matching, and real-time progress tracking—all while maintaining a consistent design system across 39+ screens.

---

## Key Achievements & Metrics

### Application Scale
- **39+ screens** developed across 5 navigation groups (Auth, Onboarding, Tabs, Main, Provider)
- **15+ reusable UI components** built from scratch with variant systems and accessibility support
- **3 state management stores** with persistent storage handling user, auth, and onboarding data
- **4 external service integrations** (Firebase, Supabase, OpenAI, Expo)
- **100% TypeScript coverage** with 25+ custom type definitions

### Feature Complexity
- **Dual authentication system** supporting Phone OTP (Firebase) and Email OTP (Supabase)
- **2-path adaptive onboarding** flow with dynamic questionnaire system
- **AI chatbot integration** using GPT-4o-mini with context-aware conversation history
- **Multi-language architecture** supporting 4 languages (English, Hindi, Tamil, Telugu)
- **Provider-side dashboard** with separate authentication and management screens

### UI/UX Implementation
- **Complete design token system** with 10-shade color palettes, 12 typography scales, and 8 spacing units
- **6 button variants** with loading states, icons, and gradient effects
- **5 card variants** with pressable interactions and elevation options
- **Animated components** using Moti and Reanimated for micro-interactions
- **Form validation system** with React Hook Form and Zod schema validation

---

## Technical Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React Native, Expo, TypeScript |
| **Navigation** | Expo Router (file-based routing) |
| **State Management** | Zustand with AsyncStorage persistence |
| **Authentication** | Firebase Auth (Phone OTP), Supabase Auth (Email OTP) |
| **AI Integration** | OpenAI API (GPT-4o-mini) |
| **UI/Animation** | Moti, React Native Reanimated, Linear Gradient |
| **Forms** | React Hook Form, Zod |
| **Icons** | Lucide React Native |
| **File Handling** | Expo Document Picker, Expo Image Picker |

---

## Core Features Developed

### 1. Intelligent Onboarding System
- Built adaptive 2-path onboarding based on user's existing documentation status
- Developed dynamic questionnaire engine with step-based progression
- Implemented assessment result generation with personalized action plans
- Created document upload system with file validation (PDF, images up to 10MB)

### 2. Therapist Marketplace
- Designed search and discovery interface with multi-criteria filtering
- Implemented specialization-based matching with compatibility percentages
- Built availability calendar with time slot selection
- Created end-to-end booking flow with payment integration screens

### 3. AI Support Companion
- Integrated OpenAI GPT-4o-mini for conversational support
- Engineered culturally-sensitive system prompts for Indian context
- Implemented chat history management with context preservation
- Designed quick-action suggestions for common parent queries

### 4. Progress Tracking Dashboard
- Developed goal and milestone tracking system
- Built visual progress indicators with animated progress bars
- Created session history management with upcoming appointment alerts
- Implemented care team overview with therapist profiles

### 5. Document Management System
- Built secure document upload and organization features
- Supported multiple document types (IEP, assessments, diagnoses, progress reports)
- Implemented file preview and categorization system

### 6. Provider Portal
- Developed separate therapist-facing dashboard
- Built student management and progress tracking interfaces
- Created schedule management and earnings tracking screens

---

## Architecture Highlights

### State Management Architecture
```
Zustand Stores (3)
├── authStore      → User authentication, tokens, session management
├── onboardingStore → Path selection, questionnaire answers, assessment results
└── userStore      → Children, sessions, documents, care team, goals, reminders
```

### Navigation Architecture
```
Expo Router Groups (5)
├── (auth)        → Welcome, language selection, login, OTP verification
├── (onboarding)  → Segmentation, questionnaire, results, action plans
├── (tabs)        → Home, community, resources, profile (bottom tabs)
├── (main)        → Chat, therapists, sessions, documents, booking flow
└── provider/     → Provider login, dashboard, students, schedule, earnings
```

### Component Architecture
```
UI Components (15+)
├── Core      → Button, Input, Card, Avatar, Badge, Modal
├── Forms     → PhoneInput, EmailInput, OTPInput, FileUpload
├── Feedback  → ProgressBar, SelectableCard
└── Layout    → Safe areas, gradients, animations
```

---

## Impact & Value Proposition

### Social Impact
- **Addresses critical gap** in special needs support infrastructure in India
- **Reduces barriers** for parents seeking qualified therapists in tier-2/3 cities
- **Democratizes access** to professional guidance through AI-powered support
- **Supports 4 regional languages** to maximize accessibility across India

### User Experience Impact
- **Streamlined onboarding** reduces time-to-value from days to minutes
- **AI companion** provides 24/7 support for common parenting concerns
- **Centralized platform** eliminates need for multiple apps/tools for therapy management
- **Progress visualization** helps parents track and celebrate developmental milestones

### Technical Impact
- **Cross-platform codebase** reduces development effort by ~40% vs native development
- **Modular architecture** enables rapid feature iteration and scaling
- **Type-safe codebase** minimizes runtime errors and improves maintainability
- **Design token system** ensures UI consistency and enables theme customization

---

## Skills Demonstrated

### Technical Skills
- React Native & Expo ecosystem mastery
- TypeScript for large-scale application development
- State management patterns (Zustand)
- Third-party API integration (Firebase, Supabase, OpenAI)
- Authentication system design (OTP flows)
- Form validation and error handling
- Animation and micro-interaction design
- File upload and document handling
- Cross-platform mobile development

### Soft Skills
- End-to-end product development
- User-centric design thinking
- Accessibility and internationalization awareness
- Complex system architecture
- Healthcare/EdTech domain understanding

---

## Short Resume Bullet Points

Use these concise versions for space-constrained resumes:

**Option 1 (Technical Focus):**
> Developed a cross-platform React Native app with 39+ screens, dual authentication (Firebase/Supabase), OpenAI integration, and Zustand state management serving parents of children with special needs

**Option 2 (Impact Focus):**
> Built ABLE, a therapist marketplace and progress tracking platform for special needs families, featuring AI-powered support, multi-language support (4 languages), and comprehensive onboarding flows

**Option 3 (Full-Stack Focus):**
> Architected and developed a full-stack mobile application integrating Firebase Auth, Supabase, and OpenAI APIs with 15+ reusable components, 3 state stores, and 100% TypeScript coverage

---

## LinkedIn Project Description

**ABLE - Special Needs Parent Support Platform**

Led the development of a comprehensive React Native mobile application designed to support parents of children with special needs in India. The platform features:

- Cross-platform app (iOS, Android, Web) built with Expo and TypeScript
- Dual authentication system using Firebase and Supabase
- AI-powered support companion integrated with OpenAI GPT-4o-mini
- Therapist marketplace with intelligent matching and booking
- Progress tracking with goals, milestones, and session management
- Multi-language support for English, Hindi, Tamil, and Telugu

Technical highlights include 39+ screens across 5 navigation groups, 15+ custom UI components, comprehensive state management with Zustand, and a complete design token system ensuring UI consistency throughout the application.

---

## GitHub Repository Description

```
ABLE - A React Native platform connecting parents of children with special
needs to qualified therapists, featuring AI-powered support, progress tracking,
and multi-language accessibility.

Tech: React Native | Expo | TypeScript | Firebase | Supabase | OpenAI | Zustand
```
