import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  Smartphone,
  CreditCard,
  Building2,
  IndianRupee,
  Shield,
  CheckCircle,
} from 'lucide-react-native';
import { Card, Button, Avatar } from '../../../componentsui';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../../constants/spacing';
import { PAYMENT_METHODS } from '../../../constants';

const paymentIcons = {
  upi: Smartphone,
  card: CreditCard,
  netbanking: Building2,
};

export default function PaymentScreen() {
  const { therapistId, date, time, mode } = useLocalSearchParams<{
    therapistId: string;
    date: string;
    time: string;
    mode: string;
  }>();

  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const sessionFee = 1500;
  const platformFee = 50;
  const total = sessionFee + platformFee;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      router.replace('/(main)/booking/confirmation');
    }, 2000);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={IconSize.md} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Booking Summary */}
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 400 }}
        >
          <Card variant="elevated" padding="large" style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Booking Summary</Text>

            <View style={styles.therapistRow}>
              <Avatar name="Dr. Priya Sharma" size="medium" />
              <View style={styles.therapistText}>
                <Text style={styles.therapistName}>Dr. Priya Sharma</Text>
                <Text style={styles.therapistSpecialty}>Speech Therapy</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Calendar size={IconSize.sm} color={Colors.text.tertiary} />
                <Text style={styles.detailText}>{formatDate(date || '')}</Text>
              </View>
              <View style={styles.detailRow}>
                <Clock size={IconSize.sm} color={Colors.text.tertiary} />
                <Text style={styles.detailText}>{time} • 45 minutes</Text>
              </View>
              <View style={styles.detailRow}>
                <Video size={IconSize.sm} color={Colors.text.tertiary} />
                <Text style={styles.detailText}>
                  {mode === 'online' ? 'Online Session' : 'In-Person Visit'}
                </Text>
              </View>
            </View>
          </Card>
        </MotiView>

        {/* Payment Methods */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 400, delay: 200 }}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.methodsContainer}>
            {PAYMENT_METHODS.map((method) => {
              const Icon = paymentIcons[method.id as keyof typeof paymentIcons];
              return (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.methodCard,
                    selectedMethod === method.id && styles.methodCardActive,
                  ]}
                  onPress={() => setSelectedMethod(method.id)}
                >
                  <View
                    style={[
                      styles.methodIcon,
                      selectedMethod === method.id && styles.methodIconActive,
                    ]}
                  >
                    <Icon
                      size={IconSize.md}
                      color={
                        selectedMethod === method.id
                          ? Colors.primary[600]
                          : Colors.text.tertiary
                      }
                    />
                  </View>
                  <Text
                    style={[
                      styles.methodLabel,
                      selectedMethod === method.id && styles.methodLabelActive,
                    ]}
                  >
                    {method.label}
                  </Text>
                  <View
                    style={[
                      styles.radioOuter,
                      selectedMethod === method.id && styles.radioOuterActive,
                    ]}
                  >
                    {selectedMethod === method.id && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </MotiView>

        {/* Price Breakdown */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 400, delay: 300 }}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Price Details</Text>
          <Card variant="default" padding="medium">
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Session Fee</Text>
              <View style={styles.priceValue}>
                <IndianRupee size={14} color={Colors.text.primary} />
                <Text style={styles.priceText}>{sessionFee}</Text>
              </View>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Platform Fee</Text>
              <View style={styles.priceValue}>
                <IndianRupee size={14} color={Colors.text.primary} />
                <Text style={styles.priceText}>{platformFee}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <View style={styles.priceValue}>
                <IndianRupee size={18} color={Colors.primary[600]} />
                <Text style={styles.totalText}>{total}</Text>
              </View>
            </View>
          </Card>
        </MotiView>

        {/* Security Note */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 400, delay: 400 }}
          style={styles.securityNote}
        >
          <Shield size={IconSize.sm} color={Colors.success.main} />
          <Text style={styles.securityText}>
            Your payment is secured with bank-grade encryption
          </Text>
        </MotiView>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.totalContainer}>
          <Text style={styles.payLabel}>Total</Text>
          <View style={styles.payAmount}>
            <IndianRupee size={20} color={Colors.text.primary} />
            <Text style={styles.payTotal}>{total}</Text>
          </View>
        </View>
        <Button
          title={isProcessing ? 'Processing...' : 'Pay Now'}
          onPress={handlePayment}
          loading={isProcessing}
          style={styles.payButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  },
  headerTitle: {
    ...Typography.h4,
    color: Colors.text.primary,
  },
  placeholder: {
    width: 44,
  },
  summaryCard: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  summaryTitle: {
    ...Typography.h5,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  therapistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  therapistText: {
    marginLeft: Spacing.md,
  },
  therapistName: {
    ...Typography.label,
    color: Colors.text.primary,
  },
  therapistSpecialty: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border.light,
    marginVertical: Spacing.md,
  },
  detailsContainer: {
    gap: Spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  detailText: {
    ...Typography.body,
    color: Colors.text.secondary,
  },
  section: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h5,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  methodsContainer: {
    gap: Spacing.sm,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.border.light,
  },
  methodCardActive: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[50],
  },
  methodIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  methodIconActive: {
    backgroundColor: Colors.primary[100],
  },
  methodLabel: {
    ...Typography.label,
    color: Colors.text.secondary,
    flex: 1,
  },
  methodLabelActive: {
    color: Colors.text.primary,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border.default,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: {
    borderColor: Colors.primary[500],
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary[500],
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  priceLabel: {
    ...Typography.body,
    color: Colors.text.secondary,
  },
  priceValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    ...Typography.label,
    color: Colors.text.primary,
  },
  totalLabel: {
    ...Typography.h5,
    color: Colors.text.primary,
  },
  totalText: {
    ...Typography.h4,
    color: Colors.primary[600],
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.xl,
  },
  securityText: {
    ...Typography.caption,
    color: Colors.success.main,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    gap: Spacing.lg,
  },
  totalContainer: {
    flex: 1,
  },
  payLabel: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  payAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payTotal: {
    ...Typography.h3,
    color: Colors.text.primary,
  },
  payButton: {
    flex: 1,
  },
});
