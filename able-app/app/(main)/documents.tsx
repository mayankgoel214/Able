import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import * as DocumentPicker from 'expo-document-picker';
import {
  ArrowLeft,
  FileText,
  Upload,
  Share2,
  Download,
  MoreVertical,
  Folder,
  Clock,
} from 'lucide-react-native';
import { Card, Badge, Button } from '../../componentsui';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../constants/spacing';

const mockDocuments = [
  {
    id: '1',
    name: 'Assessment Report - Dr. Sharma',
    type: 'assessment',
    size: '2.4 MB',
    uploadedAt: '2024-12-01',
    sharedWith: ['Dr. Priya Sharma', 'School'],
  },
  {
    id: '2',
    name: 'IEP Document 2024',
    type: 'iep',
    size: '1.8 MB',
    uploadedAt: '2024-11-15',
    sharedWith: ['School Teacher'],
  },
  {
    id: '3',
    name: 'Speech Therapy Progress Notes',
    type: 'progress',
    size: '856 KB',
    uploadedAt: '2024-11-28',
    sharedWith: [],
  },
  {
    id: '4',
    name: 'Diagnosis Certificate',
    type: 'diagnosis',
    size: '1.2 MB',
    uploadedAt: '2024-10-20',
    sharedWith: ['Dr. Anita Desai'],
  },
];

const categories = [
  { id: 'all', label: 'All', count: 4 },
  { id: 'iep', label: 'IEP', count: 1 },
  { id: 'assessment', label: 'Assessment', count: 1 },
  { id: 'diagnosis', label: 'Diagnosis', count: 1 },
  { id: 'progress', label: 'Progress', count: 1 },
];

const typeColors = {
  iep: Colors.primary[500],
  assessment: Colors.teal[500],
  diagnosis: Colors.warning.main,
  progress: Colors.success.main,
};

export default function DocumentsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [documents, setDocuments] = useState(mockDocuments);

  const filteredDocuments =
    selectedCategory === 'all'
      ? documents
      : documents.filter((doc) => doc.type === selectedCategory);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        Alert.alert(
          'Upload Successful',
          `"${file.name}" has been uploaded successfully.`,
          [{ text: 'OK' }]
        );
        // Add the new document to the list
        const newDoc = {
          id: Date.now().toString(),
          name: file.name,
          type: 'other' as any,
          size: file.size ? `${(file.size / 1024).toFixed(1)} KB` : 'Unknown',
          uploadedAt: new Date().toISOString().split('T')[0],
          sharedWith: [],
        };
        setDocuments([newDoc, ...documents]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload document. Please try again.');
    }
  };

  const handleShare = async (doc: typeof mockDocuments[0]) => {
    try {
      await Share.share({
        message: `Sharing document: ${doc.name}`,
        title: doc.name,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleDownload = (doc: typeof mockDocuments[0]) => {
    Alert.alert(
      'Download Started',
      `Downloading "${doc.name}" (${doc.size})...`,
      [{ text: 'OK' }]
    );
  };

  const handleMoreOptions = (doc: typeof mockDocuments[0]) => {
    Alert.alert(
      doc.name,
      `Size: ${doc.size}\nUploaded: ${formatDate(doc.uploadedAt)}`,
      [
        { text: 'Rename', onPress: () => Alert.alert('Rename', 'Rename feature coming soon.') },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Delete Document',
              `Are you sure you want to delete "${doc.name}"?`,
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => {
                    setDocuments(documents.filter(d => d.id !== doc.id));
                    Alert.alert('Deleted', 'Document has been deleted.');
                  }
                },
              ]
            );
          }
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const renderDocument = ({
    item,
    index,
  }: {
    item: typeof mockDocuments[0];
    index: number;
  }) => (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 300, delay: index * 50 }}
    >
      <Card variant="elevated" padding="medium" style={styles.documentCard}>
        <View style={styles.docHeader}>
          <View
            style={[
              styles.docIcon,
              { backgroundColor: `${typeColors[item.type as keyof typeof typeColors]}20` },
            ]}
          >
            <FileText
              size={IconSize.lg}
              color={typeColors[item.type as keyof typeof typeColors]}
            />
          </View>
          <View style={styles.docInfo}>
            <Text style={styles.docName} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.docMeta}>
              <Text style={styles.docSize}>{item.size}</Text>
              <View style={styles.dot} />
              <Clock size={12} color={Colors.text.tertiary} />
              <Text style={styles.docDate}>{formatDate(item.uploadedAt)}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton} onPress={() => handleMoreOptions(item)}>
            <MoreVertical size={IconSize.md} color={Colors.text.tertiary} />
          </TouchableOpacity>
        </View>

        {item.sharedWith.length > 0 && (
          <View style={styles.sharedSection}>
            <Share2 size={14} color={Colors.text.tertiary} />
            <Text style={styles.sharedText}>
              Shared with {item.sharedWith.length} {item.sharedWith.length === 1 ? 'person' : 'people'}
            </Text>
          </View>
        )}

        <View style={styles.docActions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleShare(item)}>
            <Share2 size={IconSize.sm} color={Colors.primary[600]} />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleDownload(item)}>
            <Download size={IconSize.sm} color={Colors.primary[600]} />
            <Text style={styles.actionText}>Download</Text>
          </TouchableOpacity>
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
          <Text style={styles.headerTitle}>Documents</Text>
          <Text style={styles.headerSubtitle}>
            {mockDocuments.length} files
          </Text>
        </View>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Upload size={IconSize.md} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategory === item.id && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item.id && styles.categoryTextActive,
                ]}
              >
                {item.label}
              </Text>
              <View
                style={[
                  styles.categoryBadge,
                  selectedCategory === item.id && styles.categoryBadgeActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryCount,
                    selectedCategory === item.id && styles.categoryCountActive,
                  ]}
                >
                  {item.count}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Documents List */}
      <FlatList
        data={filteredDocuments}
        renderItem={renderDocument}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Folder size={64} color={Colors.gray[300]} />
            <Text style={styles.emptyText}>No documents in this category</Text>
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
    marginRight: Spacing.md,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    ...Typography.h4,
    color: Colors.text.primary,
  },
  headerSubtitle: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  uploadButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesSection: {
    marginBottom: Spacing.base,
  },
  categoriesContainer: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border.light,
    gap: Spacing.xs,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary[500],
    borderColor: Colors.primary[500],
  },
  categoryText: {
    ...Typography.labelSmall,
    color: Colors.text.secondary,
  },
  categoryTextActive: {
    color: Colors.white,
  },
  categoryBadge: {
    backgroundColor: Colors.gray[100],
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  categoryBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  categoryCount: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    fontWeight: '600',
  },
  categoryCountActive: {
    color: Colors.white,
  },
  listContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  documentCard: {
    marginBottom: 0,
  },
  docHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  docIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    ...Typography.label,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  docMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  docSize: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.text.tertiary,
  },
  docDate: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  moreButton: {
    padding: Spacing.xs,
  },
  sharedSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  sharedText: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  docActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.base,
    backgroundColor: Colors.primary[50],
  },
  actionText: {
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
