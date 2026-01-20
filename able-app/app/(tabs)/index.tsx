import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import {
  Bell,
  Calendar,
  TrendingUp,
  FileText,
  MessageCircle,
  ChevronRight,
  Clock,
  Video,
  Sparkles,
  Bot,
} from 'lucide-react-native';
import { Card, Avatar, Badge, Button } from '../../componentsui';
import { Colors, Gradients } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../constants/spacing';
import { useAuthStore } from '../../stores/authStore';
import { useUserStore } from '../../stores/userStore';

const { width } = Dimensions.get('window');

const quickActions = [
  { id: 'sessions', label: 'Sessions', icon: Calendar, route: '/(main)/sessions' },
  { id: 'progress', label: 'Progress', icon: TrendingUp, route: '/(main)/progress' },
  { id: 'documents', label: 'Documents', icon: FileText, route: '/(main)/documents' },
  { id: 'ai-chat', label: 'AI Help', icon: Sparkles, route: '/(main)/chat' },
];

const mockCareTeam = [
  { id: '1', name: 'Dr. Priya Sharma', role: 'Speech Therapist', avatar: null },
  { id: '2', name: 'Rahul Verma', role: 'Occupational Therapist', avatar: null },
  { id: '3', name: 'Dr. Anita Desai', role: 'Psychologist', avatar: null },
];

const mockNextSession = {
  therapistName: 'Dr. Priya Sharma',
  specialty: 'Speech Therapy',
  date: 'Tomorrow',
  time: '10:00 AM',
  mode: 'online' as const,
};

