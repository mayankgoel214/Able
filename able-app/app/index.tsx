import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native';
import { Gradients, Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { useAuthStore } from '../stores/authStore';
import { useOnboardingStore } from '../stores/onboardingStore';

export default function SplashPage() {
  const { isAuthenticated, isLoading, setLoading } = useAuthStore();
  const { hasCompletedOnboarding } = useOnboardingStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);

      if (isAuthenticated && hasCompletedOnboarding) {
        router.replace('/(tabs)');
      } else if (isAuthenticated) {
        router.replace('/(onboarding)/segmentation');
      } else {
        router.replace('/(auth)/welcome');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, hasCompletedOnboarding]);

  return (
    <LinearGradient
      colors={Gradients.header as [string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 800 }}
        style={styles.logoContainer}
      >
        <View style={styles.logo}>
          <Text style={styles.logoText}>ABLE</Text>
        </View>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 400 }}
        >
          <Text style={styles.tagline}>
            Support for every child.{'\n'}Clarity for every parent.
          </Text>
        </MotiView>
      </MotiView>

      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 500, delay: 800 }}
        style={styles.loadingContainer}
      >
        <View style={styles.loadingDots}>
          {[0, 1, 2].map((index) => (
            <MotiView
              key={index}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{
                type: 'timing',
                duration: 600,
                loop: true,
                delay: index * 200,
              }}
              style={styles.dot}
            />
          ))}
        </View>
      </MotiView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 24,
  },
  logoText: {
    ...Typography.h1,
    color: Colors.primary[600],
    fontSize: 32,
  },
  tagline: {
    ...Typography.body,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 24,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 80,
  },
  loadingDots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
});
