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
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Video,
  MessageCircle,
  Calendar,
  Award,
  Languages,
  IndianRupee,
  CheckCircle,
} from 'lucide-react-native';
import { Card, Avatar, Badge, Button } from '../../../componentsui';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../../constants/spacing';

// Mock therapist data (in real app, fetch based on id)
const therapistData = {
  id: '1',
  name: 'Dr. Priya Sharma',
  title: 'Speech Language Pathologist',
  specializations: ['Speech Therapy', 'Language Development', 'Articulation'],
  experience: 8,
  rating: 4.9,
  reviewCount: 124,
  fee: 1500,
  sessionDuration: 45,
  languages: ['English', 'Hindi'],
  location: 'Bandra West, Mumbai',
  distance: '2.5 km',
  online: true,
  verified: true,
  avatar: null,
  bio: 'Dr. Priya Sharma is a certified Speech Language Pathologist with over 8 years of experience working with children with various speech and language disorders. She specializes in early intervention and has helped hundreds of families navigate their child\'s communication journey.',
  qualifications: [
    'M.Sc. Speech Language Pathology - AYJNIHH',
    'Certified in PROMPT Therapy',
    'RCI Licensed',
  ],
  availability: [
    { day: 'Mon', slots: ['10:00 AM', '2:00 PM', '4:00 PM'] },
    { day: 'Tue', slots: ['10:00 AM', '11:00 AM', '3:00 PM'] },
    { day: 'Wed', slots: ['2:00 PM', '4:00 PM', '5:00 PM'] },
    { day: 'Thu', slots: ['10:00 AM', '2:00 PM'] },
    { day: 'Fri', slots: ['11:00 AM', '3:00 PM', '4:00 PM'] },
  ],
};

