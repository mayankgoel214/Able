import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { ArrowLeft, Briefcase, Mail, Lock } from 'lucide-react-native';
import { Button, Input } from '../../componentsui';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, IconSize } from '../../constants/spacing';

export default function ProviderLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setError(undefined);
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/provider/dashboard');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={IconSize.md} color={Colors.text.primary} />
            </TouchableOpacity>
          </View>

          {/* Title Section */}
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500 }}
            style={styles.titleSection}
          >
            <View style={styles.iconContainer}>
              <Briefcase size={IconSize['2xl']} color={Colors.teal[600]} />
            </View>
            <Text style={styles.title}>Provider Portal</Text>
            <Text style={styles.subtitle}>
              Sign in to manage your practice and students
            </Text>
          </MotiView>

          {/* Form */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500, delay: 200 }}
            style={styles.formSection}
          >
            <Input
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Mail size={IconSize.md} color={Colors.text.tertiary} />}
            />

            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              leftIcon={<Lock size={IconSize.md} color={Colors.text.tertiary} />}
            />

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity style={styles.forgotButton}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={isLoading}
              fullWidth
              style={styles.loginButton}
            />
          </MotiView>

          {/* Sign Up Section */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 500, delay: 400 }}
            style={styles.signupSection}
          >
            <Text style={styles.signupText}>
              New provider?{' '}
              <Text style={styles.signupLink}>Register your practice</Text>
            </Text>
          </MotiView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing['2xl'],
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
    marginTop: Spacing.lg,
    marginBottom: Spacing['2xl'],
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.teal[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h2,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  formSection: {
    marginBottom: Spacing.xl,
  },
  errorText: {
    ...Typography.bodySmall,
    color: Colors.error.main,
    marginBottom: Spacing.base,
    textAlign: 'center',
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.lg,
  },
  forgotText: {
    ...Typography.labelSmall,
    color: Colors.primary[600],
  },
  loginButton: {
    marginTop: Spacing.sm,
  },
  signupSection: {
    alignItems: 'center',
  },
  signupText: {
    ...Typography.body,
    color: Colors.text.secondary,
  },
  signupLink: {
    color: Colors.teal[600],
    fontWeight: '600',
  },
});