export default function HomeScreen() {
  const { user } = useAuthStore();
  const { upcomingSession, careTeam } = useUserStore();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Gradient */}
        <LinearGradient
          colors={Gradients.header as [string, string]}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>{getGreeting()},</Text>
              <Text style={styles.userName}>{user?.name || 'Parent'}</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={IconSize.md} color={Colors.white} />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>

          {/* Next Session Card */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500 }}
          >
            <Card variant="elevated" padding="medium" style={styles.sessionCard}>
              <View style={styles.sessionHeader}>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionLabel}>Next Session</Text>
                  <Text style={styles.sessionTherapist}>
                    {mockNextSession.therapistName}
                  </Text>
                  <Text style={styles.sessionSpecialty}>
                    {mockNextSession.specialty}
                  </Text>
                </View>
                <Avatar name={mockNextSession.therapistName} size="large" />
              </View>

              <View style={styles.sessionDetails}>
                <View style={styles.sessionDetailItem}>
                  <Clock size={IconSize.sm} color={Colors.text.tertiary} />
                  <Text style={styles.sessionDetailText}>
                    {mockNextSession.date}, {mockNextSession.time}
                  </Text>
                </View>
                <Badge
                  label={mockNextSession.mode === 'online' ? 'Online' : 'In-Person'}
                  variant={mockNextSession.mode === 'online' ? 'info' : 'success'}
                  size="small"
                  icon={
                    mockNextSession.mode === 'online' ? (
                      <Video size={12} color={Colors.info.dark} />
                    ) : undefined
                  }
                />
              </View>

              <Button
                title="Join Session"
                onPress={() => router.push('/(main)/sessions')}
                size="small"
                fullWidth
                style={styles.joinButton}
              />
            </Card>
          </MotiView>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <MotiView
                  key={action.id}
                  from={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'timing', duration: 300, delay: index * 100 }}
                >
                  <TouchableOpacity
                    style={styles.quickAction}
                    onPress={() => router.push(action.route as any)}
                  >
                    <View style={styles.quickActionIcon}>
                      <Icon size={IconSize.lg} color={Colors.primary[600]} />
                    </View>
                    <Text style={styles.quickActionLabel}>{action.label}</Text>
                  </TouchableOpacity>
                </MotiView>
              );
            })}
          </View>
        </View>

        {/* Care Team */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Care Team</Text>
            <TouchableOpacity
              style={styles.seeAllButton}
              onPress={() => router.push('/(main)/therapists')}
            >
              <Text style={styles.seeAllText}>See All</Text>
              <ChevronRight size={IconSize.sm} color={Colors.primary[600]} />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.careTeamScroll}
          >
            {mockCareTeam.map((member, index) => (
              <MotiView
                key={member.id}
                from={{ opacity: 0, translateX: 20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 300, delay: 200 + index * 100 }}
              >
                <Card variant="default" padding="medium" style={styles.careTeamCard}>
                  <Avatar name={member.name} size="large" />
                  <Text style={styles.careTeamName} numberOfLines={1}>
                    {member.name}
                  </Text>
                  <Text style={styles.careTeamRole} numberOfLines={1}>
                    {member.role}
                  </Text>
                  <TouchableOpacity style={styles.messageButton}>
                    <MessageCircle size={IconSize.sm} color={Colors.primary[600]} />
                  </TouchableOpacity>
                </Card>
              </MotiView>
            ))}

            {/* Add New Card */}
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'timing', duration: 300, delay: 500 }}
            >
              <TouchableOpacity
                style={styles.addCareTeamCard}
                onPress={() => router.push('/(main)/therapists')}
              >
                <View style={styles.addIcon}>
                  <Text style={styles.addIconText}>+</Text>
                </View>
                <Text style={styles.addText}>Find Therapist</Text>
              </TouchableOpacity>
            </MotiView>
          </ScrollView>
        </View>

        {/* AI Assistant Card */}
        <View style={styles.section}>
          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'timing', duration: 400, delay: 300 }}
          >
            <TouchableOpacity
              onPress={() => router.push('/(main)/chat')}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[Colors.teal[500], Colors.teal[600]] as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.aiCard}
              >
                <View style={styles.aiCardContent}>
                  <View style={styles.aiIconContainer}>
                    <Bot size={IconSize.xl} color={Colors.white} />
                  </View>
                  <View style={styles.aiTextContent}>
                    <Text style={styles.aiCardTitle}>ABLE AI Assistant</Text>
                    <Text style={styles.aiCardDescription}>
                      Get instant support, activity ideas, and answers to your questions
                    </Text>
                  </View>
                </View>
                <View style={styles.aiCardAction}>
                  <Text style={styles.aiCardActionText}>Chat Now</Text>
                  <ChevronRight size={IconSize.sm} color={Colors.white} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </MotiView>
        </View>

        {/* Progress Summary */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Progress Overview</Text>
            <TouchableOpacity
              style={styles.seeAllButton}
              onPress={() => router.push('/(main)/progress')}
            >
              <Text style={styles.seeAllText}>Details</Text>
              <ChevronRight size={IconSize.sm} color={Colors.primary[600]} />
            </TouchableOpacity>
          </View>

          <Card variant="elevated" padding="large" style={styles.progressCard}>
            <View style={styles.progressStats}>
              <View style={styles.progressStat}>
                <Text style={styles.progressStatValue}>8</Text>
                <Text style={styles.progressStatLabel}>Sessions</Text>
              </View>
              <View style={styles.progressDivider} />
              <View style={styles.progressStat}>
                <Text style={styles.progressStatValue}>3</Text>
                <Text style={styles.progressStatLabel}>Goals Met</Text>
              </View>
              <View style={styles.progressDivider} />
              <View style={styles.progressStat}>
                <Text style={styles.progressStatValue}>72%</Text>
                <Text style={styles.progressStatLabel}>Progress</Text>
              </View>
            </View>
          </Card>
        </View>
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
  headerGradient: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.base,
    paddingBottom: Spacing['3xl'],
    borderBottomLeftRadius: BorderRadius['2xl'],
    borderBottomRightRadius: BorderRadius['2xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  greeting: {
    ...Typography.body,
    color: Colors.white,
    opacity: 0.9,
  },
  userName: {
    ...Typography.h3,
    color: Colors.white,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.error.main,
    borderWidth: 2,
    borderColor: Colors.primary[500],
  },
  sessionCard: {
    marginTop: Spacing.sm,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionLabel: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    marginBottom: 2,
  },
  sessionTherapist: {
    ...Typography.h5,
    color: Colors.text.primary,
  },
  sessionSpecialty: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
  },
  sessionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sessionDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  sessionDetailText: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
  },
  joinButton: {
    marginTop: Spacing.xs,
  },
  section: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  sectionTitle: {
    ...Typography.h5,
    color: Colors.text.primary,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    ...Typography.labelSmall,
    color: Colors.primary[600],
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  quickAction: {
    width: (width - Spacing.xl * 2 - Spacing.md * 3) / 4,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  quickActionLabel: {
    ...Typography.caption,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  careTeamScroll: {
    paddingRight: Spacing.xl,
    gap: Spacing.md,
  },
  careTeamCard: {
    width: 140,
    alignItems: 'center',
    position: 'relative',
  },
  careTeamName: {
    ...Typography.labelSmall,
    color: Colors.text.primary,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  careTeamRole: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
  messageButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCareTeamCard: {
    width: 140,
    height: 170,
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.primary[300],
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  addIconText: {
    ...Typography.h3,
    color: Colors.primary[600],
  },
  addText: {
    ...Typography.labelSmall,
    color: Colors.primary[600],
  },
  progressCard: {
    backgroundColor: Colors.white,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  progressStat: {
    alignItems: 'center',
  },
  progressStatValue: {
    ...Typography.h2,
    color: Colors.primary[600],
  },
  progressStatLabel: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  progressDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border.light,
  },
  aiCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
  },
  aiCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  aiIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  aiTextContent: {
    flex: 1,
  },
  aiCardTitle: {
    ...Typography.h5,
    color: Colors.white,
    marginBottom: 4,
  },
  aiCardDescription: {
    ...Typography.bodySmall,
    color: Colors.white,
    opacity: 0.9,
    lineHeight: 18,
  },
  aiCardAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  aiCardActionText: {
    ...Typography.label,
    color: Colors.white,
  },
});
