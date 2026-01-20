import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { Heart, Users, Shield } from 'lucide-react-native';
import { Button } from '../../componentsui';
import { Colors, Gradients } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, IconSize } from '../../constants/spacing';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <LinearGradient
        colors={[Colors.primary[50], Colors.white]}
        style={styles.background}
      >
        {/* Logo and Title */}
        <MotiView
          from={{ opacity: 0, translateY: -30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
          style={styles.header}
        >
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={Gradients.primary as [string, string]}
              style={styles.logo}
            >
              <Text style={styles.logoText}>ABLE</Text>
            </LinearGradient>
          </View>
          <Text style={styles.tagline}>
            Support for every child.{'\n'}Clarity for every parent.
          </Text>
        </MotiView>

        {/* Feature Icons */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 600, delay: 300 }}
          style={styles.featuresContainer}
        >
          <View style={styles.featureRow}>
            <View style={styles.feature}>
              <View style={[styles.featureIcon, { backgroundColor: Colors.primary[100] }]}>
                <Heart size={IconSize.lg} color={Colors.primary[600]} />
              </View>
              <Text style={styles.featureText}>Care</Text>
            </View>
            <View style={styles.feature}>
              <View style={[styles.featureIcon, { backgroundColor: Colors.teal[100] }]}>
                <Users size={IconSize.lg} color={Colors.teal[600]} />
              </View>
              <Text style={styles.featureText}>Support</Text>
            </View>
            <View style={styles.feature}>
              <View style={[styles.featureIcon, { backgroundColor: Colors.success.light }]}>
                <Shield size={IconSize.lg} color={Colors.success.dark} />
              </View>
              <Text style={styles.featureText}>Trust</Text>
            </View>
          </View>
        </MotiView>

        {/* Illustration placeholder */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 700, delay: 400 }}
          style={styles.illustrationContainer}
        >
          <View style={styles.illustration}>
            <View style={styles.illustrationCircle}>
              <Text style={styles.illustrationEmoji}>
                {'\u{1F46A}'}
              </Text>
            </View>
          </View>
        </MotiView>

        {/* Bottom Section */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 500 }}
          style={styles.bottomSection}
        >
          <Button
            title="Get Started"
            onPress={() => router.push('/(auth)/onboarding')}
            fullWidth
          />
          <Text style={styles.alreadyText}>
            Already have an account?{' '}
            <Text
              style={styles.signInLink}
              onPress={() => router.push('/(auth)/login')}
            >
              Sign In
            </Text>
          </Text>
        </MotiView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginTop: Spacing['3xl'],
  },
  logoContainer: {
    marginBottom: Spacing.lg,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  logoText: {
    ...Typography.h2,
    color: Colors.white,
    letterSpacing: 2,
  },
  tagline: {
    ...Typography.h4,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 28,
  },
  featuresContainer: {
    marginTop: Spacing['2xl'],
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing['3xl'],
  },
  feature: {
    alignItems: 'center',
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  featureText: {
    ...Typography.labelSmall,
    color: Colors.text.tertiary,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: width * 0.7,
    height: width * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Colors.primary[200],
  },
  illustrationEmoji: {
    fontSize: 80,
  },
  bottomSection: {
    paddingBottom: Spacing['2xl'],
    gap: Spacing.base,
  },
  alreadyText: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  signInLink: {
    color: Colors.primary[600],
    fontWeight: '600',
  },
});
