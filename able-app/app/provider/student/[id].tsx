import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Clock,
  FileText,
  Target,
  TrendingUp,
  MessageCircle,
  Plus,
  CheckCircle,
  Circle,
} from 'lucide-react-native';
import { Card, Avatar, Badge, Button, ProgressBar } from '../../../componentsui';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../../constants/spacing';

const mockStudent = {
  id: '1',
  name: 'Arjun Patel',
  age: 6,
  diagnosis: 'Autism Spectrum Disorder',
  parent: {
    name: 'Meera Patel',
    phone: '+91 98765 43210',
    email: 'meera.patel@email.com',
  },
  enrolledSince: '2024-06-15',
  totalSessions: 28,
  goalsProgress: 65,
  goals: [
    {
      id: '1',
      title: 'Improve verbal communication',
      progress: 75,
      status: 'in-progress',
    },
    {
      id: '2',
      title: 'Increase attention span to 15 minutes',
      progress: 60,
      status: 'in-progress',
    },
    {
      id: '3',
      title: 'Follow 2-step instructions',
      progress: 90,
      status: 'near-complete',
    },
    {
      id: '4',
      title: 'Initiate peer interaction',
      progress: 40,
      status: 'in-progress',
    },
  ],
  recentNotes: [
    {
      id: '1',
      date: '2024-12-10',
      summary: 'Good progress in articulation exercises. Arjun successfully completed 3-word sentences.',
    },
    {
      id: '2',
      date: '2024-12-07',
      summary: 'Focused on turn-taking activities. Showed improvement in waiting for his turn.',
    },
  ],
  upcomingSessions: [
    { id: '1', date: '2024-12-12', time: '10:00 AM', mode: 'online' },
    { id: '2', date: '2024-12-15', time: '10:00 AM', mode: 'online' },
  ],
};

const tabs = ['Overview', 'Goals', 'Sessions', 'Notes'];

