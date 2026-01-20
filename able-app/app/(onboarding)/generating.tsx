import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, Brain, Heart, Target } from 'lucide-react-native';
import { ProgressBar } from '../../componentsui';
import { Colors, Gradients } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, IconSize } from '../../constants/spacing';
import { useOnboardingStore } from '../../stores/onboardingStore';

const steps = [
  { label: 'Analyzing responses...', icon: Brain },
  { label: 'Identifying strengths...', icon: Sparkles },
  { label: 'Finding priority areas...', icon: Target },
  { label: 'Creating your action plan...', icon: Heart },
];

export default function GeneratingScreen() {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { setAssessmentResults, questionnaireAnswers } = useOnboardingStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepIndex = Math.floor(progress / 25);
    if (stepIndex < steps.length) {
      setCurrentStepIndex(stepIndex);
    }
  }, [progress]);

  useEffect(() => {
    if (progress >= 100) {
      // Generate mock assessment results based on answers
      const mockResults = {
        priorityNeeds: [
          {
            id: '1',
            area: 'Speech & Communication',
            description: 'Your child may benefit from speech therapy to improve communication skills',
            priority: 'high' as const,
          },
          {
            id: '2',
            area: 'Social Skills',
            description: 'Building social connections with peers through structured activities',
            priority: 'high' as const,
          },
          {
            id: '3',
            area: 'Focus & Attention',
            description: 'Strategies to improve attention span and reduce distractions',
            priority: 'medium' as const,
          },
          {
            id: '4',
            area: 'Emotional Regulation',
            description: 'Learning to identify and manage big emotions',
            priority: 'medium' as const,
          },
          {
            id: '5',
            area: 'Daily Routines',
            description: 'Establishing predictable routines for smoother transitions',
            priority: 'low' as const,
          },
        ],
        strengths: [
          'Creative thinking',
          'Visual learning ability',
          'Enthusiasm for specific interests',
          'Good memory for facts',
        ],
        weaknesses: [
          'Difficulty with transitions',
          'Sensory sensitivities',
          'Challenges with abstract concepts',
          'Social anxiety in groups',
        ],
        actionPlan: [
          {
            id: '1',
            title: 'This Week',
            description: 'Schedule a consultation with a speech therapist to assess communication needs',
            timeframe: 'this-week' as const,
            completed: false,
          },
          {
            id: '2',
            title: 'Who to Talk To',
            description: 'Consult with a developmental pediatrician or child psychologist for comprehensive evaluation',
            timeframe: 'who-to-contact' as const,
            completed: false,
          },
          {
            id: '3',
            title: 'What to Watch For',
            description: 'Track daily patterns in behavior, sleep, and mood to share with professionals',
            timeframe: 'what-to-watch' as const,
            completed: false,
          },
        ],
      };

      setAssessmentResults(mockResults);

      setTimeout(() => {
        router.replace('/(onboarding)/results/assessment');
      }, 500);
    }
  }, [progress]);

  const CurrentIcon = steps[currentStepIndex]?.icon || Brain;

  return (
    <LinearGradient
      colors={Gradients.header as [string, string]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.content}>
          {/* Animated Icon */}
          <MotiView
            from={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'timing',
              duration: 500,
              loop: true,
            }}
            style={styles.iconContainer}
          >
            <View style={styles.iconCircle}>
              <CurrentIcon size={IconSize['3xl']} color={Colors.primary[600]} />
            </View>
          </MotiView>

          {/* Title */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500 }}
          >
            <Text style={styles.title}>Generating Your Results</Text>
          </MotiView>

          {/* Current Step Label */}
          <MotiView
            key={currentStepIndex}
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 300 }}
            style={styles.stepLabelContainer}
          >
            <Text style={styles.stepLabel}>
              {steps[currentStepIndex]?.label}
            </Text>
          </MotiView>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <ProgressBar
              progress={progress}
              height={8}
              variant="default"
              showLabel
            />
          </View>

          {/* Step Indicators */}
          <View style={styles.stepsContainer}>
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <MotiView
                  key={index}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={{ type: 'timing', duration: 200 }}
                  style={styles.stepIndicator}
                >
                  <View
                    style={[
                      styles.stepDot,
                      isActive && styles.stepDotActive,
                      isCurrent && styles.stepDotCurrent,
                    ]}
                  >
                    <StepIcon
                      size={IconSize.sm}
                      color={isActive ? Colors.white : Colors.gray[400]}
                    />
                  </View>
                </MotiView>
              );
            })}
          </View>

          {/* Info Text */}
          <Text style={styles.infoText}>
            We're analyzing your responses to create a personalized assessment
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  iconContainer: {
    marginBottom: Spacing['2xl'],
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    ...Typography.h2,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.base,
  },
  stepLabelContainer: {
    height: 30,
    marginBottom: Spacing.xl,
  },
  stepLabel: {
    ...Typography.body,
    color: Colors.white,
    opacity: 0.9,
  },
  progressContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: 4,
    marginBottom: Spacing['2xl'],
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.lg,
    marginBottom: Spacing['2xl'],
  },
  stepIndicator: {
    alignItems: 'center',
  },
  stepDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepDotActive: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  stepDotCurrent: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  infoText: {
    ...Typography.bodySmall,
    color: Colors.white,
    opacity: 0.8,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },
});