export default function TherapistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

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
          <TouchableOpacity style={styles.messageButton}>
            <MessageCircle size={IconSize.md} color={Colors.primary[600]} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <Card variant="elevated" padding="large" style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <Avatar
                name={therapistData.name}
                size="xlarge"
                showBadge
                badgeColor={Colors.success.main}
              />
              {therapistData.verified && (
                <View style={styles.verifiedBadge}>
                  <CheckCircle size={16} color={Colors.white} fill={Colors.success.main} />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              )}
            </View>

            <Text style={styles.therapistName}>{therapistData.name}</Text>
            <Text style={styles.therapistTitle}>{therapistData.title}</Text>

            <View style={styles.ratingRow}>
              <Star size={18} color={Colors.warning.main} fill={Colors.warning.main} />
              <Text style={styles.rating}>{therapistData.rating}</Text>
              <Text style={styles.reviewCount}>
                ({therapistData.reviewCount} reviews)
              </Text>
              <View style={styles.experienceBadge}>
                <Text style={styles.experienceText}>
                  {therapistData.experience} yrs exp
                </Text>
              </View>
            </View>

            {/* Quick Info */}
            <View style={styles.quickInfo}>
              <View style={styles.quickInfoItem}>
                <MapPin size={IconSize.sm} color={Colors.text.tertiary} />
                <Text style={styles.quickInfoText}>{therapistData.distance}</Text>
              </View>
              <View style={styles.quickInfoItem}>
                <Clock size={IconSize.sm} color={Colors.text.tertiary} />
                <Text style={styles.quickInfoText}>
                  {therapistData.sessionDuration} min session
                </Text>
              </View>
              {therapistData.online && (
                <Badge
                  label="Online Available"
                  variant="info"
                  size="small"
                  icon={<Video size={10} color={Colors.info.dark} />}
                />
              )}
            </View>
          </Card>
        </MotiView>

        {/* Specializations */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 200 }}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Specializations</Text>
          <View style={styles.tagsContainer}>
            {therapistData.specializations.map((spec, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{spec}</Text>
              </View>
            ))}
          </View>
        </MotiView>

        {/* About */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 300 }}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>About</Text>
          <Card variant="default" padding="medium">
            <Text style={styles.bioText}>{therapistData.bio}</Text>
          </Card>
        </MotiView>

        {/* Qualifications */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 400 }}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Qualifications</Text>
          <Card variant="default" padding="medium">
            {therapistData.qualifications.map((qual, index) => (
              <View key={index} style={styles.qualItem}>
                <Award size={IconSize.sm} color={Colors.primary[600]} />
                <Text style={styles.qualText}>{qual}</Text>
              </View>
            ))}
          </Card>
        </MotiView>

        {/* Languages */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 500 }}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={styles.languagesRow}>
            <Languages size={IconSize.md} color={Colors.text.tertiary} />
            <Text style={styles.languagesText}>
              {therapistData.languages.join(', ')}
            </Text>
          </View>
        </MotiView>

        {/* Availability Preview */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 600 }}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Available Slots</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.slotsContainer}
          >
            {therapistData.availability.slice(0, 3).map((day, index) => (
              <Card key={index} variant="outlined" padding="small" style={styles.dayCard}>
                <Text style={styles.dayText}>{day.day}</Text>
                <View style={styles.slotsColumn}>
                  {day.slots.slice(0, 2).map((slot, slotIndex) => (
                    <View key={slotIndex} style={styles.slotBadge}>
                      <Text style={styles.slotText}>{slot}</Text>
                    </View>
                  ))}
                  {day.slots.length > 2 && (
                    <Text style={styles.moreSlots}>+{day.slots.length - 2} more</Text>
                  )}
                </View>
              </Card>
            ))}
          </ScrollView>
        </MotiView>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomSection}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Session Fee</Text>
          <View style={styles.priceRow}>
            <IndianRupee size={IconSize.md} color={Colors.text.primary} />
            <Text style={styles.price}>{therapistData.fee}</Text>
          </View>
        </View>
        <Button
          title="Book Session"
          onPress={() =>
            router.push({
              pathname: '/(main)/booking/select-time',
              params: { therapistId: id },
            })
          }
          icon={<Calendar size={IconSize.md} color={Colors.white} />}
          iconPosition="left"
          style={styles.bookButton}
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
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
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
  messageButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    marginHorizontal: Spacing.xl,
    alignItems: 'center',
  },
  profileHeader: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success.main,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  verifiedText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: '600',
  },
  therapistName: {
    ...Typography.h3,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  therapistTitle: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  rating: {
    ...Typography.h5,
    color: Colors.text.primary,
  },
  reviewCount: {
    ...Typography.bodySmall,
    color: Colors.text.tertiary,
  },
  experienceBadge: {
    backgroundColor: Colors.primary[100],
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    marginLeft: Spacing.sm,
  },
  experienceText: {
    ...Typography.caption,
    color: Colors.primary[700],
    fontWeight: '600',
  },
  quickInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  quickInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  quickInfoText: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
  },
  section: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h5,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  tag: {
    backgroundColor: Colors.primary[50],
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  tagText: {
    ...Typography.labelSmall,
    color: Colors.primary[700],
  },
  bioText: {
    ...Typography.body,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  qualItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  qualText: {
    ...Typography.body,
    color: Colors.text.secondary,
    flex: 1,
  },
  languagesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  languagesText: {
    ...Typography.body,
    color: Colors.text.secondary,
  },
  slotsContainer: {
    gap: Spacing.md,
  },
  dayCard: {
    width: 100,
    alignItems: 'center',
  },
  dayText: {
    ...Typography.labelSmall,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  slotsColumn: {
    gap: Spacing.xs,
    alignItems: 'center',
  },
  slotBadge: {
    backgroundColor: Colors.primary[50],
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  slotText: {
    ...Typography.caption,
    color: Colors.primary[700],
  },
  moreSlots: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    gap: Spacing.lg,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    ...Typography.h3,
    color: Colors.text.primary,
  },
  bookButton: {
    flex: 1,
  },
});
