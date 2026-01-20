import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import {
  Calendar,
  Users,
  Eye,
  ChevronRight,
  Rocket,
} from 'lucide-react-native';
import { Button, Card } from '../../../componentsui';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../../constants/spacing';
import { useOnboardingStore } from '../../../stores/onboardingStore';

const timeframeConfig = {
  'this-week': {
    icon: Calendar,
    title: 'This Week',
    color: Colors.primary[600],
    bgColor: Colors.primary[100],
  },
  'who-to-contact': {
    icon: Users,
    title: 'Who to Talk To',
    color: Colors.teal[600],
    bgColor: Colors.teal[100],
  },
  'what-to-watch': {
    icon: Eye,
    title: 'What to Watch For',
    color: Colors.warning.dark,
    bgColor: Colors.warning.light,
  },
};

export default function ActionPlanScreen() {
  const { assessmentResults, completeOnboarding } = useOnboardingStore();

  if (!assessmentResults) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No results available</Text>
      </SafeAreaView>
    );
  }

  const handleContinue = () => {
    router.push('/(onboarding)/support-options');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
          style={styles.header}
        >
          <View style={styles.iconContainer}>
            <Rocket size={IconSize['2xl']} color={Colors.primary[600]} />
          </View>
          <Text style={styles.title}>Your First 3 Steps</Text>
          <Text style={styles.subtitle}>
            Here's a personalized action plan to get you started on the right path
          </Text>
        </MotiView>

        {/* Action Steps */}
        <View style={styles.stepsContainer}>
          {assessmentResults.actionPlan.map((step, index) => {
            const config = timeframeConfig[step.timeframe];
            const Icon = config.icon;

            return (
              <MotiView
                key={step.id}
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 500, delay: 200 + index * 150 }}
              >
                <Card
                  variant="elevated"
                  padding="large"
                  style={styles.stepCard}
                >
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>

                  <View style={styles.stepContent}>
                    <View style={[styles.stepIconContainer, { backgroundColor: config.bgColor }]}>
                      <Icon size={IconSize.lg} color={config.color} />
                    </View>

                    <Text style={[styles.stepTitle, { color: config.color }]}>
                      {config.title}
                    </Text>

                    <Text style={styles.stepDescription}>
                      {step.description}
                    </Text>
                  </View>
                </Card>
              </MotiView>
            );
          })}
        </View>

        {/* Support Message */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 800 }}
        >
          <Card
            variant="outlined"
            padding="medium"
            style={styles.supportCard}
          >
            <Text style={styles.supportEmoji}>{'\u{1F64C}'}</Text>
            <Text style={styles.supportTitle}>You're Not Alone</Text>
            <Text style={styles.supportText}>
              Thousands of families in India are on this journey with you.
              ABLE is here to connect you with verified professionals and a
              supportive community.
            </Text>
          </Card>
        </MotiView>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Button
          title="Explore Support Options"
          onPress={handleContinue}
          fullWidth
          icon={<ChevronRight size={IconSize.md} color={Colors.white} />}
          iconPosition="right"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  title: {
    ...Typography.h2,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  stepsContainer: {
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  stepCard: {
    position: 'relative',
    overflow: 'visible',
  },
  stepNumber: {
    position: 'absolute',
    top: -12,
    left: Spacing.base,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  stepNumberText: {
    ...Typography.labelSmall,
    color: Colors.white,
    fontWeight: '700',
  },
  stepContent: {
    alignItems: 'center',
    paddingTop: Spacing.sm,
  },
  stepIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  stepTitle: {
    ...Typography.h5,
    marginBottom: Spacing.sm,
  },
  stepDescription: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  supportCard: {
    alignItems: 'center',
    borderColor: Colors.primary[200],
    backgroundColor: Colors.primary[50],
  },
  supportEmoji: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  supportTitle: {
    ...Typography.h5,
    color: Colors.primary[700],
    marginBottom: Spacing.sm,
  },
  supportText: {
    ...Typography.bodySmall,
    color: Colors.primary[600],
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomSection: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
});
