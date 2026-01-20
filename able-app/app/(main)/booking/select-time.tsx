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
import { ArrowLeft, Calendar, Clock, Video, MapPin } from 'lucide-react-native';
import { Card, Button, Avatar } from '../../../componentsui';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../../constants/spacing';

// Mock data
const dates = [
  { date: '12', day: 'Mon', month: 'Dec', full: '2024-12-12' },
  { date: '13', day: 'Tue', month: 'Dec', full: '2024-12-13' },
  { date: '14', day: 'Wed', month: 'Dec', full: '2024-12-14' },
  { date: '15', day: 'Thu', month: 'Dec', full: '2024-12-15' },
  { date: '16', day: 'Fri', month: 'Dec', full: '2024-12-16' },
  { date: '17', day: 'Sat', month: 'Dec', full: '2024-12-17' },
  { date: '18', day: 'Sun', month: 'Dec', full: '2024-12-18' },
];

const timeSlots = {
  morning: ['9:00 AM', '10:00 AM', '11:00 AM'],
  afternoon: ['12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
  evening: ['5:00 PM', '6:00 PM', '7:00 PM'],
};

export default function SelectTimeScreen() {
  const { therapistId } = useLocalSearchParams<{ therapistId: string }>();
  const [selectedDate, setSelectedDate] = useState(dates[0].full);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [sessionMode, setSessionMode] = useState<'online' | 'in-person'>('online');

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      router.push({
        pathname: '/(main)/booking/payment',
        params: {
          therapistId,
          date: selectedDate,
          time: selectedTime,
          mode: sessionMode,
        },
      });
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
          <Text style={styles.headerTitle}>Select Date & Time</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Therapist Summary */}
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 400 }}
        >
          <Card variant="default" padding="medium" style={styles.therapistCard}>
            <View style={styles.therapistInfo}>
              <Avatar name="Dr. Priya Sharma" size="medium" />
              <View style={styles.therapistText}>
                <Text style={styles.therapistName}>Dr. Priya Sharma</Text>
                <Text style={styles.therapistSpecialty}>Speech Therapy</Text>
              </View>
            </View>
          </Card>
        </MotiView>

        {/* Session Mode */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 400, delay: 100 }}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Session Mode</Text>
          <View style={styles.modeContainer}>
            <TouchableOpacity
              style={[
                styles.modeOption,
                sessionMode === 'online' && styles.modeOptionActive,
              ]}
              onPress={() => setSessionMode('online')}
            >
              <Video
                size={IconSize.lg}
                color={sessionMode === 'online' ? Colors.primary[600] : Colors.text.tertiary}
              />
              <Text
                style={[
                  styles.modeText,
                  sessionMode === 'online' && styles.modeTextActive,
                ]}
              >
                Online
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modeOption,
                sessionMode === 'in-person' && styles.modeOptionActive,
              ]}
              onPress={() => setSessionMode('in-person')}
            >
              <MapPin
                size={IconSize.lg}
                color={sessionMode === 'in-person' ? Colors.primary[600] : Colors.text.tertiary}
              />
              <Text
                style={[
                  styles.modeText,
                  sessionMode === 'in-person' && styles.modeTextActive,
                ]}
              >
                In-Person
              </Text>
            </TouchableOpacity>
          </View>
        </MotiView>

        {/* Date Selection */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 400, delay: 200 }}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Calendar size={IconSize.md} color={Colors.primary[600]} />
            <Text style={styles.sectionTitle}>Select Date</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.datesContainer}
          >
            {dates.map((date) => (
              <TouchableOpacity
                key={date.full}
                style={[
                  styles.dateCard,
                  selectedDate === date.full && styles.dateCardActive,
                ]}
                onPress={() => setSelectedDate(date.full)}
              >
                <Text
                  style={[
                    styles.dateDay,
                    selectedDate === date.full && styles.dateDayActive,
                  ]}
                >
                  {date.day}
                </Text>
                <Text
                  style={[
                    styles.dateNumber,
                    selectedDate === date.full && styles.dateNumberActive,
                  ]}
                >
                  {date.date}
                </Text>
                <Text
                  style={[
                    styles.dateMonth,
                    selectedDate === date.full && styles.dateMonthActive,
                  ]}
                >
                  {date.month}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </MotiView>

        {/* Time Selection */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 400, delay: 300 }}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Clock size={IconSize.md} color={Colors.primary[600]} />
            <Text style={styles.sectionTitle}>Select Time</Text>
          </View>

          {/* Morning Slots */}
          <Text style={styles.timeGroupLabel}>Morning</Text>
          <View style={styles.timeSlotsRow}>
            {timeSlots.morning.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.timeSlotActive,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.timeTextActive,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Afternoon Slots */}
          <Text style={styles.timeGroupLabel}>Afternoon</Text>
          <View style={styles.timeSlotsRow}>
            {timeSlots.afternoon.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.timeSlotActive,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.timeTextActive,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Evening Slots */}
          <Text style={styles.timeGroupLabel}>Evening</Text>
          <View style={styles.timeSlotsRow}>
            {timeSlots.evening.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.timeSlotActive,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.timeTextActive,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </MotiView>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Button
          title="Continue to Payment"
          onPress={handleContinue}
          disabled={!selectedDate || !selectedTime}
          fullWidth
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
    ...Typography.h4,
    color: Colors.text.primary,
  },
  placeholder: {
    width: 44,
  },
  therapistCard: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  therapistInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  therapistText: {
    marginLeft: Spacing.md,
  },
  therapistName: {
    ...Typography.label,
    color: Colors.text.primary,
  },
  therapistSpecialty: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
  },
  section: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
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
  modeContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  modeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.base,
    borderRadius: BorderRadius.base,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.border.light,
  },
  modeOptionActive: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[50],
  },
  modeText: {
    ...Typography.label,
    color: Colors.text.tertiary,
  },
  modeTextActive: {
    color: Colors.primary[600],
  },
  datesContainer: {
    gap: Spacing.sm,
  },
  dateCard: {
    width: 70,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.base,
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border.light,
  },
  dateCardActive: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[500],
  },
  dateDay: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    marginBottom: 2,
  },
  dateDayActive: {
    color: Colors.white,
    opacity: 0.9,
  },
  dateNumber: {
    ...Typography.h3,
    color: Colors.text.primary,
  },
  dateNumberActive: {
    color: Colors.white,
  },
  dateMonth: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    marginTop: 2,
  },
  dateMonthActive: {
    color: Colors.white,
    opacity: 0.9,
  },
  timeGroupLabel: {
    ...Typography.labelSmall,
    color: Colors.text.tertiary,
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  timeSlotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  timeSlot: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.base,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border.light,
  },
  timeSlotActive: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[50],
  },
  timeText: {
    ...Typography.label,
    color: Colors.text.secondary,
  },
  timeTextActive: {
    color: Colors.primary[600],
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
});
