import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { FileQuestion, FileCheck, HelpCircle } from 'lucide-react-native';
import { Card, Button } from '../../componentsui';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../constants/spacing';
import { useOnboardingStore } from '../../stores/onboardingStore';

export default function SegmentationScreen() {
  const { setPath } = useOnboardingStore();

  const handlePathA = () => {
    setPath('A');
    router.push('/(onboarding)/questionnaire/1');
  };

  const handlePathB = () => {
    setPath('B');
    router.push('/(onboarding)/upload-report');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
          style={styles.header}
        >
          <View style={styles.iconContainer}>
            <HelpCircle size={IconSize['2xl']} color={Colors.primary[600]} />
          </View>
          <Text style={styles.title}>Let's Get Started</Text>
          <Text style={styles.subtitle}>
            Do you have a diagnosis or assessment report for your child?
          </Text>
        </MotiView>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {/* Path A - No Report */}
          <MotiView
            from={{ opacity: 0, translateX: -30 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 500, delay: 200 }}
          >
            <Card
              variant="outlined"
              onPress={handlePathA}
              padding="large"
              style={styles.optionCard}
            >
              <View style={[styles.optionIcon, { backgroundColor: Colors.warning.light }]}>
                <FileQuestion size={IconSize.xl} color={Colors.warning.dark} />
              </View>
              <Text style={styles.optionTitle}>No, I don't have a report</Text>
              <Text style={styles.optionDescription}>
                I'm looking for guidance and want to understand my child's needs better
              </Text>
              <View style={styles.optionBadge}>
                <Text style={styles.badgeText}>New Parent Path</Text>
              </View>
            </Card>
          </MotiView>

          {/* Path B - Has Report */}
          <MotiView
            from={{ opacity: 0, translateX: 30 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 500, delay: 300 }}
          >
            <Card
              variant="outlined"
              onPress={handlePathB}
              padding="large"
              style={styles.optionCard}
            >
              <View style={[styles.optionIcon, { backgroundColor: Colors.success.light }]}>
                <FileCheck size={IconSize.xl} color={Colors.success.dark} />
              </View>
              <Text style={styles.optionTitle}>Yes, I already have a report</Text>
              <Text style={styles.optionDescription}>
                I have a diagnosis and want to find therapists and organize my child's care
              </Text>
              <View style={[styles.optionBadge, styles.optionBadgeSuccess]}>
                <Text style={[styles.badgeText, styles.badgeTextSuccess]}>
                  Existing Parent Path
                </Text>
              </View>
            </Card>
          </MotiView>
        </View>

        {/* Help Text */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 500 }}
          style={styles.helpSection}
        >
          <Text style={styles.helpText}>
            Not sure? Start with "No report" - you can always upload documents later.
          </Text>
        </MotiView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing['2xl'],
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
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
    lineHeight: 24,
    paddingHorizontal: Spacing.base,
  },
  optionsContainer: {
    gap: Spacing.lg,
  },
  optionCard: {
    alignItems: 'center',
  },
  optionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  optionTitle: {
    ...Typography.h5,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  optionDescription: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.base,
  },
  optionBadge: {
    backgroundColor: Colors.warning.light,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  optionBadgeSuccess: {
    backgroundColor: Colors.success.light,
  },
  badgeText: {
    ...Typography.caption,
    color: Colors.warning.dark,
    fontWeight: '600',
  },
  badgeTextSuccess: {
    color: Colors.success.dark,
  },
  helpSection: {
    marginTop: Spacing['2xl'],
    alignItems: 'center',
  },
  helpText: {
    ...Typography.bodySmall,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
});
