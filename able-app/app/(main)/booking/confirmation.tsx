import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import {
  CheckCircle,
  Calendar,
  Clock,
  Video,
  Bell,
  Home,
} from 'lucide-react-native';
import { Card, Button, Avatar } from '../../../componentsui';
import { Colors, Gradients } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../../constants/spacing';

export default function ConfirmationScreen() {
  return (
    <LinearGradient
      colors={Gradients.success as [string, string]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.content}>
          {/* Success Icon */}
          <MotiView
            from={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            style={styles.successIcon}
          >
            <View style={styles.iconCircle}>
              <CheckCircle size={64} color={Colors.success.main} fill={Colors.success.light} />
            </View>
          </MotiView>

          {/* Success Message */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500, delay: 300 }}
          >
            <Text style={styles.title}>Session Booked!</Text>
            <Text style={styles.subtitle}>
              Your appointment has been confirmed
            </Text>
          </MotiView>

          {/* Booking Details Card */}
          <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500, delay: 500 }}
          >
            <Card variant="elevated" padding="large" style={styles.detailsCard}>
              {/* Therapist */}
              <View style={styles.therapistRow}>
                <Avatar name="Dr. Priya Sharma" size="large" showBadge />
                <View style={styles.therapistInfo}>
                  <Text style={styles.therapistName}>Dr. Priya Sharma</Text>
                  <Text style={styles.therapistSpecialty}>Speech Therapy</Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Session Details */}
              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <View style={styles.detailIcon}>
                    <Calendar size={IconSize.md} color={Colors.primary[600]} />
                  </View>
                  <View>
                    <Text style={styles.detailLabel}>Date</Text>
                    <Text style={styles.detailValue}>Thursday, 12 December 2024</Text>
                  </View>
                </View>

                <View style={styles.detailItem}>
                  <View style={styles.detailIcon}>
                    <Clock size={IconSize.md} color={Colors.primary[600]} />
                  </View>
                  <View>
                    <Text style={styles.detailLabel}>Time</Text>
                    <Text style={styles.detailValue}>10:00 AM - 10:45 AM</Text>
                  </View>
                </View>

                <View style={styles.detailItem}>
                  <View style={styles.detailIcon}>
                    <Video size={IconSize.md} color={Colors.primary[600]} />
                  </View>
                  <View>
                    <Text style={styles.detailLabel}>Mode</Text>
                    <Text style={styles.detailValue}>Online Video Call</Text>
                  </View>
                </View>
              </View>

              {/* Reminder Note */}
              <View style={styles.reminderNote}>
                <Bell size={IconSize.sm} color={Colors.warning.dark} />
                <Text style={styles.reminderText}>
                  You'll receive a reminder 30 minutes before the session
                </Text>
              </View>
            </Card>
          </MotiView>

          {/* Booking ID */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 500, delay: 700 }}
            style={styles.bookingIdContainer}
          >
            <Text style={styles.bookingIdLabel}>Booking ID</Text>
            <Text style={styles.bookingId}>ABLE-2024-78456</Text>
          </MotiView>
        </View>

        {/* Bottom Buttons */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500, delay: 800 }}
          style={styles.bottomSection}
        >
          <Button
            title="View My Sessions"
            onPress={() => router.replace('/(main)/sessions')}
            fullWidth
            icon={<Calendar size={IconSize.md} color={Colors.white} />}
            iconPosition="left"
          />
          <Button
            title="Go to Home"
            onPress={() => router.replace('/(tabs)')}
            variant="outline"
            fullWidth
            icon={<Home size={IconSize.md} color={Colors.primary[600]} />}
            iconPosition="left"
            style={styles.homeButton}
          />
        </MotiView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing['3xl'],
  },
  successIcon: {
    marginBottom: Spacing.xl,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    ...Typography.h1,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.white,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  detailsCard: {
    width: '100%',
  },
  therapistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  therapistInfo: {
    marginLeft: Spacing.md,
  },
  therapistName: {
    ...Typography.h5,
    color: Colors.text.primary,
  },
  therapistSpecialty: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border.light,
    marginVertical: Spacing.md,
  },
  detailsContainer: {
    gap: Spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  detailLabel: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    marginBottom: 2,
  },
  detailValue: {
    ...Typography.label,
    color: Colors.text.primary,
  },
  reminderNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  reminderText: {
    ...Typography.caption,
    color: Colors.warning.dark,
    flex: 1,
  },
  bookingIdContainer: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  bookingIdLabel: {
    ...Typography.caption,
    color: Colors.white,
    opacity: 0.8,
    marginBottom: 4,
  },
  bookingId: {
    ...Typography.h5,
    color: Colors.white,
    letterSpacing: 2,
  },
  bottomSection: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xl,
    gap: Spacing.sm,
  },
  homeButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: Colors.white,
  },
});
