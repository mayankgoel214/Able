import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import {
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  Star,
  AlertCircle,
} from 'lucide-react-native';
import { Button, Card } from '../../../componentsui';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../../constants/spacing';
import { useOnboardingStore } from '../../../stores/onboardingStore';

export default function StrengthsScreen() {
  const { assessmentResults } = useOnboardingStore();

  if (!assessmentResults) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No results available</Text>
      </SafeAreaView>
    );
  }

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
          <Text style={styles.title}>Strengths & Areas to Grow</Text>
          <Text style={styles.subtitle}>
            Understanding your child's unique profile helps guide support
          </Text>
        </MotiView>

        {/* Two Column Layout */}
        <View style={styles.columnsContainer}>
          {/* Strengths Column */}
          <MotiView
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 500, delay: 200 }}
            style={styles.column}
          >
            <Card
              variant="default"
              padding="medium"
              style={[styles.columnCard, styles.strengthsCard]}
            >
              <View style={styles.columnHeader}>
                <View style={[styles.headerIcon, styles.strengthsIcon]}>
                  <ThumbsUp size={IconSize.md} color={Colors.success.dark} />
                </View>
                <Text style={[styles.columnTitle, styles.strengthsTitle]}>
                  Strengths
                </Text>
              </View>

              <View style={styles.itemsList}>
                {assessmentResults.strengths.map((strength, index) => (
                  <MotiView
                    key={index}
                    from={{ opacity: 0, translateX: -10 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ type: 'timing', duration: 300, delay: 300 + index * 100 }}
                  >
                    <View style={styles.listItem}>
                      <View style={styles.bulletPoint}>
                        <Star size={12} color={Colors.success.main} fill={Colors.success.main} />
                      </View>
                      <Text style={styles.itemText}>{strength}</Text>
                    </View>
                  </MotiView>
                ))}
              </View>
            </Card>
          </MotiView>

          {/* Weaknesses Column */}
          <MotiView
            from={{ opacity: 0, translateX: 20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 500, delay: 300 }}
            style={styles.column}
          >
            <Card
              variant="default"
              padding="medium"
              style={[styles.columnCard, styles.weaknessesCard]}
            >
              <View style={styles.columnHeader}>
                <View style={[styles.headerIcon, styles.weaknessesIcon]}>
                  <ThumbsDown size={IconSize.md} color={Colors.warning.dark} />
                </View>
                <Text style={[styles.columnTitle, styles.weaknessesTitle]}>
                  Areas to Grow
                </Text>
              </View>

              <View style={styles.itemsList}>
                {assessmentResults.weaknesses.map((weakness, index) => (
                  <MotiView
                    key={index}
                    from={{ opacity: 0, translateX: 10 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ type: 'timing', duration: 300, delay: 400 + index * 100 }}
                  >
                    <View style={styles.listItem}>
                      <View style={[styles.bulletPoint, styles.bulletWarning]}>
                        <AlertCircle size={12} color={Colors.warning.main} />
                      </View>
                      <Text style={styles.itemText}>{weakness}</Text>
                    </View>
                  </MotiView>
                ))}
              </View>
            </Card>
          </MotiView>
        </View>

        {/* Encouragement Card */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500, delay: 700 }}
        >
          <Card
            variant="gradient"
            gradientColors={[Colors.teal[500], Colors.primary[500]]}
            padding="large"
            style={styles.encouragementCard}
          >
            <Text style={styles.encouragementEmoji}>
              {'\u{1F31F}'}
            </Text>
            <Text style={styles.encouragementTitle}>
              Every child is unique!
            </Text>
            <Text style={styles.encouragementText}>
              These insights help us connect you with the right support. Your child's
              strengths are their superpowers - we'll build on them!
            </Text>
          </Card>
        </MotiView>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Button
          title="View Your Action Plan"
          onPress={() => router.push('/(onboarding)/results/action-plan')}
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
    marginBottom: Spacing.xl,
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
  columnsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  column: {
    flex: 1,
  },
  columnCard: {
    height: '100%',
  },
  strengthsCard: {
    borderTopWidth: 3,
    borderTopColor: Colors.success.main,
  },
  weaknessesCard: {
    borderTopWidth: 3,
    borderTopColor: Colors.warning.main,
  },
  columnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  strengthsIcon: {
    backgroundColor: Colors.success.light,
  },
  weaknessesIcon: {
    backgroundColor: Colors.warning.light,
  },
  columnTitle: {
    ...Typography.label,
    flex: 1,
  },
  strengthsTitle: {
    color: Colors.success.dark,
  },
  weaknessesTitle: {
    color: Colors.warning.dark,
  },
  itemsList: {
    gap: Spacing.sm,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.success.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
    marginTop: 2,
  },
  bulletWarning: {
    backgroundColor: Colors.warning.light,
  },
  itemText: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
    flex: 1,
    lineHeight: 20,
  },
  encouragementCard: {
    alignItems: 'center',
  },
  encouragementEmoji: {
    fontSize: 40,
    marginBottom: Spacing.sm,
  },
  encouragementTitle: {
    ...Typography.h4,
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  encouragementText: {
    ...Typography.bodySmall,
    color: Colors.white,
    textAlign: 'center',
    opacity: 0.9,
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
