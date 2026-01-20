import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Users,
  Calendar,
  DollarSign,
  Clock,
  Video,
  MapPin,
  ChevronRight,
  Bell,
  Settings,
} from 'lucide-react-native';
import { Card, Avatar, Badge, Button } from '../../componentsui';
import { Colors, Gradients } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../constants/spacing';

const providerStats = {
  totalStudents: 24,
  sessionsThisWeek: 18,
  monthlyEarnings: 45000,
  averageRating: 4.8,
};

const todaySessions = [
  {
    id: '1',
    studentName: 'Arjun Patel',
    parentName: 'Meera Patel',
    time: '10:00 AM',
    duration: 45,
    mode: 'online',
    status: 'upcoming',
  },
  {
    id: '2',
    studentName: 'Sanya Sharma',
    parentName: 'Priya Sharma',
    time: '11:30 AM',
    duration: 60,
    mode: 'in-person',
    status: 'in-progress',
  },
  {
    id: '3',
    studentName: 'Rohan Gupta',
    parentName: 'Anita Gupta',
    time: '2:00 PM',
    duration: 45,
    mode: 'online',
    status: 'upcoming',
  },
  {
    id: '4',
    studentName: 'Kavya Reddy',
    parentName: 'Lakshmi Reddy',
    time: '4:00 PM',
    duration: 60,
    mode: 'online',
    status: 'upcoming',
  },
];

const recentStudents = [
  { id: '1', name: 'Arjun Patel', age: 6, lastSession: 'Today' },
  { id: '2', name: 'Sanya Sharma', age: 8, lastSession: 'Today' },
  { id: '3', name: 'Rohan Gupta', age: 5, lastSession: 'Yesterday' },
];

