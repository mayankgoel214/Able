import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import {
  MessageCircle,
  BookOpen,
  Target,
  Users,
  GraduationCap,
  Clock,
  Heart,
  School,
  Home,
  AlertCircle,
} from 'lucide-react-native';
import { Button, SelectableCard, MultiSelectOption, StepProgress } from '../../../componentsui';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Spacing, IconSize } from '../../../constants/spacing';
import { useOnboardingStore } from '../../../stores/onboardingStore';
import {
  AGE_GROUPS,
  CONCERNS,
  DAILY_CHALLENGES,
  STRESS_LEVELS,
  SCHOOL_TYPES,
} from '../../../constants';

const iconMap: Record<string, React.ReactNode> = {
  'message-circle': <MessageCircle size={IconSize.md} color={Colors.primary[600]} />,
  'book-open': <BookOpen size={IconSize.md} color={Colors.primary[600]} />,
  target: <Target size={IconSize.md} color={Colors.primary[600]} />,
  users: <Users size={IconSize.md} color={Colors.primary[600]} />,
  'graduation-cap': <GraduationCap size={IconSize.md} color={Colors.primary[600]} />,
  clock: <Clock size={IconSize.md} color={Colors.primary[600]} />,
  heart: <Heart size={IconSize.md} color={Colors.primary[600]} />,
};

export default function QuestionnaireStep() {
  const { step } = useLocalSearchParams<{ step: string }>();
  const currentStep = parseInt(step || '1', 10);

  const {
    questionnaireAnswers,
    setQuestionnaireAnswer,
    setCurrentStep,
    totalSteps,
  } = useOnboardingStore();

  React.useEffect(() => {
    setCurrentStep(currentStep);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      router.push(`/(onboarding)/questionnaire/${currentStep + 1}`);
    } else {
      router.push('/(onboarding)/generating');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      router.push(`/(onboarding)/questionnaire/${currentStep - 1}`);
    } else {
      router.back();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!questionnaireAnswers.ageGroup;
      case 2:
        return (questionnaireAnswers.concerns?.length || 0) > 0;
      case 3:
        return (questionnaireAnswers.challenges?.length || 0) > 0;
      case 4:
        return !!questionnaireAnswers.stressLevel;
      case 5:
        return !!questionnaireAnswers.schoolType;
      default:
        return false;
    }
  };

  const renderStep1 = () => (
    <>
      <Text style={styles.questionTitle}>What is your child's age?</Text>
      <Text style={styles.questionSubtitle}>
        This helps us provide age-appropriate resources
      </Text>
      <View style={styles.optionsGrid}>
        {AGE_GROUPS.map((age) => (
          <SelectableCard
            key={age.id}
            title={age.label}
            description={age.description}
            selected={questionnaireAnswers.ageGroup === age.id}
            onSelect={() => setQuestionnaireAnswer('ageGroup', age.id)}
            style={styles.gridCard}
          />
        ))}
      </View>
    </>
  );

  const renderStep2 = () => (
    <>
      <Text style={styles.questionTitle}>What are your main concerns?</Text>
      <Text style={styles.questionSubtitle}>
        Select all that apply
      </Text>
      <View style={styles.optionsList}>
        {CONCERNS.map((concern) => (
          <MultiSelectOption
            key={concern.id}
            label={concern.label}
            icon={iconMap[concern.icon]}
            selected={questionnaireAnswers.concerns?.includes(concern.id) || false}
            onToggle={() => {
              const current = questionnaireAnswers.concerns || [];
              const updated = current.includes(concern.id)
                ? current.filter((c) => c !== concern.id)
                : [...current, concern.id];
              setQuestionnaireAnswer('concerns', updated);
            }}
          />
        ))}
      </View>
    </>
  );

  const renderStep3 = () => (
    <>
      <Text style={styles.questionTitle}>What daily challenges do you face?</Text>
      <Text style={styles.questionSubtitle}>
        Select all that apply
      </Text>
      <View style={styles.optionsList}>
        {DAILY_CHALLENGES.map((challenge) => (
          <MultiSelectOption
            key={challenge.id}
            label={challenge.label}
            icon={iconMap[challenge.icon]}
            selected={questionnaireAnswers.challenges?.includes(challenge.id) || false}
            onToggle={() => {
              const current = questionnaireAnswers.challenges || [];
              const updated = current.includes(challenge.id)
                ? current.filter((c) => c !== challenge.id)
                : [...current, challenge.id];
              setQuestionnaireAnswer('challenges', updated);
            }}
          />
        ))}
      </View>
    </>
  );

  const renderStep4 = () => (
    <>
      <Text style={styles.questionTitle}>How are you feeling about all this?</Text>
      <Text style={styles.questionSubtitle}>
        It's okay to feel overwhelmed - we're here to help
      </Text>
      <View style={styles.optionsList}>
        {STRESS_LEVELS.map((level) => (
          <SelectableCard
            key={level.id}
            title={level.label}
            selected={questionnaireAnswers.stressLevel === level.id}
            onSelect={() => setQuestionnaireAnswer('stressLevel', level.id)}
            variant="horizontal"
            icon={
              <View style={[styles.stressIcon, { backgroundColor: `${level.color}20` }]}>
                <AlertCircle size={IconSize.md} color={level.color} />
              </View>
            }
          />
        ))}
      </View>
    </>
  );

  const renderStep5 = () => (
    <>
      <Text style={styles.questionTitle}>What type of school is your child in?</Text>
      <Text style={styles.questionSubtitle}>
        This helps us tailor our recommendations
      </Text>
      <View style={styles.optionsGrid}>
        {SCHOOL_TYPES.map((type, index) => {
          const icons = [
            <School size={IconSize.lg} color={Colors.primary[600]} />,
            <Heart size={IconSize.lg} color={Colors.primary[600]} />,
            <Home size={IconSize.lg} color={Colors.primary[600]} />,
            <AlertCircle size={IconSize.lg} color={Colors.primary[600]} />,
          ];
          return (
            <SelectableCard
              key={type.id}
              title={type.label}
              selected={questionnaireAnswers.schoolType === type.id}
              onSelect={() => setQuestionnaireAnswer('schoolType', type.id)}
              style={styles.gridCard}
              icon={icons[index]}
            />
          );
        })}
      </View>
    </>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      default:
        return renderStep1();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={IconSize.md} color={Colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MotiView
          key={currentStep}
          from={{ opacity: 0, translateX: 20 }}
          animate={{ opacity: 1, translateX: 0 }}
          exit={{ opacity: 0, translateX: -20 }}
          transition={{ type: 'timing', duration: 300 }}
        >
          {renderCurrentStep()}
        </MotiView>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Button
          title={currentStep === totalSteps ? 'See My Results' : 'Continue'}
          onPress={handleNext}
          disabled={!canProceed()}
          fullWidth
          icon={<ArrowRight size={IconSize.md} color={Colors.white} />}
          iconPosition="right"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
    gap: Spacing.base,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  questionTitle: {
    ...Typography.h3,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  questionSubtitle: {
    ...Typography.body,
    color: Colors.text.secondary,
    marginBottom: Spacing.xl,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  gridCard: {
    width: '47%',
  },
  optionsList: {
    gap: Spacing.md,
  },
  stressIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
});
