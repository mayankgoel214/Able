import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Gradients } from '../constants/colors';
import { Typography } from '../constants/typography';
import { BorderRadius, TouchTarget, Shadow } from '../constants/spacing';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  const getButtonHeight = () => {
    switch (size) {
      case 'small':
        return TouchTarget.min;
      case 'large':
        return TouchTarget.large;
      default:
        return TouchTarget.button;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle = size === 'small' ? Typography.buttonSmall : Typography.button;

    switch (variant) {
      case 'primary':
        return { ...baseStyle, color: Colors.white };
      case 'secondary':
        return { ...baseStyle, color: Colors.primary[700] };
      case 'outline':
        return { ...baseStyle, color: Colors.primary[600] };
      case 'ghost':
        return { ...baseStyle, color: Colors.primary[600] };
      case 'danger':
        return { ...baseStyle, color: Colors.white };
      default:
        return { ...baseStyle, color: Colors.white };
    }
  };

  const getLoaderColor = () => {
    switch (variant) {
      case 'primary':
      case 'danger':
        return Colors.white;
      default:
        return Colors.primary[600];
    }
  };

  const renderContent = () => (
    <View style={styles.contentContainer}>
      {loading ? (
        <ActivityIndicator color={getLoaderColor()} size="small" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <View style={styles.iconLeft}>{icon}</View>
          )}
          <Text
            style={[
              getTextStyle(),
              isDisabled && styles.disabledText,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <View style={styles.iconRight}>{icon}</View>
          )}
        </>
      )}
    </View>
  );

  if (variant === 'primary' && !isDisabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.8}
        style={[fullWidth && styles.fullWidth, style]}
      >
        <LinearGradient
          colors={Gradients.primary as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.button,
            { height: getButtonHeight() },
            Shadow.md,
          ]}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      height: getButtonHeight(),
      borderRadius: BorderRadius.base,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: isDisabled ? Colors.gray[300] : Colors.primary[500],
          ...Shadow.md,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: Colors.primary[50],
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: Colors.transparent,
          borderWidth: 2,
          borderColor: isDisabled ? Colors.gray[300] : Colors.primary[500],
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: Colors.transparent,
        };
      case 'danger':
        return {
          ...baseStyle,
          backgroundColor: isDisabled ? Colors.gray[300] : Colors.error.main,
          ...Shadow.md,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        styles.button,
        getButtonStyle(),
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.base,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  disabledText: {
    color: Colors.gray[400],
  },
});

export default Button;
