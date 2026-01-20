import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QuestionnaireAnswer, OnboardingPath, AssessmentResult } from '../types';

interface OnboardingState {
  // Onboarding flow state
  hasCompletedOnboarding: boolean;
  selectedLanguage: string;
  selectedPath: OnboardingPath | null;

  // Questionnaire answers
  questionnaireAnswers: Partial<QuestionnaireAnswer>;
  currentStep: number;
  totalSteps: number;

  // Assessment results
  assessmentResults: AssessmentResult | null;

  // Uploaded report (for Path B)
  uploadedReport: {
    name: string;
    uri: string;
    size: number;
  } | null;

  // Actions
  setLanguage: (language: string) => void;
  setPath: (path: OnboardingPath) => void;
  setQuestionnaireAnswer: <K extends keyof QuestionnaireAnswer>(
    key: K,
    value: QuestionnaireAnswer[K]
  ) => void;
  setCurrentStep: (step: number) => void;
  setAssessmentResults: (results: AssessmentResult) => void;
  setUploadedReport: (report: { name: string; uri: string; size: number } | null) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  resetQuestionnaire: () => void;
}

const initialQuestionnaireAnswers: Partial<QuestionnaireAnswer> = {
  ageGroup: '',
  concerns: [],
  challenges: [],
  stressLevel: '',
  schoolType: '',
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      hasCompletedOnboarding: false,
      selectedLanguage: 'en',
      selectedPath: null,
      questionnaireAnswers: initialQuestionnaireAnswers,
      currentStep: 1,
      totalSteps: 5,
      assessmentResults: null,
      uploadedReport: null,

      setLanguage: (language) => set({ selectedLanguage: language }),

      setPath: (path) => set({ selectedPath: path }),

      setQuestionnaireAnswer: (key, value) =>
        set((state) => ({
          questionnaireAnswers: {
            ...state.questionnaireAnswers,
            [key]: value,
          },
        })),

      setCurrentStep: (step) => set({ currentStep: step }),

      setAssessmentResults: (results) => set({ assessmentResults: results }),

      setUploadedReport: (report) => set({ uploadedReport: report }),

      completeOnboarding: () => set({ hasCompletedOnboarding: true }),

      resetOnboarding: () =>
        set({
          hasCompletedOnboarding: false,
          selectedLanguage: 'en',
          selectedPath: null,
          questionnaireAnswers: initialQuestionnaireAnswers,
          currentStep: 1,
          assessmentResults: null,
          uploadedReport: null,
        }),

      resetQuestionnaire: () =>
        set({
          questionnaireAnswers: initialQuestionnaireAnswers,
          currentStep: 1,
          assessmentResults: null,
        }),
    }),
    {
      name: 'able-onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useOnboardingStore;
