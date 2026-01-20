import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Mail } from 'lucide-react-native';
import { Colors } from '../constants/colors';
import { Typography, FontFamily } from '../constants/typography';
import { BorderRadius, Spacing, TouchTarget, IconSize } from '../constants/spacing';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  label,
  error,
  placeholder = 'Enter your email',
  disabled = false,
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getBorderColor = () => {
    if (error) return Colors.error.main;
    if (isFocused) return Colors.primary[500];
    return Colors.border.default;
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputContainer, { borderColor: getBorderColor() }]}>
        <View style={styles.iconContainer}>
          <Mail size={IconSize.sm} color={Colors.text.tertiary} />
        </View>

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={Colors.text.disabled}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.base,
  },
  label: {
    ...Typography.label,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: TouchTarget.button,
    borderWidth: 2,
    borderRadius: BorderRadius.base,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  iconContainer: {
    paddingHorizontal: Spacing.base,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray[50],
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: Spacing.base,
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.text.primary,
  },
  error: {
    ...Typography.caption,
    color: Colors.error.main,
    marginTop: Spacing.xs,
  },
});

export default EmailInput;
