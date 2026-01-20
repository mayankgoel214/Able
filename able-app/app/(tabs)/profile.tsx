import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import {
  FileText,
  TrendingUp,
  Calendar,
  MessageCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';
import { Card, Avatar, Badge } from '../../componentsui';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../constants/spacing';
import { useAuthStore } from '../../stores/authStore';
import { useUserStore } from '../../stores/userStore';

const menuSections = [
  {
    title: 'Your Activity',
    items: [
      { id: 'documents', label: 'Documents', icon: FileText, route: '/(main)/documents' },
      { id: 'progress', label: 'Progress Tracking', icon: TrendingUp, route: '/(main)/progress' },
      { id: 'sessions', label: 'My Sessions', icon: Calendar, route: '/(main)/sessions' },
      { id: 'chat', label: 'Chat with ABLE AI', icon: MessageCircle, route: '/(main)/chat' },
    ],
  },
];

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const { sessions, children, careTeam } = useUserStore();

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/(auth)/welcome');
          }
        },
      ]
    );
  };

  const handleMenuPress = (route: string) => {
    router.push(route as any);
  };

  // Calculate stats from store
  const childCount = children.length || 1;
  const therapistCount = careTeam.length || 0;
  const sessionCount = sessions.length || 0;

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return '+1 (555) 000-0000';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `+1 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return `+1 ${phone}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* Profile Card */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <Card variant="gradient" gradientColors={[Colors.primary[500], Colors.teal[500]]} padding="large" style={styles.profileCard}>
            <View style={styles.profileContent}>
              <Avatar
                name={user?.name || 'Parent'}
                size="xlarge"
                style={styles.avatar}
              />
              <Text style={styles.profileName}>{user?.name || 'Parent'}</Text>
              <Text style={styles.profilePhone}>
                {formatPhoneNumber(user?.phone || '')}
              </Text>
              <View style={styles.profileBadges}>
                <Badge label="Parent Account" variant="default" size="small" />
                <Badge label="Verified" variant="success" size="small" />
              </View>
            </View>
          </Card>
        </MotiView>

        {/* Quick Stats */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 200 }}
        >
          <Card variant="elevated" padding="medium" style={styles.statsCard}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{childCount}</Text>
                <Text style={styles.statLabel}>{childCount === 1 ? 'Child' : 'Children'}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{therapistCount}</Text>
                <Text style={styles.statLabel}>{therapistCount === 1 ? 'Therapist' : 'Therapists'}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{sessionCount}</Text>
                <Text style={styles.statLabel}>{sessionCount === 1 ? 'Session' : 'Sessions'}</Text>
              </View>
            </View>
          </Card>
        </MotiView>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <MotiView
            key={section.title}
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 400, delay: 300 + sectionIndex * 100 }}
            style={styles.menuSection}
          >
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Card variant="default" padding="none" style={styles.menuCard}>
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const isLast = itemIndex === section.items.length - 1;

                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.menuItem, !isLast && styles.menuItemBorder]}
                    onPress={() => handleMenuPress(item.route)}
                  >
                    <View style={styles.menuItemLeft}>
                      <View style={styles.menuItemIcon}>
                        <Icon size={IconSize.md} color={Colors.primary[600]} />
                      </View>
                      <Text style={styles.menuItemLabel}>{item.label}</Text>
                    </View>
                    <ChevronRight size={IconSize.sm} color={Colors.text.tertiary} />
                  </TouchableOpacity>
                );
              })}
            </Card>
          </MotiView>
        ))}

        {/* Logout Button */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 400, delay: 700 }}
          style={styles.logoutSection}
        >
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={IconSize.md} color={Colors.error.main} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </MotiView>

        {/* Version */}
        <Text style={styles.versionText}>ABLE App v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  scrollContent: {
    paddingBottom: Spacing['3xl'],
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.md,
  },
  title: {
    ...Typography.h2,
    color: Colors.text.primary,
  },
  profileCard: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.base,
  },
  profileContent: {
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
    marginBottom: Spacing.md,
  },
  profileName: {
    ...Typography.h3,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  profilePhone: {
    ...Typography.body,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: Spacing.md,
  },
  profileBadges: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statsCard: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    ...Typography.h2,
    color: Colors.primary[600],
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border.light,
  },
  menuSection: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.labelSmall,
    color: Colors.text.tertiary,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuCard: {
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.base,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  menuItemLabel: {
    ...Typography.label,
    color: Colors.text.primary,
  },
  logoutSection: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.base,
    gap: Spacing.sm,
    backgroundColor: Colors.error.light,
    borderRadius: BorderRadius.base,
  },
  logoutText: {
    ...Typography.button,
    color: Colors.error.main,
  },
  versionText: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    textAlign: 'center',
    marginTop: Spacing.xl,
  },
});
