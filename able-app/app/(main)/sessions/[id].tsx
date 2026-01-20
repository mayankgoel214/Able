import React from 'react';
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
  Calendar,
  Clock,
  Video,
  MapPin,
  Phone,
  MessageCircle,
  FileText,
  Star,
  AlertCircle,
} from 'lucide-react-native';
import { Card, Avatar, Badge, Button } from '../../../componentsui';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../../constants/spacing';

const mockSession = {
  id: '1',
  therapist: {
    name: 'Dr. Priya Sharma',
    specialty: 'Speech Therapy',
    phone: '+91 98765 43210',
    rating: 4.9,
    image: null,
  },
  date: '2024-12-12',
  time: '10:00 AM',
  duration: 45,
  mode: 'online',
  status: 'scheduled',
  notes: 'Focus on articulation and sentence formation exercises.',
  meetingLink: 'https://meet.able.com/session/abc123',
  address: null,
  price: 1500,
};

export default function SessionDetailScreen() {
  const { id } = useLocalSearchParams();

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const isUpcoming = mockSession.status === 'scheduled';

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
          <Text style={styles.headerTitle}>Session Details</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Session Card */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <LinearGradient
            colors={
              isUpcoming
                ? ([Colors.primary[500], Colors.primary[600]] as [string, string])
                : ([Colors.gray[400], Colors.gray[500]] as [string, string])
            }
            style={styles.sessionCard}
          >
            <Badge
              label={isUpcoming ? 'Upcoming' : 'Completed'}
              variant={isUpcoming ? 'warning' : 'success'}
              size="small"
            />
            <View style={styles.dateTimeContainer}>
              <View style={styles.dateTimeItem}>
                <Calendar size={IconSize.md} color={Colors.white} />
                <Text style={styles.dateText}>{formatDate(mockSession.date)}</Text>
              </View>
              <View style={styles.dateTimeItem}>
                <Clock size={IconSize.md} color={Colors.white} />
                <Text style={styles.timeText}>
                  {mockSession.time} ({mockSession.duration} min)
                </Text>
              </View>
            </View>
            <View style={styles.modeContainer}>
              {mockSession.mode === 'online' ? (
                <>
                  <Video size={IconSize.lg} color={Colors.white} />
                  <Text style={styles.modeText}>Online Session</Text>
                </>
              ) : (
                <>
                  <MapPin size={IconSize.lg} color={Colors.white} />
                  <Text style={styles.modeText}>In-Person Session</Text>
                </>
              )}
            </View>
          </LinearGradient>
        </MotiView>

        {/* Therapist Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Therapist</Text>
          <Card variant="elevated" padding="medium">
            <View style={styles.therapistRow}>
              <Avatar name={mockSession.therapist.name} size="large" />
              <View style={styles.therapistInfo}>
                <Text style={styles.therapistName}>{mockSession.therapist.name}</Text>
                <Text style={styles.therapistSpecialty}>
                  {mockSession.therapist.specialty}
                </Text>
                <View style={styles.ratingRow}>
                  <Star
                    size={IconSize.sm}
                    color={Colors.warning.main}
                    fill={Colors.warning.main}
                  />
                  <Text style={styles.ratingText}>{mockSession.therapist.rating}</Text>
                </View>
              </View>
            </View>
            <View style={styles.therapistActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Phone size={IconSize.sm} color={Colors.primary[600]} />
                <Text style={styles.actionButtonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MessageCircle size={IconSize.sm} color={Colors.primary[600]} />
                <Text style={styles.actionButtonText}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  router.push({
                    pathname: '/(main)/therapists/[id]',
                    params: { id: '1' },
                  })
                }
              >
                <FileText size={IconSize.sm} color={Colors.primary[600]} />
                <Text style={styles.actionButtonText}>Profile</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        {/* Session Notes */}
        {mockSession.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Session Notes</Text>
            <Card variant="outlined" padding="medium">
              <Text style={styles.notesText}>{mockSession.notes}</Text>
            </Card>
          </View>
        )}

        {/* Meeting Info */}
        {isUpcoming && mockSession.mode === 'online' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Meeting Information</Text>
            <Card variant="elevated" padding="medium" style={styles.meetingCard}>
              <Video size={IconSize.lg} color={Colors.info.main} />
              <View style={styles.meetingInfo}>
                <Text style={styles.meetingTitle}>Video Call</Text>
                <Text style={styles.meetingSubtitle}>
                  Join link will be available 5 minutes before the session
                </Text>
              </View>
            </Card>
          </View>
        )}

        {/* Price Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <Card variant="outlined" padding="medium">
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Session Fee</Text>
              <Text style={styles.priceValue}>
                ₹{mockSession.price.toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.paymentStatus}>
              <Badge label="Paid" variant="success" size="small" />
            </View>
          </Card>
        </View>

        {/* Cancellation Policy */}
        <View style={styles.section}>
          <Card
            variant="outlined"
            padding="medium"
            style={styles.policyCard}
          >
            <AlertCircle size={IconSize.md} color={Colors.warning.main} />
            <View style={styles.policyInfo}>
              <Text style={styles.policyTitle}>Cancellation Policy</Text>
              <Text style={styles.policyText}>
                Free cancellation up to 24 hours before the session.
                Late cancellations may incur a 50% fee.
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      {isUpcoming && (
        <View style={styles.bottomContainer}>
          <Button
            title="Join Session"
            onPress={() => {}}
            fullWidth
            icon={<Video size={IconSize.md} color={Colors.white} />}
          />
          <TouchableOpacity style={styles.rescheduleButton}>
            <Text style={styles.rescheduleText}>Reschedule or Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  scrollContent: {
    paddingBottom: 150,
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
  sessionCard: {
    marginHorizontal: Spacing.xl,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  dateTimeContainer: {
    marginTop: Spacing.lg,
    gap: Spacing.md,
  },
  dateTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  dateText: {
    ...Typography.h5,
    color: Colors.white,
  },
  timeText: {
    ...Typography.body,
    color: Colors.white,
    opacity: 0.9,
  },
  modeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  modeText: {
    ...Typography.label,
    color: Colors.white,
  },
  section: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h5,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  therapistRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  therapistInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  therapistName: {
    ...Typography.h5,
    color: Colors.text.primary,
  },
  therapistSpecialty: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    ...Typography.labelSmall,
    color: Colors.text.secondary,
  },
  therapistActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Spacing.md,
    marginTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  actionButtonText: {
    ...Typography.labelSmall,
    color: Colors.primary[600],
  },
  notesText: {
    ...Typography.body,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  meetingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  meetingInfo: {
    flex: 1,
  },
  meetingTitle: {
    ...Typography.label,
    color: Colors.text.primary,
  },
  meetingSubtitle: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    ...Typography.body,
    color: Colors.text.secondary,
  },
  priceValue: {
    ...Typography.h4,
    color: Colors.text.primary,
  },
  paymentStatus: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  policyCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    backgroundColor: Colors.warning.light,
    borderColor: Colors.warning.main,
  },
  policyInfo: {
    flex: 1,
  },
  policyTitle: {
    ...Typography.label,
    color: Colors.warning.dark,
  },
  policyText: {
    ...Typography.caption,
    color: Colors.warning.dark,
    marginTop: 2,
    lineHeight: 18,
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
  rescheduleButton: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  rescheduleText: {
    ...Typography.labelSmall,
    color: Colors.error.main,
  },
});
