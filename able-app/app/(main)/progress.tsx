import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  TrendingUp,
  Target,
  Award,
  CheckCircle,
  Circle,
} from 'lucide-react-native';
import { Card, ProgressBar, Badge } from '../../componentsui';
import { Colors, Gradients } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../constants/spacing';

const mockGoals = [
  {
    id: '1',
    title: 'Improve Speech Clarity',
    category: 'Speech',
    progress: 75,
    milestones: [
      { id: 'm1', title: 'Basic sounds', completed: true },
      { id: 'm2', title: 'Two-word phrases', completed: true },
      { id: 'm3', title: 'Short sentences', completed: true },
      { id: 'm4', title: 'Conversation skills', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Build Focus Duration',
    category: 'Attention',
    progress: 60,
    milestones: [
      { id: 'm1', title: '5 minutes focus', completed: true },
      { id: 'm2', title: '10 minutes focus', completed: true },
      { id: 'm3', title: '15 minutes focus', completed: false },
      { id: 'm4', title: '20 minutes focus', completed: false },
    ],
  },
  {
    id: '3',
    title: 'Social Interaction',
    category: 'Social',
    progress: 45,
    milestones: [
      { id: 'm1', title: 'Eye contact', completed: true },
      { id: 'm2', title: 'Turn-taking', completed: true },
      { id: 'm3', title: 'Group play', completed: false },
      { id: 'm4', title: 'Making friends', completed: false },
    ],
  },
];

const stats = {
  totalSessions: 24,
  goalsAchieved: 5,
  streak: 12,
  overallProgress: 72,
};

export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={IconSize.md} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Progress Tracking</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Overall Progress Card */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <LinearGradient
            colors={Gradients.primary as [string, string]}
            style={styles.overallCard}
          >
            <View style={styles.overallHeader}>
              <TrendingUp size={IconSize.lg} color={Colors.white} />
              <Text style={styles.overallTitle}>Overall Progress</Text>
            </View>
            <View style={styles.overallProgressContainer}>
              <View style={styles.progressCircle}>
                <Text style={styles.progressPercent}>{stats.overallProgress}%</Text>
              </View>
              <View style={styles.overallStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{stats.totalSessions}</Text>
                  <Text style={styles.statLabel}>Sessions</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{stats.goalsAchieved}</Text>
                  <Text style={styles.statLabel}>Goals Met</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{stats.streak}</Text>
                  <Text style={styles.statLabel}>Day Streak</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </MotiView>

        {/* Goals Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={IconSize.md} color={Colors.primary[600]} />
            <Text style={styles.sectionTitle}>Active Goals</Text>
          </View>

          {mockGoals.map((goal, index) => (
            <MotiView
              key={goal.id}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'timing', duration: 400, delay: 200 + index * 100 }}
            >
              <Card variant="elevated" padding="medium" style={styles.goalCard}>
                <View style={styles.goalHeader}>
                  <View style={styles.goalInfo}>
                    <Text style={styles.goalTitle}>{goal.title}</Text>
                    <Badge label={goal.category} variant="primary" size="small" />
                  </View>
                  <Text style={styles.goalPercent}>{goal.progress}%</Text>
                </View>

                <ProgressBar
                  progress={goal.progress}
                  variant="gradient"
                  height={8}
                  style={styles.goalProgressBar}
                />

                <View style={styles.milestonesContainer}>
                  <Text style={styles.milestonesLabel}>Milestones</Text>
                  <View style={styles.milestones}>
                    {goal.milestones.map((milestone) => (
                      <View key={milestone.id} style={styles.milestoneItem}>
                        {milestone.completed ? (
                          <CheckCircle
                            size={IconSize.sm}
                            color={Colors.success.main}
                            fill={Colors.success.light}
                          />
                        ) : (
                          <Circle size={IconSize.sm} color={Colors.gray[300]} />
                        )}
                        <Text
                          style={[
                            styles.milestoneText,
                            milestone.completed && styles.milestoneCompleted,
                          ]}
                        >
                          {milestone.title}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </Card>
            </MotiView>
          ))}
        </View>

        {/* Achievement Card */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 600 }}
          style={styles.section}
        >
          <Card
            variant="gradient"
            gradientColors={[Colors.warning.main, Colors.warning.dark]}
            padding="large"
            style={styles.achievementCard}
          >
            <Award size={IconSize['2xl']} color={Colors.white} />
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>Great Progress!</Text>
              <Text style={styles.achievementText}>
                Your child has shown consistent improvement over the last month.
                Keep up the amazing work!
              </Text>
            </View>
          </Card>
        </MotiView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  scrollContent: {
    paddingBottom: Spacing['2xl'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...Typography.h4,
    color: Colors.text.primary,
  },
  placeholder: {
    width: 44,
  },
  overallCard: {
    marginHorizontal: Spacing.xl,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  overallHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  overallTitle: {
    ...Typography.h5,
    color: Colors.white,
  },
  overallProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Colors.white,
  },
  progressPercent: {
    ...Typography.h2,
    color: Colors.white,
  },
  overallStats: {
    flex: 1,
    marginLeft: Spacing.xl,
    gap: Spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statValue: {
    ...Typography.h4,
    color: Colors.white,
  },
  statLabel: {
    ...Typography.bodySmall,
    color: Colors.white,
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h5,
    color: Colors.text.primary,
  },
  goalCard: {
    marginBottom: Spacing.md,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  goalInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  goalTitle: {
    ...Typography.h5,
    color: Colors.text.primary,
  },
  goalPercent: {
    ...Typography.h4,
    color: Colors.primary[600],
  },
  goalProgressBar: {
    marginBottom: Spacing.md,
  },
  milestonesContainer: {
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  milestonesLabel: {
    ...Typography.labelSmall,
    color: Colors.text.tertiary,
    marginBottom: Spacing.sm,
  },
  milestones: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: '48%',
  },
  milestoneText: {
    ...Typography.caption,
    color: Colors.text.secondary,
    flex: 1,
  },
  milestoneCompleted: {
    color: Colors.success.main,
    textDecorationLine: 'line-through',
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    ...Typography.h5,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  achievementText: {
    ...Typography.bodySmall,
    color: Colors.white,
    opacity: 0.9,
    lineHeight: 20,
  },
});
