import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { Colors } from '../constants/colors';
import { Typography, FontFamily } from '../constants/typography';
import { BorderRadius, Spacing, TouchTarget, IconSize } from '../constants/spacing';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  containerStyle,
  required = false,
  secureTextEntry,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = secureTextEntry !== undefined;

  const getBorderColor = () => {
    if (error) return Colors.error.main;
    if (isFocused) return Colors.primary[500];
    return Colors.border.default;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.required}>*</Text>}
        </View>
      )}

      <View
        style={[
          styles.inputContainer,
          {
            borderColor: getBorderColor(),
            backgroundColor: props.editable === false ? Colors.gray[100] : Colors.white,
          },
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          {...props}
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : null,
            (rightIcon || isPassword) ? styles.inputWithRightIcon : null,
            props.style,
          ]}
          placeholderTextColor={Colors.text.disabled}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          secureTextEntry={isPassword && !showPassword}
        />

        {isPassword ? (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={IconSize.md} color={Colors.text.tertiary} />
            ) : (
              <Eye size={IconSize.md} color={Colors.text.tertiary} />
            )}
          </TouchableOpacity>
        ) : rightIcon ? (
          <View style={styles.rightIcon}>{rightIcon}</View>
        ) : null}
      </View>

      {(error || hint) && (
        <Text style={[styles.helperText, error && styles.errorText]}>
          {error || hint}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.base,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  label: {
    ...Typography.label,
    color: Colors.text.primary,
  },
  required: {
    ...Typography.label,
    color: Colors.error.main,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: TouchTarget.button,
    borderWidth: 1.5,
    borderRadius: BorderRadius.base,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: Spacing.base,
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: Colors.text.primary,
  },
  inputWithLeftIcon: {
    paddingLeft: Spacing.sm,
  },
  inputWithRightIcon: {
    paddingRight: Spacing.sm,
  },
  leftIcon: {
    paddingLeft: Spacing.base,
  },
  rightIcon: {
    paddingRight: Spacing.base,
  },
  helperText: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    marginTop: Spacing.xs,
  },
  errorText: {
    color: Colors.error.main,
  },
});

export default Input;
