import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import {
  FileText,
  ChevronRight,
  ArrowLeft,
  CheckCircle,
  Sparkles,
} from 'lucide-react-native';
import { Button, Card, Badge } from '../../componentsui';
import { FileUpload } from '../../componentsforms';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../constants/spacing';
import { useOnboardingStore } from '../../stores/onboardingStore';

const immediateAccessOptions = [
  {
    id: 'resources',
    title: 'Resources Library',
    description: 'Curated articles and guides',
    badge: 'Half Free',
    free: true,
  },
  {
    id: 'community',
    title: 'Parent Community',
    description: 'Connect with other parents',
    badge: 'Free',
    free: true,
  },
  {
    id: 'iep',
    title: 'IEP Sharing & Storage',
    description: 'Secure document management',
    badge: 'Paid',
    free: false,
  },
  {
    id: 'therapist',
    title: 'Connect with Therapist',
    description: 'Book sessions with experts',
    badge: 'Paid',
    free: false,
  },
];

export default function UploadReportScreen() {
  const { uploadedReport, setUploadedReport, completeOnboarding } = useOnboardingStore();
  const [showSummary, setShowSummary] = useState(false);

  const handleFileSelect = (file: { name: string; uri: string; size: number }) => {
    setUploadedReport(file);
    // Simulate processing
    setTimeout(() => {
      setShowSummary(true);
    }, 1500);
  };

  const handleContinue = () => {
    completeOnboarding();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={IconSize.md} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>

        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
          style={styles.titleSection}
        >
          <View style={styles.iconContainer}>
            <FileText size={IconSize['2xl']} color={Colors.primary[600]} />
          </View>
          <Text style={styles.title}>Upload Your Report</Text>
          <Text style={styles.subtitle}>
            Upload your child's diagnosis or assessment report to unlock personalized features
          </Text>
        </MotiView>

        {/* File Upload */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500, delay: 200 }}
        >
          <FileUpload
            label="Diagnosis Report"
            description="PDF or Image files up to 10MB"
            selectedFile={uploadedReport}
            onFileSelect={handleFileSelect}
            onFileRemove={() => {
              setUploadedReport(null);
              setShowSummary(false);
            }}
          />
        </MotiView>

        {/* Auto-Scan Summary (Mock) */}
        {showSummary && uploadedReport && (
          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'timing', duration: 400 }}
          >
            <Card
              variant="outlined"
              padding="medium"
              style={styles.summaryCard}
            >
              <View style={styles.summaryHeader}>
                <Sparkles size={IconSize.md} color={Colors.primary[600]} />
                <Text style={styles.summaryTitle}>AI Summary</Text>
                <Badge label="Beta" variant="primary" size="small" />
              </View>
              <View style={styles.summaryContent}>
                <View style={styles.summaryItem}>
                  <CheckCircle size={IconSize.sm} color={Colors.success.main} />
                  <Text style={styles.summaryText}>Document type detected: Assessment Report</Text>
                </View>
                <View style={styles.summaryItem}>
                  <CheckCircle size={IconSize.sm} color={Colors.success.main} />
                  <Text style={styles.summaryText}>Key areas identified: Speech, Social Skills</Text>
                </View>
                <View style={styles.summaryItem}>
                  <CheckCircle size={IconSize.sm} color={Colors.success.main} />
                  <Text style={styles.summaryText}>Ready for therapist matching</Text>
                </View>
              </View>
              <Text style={styles.summaryNote}>
                This is an automated summary. Please verify with a professional.
              </Text>
            </Card>
          </MotiView>
        )}

        {/* Immediate Access Options */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 400 }}
          style={styles.accessSection}
        >
          <Text style={styles.accessTitle}>Immediate Access</Text>
          <Text style={styles.accessSubtitle}>
            With your report uploaded, you can access these features:
          </Text>

          <View style={styles.optionsGrid}>
            {immediateAccessOptions.map((option, index) => (
              <MotiView
                key={option.id}
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 300, delay: 500 + index * 100 }}
              >
                <Card
                  variant="default"
                  padding="medium"
                  style={styles.optionCard}
                >
                  <View style={styles.optionHeader}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <Badge
                      label={option.badge}
                      variant={option.free ? 'success' : 'default'}
                      size="small"
                    />
                  </View>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </Card>
              </MotiView>
            ))}
          </View>
        </MotiView>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Button
          title={uploadedReport ? 'Continue to Dashboard' : 'Skip for Now'}
          onPress={handleContinue}
          fullWidth
          variant={uploadedReport ? 'primary' : 'secondary'}
          icon={<ChevronRight size={IconSize.md} color={uploadedReport ? Colors.white : Colors.primary[600]} />}
          iconPosition="right"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  header: {
    paddingVertical: Spacing.base,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  title: {
    ...Typography.h2,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  summaryCard: {
    marginBottom: Spacing.xl,
    borderColor: Colors.primary[200],
    backgroundColor: Colors.primary[50],
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  summaryTitle: {
    ...Typography.label,
    color: Colors.primary[700],
    flex: 1,
  },
  summaryContent: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  summaryText: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
    flex: 1,
  },
  summaryNote: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    fontStyle: 'italic',
  },
  accessSection: {
    marginTop: Spacing.base,
  },
  accessTitle: {
    ...Typography.h4,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  accessSubtitle: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  optionCard: {
    width: '47%',
    minWidth: 150,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  optionTitle: {
    ...Typography.labelSmall,
    color: Colors.text.primary,
    flex: 1,
    marginRight: Spacing.xs,
  },
  optionDescription: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  bottomSection: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
});
