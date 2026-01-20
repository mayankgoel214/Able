import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Gradients } from '../constants/colors';
import { Typography } from '../constants/typography';
import { BorderRadius, Spacing } from '../constants/spacing';

interface ProgressBarProps {
  progress: number; // 0-100
  height?: number;
  showLabel?: boolean;
  label?: string;
  variant?: 'default' | 'gradient' | 'success' | 'warning' | 'primary';
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  showLabel = false,
  label,
  variant = 'default',
  style,
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${clampedProgress}%`, {
        duration: 500,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      }),
    };
  });

  const getBackgroundColor = () => {
    switch (variant) {
      case 'success':
        return Colors.success.main;
      case 'warning':
        return Colors.warning.main;
      case 'primary':
      default:
        return Colors.primary[500];
    }
  };

  return (
    <View style={[styles.container, style]}>
      {(showLabel || label) && (
        <View style={styles.labelContainer}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showLabel && <Text style={styles.percentage}>{Math.round(clampedProgress)}%</Text>}
        </View>
      )}

      <View style={[styles.track, { height }]}>
        {variant === 'gradient' ? (
          <Animated.View style={[styles.fillContainer, animatedStyle]}>
            <LinearGradient
              colors={Gradients.primary as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.fill}
            />
          </Animated.View>
        ) : (
          <Animated.View
            style={[
              styles.fill,
              { backgroundColor: getBackgroundColor() },
              animatedStyle,
            ]}
          />
        )}
      </View>
    </View>
  );
};

// Step Progress for questionnaire
interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  style?: ViewStyle;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  totalSteps,
  style,
}) => {
  return (
    <View style={[styles.stepContainer, style]}>
      <View style={styles.stepInfo}>
        <Text style={styles.stepText}>
          Step {currentStep} of {totalSteps}
        </Text>
      </View>
      <View style={styles.stepsTrack}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.stepDot,
              index < currentStep && styles.stepDotCompleted,
              index === currentStep - 1 && styles.stepDotActive,
            ]}
          />
        ))}
      </View>
      <ProgressBar
        progress={(currentStep / totalSteps) * 100}
        variant="gradient"
        height={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  label: {
    ...Typography.labelSmall,
    color: Colors.text.secondary,
  },
  percentage: {
    ...Typography.labelSmall,
    color: Colors.primary[600],
  },
  track: {
    width: '100%',
    backgroundColor: Colors.gray[200],
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  fillContainer: {
    height: '100%',
    overflow: 'hidden',
    borderRadius: BorderRadius.full,
  },
  fill: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
  stepContainer: {
    width: '100%',
  },
  stepInfo: {
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  stepText: {
    ...Typography.labelSmall,
    color: Colors.text.tertiary,
  },
  stepsTrack: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.gray[300],
  },
  stepDotCompleted: {
    backgroundColor: Colors.primary[500],
  },
  stepDotActive: {
    backgroundColor: Colors.primary[600],
    width: 24,
    borderRadius: 4,
  },
});

export default ProgressBar;
