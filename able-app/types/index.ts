// User Types
export interface User {
  id: string;
  email?: string;
  phone: string;
  name: string;
  avatar?: string;
  language: 'en' | 'hi' | 'ta' | 'te';
  role: 'parent' | 'provider';
  createdAt: string;
  updatedAt: string;
}

export interface Child {
  id: string;
  parentId: string;
  name: string;
  dateOfBirth?: string;
  ageGroup: '0-2' | '3-5' | '6-10' | '11+';
  avatar?: string;
  concerns: string[];
  challenges: string[];
  schoolType: 'regular' | 'special' | 'homeschool' | 'not-enrolled';
  hasDiagnosis: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Diagnosis {
  id: string;
  childId: string;
  reportUrl: string;
  reportName: string;
  diagnosisType: string;
  diagnosedBy: string;
  diagnosisDate: string;
  summary?: string;
  uploadedAt: string;
}

// Therapist/Provider Types
export interface Therapist {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  specializations: string[];
  qualifications: string[];
  experience: number;
  bio: string;
  languages: string[];
  rating: number;
  reviewCount: number;
  consultationFee: number;
  sessionDuration: number;
  availability: Availability[];
  location: {
    city: string;
    state: string;
    address?: string;
    coordinates?: { lat: number; lng: number };
  };
  verified: boolean;
  online: boolean;
  createdAt: string;
}

export interface Availability {
  dayOfWeek: number;
  slots: TimeSlot[];
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

// Session Types
export interface Session {
  id: string;
  childId: string;
  therapistId: string;
  therapist?: Therapist;
  type: 'consultation' | 'therapy' | 'assessment';
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  scheduledAt: string;
  duration: number;
  mode: 'online' | 'in-person';
  meetingLink?: string;
  notes?: string;
  payment?: Payment;
  createdAt: string;
}

// Payment Types
export interface Payment {
  id: string;
  sessionId?: string;
  userId: string;
  amount: number;
  currency: string;
  method: 'upi' | 'card' | 'netbanking';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: string;
}

// Document Types
export interface Document {
  id: string;
  childId: string;
  name: string;
  type: 'iep' | 'assessment' | 'diagnosis' | 'progress' | 'other';
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  sharedWith: string[];
  uploadedBy: string;
  createdAt: string;
}

// Message Types
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  attachments?: Attachment[];
  read: boolean;
  createdAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

// Community Types
export interface Post {
  id: string;
  authorId: string;
  author?: User;
  title?: string;
  content: string;
  category: 'question' | 'story' | 'resource' | 'tip' | 'general';
  tags: string[];
  likes: number;
  likedBy: string[];
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author?: User;
  content: string;
  likes: number;
  createdAt: string;
}

// Resource Types
export interface Resource {
  id: string;
  title: string;
  description: string;
  content?: string;
  type: 'article' | 'video' | 'guide' | 'worksheet';
  category: string;
  tags: string[];
  thumbnail?: string;
  url?: string;
  premium: boolean;
  readTime?: number;
  createdAt: string;
}

// Assessment Types
export interface Assessment {
  id: string;
  childId: string;
  type: 'functional' | 'developmental' | 'behavioral';
  answers: Record<string, any>;
  results: AssessmentResult;
  createdAt: string;
}

export interface AssessmentResult {
  priorityNeeds: PriorityNeed[];
  strengths: string[];
  weaknesses: string[];
  actionPlan: ActionStep[];
}

export interface PriorityNeed {
  id: string;
  area: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ActionStep {
  id: string;
  title: string;
  description: string;
  timeframe: 'this-week' | 'who-to-contact' | 'what-to-watch';
  completed: boolean;
}

// Progress Types
export interface Goal {
  id: string;
  childId: string;
  title: string;
  description: string;
  category: string;
  targetDate?: string;
  progress: number;
  milestones: Milestone[];
  createdAt: string;
  updatedAt: string;
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: string;
}

// Reminder Types
export interface Reminder {
  id: string;
  userId: string;
  title: string;
  description?: string;
  type: 'session' | 'medication' | 'activity' | 'custom';
  scheduledAt: string;
  repeatPattern?: 'daily' | 'weekly' | 'monthly';
  enabled: boolean;
  createdAt: string;
}

// Questionnaire Types
export interface QuestionnaireAnswer {
  ageGroup: string;
  concerns: string[];
  challenges: string[];
  stressLevel: string;
  schoolType: string;
}

// Navigation Types
export type OnboardingPath = 'A' | 'B';

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Filter Types
export interface TherapistFilter {
  specialization?: string;
  language?: string;
  priceRange?: { min: number; max: number };
  rating?: number;
  availability?: string;
  mode?: 'online' | 'in-person' | 'both';
  distance?: number;
}

export interface ResourceFilter {
  category?: string;
  type?: string;
  premium?: boolean;
  tags?: string[];
}
