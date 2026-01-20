import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { Globe, ChevronRight } from 'lucide-react-native';
import { Button, SelectableCard } from '../../componentsui';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, IconSize } from '../../constants/spacing';
import { LANGUAGES } from '../../constants';
import { useOnboardingStore } from '../../stores/onboardingStore';

export default function LanguageScreen() {
  const { selectedLanguage, setLanguage } = useOnboardingStore();

  const handleContinue = () => {
    router.push('/(auth)/login');
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
            <Globe size={IconSize['2xl']} color={Colors.primary[600]} />
          </View>
          <Text style={styles.title}>Choose Your Language</Text>
          <Text style={styles.subtitle}>
            Select your preferred language for the app
          </Text>
        </MotiView>

        {/* Language Options */}
        <View style={styles.languagesContainer}>
          {LANGUAGES.map((language, index) => (
            <MotiView
              key={language.code}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'timing', duration: 400, delay: index * 100 }}
            >
              <SelectableCard
                title={language.nativeName}
                description={language.name}
                selected={selectedLanguage === language.code}
                onSelect={() => setLanguage(language.code)}
                variant="horizontal"
                style={styles.languageCard}
                icon={
                  <View style={styles.languageIcon}>
                    <Text style={styles.languageCode}>
                      {language.code.toUpperCase()}
                    </Text>
                  </View>
                }
              />
            </MotiView>
          ))}
        </View>

        {/* Note */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 500 }}
          style={styles.noteContainer}
        >
          <Text style={styles.noteText}>
            You can change this later in Settings
          </Text>
        </MotiView>
      </ScrollView>

      {/* Bottom Section */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 300 }}
        style={styles.bottomSection}
      >
        <Button
          title="Continue"
          onPress={handleContinue}
          fullWidth
          icon={<ChevronRight size={IconSize.md} color={Colors.white} />}
          iconPosition="right"
        />
      </MotiView>
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
    paddingTop: Spacing['3xl'],
    paddingBottom: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
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
  languagesContainer: {
    gap: Spacing.md,
  },
  languageCard: {
    marginBottom: 0,
  },
  languageIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageCode: {
    ...Typography.labelSmall,
    color: Colors.primary[700],
    fontWeight: '700',
  },
  noteContainer: {
    marginTop: Spacing['2xl'],
    alignItems: 'center',
  },
  noteText: {
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
