import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { AlertTriangle, ChevronRight, ClipboardList } from 'lucide-react-native';
import { Button, Card, PriorityBadge } from '../../../componentsui';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../../constants/spacing';
import { useOnboardingStore } from '../../../stores/onboardingStore';

export default function AssessmentResultsScreen() {
  const { assessmentResults } = useOnboardingStore();

  if (!assessmentResults) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No results available</Text>
      </SafeAreaView>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return Colors.error.light;
      case 'medium':
        return Colors.warning.light;
      case 'low':
        return Colors.success.light;
      default:
        return Colors.gray[100];
    }
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
            <ClipboardList size={IconSize['2xl']} color={Colors.primary[600]} />
          </View>
          <Text style={styles.title}>Functional Assessment</Text>
          <Text style={styles.subtitle}>
            Based on your responses, here are the priority areas for your child
          </Text>
        </MotiView>

        {/* Priority Needs */}
        <View style={styles.needsContainer}>
          {assessmentResults.priorityNeeds.map((need, index) => (
            <MotiView
              key={need.id}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'timing', duration: 400, delay: index * 100 }}
            >
              <Card
                variant="default"
                padding="medium"
                style={[
                  styles.needCard,
                  { borderLeftColor: getPriorityColor(need.priority).replace('light', 'main') },
                ]}
              >
                <View style={styles.needHeader}>
                  <View style={styles.needTitleContainer}>
                    <View
                      style={[
                        styles.needIndicator,
                        { backgroundColor: getPriorityColor(need.priority) },
                      ]}
                    >
                      <AlertTriangle
                        size={IconSize.sm}
                        color={
                          need.priority === 'high'
                            ? Colors.error.dark
                            : need.priority === 'medium'
                            ? Colors.warning.dark
                            : Colors.success.dark
                        }
                      />
                    </View>
                    <Text style={styles.needTitle}>{need.area}</Text>
                  </View>
                  <PriorityBadge priority={need.priority} />
                </View>
                <Text style={styles.needDescription}>{need.description}</Text>
              </Card>
            </MotiView>
          ))}
        </View>

        {/* Info Card */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 600 }}
        >
          <Card
            variant="gradient"
            gradientColors={[Colors.primary[500], Colors.teal[500]]}
            padding="medium"
            style={styles.infoCard}
          >
            <Text style={styles.infoText}>
              This assessment is a starting point. We recommend consulting with a
              professional for a comprehensive evaluation.
            </Text>
          </Card>
        </MotiView>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Button
          title="View Strengths & Weaknesses"
          onPress={() => router.push('/(onboarding)/results/strengths')}
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
    backgroundColor: Colors.background.primary,
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
  needsContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  needCard: {
    borderLeftWidth: 4,
  },
  needHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  needTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  needIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  needTitle: {
    ...Typography.h5,
    color: Colors.text.primary,
    flex: 1,
  },
  needDescription: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginLeft: 40,
  },
  infoCard: {
    marginBottom: Spacing.base,
  },
  infoText: {
    ...Typography.bodySmall,
    color: Colors.white,
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
