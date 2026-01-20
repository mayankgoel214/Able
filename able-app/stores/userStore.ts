import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Child,
  Session,
  Document,
  Therapist,
  Goal,
  Reminder,
  Conversation,
} from '../types';

interface UserState {
  // Child data
  children: Child[];
  selectedChildId: string | null;

  // Sessions
  sessions: Session[];
  upcomingSession: Session | null;

  // Documents
  documents: Document[];

  // Care team (connected therapists)
  careTeam: Therapist[];

  // Goals & Progress
  goals: Goal[];

  // Reminders
  reminders: Reminder[];

  // Conversations
  conversations: Conversation[];

  // Actions
  setChildren: (children: Child[]) => void;
  addChild: (child: Child) => void;
  updateChild: (childId: string, updates: Partial<Child>) => void;
  selectChild: (childId: string | null) => void;

  setSessions: (sessions: Session[]) => void;
  addSession: (session: Session) => void;
  updateSession: (sessionId: string, updates: Partial<Session>) => void;

  setDocuments: (documents: Document[]) => void;
  addDocument: (document: Document) => void;
  removeDocument: (documentId: string) => void;

  setCareTeam: (therapists: Therapist[]) => void;
  addToCareTeam: (therapist: Therapist) => void;
  removeFromCareTeam: (therapistId: string) => void;

  setGoals: (goals: Goal[]) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (goalId: string, updates: Partial<Goal>) => void;

  setReminders: (reminders: Reminder[]) => void;
  addReminder: (reminder: Reminder) => void;
  removeReminder: (reminderId: string) => void;

  setConversations: (conversations: Conversation[]) => void;

  reset: () => void;
}

const initialState = {
  children: [],
  selectedChildId: null,
  sessions: [],
  upcomingSession: null,
  documents: [],
  careTeam: [],
  goals: [],
  reminders: [],
  conversations: [],
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Child actions
      setChildren: (children) => set({ children }),
      addChild: (child) =>
        set((state) => ({
          children: [...state.children, child],
          selectedChildId: state.selectedChildId || child.id,
        })),
      updateChild: (childId, updates) =>
        set((state) => ({
          children: state.children.map((c) =>
            c.id === childId ? { ...c, ...updates } : c
          ),
        })),
      selectChild: (childId) => set({ selectedChildId: childId }),

      // Session actions
      setSessions: (sessions) => {
        const upcoming = sessions.find(
          (s) => s.status === 'scheduled' && new Date(s.scheduledAt) > new Date()
        );
        set({ sessions, upcomingSession: upcoming || null });
      },
      addSession: (session) =>
        set((state) => {
          const newSessions = [...state.sessions, session];
          const upcoming = newSessions.find(
            (s) => s.status === 'scheduled' && new Date(s.scheduledAt) > new Date()
          );
          return { sessions: newSessions, upcomingSession: upcoming || null };
        }),
      updateSession: (sessionId, updates) =>
        set((state) => {
          const newSessions = state.sessions.map((s) =>
            s.id === sessionId ? { ...s, ...updates } : s
          );
          const upcoming = newSessions.find(
            (s) => s.status === 'scheduled' && new Date(s.scheduledAt) > new Date()
          );
          return { sessions: newSessions, upcomingSession: upcoming || null };
        }),

      // Document actions
      setDocuments: (documents) => set({ documents }),
      addDocument: (document) =>
        set((state) => ({ documents: [...state.documents, document] })),
      removeDocument: (documentId) =>
        set((state) => ({
          documents: state.documents.filter((d) => d.id !== documentId),
        })),

      // Care team actions
      setCareTeam: (therapists) => set({ careTeam: therapists }),
      addToCareTeam: (therapist) =>
        set((state) => ({ careTeam: [...state.careTeam, therapist] })),
      removeFromCareTeam: (therapistId) =>
        set((state) => ({
          careTeam: state.careTeam.filter((t) => t.id !== therapistId),
        })),

      // Goal actions
      setGoals: (goals) => set({ goals }),
      addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
      updateGoal: (goalId, updates) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === goalId ? { ...g, ...updates } : g
          ),
        })),

      // Reminder actions
      setReminders: (reminders) => set({ reminders }),
      addReminder: (reminder) =>
        set((state) => ({ reminders: [...state.reminders, reminder] })),
      removeReminder: (reminderId) =>
        set((state) => ({
          reminders: state.reminders.filter((r) => r.id !== reminderId),
        })),

      // Conversation actions
      setConversations: (conversations) => set({ conversations }),

      // Reset
      reset: () => set(initialState),
    }),
    {
      name: 'able-user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStore;
