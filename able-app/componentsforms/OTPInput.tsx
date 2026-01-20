import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  ViewStyle,
} from 'react-native';
import { Colors } from '../constants/colors';
import { FontFamily } from '../constants/typography';
import { BorderRadius, Spacing } from '../constants/spacing';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value,
  onChange,
  onComplete,
  error = false,
  disabled = false,
  style,
}) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (value.length === length && onComplete) {
      onComplete(value);
      Keyboard.dismiss();
    }
  }, [value, length, onComplete]);

  const handleChange = (text: string, index: number) => {
    // Handle paste
    if (text.length > 1) {
      const pastedValue = text.slice(0, length);
      onChange(pastedValue);
      if (pastedValue.length === length) {
        inputRefs.current[length - 1]?.focus();
      } else {
        inputRefs.current[pastedValue.length]?.focus();
      }
      return;
    }

    // Handle single character input
    const newValue = value.split('');
    newValue[index] = text;
    const result = newValue.join('').slice(0, length);
    onChange(result);

    // Move to next input
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newValue = value.split('');
      newValue[index - 1] = '';
      onChange(newValue.join(''));
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => { inputRefs.current[index] = ref; }}
          style={[
            styles.input,
            focusedIndex === index && styles.inputFocused,
            error && styles.inputError,
            value[index] && styles.inputFilled,
          ]}
          value={value[index] || ''}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          keyboardType="number-pad"
          maxLength={index === 0 ? length : 1}
          editable={!disabled}
          selectTextOnFocus
          caretHidden
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  input: {
    width: 48,
    height: 56,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.border.default,
    backgroundColor: Colors.white,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: FontFamily.semiBold,
    color: Colors.text.primary,
  },
  inputFocused: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[50],
  },
  inputError: {
    borderColor: Colors.error.main,
    backgroundColor: Colors.error.light,
  },
  inputFilled: {
    borderColor: Colors.primary[400],
    backgroundColor: Colors.primary[50],
  },
});

export default OTPInput;
