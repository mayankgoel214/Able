import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import {
  ArrowLeft,
  Search,
  Filter,
  Users,
  TrendingUp,
} from 'lucide-react-native';
import { Card, Avatar, Badge, ProgressBar } from '../../componentsui';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../constants/spacing';

const mockStudents = [
  {
    id: '1',
    name: 'Arjun Patel',
    age: 6,
    diagnosis: 'ASD',
    parentName: 'Meera Patel',
    progress: 75,
    lastSession: '2024-12-10',
    totalSessions: 28,
    status: 'active',
  },
  {
    id: '2',
    name: 'Sanya Sharma',
    age: 8,
    diagnosis: 'ADHD',
    parentName: 'Priya Sharma',
    progress: 60,
    lastSession: '2024-12-08',
    totalSessions: 15,
    status: 'active',
  },
  {
    id: '3',
    name: 'Rohan Gupta',
    age: 5,
    diagnosis: 'Speech Delay',
    parentName: 'Anita Gupta',
    progress: 45,
    lastSession: '2024-12-05',
    totalSessions: 12,
    status: 'active',
  },
  {
    id: '4',
    name: 'Kavya Reddy',
    age: 7,
    diagnosis: 'ASD',
    parentName: 'Lakshmi Reddy',
    progress: 85,
    lastSession: '2024-12-09',
    totalSessions: 32,
    status: 'active',
  },
  {
    id: '5',
    name: 'Aditya Kumar',
    age: 6,
    diagnosis: 'Learning Disability',
    parentName: 'Sunita Kumar',
    progress: 55,
    lastSession: '2024-11-28',
    totalSessions: 8,
    status: 'inactive',
  },
];

const filters = ['All', 'Active', 'Inactive'];

export default function ProviderStudentsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === 'All' ||
      (activeFilter === 'Active' && student.status === 'active') ||
      (activeFilter === 'Inactive' && student.status === 'inactive');
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
    });
  };

  const renderStudent = ({
    item,
    index,
  }: {
    item: typeof mockStudents[0];
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
            pathname: '/provider/student/[id]',
            params: { id: item.id },
          })
        }
        style={styles.studentCard}
      >
        <View style={styles.cardHeader}>
          <Avatar name={item.name} size="medium" />
          <View style={styles.headerInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.studentName}>{item.name}</Text>
              <Badge
                label={item.status === 'active' ? 'Active' : 'Inactive'}
                variant={item.status === 'active' ? 'success' : 'default'}
                size="small"
              />
            </View>
            <Text style={styles.studentMeta}>
              {item.age} yrs • {item.diagnosis}
            </Text>
            <Text style={styles.parentName}>Parent: {item.parentName}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Sessions</Text>
            <Text style={styles.statValue}>{item.totalSessions}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Last Session</Text>
            <Text style={styles.statValue}>{formatDate(item.lastSession)}</Text>
          </View>
          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <Text style={styles.statLabel}>Progress</Text>
              <Text style={styles.progressValue}>{item.progress}%</Text>
            </View>
            <ProgressBar
              progress={item.progress}
              variant={item.progress >= 70 ? 'success' : 'primary'}
              height={4}
            />
          </View>
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
          <Text style={styles.headerTitle}>My Students</Text>
          <Text style={styles.headerSubtitle}>
            {mockStudents.length} total students
          </Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Search size={IconSize.md} color={Colors.text.tertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search students..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.text.tertiary}
          />
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterChip,
              activeFilter === filter && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Students List */}
      <FlatList
        data={filteredStudents}
        renderItem={renderStudent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Users size={64} color={Colors.gray[300]} />
            <Text style={styles.emptyText}>No students found</Text>
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
  headerText: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  headerTitle: {
    ...Typography.h4,
    color: Colors.text.primary,
  },
  headerSubtitle: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  placeholder: {
    width: 44,
  },
  searchSection: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...Typography.body,
    color: Colors.text.primary,
    paddingVertical: Spacing.xs,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  filterChipActive: {
    backgroundColor: Colors.teal[500],
    borderColor: Colors.teal[500],
  },
  filterText: {
    ...Typography.labelSmall,
    color: Colors.text.secondary,
  },
  filterTextActive: {
    color: Colors.white,
  },
  listContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  studentCard: {
    marginBottom: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  headerInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  studentName: {
    ...Typography.label,
    color: Colors.text.primary,
  },
  studentMeta: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    marginTop: 2,
  },
  parentName: {
    ...Typography.caption,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    gap: Spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    marginBottom: 2,
  },
  statValue: {
    ...Typography.label,
    color: Colors.text.primary,
  },
  progressItem: {
    flex: 1,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressValue: {
    ...Typography.labelSmall,
    color: Colors.primary[600],
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Spacing['3xl'],
  },
  emptyText: {
    ...Typography.body,
    color: Colors.text.tertiary,
    marginTop: Spacing.md,
  },
});
