import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Check } from 'lucide-react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { BorderRadius, Spacing, Shadow, IconSize } from '../constants/spacing';

interface SelectableCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
  variant?: 'default' | 'compact' | 'horizontal';
  disabled?: boolean;
  style?: ViewStyle;
}

export const SelectableCard: React.FC<SelectableCardProps> = ({
  title,
  description,
  icon,
  selected,
  onSelect,
  variant = 'default',
  disabled = false,
  style,
}) => {
  const isCompact = variant === 'compact';
  const isHorizontal = variant === 'horizontal';

  return (
    <TouchableOpacity
      onPress={onSelect}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.card,
        isCompact && styles.cardCompact,
        isHorizontal && styles.cardHorizontal,
        selected && styles.cardSelected,
        disabled && styles.cardDisabled,
        style,
      ]}
    >
      {isHorizontal ? (
        <View style={styles.horizontalContent}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                isCompact && styles.titleCompact,
                selected && styles.titleSelected,
              ]}
            >
              {title}
            </Text>
            {description && (
              <Text style={[styles.description, selected && styles.descriptionSelected]}>
                {description}
              </Text>
            )}
          </View>
          <View
            style={[
              styles.checkbox,
              selected && styles.checkboxSelected,
            ]}
          >
            {selected && <Check size={14} color={Colors.white} strokeWidth={3} />}
          </View>
        </View>
      ) : (
        <>
          {icon && (
            <View
              style={[
                styles.iconContainer,
                isCompact && styles.iconContainerCompact,
                selected && styles.iconContainerSelected,
              ]}
            >
              {icon}
            </View>
          )}
          <Text
            style={[
              styles.title,
              isCompact && styles.titleCompact,
              selected && styles.titleSelected,
            ]}
          >
            {title}
          </Text>
          {description && (
            <Text style={[styles.description, selected && styles.descriptionSelected]}>
              {description}
            </Text>
          )}
          <View
            style={[
              styles.checkIndicator,
              selected && styles.checkIndicatorSelected,
            ]}
          >
            {selected && <Check size={16} color={Colors.white} strokeWidth={3} />}
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

// Multi-select option card (for concerns, challenges)
interface MultiSelectOptionProps {
  label: string;
  icon?: React.ReactNode;
  selected: boolean;
  onToggle: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const MultiSelectOption: React.FC<MultiSelectOptionProps> = ({
  label,
  icon,
  selected,
  onToggle,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.multiOption,
        selected && styles.multiOptionSelected,
        disabled && styles.cardDisabled,
        style,
      ]}
    >
      {icon && (
        <View style={[styles.multiIcon, selected && styles.multiIconSelected]}>
          {icon}
        </View>
      )}
      <Text style={[styles.multiLabel, selected && styles.multiLabelSelected]}>
        {label}
      </Text>
      <View style={[styles.multiCheck, selected && styles.multiCheckSelected]}>
        {selected && <Check size={12} color={Colors.white} strokeWidth={3} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    borderColor: Colors.border.light,
    padding: Spacing.xl,
    alignItems: 'center',
    position: 'relative',
    ...Shadow.sm,
  },
  cardCompact: {
    padding: Spacing.base,
  },
  cardHorizontal: {
    padding: Spacing.base,
    alignItems: 'stretch',
  },
  cardSelected: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[50],
  },
  cardDisabled: {
    opacity: 0.5,
  },
  horizontalContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  iconContainerCompact: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginBottom: Spacing.sm,
  },
  iconContainerSelected: {
    backgroundColor: Colors.primary[200],
  },
  textContainer: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  title: {
    ...Typography.h5,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  titleCompact: {
    ...Typography.label,
  },
  titleSelected: {
    color: Colors.primary[700],
  },
  description: {
    ...Typography.bodySmall,
    color: Colors.text.tertiary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  descriptionSelected: {
    color: Colors.primary[600],
  },
  checkIndicator: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border.default,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIndicatorSelected: {
    backgroundColor: Colors.primary[500],
    borderColor: Colors.primary[500],
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border.default,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: Colors.primary[500],
    borderColor: Colors.primary[500],
  },

  // Multi-select styles
  multiOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.base,
    borderWidth: 1.5,
    borderColor: Colors.border.light,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    ...Shadow.sm,
  },
  multiOptionSelected: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[50],
  },
  multiIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  multiIconSelected: {
    backgroundColor: Colors.primary[100],
  },
  multiLabel: {
    ...Typography.label,
    color: Colors.text.primary,
    flex: 1,
  },
  multiLabelSelected: {
    color: Colors.primary[700],
  },
  multiCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border.default,
    justifyContent: 'center',
    alignItems: 'center',
  },
  multiCheckSelected: {
    backgroundColor: Colors.primary[500],
    borderColor: Colors.primary[500],
  },
});

export default SelectableCard;
