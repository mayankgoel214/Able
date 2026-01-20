import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import {
  Search,
  Filter,
  BookOpen,
  Video,
  FileText,
  Headphones,
  Clock,
  Lock,
} from 'lucide-react-native';
import { Card, Badge, Input } from '../../componentsui';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../constants/spacing';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'speech', label: 'Speech' },
  { id: 'learning', label: 'Learning' },
  { id: 'behavior', label: 'Behavior' },
  { id: 'sensory', label: 'Sensory' },
  { id: 'parenting', label: 'Parenting' },
];

const mockResources = [
  {
    id: '1',
    title: 'Understanding Speech Delays in Children',
    description: 'A comprehensive guide to identifying and addressing speech delays early.',
    type: 'article',
    category: 'speech',
    readTime: 8,
    premium: false,
    thumbnail: null,
  },
  {
    id: '2',
    title: 'Daily Exercises for Focus & Attention',
    description: 'Simple activities you can do at home to improve your child\'s concentration.',
    type: 'video',
    category: 'learning',
    readTime: 15,
    premium: true,
    thumbnail: null,
  },
  {
    id: '3',
    title: 'Managing Tantrums: A Parent\'s Guide',
    description: 'Evidence-based strategies for handling difficult behaviors.',
    type: 'guide',
    category: 'behavior',
    readTime: 12,
    premium: false,
    thumbnail: null,
  },
  {
    id: '4',
    title: 'Sensory Processing Explained',
    description: 'Understanding how sensory issues affect daily life and what you can do.',
    type: 'article',
    category: 'sensory',
    readTime: 10,
    premium: false,
    thumbnail: null,
  },
  {
    id: '5',
    title: 'Building Social Skills Through Play',
    description: 'Fun games and activities to help your child connect with others.',
    type: 'video',
    category: 'parenting',
    readTime: 20,
    premium: true,
    thumbnail: null,
  },
  {
    id: '6',
    title: 'IEP Meeting Preparation Checklist',
    description: 'Everything you need to know before your next school meeting.',
    type: 'worksheet',
    category: 'parenting',
    readTime: 5,
    premium: false,
    thumbnail: null,
  },
];

const typeIcons = {
  article: BookOpen,
  video: Video,
  guide: FileText,
  worksheet: FileText,
  podcast: Headphones,
};

export default function ResourcesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);

  const filteredResources = mockResources.filter((resource) => {
    const matchesCategory =
      selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPremium = !showPremiumOnly || resource.premium;
    return matchesCategory && matchesSearch && matchesPremium;
  });

  const handleResourcePress = (resource: typeof mockResources[0]) => {
    if (resource.premium) {
      Alert.alert(
        'Premium Content',
        `"${resource.title}" is premium content. Subscribe to access all premium resources.`,
        [
          { text: 'Maybe Later', style: 'cancel' },
          { text: 'Learn More', onPress: () => Alert.alert('Premium Subscription', 'Premium subscriptions coming soon!') },
        ]
      );
    } else {
      Alert.alert(
        resource.title,
        `${resource.description}\n\nType: ${resource.type}\nRead time: ${resource.readTime} minutes`,
        [
          { text: 'Close', style: 'cancel' },
          { text: 'Read Now', onPress: () => Alert.alert('Opening', 'This resource would open in a detailed view.') },
        ]
      );
    }
  };

  const handleFilter = () => {
    Alert.alert(
      'Filter Resources',
      'Select filter options:',
      [
        {
          text: showPremiumOnly ? 'Show All' : 'Premium Only',
          onPress: () => setShowPremiumOnly(!showPremiumOnly),
        },
        { text: 'Reset Filters', onPress: () => { setShowPremiumOnly(false); setSelectedCategory('all'); } },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const renderResourceCard = ({ item, index }: { item: typeof mockResources[0]; index: number }) => {
    const TypeIcon = typeIcons[item.type as keyof typeof typeIcons] || BookOpen;

    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 300, delay: index * 50 }}
      >
        <Card
          variant="elevated"
          padding="medium"
          onPress={() => handleResourcePress(item)}
          style={styles.resourceCard}
        >
          <View style={styles.resourceHeader}>
            <View style={styles.resourceTypeIcon}>
              <TypeIcon size={IconSize.md} color={Colors.primary[600]} />
            </View>
            <View style={styles.resourceBadges}>
              {item.premium && (
                <Badge
                  label="Premium"
                  variant="warning"
                  size="small"
                  icon={<Lock size={10} color={Colors.warning.dark} />}
                />
              )}
              <Badge
                label={item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                variant="default"
                size="small"
              />
            </View>
          </View>

          <Text style={styles.resourceTitle}>{item.title}</Text>
          <Text style={styles.resourceDescription} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.resourceFooter}>
            <View style={styles.readTime}>
              <Clock size={IconSize.xs} color={Colors.text.tertiary} />
              <Text style={styles.readTimeText}>{item.readTime} min read</Text>
            </View>
            <Text style={styles.categoryTag}>
              {categories.find((c) => c.id === item.category)?.label}
            </Text>
          </View>
        </Card>
      </MotiView>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Resources</Text>
        <Text style={styles.subtitle}>Articles, videos, and guides for your journey</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search resources..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search size={IconSize.md} color={Colors.text.tertiary} />}
          containerStyle={styles.searchInput}
        />
        <TouchableOpacity style={[styles.filterButton, showPremiumOnly && styles.filterButtonActive]} onPress={handleFilter}>
          <Filter size={IconSize.md} color={showPremiumOnly ? Colors.white : Colors.primary[600]} />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === category.id && styles.categoryChipTextActive,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Resources List */}
      <FlatList
        data={filteredResources}
        renderItem={renderResourceCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No resources found</Text>
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
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.md,
  },
  title: {
    ...Typography.h2,
    color: Colors.text.primary,
  },
  subtitle: {
    ...Typography.body,
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
  filterButtonActive: {
    backgroundColor: Colors.primary[500],
  },
  categoriesContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.base,
    gap: Spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary[500],
    borderColor: Colors.primary[500],
  },
  categoryChipText: {
    ...Typography.labelSmall,
    color: Colors.text.secondary,
  },
  categoryChipTextActive: {
    color: Colors.white,
  },
  listContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  resourceCard: {
    marginBottom: 0,
  },
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  resourceTypeIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  resourceBadges: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  resourceTitle: {
    ...Typography.h5,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  resourceDescription: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  resourceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  readTimeText: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  categoryTag: {
    ...Typography.caption,
    color: Colors.primary[600],
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Spacing['3xl'],
  },
  emptyText: {
    ...Typography.body,
    color: Colors.text.tertiary,
  },
});
