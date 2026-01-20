import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import {
  BookOpen,
  Users,
  UserCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react-native';
import { Button, Card, Badge } from '../../componentsui';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../constants/spacing';
import { useOnboardingStore } from '../../stores/onboardingStore';

const supportOptions = [
  {
    id: 'resources',
    title: 'Resources Library',
    description: 'Articles, guides, and videos tailored to your child\'s needs',
    icon: BookOpen,
    color: Colors.primary[600],
    bgColor: Colors.primary[100],
    badge: 'Half Free',
    route: '/(tabs)/resources',
  },
  {
    id: 'community',
    title: 'Parent Community',
    description: 'Connect with other parents, share experiences, and get support',
    icon: Users,
    color: Colors.teal[600],
    bgColor: Colors.teal[100],
    badge: 'Free',
    route: '/(tabs)/community',
  },
  {
    id: 'psychologists',
    title: 'Verified Psychologists',
    description: 'Book a session with certified professionals for diagnosis',
    icon: UserCheck,
    color: Colors.success.dark,
    bgColor: Colors.success.light,
    badge: 'Book Now',
    route: '/(main)/therapists',
  },
];

export default function SupportOptionsScreen() {
  const { completeOnboarding } = useOnboardingStore();

  const handleOptionPress = (route: string) => {
    completeOnboarding();
    router.replace(route as any);
  };

  const handleSkipToHome = () => {
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
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
          style={styles.header}
        >
          <View style={styles.iconContainer}>
            <Sparkles size={IconSize['2xl']} color={Colors.primary[600]} />
          </View>
          <Text style={styles.title}>Your Support Options</Text>
          <Text style={styles.subtitle}>
            Choose how you'd like to start your journey with ABLE
          </Text>
        </MotiView>

        {/* Support Options */}
        <View style={styles.optionsContainer}>
          {supportOptions.map((option, index) => {
            const Icon = option.icon;

            return (
              <MotiView
                key={option.id}
                from={{ opacity: 0, translateX: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 500, delay: 200 + index * 100 }}
              >
                <Card
                  variant="elevated"
                  padding="large"
                  onPress={() => handleOptionPress(option.route)}
                  style={styles.optionCard}
                >
                  <View style={styles.optionHeader}>
                    <View style={[styles.optionIcon, { backgroundColor: option.bgColor }]}>
                      <Icon size={IconSize.lg} color={option.color} />
                    </View>
                    <Badge
                      label={option.badge}
                      variant={option.id === 'community' ? 'success' : 'primary'}
                      size="small"
                    />
                  </View>

                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>

                  <View style={styles.optionArrow}>
                    <ChevronRight size={IconSize.md} color={Colors.primary[500]} />
                  </View>
                </Card>
              </MotiView>
            );
          })}
        </View>

        {/* Recommendation Card */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 600 }}
        >
          <Card
            variant="gradient"
            gradientColors={[Colors.warning.main, Colors.warning.dark]}
            padding="medium"
            style={styles.recommendCard}
          >
            <Text style={styles.recommendTitle}>
              {'\u{1F4A1}'} Our Recommendation
            </Text>
            <Text style={styles.recommendText}>
              Since you don't have a diagnosis yet, we suggest starting with a
              consultation with one of our verified psychologists.
            </Text>
          </Card>
        </MotiView>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Button
          title="Find a Psychologist"
          onPress={() => handleOptionPress('/(main)/therapists')}
          fullWidth
          icon={<UserCheck size={IconSize.md} color={Colors.white} />}
          iconPosition="left"
        />
        <Button
          title="Skip for Now"
          onPress={handleSkipToHome}
          variant="ghost"
          fullWidth
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
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing.xl,
  },
  header: {
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
  },
  optionsContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  optionCard: {
    position: 'relative',
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  optionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTitle: {
    ...Typography.h5,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  optionDescription: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
    lineHeight: 20,
    paddingRight: Spacing['2xl'],
  },
  optionArrow: {
    position: 'absolute',
    right: Spacing.lg,
    bottom: Spacing.lg,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendCard: {
    marginBottom: Spacing.base,
  },
  recommendTitle: {
    ...Typography.h5,
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  recommendText: {
    ...Typography.bodySmall,
    color: Colors.white,
    opacity: 0.9,
    lineHeight: 20,
  },
  bottomSection: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    gap: Spacing.sm,
  },
});
