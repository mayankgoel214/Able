import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';
import { BorderRadius, Spacing, Shadow } from '../constants/spacing';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  padding?: 'none' | 'small' | 'medium' | 'large';
  selected?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  gradientColors?: string[];
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  variant = 'default',
  padding = 'medium',
  selected = false,
  disabled = false,
  style,
  gradientColors,
}) => {
  const getPadding = () => {
    switch (padding) {
      case 'none':
        return 0;
      case 'small':
        return Spacing.md;
      case 'large':
        return Spacing.xl;
      default:
        return Spacing.base;
    }
  };

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: BorderRadius.xl,
      padding: getPadding(),
      backgroundColor: Colors.white,
    };

    switch (variant) {
      case 'elevated':
        return {
          ...baseStyle,
          ...Shadow.lg,
        };
      case 'outlined':
        return {
          ...baseStyle,
          borderWidth: selected ? 2 : 1,
          borderColor: selected ? Colors.primary[500] : Colors.border.light,
          backgroundColor: selected ? Colors.primary[50] : Colors.white,
        };
      case 'gradient':
        return {
          ...baseStyle,
          padding: 0,
          overflow: 'hidden',
        };
      default:
        return {
          ...baseStyle,
          ...Shadow.sm,
        };
    }
  };

  if (variant === 'gradient') {
    const Wrapper = onPress ? TouchableOpacity : View;
    return (
      <Wrapper
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        style={[getCardStyle(), disabled && styles.disabled, style]}
      >
        <LinearGradient
          colors={(gradientColors || [Colors.primary[500], Colors.teal[500]]) as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: getPadding() }}
        >
          {children}
        </LinearGradient>
      </Wrapper>
    );
  }

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
        style={[getCardStyle(), disabled && styles.disabled, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[getCardStyle(), disabled && styles.disabled, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});

export default Card;