export default function ProviderDashboardScreen() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleJoinSession = (session: typeof todaySessions[0]) => {
    if (session.mode === 'online') {
      Alert.alert(
        'Join Session',
        `Ready to join your session with ${session.studentName}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Join Now',
            onPress: () => Linking.openURL('https://meet.google.com'),
          },
        ]
      );
    }
  };

  const handleNotifications = () => {
    Alert.alert('Notifications', 'You have no new notifications.', [{ text: 'OK' }]);
  };

  const handleSettings = () => {
    Alert.alert(
      'Settings',
      'Provider settings',
      [
        { text: 'Edit Profile', onPress: () => Alert.alert('Coming Soon', 'Profile editing will be available soon.') },
        { text: 'Availability', onPress: () => Alert.alert('Coming Soon', 'Availability settings will be available soon.') },
        { text: 'Log Out', style: 'destructive', onPress: () => router.replace('/provider/login') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleViewAllStudents = () => {
    router.push('/provider/students');
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'schedule':
        Alert.alert('Schedule', 'Your schedule management will be available soon.');
        break;
      case 'students':
        router.push('/provider/students');
        break;
      case 'earnings':
        Alert.alert('Earnings', `This month's earnings: ${formatCurrency(providerStats.monthlyEarnings)}`);
        break;
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
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.providerName}>Dr. Priya Sharma</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton} onPress={handleNotifications}>
              <Bell size={IconSize.md} color={Colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleSettings}>
              <Settings size={IconSize.md} color={Colors.text.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Overview */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <LinearGradient
            colors={[Colors.teal[500], Colors.teal[600]] as [string, string]}
            style={styles.statsCard}
          >
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <View style={styles.statIcon}>
                  <Users size={IconSize.md} color={Colors.teal[600]} />
                </View>
                <Text style={styles.statValue}>{providerStats.totalStudents}</Text>
                <Text style={styles.statLabel}>Students</Text>
              </View>
              <View style={styles.statItem}>
                <View style={styles.statIcon}>
                  <Calendar size={IconSize.md} color={Colors.teal[600]} />
                </View>
                <Text style={styles.statValue}>{providerStats.sessionsThisWeek}</Text>
                <Text style={styles.statLabel}>This Week</Text>
              </View>
              <View style={styles.statItem}>
                <View style={styles.statIcon}>
                  <DollarSign size={IconSize.md} color={Colors.teal[600]} />
                </View>
                <Text style={styles.statValue}>
                  {formatCurrency(providerStats.monthlyEarnings).replace('₹', '₹')}
                </Text>
                <Text style={styles.statLabel}>Earnings</Text>
              </View>
            </View>
          </LinearGradient>
        </MotiView>

        {/* Today's Sessions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Sessions</Text>
            <Text style={styles.sessionCount}>{todaySessions.length} sessions</Text>
          </View>

          {todaySessions.map((session, index) => (
            <MotiView
              key={session.id}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'timing', duration: 300, delay: index * 50 }}
            >
              <Card
                variant="elevated"
                padding="medium"
                onPress={() =>
                  router.push({
                    pathname: '/provider/student/[id]',
                    params: { id: session.id },
                  })
                }
                style={styles.sessionCard}
              >
                <View style={styles.sessionHeader}>
                  <Avatar name={session.studentName} size="medium" />
                  <View style={styles.sessionInfo}>
                    <Text style={styles.studentName}>{session.studentName}</Text>
                    <Text style={styles.parentName}>Parent: {session.parentName}</Text>
                  </View>
                  <Badge
                    label={session.status === 'in-progress' ? 'Live' : 'Upcoming'}
                    variant={session.status === 'in-progress' ? 'error' : 'primary'}
                    size="small"
                  />
                </View>

                <View style={styles.sessionDetails}>
                  <View style={styles.detailItem}>
                    <Clock size={IconSize.sm} color={Colors.text.tertiary} />
                    <Text style={styles.detailText}>
                      {session.time} ({session.duration} min)
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    {session.mode === 'online' ? (
                      <Video size={IconSize.sm} color={Colors.info.main} />
                    ) : (
                      <MapPin size={IconSize.sm} color={Colors.success.main} />
                    )}
                    <Text
                      style={[
                        styles.detailText,
                        {
                          color:
                            session.mode === 'online'
                              ? Colors.info.main
                              : Colors.success.main,
                        },
                      ]}
                    >
                      {session.mode === 'online' ? 'Online' : 'In-Person'}
                    </Text>
                  </View>
                </View>

                {session.status === 'in-progress' && (
                  <Button
                    title="Join Session"
                    onPress={() => handleJoinSession(session)}
                    size="small"
                    fullWidth
                    style={styles.joinButton}
                  />
                )}
              </Card>
            </MotiView>
          ))}
        </View>

        {/* Recent Students */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Students</Text>
            <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllStudents}>
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={IconSize.sm} color={Colors.primary[600]} />
            </TouchableOpacity>
          </View>

          <Card variant="elevated" padding="none" style={styles.studentsCard}>
            {recentStudents.map((student, index) => (
              <TouchableOpacity
                key={student.id}
                style={[
                  styles.studentRow,
                  index < recentStudents.length - 1 && styles.studentRowBorder,
                ]}
                onPress={() =>
                  router.push({
                    pathname: '/provider/student/[id]',
                    params: { id: student.id },
                  })
                }
              >
                <Avatar name={student.name} size="small" />
                <View style={styles.studentInfo}>
                  <Text style={styles.studentRowName}>{student.name}</Text>
                  <Text style={styles.studentAge}>{student.age} years old</Text>
                </View>
                <View style={styles.lastSessionContainer}>
                  <Text style={styles.lastSessionLabel}>Last session</Text>
                  <Text style={styles.lastSessionValue}>{student.lastSession}</Text>
                </View>
                <ChevronRight size={IconSize.sm} color={Colors.gray[400]} />
              </TouchableOpacity>
            ))}
          </Card>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard} onPress={() => handleQuickAction('schedule')}>
              <View style={[styles.actionIcon, { backgroundColor: Colors.primary[100] }]}>
                <Calendar size={IconSize.lg} color={Colors.primary[600]} />
              </View>
              <Text style={styles.actionLabel}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={() => handleQuickAction('students')}>
              <View style={[styles.actionIcon, { backgroundColor: Colors.teal[100] }]}>
                <Users size={IconSize.lg} color={Colors.teal[600]} />
              </View>
              <Text style={styles.actionLabel}>Students</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={() => handleQuickAction('earnings')}>
              <View style={[styles.actionIcon, { backgroundColor: Colors.warning.light }]}>
                <DollarSign size={IconSize.lg} color={Colors.warning.dark} />
              </View>
              <Text style={styles.actionLabel}>Earnings</Text>
            </TouchableOpacity>
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
  },
  headerLeft: {},
  greeting: {
    ...Typography.body,
    color: Colors.text.secondary,
  },
  providerName: {
    ...Typography.h4,
    color: Colors.text.primary,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsCard: {
    marginHorizontal: Spacing.xl,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  statValue: {
    ...Typography.h4,
    color: Colors.white,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.white,
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
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
  },
  sessionCount: {
    ...Typography.bodySmall,
    color: Colors.text.tertiary,
  },
  sessionCard: {
    marginBottom: Spacing.md,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sessionInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  studentName: {
    ...Typography.label,
    color: Colors.text.primary,
  },
  parentName: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  sessionDetails: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
  },
  joinButton: {
    marginTop: Spacing.md,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    ...Typography.labelSmall,
    color: Colors.primary[600],
  },
  studentsCard: {
    overflow: 'hidden',
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  studentRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  studentInfo: {
    flex: 1,
  },
  studentRowName: {
    ...Typography.label,
    color: Colors.text.primary,
  },
  studentAge: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  lastSessionContainer: {
    alignItems: 'flex-end',
  },
  lastSessionLabel: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  lastSessionValue: {
    ...Typography.labelSmall,
    color: Colors.text.secondary,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  actionCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    ...Typography.labelSmall,
    color: Colors.text.secondary,
  },
});
