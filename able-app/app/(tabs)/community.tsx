import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import {
  Plus,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
} from 'lucide-react-native';
import { Card, Avatar, Badge, Button } from '../../componentsui';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../constants/spacing';

const categories = [
  { id: 'all', label: 'All Posts' },
  { id: 'question', label: 'Questions' },
  { id: 'story', label: 'Stories' },
  { id: 'tip', label: 'Tips' },
  { id: 'resource', label: 'Resources' },
];

const mockPosts = [
  {
    id: '1',
    author: { name: 'Meera S.', avatar: null },
    category: 'question',
    content:
      'My 4-year-old has been struggling with transitions between activities. Any tips from parents who\'ve dealt with this?',
    likes: 24,
    comments: 12,
    timeAgo: '2 hours ago',
    liked: false,
  },
  {
    id: '2',
    author: { name: 'Rajesh K.', avatar: null },
    category: 'story',
    content:
      'Small win today! My son said "I love you" for the first time after 6 months of speech therapy. Don\'t give up, parents! The progress may be slow but it\'s worth every moment.',
    likes: 156,
    comments: 45,
    timeAgo: '5 hours ago',
    liked: true,
  },
  {
    id: '3',
    author: { name: 'Priya M.', avatar: null },
    category: 'tip',
    content:
      'Visual schedules have been a game-changer for us! I created a simple picture chart for morning routines and it reduced our meltdowns by half. Happy to share the template if anyone wants it.',
    likes: 89,
    comments: 28,
    timeAgo: '1 day ago',
    liked: false,
  },
  {
    id: '4',
    author: { name: 'Amit D.', avatar: null },
    category: 'resource',
    content:
      'Found this amazing free sensory toolkit PDF online. It has 50+ activities categorized by sensory need. Let me know if you want the link!',
    likes: 67,
    comments: 34,
    timeAgo: '2 days ago',
    liked: false,
  },
];

const categoryColors = {
  question: Colors.info,
  story: Colors.success,
  tip: Colors.warning,
  resource: Colors.primary[500],
  general: Colors.gray[500],
};

export default function CommunityScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleNewPost = () => {
    Alert.alert(
      'Create Post',
      'What would you like to share?',
      [
        { text: 'Ask a Question', onPress: () => Alert.alert('Coming Soon', 'Post creation will be available in the next update.') },
        { text: 'Share a Story', onPress: () => Alert.alert('Coming Soon', 'Post creation will be available in the next update.') },
        { text: 'Share a Tip', onPress: () => Alert.alert('Coming Soon', 'Post creation will be available in the next update.') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleComment = (post: typeof mockPosts[0]) => {
    Alert.alert(
      `Comments (${post.comments})`,
      'View and add comments to this post.',
      [
        { text: 'View Comments', onPress: () => Alert.alert('Coming Soon', 'Comments feature will be available in the next update.') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleShare = async (post: typeof mockPosts[0]) => {
    try {
      await Share.share({
        message: `${post.content}\n\n- Shared from ABLE Community`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleMoreOptions = (post: typeof mockPosts[0]) => {
    Alert.alert(
      'Post Options',
      '',
      [
        { text: 'Save Post', onPress: () => Alert.alert('Saved', 'Post has been saved to your collection.') },
        { text: 'Report Post', onPress: () => Alert.alert('Report', 'Thank you. Our team will review this post.'), style: 'destructive' },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const filteredPosts = posts.filter(
    (post) => selectedCategory === 'all' || post.category === selectedCategory
  );

  const renderPost = ({ item, index }: { item: typeof mockPosts[0]; index: number }) => {
    const categoryColor = categoryColors[item.category as keyof typeof categoryColors] || Colors.gray[500];

    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 300, delay: index * 50 }}
      >
        <Card variant="elevated" padding="medium" style={styles.postCard}>
          {/* Post Header */}
          <View style={styles.postHeader}>
            <View style={styles.authorInfo}>
              <Avatar name={item.author.name} size="medium" />
              <View style={styles.authorText}>
                <Text style={styles.authorName}>{item.author.name}</Text>
                <Text style={styles.timeAgo}>{item.timeAgo}</Text>
              </View>
            </View>
            <View style={styles.postHeaderRight}>
              <Badge
                label={item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                variant={
                  item.category === 'question'
                    ? 'info'
                    : item.category === 'story'
                    ? 'success'
                    : item.category === 'tip'
                    ? 'warning'
                    : 'primary'
                }
                size="small"
              />
              <TouchableOpacity style={styles.moreButton} onPress={() => handleMoreOptions(item)}>
                <MoreHorizontal size={IconSize.sm} color={Colors.text.tertiary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Post Content */}
          <Text style={styles.postContent}>{item.content}</Text>

          {/* Post Actions */}
          <View style={styles.postActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleLike(item.id)}
            >
              <Heart
                size={IconSize.md}
                color={item.liked ? Colors.error.main : Colors.text.tertiary}
                fill={item.liked ? Colors.error.main : 'none'}
              />
              <Text
                style={[styles.actionText, item.liked && styles.actionTextActive]}
              >
                {item.likes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => handleComment(item)}>
              <MessageCircle size={IconSize.md} color={Colors.text.tertiary} />
              <Text style={styles.actionText}>{item.comments}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => handleShare(item)}>
              <Share2 size={IconSize.md} color={Colors.text.tertiary} />
            </TouchableOpacity>
          </View>
        </Card>
      </MotiView>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Community</Text>
          <Text style={styles.subtitle}>Connect with other parents</Text>
        </View>
        <TouchableOpacity style={styles.newPostButton} onPress={handleNewPost}>
          <Plus size={IconSize.md} color={Colors.white} />
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

      {/* Posts */}
      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No posts in this category yet</Text>
            <Button
              title="Be the first to post"
              onPress={handleNewPost}
              variant="secondary"
              style={styles.emptyButton}
            />
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
    justifyContent: 'space-between',
    alignItems: 'center',
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
  newPostButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
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
  postCard: {
    marginBottom: 0,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    marginLeft: Spacing.sm,
  },
  authorName: {
    ...Typography.label,
    color: Colors.text.primary,
  },
  timeAgo: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  postHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  moreButton: {
    padding: Spacing.xs,
  },
  postContent: {
    ...Typography.body,
    color: Colors.text.primary,
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  postActions: {
    flexDirection: 'row',
    gap: Spacing.xl,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  actionText: {
    ...Typography.labelSmall,
    color: Colors.text.tertiary,
  },
  actionTextActive: {
    color: Colors.error.main,
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
    minWidth: 200,
  },
});
