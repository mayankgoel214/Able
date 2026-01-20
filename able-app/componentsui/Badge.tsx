import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { BorderRadius, Spacing } from '../constants/spacing';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium';
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'medium',
  icon,
  style,
}) => {
  const getColors = () => {
    switch (variant) {
      case 'primary':
        return {
          background: Colors.primary[100],
          text: Colors.primary[700],
        };
      case 'success':
        return {
          background: Colors.success.light,
          text: Colors.success.dark,
        };
      case 'warning':
        return {
          background: Colors.warning.light,
          text: Colors.warning.dark,
        };
      case 'error':
        return {
          background: Colors.error.light,
          text: Colors.error.dark,
        };
      case 'info':
        return {
          background: Colors.info.light,
          text: Colors.info.dark,
        };
      default:
        return {
          background: Colors.gray[100],
          text: Colors.gray[700],
        };
    }
  };

  const colors = getColors();

  return (
    <View
      style={[
        styles.badge,
        size === 'small' && styles.badgeSmall,
        { backgroundColor: colors.background },
        style,
      ]}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text
        style={[
          size === 'small' ? styles.labelSmall : styles.label,
          { color: colors.text },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

// Priority Badge specifically for assessment results
interface PriorityBadgeProps {
  priority: 'high' | 'medium' | 'low';
  style?: ViewStyle;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, style }) => {
  const getVariant = () => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getLabel = () => {
    switch (priority) {
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low Priority';
      default:
        return priority;
    }
  };

  return <Badge label={getLabel()} variant={getVariant()} size="small" style={style} />;
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  badgeSmall: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  icon: {
    marginRight: Spacing.xs,
  },
  label: {
    ...Typography.labelSmall,
  },
  labelSmall: {
    ...Typography.caption,
    fontWeight: '600',
  },
});

export default Badge;