export default function StudentDetailScreen() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('Overview');

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const renderOverview = () => (
    <>
      {/* Parent Contact */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Parent Contact</Text>
        <Card variant="elevated" padding="medium">
          <View style={styles.contactRow}>
            <Avatar name={mockStudent.parent.name} size="medium" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{mockStudent.parent.name}</Text>
              <Text style={styles.contactLabel}>Parent/Guardian</Text>
            </View>
          </View>
          <View style={styles.contactActions}>
            <TouchableOpacity style={styles.contactButton}>
              <Phone size={IconSize.sm} color={Colors.primary[600]} />
              <Text style={styles.contactButtonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <Mail size={IconSize.sm} color={Colors.primary[600]} />
              <Text style={styles.contactButtonText}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <MessageCircle size={IconSize.sm} color={Colors.primary[600]} />
              <Text style={styles.contactButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>

      {/* Quick Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <View style={styles.statsRow}>
          <Card variant="outlined" padding="medium" style={styles.statCard}>
            <Calendar size={IconSize.md} color={Colors.primary[500]} />
            <Text style={styles.statValue}>{mockStudent.totalSessions}</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </Card>
          <Card variant="outlined" padding="medium" style={styles.statCard}>
            <Target size={IconSize.md} color={Colors.teal[500]} />
            <Text style={styles.statValue}>{mockStudent.goals.length}</Text>
            <Text style={styles.statLabel}>Active Goals</Text>
          </Card>
          <Card variant="outlined" padding="medium" style={styles.statCard}>
            <TrendingUp size={IconSize.md} color={Colors.success.main} />
            <Text style={styles.statValue}>{mockStudent.goalsProgress}%</Text>
            <Text style={styles.statLabel}>Progress</Text>
          </Card>
        </View>
      </View>

      {/* Recent Notes */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Notes</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {mockStudent.recentNotes.map((note) => (
          <Card key={note.id} variant="elevated" padding="medium" style={styles.noteCard}>
            <View style={styles.noteHeader}>
              <FileText size={IconSize.sm} color={Colors.text.tertiary} />
              <Text style={styles.noteDate}>{formatDate(note.date)}</Text>
            </View>
            <Text style={styles.noteSummary}>{note.summary}</Text>
          </Card>
        ))}
      </View>

      {/* Upcoming Sessions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
        {mockStudent.upcomingSessions.map((session) => (
          <Card key={session.id} variant="outlined" padding="medium" style={styles.upcomingCard}>
            <View style={styles.upcomingRow}>
              <View style={styles.upcomingInfo}>
                <Text style={styles.upcomingDate}>{formatDate(session.date)}</Text>
                <Text style={styles.upcomingTime}>{session.time}</Text>
              </View>
              <Badge
                label={session.mode === 'online' ? 'Online' : 'In-Person'}
                variant={session.mode === 'online' ? 'info' : 'success'}
                size="small"
              />
            </View>
          </Card>
        ))}
      </View>
    </>
  );

  const renderGoals = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Active Goals</Text>
        <TouchableOpacity style={styles.addGoalButton}>
          <Plus size={IconSize.sm} color={Colors.primary[600]} />
          <Text style={styles.addGoalText}>Add Goal</Text>
        </TouchableOpacity>
      </View>
      {mockStudent.goals.map((goal, index) => (
        <MotiView
          key={goal.id}
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 300, delay: index * 50 }}
        >
          <Card variant="elevated" padding="medium" style={styles.goalCard}>
            <View style={styles.goalHeader}>
              {goal.progress >= 90 ? (
                <CheckCircle size={IconSize.md} color={Colors.success.main} />
              ) : (
                <Circle size={IconSize.md} color={Colors.gray[300]} />
              )}
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>{goal.title}</Text>
                <Badge
                  label={goal.status === 'near-complete' ? 'Near Complete' : 'In Progress'}
                  variant={goal.status === 'near-complete' ? 'success' : 'primary'}
                  size="small"
                />
              </View>
              <Text style={styles.goalPercent}>{goal.progress}%</Text>
            </View>
            <ProgressBar
              progress={goal.progress}
              variant={goal.progress >= 90 ? 'success' : 'primary'}
              height={6}
              style={styles.goalProgress}
            />
          </Card>
        </MotiView>
      ))}
    </View>
  );

  const renderSessions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Session History</Text>
      <Text style={styles.comingSoon}>Coming soon...</Text>
    </View>
  );

  const renderNotes = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Session Notes</Text>
        <TouchableOpacity style={styles.addGoalButton}>
          <Plus size={IconSize.sm} color={Colors.primary[600]} />
          <Text style={styles.addGoalText}>Add Note</Text>
        </TouchableOpacity>
      </View>
      {mockStudent.recentNotes.map((note) => (
        <Card key={note.id} variant="elevated" padding="medium" style={styles.noteCard}>
          <View style={styles.noteHeader}>
            <FileText size={IconSize.sm} color={Colors.text.tertiary} />
            <Text style={styles.noteDate}>{formatDate(note.date)}</Text>
          </View>
          <Text style={styles.noteSummary}>{note.summary}</Text>
        </Card>
      ))}
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return renderOverview();
      case 'Goals':
        return renderGoals();
      case 'Sessions':
        return renderSessions();
      case 'Notes':
        return renderNotes();
      default:
        return renderOverview();
    }
  };

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
          <Text style={styles.headerTitle}>Student Profile</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Student Info Card */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <LinearGradient
            colors={[Colors.primary[500], Colors.primary[600]] as [string, string]}
            style={styles.profileCard}
          >
            <Avatar name={mockStudent.name} size="large" style={styles.avatar} />
            <Text style={styles.studentName}>{mockStudent.name}</Text>
            <Text style={styles.studentAge}>{mockStudent.age} years old</Text>
            <Badge label={mockStudent.diagnosis} variant="warning" size="small" />
            <Text style={styles.enrolledText}>
              Enrolled since {formatDate(mockStudent.enrolledSince)}
            </Text>
          </LinearGradient>
        </MotiView>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tabs}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tab, activeTab === tab && styles.tabActive]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text
                    style={[styles.tabText, activeTab === tab && styles.tabTextActive]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Tab Content */}
        {renderContent()}
      </ScrollView>

      {/* Add Session Button */}
      <View style={styles.bottomContainer}>
        <Button
          title="Schedule New Session"
          onPress={() => {}}
          fullWidth
          icon={<Calendar size={IconSize.md} color={Colors.white} />}
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
    paddingBottom: 100,
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
    ...Typography.h5,
    color: Colors.text.primary,
  },
  placeholder: {
    width: 44,
  },
  profileCard: {
    marginHorizontal: Spacing.xl,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatar: {
    marginBottom: Spacing.md,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  studentName: {
    ...Typography.h4,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  studentAge: {
    ...Typography.body,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: Spacing.sm,
  },
  enrolledText: {
    ...Typography.caption,
    color: Colors.white,
    opacity: 0.8,
    marginTop: Spacing.md,
  },
  tabsContainer: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  tabs: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  tab: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
  },
  tabActive: {
    backgroundColor: Colors.primary[500],
  },
  tabText: {
    ...Typography.label,
    color: Colors.text.secondary,
  },
  tabTextActive: {
    color: Colors.white,
  },
  section: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h5,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  viewAllText: {
    ...Typography.labelSmall,
    color: Colors.primary[600],
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  contactInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  contactName: {
    ...Typography.label,
    color: Colors.text.primary,
  },
  contactLabel: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  contactActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  contactButtonText: {
    ...Typography.labelSmall,
    color: Colors.primary[600],
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statValue: {
    ...Typography.h4,
    color: Colors.text.primary,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  noteCard: {
    marginBottom: Spacing.sm,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  noteDate: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  noteSummary: {
    ...Typography.body,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  upcomingCard: {
    marginBottom: Spacing.sm,
  },
  upcomingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upcomingInfo: {},
  upcomingDate: {
    ...Typography.label,
    color: Colors.text.primary,
  },
  upcomingTime: {
    ...Typography.bodySmall,
    color: Colors.text.tertiary,
  },
  addGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  addGoalText: {
    ...Typography.labelSmall,
    color: Colors.primary[600],
  },
  goalCard: {
    marginBottom: Spacing.md,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  goalInfo: {
    flex: 1,
    marginLeft: Spacing.md,
    gap: Spacing.xs,
  },
  goalTitle: {
    ...Typography.label,
    color: Colors.text.primary,
  },
  goalPercent: {
    ...Typography.h5,
    color: Colors.primary[600],
  },
  goalProgress: {
    marginTop: Spacing.xs,
  },
  comingSoon: {
    ...Typography.body,
    color: Colors.text.tertiary,
    textAlign: 'center',
    paddingVertical: Spacing['2xl'],
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
});
