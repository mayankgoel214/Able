import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Phone } from 'lucide-react-native';
import { Colors } from '../constants/colors';
import { Typography, FontFamily } from '../constants/typography';
import { BorderRadius, Spacing, TouchTarget, IconSize } from '../constants/spacing';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  countryCode?: string;
  label?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  countryCode = '+1',
  label,
  error,
  placeholder = '(555) 123-4567',
  disabled = false,
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const formatPhoneNumber = (text: string) => {
    // Remove non-numeric characters
    const cleaned = text.replace(/\D/g, '');
    // Limit to 10 digits
    const limited = cleaned.slice(0, 10);
    // Format as (XXX) XXX-XXXX for US numbers
    if (limited.length >= 7) {
      return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
    } else if (limited.length >= 4) {
      return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
    } else if (limited.length > 0) {
      return `(${limited}`;
    }
    return limited;
  };

  const handleChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    onChange(formatted);
  };

  const getBorderColor = () => {
    if (error) return Colors.error.main;
    if (isFocused) return Colors.primary[500];
    return Colors.border.default;
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputContainer, { borderColor: getBorderColor() }]}>
        <View style={styles.countryCode}>
          <Phone size={IconSize.sm} color={Colors.text.tertiary} />
          <Text style={styles.countryCodeText}>{countryCode}</Text>
        </View>

        <View style={styles.divider} />

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor={Colors.text.disabled}
          keyboardType="phone-pad"
          maxLength={14} // (XXX) XXX-XXXX format
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
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    backgroundColor: Colors.gray[50],
    height: '100%',
    gap: Spacing.sm,
  },
  countryCodeText: {
    ...Typography.label,
    color: Colors.text.secondary,
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: Colors.border.default,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: Spacing.base,
    fontFamily: FontFamily.medium,
    fontSize: 18,
    color: Colors.text.primary,
    letterSpacing: 1,
  },
  error: {
    ...Typography.caption,
    color: Colors.error.main,
    marginTop: Spacing.xs,
  },
});

export default PhoneInput;
