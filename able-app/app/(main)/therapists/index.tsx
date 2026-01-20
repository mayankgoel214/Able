import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import {
  ArrowLeft,
  Search,
  Filter,
  Star,
  MapPin,
  Video,
  Clock,
  IndianRupee,
} from 'lucide-react-native';
import { Card, Avatar, Badge, Input, Button } from '../../../componentsui';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../../constants/spacing';

const mockTherapists = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    specializations: ['Speech Therapy', 'Language Development'],
    experience: 8,
    rating: 4.9,
    reviewCount: 124,
    fee: 1500,
    languages: ['English', 'Hindi'],
    location: 'Mumbai',
    distance: '2.5 km',
    availability: 'Available today',
    online: true,
    avatar: null,
    matchPercentage: 95,
  },
  {
    id: '2',
    name: 'Rahul Verma',
    specializations: ['Occupational Therapy', 'Sensory Integration'],
    experience: 12,
    rating: 4.8,
    reviewCount: 98,
    fee: 1800,
    languages: ['English', 'Hindi', 'Marathi'],
    location: 'Mumbai',
    distance: '4.2 km',
    availability: 'Tomorrow',
    online: true,
    avatar: null,
    matchPercentage: 88,
  },
  {
    id: '3',
    name: 'Dr. Anita Desai',
    specializations: ['Child Psychology', 'Behavioral Therapy'],
    experience: 15,
    rating: 4.9,
    reviewCount: 256,
    fee: 2500,
    languages: ['English', 'Hindi', 'Gujarati'],
    location: 'Mumbai',
    distance: '5.8 km',
    availability: 'Available today',
    online: true,
    avatar: null,
    matchPercentage: 92,
  },
  {
    id: '4',
    name: 'Dr. Suresh Kumar',
    specializations: ['Special Education', 'Learning Disabilities'],
    experience: 10,
    rating: 4.7,
    reviewCount: 87,
    fee: 1200,
    languages: ['English', 'Hindi', 'Tamil'],
    location: 'Mumbai',
    distance: '7.1 km',
    availability: 'Day after tomorrow',
    online: false,
    avatar: null,
    matchPercentage: 85,
  },
];

const specializations = [
  'All',
  'Speech',
  'Occupational',
  'Psychology',
  'Special Ed',
];

export default function TherapistsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');

  const filteredTherapists = mockTherapists.filter((therapist) => {
    const matchesSearch =
      searchQuery === '' ||
      therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      therapist.specializations.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesSpec =
      selectedSpec === 'All' ||
      therapist.specializations.some((s) =>
        s.toLowerCase().includes(selectedSpec.toLowerCase())
      );
    return matchesSearch && matchesSpec;
  });

  const renderTherapistCard = ({
    item,
    index,
  }: {
    item: typeof mockTherapists[0];
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
            pathname: '/(main)/therapists/[id]',
            params: { id: item.id },
          })
        }
        style={styles.therapistCard}
      >
        {/* Match Badge */}
        <View style={styles.matchBadge}>
          <Text style={styles.matchText}>{item.matchPercentage}% Match</Text>
        </View>

        {/* Header */}
        <View style={styles.cardHeader}>
          <Avatar name={item.name} size="large" showBadge badgeColor={Colors.success.main} />
          <View style={styles.headerInfo}>
            <Text style={styles.therapistName}>{item.name}</Text>
            <Text style={styles.specialization} numberOfLines={1}>
              {item.specializations.join(' • ')}
            </Text>
            <View style={styles.ratingRow}>
              <Star size={14} color={Colors.warning.main} fill={Colors.warning.main} />
              <Text style={styles.rating}>{item.rating}</Text>
              <Text style={styles.reviewCount}>({item.reviewCount} reviews)</Text>
            </View>
          </View>
        </View>

        {/* Details */}
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <MapPin size={IconSize.xs} color={Colors.text.tertiary} />
            <Text style={styles.detailText}>{item.distance}</Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={IconSize.xs} color={Colors.success.main} />
            <Text style={[styles.detailText, { color: Colors.success.main }]}>
              {item.availability}
            </Text>
          </View>
          {item.online && (
            <Badge
              label="Online"
              variant="info"
              size="small"
              icon={<Video size={10} color={Colors.info.dark} />}
            />
          )}
        </View>

        {/* Footer */}
        <View style={styles.cardFooter}>
          <View style={styles.feeContainer}>
            <IndianRupee size={IconSize.sm} color={Colors.text.primary} />
            <Text style={styles.fee}>{item.fee}</Text>
            <Text style={styles.feeLabel}>/session</Text>
          </View>
          <Button
            title="Book"
            onPress={() =>
              router.push({
                pathname: '/(main)/therapists/[id]',
                params: { id: item.id },
              })
            }
            size="small"
          />
        </View>
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
        <View style={styles.headerText}>
          <Text style={styles.title}>Find Therapists</Text>
          <Text style={styles.subtitle}>
            {filteredTherapists.length} specialists near you
          </Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search by name or specialty..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search size={IconSize.md} color={Colors.text.tertiary} />}
          containerStyle={styles.searchInput}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={IconSize.md} color={Colors.primary[600]} />
        </TouchableOpacity>
      </View>

      {/* Specialization Chips */}
      <View style={styles.chipsContainer}>
        {specializations.map((spec) => (
          <TouchableOpacity
            key={spec}
            style={[
              styles.chip,
              selectedSpec === spec && styles.chipActive,
            ]}
            onPress={() => setSelectedSpec(spec)}
          >
            <Text
              style={[
                styles.chipText,
                selectedSpec === spec && styles.chipTextActive,
              ]}
            >
              {spec}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Therapist List */}
      <FlatList
        data={filteredTherapists}
        renderItem={renderTherapistCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  headerText: {
    flex: 1,
  },
  title: {
    ...Typography.h3,
    color: Colors.text.primary,
  },
  subtitle: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
    marginBottom: Spacing.base,
  },
  searchInput: {
    flex: 1,
    marginBottom: 0,
  },
  filterButton: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.base,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
    marginBottom: Spacing.base,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  chipActive: {
    backgroundColor: Colors.primary[500],
    borderColor: Colors.primary[500],
  },
  chipText: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
  chipTextActive: {
    color: Colors.white,
  },
  listContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  therapistCard: {
    position: 'relative',
    overflow: 'visible',
  },
  matchBadge: {
    position: 'absolute',
    top: -8,
    right: Spacing.base,
    backgroundColor: Colors.success.main,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  matchText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: '700',
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  headerInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  therapistName: {
    ...Typography.h5,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  specialization: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    ...Typography.labelSmall,
    color: Colors.text.primary,
  },
  reviewCount: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feeContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  fee: {
    ...Typography.h4,
    color: Colors.text.primary,
  },
  feeLabel: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    marginLeft: 2,
  },
});
