import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { ArrowLeft, Shield, RefreshCw } from 'lucide-react-native';
import { Button } from '../../componentsui';
import { OTPInput } from '../../componentsforms';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, IconSize } from '../../constants/spacing';
import { useAuthStore } from '../../stores/authStore';
import { verifyPhoneOTP, clearConfirmation } from '../../services/firebase';

export default function OTPScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const { login } = useAuthStore();

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError(true);
      setErrorMessage('Please enter the 6-digit code');
      return;
    }

    setError(false);
    setErrorMessage('');
    setIsLoading(true);

    try {
      const result = await verifyPhoneOTP(otp);

      if (result.success && result.user) {
        // Create user object from Firebase user
        const user = {
          id: result.user.uid,
          phone: phone || '',
          name: 'Parent',
          language: 'en' as const,
          role: 'parent' as const,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Get the token
        const token = await result.user.getIdToken();

        login(user, token);
        router.replace('/(onboarding)/segmentation');
      } else {
        setError(true);
        setErrorMessage(result.error || 'Invalid OTP. Please try again.');
      }
    } catch (err: any) {
      console.error('Verify OTP Error:', err);
      setError(true);
      setErrorMessage(err.message || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    if (!canResend) return;

    // Clear the current confirmation and go back to request new OTP
    clearConfirmation();
    setCanResend(false);
    setResendTimer(30);
    setOtp('');
    setError(false);
    setErrorMessage('');

    Alert.alert(
      'Resend OTP',
      'Please go back and request a new OTP.',
      [
        { text: 'Go Back', onPress: () => router.back() },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const formatPhoneNumber = (num: string) => {
    if (!num) return '';
    // Format as +1 (XXX) XXX-XXXX
    if (num.length === 10) {
      return `+1 (${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6)}`;
    }
    return `+1 ${num}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
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

        <View style={styles.content}>
          {/* Title Section */}
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500 }}
            style={styles.titleSection}
          >
            <View style={styles.iconContainer}>
              <Shield size={IconSize['2xl']} color={Colors.primary[600]} />
            </View>
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>
              Enter the 6-digit code sent to
            </Text>
            <Text style={styles.phoneNumber}>{formatPhoneNumber(phone || '')}</Text>
          </MotiView>

          {/* OTP Input */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500, delay: 200 }}
            style={styles.otpSection}
          >
            <OTPInput
              length={6}
              value={otp}
              onChange={(value) => {
                setOtp(value);
                setError(false);
                setErrorMessage('');
              }}
              onComplete={handleVerifyOTP}
              error={error}
            />

            {error && errorMessage && (
              <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing', duration: 300 }}
              >
                <Text style={styles.errorText}>{errorMessage}</Text>
              </MotiView>
            )}
          </MotiView>

          {/* Resend Section */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 500, delay: 400 }}
            style={styles.resendSection}
          >
            {canResend ? (
              <TouchableOpacity
                style={styles.resendButton}
                onPress={handleResendOTP}
              >
                <RefreshCw size={IconSize.sm} color={Colors.primary[600]} />
                <Text style={styles.resendText}>Resend OTP</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timerText}>
                Resend OTP in{' '}
                <Text style={styles.timerNumber}>{resendTimer}s</Text>
              </Text>
            )}
          </MotiView>
        </View>

        {/* Bottom Section */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500, delay: 300 }}
          style={styles.bottomSection}
        >
          <Button
            title="Verify & Continue"
            onPress={handleVerifyOTP}
            loading={isLoading}
            disabled={otp.length !== 6}
            fullWidth
          />

          <TouchableOpacity
            style={styles.changeNumberButton}
            onPress={() => router.back()}
          >
            <Text style={styles.changeNumberText}>Change Phone Number</Text>
          </TouchableOpacity>
        </MotiView>
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
  header: {
    paddingHorizontal: Spacing.xl,
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
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  titleSection: {
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing['3xl'],
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
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.text.secondary,
  },
  phoneNumber: {
    ...Typography.h5,
    color: Colors.primary[600],
    marginTop: Spacing.xs,
  },
  otpSection: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  errorText: {
    ...Typography.bodySmall,
    color: Colors.error.main,
    marginTop: Spacing.base,
    textAlign: 'center',
  },
  resendSection: {
    alignItems: 'center',
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.base,
  },
  resendText: {
    ...Typography.label,
    color: Colors.primary[600],
  },
  timerText: {
    ...Typography.body,
    color: Colors.text.tertiary,
  },
  timerNumber: {
    color: Colors.primary[600],
    fontWeight: '600',
  },
  bottomSection: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    gap: Spacing.base,
  },
  changeNumberButton: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  changeNumberText: {
    ...Typography.label,
    color: Colors.text.tertiary,
  },
});
