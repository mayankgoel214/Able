import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { BorderRadius } from '../constants/spacing';

interface AvatarProps {
  source?: string | null;
  name?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  showBadge?: boolean;
  badgeColor?: string;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name = '',
  size = 'medium',
  showBadge = false,
  badgeColor = Colors.success.main,
  style,
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 32;
      case 'large':
        return 64;
      case 'xlarge':
        return 96;
      default:
        return 48;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'large':
        return 24;
      case 'xlarge':
        return 32;
      default:
        return 16;
    }
  };

  const getBadgeSize = () => {
    switch (size) {
      case 'small':
        return 8;
      case 'large':
        return 16;
      case 'xlarge':
        return 20;
      default:
        return 12;
    }
  };

  const getInitials = () => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const avatarSize = getSize();
  const badgeSize = getBadgeSize();

  return (
    <View style={[styles.container, { width: avatarSize, height: avatarSize }, style]}>
      {source ? (
        <Image
          source={{ uri: source }}
          style={[
            styles.image,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
            },
          ]}
        />
      ) : (
        <View
          style={[
            styles.placeholder,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
            },
          ]}
        >
          <Text style={[styles.initials, { fontSize: getFontSize() }]}>
            {getInitials()}
          </Text>
        </View>
      )}

      {showBadge && (
        <View
          style={[
            styles.badge,
            {
              width: badgeSize,
              height: badgeSize,
              borderRadius: badgeSize / 2,
              backgroundColor: badgeColor,
              borderWidth: badgeSize > 10 ? 2 : 1,
            },
          ]}
        />
      )}
    </View>
  );
};

// Avatar Group for showing multiple avatars
interface AvatarGroupProps {
  avatars: { source?: string; name: string }[];
  max?: number;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = 'medium',
  style,
}) => {
  const visibleAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  const getOverlap = () => {
    switch (size) {
      case 'small':
        return -8;
      case 'large':
        return -16;
      default:
        return -12;
    }
  };

  const getSize = () => {
    switch (size) {
      case 'small':
        return 32;
      case 'large':
        return 64;
      default:
        return 48;
    }
  };

  return (
    <View style={[styles.groupContainer, style]}>
      {visibleAvatars.map((avatar, index) => (
        <View
          key={index}
          style={[
            styles.groupAvatar,
            index > 0 && { marginLeft: getOverlap() },
          ]}
        >
          <Avatar source={avatar.source} name={avatar.name} size={size} />
        </View>
      ))}
      {remaining > 0 && (
        <View
          style={[
            styles.remainingContainer,
            {
              width: getSize(),
              height: getSize(),
              borderRadius: getSize() / 2,
              marginLeft: getOverlap(),
            },
          ]}
        >
          <Text style={styles.remainingText}>+{remaining}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    backgroundColor: Colors.gray[100],
  },
  placeholder: {
    backgroundColor: Colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    ...Typography.labelLarge,
    color: Colors.primary[700],
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderColor: Colors.white,
  },
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupAvatar: {
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: BorderRadius.full,
  },
  remainingContainer: {
    backgroundColor: Colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  remainingText: {
    ...Typography.labelSmall,
    color: Colors.text.secondary,
  },
});

export default Avatar;
