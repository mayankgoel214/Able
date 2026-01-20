import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  MapPin,
  Plus,
} from 'lucide-react-native';
import { Card, Avatar, Badge, Button } from '../../../componentsui';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../../constants/spacing';

const mockSessions = [
  {
    id: '1',
    therapist: { name: 'Dr. Sarah Johnson', specialty: 'Speech Therapy' },
    date: '2024-12-12',
    time: '10:00 AM',
    duration: 45,
    mode: 'online' as const,
    status: 'scheduled' as const,
    meetingLink: 'https://meet.google.com/abc-defg-hij',
  },
  {
    id: '2',
    therapist: { name: 'Michael Chen', specialty: 'Occupational Therapy' },
    date: '2024-12-15',
    time: '2:00 PM',
    duration: 60,
    mode: 'in-person' as const,
    status: 'scheduled' as const,
    location: '123 Therapy Center, Suite 456',
  },
  {
    id: '3',
    therapist: { name: 'Dr. Sarah Johnson', specialty: 'Speech Therapy' },
    date: '2024-12-05',
    time: '10:00 AM',
    duration: 45,
    mode: 'online' as const,
    status: 'completed' as const,
  },
  {
    id: '4',
    therapist: { name: 'Dr. Emily Davis', specialty: 'Child Psychology' },
    date: '2024-12-01',
    time: '3:00 PM',
    duration: 60,
    mode: 'online' as const,
    status: 'completed' as const,
  },
];

type Session = typeof mockSessions[0];

const tabs = ['Upcoming', 'Past'];

export default function SessionsScreen() {
  const [activeTab, setActiveTab] = useState('Upcoming');

  const filteredSessions = mockSessions.filter((session) =>
    activeTab === 'Upcoming'
      ? session.status === 'scheduled'
      : session.status === 'completed'
  );

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  const handleJoinSession = (session: Session) => {
    if (session.mode === 'online' && 'meetingLink' in session && session.meetingLink) {
      Alert.alert(
        'Join Session',
        `Ready to join your session with ${session.therapist.name}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Join Now',
            onPress: () => Linking.openURL(session.meetingLink!),
          },
        ]
      );
    } else if (session.mode === 'in-person' && 'location' in session) {
      Alert.alert(
        'Session Location',
        `Your in-person session with ${session.therapist.name}\n\nLocation: ${session.location}\n\nDate: ${formatDate(session.date)}\nTime: ${session.time}`,
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        'Session Info',
        `Your session with ${session.therapist.name} is scheduled for ${formatDate(session.date)} at ${session.time}.`,
        [{ text: 'OK' }]
      );
    }
  };

  const renderSessionCard = ({
    item,
    index,
  }: {
    item: typeof mockSessions[0];
    index: number;
  }) => (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 300, delay: index * 50 }}
    >
      <Card
        variant="elevated"
        padding="medium"
        onPress={() =>
          router.push({
            pathname: '/(main)/sessions/[id]',
            params: { id: item.id },
          })
        }
        style={styles.sessionCard}
      >
        <View style={styles.cardHeader}>
          <Avatar name={item.therapist.name} size="medium" />
          <View style={styles.headerInfo}>
            <Text style={styles.therapistName}>{item.therapist.name}</Text>
            <Text style={styles.specialty}>{item.therapist.specialty}</Text>
          </View>
          <Badge
            label={item.status === 'scheduled' ? 'Upcoming' : 'Completed'}
            variant={item.status === 'scheduled' ? 'primary' : 'success'}
            size="small"
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Calendar size={IconSize.sm} color={Colors.text.tertiary} />
            <Text style={styles.detailText}>{formatDate(item.date)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={IconSize.sm} color={Colors.text.tertiary} />
            <Text style={styles.detailText}>
              {item.time} ({item.duration} min)
            </Text>
          </View>
          <View style={styles.detailItem}>
            {item.mode === 'online' ? (
              <Video size={IconSize.sm} color={Colors.info.main} />
            ) : (
              <MapPin size={IconSize.sm} color={Colors.success.main} />
            )}
            <Text
              style={[
                styles.detailText,
                {
                  color:
                    item.mode === 'online' ? Colors.info.main : Colors.success.main,
                },
              ]}
            >
              {item.mode === 'online' ? 'Online' : 'In-Person'}
            </Text>
          </View>
        </View>

        {item.status === 'scheduled' && (
          <Button
            title={item.mode === 'online' ? 'Join Session' : 'View Details'}
            onPress={() => handleJoinSession(item)}
            size="small"
            fullWidth
            style={styles.joinButton}
          />
        )}
      </Card>
    </MotiView>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={IconSize.md} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Sessions</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/(main)/therapists')}
        >
          <Plus size={IconSize.md} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
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

      {/* Sessions List */}
      <FlatList
        data={filteredSessions}
        renderItem={renderSessionCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {activeTab === 'Upcoming'
                ? 'No upcoming sessions'
                : 'No past sessions'}
            </Text>
            {activeTab === 'Upcoming' && (
              <Button
                title="Book a Session"
                onPress={() => router.push('/(main)/therapists')}
                variant="secondary"
                style={styles.emptyButton}
              />
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
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
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.base,
    gap: Spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.base,
    backgroundColor: Colors.white,
    alignItems: 'center',
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
  listContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  sessionCard: {
    marginBottom: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  headerInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  therapistName: {
    ...Typography.label,
    color: Colors.text.primary,
  },
  specialty: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border.light,
    marginBottom: Spacing.md,
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
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
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Spacing['3xl'],
  },
  emptyText: {
    ...Typography.body,
    color: Colors.text.tertiary,
    marginBottom: Spacing.md,
  },
  emptyButton: {
    minWidth: 180,
  },
});
